
import React, { Fragment, useEffect, useReducer } from 'react';
import { pacienteReducer } from '../reducers/pacienteReducer';

//Esta fuera porque se va a ajecutar despues y no forma parte del reducer como tal.
const init = () => {
    return JSON.parse(localStorage.getItem("pacientes")) || [];
}

const Formulario = () => {
    // *** LOGICA ***
    // Inicializador
    const [pacientes, dispatch] = useReducer(pacienteReducer, [], init);

    // Carga de datos inicial
    useEffect(() => {
        localStorage.setItem("pacientes", JSON.stringify(pacientes));
    }, [pacientes]);

    // Enviar datos
    const enviarDatos = e => {
        e.preventDefault();

        let paciente = {
            id: new Date().getTime(),
            nombres: e.target.nombres.value,
            apellidos: e.target.apellidos.value,
            identificacion: e.target.identificacion.value,
            telefono: e.target.telefono.value,
            genero: e.target.genero.value
        }

        // Creamos la accion que se ejecutara
        const action = {
            type: "crear",
            payload: paciente
        }

        dispatch(action);
        console.log(paciente);
        e.target.nombres.value = '';
        e.target.apellidos.value = '';
        e.target.identificacion.value = '';
        e.target.telefono.value = '';
        e.target.genero.value = 'Seleccione el género del paciente';
    };

    // Funcion Eliminar
    const eliminar = id => {
        const action = {
            type: "borrar",
            payload: id
        };

        dispatch(action);
        console.log(`Se a eliminado el paciente ${pacientes.nombre}`);
    }

    return (
        <Fragment>
            <div>

                <h1>Nuevo paciente</h1>
                <form className="row" onSubmit={enviarDatos}>
                    <div className="col-md-6 mt-3">
                        <label className="form-label">Nombres</label>
                        <input className="form-control" type="text" name="nombres" placeholder="Ingrese nombres del paciente" />
                        <div className="valid-feedback">
                            Ingrese el nombre correcto
                        </div>

                    </div>
                    <div className="col-md-6 mt-3 ">
                        <label className="form-label">Apellidos</label>
                        <input className="form-control" type="text" name="apellidos" placeholder="Ingrese apellidos del paciente" />
                    </div>
                    <div className="col-md-4 mt-3 ">
                        <label className="form-label">Identificación</label>
                        <input className="form-control" type="text" name="identificacion" placeholder="Ingrese identificación del paciente" />
                    </div>
                    <div className="col-md-4 mt-3 ">
                        <label className="form-label">Teléfono</label>
                        <input className="form-control" type="text" name="telefono" placeholder="Ingrese el teléfono del paciente" />
                    </div>
                    <div className="col-md-4 mt-3 ">
                        <label className="form-label">Género</label>
                        <select className="form-select" name="genero" aria-label=".form-select-sm example">
                            <option selected>Seleccione el género del paciente</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>

                    </div>

                    <button type="submit" className="btn btn-primary mt-5">Guardar</button>

                </form>
            </div>
            <div className="mt-5">

                <h2 className="mt-5">Listado de pacientes</h2>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Identificación</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Género</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pacientes.map(paciente => (
                                <tr key={paciente.id}>
                                    <th scope="row" >{paciente.id}</th>
                                    <td>{paciente.nombres}</td>
                                    <td>{paciente.apellidos}</td>
                                    <td>{paciente.identificacion}</td>
                                    <td>{paciente.telefono}</td>
                                    <td>{paciente.genero}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={e => eliminar(paciente.id)} > X </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Formulario
