/* eslint-disable no-console */
import path from 'path'

import { z } from 'zod'
import { createEnv } from '@t3-oss/env-core'
import { config } from 'dotenv'

const envPath = path.resolve(process.cwd(), '.env')
const result = config({ path: envPath })

if (result.error) {
  console.error('❌ .envファイルの読み込みに失敗:', result.error)
} else {
  console.log('✅ .envファイルを正常に読み込みました')
}

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['localhost', 'development', 'production']),
    DATABASE_URL: z.string().min(1),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  onValidationError: (error: unknown) => {
    console.error('❌ 環境変数の検証に失敗しました:')
    console.error(error)
    throw new Error('環境変数が正しく設定されていません')
  },

  onInvalidAccess: (variable: string) => {
    throw new Error(
      `❌ 環境変数 "${variable}" にアクセスしようとしましたが、定義されていません`,
    )
  },
})

export type Env = typeof env
