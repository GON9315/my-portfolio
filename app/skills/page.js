import styles from './skills.module.css'

export default function Skills() {
  return (
    <div className={styles.skillsContainer}>
      <div className={styles.skillsContent}>
        <h1 className={styles.skillsTitle}>
          Skills
        </h1>
        
        <div className={styles.skillSection}>
          <h2 className={styles.skillSectionTitle}>
            プログラミング言語
          </h2>
          <div className={styles.skillTags}>
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
        
        <div className={styles.skillSection}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            ツール
          </h2>
          <div className={styles.skillTags}>
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

        <div className={styles.skillSection}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            DB
          </h2>
          <div className={styles.skillTags}>
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
        
        <div className={styles.skillSection}>
          <h2 style={{ color: '#667eea', marginBottom: '15px' }}>
            その他
          </h2>
          <div className={styles.skillTags}>
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