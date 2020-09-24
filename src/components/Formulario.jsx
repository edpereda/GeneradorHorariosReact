import React, {useState} from 'react';

import Mensaje from './Mensaje';

import './formulario.css'

const Formulario = ({listamaterias, setListaMaterias}) => {

     //Generamos id a materia
     const shortid = require('shortid');
     const id = shortid.generate();
    
    //UseStates
    const [materia, setMateria] = useState({
        id: id,
        nombre: '',
        profesor: '',
        grupo: '',
        monstart: -1,
        tuestart: -1,
        wedstart: -1,
        thustart: -1,
        fristart: -1,
        monend: -1,
        tueend: -1,
        wedend: -1,
        thuend: -1,
        friend: -1,
        selected: false
    });

    const [mensaje, setMensaje] = useState({
        show: false,
        mensaje: '',
        tipo: ''
    });

    //Extraemos valores de materia
    const {
            nombre, profesor, grupo, monstart,
                                    tuestart,
                                    wedstart,
                                    thustart,
                                    fristart,
                                                monend,
                                                tueend,
                                                wedend,
                                                thuend,
                                                friend } = materia;
    // Funciones
    const onChange = e => {

        setMateria({
            ...materia,
            [e.target.name] : e.target.value
        })

    }

    const onSubmit = e =>{
        e.preventDefault();

        //Si materia no tiene nombre
         if (nombre.trim()=== ''){
             setMensaje({show: true, mensaje:"El campo *Materia* es obligatorio", tipo:"error"});
             setTimeout(() =>{
                setMensaje({show: false, mensaje:"El campo *Materia* es obligatorio", tipo:"error"});
             },3000)
            return null;
        }

        //Si solo ingresa hora de inicio
        if ((monstart!==-1&&monend===-1)||(tuestart!==-1&&tueend===-1)||(wedstart!==-1&&wedend===-1)||(thustart!==-1&&thuend===-1)||(fristart!==-1&&friend===-1)){
            setMensaje({show: true, mensaje:"Verificar Horas. *Falta Hora Fin*", tipo:"error"});
            setTimeout(() =>{
            setMensaje({show: false, mensaje:"Verificar Horas. *Falta Hora Fin*", tipo:"error"});
            },3000)
            return null;
        }

        //Si solo ingresa hora de fin
        if ((monstart===-1&&monend!==-1)||(tuestart===-1&&tueend!==-1)||(wedstart===-1&&wedend!==-1)||(thustart===-1&&thuend!==-1)||(fristart===-1&&friend!==-1)){
            setMensaje({show: true, mensaje:"Verificar Horas. *Falta Hora Inicio*", tipo:"error"});
            setTimeout(() =>{
            setMensaje({show: false, mensaje:"Verificar Horas. *Falta Hora Inicio*", tipo:"error"});
            },3000)
            return null;
        }

        //Si la materia de inicio es despues que la final
        if ((monstart>monend)||(tuestart>tueend)||(wedstart>wedend)||(thustart>thuend)||(fristart>friend)){
            setMensaje({show: true, mensaje:"Verificar Horas. *Discordancia con las horas ingresadas*", tipo:"error"});
            setTimeout(() =>{
            setMensaje({show: false, mensaje:"Verificar Horas. *Discordancia con las horas ingresadas*", tipo:"error"});
            },3000)
            return null;
        }
        //Quitamos error
        setMensaje({show: false, mensaje:"", tipo:""});

        //Guardamos en la lista de materias
        setListaMaterias([
            ...listamaterias,
            materia
        ])

        //Muestra mensaje
        setMensaje({show: true, mensaje:`Materia ${nombre} Agregada Correctamente`, tipo:"success"});
             setTimeout(() =>{
                setMensaje({show: false, mensaje:`Materia ${nombre} Agregada Correctamente`, tipo:"success"});
             },2000)

        limpiarCampos();
    }

    const limpiarCampos = () =>{
        const id = shortid.generate();
        setMateria({
            id: id, nombre: '', profesor: '', grupo: '',    monstart: -1, tuestart: -1, wedstart: -1, thustart: -1, fristart: -1, 
                                                    monend: -1, tueend: -1, wedend: -1, thuend: -1, friend: -1,
            selected: false
        });
    }

    const borrarHoras = () =>{ 
        setMateria({
            ...materia,
            monstart: -1, tuestart: -1, wedstart: -1, thustart: -1, fristart: -1, 
            monend: -1, tueend: -1, wedend: -1, thuend: -1, friend: -1,
        });
    }

    return ( 
        <form
            onSubmit={onSubmit}
        >
            {(mensaje.show) ? <Mensaje mensaje={mensaje.mensaje} tipo={mensaje.tipo}/> :null}
            
                <div className="input-field col s12 m4 l4 xl4">
                    <input
                        type="text"
                        name="nombre"
                        id="materia"
                        value = {nombre}
                        onChange={onChange}
                        />
                    <label htmlFor="materia">Materia: </label>
                </div>
                <div className="input-field col s12 m4 l4 xl4">
                    <input
                        type="text"
                        name="profesor"
                        id="profesor"
                        value={profesor}
                        onChange={onChange}
                        />
                    <label htmlFor="profesor">Profesor: </label>
                </div>
                <div className="input-field col s12 m4 l4 xl4">
                    <input
                        type="text"
                        name="grupo"
                        id="grupo"
                        value={grupo}
                        onChange={onChange}
                        />
                    <label htmlFor="grupo">Grupo: </label>
                </div>

            <div className="col l12 m12 s12">
                <table className="responsive-table tabla-horarios">
                    <thead>
                        <tr>
                            <th></th><th>Lunes</th><th>Martes</th><th>Miercoles</th><th>Jueves</th><th>Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Hora Inicio</td>
                            <td><input type="time" name="monstart" value={monstart} onChange={onChange}/></td>
                            <td><input type="time" name="tuestart" value={tuestart} onChange={onChange}/></td>
                            <td><input type="time" name="wedstart" value={wedstart} onChange={onChange}/></td>
                            <td><input type="time" name="thustart" value={thustart} onChange={onChange}/></td>
                            <td><input type="time" name="fristart" value={fristart} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>Hora Fin</td>
                            <td><input type="time" name="monend" value={monend} onChange={onChange}/></td>
                            <td><input type="time" name="tueend" value={tueend} onChange={onChange}/></td>
                            <td><input type="time" name="wedend" value={wedend} onChange={onChange}/></td>
                            <td><input type="time" name="thuend" value={thuend} onChange={onChange}/></td>
                            <td><input type="time" name="friend" value={friend} onChange={onChange}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="col s2 offset-s7 boton-borrar">
                <input
                onClick={borrarHoras}
                    type="button" 
                    value="Borrar horas"
                    className="waves-effect waves-ligth btn-small red"
                />
            </div>

            <div className="col s4 boton-ingresar offset-s4">
                <button
                    type="submit"
                    value="Ingresar Materia"
                    className="waves-effect waves-ligth btn-large btn-block green lighten-2"
                >Ingresar Materia</button>
            </div>
        </form>
     );
}
 
export default Formulario;