#!/bin/bash

# Deploy script for the engine builds using rsync
# Uploads bundles/angry-pixel/lib to the CDN server with incremental transfers
# Supports both local execution and GitHub Actions with RSA key authentication

# Configuration
# The server data comes from the environment (GitHub secrets in the CI)
SOURCE_FOLDER="./bundles/angry-pixel/lib"
URL="https://cdn.angrypixel.gg/engine"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check that the server data is set
MISSING=""
for VAR in SERVER_HOST SERVER_PORT SERVER_USER DESTINATION_PATH; do
    [ -z "${!VAR}" ] && MISSING="$MISSING $VAR"
done

if [ -n "$MISSING" ]; then
    echo -e "${RED}❌ Error: missing environment variables:$MISSING${NC}"
    echo ""
    echo "Please set them before running this script:"
    echo "export SERVER_HOST='the ip or hostname of the server'"
    echo "export SERVER_PORT='the ssh port'"
    echo "export SERVER_USER='the ssh user'"
    echo "export DESTINATION_PATH='the folder of the cdn in the server'"
    echo ""
    echo "In GitHub Actions they are provided by the repository secrets."
    exit 1
fi

# Version being published, read from the bundle package
VERSION=$(node -p "require('./bundles/angry-pixel/package.json').version")

echo -e "${YELLOW}🚀 Starting deployment of angry-pixel $VERSION to cdn.angrypixel.gg using rsync...${NC}"

# The ssh command used by rsync, with the deploy key when there is one
SSH_COMMAND="ssh -p $SERVER_PORT"

# Check if we're running in GitHub Actions (has SSH_PRIVATE_KEY secret)
if [ -n "$SSH_PRIVATE_KEY" ]; then
    echo -e "${YELLOW}🔐 Setting up SSH key from GitHub secrets...${NC}"

    # Create SSH directory and set permissions
    mkdir -p ~/.ssh
    chmod 700 ~/.ssh

    # Write the private key to its own file, never to the default key of the machine,
    # and remove it on every exit path
    SSH_KEY_FILE=$(mktemp "${TMPDIR:-/tmp}/angry-pixel-deploy-key.XXXXXXXX")
    trap 'rm -f "$SSH_KEY_FILE"' EXIT
    chmod 600 "$SSH_KEY_FILE"
    echo "$SSH_PRIVATE_KEY" > "$SSH_KEY_FILE"

    SSH_COMMAND="$SSH_COMMAND -i $SSH_KEY_FILE"

    # Add the server to known_hosts to avoid host key verification
    ssh-keyscan -p $SERVER_PORT -H $SERVER_HOST >> ~/.ssh/known_hosts 2>/dev/null

    echo -e "${GREEN}✅ SSH key configured for GitHub Actions${NC}"
fi

# Build the project first, unless the caller already did it (SKIP_BUILD=1)
if [ -z "$SKIP_BUILD" ]; then
    echo -e "${YELLOW}🔨 Building the engine with yarn...${NC}"
    yarn run build

    # Check if build was successful
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Build failed! Please fix the build errors and try again.${NC}"
        exit 1
    fi
fi

# Check if the lib folder exists
if [ ! -d "$SOURCE_FOLDER" ]; then
    echo -e "${RED}❌ Error: $SOURCE_FOLDER folder not found!${NC}"
    echo "Please make sure you've built the project first."
    exit 1
fi

# A version containing a hyphen is a prerelease (2.4.0-beta.1), it does not move "latest"
if [[ "$VERSION" == *-* ]]; then
    TARGETS="$VERSION"
    echo -e "${YELLOW}🏷️  Prerelease detected, the 'latest' folder will not be updated.${NC}"
else
    TARGETS="$VERSION latest"
fi

echo -e "${YELLOW}📁 Source folder: $SOURCE_FOLDER${NC}"
echo -e "${YELLOW}🌐 Destination: $SERVER_USER@$SERVER_HOST:$DESTINATION_PATH${NC}"
echo -e "${YELLOW}🔌 Port: $SERVER_PORT${NC}"
echo -e "${YELLOW}📦 Using rsync for incremental transfer...${NC}"
echo ""

# Deploy using rsync, one folder per target (the version and, for stable releases, latest)
for TARGET in $TARGETS; do
    echo -e "${YELLOW}📤 Uploading files to $DESTINATION_PATH/$TARGET...${NC}"

    rsync -avz --delete -e "$SSH_COMMAND" \
        --rsync-path="mkdir -p $DESTINATION_PATH/$TARGET && rsync" \
        $SOURCE_FOLDER/ $SERVER_USER@$SERVER_HOST:$DESTINATION_PATH/$TARGET

    # Check if the upload was successful
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Deployment failed!${NC}"
        echo "Please check your connection and try again."
        exit 1
    fi
done

echo -e "${GREEN}✅ Deployment successful!${NC}"
echo -e "${GREEN}📦 The builds are now live at: $URL/$VERSION/index.js${NC}"
if [ "$TARGETS" != "$VERSION" ]; then
    echo -e "${GREEN}📦 And at: $URL/latest/index.js${NC}"
fi
echo -e "${GREEN}📊 Only changed files were transferred (incremental deployment)${NC}"
