import React from 'react';

import './formulario.css';

const Mensaje = ({mensaje, tipo}) => ( 
    <p className={tipo}>{mensaje}</p>
 );

 
export default Mensaje;