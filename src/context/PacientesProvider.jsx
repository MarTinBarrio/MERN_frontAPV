import { createContext, useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../components/config/axios";

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});


    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('apv_token_id');
                if (!token) { return }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config);

                //console.log(data);
                setPacientes(data);

            } catch (error) {
                console.log(error.respnse.data.msg)
            }

        }
        obtenerPacientes();
    }, [])

    const guardarPaciente = async (paciente) => {
        //console.log(paciente); 

        const token = localStorage.getItem('apv_token_id');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente._id) {
            //console.log('Editando...');
            try {

                const { data } = await clienteAxios.put(`/pacientes/${paciente._id}`, paciente, config);
                //console.log(data);

                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error.response.data.msg);
            }

        } else {
            //console.log('Nuevo registro');
            try {

                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                //console.log(data);
                //esto crea la variable pacienteAlmacenado sin los campos: createAt, update....
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                //console.log(pacienteAlmacenado);
                //de esta forma, se guarda en 1er lugar el nuevo y luego el resto q ya tenía.
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const edicion = (paciente1) => {
        setPaciente(paciente1);
        //console.log("editando", paciente1);
    }

    const eliminarPaciente = async _id => {
        //console.log(_id);
        const confirmar = confirm('Confirmas q deseas eliminar el paciente?');
        //console.log('Rta ', confirmar);
        if (confirmar) {
            try {
                const token = localStorage.getItem('apv_token_id');
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/pacientes/${_id}`, config);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== _id);
            setPacientes(pacientesActualizado);
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                edicion,
                paciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;
