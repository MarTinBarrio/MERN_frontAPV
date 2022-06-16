import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../components/config/axios.jsx";

const ConfirmarCuenta = () => {

  let paso=0;
  //Hago reactiva la alerta
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); //false, ya q por default la cuenta no está confirmada
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({}); // en principio es un obj vacío q se llena con los llamados.

  const params = useParams(); //permite leer los parámetros de la URL
  const { id } = params;

  //console.log(params);
  //id es como lo llamé en App.jsx: <Route path="confirmar/:id" element={<ConfirmarCuenta /> }/>


  useEffect(() => {
    console.log('useEffect');
    const confirmarCuenta = async () => {
      console.log('confirmarCuenta');

      try {
        console.log('try');
        const url = `/veterinarios/confirmar/${id}`
        console.log(url); //confirmo la URL pero no puedo hacer click por CORS, solo desde el consumo de la API...
        console.log('paso: ', paso++);
        const { data } = await clienteAxios(url);

        console.log('setAlerta1');
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
          error: false
        })

      } catch (error) {
        console.log('catch');
        //console.log(error.response.data.msg);
        console.log('setAlerta2');
        setAlerta({

          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false);
      console.log('setCargando');
    }
    confirmarCuenta();
    console.log('confirmarCuenta');

  },[])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl " >
          Confirma tu cuenta y comienza a Administra tus {''}<span className="text-black ">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>
        {!cargando &&
          <Alerta
            alerta={alerta}
          />}

        {cuentaConfirmada &&
        <Link
          className='block text-center my-5 text-grey-500'
          to="/">Iniciar Sesión
        </Link>
        }


      </div>
    </>
  )
}

export default ConfirmarCuenta