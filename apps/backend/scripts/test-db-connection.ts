/* eslint-disable no-console */
/**
 * Supabaseデータベース接続テストスクリプト
 *
 * このスクリプトは以下を確認します：
 * - データベースへの接続
 * - Prismaクライアントの動作
 * - テーブルの存在確認
 *
 * 実行方法: npx ts-node scripts/test-db-connection.ts
 */

import { PrismaClient } from '@prisma/client'

/**
 * データベース接続をテストする関数
 * @returns Promise<void>
 */
async function testDatabaseConnection(): Promise<void> {
  const prisma = new PrismaClient()

  try {
    console.log('🔄 Supabaseデータベースへの接続をテスト中...')

    // データベース接続テスト
    await prisma.$connect()
    console.log('✅ データベース接続成功')

    // テーブル存在確認（簡単なクエリ実行）
    const userCount = await prisma.user.count()

    console.log('✅ Prismaクライアント動作確認成功')
    console.log(`📊 データベース統計:`)
    console.log(`   - ユーザー数: ${userCount}`)

    // データベース情報の取得
    const result: Array<{ version: string }> =
      await prisma.$queryRaw`SELECT version()`
    console.log(`📦 PostgreSQLバージョン: ${result[0].version}`)
  } catch (error) {
    console.error('❌ データベース接続エラー:', error)

    if (error instanceof Error) {
      console.error('エラーメッセージ:', error.message)

      // 一般的なエラーの対処法を提示
      if (error.message.includes('authentication')) {
        console.log(
          '💡 認証エラーの場合: DATABASE_URLのパスワードを確認してください',
        )
      }

      if (error.message.includes('does not exist')) {
        console.log(
          '💡 テーブル未作成の場合: prisma migrate dev を実行してください',
        )
      }

      if (error.message.includes('connect')) {
        console.log(
          '💡 接続エラーの場合: ネットワーク接続とSupabaseプロジェクトの状態を確認してください',
        )
      }
    }
  } finally {
    await prisma.$disconnect()
    console.log('🔚 データベース接続を終了しました')
  }
}

// スクリプト実行
if (require.main === module) {
  testDatabaseConnection()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('スクリプト実行エラー:', error)
      process.exit(1)
    })
}
