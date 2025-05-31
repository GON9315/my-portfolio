export default function Projects() {
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
        <h1 style={{ fontSize: '2.5em', marginBottom: '30px', textAlign: 'center' }}>
          Skills
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            Projects
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['倉庫管理システム', '輸配送管理システム', '消費財倉庫管理システム', '出荷検品システム', 'CMS(自作)','検定会社顧客管理システム'].map(skill => (
              <span key={skill} style={{
                background: '#f0f0f0',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        
       
      
      </div>
    </div>
  )
}