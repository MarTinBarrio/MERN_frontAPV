import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdminsitrarPacientes from './paginas/AdminsitrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'


function App() {

  //console.log(import.meta.env.VITE_BACKEND_URL);//la variable de entorno comienza con VITE_ y funciona
  //console.log(import.meta.env.IMAGENES_URL);//la variable de entorno no comienza con VITE_ y no funciona

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
            <Routes>

              {/* Area pública... se puede acceder sin autenticación */}
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} /> {/* Indica q es la pagina principal */}
                <Route path="registrar" element={<Registrar />} />
                <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
              </Route>


              {/* Area privada... se accede solo con autenticación */}
              <Route path="/admin" element={<RutaProtegida />}>
                <Route index element={<AdminsitrarPacientes />} />
                <Route path="perfil" element={<EditarPerfil />} />
                <Route path="cambiar-password" element={<CambiarPassword />} />
              </Route>

            </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>

  )
}

export default App
