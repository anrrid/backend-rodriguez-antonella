# Comandos del desafio de MongoDB

**1** - Abrir 2 terminales, en uno de ellos ejecutar:
```
mongod -dbpath ./db
```  
**2** - Conectar con la base de datos:
```
mongo
```  
## Ya se encuentra listo Mongo para ser utilizado

**1** - Corroborar conexión. Ejecutar
```
show dbs
```  
**2** - Crear base con nombre ecommerce
```
use ecommerce
```  
**3** - Crear dos colecciones 
```
db.createCollection("messages")
```  
Y  
```
db.createCollection("products")
```  
**4** - Verificar que fueron creadas correctamente
```
show collections
```  
## Insertar archivos en las colecciones
**1** - Insertar los 10 mensajes de chats:
``` 
 db.messages.insertMany([ 
 { author: "Mariana", message: "test1", date: "05/05/2022", hour:"18:40:55" },
 { author: "Juan", message: "test", date: "07/05/2022", hour:"16:30:15" },
 { author: "Matias", message: "test3", date: "09/05/2022", hour:"13:07:10" },
 { author: "Ceci", message: "test4", date: "13/05/2022", hour:"11:30:07" },
 { author: "Carolina", message: "test5", date: "19/05/2022", hour:"15:30:07" },
 { author: "Esteban", message: "test6", date: "19/05/2022", hour:"18:30:07" },
 { author: "Carlos", message: "test7", date: "19/05/2022", hour:"16:30:07" },
 { author: "Mia", message: "test8", date: "19/05/2022", hour:"12:30:15" },
 { author: "Antonio", message: "test9", date: "19/05/2022", hour:"15:30:12" },
 { author: "Mauricio", message: "test10", date: "19/05/2022", hour:"15:30:05" }
 ])
```  
**2** - Insertar 10 productos:
``` 
db.products.insertMany([
  {
    title: "Coke",
    description: "soft drink",
    price: 250,
    stock: 50,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/food-desserts-drinks-and-sweets/512/soda-256.png"
  },
 {
    title: "Meat",
    description: "premium quality meat",
    price: 1200,
    stock: 40,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/food-177/64/steak-beef-meat-food-128.png"
  },
 {
    title: "Ice Cream",
    description: "home made ice cream",
    price: 2000,
    stock: 50,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/food-and-drink-color/64/ice_cream_food_dessert_restaurant_tasty_sweet_cone-128.png" },
 {
    title: "Bread",
    description: "homemade bread",
    price: 200,
    stock: 15,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/food-set-3/91/Food_C216-128.png"
  },
 {
    title: "Cheese",
    description: "fresh cheese",
    price: 1200,
    stock: 17,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/food-set-3/91/Food_C217-256.png"
  },
 {
    title: "Onion",
    description: "onion of the day",
    price: 102,
    stock: 30,
    "thumbnail": "https://cdn4.iconfinder.com/data/icons/food-4-9/128/food_Onion-Vegetable-Vegan-256.png"
  },
 {
    title: "Milk",
    description: "whole milk",
    price: 127,
    stock: 35,
    "thumbnail": "htthttps://cdn0.iconfinder.com/data/icons/bakery-and-dessert-color/64/Milk_bakery_food_icon_doodle-128.png"
  },
 {
    title: "Detergent",
    description: "liquid detergent",
    price: 300,
    stock: 30,
    thumbnail: "https://cdn0.iconfinder.com/data/icons/cleaning-and-maid-2/50/83-128.png"
  },
 {
    title: "Soap",
    description: "lemon scented soap",
    price: 167,
    stock: 45,
    "thumbnail": "https://cdn1.iconfinder.com/data/icons/hand-washing-outline-doodle-1/91/hand-washing-24-128.png"
  },
 {
    title: "Shampoo",
    description: "salt-free shampoo",
    price: 347,
    stock: 35,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/beauty-13/74/streight_hair_shampoo-128.png"
  }
])
```   
**3** - Listar todos los documentos de las colecciones con salida formateada:
``` 
db.messages.find().pretty()
```   
``` 
db.products.find().pretty()
```   
**4** - Ejecutar para mostrar la cantidad de documentos en cada colección
``` 
db.messages.estimatedDocumentCount()
```   
``` 
db.products.estimatedDocumentCount()
```   
**5** - Insertar un nuevo producto:
``` 
db.products.insertOne({
    title: "Keyboard",
    description: "This device has anti-ghosting keys",
    price: 3000,
    stock: 20,
    thumbnail: "https://cdn2.iconfinder.com/data/icons/design-creativity-round/128/12-128.png"})

```  
**6** - Listar los productos menores a $1000, usando:
``` 
db.products.find({"price":{$lt:1000}}, {"title":1})
```   
Filtrar los productos que se encuentran entre $1000 y $3000
``` 
db.products.find({"price":{$in: [1000, 3000]}}, {"title":1})
``` 
Filtrar los mayores a $3000:
``` 
db.products.find({"price":{$gt:3000}}, {"title":1})
``` 
Traer el tercer producto mas barato
``` 
db.products.find({}).sort({"price":1}).skip(2).limit(1)
``` 
**7** - Actualizar el stock a 100 a todos los productos:
``` 
db.products.updateMany({}, {$set:{ "stock": 100}}, {upsert: true})

``` 
Cambiar Stock 0 a aquellos productos que valen mas de $4000:
``` 
db.products.update({price: {$gt: 4000}}, {$set: {"stock": 0}}, {multi: true});
``` 
Borrar los productos con precio menor a 1000.
db.products.remove({price: {$lt: 1000}});

**8** Crear un usuario con unicamente permisos de lectura:  
llamaremos a la base "administrator" para crear el usuario dentro de ella, con:
``` 
use administrator
``` 
Crear el usuario con:
``` 
db.createUser({user: "pepe", pwd: "asd456", roles: [{role: "read", db:"ecommerce"}]})
``` 