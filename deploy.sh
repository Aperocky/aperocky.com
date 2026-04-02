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
    --exclude "INFRA.local" \
    $EXTRA_ARGS

if [[ -z "$EXTRA_ARGS" ]]; then
    echo "Invalidating CloudFront cache..."
    aws cloudfront create-invalidation --distribution-id E2JN7O78HDY7Q5 --paths "/*" --query "Invalidation.Id" --output text
fi

echo "Deploy complete."
