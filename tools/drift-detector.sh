#!/usr/bin/env bash
# Maps recent file changes to affected specs.
# Usage: tools/drift-detector.sh [number-of-commits]

set -euo pipefail

COMMITS=${1:-5}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# File pattern → spec mapping (mirrors orchestration table in CLAUDE.md)
declare -A SPEC_MAP=(
  ["src/lib/services/blog"]="blog"
  ["src/lib/stores/blog"]="blog"
  ["src/lib/components/blog"]="blog"
  ["src/routes/blog"]="blog"
  ["src/lib/services/series"]="series"
  ["src/lib/stores/series"]="series"
  ["src/lib/components/series"]="series"
  ["src/lib/data/series"]="series"
  ["src/lib/services/form"]="forms"
  ["src/lib/components/newsletter"]="forms"
  ["src/lib/components/forms"]="forms"
  ["src/lib/components/composables"]="forms"
  ["src/lib/config/env"]="forms"
  ["src/styles/"]="theme-css"
  ["src/lib/stores/theme"]="theme-css"
  ["src/lib/components/ThemeToggle"]="theme-css"
  ["src/lib/stores/terminal"]="terminal"
  ["src/lib/components/terminal"]="terminal"
  [".github/workflows"]="workflow"
)

cd "$PROJECT_ROOT"

echo "── Drift Detection Report ──"
echo "Checking last $COMMITS commits..."
echo ""

# Get changed files
CHANGED_FILES=$(git diff --name-only "HEAD~${COMMITS}" HEAD 2>/dev/null || echo "")

if [ -z "$CHANGED_FILES" ]; then
  echo "No changes found in last $COMMITS commits."
  exit 0
fi

# Track which specs are affected
declare -A AFFECTED_SPECS

while IFS= read -r file; do
  for pattern in "${!SPEC_MAP[@]}"; do
    if [[ "$file" == *"$pattern"* ]]; then
      spec="${SPEC_MAP[$pattern]}"
      AFFECTED_SPECS[$spec]=1
    fi
  done
done <<< "$CHANGED_FILES"

if [ ${#AFFECTED_SPECS[@]} -eq 0 ]; then
  echo "✓ No specs affected by recent changes."
else
  echo "⚠ The following specs may need review:"
  for spec in "${!AFFECTED_SPECS[@]}"; do
    echo "  → docs/specs/${spec}.md"
  done
fi

echo ""
echo "────────────────────────────"
