@echo off
title ITC Technology Web & Admin Server
color 0A
echo ========================================================
echo   ITC TECHNOLOGY - Industrial Web & Admin Portal
echo ========================================================
echo.
echo Checking Node.js installation...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo ========================================================
echo   Server mac dinh tai:  http://localhost:3050
echo   Website Khach Hang:   http://localhost:3050/
echo   Trang Quan Tri Admin: http://localhost:3050/admin
echo   Tai khoan mac dinh:   admin / admin@123
echo ========================================================
echo [Luu y] Giu nguyen cua so nay khi dang truy cap website.
echo Neu cong 3050 ban, server se tu dong nhay sang 3051, 3052...
echo Nhan Ctrl + C de dung server.
echo.
if exist copy_assets.mjs (
    node copy_assets.mjs
)
if exist copy_rendered.mjs (
    node copy_rendered.mjs
)
node server.js
pause
