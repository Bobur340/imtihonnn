// eslint.config.js
import tsEslint from 'typescript-eslint';

export default [
  {
    // Fayl shablonini belgilash
    files: ['**/*.ts'],
    
    // Asosiy ESLint tavsiyalarini (recommendations) qo'shish
    extends: [
      // Agar sizda "typescript-eslint" o'rnatilgan bo'lsa, uni qo'llash
      ...tsEslint.configs.recommended,
    ],
    
    // Bu qism TypeScript'ga xos sozlamalarni o'z ichiga oladi
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json', // Sizning tsconfig faylingizga ishora qiladi
      },
    },
    
    // Qo'shimcha qoidalarni bu yerga qo'shishingiz mumkin
    rules: {
      // Masalan, no-unused-vars qoidasini yoqish
      '@typescript-eslint/no-unused-vars': 'warn',
    }
  }
];