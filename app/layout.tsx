import './globals.css'

export const metadata = {
  title: 'Netflix Clone',
  description: 'Learning Next.js by building a Netflix Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
