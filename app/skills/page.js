
export default function Skills() {
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
            プログラミング言語
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['HTML', 'CSS', 'JavaScript', 'React (学習中)', 'Next.js (学習中)','Java','C#','VB.net','PL/SQL','Python'].map(skill => (
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
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            ツール
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Visual Studio Code', 'Git (学習予定)', 'Node.js','Eclipse','Visual Studio'].map(tool => (
              <span key={tool} style={{
                background: '#f0f0f0',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            DB
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Oracle', 'SQL Server', 'PostgressSQL','SQLite','MySQL'].map(tool => (
              <span key={tool} style={{
                background: '#f0f0f0',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {tool}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            その他
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['Web開発の基礎知識', 'レスポンシブデザイン（学習予定）'].map(tool => (
              <span key={tool} style={{
                background: '#f0f0f0',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {tool}
              </span>
            ))}
          </div>

        </div>        
      </div>
    </div>
  )
}