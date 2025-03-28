import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: { prettier },
    rules: {
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',

      // Cảnh báo đang sử dụng console
      'no-console': 'warn',

      // Cảnh báo export default mà không đặt tên
      'import/no-anonymous-default-export': 'off',

      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1 }],

      // Cảnh báo khi sử dụng loại 'any' trong TypeScript
      '@typescript-eslint/no-explicit-any': 'off',

      // Cảnh báo khi có biến không được sử dụng
      '@typescript-eslint/no-unused-vars': 'warn',

      // Cảnh báo khi sử dụng object rỗng
      '@typescript-eslint/no-empty-object-type': 'off',

      // Cấu hình Prettier để định dạng mã nguồn
      'prettier/prettier': [
        'warn', // Cảnh báo cho các vấn đề của Prettier
        {
          semi: false,
          // Sử dụng dấu nháy đơn cho chuỗi
          singleQuote: true,
          // Sử dụng dấu nháy đơn trong JSX
          trailingComma: 'none',
          // Giới hạn độ dài dòng là 120 ký tự
          printWidth: 120,
          // Sử dụng 2 khoảng trắng để thụt đầu dòng
          tabWidth: 2,
          // Giữ nguyên các kết thúc dòng hiện có
          endOfLine: 'auto'
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]

export default eslintConfig
