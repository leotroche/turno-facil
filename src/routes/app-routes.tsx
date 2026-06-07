import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { LoginForm } from '@/components/login-form'
import { PrivateLayout } from '@/layouts/private-layout'
import { PublicLayout } from '@/layouts/public-layout'
import { DocenteTurnos } from '@/pages/docente-turnos'
import { RegisterPage } from '@/pages/register'
import { Turnos } from '@/pages/turnos'

export function AppRoutes() {
  return (
    <div className="container mx-auto min-h-dvh border-x px-4 py-8">
      <ToastContainer theme="dark" position="bottom-right" />

      <Routes>
        {/* Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/login" Component={LoginForm} />
          <Route path="/register" Component={RegisterPage} />
        </Route>

        {/* Privadas */}
        <Route element={<PrivateLayout />}>
          <Route path="/alumnos" Component={Turnos} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/docentes" Component={DocenteTurnos} />
        </Route>
      </Routes>
    </div>
  )
}
