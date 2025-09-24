import 'dotenv/config' // .env, .env.local を読み込む

import '~/env' // import 時にバリデーション実行（失敗なら throw）
// eslint-disable-next-line no-console
console.log('✅ Environment variables look good!')
