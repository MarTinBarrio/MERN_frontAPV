import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../components/config/axios.jsx";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  let paso = 0;
  //Hago reactiva la alerta
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false); //false, ya q por default la cuenta no está confirmada
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({}); // en principio es un obj vacío q se llena con los llamados.

  const params = useParams(); //permite leer los parámetros de la URL
  const { id } = params;

  //console.log(params);
  //id es como lo llamé en App.jsx: <Route path="confirmar/:id" element={<ConfirmarCuenta /> }/>



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const url = `/veterinarios/confirmar/${id}`
      //console.log(url); //confirmo la URL pero no puedo hacer click por CORS, solo desde el consumo de la API...

      const { data } = await clienteAxios(url);

      setCuentaConfirmada(true);

      setAlerta({
        msg: data.msg,
        error: false
      })

    } catch (error) {
      //console.log(error.response.data.msg);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    setCargando(false);
  };



  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl " >
          Confirma tu cuenta y comienza a Administra tus {''}<span className="text-black ">Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>
        <form
          onSubmit={handleSubmit}
        >
          {cargando &&
            <input
              type="submit"
              value="Confirmar Cuenta"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:text-indigo-900 md:w-auto"
            />
          }
        </form>

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