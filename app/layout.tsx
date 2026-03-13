import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BLACK BOX — Deal Intelligence & Strategic Data Vault',
  description: 'Secure Deal Intelligence, Data Aggregation, and Strategic Analysis Engine for infrastructure, energy, development, and capital markets platforms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="grid-bg min-h-screen">
        <div className="scan-line" />
        {children}
      </body>
    </html>
  )
}
