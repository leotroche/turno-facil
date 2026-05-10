import { Route, Routes } from 'react-router'

import { HomePage } from '@/pages/Home'
import { SignupPage } from '@/pages/Signup'

export function AppRoutes() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <Routes>
        <Route index Component={HomePage} />
        <Route path="/signup" Component={SignupPage} />
      </Routes>
    </div>
  )
}
