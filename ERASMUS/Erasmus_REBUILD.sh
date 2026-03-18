#!/usr/bin/env bash
set -euo pipefail
trap 'echo "ERROR on line $LINENO"; exit 1' ERR

# ===== Paths =====
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
ERASMUS_DIR="$SCRIPT_DIR"
KERNEL_DIR="$ERASMUS_DIR/_kernels"

mkdir -p "$KERNEL_DIR"

LOG_FILE="$KERNEL_DIR/kernel-build.log"
OUT_FILE="$KERNEL_DIR/kernel-$(date +%Y%m%d-%H%M%S).md"

exec > >(tee -a "$LOG_FILE") 2>&1

echo "--------------------------------"
echo "Kernel build started: $(date)"
echo "Erasmus root: $ERASMUS_DIR"
echo "Log file: $LOG_FILE"
echo "Output file: $OUT_FILE"
echo "--------------------------------"

append_file() {
  local file="$1"
  local rel="${file#$ERASMUS_DIR/}"

  if [ -f "$file" ]; then
    echo "Exporting $rel"
    {
      printf "## FILE: %s\n\n" "$rel"
      printf '```\n'
      sed 's/\r$//' "$file"
      printf '\n```\n\n'
    } >> "$OUT_FILE"
  fi
}

is_text_file() {
  case "$1" in
    *.md|*.njk|*.html|*.css|*.js|*.json|*.toml|*.yml|*.yaml|*.sh|*.cmd|*.txt)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

{
  echo "# Erasmus Kernel Snapshot"
  echo "Generated: $(date)"
  echo "Root: $ERASMUS_DIR"
  echo
} > "$OUT_FILE"

echo "## DIRECTORY STRUCTURE" >> "$OUT_FILE"
echo >> "$OUT_FILE"
echo '```' >> "$OUT_FILE"

find "$ERASMUS_DIR" \
  -path "$KERNEL_DIR" -prune -o \
  -print | sed "s#^$ERASMUS_DIR#.#" >> "$OUT_FILE"

echo '```' >> "$OUT_FILE"
echo >> "$OUT_FILE"

echo "Exporting Erasmus files..."
find "$ERASMUS_DIR" \
  -path "$KERNEL_DIR" -prune -o \
  -type f -print | sort | while IFS= read -r file; do
    is_text_file "$file" && append_file "$file"
done

{
  echo "---"
  echo
  echo "Kernel complete: $(basename "$OUT_FILE")"
} >> "$OUT_FILE"

echo
echo "Kernel written:"
echo "$OUT_FILE"