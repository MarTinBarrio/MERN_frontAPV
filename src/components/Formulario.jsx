import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";


const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [_id, setId] = useState ('')

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    //console.log(pacientes);
    //console.log(paciente);
    useEffect (()=>{
        //console.log('render o cambió paciente');
        if (paciente?.nombre){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id); //Esto m ayuda a diferenciar si estoy editando o creando un nuevo registro
        }
    }, [paciente])

    const handleSubmit = (e) => {
        e.preventDefault();

        //validar formulario
        if ([nombre, email, propietario, fecha, sintomas].includes('')) {
            //console.log("Hay campos vacíos");
            setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
            return;
        }
        
        //crea y guarda el objeto
        guardarPaciente({ nombre, email, propietario, fecha, sintomas, _id });

        setAlerta({
            msg: 'Guardado Correctamente',
            error: false,
        });

        //blanqueo el formulario
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');
    }

    const { msg } = alerta;

    return (
        <>
            <h2
              className="font-black text-3xl text-center"
            >Adminsitrador de Pacientes
            </h2>

            <p className="text-xl mt-5 mb-10  text-center"
            >Añade tu pacientes y {''}
                <span className="text-indigo-600 font-bold"
                >Administralos</span>
            </p>

            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Mascota
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="Propietario"
                        className="text-gray-700 uppercase font-bold"
                    >Nombre Propitario
                    </label>
                    <input
                        id="Propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>


                <div className="mb-5">
                    <label
                        htmlFor="Email"
                        className="text-gray-700 uppercase font-bold"
                    >Email Propietario
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email del propietario"
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="text-gray-700 uppercase font-bold"
                    >Fecha Alta
                    </label>
                    <input
                        id="fecha"
                        type="date"
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 uppercase font-bold"
                    >Sintomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2  placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value={(_id==='')? "Agregar Paciente" : "Guardar Cambios"}
                >

                </input>

            </form>

            {msg && <Alerta alerta={alerta} />}

        </>
    )
}

export default Formulario