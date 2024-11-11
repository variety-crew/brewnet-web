import pluginVue from 'eslint-plugin-vue';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...pluginVue.configs['flat/recommended'],
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          $schema: 'https://json.schemastore.org/prettierrc',
          singleQuote: true,
          semi: true,
          useTabs: false,
          tabWidth: 2,
          trailingComma: 'all',
          printWidth: 120,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],
    },
  },
  eslintConfigPrettier,
];
