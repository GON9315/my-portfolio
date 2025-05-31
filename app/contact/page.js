


export default function Contact() {
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
          Contact
        </h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', textAlign: 'center' }}>
          お気軽にお問い合わせください。
        </p>
        
        <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
          連絡先
        </h2>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <p style={{ margin: '5px 0' }}>📧 Email:ymkbuyer@gmail.com</p>

        </div>
        
        <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
          お問い合わせフォーム
        </h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              お名前:
            </label>
            <input 
              type="text" 
              name="name" 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              メールアドレス:
            </label>
            <input 
              type="email" 
              name="email" 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              メッセージ:
            </label>
            <textarea 
              name="message" 
              rows="5" 
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          
          <button 
            type="submit"
            style={{
              background: '#667eea',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  )
}