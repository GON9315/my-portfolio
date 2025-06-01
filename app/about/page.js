import styles from './about.module.css'

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        <h1 className={styles.aboutTitle}>
          About Me
        </h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px' }}>
          私について詳しく紹介します。
        </p>

        <div className={styles.aboutSection}>
          <h2 className={styles.aboutSectionTitle}>
            経歴
          </h2>
          <p style={{ lineHeight: '1.6' }}>
            Web開発の学習を始めました。HTML、CSS、JavaScriptの基礎を学び、現在はNext.jsでポートフォリオサイトを作成中です。
          </p>

        </div>

        
        <h2 className={styles.aboutSectionTitle}>
          趣味
        </h2>
        <p style={{ lineHeight: '1.6' }}>
          プログラミング、武術、システムトレード
        </p>
      </div>
    </div>
  )
}