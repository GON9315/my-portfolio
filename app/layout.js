export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <a href="/">Home</a> | 
          <a href="/about">About</a> | 
          <a href="/skills">Skills</a> | 
          <a href="/projects">Projects</a> | 
          <a href="/contact">Contact</a>
        </nav>
        
        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  )
}