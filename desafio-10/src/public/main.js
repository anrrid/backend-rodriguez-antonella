const sockets = io.connect()

function addProduct(e) {
    const product = {
        title: document.getElementById("name").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    sockets.emit("new-product", product);
    return false
}

function render(data) {
    try {
        if(data.length > 0) {
            const html = data.map((prod, index) => {
                return(`<tr>
                <td>${prod.title}</td>
                <td>$ ${prod.price}</td>
                <td>${prod.description}</td>
                <td>${prod.stock}</td>
                <td><img src="${prod.thumbnail}" height="50px"></img></td>
                <td>${prod.id}</td></tr>`)
            }).join(" ")
            document.getElementById("product").innerHTML = html
        } else {
            const htmlErr = `<h3 class="prod__error">Products not found</h3>`
            document.getElementById('product').innerHTML = htmlErr
        }
    } catch (error) {
        console.error(error)
    }
}

sockets.on("product", function(data) {render(data)})


///


function addMessage(a) {
    let date = new Date();
    const message = {
       author: {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        subname: document.getElementById("subname").value,
        age: document.getElementById("age").value,
        nickname: document.getElementById("nickname").value,
        avatar: document.getElementById("avatar").value,
       },
       text: document.getElementById("text").value,
       date: date.getElementById(),
       hour: date.getElementById(),
    }
    sockets.emit("new-message", message);
    return false
}

function renders(data) {
    try {
        if(data.length > 0){
            const html2 = data.map((element, index) => {
                return(`<div class="container__mensajes">
                    <div class="text__mensaje">
                        <h3 class="nombre">${element.author.id}</h3>
                        <p class="texto">: ${element.text}</p>
                    </div>
                    <div class="fecha">
                        <p class="date">[ ${element.date} - ${element.hour} ]</p>
                    </div>
                </div>`)
            }).join(" ")
        
            document.getElementById("messages").innerHTML = html2
        } else {
            const errHtml = `<p class="chat__err">Send your query</p>`
            
            document.getElementById("messages").innerHTML = errHtml
        }
        
    } catch (err) {
        console.log(err)
    }
}

sockets.on("messages", function(data) {renders(data)})