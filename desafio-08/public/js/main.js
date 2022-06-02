const socket = io();

const formAgregarProductos = document.getElementById('FormsProductos')
formAgregarProductos.addEventListener('submit', e => {

    e.preventDefault()


    const producto = {
        title: formAgregarProductos[0].value,
        price: formAgregarProductos[1].value,
        thumbnail: formAgregarProductos[2].value,
    }


    socket.emit('update', producto);


    formAgregarProductos.reset()
})


socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos) {


    const recursoRemoto = await fetch('plantilla/products.hbs')


    const textoPlantilla = await recursoRemoto.text()

    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })

    document.getElementById('Productos').innerHTML = html
}


const btn = document.getElementById('btnEnviarChat')
btn.addEventListener('click', e => {

    console.log('envia msj')


    const email = document.getElementById('email').value
    const texto = document.getElementById('txtMensaje').value

    if (email == '') {
        alert('Ingrese email');
        document.getElementById('email').focus();
        return
    }

    const cuerpo = {
        email: email,
        fecha: new Date().toLocaleString(),
        mensaje: texto,
    }


    socket.emit('chat', cuerpo);


    document.getElementById('txtMensaje').value = '';
})


socket.on('chat', mensajes => {
    console.log(mensajes)
    if (mensajes.length > 0) {
        const mensajesHTML = mensajes
            .map(msj => `<span class='email'> ${msj.email} </span> <span class='fyh'> [${msj.fecha}] </span>  <span class='msj'>${msj.mensaje}</span>`)
            .join('<br>')
        document.getElementById('mensajes').innerHTML = mensajesHTML;
    } else {
        document.getElementById('mensajes').innerHTML = 'No hay mensajes aún';
    }
});