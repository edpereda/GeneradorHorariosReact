import React, {Fragment, useState, useEffect} from 'react';

import Header from './Header';
import Formulario from './Formulario';
import EditorMaterias from './EditorMaterias';
import ListaDeHorarios from './ListaDeHorarios';

import {cleanNamesSubjects, duplicatedSubjectsList, filterOverlapping, setOriginalValues} from '../helpers';

const MainPage = () => {

    //UseStates
    const [listamaterias, setListaMaterias] = useState([]);
    const [listamateriasseleccionadas, setListaMateriasSeleccionadas] = useState([]);
    const [listadehorarios, setListaDeHorarios] = useState([]);
    const [titulo, setTitulo] = useState('¡Ingresa tus materias!');
    
    //UseEffect
    // Guarda materias en localStorage
    useEffect(() => {
        if(listamaterias.length!== 0){//Agrega materias a localStorage
            localStorage.setItem('ReactGeneradorHorarios', JSON.stringify(listamaterias));
        }
        
    }, [listamaterias])

    // Obtiene Materias de localStorage cuando se abre la pagina
    useEffect(() => {
        // Get localStorage and is assigned to subjects
        const local = localStorage.getItem('ReactGeneradorHorarios');
        //console.log(`local: ${local}`);
        
        const materias = JSON.parse(local);
        //console.log(`subjects: ${subjects}`);

        if (materias === null){
            setListaMaterias([]);
        }else{
            // subjects objects added to the list
            setListaMaterias(
                materias.map(materia => (materia))
            )
        }
            
    }, [])
    
    // Genera los horarios posibles
    useEffect(() => {
        if(listamateriasseleccionadas.length!== 0){//Agregar validacion mayor a 3
            setTitulo("Horarios Generados")

            let listaDeHorarios = [];
            // Generar nueva lista sin espacios en nombres, ni acentos, ni puntos
            let listaDeMaterias = cleanNamesSubjects(listamateriasseleccionadas);
            listaDeHorarios.push(listaDeMaterias);
            // Generar lista de listas con materias mismo nombre
            duplicatedSubjectsList(listaDeHorarios);
            // Pasar listas por horarios
            filterOverlapping(listaDeHorarios);
            // Regresar formato original a los horarios generados
            setOriginalValues(listaDeHorarios,listamateriasseleccionadas);
            // Guardar lista de listas en un state
             setListaDeHorarios(listaDeHorarios);
        }
    }, [listamateriasseleccionadas])

    return ( 
        <Fragment>
            <Header 
                titulo = {titulo}
            />

            <div className="contenedor-form">
            <div className="container">
                <div className="row">
                    <div className="col xl12 l12 m12 s12">
                        <Formulario
                            listamaterias={listamaterias}
                            setListaMaterias={setListaMaterias}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col xl12 l12 m12 s12">
                        <EditorMaterias 
                            listamaterias = {listamaterias}
                            setListaMaterias = {setListaMaterias}
                            listamateriasseleccionadas = {listamateriasseleccionadas}
                            setListaMateriasSeleccionadas = {setListaMateriasSeleccionadas}
                        />
                    </div>
                </div>

            </div>
            </div>
            <div className="row">
                <div className="col xl12 l12 m12 s12">
                   <ListaDeHorarios
                        listadehorarios = {listadehorarios}
                   /> 
                </div>
            </div>
        </Fragment>
    );
}
 
export default MainPage;