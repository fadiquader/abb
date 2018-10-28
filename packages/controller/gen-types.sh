#! /bin/bash

apollo schema:download --endpoint http://localhost:4000 schema.json
 apollo codegen:generate --queries="src/**/*.tsx" --schema schema.json --target typescript
