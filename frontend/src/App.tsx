import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { LangProvider } from './lib/i18n'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <LangProvider>
      <RouterProvider router={router} />
      {/* Tích hợp thống kê lượt truy cập Vercel Analytics */}
      <Analytics />
    </LangProvider>
  )
}

export default App

