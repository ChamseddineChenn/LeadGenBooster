#!/bin/bash
# deploy.sh — runs on VPS after each git pull (triggered by GitHub webhook)
# Place this file at: /var/www/leadgenbooster/deploy.sh
# Webhook must call: cd /var/www/leadgenbooster && git pull && bash deploy.sh

set -euo pipefail  # exit on error, unset vars, or pipe failures

REPO_DIR="/var/www/leadgenbooster"
FRONTEND_DIST="/var/www/leadgenbooster-frontend"
ADMIN_DIST="/var/www/leadgenbooster-admin"
BACKEND_PM2_NAME="leadgenbooster-backend"

# Resolve pm2 — works whether installed globally or via nvm
PM2=$(command -v pm2 || echo "$HOME/.npm-global/bin/pm2")

echo "=== [$(date)] Deploy started ==="

# ── Frontend ──────────────────────────────────────────────────────────────────
echo ">>> Building frontend..."
cd "$REPO_DIR/frontend"
npm ci
npm run build

echo ">>> Publishing frontend to $FRONTEND_DIST..."
rm -rf "$FRONTEND_DIST"
cp -r dist "$FRONTEND_DIST"

# ── Admin ─────────────────────────────────────────────────────────────────────
echo ">>> Building admin..."
cd "$REPO_DIR/admin"
npm ci
npm run build

echo ">>> Publishing admin to $ADMIN_DIST..."
rm -rf "$ADMIN_DIST"
cp -r dist "$ADMIN_DIST"

# ── Backend ───────────────────────────────────────────────────────────────────
echo ">>> Installing backend dependencies..."
cd "$REPO_DIR/backend"
npm ci --omit=dev

echo ">>> Restarting backend (pm2: $BACKEND_PM2_NAME)..."
"$PM2" restart "$BACKEND_PM2_NAME" --update-env

echo "=== [$(date)] Deploy complete ==="
