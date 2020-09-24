import React from 'react';

import {changeHoursFormat,changeGroupProfessor} from '../helpers';

const Materia = ({materia, index, listamaterias, setListaMaterias}) => {

    const HandleChangeSeleccionar = e => {
        if (e.target.checked){
            // Modifica la materia a seleccionado
            setListaMaterias(
                listamaterias.map(materia => {
                    if (materia.id === e.target.id){
                        materia.selected = true;
                    }
                    return materia
                })
            )
        }else{
            // Modifica la materia a deseleccionado
            setListaMaterias(
                listamaterias.map(materia => {
                    if (materia.id === e.target.id){
                        materia.selected = false;
                    }
                    return materia
                })
            )
        }
    }

    const HandleChangeEliminar = id => {
        
        const newList = listamaterias.filter(materia => materia.id !== id);

        setListaMaterias(newList);
    }

    // carga el checkbox seleccionado si la materia se guardo seleccionada
    let checkbox;
    if (materia.selected){
        checkbox =  <p>
                        <label>
                            <input type="checkbox" className="filled-in" id = {materia.id} checked="checked" onChange={HandleChangeSeleccionar}/>
                            <span></span>
                        </label>
                    </p>
    

    }else{
        checkbox =  <p>
                        <label>
                            <input type="checkbox" className="filled-in" id = {materia.id} onChange={HandleChangeSeleccionar}/>
                            <span></span>
                        </label>
                    </p>
    }

    return ( 

        <tr>
            <td>{index+1}</td><td>{changeGroupProfessor(materia.grupo)}</td><td>{materia.nombre}</td><td>{changeGroupProfessor(materia.profesor)}</td>
            <td>{changeHoursFormat(materia.monstart,materia.monend)}</td>
            <td>{changeHoursFormat(materia.tuestart,materia.tueend)}</td>
            <td>{changeHoursFormat(materia.wedstart,materia.wedend)}</td>
            <td>{changeHoursFormat(materia.thustart,materia.thuend)}</td>
            <td>{changeHoursFormat(materia.fristart,materia.friend)}</td>

            <td>
                {checkbox}
            </td>
            <td>
                <input
                    id={materia.id}
                    onClick={e => { if (window.confirm(`¿Desea eliminar la materia ${materia.nombre} del grupo ${materia.grupo} ?`)){HandleChangeEliminar(materia.id);}}}
                    type="button" 
                    value="X"
                    className="waves-effect waves-ligth btn-small red white-text"
                />
            </td>
        </tr>
     );
}
 
export default Materia;