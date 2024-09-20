const addBookButton = document.querySelector(".add-book");
const bookDialog = document.querySelector("#book-dialog");
const closeButton = document.querySelector("#close-button");
const bookForm = document.querySelector("#book-form");

addBookButton.addEventListener("click",()=>{
    bookDialog.showModal();
});

closeButton.addEventListener("click",()=>{
    bookDialog.close();
    bookForm.reset();
})