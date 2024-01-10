class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}
function CreateBookCard(_title, _author, _pages, _status)
{
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    const titlePlaceholder = document.createElement("p");
    titlePlaceholder.classList.add("title");
    titlePlaceholder.textContent = "Title";
    const titleHeader = document.createElement("p");
    titleHeader.classList.add("card-title");
    titleHeader.textContent = _title;
    const authorPlaceholder = document.createElement("p");
    authorPlaceholder.classList.add("author");
    authorPlaceholder.textContent = "Author";
    const authorHeader = document.createElement("p");
    authorHeader.textContent = _author;
    authorHeader.classList.add("card-author");
    const pagesPlaceholder = document.createElement("p");
    pagesPlaceholder.classList.add("pages");
    pagesPlaceholder.textContent = "Pages";
    const pagesHeader = document.createElement("p");
    pagesHeader.textContent = _pages;
    pagesHeader.classList.add("card-pages");
    const readStatus = document.createElement("div");
    const removeBookButton = document.createElement("button");
    removeBookButton.innerHTML = "Remove";
    removeBookButton.classList.add("remove-btn");
    removeBookButton.addEventListener("click", function () {
        library.removeBook(_title);
        bookGrid.removeChild(bookCard);
    });

    if(_status)
    {
        readStatus.innerHTML = "Read";
        readStatus.classList.remove("not-read");
        readStatus.classList.add("read");
    }
    else{
        readStatus.innerHTML = "Not read";
        readStatus.classList.remove("read");
        readStatus.classList.add("not-read");
    }

    bookCard.appendChild(titlePlaceholder);
    bookCard.appendChild(titleHeader);
    bookCard.appendChild(authorPlaceholder);
    bookCard.appendChild(authorHeader);
    bookCard.appendChild(pagesPlaceholder);
    bookCard.appendChild(pagesHeader);
    bookCard.appendChild(readStatus);
    bookCard.appendChild(removeBookButton);
    bookGrid.appendChild(bookCard);
}

class Library {
    constructor() {
        this.library = [];
    }

    addBook(title, author, pages, status) {
        if (this.isValidBook(title, author, pages) && !this.isInLibrary(title)) {
           const newBook = new Book(title, author, pages, status);
           this.library.push(newBook);
           CreateBookCard(title, author, pages, status);
        } else {
            alert("This book is invalid or already in your library!");
        }
    }

    removeBook(title) {
        this.library = this.library.filter((book) => book.title !== title);
    }

    getBook(title) {
        return this.library.find((book) => book.title === title);
    }

    isInLibrary(title) {
        return this.library.some((book) => book.title === title);
    }

    isValidBook(title, author, pages) {
        if (!title || !author || pages < 0 || pages >= 2000) {
            return false;
        }
        return true;
    }
}

const library = new Library();

const overlay = document.getElementById("overlay");
const addBookButton = document.getElementById("new-btn");
const addBookModal = document.getElementById("add-book-modal");
const exitButton = document.getElementById("exit-modal-btn");
const submitButton = document.getElementById("submit-btn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const status = document.getElementById("status");
const bookGrid = document.getElementById("book-grid");

function ShowAddBookModal()
{
    overlay.style.display = "block";
    addBookModal.classList.add("active");
}
function HideAddBookModal()
{
    overlay.style.display = "none";
    status.checked = false;
    addBookModal.classList.remove("active");
}

function OnSubmitButtonClick(event) {
    event.preventDefault();
    library.addBook(title.value.trim(), author.value.trim(), pages.value.trim(), status.checked);
    title.value = "";
    author.value = "";
    pages.value = "";
    status.checked = false;
    HideAddBookModal();
}



CreateBookCard("hello", "world", 89, true);