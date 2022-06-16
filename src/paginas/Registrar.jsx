import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../components/config/axios.jsx'

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState ({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Enviado Formulario');

        if ([nombre, email, password, repetirPassword].includes('')){
            //console.log("Hay campos vacíos");
            setAlerta ({msg: 'Hay campos vacíos', error: true});
            return;
        }

        if(password !== repetirPassword){
            console.log('Los password no coinciden');
            setAlerta ({msg: 'Los passwords ingresados no coinciden', error: true});
            return;
        }

        if(password.length < 8 ){
            console.log('El password es menor a 8 dígitos');
            setAlerta ({msg: 'El password ingresado es menor a 8 dígitos', error: true});
            return;
        }
        setAlerta ({});

        //Crear el us en la API
        try {
            const url = '/veterinarios'
            await clienteAxios.post(url, {nombre, email, password});
            setAlerta({
                msg: "Creado Correctamente, revisa tu email",
                error: false
            });
        } catch (error) {
            //console.log(error)
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });
        }

    };

    const {msg} = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl " >
                    Crea tu cuenta y Administra tus {''}<span className="text-black ">Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>

                {msg && <Alerta 
                    alerta={alerta}
                />}

                <form
                    onSubmit={handleSubmit}
                >
                    {/* label + input de Nombre */}
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese su nombre"
                            className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    {/* label + input de email */}
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Ingrese su email"
                            className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    {/* label + input de Password */}
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Crea una password"
                            className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {/* label + input de reingreso de Password */}
                    <div className="my-5">
                        <input
                            type="password"
                            placeholder="Repite tu password"
                            className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Registrar Cuenta"
                        className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:text-indigo-900 md:w-auto"
                    />


                    <nav className='mt-10 lg:flex lg:justify-between'>
                        <Link
                            className='block text-center my-5 text-grey-500'
                            to="/">Ya tienes una cuenta, Inicia Sesión</Link>
                        <Link
                            className='block text-center my-5 text-grey-500'
                            to="/olvide-password">Olvidé mi password</Link>
                    </nav>
                </form>
            </div>
        </>
    )
}

export default Registrar