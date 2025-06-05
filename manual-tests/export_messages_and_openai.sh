#!/bin/bash
# Script to concatenate selected files, wrapping each in triple backticks and labeling with the relative path

# Output file
OUTPUT="messages_and_openai_files.md"

# List of files to include
FILES=(
  "frontend/src/components/ChatArea.tsx"
  "frontend/src/components/MessageBubble.tsx"
  "frontend/src/hooks/useMessages.ts"
  "frontend/src/types/message.ts"
  "frontend/src/types/chat.ts"
  "backend/api/messages.py"
  "backend/services/openai_service.py"
  "backend/models/message.py"
)

# Remove output file if it exists
rm -f "$OUTPUT"

echo "Generating $OUTPUT..."

for FILE in "${FILES[@]}"; do
  if [ -f "$FILE" ]; then
    echo "$FILE" >> "$OUTPUT"
    echo '```' >> "$OUTPUT"
    cat "$FILE" >> "$OUTPUT"
    echo '```' >> "$OUTPUT"
    echo >> "$OUTPUT"
  else
    echo "$FILE not found, skipping." >> "$OUTPUT"
  fi
done

echo "Done. Output written to $OUTPUT."
