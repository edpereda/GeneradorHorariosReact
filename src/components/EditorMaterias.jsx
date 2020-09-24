import React, { Fragment } from 'react';

import Materia from './Materia';

import './editorMaterias.css';

const EditorMaterias = ({listamaterias,setListaMaterias,listamateriasseleccionadas,setListaMateriasSeleccionadas}) => {

    if (listamaterias.length === 0) return null;

    

    const generarListaMaterias = () => {
        const newList = listamaterias.filter(materia => materia.selected === true);

        setListaMateriasSeleccionadas(newList);
    }

    return ( 
        <Fragment>
            <table className="tabla-seleccion-horarios highligth centered responsive-table">
                <thead>
                    <tr>
                        <th>#</th><th>Grupo</th><th>Materia</th><th>Profesor</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th><th>Seleccionar</th><th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {listamaterias.map((materia,index) => (
                        <Materia 
                            key = {materia.id}
                            materia = {materia}
                            index = {index}
                            listamaterias = {listamaterias}
                            setListaMaterias = {setListaMaterias}
                        />
                    ))}
                </tbody>
            </table>
            <div className="col s4 offset-s4 boton-generar-horarios">
                <input
                    onClick={generarListaMaterias}
                    type="button" 
                    value="Generar Horarios"
                    className="waves-effect waves-ligth btn-large btn-block orange white-text"
                />
            </div>
        </Fragment>
     );
}
 
export default EditorMaterias;