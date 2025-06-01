import styles from './layout.module.css'
import Link from 'next/link'

import './globals.css'  // この行を追加

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <nav className="nav">
          <div className="nav-container">
            <Link href="/" className="nav-link">Home</Link> |
            <Link href="/about" className="nav-link">About</Link> |
            <Link href="/skills" className="nav-link">Skills</Link> |
            <Link href="/projects" className="nav-link">Projects</Link> |
            <Link href="/contact" className="nav-link">Contact</Link>            
          </div>
        </nav>
        
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}