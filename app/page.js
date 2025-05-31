export default function Home() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '40px',
      color: 'white'
    }}>
      <div style={{
        background: 'white',
        color: 'black',
        padding: '40px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>
          私のポートフォリオサイト
        </h1>
        <p style={{ fontSize: '1.2em', marginBottom: '15px' }}>
          こんにちは、Web開発を学習中です！
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: '25px' }}>
          このサイトは私のスキルと作品を紹介するために作りました。
        </p>
        <button style={{
          background: '#667eea',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          プロジェクトを見る
        </button>
      </div>
    </div>
  )
}