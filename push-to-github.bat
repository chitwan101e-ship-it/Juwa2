@echo off
echo Adding SEO HTML files and .htaccess to git...
cd /d "%~dp0"
git add public/about.html
git add public/contact.html
git add public/blog.html
git add public/contact/faq.html
git add public/.htaccess

echo.
echo Checking git status...
git status --short

echo.
echo Committing changes...
git commit -m "Add static HTML files for SEO indexing (about, contact, blog, faq) and .htaccess for routing"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo Done! Check GitHub Actions for deployment status.
pause

