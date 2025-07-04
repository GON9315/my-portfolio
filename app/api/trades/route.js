// app/api/trades/route.js
import { createClient } from '@supabase/supabase-js'

// Service Role Keyを使用（環境変数名を変更）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // 重要：Service Role Key

// サーバーサイド専用クライアント作成
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// GET - トレードデータ取得
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const month = searchParams.get('month')
    const date = searchParams.get('date')

    let query = supabaseAdmin
      .from('trades')
      .select('*')
      .order('open_date', { ascending: false })

    // 年月でフィルタ（open_dateベース）
    if (year && month) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`
      // 正しい月末日を計算
      const nextMonth = new Date(parseInt(year), parseInt(month), 1)
      const endDate = nextMonth.toISOString().split('T')[0]
      query = query.gte('open_date', startDate).lt('open_date', endDate)
    }

    // 特定の日付でフィルタ（open_dateまたはclose_dateのいずれか）
    if (date) {
      query = query.or(`open_date.eq.${date},close_date.eq.${date}`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(data)
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - 新規トレード作成
export async function POST(request) {
  try {
    const body = await request.json()

    // データ検証（例）
    if (!body.symbol || !body.open_date) {
      return Response.json(
        { error: 'Required fields: symbol, open_date' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('trades')
      .insert([body])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return Response.json(data[0], { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - トレード更新
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return Response.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('trades')
      .update(body)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    if (data.length === 0) {
      return Response.json(
        { error: 'Trade not found' },
        { status: 404 }
      )
    }

    return Response.json(data[0])
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - トレード削除
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return Response.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('trades')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return Response.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}