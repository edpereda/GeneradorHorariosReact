import React, {useState} from 'react';

import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import './header.css';


// Estilos para modal
function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Header = ({titulo}) => {

    // Configuración del modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    // Funcion que muestra MODAL
    const mostrarAyuda = () => {
        handleOpen();
    }
    return ( 
        // <div className="white-text center-align">
        <div className='row'>
            <div className='col s12 m11'>
                <h4 className='titulo'>{titulo}</h4>
            </div>
            <div className='col s12 m1 white-text'>
                <img src={require('../img/info.png')} alt="Ayuda" className='help-button' onClick={mostrarAyuda}/>
            </div>

            <Modal
                open={open}
                onClose={()=> {handleClose()}}
            >
                { <div style={modalStyle} className={classes.paper}>
                    {/* <img className="img-fluid my-4" src={} /> */}
                    <h3 className='center-align blue-text'>¿Cómo funciona?</h3>
                    <p>
                        Olvida tener que pasar horas tratando de encajar materias en un horario con huecos. 
                        <span className='red-text'><u>Ahora, puedes crear miles de horarios en un solo click.</u></span><br/><br/>
                        Lo mejor de todo, es que puedes ingresar materias con el mismo nombre, pero que tengan un profesor
                        diferente o un horario distinto, y el generador se encargará de mostrarte todos 
                        los posibles horarios que puedes utilizar.
                    </p>
                    <h5 className="mt-2"><b>Instrucciones</b></h5>
                    <ul>
                        <li><b>&#164;</b> El nombre de la materia es obligatorio, los demás campos puedes dejarlos en blanco.</li>
                        <li><b>&#164;</b> Si no ingresas ninguna hora en ningún día, aún así el generador la tomará en cuenta para generar horarios.</li>
                        <li><b>&#164;</b> Recuerda seleccionar todas las materias en la segunda tabla para que el generador las tome en cuenta.</li>
                        <li><b>&#164;</b> Si deseas generar alternativas con la misma materia pero con diferente horario, asegurate de escribir el nombre exactamente igual.</li>
                        <li><b>&#164;</b> Si ningún horario es generado, seguramente dos materias coinciden en horas y no existe otra materia alternativa que el generador pueda utilizar.</li>
                        <li><b>&#164;</b> Todas las materias ingresadas se quedarán guardadas, por si después deseas generar más horarios.</li>
                    </ul>
                    <h5 className="mt-2 text-align center"><b>Contacto:</b></h5>
                    <div className='text-align center'>
                        <a href="mailto:gen.horarios@gmail.com">gen.horarios@gmail.com</a>
                    </div>
                </div> }
            </Modal>
        </div>
     );
}
 
export default Header;