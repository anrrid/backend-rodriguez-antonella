class User {
    constructor(name, surname, pets, books) {
        this.name = name
        this.surname = surname
        this.pets = pets
        this.books = books
    }


    getFullName() {
        console.log(`Nombre completo: ${this.name} , ${this.surname} `)
    }

    addPet(pet) {
        this.pets.push(pet)
    }

    countPets() {
        console.log(this.pets.length);
    }

    addBook(title, author) {
        this.books.push({ Title: title, Author: author })
    }

    getBookNames() {
        return this.books.map((book) => {
            return book.Title;
        });
    }

}

const user1 = new User('Light', 'Yagami', ['Pepino'], [{ Title: 'El arte de la Guerra', Author: 'Sun Tzu' }])

//Muestra nombre completo
console.log(user1.getFullName());

// Pusheo en el array de pets
user1.addPet("Pepino2")
user1.addPet("Kira")
user1.addPet("Coco")
user1.addPet("Simba")
user1.addPet("Fatiga")
user1.addPet("Nala")
user1.addPet("Gala")
user1.addPet("Leia")

//Array de pets
console.log(user1.pets)

//Conteo de pets
console.log(user1.countPets());

//Books
user1.addBook('Un Mundo Feliz', 'Aldous Huxley')
user1.addBook('1984', 'George Orwell')
user1.addBook('El Alquimista', 'Paulo Coelho')
user1.addBook('El Retrato de Dorian Grey', 'Oscar Wilde')


console.log('Books', user1.books)

//Mapeo de los titles
console.log('getBookNames', user1.getBookNames());