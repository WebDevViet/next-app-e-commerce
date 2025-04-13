# Khởi tạo dự án React-Typescript với Bun Vite

## Tailwind

_tailwind.config.ts_

```typescript
import tailwindcssAnimate from 'tailwindcss-animate'

export default {
  //...
  plugins: [tailwindcssAnimate]
} satisfies Config
```

## ESLint - Prettier

```bash
bun add --dev eslint-config-prettier eslint-plugin-prettier
```

_eslint.config.mjs_

```mjs
//...
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
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
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
```

- Tạo 2 file ở root: **.prettierrc** và **.prettierignore**

_.prettierrc_

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "printWidth": 120,
  "tabWidth": 2
}
```

_.prettierignore_

```
node_modules/
bun.lockb
package-lock.json
next.config.ts
postcss.config.mjs
tailwind.config.ts
commitlint.config.js
dist/
public/
.next/
.vercel
.husky
```

- Cài extensions-vscode: **ESlint, Prettier, Prettier ESlint**

_package.json_

```json
{
  "scripts": {
    //...
    "lint-fix": "next lint --fix",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier-fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "check-format": "npm run lint && npm run prettier",
    "fix-format": "npm run lint-fix && npm run prettier-fix",
    "prepare": "husky",
    "commitlint": "commitlint --edit"
  }
}
```

```bash
bun lint
```

```bash
bun lint-fix
```

```bash
bun prettier
```

```bash
bun prettier-fix
```

```bash
bun check-format
```

```bash
bun fix-format
```

> [!TIP]
> Nếu ESLint không hoạt động ta thử tắt VSCode và mở lại + run dev

## Editor Config

- Tạo file ở root: **.editorconfig**

```
[*]
indent_style = space
indent_size = 2
```

## Husky

> [!NOTE]
> Dùng để kiểm tra đã pass các rule của eslint và prettier hay chưa trước khi commit git

```bash
bun add husky lint-staged -D
```

```bash
git init
```

```bash
bunx husky init
```

_.husky/pre-commit_

```
# .husky/pre-commit

bunx lint-staged
bun run check-format
eslint --cache --max-warnings=0 .
```

_package.json_

```json
{
  "scripts": {
    //...
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["bun run fix-format", "git add ."]
  }
  //...
}
```

_.gitignore_

```
# thêm .eslintcache
.eslintcache
```

## CommentLint

> [!NOTE]
> CommitLint ta sẽ đảm bảo được tất cả các commit đều phải có nội dung theo chuẩn (thường sử dụng chuẩn commit của Angular)

_bash(window)_

```bash
bun add -D @commitlint/config-conventional @commitlint/cli
```

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs
```

```bash
npm pkg set scripts.commitlint="commitlint --edit"
```

```bash
echo "bun run commitlint \${1}" > .husky/commit-msg
```

Theo chuẩn Angular, 1 commit message sẽ theo cấu trúc như sau: **`type(scope?): subject`**

- `type` ở trên có thể là:

  - `build`: Thay đổi hệ thống xây dựng hoặc phụ thuộc bên ngoài
  - `ci`: Thay đổi cấu hình và kịch bản CI
  - `chore`: Thêm hoặc cập nhật thứ gì đó mà không ảnh hưởng đến mã sản xuất
  - `docs`: Thay đổi chỉ liên quan đến tài liệu
  - `feat`: Thêm tính năng mới
  - `fix`: Sửa lỗi
  - `perf`: Cải thiện hiệu suất
  - `refactor`: Thay đổi mã mà không sửa lỗi hoặc thêm tính năng
  - `revert`: Hoàn tác commit trước đó
  - `style`: Thay đổi không ảnh hưởng đến ý nghĩa của mã (ví dụ: định dạng, thêm khoảng trắng, etc.)
  - `test`: Thêm hoặc sửa các bài kiểm tra

- `scope` thì là optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng. Mình thấy scope thường dùng ở các repository mà chứa nhiều packages dạng monorepo, ví dụ repo của Vue 3, scope sẽ là tên của 1 package nào đó ở folder packages

- `subject` là nội dung của commit

- VD:

```bash
git commit -m "feat: add new feature"
```

```bash
git commit -m "fix(scope): fix bug"
```

## Shadcn UI

[Install and configure shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next)

## SSL

```json
{
  "script": {
    "dev": "rm -rf .next && export NODE_EXTRA_CA_CERTS=\"$(mkcert -CAROOT)/rootCA.pem\" && next dev --experimental-https --turbopack"
  }
}
```
