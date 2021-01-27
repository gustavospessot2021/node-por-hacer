const fs = require('fs');

let listadoPorHacer = [];


/* Toma los datos que estan en <listadoPorHacer> y los guarda en archivo .json
 */
const guardarDB = () => {

    // Se pasa el array de objeto a FORMATO JSON !!!
    let data = JSON.stringify(listadoPorHacer);

    return new Promise((resolve, reject) => {

        let nombreArchivo = `data.json`;
        let nombreArchivoConUbicacion = `db/${nombreArchivo}`;

        // { flag: "a+" } Si quisieramos agregar contenido si el archivo ya EXISTE
        // En este caso NO se pondria porque no va con la logica del almacenamiento de datos
        fs.writeFile(nombreArchivoConUbicacion, data, (err) => {
            if (err)
                reject(err);
            else
                resolve(`${nombreArchivo}`);
            //console.log(`El archivo ${nombreArchivo} ha sido creado!`);
        });

    });
}

/*  Lee el archivo .json con los datos guardados y los vuelca al
    array listadoPorHacer    
*/
const cargarDB = () => {

    // se necesita de try catch porque es posible
    // que el archivo NO tenga formato JSON
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

    // console.log(listadoPorHacer);
}

/*  Primero va a tomar los datos que estan guardados en el archivo
    y retorna los datos volcados en el array listadoPorHacer
*/
const getListado = () => {

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    return listadoPorHacer;

}

const getListadoCompletadas = () => {

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    let lista = listadoPorHacer.filter(tarea => {
        return tarea.completado === true;
    });

    return lista;

}

const getListadoPorHacer = () => {

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    let lista = listadoPorHacer.filter(tarea => {
        return tarea.completado === false;
    });

    return lista;

}


const actualizar = (descrip, estado_nuevo = true) => {

    if (estado_nuevo === true || estado_nuevo === 'true')
        estado_nuevo = true;
    else estado_nuevo = false;

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descrip;

    });

    if (index >= 0) {

        listadoPorHacer[index].completado = estado_nuevo;
        guardarDB();
        return true;
    } else return false;

}


const borrar = (descrip) => {

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descrip;

    });

    if (index >= 0) {

        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else return false;

}

const borrarIndice = (indice) => {

    if (!Number(indice)) {
        console.log('El indice <' + indice + '> NO es un numero');
        return false;
    }

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    if (indice > listadoPorHacer.length || indice <= 0) {
        console.log("Indice fuera de rango");
        return false;
    }

    indice--; // pasando a indice de Array
    listadoPorHacer.splice(indice, 1);
    guardarDB();
    return true;
}


/*  Primero va a leer los datos del archivo y una vez volcados
    estos datos en el array listadoPorHacer -> crea un nuevo objeto porHacer
    Carga la descrpcion en el objeto y luego le hace un push
    hacia el array de listadoPorHacer
    Guarda en Archivo y devuelve la tarea creada
*/
const crear = (descrip) => {

    // debo cargar primero los datos de la BD al 
    // array de listadoPorHacer
    cargarDB();

    // objeto por hacer que representa una tarea, con su Descrip y su Estado
    let porHacer = {
        descripcion: descrip,
        completado: false
    };

    // Lleva el objeto porHacer hacia el array listadoPorHacer
    listadoPorHacer.push(porHacer);

    guardarDB()
        .then(nom_arch => console.log(`Tarea almacenada en el archivo: ` + `${nom_arch}`.green))
        .catch(e => console.log(e));


    // como feedback o retroalimentacion de lo que se acaba de crear
    return porHacer;
}

const boolToCompletado = (estadoTarea) => {
    if (estadoTarea === true) return 'Completado'.green;
    else return 'Por Hacer'.yellow;
}

module.exports = {
    crear,
    getListado,
    boolToCompletado,
    actualizar,
    borrar,
    borrarIndice,
    getListadoCompletadas,
    getListadoPorHacer

}