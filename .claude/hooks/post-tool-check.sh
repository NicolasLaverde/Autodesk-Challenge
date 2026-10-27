#!/usr/bin/env bash
# PostToolUse hook for Edit/Write: typecheck and lint after a TypeScript file changes.
# Claude Code passes the tool call as JSON on stdin. Exit 2 sends stderr back to Claude.
set -uo pipefail

file_path=$(jq -r '.tool_input.file_path // empty')

case "$file_path" in
  *.ts | *.tsx) ;;
  *) exit 0 ;;
esac

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}" || exit 1

status=0

if ! output=$(npx tsc --noEmit 2>&1); then
  echo "npx tsc --noEmit failed after editing $file_path:" >&2
  echo "$output" >&2
  status=2
fi

if ! output=$(npm run lint --silent 2>&1); then
  echo "npm run lint failed after editing $file_path:" >&2
  echo "$output" >&2
  status=2
fi

exit $status
