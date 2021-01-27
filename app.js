const argv = require('./config/yargs.js').argv;
const porHacer = require('./por-hacer/por-hacer.js');
const colors = require('colors');

//const argv = require('yargs').argv;

console.log(argv);

let comando = argv._[0];
//console.log('Comando: ' + comando);

switch (comando) {
    case "crear":
        //console.log("Creando tarea...");
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        console.log(`Tarea CREADA!!`);
        break;

    case 'listar':
        let listado = [];
        console.log('================ Listado de Tareas ================'.green);

        //console.log("Listando Tareas por hacer...");
        if (argv.completada === null) {

            listado = porHacer.getListado();

        } else if (argv.completada === true || argv.completada === 'true') {

            console.log("  COMPLETADAS".cyan);
            listado = porHacer.getListadoCompletadas();

        } else if (argv.completada === false || argv.completada === 'false') {

            console.log("  POR HACER".yellow);
            listado = porHacer.getListadoPorHacer();

        } else {
            console.log("Estado no definido / desconocido!!!".red);
            break;
        }

        let i = 1;
        for (let _tarea of listado) {


            let tareaString = '  ' + i + '. ' + _tarea.descripcion +
                '  [' + porHacer.boolToCompletado(_tarea.completado) + ']';

            console.log(tareaString);

            i++;
        }
        console.log('==================================================='.green);
        break;

    case 'actualizar':
        console.log("Por actualizar el estado de la tarea...");
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completada);
        console.log(actualizado);
        break;


    case 'borrar':
        console.log("Por borrar tarea...");
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    case 'borrarIndice':
        console.log("Por borrar la tarea por indice...");
        let eliminado = porHacer.borrarIndice(argv.indice);
        console.log(eliminado);
        break;

    default:
        console.log("No existe el comando!!".red);
        console.log('Para mas detalles hacer:  ' + 'node app --help'.green);
}