@echo off
title Dong Bo Anh Render & Cap Nhat San Pham Su Ve Sinh Cho Web ITC
color 0A
echo =================================================================
echo   DONG BO ANH RENDER VA CAP NHAT SAN PHAM SU VE SINH WEB ITC
echo =================================================================
echo.
cd /d "%~dp0"

echo [1/2] Dang sao chep anh render vao:
echo       - D:\Anti\WebITC\Anh\Rendered_Clean\
echo       - D:\Anti\WebITC\frontend\images\
echo       - D:\Anti\WebITC\backend\uploads\
node copy_rendered.mjs
echo.

echo [2/2] Dang cap nhat danh muc san pham va bai viet chuyen nganh su ve sinh vao database...
node update_database_sanitary.mjs
echo.

echo =================================================================
echo   HOAN TAT 100%%!
echo   1. Anh da duoc luu vao thu muc sach dep:
echo      D:\Anti\WebITC\Anh\Rendered_Clean\
echo   2. Da cap nhat 8 san pham & 3 bai viet chuyen sau vao Web ITC.
echo   3. Hay mo trinh duyet va nhan F5 de xem danh muc san pham moi!
echo =================================================================
pause
