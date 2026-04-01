#!/bin/bash
set -e

BUCKET="s3://aperocky.com"
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"

EXTRA_ARGS=""
if [[ "$1" == "--dryrun" ]]; then
    EXTRA_ARGS="--dryrun"
    echo "DRY RUN: Deploying to $BUCKET..."
else
    echo "Deploying to $BUCKET..."
fi

# Sync site files, excluding non-site directories and scripts
aws s3 sync "$SITE_DIR" "$BUCKET" \
    --exclude ".git/*" \
    --exclude ".gitignore" \
    --exclude ".claude/*" \
    --exclude "backup/*" \
    --exclude "deploy.sh" \
    $EXTRA_ARGS

echo "Deploy complete."
