# Vitest dæmi

Til að keyra:

```bash
npm install
npm run test

# í "watch" mode
# vitest keyrir sjálfkrafa í watch mode ef við keyrum bara "vitest"
npm run watch

# Coverage
npm run coverage
npm test -- --coverage
```

Vitest birtir eingöngu coverage ef öll test keyra, það er útkommentað test
í `src/reverse.test.js`.
