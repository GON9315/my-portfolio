

import styles from './contact.module.css'

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <h1 className={styles.contactTitle}>
          Contact
        </h1>
        <p className={styles.contactSubtitle}>
          お気軽にお問い合わせください。
        </p>
        
        <h2 className={styles.sectionTitle}>
          連絡先
        </h2>
        <div className={styles.contactInfo}>
          <p >📧 Email:ymkbuyer@gmail.com</p>

        </div>
        
        <h2 className={styles.sectionTitle}>
          お問い合わせフォーム
        </h2>
        <form 
          action="https://formspree.io/f/movwazjp"
          method="POST"
          className={styles.contactForm}
        >
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              お名前:
            </label>
            <input 
              type="text" 
              name="name" 
              required
              className={styles.formInput}

            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              メールアドレス:
            </label>
            <input 
              type="email" 
              name="email" 
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              メッセージ:
            </label>
            <textarea 
              name="message" 
              rows="5" 
              required
              className={styles.formTextarea}
            ></textarea>
          </div>
          
          <button 
            type="submit"
            className={styles.submitButton}
          >
            送信
          </button>
        </form>
      </div>
    </div>
  )
}