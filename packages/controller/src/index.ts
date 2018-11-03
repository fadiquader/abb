export * from "./modules/RegisterController";
export * from "./modules/LoginController";
export * from "./modules/auth/AuthRoute";
// apollo schema:download --endpoint http://localhost:4000 schema.json
// apollo codegen:generate --queries="src/**/*.tsx" --schema schema.json --target typescript
