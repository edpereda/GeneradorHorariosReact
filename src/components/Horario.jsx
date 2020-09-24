import React, { Fragment } from 'react';
import MateriaGenerada from './MateriaGenerada';

import './horario.css';

const Horario = ({horario,index}) => {
    return (
        <Fragment>
            <div className="horarios-generados">
                <h3>Horario {index}</h3> 
                <table className=" highligth centered responsive-table">
                    <thead>
                        <tr>
                            <th>Grupo</th><th>Materia</th><th>Profesor</th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {horario.map(materia => (
                            <MateriaGenerada
                                key={materia.id}
                                materia = {materia}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
 
export default Horario;