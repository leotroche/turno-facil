import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  singleQuote: true,
  sortImports: {},
  sortTailwindcss: {
    functions: ['cn'],
  },
})
