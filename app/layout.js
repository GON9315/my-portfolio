import Link from 'next/link'

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <Link href="/">Home</Link> | 
          <Link href="/about">About</Link> | 
          <Link href="/skills">Skills</Link> | 
          <Link href="/projects">Projects</Link> | 
          <Link href="/contact">Contact</Link>
        </nav>
        
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}