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
              トレード記録システム
            </Link>              
          </h3>
          <p className={styles.projectDescription}>
            個人のシステムトレードの記録を管理するWebアプリケーション。
          </p>
          <ul className={styles.projectFeatures}>
            <li>カレンダー別の取引履歴の参照</li>
          </ul>

          <p className={styles.projectTech}>使用技術: Node.js, Next.js, React, Supabase PostgreSQL</p>
          
          {/* システム構成図のリンクを追加 */}
          <div style={{ marginTop: '10px' }}>
            <Link href="/system" className={styles.projectLink}>
              システム構成図
            </Link>
          </div>
        </div>        

        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>
            
            <Link href="https://fascinating-cascaron-3aed06.netlify.app/" className={styles.projectLink}>
              株自動売買アプリケーション
            </Link>              
          </h3>
          <p className={styles.projectDescription}>
            シグナルを受信し、12:30に引成(後場)で注文を出す株の自動売買
          </p>
          <ul className={styles.projectFeatures}>
            <li>ライセンスがないと利用できません。</li>
          </ul>

          <p className={styles.projectTech}>使用技術: C#, netlify</p>
        </div>       

        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>
            
            <Link href="https://gon9315.github.io/stock-earnings-dashboard/" className={styles.projectLink}>
              決算日翌日の騰落率表示システム
            </Link>              
          </h3>
          <p className={styles.projectDescription}>
            決算日の翌日の登録率が丸わかり。
            銘柄、日付検索。
            CSVデータ出力。
          </p>
          <ul className={styles.projectFeatures}>
            <li>デモユーザーでログインするとイメージがわかります。</li>
          </ul>

          <p className={styles.projectTech}>使用技術: C#, Lambda(C#), Dynamo DB</p>
          <p className={styles.projectTech}>使用技術(フロントエンド): GitHubPage, [Cognito(認証), API Gateway, Lambda(node.js), Dynamo DB](AWS)</p>
        </div>         

        <div className={styles.projectCard}>
          <h3 className={styles.projectTitle}>
            
            <Link href="https://panda-auth-umber.vercel.app/" className={styles.projectLink}>
              ライセンス管理システム
            </Link>              
          </h3>
          <p className={styles.projectDescription}>
            配布したツールのライセンスの一覧と利用解除するシステム
          </p>
          <ul className={styles.projectFeatures}>
            <li>ライセンスの一覧表示</li>
            <li>ライセンスの利用状況と利用解除</li>
          </ul>

          <p className={styles.projectTech}>使用技術: Node.js, Next.js, React, Supabase PostgreSQL</p>
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