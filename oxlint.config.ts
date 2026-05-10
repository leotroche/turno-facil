import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['oxc', 'typescript', 'unicorn', 'react', 'jsx-a11y'],
  rules: {
    'typescript/consistent-type-definitions': 'error',
  },
})
