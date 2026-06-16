// oxlint-disable jsx-a11y/aria-role

import { Navigate, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'

import { ProtectedLayout } from '@/layouts/protected-layout'
import { PublicLayout } from '@/layouts/public-layout'
import { AlumnoTurnos } from '@/pages/alumno-turnos'
import { DocenteTurnos } from '@/pages/docente-turnos'
import { LoginPage } from '@/pages/login'
import { MisTurnosPage } from '@/pages/mis-turnos'
import { RegisterPage } from '@/pages/register'

export function AppRoutes() {
  return (
    <div className="container mx-auto min-h-dvh border-x px-4 py-8">
      <ToastContainer theme="dark" position="bottom-right" />

      <Routes>
        {/* root redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Alumno */}
        <Route element={<ProtectedLayout role="alumno" />}>
          <Route path="/alumno" element={<AlumnoTurnos />} />
          <Route path="/alumno/mis-turnos" element={<MisTurnosPage />} />
        </Route>

        {/* Docente */}
        <Route element={<ProtectedLayout role="docente" />}>
          <Route path="/docente" element={<DocenteTurnos />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  )
}
