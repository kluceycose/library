import Book from './library.js';

function handleAddPress(e) {
    toggleForm();
}

function addBookToLibrary(e) {
    const bookForm = document.querySelector(".add-form");
    // console.log(bookForm);

    const title = bookForm.elements.title.value;
    const author = bookForm.elements.author.value;
    const pages = bookForm.elements.pages.value;
    console.log(bookForm.elements.pages);
    const read = bookForm.elements.read.checked;

    myLibrary.push(new Book(title, author, pages, read))
    toggleForm();
    render();
    e.preventDefault();
}

function deleteBook(e){
    // console.log(e);
    // console.log(myLibrary);
    const index = +e.target.parentNode.getAttribute("data-index");
    myLibrary = myLibrary.slice(0, index).concat(myLibrary.slice(index+1));
    console.log(myLibrary);
    render();
}

function toggleRead(e){
    const index = e.target.parentNode.getAttribute("data-index");
    myLibrary[index].toggleRead();
    e.target.parentNode.querySelector(".read-btn").textContent = 
        `Mark book ${myLibrary[index].read? "unread":"read"}`;
        e.target.parentNode.querySelector(".read-status").textContent =
        `Book has${myLibrary[index].read? "": " not"} been read`;
}

function toggleForm(){
    document.querySelector(".add-btn").classList.toggle("hidden");
    document.querySelector(".add-form").classList.toggle("hidden");
}

function render() {
    const shelf = document.querySelector(".books");
    shelf.innerHTML = "";
    for(let book in myLibrary){
        // console.log(book);
        const card = createCard(myLibrary[book], book);
        
        shelf.appendChild(card);
    }
}

function createCard(book, index) {
    const infoCard = document.createElement("div");
    infoCard.classList.add("card");
    infoCard.setAttribute("data-index", index);

    const title = document.createElement("h3");
    title.textContent = `Title: ${book.title}`;
    infoCard.appendChild(title);

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;
    infoCard.appendChild(author);

    const length = document.createElement("p");
    length.textContent = `Length: ${book.pages} pages`;
    infoCard.appendChild(length);

    const read = document.createElement("p");
    read.classList.add("read-status");
    read.textContent = `Book has${book.read? "": " not"} been read`;
    infoCard.appendChild(read);

    const readBtn = document.createElement("button");
    readBtn.classList.add("read-btn");
    readBtn.textContent = `Mark book ${book.read? "unread":"read"}`;
    readBtn.addEventListener("click", toggleRead);
    infoCard.appendChild(readBtn);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Book";
    delBtn.addEventListener('click', deleteBook);
    infoCard.appendChild(delBtn);

    return infoCard;
}

let myLibrary = [];

const showAddBtn = document.querySelector(".add-btn");
showAddBtn.addEventListener('click', handleAddPress);

const addBookBtn = document.querySelector(".sbmt-btn");
addBookBtn.addEventListener('click', addBookToLibrary);
render();