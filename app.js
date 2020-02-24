// Book Class
class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
   addBookToList(book) {
        const list = document.querySelector('.body');
        let html = '';
        html = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">x</a></td>
        </tr>
        `;

        list.innerHTML += html;
   }
   // Show alert
   showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.innerHTML = message;

    const container = document.querySelector('.container');
    const form = document.querySelector('form');
    container.insertBefore(div, form);

    setTimeout(()=> {
        document.querySelector('.alert').remove();
    },3000)
   }
   // Delete Book
   deleteBook(e) {
    if(e.target.className === 'delete') {
        const li = e.target.parentNode.parentNode;
        li.remove();
    }
   }

   // Clear fields
   clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
   }
}

document.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault();
    const table = document.querySelector('.body');
    const loader = document.querySelector('.loading');
    loader.className = `loading`;
    table.className = `body dont`;

    setTimeout(() => {
        loader.className = `loading dont`;
        table.className = `body`;
    },1000)

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    
    const book = new Book(title,author,isbn);

    const ui = new UI();
    // Validate
    if(title === '' || author === '' || isbn === 's') {
        ui.showAlert('Please fill in all fields', 'error');
        
    }
    else {
        ui.addBookToList(book);

        ui.showAlert('Book Added', 'success')
        //Clear Fields
        ui.clearFields();
    }
});

//Event Listener for delete
document.querySelector('.body').addEventListener('click', e=>{
    e.preventDefault();

    const ui = new UI();

    ui.deleteBook(e);

    ui.showAlert('Book Removed!', 'success');
})