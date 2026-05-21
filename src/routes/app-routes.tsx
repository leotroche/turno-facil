import { Route, Routes } from 'react-router'

import { HomePage } from '@/pages/home'
import { SignupPage } from '@/pages/signup'
import Turnos from '@/pages/turnos'

export function AppRoutes() {
  return (
    <div className="container mx-auto grid min-h-dvh place-items-center">
      <Routes>
        <Route index Component={HomePage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/turnos" Component={Turnos} />
      </Routes>
    </div>
  )
}
