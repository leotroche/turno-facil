import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { AdminTurnos } from '@/pages/admin-turnos'
import { HomePage } from '@/pages/Home'
import { SignupPage } from '@/pages/signup'
import { Turnos } from '@/pages/turnos'

export function AppRoutes() {
  return (
    <div className="container mx-auto min-h-dvh border-x px-4 py-8">
      <ToastContainer theme="dark" position="bottom-right" />

      <Routes>
        <Route index Component={HomePage} />
        <Route path="/signup" Component={SignupPage} />
        <Route path="/turnos" Component={Turnos} />
        <Route path="/admin/turnos" Component={AdminTurnos} />
      </Routes>
    </div>
  )
}
