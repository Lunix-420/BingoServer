# Path to the database directory
$DB_PATH = ".\data\db"
$PORT = 42069

# Create the db folder if it doesn't exist
if (-not (Test-Path $DB_PATH)) {
    New-Item -ItemType Directory -Path $DB_PATH | Out-Null
}

# Check if something's already running on the target port
$portInUse = Get-NetTCPConnection -LocalPort $PORT -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "❌ Port $PORT is already in use. Maybe MongoDB is already running?"
    Write-Host "👉 You can stop it with: Stop-Process -Id $($portInUse.OwningProcess) -Force"
    exit 1
}

# Start MongoDB
Write-Host "🚀 Starting MongoDB on port $PORT..."
Start-Process mongod -ArgumentList "--dbpath `"$DB_PATH`" --port $PORT"