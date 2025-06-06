import styles from './projects.module.css'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className={styles.projectsContainer}>
      <div className={styles.projectsContent}>
        <h1 className={styles.projectsTitle}>
          Projects
        </h1>

        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>
            
            <Link href="/" className={styles.projectLink}>
              ポートフォリオサイト
            </Link>  
          </h3>
          <p className={styles.projectDescription}>
            Next.jsで作成した個人ポートフォリオサイト。レスポンシブデザイン対応で、
            お問い合わせフォーム機能も実装しています。
          </p>
          <p className={styles.projectTech}>使用技術: Next.js, CSS Modules, Formspree</p>
        </div>        

        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>
            
            <Link href="/trade" className={styles.projectLink}>
              トレード記録アプリ
            </Link>              
          </h3>
          <p className={styles.projectDescription}>
            個人の投資・トレードの記録を管理するWebアプリケーション。
          </p>
          <ul className={styles.projectFeatures}>
            <li>カレンダー別の取引履歴の参照</li>
            <li>自動損益計算機能(未実装)</li>
            <li>月別・年別パフォーマンス分析(未実装)</li>
            <li>チャートによるデータ可視化(未実装)</li>
          </ul>

          <p className={styles.projectTech}>使用技術: Node.js, Next.js, React, Supabase PostgreSQL, formspree(メール送信機能)</p>
        </div>        
        
        <div className={styles.projectCard}>
          <h2 className={styles.projectTitle}>
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