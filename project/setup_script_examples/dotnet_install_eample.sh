# Exampl of install.sh for .NET SDK - to use rename this file to install.sh
# and place it in the root of your project.
#!/usr/bin/env bash
set -euo pipefail
apt-get update
apt-get install -y dotnet-sdk-8.0
# Only restore if we actually have a project/solution file
if compgen -G "*.sln" >/dev/null || compgen -G "*.csproj" >/dev/null; then
  echo "⛓  Found .NET project/solution file – running dotnet restore..."
  dotnet restore
else
  echo "⚠️  No .sln or .csproj file found. Skipping dotnet restore."
fi