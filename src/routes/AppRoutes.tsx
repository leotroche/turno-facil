import { Route, Routes } from 'react-router'

import { HomePage } from '@/pages/Home'

export function AppRoutes() {
  return (
    <div className="grid min-h-dvh place-items-center">
      <Routes>
        <Route index Component={HomePage} />
      </Routes>
    </div>
  )
}
