const addBookButton = document.querySelector(".add-book");
const bookDialog = document.querySelector("#book-dialog");
const closeButton = document.querySelector("#close-button");
const bookForm = document.querySelector("#book-form");
const submitBook = document.querySelector("#submit-button");
const librarySection = document.querySelector(".main-area")

addBookButton.addEventListener("click",()=>{
    bookDialog.showModal();
});

closeButton.addEventListener("click",()=>{
    bookDialog.close();
    bookForm.reset();
})

submitBook.addEventListener("click", (e) => {
	e.preventDefault();
	if (!bookForm.checkValidity()) {
		bookForm.reportValidity();
		return;
	}
    
	const title = document.querySelector('input[name="book-title"]').value.trim();
	const author = document.querySelector('input[name="book-author"]').value.trim();
	const pages = document.querySelector('input[name="book-pages"]').value.trim();
	const read = document.querySelector('input[name="read"]:checked').value.trim();
	const newBook = new Book(title, author, pages, read);
	library.push(newBook);
	displayLibrary();
	bookDialog.close();
	bookForm.reset();
})
 
function Book(title, author, pages, read){
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.read = read;
}

const library = []

function displayLibrary(){
	while (librarySection.hasChildNodes()) {
		librarySection.removeChild(librarySection.firstChild);
	}
	library.forEach(book => createBook(book));
}

function createBook(book){
	const background = document.createElement("div");
	const titleElement = document.createElement("h2");
	const authorElement = document.createElement("p");
	const nameElement = document.createElement("span");
	const pagesElement = document.createElement("p");
	const numberElement = document.createElement("span");
	const buttonsDiv = document.createElement("div");
	const readElement = document.createElement("button");
	const removeElement = document.createElement("button");

	titleElement.textContent =`${book.title}`;
	authorElement.textContent = "Author: ";
	nameElement.textContent = `${book.author}`;
	pagesElement.textContent = "Pages: ";
	numberElement.textContent = `${book.pages}`;
	readElement.textContent = `${book.read}`;
	removeElement.textContent = "Remove";

	background.classList.add("book");
	titleElement.classList.add("book-heading");
	authorElement.classList.add("author-name");
	nameElement.classList.add("author-val");
	pagesElement.classList.add("pages");
	numberElement.classList.add("page-val");
	buttonsDiv.classList.add("buttons-div");
	readElement.classList.add("read-button");
	removeElement.classList.add("remove-button");

    readElement.setAttribute("data-index", library.indexOf(book));
	removeElement.setAttribute("data-index", library.indexOf(book));

    readElement.addEventListener("click", toggleState);
	removeElement.addEventListener("click", removeBook);

    buttonsDiv.appendChild(readElement);
	buttonsDiv.appendChild(removeElement);
	pagesElement.appendChild(numberElement);
	authorElement.appendChild(nameElement);
	background.appendChild(titleElement);
	background.appendChild(authorElement);
	background.appendChild(pagesElement);
	background.appendChild(buttonsDiv);
	librarySection.appendChild(background);
}

function removeBook(e){
	const bookIndex = e.target.getAttribute("data-index");
	library.splice(bookIndex, 1);
	displayLibrary();
}

function toggleState(e){
	const bookIndex = e.target.getAttribute("data-index");
	const readStatus = e.target.textContent === "read" ? "not read" : "read";
	library[bookIndex].read = readStatus;
	displayLibrary();
}