'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TradeListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedDate = searchParams.get('date');
  
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 指定日のトレードデータを取得
  const fetchTradesForDate = async (date) => {
    if (!date) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/trades?date=${date}`);
      
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      
      const data = await response.json();
      setTrades(data);
    } catch (err) {
      console.error('トレードデータ取得エラー:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTradesForDate(selectedDate);
    }
  }, [selectedDate]);

  // 日付フォーマット関数
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // 時刻フォーマット関数
  const formatTime = (timeString) => {
    if (!timeString) return '-';
    
    // タイムゾーン情報を除去して時刻部分のみ抽出
    const timeOnly = timeString.includes('T') 
      ? timeString.split('T')[1].split('+')[0].split('-')[0].split('.')[0]
      : timeString.split(' ')[1] || timeString;
    
    return timeOnly.substring(0, 8); // HH:MM:SS
  };

  // 損益の色分け
  const getProfitColor = (profit) => {
    if (profit > 0) return 'text-green-600';
    if (profit < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  // 統計計算
  const stats = {
    totalTrades: trades.length,
    totalProfit: trades.reduce((sum, trade) => sum + (trade.profit || 0), 0),
    
    totalPips: Math.round((trades.reduce((sum, trade) => sum + (trade.pips || 0), 0) + Number.EPSILON) * 10) / 10,
// 結果: 68.3
    winningTrades: trades.filter(trade => (trade.profit || 0) > 0).length,
    losingTrades: trades.filter(trade => (trade.profit || 0) < 0).length,
    winRate: trades.length > 0 ? Math.round((trades.filter(trade => (trade.profit || 0) > 0).length / trades.length) * 100) : 0
  };
  console.log('🚀 Debug: stats.totalPips:', stats.totalPips);
  if (!selectedDate) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">エラー</h1>
            <p className="text-gray-600">日付が指定されていません。</p>
            <Link href="/trade" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              カレンダーに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                📊 {formatDate(selectedDate)} のトレード履歴
              </h1>
              <p className="text-gray-600">
                詳細なトレード情報を確認できます
              </p>
            </div>
            <Link 
              href="/trade" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← カレンダーに戻る
            </Link>
          </div>
        </div>

        {/* 日別統計 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 日別サマリー</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTrades}</div>
              <div className="text-sm text-gray-600">総取引数</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.winningTrades}</div>
              <div className="text-sm text-gray-600">勝ちトレード</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.losingTrades}</div>
              <div className="text-sm text-gray-600">負けトレード</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className={`text-xl font-bold ${getProfitColor(stats.totalProfit)}`}>
                ¥{Math.abs(stats.totalProfit).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">総損益</div>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
               
              <div className={`text-lg md:text-xl font-bold truncate ${stats.totalPips >= 0 ? 'text-green-600' : 'text-red-600'}`} title={`${stats.totalPips > 0 ? '+' : ''}${stats.totalPips}pips`}>
                {stats.totalPips > 0 ? '+' : ''}{Math.abs(stats.totalPips) >= 1000 
                  ? `${Math.round(Math.abs(stats.totalPips) / 100) / 10}k`
                  : stats.totalPips}
              </div>              
              <div className="text-sm text-gray-600">総Pips</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.winRate}%</div>
              <div className="text-sm text-gray-600">勝率</div>
            </div>
          </div>
        </div>

        {/* トレード履歴テーブル */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 取引詳細</h3>
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-gray-600">データを読み込み中...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800">❌ エラー: {error}</p>
            </div>
          )}

          {!loading && !error && trades.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">📭 この日のトレードデータはありません</p>
            </div>
          )}

          {!loading && !error && trades.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">チケット#</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">通貨ペア</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">売買</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">ロット</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">開始時刻</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">終了時刻</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">エントリー</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">エグジット</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Pips</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">損益</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">メモ</th>
                  </tr>
                </thead>
                <tbody>
                  {trades.map((trade, index) => (
                    <tr key={trade.id || index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{trade.mt5_ticket}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{trade.symbol}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.type === 'buy' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.type?.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">{trade.volume}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatTime(trade.open_time)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatTime(trade.close_time)}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {trade.entry_price?.toFixed(5)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {trade.exit_price?.toFixed(5)}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${getProfitColor(trade.pips)}`}>
                        {trade.pips > 0 ? '+' : ''}{trade.pips}
                      </td>
                      <td className={`px-4 py-3 text-sm text-right font-medium ${getProfitColor(trade.profit)}`}>
                        ¥{Math.abs(trade.profit || 0).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-32 truncate" title={trade.notes}>
                        {trade.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}