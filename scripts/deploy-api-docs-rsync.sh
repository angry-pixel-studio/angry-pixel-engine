#!/bin/bash

# Deploy script for docs using rsync
# Uploads the site folder to the server with incremental transfers

# Configuration
SERVER_HOST="66.97.47.6"
SERVER_PORT="5408"
SERVER_USER="root"
DESTINATION_PATH="/var/www/angrypixel.gg/engine/api-docs"
SOURCE_FOLDER="./api-docs"
URL="https://angrypixel.gg/engine/api-docs/"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to angrypixel.gg using rsync...${NC}"

# Build the api docs first
echo -e "${YELLOW}🔨 Building api docs with typedoc...${NC}"
yarn api-docs

# Check if build was successful
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed! Please fix the build errors and try again.${NC}"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "$SOURCE_FOLDER" ]; then
    echo -e "${RED}❌ Error: $SOURCE_FOLDER folder not found!${NC}"
    echo "Please make sure you've built the project first."
    exit 1
fi

echo -e "${YELLOW}📁 Source folder: $SOURCE_FOLDER${NC}"
echo -e "${YELLOW}🌐 Destination: $SERVER_USER@$SERVER_HOST:$DESTINATION_PATH${NC}"
echo -e "${YELLOW}🔌 Port: $SERVER_PORT${NC}"
echo -e "${YELLOW}📦 Using rsync for incremental transfer...${NC}"
echo ""

# Deploy using rsync
echo -e "${YELLOW}📤 Uploading files with rsync...${NC}"
rsync -avz --delete -e "ssh -p $SERVER_PORT" $SOURCE_FOLDER/ $SERVER_USER@$SERVER_HOST:$DESTINATION_PATH

# Check if the upload was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo -e "${GREEN}📚 Your api docs are now live at: $URL${NC}"
    echo -e "${GREEN}📊 Only changed files were transferred (incremental deployment)${NC}"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo "Please check your connection and try again."
    exit 1
fi 