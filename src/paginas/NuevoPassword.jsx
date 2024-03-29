import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../components/config/axios";

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState (false);

    const params = useParams();
    //console.log(params);
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
            try {

                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({
                    msg: 'Coloca tu nuevo Password',
                    error: false
                })
                setTokenValido(true);
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })

            }
        }
        comprobarToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([password, repetirPassword].includes('')){
            //console.log("Hay campos vacíos");
            setAlerta ({msg: 'Hay campos vacíos', error: true});
            return;
        }

        if(password !== repetirPassword){
            //console.log('Los password no coinciden');
            setAlerta ({msg: 'Los passwords ingresados no coinciden', error: true});
            return;
        }

        if(password.length < 8 ){
            //console.log('El password es menor a 8 dígitos');
            setAlerta ({msg: 'El password ingresado es menor a 8 dígitos', error: true});
            return;
        }

        setAlerta({});

        try {
            const { data } = await clienteAxios.post(`veterinarios/olvide-password/${token}`, {
                password
            })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }

    }

    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl " >
                    Reestablece tu password y no pierdas accesos a {''}<span className="text-black ">tus Pacientes</span>
                </h1>
            </div>

            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white '>

            {msg && <Alerta
                        alerta={alerta}
                    />
            }
                
                    { (tokenValido && !passwordModificado) && (
                        <form
                            onSubmit={handleSubmit}
                        >
                        {/* label + input de Password */ }
                        < div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold">
                                Nuevo Password
                            </label>
                            <input
                                type="password"
                                placeholder="Ingresa una nueva password"
                                className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        {/* label + input de reingreso de Password */}
                        <div className="my-5">
                            <input
                                type="password"
                                placeholder="Repite tu nueva password"
                                className="border w-full p-3 mt-3 bg-grey-50 rounded-xl"
                                value={repetirPassword}
                                onChange={e => setRepetirPassword(e.target.value)}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Reestablecer Password"
                            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:text-indigo-900 md:w-auto"
                        />
                        </form>
                        )}

                        { (passwordModificado && tokenValido) && (
                            <Link
                                className='block text-center my-5 text-grey-500'
                                to="/">Iniciar Sesión
                            </Link>

                        )}

                        
            </div >

        </>
    )
}

export default NuevoPassword