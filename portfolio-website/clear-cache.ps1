# PowerShell script to clear NextJS build cache and restart development server

Write-Host "Stopping any running development servers..." -ForegroundColor Yellow

# Get all npm processes and stop them
$npmProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($npmProcesses) {
    $npmProcesses | ForEach-Object { Stop-Process -Id $_.Id -Force }
    Write-Host "Development servers stopped." -ForegroundColor Green
} else {
    Write-Host "No development servers running." -ForegroundColor Green
}

# Clear the .next folder
Write-Host "Clearing NextJS build cache..." -ForegroundColor Yellow
if (Test-Path -Path ".next") {
    Remove-Item -Path ".next" -Recurse -Force
    Write-Host "NextJS build cache cleared." -ForegroundColor Green
} else {
    Write-Host "No .next folder found." -ForegroundColor Green
}

# Clear browser cache instructions
Write-Host "
IMPORTANT: Please also clear your browser cache:" -ForegroundColor Cyan
Write-Host "1. Chrome/Edge: Press Ctrl+Shift+R or hold Shift and click the reload button" -ForegroundColor Cyan
Write-Host "2. Firefox: Press Ctrl+Shift+R or hold Shift and click the reload button" -ForegroundColor Cyan
Write-Host "3. Safari: Press Option+Command+E to clear cache, then Command+R to reload" -ForegroundColor Cyan

# Restart development server
Write-Host "
Restarting development server..." -ForegroundColor Yellow
Write-Host "Run 'npm run dev' to start the development server again." -ForegroundColor Green