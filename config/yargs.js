const descripcion = {
    alias: 'd',
    demand: true,
    desc: 'Descripcion de la Tarea'
};

const completada = {
    alias: 'c',
    default: true,
    desc: 'true = Completada / false = Por Hacer'
};

const indice = {
    alias: 'i',
    demand: true,
    desc: 'Indice del listado'
};

const argv = require('yargs')
    .command('crear', 'Crea una Tarea por Hacer', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado de completado de una tarea', {
        descripcion,
        completada
    })
    .command('listar', 'Lista las Tareas y sus estados', {
        completada: {
            alias: 'c',
            default: null,
            desc: 'Estado de la tareas por Listar'
        }
    })
    .command('borrar', 'Borra una tarea de la lista', {
        descripcion
    })
    .command('borrarIndice', 'Borra una tarea por su indice', {
        indice
    })
    .help()
    .argv;

module.exports = {
    argv
}