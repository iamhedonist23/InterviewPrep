@echo off
setlocal EnableExtensions
title InterviewPrep - Setup and Start

cd /d "%~dp0"

echo ============================================================
echo       InterviewPrep - One by One Setup and Start
echo ============================================================
echo Project: %CD%
echo.

echo [1/9] Checking Node.js and npm...
node -v || goto :NODE_ERROR
npm -v || goto :NODE_ERROR
echo [OK]
echo.

echo [2/9] Checking project files...
if not exist "package.json" goto :PROJECT_ERROR
if not exist "prisma\schema.prisma" goto :PROJECT_ERROR
if not exist ".env" (
    echo [WARNING] .env not found. Database commands may fail.
    echo.
)
echo [OK]
echo.

echo [3/9] Installing dependencies...
call npm install
if errorlevel 1 goto :ERROR
echo [OK]
echo.

echo [4/9] Validating Prisma schema...
call npx prisma validate
if errorlevel 1 goto :ERROR
echo [OK]
echo.

echo [5/9] Generating Prisma Client...
call npx prisma generate
if errorlevel 1 goto :ERROR
echo [OK]
echo.

echo [6/9] Updating database schema...
call npx prisma db push
if errorlevel 1 goto :DB_ERROR
echo [OK]
echo.

echo [7/9] Seeding database...
call npx prisma db seed
if errorlevel 1 goto :SEED_ERROR
echo [OK]
echo.

echo [8/9] Checking TypeScript...
call npx tsc --noEmit
if errorlevel 1 (
    echo [WARNING] TypeScript check failed.
    echo.
    choice /C YN /M "Start website anyway"
    if errorlevel 2 goto :ERROR
) else (
    echo [OK]
)
echo.

echo [9/9] Starting InterviewPrep...
echo ============================================================
echo Website: http://localhost:3000
echo Press Ctrl+C to stop the server.
echo ============================================================
echo.

call npm run dev
goto :END

:NODE_ERROR
echo.
echo [ERROR] Node.js/npm is not installed or not in PATH.
pause
goto :END

:PROJECT_ERROR
echo.
echo [ERROR] package.json or prisma\schema.prisma not found.
echo Put this BAT file in the project root.
pause
goto :END

:DB_ERROR
echo.
echo [ERROR] Database setup failed.
echo Check PostgreSQL is running and DATABASE_URL in .env.
echo.
echo Test PostgreSQL with:
echo   psql -U postgres -h localhost -p 5432
pause
goto :END

:SEED_ERROR
echo.
echo [ERROR] Database seed failed.
echo Check your Prisma seed configuration and database.
pause
goto :END

:ERROR
echo.
echo [ERROR] A setup step failed. Read the message above.
pause
goto :END

:END
endlocal
