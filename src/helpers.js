export function changeHoursFormat(horaInicio,horaFinal){
    let strHoraInicio = "";
    let strHoraFinal = "";

    if (horaInicio === undefined || horaFinal === undefined){
        return "";
    }
    
    strHoraInicio = horaInicio.toString();
    strHoraFinal = horaFinal.toString();


    if (horaInicio === -1){
        strHoraInicio = '*';
    }

    if (horaFinal === -1){
        strHoraFinal = '*';
    }

    return strHoraInicio + '\n-\n' + strHoraFinal; 
}

export function changeGroupProfessor(word){
    if (word === ''){
        return '*Sin Asignar*';
    }

    return word;
}

export function cleanNamesSubjects(listaMaterias){
    // console.log(listaMaterias);
    let nuevaLista = listaMaterias.map(materia => {
        var nuevaMateria = {};
        Object.assign(nuevaMateria,materia);
        //console.log(`Nueva materia: ${nuevaMateria.nombre}`);
        var nombre = '';
        nombre = materia.nombre;
        nombre = nombre.toLowerCase().trim().replace(/ /g,'');      //Convierte a minusculas, espacios intermedios, derecho e izquierdo
        nombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");   //Quita acentos
        
        nuevaMateria.nombre = nombre;
        
        return nuevaMateria;
    });
    
    // console.log(nuevaLista);
    return nuevaLista;
}

//Genera horarios si es que se encuentra dos materias con el mismo nombre
export function duplicatedSubjectsList(listaDeHorarios){
    listaDeHorarios.forEach((listaDeMaterias,index) => {
        for (let index1 = 0; index1 < listaDeMaterias.length; index1++){
            for (let index2 = index1+1; index2 < listaDeMaterias.length; index2++){
                //Verifica si tienen el mismo nombre
                if ( listaDeMaterias[index1].nombre === listaDeMaterias[index2].nombre ){
                    //Crea dos copias
                    let nuevaLista1 = listaDeMaterias.slice();
                    let nuevaLista2 = listaDeMaterias.slice();
                    //Quita la materia duplicada
                    nuevaLista1.splice(index1,1);
                    nuevaLista2.splice(index2,1);
                    //Agrega a listadeHorarios
                    listaDeHorarios.push(nuevaLista1);
                    listaDeHorarios.push(nuevaLista2);
                    //Elimina donde hay dos materias duplicadas
                    listaDeHorarios.splice(index,1);
                    //Vuelve a iniciar
                    duplicatedSubjectsList(listaDeHorarios);
                }//if
            }//for
        }//for
    })//forEach
}

//Primer filtro para materias que inician al mismo tiempo o terminan al mismo tiempo
export function filterOverlapping(listaDeHorarios){
    listaDeHorarios.forEach((horario,index) => {
        let overlapping = false;
        for (let index1 = 0; index1 < horario.length; index1++){
            for (let index2 = index1+1; index2 < horario.length; index2++){
                //Horas de inicio
                let MondayStartSubject1 = horario[index1].monstart;
                let MondayStartSubject2 = horario[index2].monstart;

                let TuesdayStartSubject1 = horario[index1].tuestart;
                let TuesdayStartSubject2 = horario[index2].tuestart;

                let WednesdayStartSubject1 = horario[index1].wedstart;
                let WednesdayStartSubject2 = horario[index2].wedstart;
                
                let ThursdayStartSubject1 = horario[index1].thustart;
                let ThursdayStartSubject2 = horario[index2].thustart;
                
                let FridayStartSubject1 = horario[index1].fristart;
                let FridayStartSubject2 = horario[index2].fristart;

                //Horas de final
                let MondayFinishSubject1 = horario[index1].monend;
                let MondayFinishSubject2 = horario[index2].monend;

                let TuesdayFinishSubject1 = horario[index1].tueend;
                let TuesdayFinishSubject2 = horario[index2].tueend;

                let WednesdayFinishSubject1 = horario[index1].wedend;
                let WednesdayFinishSubject2 = horario[index2].wedend;
                
                let ThursdayFinishSubject1 = horario[index1].thuend;
                let ThursdayFinishSubject2 = horario[index2].thuend;
                
                let FridayFinishSubject1 = horario[index1].friend;
                let FridayFinishSubject2 = horario[index2].friend;

                // Both Mondays are not null
                if(MondayStartSubject1 !== -1 && MondayStartSubject2 !== -1 && MondayFinishSubject1 !== -1 && MondayFinishSubject2 !== -1){
    
                    if(MondayStartSubject1 === MondayStartSubject2){
                        overlapping = true;

                        //pop from finalList
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(MondayFinishSubject1 === MondayFinishSubject2){
                        overlapping = true;

                        //pop from finalList
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (MondayStartSubject1 > MondayStartSubject2 && MondayStartSubject1 < MondayFinishSubject2){//subject1 starts in the middle of subject2
                        overlapping = true;
                        // console.log('Entro a monday1');
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(MondayFinishSubject1 > MondayStartSubject2 && MondayFinishSubject1 < MondayFinishSubject2){//subject1 finishes in the middle of subject2
                        overlapping = true;
                        // console.log('Entro a monday2');
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (MondayStartSubject2 > MondayStartSubject1 && MondayStartSubject2 < MondayFinishSubject1){//subject2 starts in the middle of subject1
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(MondayFinishSubject2 > MondayStartSubject1 && MondayFinishSubject2 < MondayFinishSubject1){//subject1 finishes in the middle of subject2
                        overlapping = true;
                        
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }
                }
                
                // Both Tuesdays are not null
                if(TuesdayStartSubject1  !== -1 && TuesdayStartSubject2  !== -1 && TuesdayFinishSubject1 !== -1 && TuesdayFinishSubject2 !== -1){

                    if(TuesdayStartSubject1 === TuesdayStartSubject2){
                        overlapping = true;

                        //pop from listaDeHorarios
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(TuesdayFinishSubject1 === TuesdayFinishSubject2){
                        overlapping = true;

                        //pop from finalList
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (TuesdayStartSubject1 > TuesdayStartSubject2 && TuesdayStartSubject1 < TuesdayFinishSubject2){//subject1 starts in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(TuesdayFinishSubject1 > TuesdayStartSubject2 && TuesdayFinishSubject1 < TuesdayFinishSubject2){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (TuesdayStartSubject2 > TuesdayStartSubject1 && TuesdayStartSubject2 < TuesdayFinishSubject1){//subject2 starts in the middle of subject1
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(TuesdayFinishSubject2 > TuesdayStartSubject1 && TuesdayFinishSubject2 < TuesdayFinishSubject1){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }
                }

                // Both Wednesdays are not null
                if(WednesdayStartSubject1  !== -1 && WednesdayStartSubject2  !== -1 && WednesdayFinishSubject1 !== -1 && WednesdayFinishSubject2 !== -1){
   
                    if(WednesdayStartSubject1 === WednesdayStartSubject2){
                        overlapping = true;

                        //pop from listaDeHorarios
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(WednesdayFinishSubject1 === WednesdayFinishSubject2){
                        overlapping = true;

                        //pop from finalList
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (WednesdayStartSubject1 > WednesdayStartSubject2 && WednesdayStartSubject1 < WednesdayFinishSubject2){//subject1 starts in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(WednesdayFinishSubject1 > WednesdayStartSubject2 && WednesdayFinishSubject1 < WednesdayFinishSubject2){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (WednesdayStartSubject2 > WednesdayStartSubject1 && WednesdayStartSubject2 < WednesdayFinishSubject1){//subject2 starts in the middle of subject1
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(WednesdayFinishSubject2 > WednesdayStartSubject1 && WednesdayFinishSubject2 < WednesdayFinishSubject1){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                }

                // Both Thursdays are not null
                if(ThursdayStartSubject1  !== -1 && ThursdayStartSubject2  !== -1 && ThursdayFinishSubject1 !== -1 && ThursdayFinishSubject2 !== -1){

                    if(ThursdayStartSubject1 === ThursdayStartSubject2){
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(ThursdayFinishSubject1 === ThursdayFinishSubject2){
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (ThursdayStartSubject1 > ThursdayStartSubject2 && ThursdayStartSubject1 < ThursdayFinishSubject2){//subject1 starts in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(ThursdayFinishSubject1 > ThursdayStartSubject2 && ThursdayFinishSubject1 < ThursdayFinishSubject2){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (ThursdayStartSubject2 > ThursdayStartSubject1 && ThursdayStartSubject2 < ThursdayFinishSubject1){//subject2 starts in the middle of subject1
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(ThursdayFinishSubject2 > ThursdayStartSubject1 && ThursdayFinishSubject2 < ThursdayFinishSubject1){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }
                }

                // Both Fridays are not null
                if(FridayStartSubject1  !== -1 && FridayStartSubject2  !== -1 && FridayFinishSubject1 !== -1 && FridayFinishSubject2 !== -1){

                    if(FridayStartSubject1 === FridayStartSubject2){
                        overlapping = true;

                        //pop from listaDeHorarios
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(FridayFinishSubject1 === FridayFinishSubject2){
                        overlapping = true;

                        //pop from finalList
                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (FridayStartSubject1 > FridayStartSubject2 && FridayStartSubject1 < FridayFinishSubject2){//subject1 starts in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(FridayFinishSubject1 > FridayStartSubject2 && FridayFinishSubject1 < FridayFinishSubject2){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if (FridayStartSubject2 > FridayStartSubject1 && FridayStartSubject2 < FridayFinishSubject1){//subject2 starts in the middle of subject1
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }

                    if(FridayFinishSubject2 > FridayStartSubject1 && FridayFinishSubject2 < FridayFinishSubject1){//subject1 finishes in the middle of subject2
                        overlapping = true;

                        listaDeHorarios.splice(index,1);
                        filterOverlapping(listaDeHorarios);
                        break;
                    }
                }
            }
            if (overlapping){
                break;
            }
        }
    })
}

export function setOriginalValues(listaDeHorarios,listaDeMaterias){
    //console.log(listaDeMaterias);
    listaDeHorarios.forEach(horario => {
        console.log(horario);
        horario.forEach(materia => {
            listaDeMaterias.forEach(materiaOriginal => {
                if (materia.id === materiaOriginal.id){
                    const nombreOriginal = materiaOriginal['nombre'];
                    materia.nombre = nombreOriginal;
                }//if
            });//forEach materiaOriginal
        });//forEach materia
    });//forEach listaHorarios
}