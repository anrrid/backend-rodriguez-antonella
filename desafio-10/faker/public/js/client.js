window.onload = () => {
    const socket = io();

    socket.on("productos", listaProductos => {
        loadProds(listaProductos)
    })

    //PRODUCTOS

    async function loadProds(listProd) {
        let htmlProd = ''
        const tableList = await fetch('views/partials/table.ejs').then(res => res.text())
 
        if (listProd.length === 0){
            htmlProd = `<h4>No se encontraron productos.</h4>`
        }else{
            htmlProd = ejs.render(tableList, { listProd })
        }

        document.getElementById('tabla').innerHTML = htmlProd; 
    }

    document.getElementById('btn').addEventListener('click', () => {
        const nuevoProducto = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            url: document.getElementById('url').value
        }
    socket.emit("guardarNuevoProducto",nuevoProducto)
    })


}

