import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../components/config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    //defino los states q estarán disponibles globalmente
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState ('true');

    useEffect (() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem ('apv_token_id');
            
            //console.log(token);
            if (!token) {
                setCargando(false);
                return //detengo la ejecución del código si no tengo token.
            }

            //armo el msg para consumir al API agregando el headers con el bearer
            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios ('/veterinarios/perfil', config);
                //console.log(data);
                //guardo en el estado global los datos de la rta del logeo, q es el perfil.
                setAuth(data);
                setCargando(false);

            } catch (error) {
                console.log(error.resonse.data.msg);
                //en caso de error cargamos al Auth con un objeto vacío...
                setAuth({});
                setCargando(false);
            }
        }
        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('apv_token_id');
        setAuth({});
    }


    const actualizarPerfil = async (datos) => {
        //console.log(datos);
        const token = localStorage.getItem ('apv_token_id');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = `/veterinarios/perfil/${datos._id}`;
            //console.log(datos._id, datos.nombre, datos.email, datos.telefono, datos.web);
            const {data} = await clienteAxios.put(url, datos, config);
            //console.log(data);
            return {
                msg: "Almacenado Correctamente",
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        //console.log(datos);
        const token = localStorage.getItem ('apv_token_id');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/veterinarios/actualizar-password', datos, config);
            //console.log (data);
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
        
    }


    return(
        <AuthContext.Provider
            value = {{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >

            {children}

        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext;