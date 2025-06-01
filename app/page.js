import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
   
 
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            私のポートフォリオサイト
          </h1>
          <p className={styles.heroSubtitle}>
            こんにちは、Web開発を学習中です！
          </p>
          <p className={styles.heroDescription}>
            このサイトは私のスキルと作品を紹介するために作りました。
          </p>

          <Link href="/projects" className={styles.heroButton}>
              プロジェクトを見る
          </Link>              

        </div>
      </div>

      

  )
}