const generarInfoError = (usuario) => {
    return `Los datos estan incompletos o no son válidos.
    Necesitamos recibir los siguientes datos: 
    - Nombre: String, peeeero recibimos ${usuario.nombre}
    - Apellido: String, peeero recibimos ${usuario.apellido}
    - Email: String, peeeeeeeero recibimos ${usuario.email}
    `
}

export default generarInfoError; 