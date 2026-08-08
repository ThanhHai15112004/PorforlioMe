import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { LangProvider } from './lib/i18n'

function App() {
  return (
    <LangProvider>
      <RouterProvider router={router} />
    </LangProvider>
  )
}

export default App

