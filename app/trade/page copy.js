'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { Calendar, TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';

export default function TradePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URLパラメータから年月を取得、なければ現在の年月を使用
  const getInitialDate = () => {
    const yearParam = searchParams.get('year');
    const monthParam = searchParams.get('month');
    
    if (yearParam && monthParam) {
      const year = parseInt(yearParam);
      const month = parseInt(monthParam) - 1; // JavaScriptの月は0から始まる
      console.log('📅 Debug: URL params detected, setting date to:', { year, month: month + 1 });
      return new Date(year, month, 1);
    }
    
    console.log('📅 Debug: No URL params, using current date');
    return new Date(2025, 5, 1); // デフォルト: 2025年6月1日
  };
  
  const [currentDate, setCurrentDate] = useState(getInitialDate());
  const [trades, setTrades] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // データベースからトレードデータを取得する関数
  const fetchTradesForMonth = async (year, month) => {
    setLoading(true);
    setError(null);
    
    try {
      // 実際のAPI呼び出し
      const response = await fetch(`/api/trades?year=${year}&month=${month + 1}`);
      
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }
      
      const data = await response.json();
      
      // データを日付ごとにグループ化（open_dateとclose_date両方を考慮）
      const groupedTrades = {};
      data.forEach(trade => {
        // open_dateでグループ化（文字列として直接使用）
        const openDate = trade.open_date;
        if (openDate) {
          if (!groupedTrades[openDate]) {
            groupedTrades[openDate] = [];
          }
          groupedTrades[openDate].push({...trade, dateType: 'open'});
        }
        
        // close_dateでもグループ化（nullでない場合）
        const closeDate = trade.close_date;
        if (closeDate && closeDate !== openDate) {
          if (!groupedTrades[closeDate]) {
            groupedTrades[closeDate] = [];
          }
          groupedTrades[closeDate].push({...trade, dateType: 'close'});
        }
      });
      
      setTrades(groupedTrades);
    } catch (err) {
      console.error('トレードデータ取得エラー:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 月が変更された時にデータを取得
  useEffect(() => {
    fetchTradesForMonth(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  // 月の日付データを生成
  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // その月の最初の日と最後の日
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // カレンダーの開始日（月の最初の日の週の日曜日）
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // カレンダーの日付を生成（6週間分）
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateMonthDays();

  // 日付クリック時の処理
  const handleDateClick = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // 現在表示中の年月をURLパラメータに追加
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    router.push(`/trade/list?date=${dateString}&returnYear=${currentYear}&returnMonth=${currentMonth}`);
  };

  // 今日の日付かチェック
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // 現在の月の日付かチェック
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // 前月・次月への移動
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 月の表示名を取得
  const getMonthDisplayName = () => {
    return currentDate.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long'
    });
  };

  // 指定日のトレードデータを取得
  const getTradesForDate = (date) => {
    // dateオブジェクトをYYYY-MM-DD形式の文字列に変換（タイムゾーン変換なし）
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    return trades[dateStr] || [];
  };

  // 指定日の取引数を取得
  const getTradeCount = (date) => {
    return getTradesForDate(date).length;
  };

  // 指定日の損益を計算
  const getDayProfit = (date) => {
    const dayTrades = getTradesForDate(date);
    const profit = dayTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0);
    return Math.round((profit + Number.EPSILON) * 100) / 100;
  };

  // 指定日のpipsを計算
  const getDayPips = (date) => {
    const dayTrades = getTradesForDate(date);
    const pips = dayTrades.reduce((sum, trade) => sum + (trade.pips || 0), 0);
    return Math.round((pips + Number.EPSILON) * 10) / 10;
  };

  // 曜日を取得
  const getDayOfWeek = (date) => {
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    return dayNames[date.getDay()];
  };

  // 現在月の統計を計算
  const getCurrentMonthStats = () => {
    const currentMonthTrades = Object.entries(trades)
      .filter(([dateString]) => {
        const tradeDate = new Date(dateString);
        return tradeDate.getFullYear() === currentDate.getFullYear() && 
               tradeDate.getMonth() === currentDate.getMonth();
      })
      .flatMap(([, dayTrades]) => dayTrades);

    const totalTrades = currentMonthTrades.length;
    const totalProfit = Math.round((currentMonthTrades.reduce((sum, trade) => sum + (trade.profit || 0), 0) + Number.EPSILON) * 100) / 100;
    const totalPips = Math.round((currentMonthTrades.reduce((sum, trade) => sum + (trade.pips || 0), 0) + Number.EPSILON) * 10) / 10;
    const winningTrades = currentMonthTrades.filter(trade => (trade.profit || 0) > 0).length;
    const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
    
    const tradeDays = Object.keys(trades).filter(dateString => {
      const tradeDate = new Date(dateString);
      return tradeDate.getFullYear() === currentDate.getFullYear() && 
             tradeDate.getMonth() === currentDate.getMonth() &&
             trades[dateString].length > 0;
    }).length;

    const avgTrades = tradeDays > 0 ? Math.round((totalTrades / tradeDays) * 10) / 10 : 0;

    return { 
      totalTrades, 
      tradeDays, 
      avgTrades, 
      totalProfit, 
      totalPips, 
      winRate 
    };
  };

  const monthStats = getCurrentMonthStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            {/* <Calendar className="w-6 h-6 text-blue-600" /> */}
            📅
            <h1 className="text-2xl font-bold text-gray-900">
              トレード記録カレンダー
            </h1>
          </div>
          <p className="text-gray-600">
            日付をクリックして取引履歴を確認できます
          </p>
          
          {/* エラー表示 */}
          {error && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ データベース接続エラー: {error}（サンプルデータを表示中）
              </p>
            </div>
          )}
        </div>

        {/* 今月の統計 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            {/* <BarChart3 className="w-5 h-5 text-blue-600" /> */}
            📊
            {getMonthDisplayName()}の統計
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-blue-600 truncate">
                {monthStats.totalTrades}
              </div>
              <div className="text-xs md:text-sm text-gray-600">総取引数</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-green-600 truncate">
                {monthStats.tradeDays}
              </div>
              <div className="text-xs md:text-sm text-gray-600">取引日数</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-purple-600 truncate">
                {monthStats.avgTrades}
              </div>
              <div className="text-xs md:text-sm text-gray-600">1日平均</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className={`text-lg md:text-xl font-bold truncate ${monthStats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} title={`¥${Math.abs(monthStats.totalProfit).toLocaleString()}`}>
                ¥{Math.abs(monthStats.totalProfit) >= 10000 
                  ? `${Math.round(Math.abs(monthStats.totalProfit) / 1000)}k`
                  : Math.abs(monthStats.totalProfit).toLocaleString()}
              </div>
              <div className="text-xs md:text-sm text-gray-600">総損益</div>
            </div>
            <div className="text-center p-3 bg-indigo-50 rounded-lg">
              <div className={`text-lg md:text-xl font-bold truncate ${monthStats.totalPips >= 0 ? 'text-green-600' : 'text-red-600'}`} title={`${monthStats.totalPips > 0 ? '+' : ''}${monthStats.totalPips}pips`}>
                {monthStats.totalPips > 0 ? '+' : ''}{Math.abs(monthStats.totalPips) >= 1000 
                  ? `${Math.round(Math.abs(monthStats.totalPips) / 100) / 10}k`
                  : monthStats.totalPips}
              </div>
              <div className="text-xs md:text-sm text-gray-600">総Pips</div>
            </div>
            <div className="text-center p-3 bg-teal-50 rounded-lg">
              <div className="text-xl md:text-2xl font-bold text-teal-600 truncate">
                {monthStats.winRate}%
              </div>
              <div className="text-xs md:text-sm text-gray-600">勝率</div>
            </div>
          </div>
        </div>

        {/* カレンダー */}
        <div className="bg-white rounded-lg shadow-sm p-6 relative">
          {/* ローディング表示 */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-600">データを読み込み中...</span>
              </div>
            </div>
          )}

          {/* カレンダーヘッダー（月移動コントロール） */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
            >
              ← 前月
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900">
              {getMonthDisplayName()}
            </h2>
            
            <button
              onClick={goToNextMonth}
              disabled={loading}
              className="flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
            >
              次月 →
            </button>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['日', '月', '火', '水', '木', '金', '土'].map((dayName, index) => (
              <div key={dayName} className={`text-center py-2 text-sm font-medium ${
                index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {dayName}
              </div>
            ))}
          </div>

          {/* 日付グリッド */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {calendarDays.map((date, index) => {
              const tradeCount = getTradeCount(date);
              const dayProfit = getDayProfit(date);
              const dayPips = getDayPips(date);
              const hasTradeData = tradeCount > 0;
              const dayOfWeek = getDayOfWeek(date);
              
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={loading}
                  className={`
                    relative h-20 flex flex-col items-center justify-center text-sm rounded-lg border transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed
                    ${!isCurrentMonth(date) 
                      ? 'bg-gray-50 text-gray-400 border-gray-100' 
                      : isToday(date) 
                        ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
                        : hasTradeData
                          ? dayProfit > 0
                            ? 'bg-green-100 text-green-900 border-green-200 hover:bg-green-200'
                            : dayProfit < 0
                              ? 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200'
                          : 'bg-white text-gray-900 border-gray-200 hover:bg-blue-50'
                    }
                  `}
                >
                  <div className="font-semibold">{date.getDate()}</div>
                  
                  {/* 取引データがある場合の詳細表示 */}
                  {hasTradeData && isCurrentMonth(date) && (
                    <div className="flex flex-col items-center text-xs mt-1">
                      <div className="flex items-center gap-1">
                        <span>{tradeCount}件</span>
                        {dayProfit > 0 ? (
                          // <TrendingUp className="w-3 h-3" />
                          <span className="text-green-600">📈</span>
                        ) : dayProfit < 0 ? (
                          // <TrendingDown className="w-3 h-3" />
                          <span className="text-red-600">📉</span>
                        ) : null}
                      </div>
                      {dayProfit !== 0 && (
                        <div className="font-medium">
                          ¥{Math.abs(dayProfit).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* 取引数バッジ */}
                  {hasTradeData && isCurrentMonth(date) && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      isToday(date) 
                        ? 'bg-white text-blue-500' 
                        : dayProfit > 0
                          ? 'bg-green-500 text-white'
                          : dayProfit < 0
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-500 text-white'
                    }`}>
                      {tradeCount}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 凡例 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>今日</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span>利益あり</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span>損失あり</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span>損益なし</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}