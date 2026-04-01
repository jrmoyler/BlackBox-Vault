#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_PATH="${1:-$ROOT_DIR/out/investor-showcase.mp4}"

cd "$ROOT_DIR"

if ! command -v npx >/dev/null 2>&1; then
  echo "Error: npx is required to render the Remotion video." >&2
  exit 1
fi

mkdir -p "$(dirname "$OUTPUT_PATH")"

echo "Rendering InvestorShowcase to: $OUTPUT_PATH"
npx remotion render remotion/index.ts InvestorShowcase "$OUTPUT_PATH"

echo "Done. Downloadable file: $OUTPUT_PATH"
