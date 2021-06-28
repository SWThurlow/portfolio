/*Array for books and retrieving html elements.*/
let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

const newTitle = document.getElementById('title');
const newAuthor = document.getElementById('author');
const newPageCount = document.getElementById('pageCount');
const newRead = document.getElementById('read');
const addBook = document.getElementById('addBook');
const fieldsMessage = document.querySelector('.fieldsMessage');
const library = document.querySelector('.library');

/*Set library min height so it doesn't disappear without any books.*/
library.style.cssText = `min-height: calc(100vh - ${library.offsetTop}px)`;

/*Book constructor.*/
class Book {
    constructor(title, author, pageCount, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
        this.index;
        this.findIndex = () => {
            this.index = myLibrary.indexOf(this);
        };
    }
}

/*Adding new books*/
function newBook() {
    if(newTitle.value === '' || newAuthor.value === '' || pageCount.value === '') {
        fieldsMessage.textContent = 'Please fill in all fields.';
        return
    }
    const book = new Book(newTitle.value, newAuthor.value, pageCount.value, read.checked ? 'read' : 'not read');
    myLibrary.push(book);
    book.findIndex();
    displayBook(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    newTitle.value = '';
    newAuthor.value = '';
    pageCount.value = '';
}

function displayBook(book) {
    let cover = document.createElement('div');
    cover.setAttribute('class', 'book');
    cover.setAttribute('data-index', `${book.index}`)
    let title = document.createElement('h3');
    title.textContent = book.title;
    cover.appendChild(title);
    let author = document.createElement('h3');
    author.textContent = book.author;
    cover.appendChild(author);
    let pageCount = document.createElement('p');
    pageCount.textContent = book.pageCount + ' pages long.';
    cover.appendChild(pageCount);
    let unread = document.createElement('p');
    unread.textContent = `You have ${book.read} this title.`;
    cover.appendChild(unread);
    let read =  document.createElement('button');
    read.setAttribute('class', 'read')
    read.textContent = 'Read';
    cover.appendChild(read);
    let remove = document.createElement('button');
    remove.setAttribute('class', 'remove');
    remove.textContent = 'Remove form library';
    cover.appendChild(remove);

    library.appendChild(cover);
}

function removeBook(book) {
    myLibrary.splice(book.dataset.index, 1);
    library.removeChild(book);
    let allBooks = [...library.childNodes];
    for(let i = book.dataset.index; i < allBooks.length; i++){
        allBooks[i].dataset.index = i - 1;
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function toggleRead(readStatus, target){
    if(target.read === 'not read') {
        target.read = 'read'
    } else {
        target.read = 'not read'
    }

    readStatus.textContent = `You have ${target.read} this title.`;
}

/*Event listeners*/
addBook.addEventListener('click', (e) => {
    newBook(e);
});

library.addEventListener('click', (e) => {
    let targetBook = myLibrary[e.target.parentNode.dataset.index];
    if(e.target.classList.contains('remove')){
        removeBook(e.target.parentNode);
    } else if(e.target.classList.contains('read')){
        let readDisplay = e.target.previousElementSibling;
        toggleRead(readDisplay, targetBook);
    } else return
});

window.addEventListener('keyup', () => {
    if(newTitle.value !== '' || newAuthor.value !== '' || pageCount.value !== '') {
        fieldsMessage.textContent = '';
        return
    }
});

window.onload = myLibrary.forEach(book => displayBook(book));