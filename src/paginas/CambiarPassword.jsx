import React from 'react'
import { useState } from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'


const CambiarPassword = () => {

    const {guardarPassword} = useAuth();
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        psw_actual: '',
        psw_nuevo: '',
        confirmar_psw_nuevo: '',
    });

    const handleSubmit = async e => {
        e.preventDefault();
        //console.log(Object.values(password));
        if (Object.values(password).some(campo => campo === '')){
            setAlerta({
                msg: "Todos los campos son olbigatorios",
                error: true
            });
            return;
        }

        //console.log(password.psw_actual);
        if(password.psw_nuevo.length < 8 ){
            //console.log('El password es menor a 8 dígitos');
            setAlerta ({msg: 'El password ingresado es menor a 8 dígitos', error: true});
            return;
        }

        if (password.psw_nuevo !== password.confirmar_psw_nuevo){
            setAlerta({
                msg: "Las Password no coinciden",
                error: true
            });
            return;
        }
        setAlerta({});
        const resultado = await guardarPassword(password);
        setAlerta (resultado);
    }

    const { msg } = alerta;

    return (
        <>

            <AdminNav />
            <h2
                className='font-black text-3xl text-center mt-10 '
            >Cambiar Password</h2>
            <p
                className='text-xl mt-5 mb-10 text-center  '
            >Modifica tu {''}
                <span
                    className='text-indigo-600 font-bold '
                >Password aquí
                </span>
            </p>

            <div className='flex justify-center'>
                <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5 '>

                    {msg && <Alerta alerta={alerta} />}

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className='my-3 '>
                            <label className='uppercase font-bold text-gray-600'>Password Actual</label>
                            <input
                                type='password'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                placeholder='Escribe tu password actual'
                                name='psw_actual'
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>


                        <div className='my-3 '>
                            <label className='uppercase font-bold text-gray-600'>Nueva Password</label>
                            <input
                                type='password'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                placeholder='Ingresa tu nueva Password'
                                name='psw_nuevo'
                                /*value={perfil.nombre || ''}*/
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>

                        <div className='my-3 '>
                            <label className='uppercase font-bold text-gray-600'>Repite tu password</label>
                            <input
                                type='password'
                                className='border bg-gray-50 w-full p-2 mt-5 rounded-lg'
                                placeholder='Repite tu nueva password'
                                name='confirmar_psw_nuevo'
                                /* value={perfil.web || ''}*/
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value,
                                })}
                            />
                        </div>

                        
                        <input
                            type="submit"
                            value="Cambiar Password"
                            className='bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5 '
                        />

                    </form>
                </div>
            </div>

        </>
    )
}

export default CambiarPassword