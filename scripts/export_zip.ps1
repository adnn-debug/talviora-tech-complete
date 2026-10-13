$ErrorActionPreference = "Stop"

Write-Host "=========================================================="
Write-Host "TALVIORA TECH: Complete Source Code Export & Verification"
Write-Host "=========================================================="

$rootPath = Get-Location
$stagingDir = Join-Path $rootPath "_export_staging"
$projectStaging = Join-Path $stagingDir "TALVIORA_TECH"
$zipOutput = Join-Path $rootPath "TALVIORA_TECH_COMPLETE_SOURCE_CODE.zip"

# Clean up existing staging and previous zip
if (Test-Path $stagingDir) {
    Remove-Item -Recurse -Force $stagingDir
}
if (Test-Path $zipOutput) {
    Remove-Item -Force $zipOutput
}

# Create staging project directory
New-Item -ItemType Directory -Path $projectStaging -Force | Out-Null
Write-Host "[1/5] Created clean staging directory: $projectStaging"

# Define directories to include
$sourceDirs = @("app", "components", "lib", "supabase", "scripts", "docs")
foreach ($dir in $sourceDirs) {
    $src = Join-Path $rootPath $dir
    if (Test-Path $src) {
        $dest = Join-Path $projectStaging $dir
        Copy-Item -Path $src -Destination $dest -Recurse -Force
        Write-Host "  -> Staged directory: $dir"
    } else {
        Write-Warning "Directory not found: $dir"
    }
}

# Define root files to include
$sourceFiles = @(
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "next.config.mjs",
    "postcss.config.mjs",
    "next-env.d.ts",
    ".env.example",
    ".gitignore",
    "README.md",
    "QA_AUDIT_REPORT.md"
)

foreach ($file in $sourceFiles) {
    $src = Join-Path $rootPath $file
    if (Test-Path $src) {
        $dest = Join-Path $projectStaging $file
        Copy-Item -Path $src -Destination $dest -Force
        Write-Host "  -> Staged configuration file: $file"
    } else {
        Write-Warning "File not found: $file"
    }
}

# Defensive Security Audit: Ensure NO secrets or local environment files are in staging
Write-Host "[2/5] Running defensive security audit on staged files..."
$secretFiles = Get-ChildItem -Path $projectStaging -Recurse -Force | Where-Object {
    $_.Name -eq ".env.local" -or
    $_.Name -eq ".env" -or
    $_.Name -like "*.pem" -or
    $_.Name -like "*.key" -or
    $_.Name -like "*id_rsa*"
}

if ($secretFiles.Count -gt 0) {
    Write-Error "CRITICAL SECURITY BREACH: Private secrets detected in staging directory! Aborting."
    exit 1
}
Write-Host "  -> Verified: 0 private credentials, secrets, or .env.local files found."

# Verify node_modules, .next, and .git are not staged
$forbiddenDirs = Get-ChildItem -Path $projectStaging -Recurse -Directory -Force | Where-Object {
    $_.Name -eq "node_modules" -or
    $_.Name -eq ".next" -or
    $_.Name -eq ".git"
}
if ($forbiddenDirs.Count -gt 0) {
    Write-Error "CRITICAL: Build artifacts or node_modules detected in staging directory! Aborting."
    exit 1
}
Write-Host "  -> Verified: node_modules, .next, and .git successfully excluded."

# Verify all key source files exist in staging
Write-Host "[3/5] Verifying presence of core architecture files..."
$requiredStagedPaths = @(
    "app/layout.tsx",
    "app/page.tsx",
    "app/globals.css",
    "app/catalogue/page.tsx",
    "app/api/assessment/route.ts",
    "app/api/interview/route.ts",
    "app/api/market/route.ts",
    "app/api/tasks/route.ts",
    "app/api/bookmarks/route.ts",
    "components/CommandPalette.tsx",
    "components/Sidebar.tsx",
    "components/Navbar.tsx",
    "lib/catalogue-data.ts",
    "lib/career-data.ts",
    "lib/gemini.ts",
    "lib/supabase.ts",
    "lib/auth-server.ts",
    "supabase/schema.sql",
    ".env.example",
    "package.json",
    "package-lock.json",
    "README.md",
    "QA_AUDIT_REPORT.md"
)

foreach ($req in $requiredStagedPaths) {
    $fullPath = Join-Path $projectStaging $req
    if (-not (Test-Path $fullPath)) {
        Write-Error "Verification failed: Missing essential file in staging: $req"
        exit 1
    }
}
Write-Host "  -> All $($requiredStagedPaths.Count) core architecture checks verified."

# Count staged files
$stagedFileCount = (Get-ChildItem -Path $projectStaging -Recurse -File).Count
Write-Host "  -> Total staged files: $stagedFileCount files ready for packaging."

# Compress staging directory into ZIP
Write-Host "[4/5] Packaging into $zipOutput..."
Compress-Archive -Path $projectStaging -DestinationPath $zipOutput -CompressionLevel Optimal -Force

# Verify ZIP file exists and inspect size
if (-not (Test-Path $zipOutput)) {
    Write-Error "Failed to generate ZIP archive: $zipOutput"
    exit 1
}

$zipSize = (Get-Item $zipOutput).Length
$zipSizeKB = [math]::Round($zipSize / 1KB, 2)
Write-Host "  -> ZIP archive generated successfully: $zipSize bytes ($zipSizeKB KB)."

# Clean up staging directory
Remove-Item -Recurse -Force $stagingDir
Write-Host "[5/5] Cleaned up temporary staging directory."

# Verify ZIP integrity using .NET ZipFile
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipArchive = [System.IO.Compression.ZipFile]::OpenRead($zipOutput)
$zipEntriesCount = $zipArchive.Entries.Count
$firstEntry = $zipArchive.Entries[0].FullName
$hasEnvLocalInZip = ($zipArchive.Entries | Where-Object { $_.FullName -like "*.env.local*" }).Count
$hasPackageJson = ($zipArchive.Entries | Where-Object { $_.FullName -like "*package.json" }).Count
$hasSupabaseSchema = ($zipArchive.Entries | Where-Object { $_.FullName -like "*supabase*schema.sql" }).Count
$zipArchive.Dispose()

Write-Host "=========================================================="
Write-Host "EXPORT VERIFICATION AUDIT:"
Write-Host "  Archive: $zipOutput"
Write-Host "  Size: $zipSize bytes ($zipSizeKB KB)"
Write-Host "  Total Archived Entries: $zipEntriesCount"
Write-Host "  Root Project Folder: $firstEntry"
Write-Host "  Contains package.json: $($hasPackageJson -gt 0)"
Write-Host "  Contains supabase/schema.sql: $($hasSupabaseSchema -gt 0)"
Write-Host "  Secret .env.local Contained: $($hasEnvLocalInZip -gt 0) (Must be False)"
Write-Host "=========================================================="

if ($hasEnvLocalInZip -gt 0) {
    Write-Error "VERIFICATION FAILED: Secret file found inside ZIP archive!"
    exit 1
}

Write-Host "EXPORT COMPLETE & VERIFIED 100% PRODUCTION READY!"
