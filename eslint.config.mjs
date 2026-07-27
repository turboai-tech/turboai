// Next 16 起 eslint-config-next 原生提供 flat config（子路径直接导出
// Linter.Config[]），不再需要 @eslint/eslintrc 的 FlatCompat 包装 ——
// 用 FlatCompat 包会触发 "Converting circular structure to JSON"。
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  // `next lint` 在 Next 16 已移除，改由 `eslint .` 直接运行，因此需要
  // 显式声明忽略项 —— 过去这些是 next lint 内部处理的。
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'next-env.d.ts'],
  },
  ...coreWebVitals,
  ...typescript,
  // 迁移前 FlatCompat 配置中的自定义规则，原样保留。
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;
