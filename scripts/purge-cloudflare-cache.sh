#!/bin/bash

# Cloudflare Cache Purge Script
# Purges the cached files of the CDN "latest" folder
# The versioned folders are immutable, they never need to be purged

# Configuration
CLOUDFLARE_ZONE_ID="${CLOUDFLARE_ZONE_ID:-e5b0c3828c79b2df3e96ce3269ba35e2}"
SOURCE_FOLDER="./bundles/angry-pixel/lib"
URL="https://cdn.angrypixel.gg/engine"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔄 Cloudflare Cache Purge Tool${NC}"

# Check if required variables are set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo -e "${RED}❌ Error: CLOUDFLARE_API_TOKEN must be set!${NC}"
    echo ""
    echo "Please set these environment variables:"
    echo "export CLOUDFLARE_API_TOKEN='your-api-token'"
    echo ""
    echo "You can find these values in your Cloudflare dashboard:"
    echo "- API Token: Dashboard > Profile > API Tokens > Create Token"
    exit 1
fi

# A prerelease does not update the "latest" folder, so there is nothing to purge
VERSION=$(node -p "require('./bundles/angry-pixel/package.json').version")
if [[ "$VERSION" == *-* ]]; then
    echo -e "${YELLOW}🏷️  Prerelease $VERSION, the 'latest' folder was not updated. Nothing to purge.${NC}"
    exit 0
fi

# Build the list of urls to purge, one per file of the latest folder
TARGET_URLS=""
for FILE in "$SOURCE_FOLDER"/*; do
    [ -f "$FILE" ] || continue
    [ -n "$TARGET_URLS" ] && TARGET_URLS="$TARGET_URLS, "
    TARGET_URLS="$TARGET_URLS\"$URL/latest/$(basename "$FILE")\""
done

if [ -z "$TARGET_URLS" ]; then
    echo -e "${RED}❌ Error: no files found in $SOURCE_FOLDER!${NC}"
    exit 1
fi

TARGET_URLS="[$TARGET_URLS]"

echo -e "${YELLOW}📋 Zone ID: $CLOUDFLARE_ZONE_ID${NC}"
echo -e "${YELLOW}🔑 API Token: ${CLOUDFLARE_API_TOKEN:0:10}...${NC}"
echo -e "${YELLOW}🎯 Target URLs: $TARGET_URLS${NC}"
echo ""

# Purge the cache for the listed files
echo -e "${BLUE}🔄 Purging Cloudflare cache...${NC}"

response=$(curl -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"files\":$TARGET_URLS}" \
    --silent --show-error)

# Check if the request was successful
if [ $? -eq 0 ]; then
    # Check if the response contains "success": true
    if echo "$response" | grep -q '"success":true'; then
        echo -e "${GREEN}✅ Cloudflare cache purged successfully!${NC}"
        echo -e "${GREEN}📦 The latest builds should be served immediately.${NC}"
    else
        echo -e "${RED}❌ Cloudflare API returned an error:${NC}"
        echo "$response"
        exit 1
    fi
else
    echo -e "${RED}❌ Failed to connect to Cloudflare API${NC}"
    echo "Please check your internet connection and API credentials."
    exit 1
fi
