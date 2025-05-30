import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  ignores: [
    '**/.idea/**',
    '**/.vscode/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/public/**',
    '**/src-tauri/**',
  ],
  rules: {
    // 禁用 `node/prefer-global/process` 规则
    'node/prefer-global/process': 'off',
    // 禁用 `no-console` 规则
    'no-console': 'off',
  },
})
