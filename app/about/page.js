export default function About() {
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
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>
          About Me
        </h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          私について詳しく紹介します。
        </p>
        
        <h2 style={{ color: '#667eea', marginTop: '30px', marginBottom: '15px' }}>
          経歴
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          Web開発の学習を始めました。HTML、CSS、JavaScriptの基礎を学び、現在はNext.jsでポートフォリオサイトを作成中です。
        </p>
        
        <h2 style={{ color: '#667eea', marginTop: '30px', marginBottom: '15px' }}>
          趣味
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          プログラミング、武術、システムトレード
        </p>
      </div>
    </div>
  )
}