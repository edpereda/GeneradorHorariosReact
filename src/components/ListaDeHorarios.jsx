import React, { Fragment } from 'react';
import Horario from './Horario';

const ListaDeHorarios = ({listadehorarios}) => {
    return (
        <Fragment>
            {listadehorarios.map((horario,index) => (
                <Horario
                    key = {horario[0].id}
                    horario = {horario}
                    index = {index+1}
                />
            ))}
        </Fragment>
    );
}
 
export default ListaDeHorarios;