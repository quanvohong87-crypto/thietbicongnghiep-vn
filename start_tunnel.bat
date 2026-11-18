@echo off
title ITC Technology - Cloudflare Online Tunnel
color 0B
echo =============================================================================
echo   ITC TECHNOLOGY - CLOUDFLARE PUBLIC TUNNEL (XEM ONLINE)
echo =============================================================================
echo.
node start_tunnel.js
if %errorlevel% neq 0 (
    echo.
    echo [Fallback] Chay truc tiep cloudflared.exe...
    cloudflared.exe tunnel --url http://localhost:3050
)
pause
