#!/bin/bash
# deploy.sh — runs on VPS after each git pull (triggered by GitHub webhook)
# Place this file at: /var/www/leadgenbooster/deploy.sh
# Webhook must call: cd /var/www/leadgenbooster && git pull && bash deploy.sh

set -e  # exit immediately on any error

REPO_DIR="/var/www/leadgenbooster"
FRONTEND_DIST="/var/www/leadgenbooster-frontend"
ADMIN_DIST="/var/www/leadgenbooster-admin"
BACKEND_PM2_NAME="leadgenbooster-backend"

echo "=== [$(date)] Deploy started ==="

cd "$REPO_DIR"

# ── Frontend ──────────────────────────────────────────────────────────────────
echo ">>> Building frontend..."
cd "$REPO_DIR/frontend"
npm ci --silent
npm run build

echo ">>> Copying frontend dist to $FRONTEND_DIST..."
rm -rf "$FRONTEND_DIST"
cp -r dist "$FRONTEND_DIST"

# ── Admin ─────────────────────────────────────────────────────────────────────
echo ">>> Building admin..."
cd "$REPO_DIR/admin"
npm ci --silent
npm run build

echo ">>> Copying admin dist to $ADMIN_DIST..."
rm -rf "$ADMIN_DIST"
cp -r dist "$ADMIN_DIST"

# ── Backend ───────────────────────────────────────────────────────────────────
echo ">>> Installing backend dependencies..."
cd "$REPO_DIR/backend"
npm ci --silent --omit=dev

echo ">>> Restarting backend (pm2: $BACKEND_PM2_NAME)..."
pm2 restart "$BACKEND_PM2_NAME" --update-env

echo "=== [$(date)] Deploy complete ==="
