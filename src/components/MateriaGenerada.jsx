import React from 'react';

import {changeHoursFormat,changeGroupProfessor} from '../helpers';

const MateriaGenerada = ({materia}) => {
    return ( 
            <tr>
                <td>{changeGroupProfessor(materia.grupo)}</td><td>{materia.nombre}</td><td>{changeGroupProfessor(materia.profesor)}</td>
                <td>{changeHoursFormat(materia.monstart,materia.monend)}</td>
                <td>{changeHoursFormat(materia.tuestart,materia.tueend)}</td>
                <td>{changeHoursFormat(materia.wedstart,materia.wedend)}</td>
                <td>{changeHoursFormat(materia.thustart,materia.thuend)}</td>
                <td>{changeHoursFormat(materia.fristart,materia.friend)}</td>
            </tr>
     );
}
 
export default MateriaGenerada;