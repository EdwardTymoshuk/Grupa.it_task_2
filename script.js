//GET ELEMENTS 
const modalBtn = document.querySelector("#modal-btn")
const modal = document.querySelector(".modal")
const modalForm = document.querySelector('#modal-form')
const closeBtn = document.querySelector(".close-btn")
const tbodyEl = document.querySelector('#tbody')
const titleEl = document.querySelector('#title')
const authorEl = document.querySelector('#author')
const priorityEl = document.querySelector('#priority')
const categoryEl = document.querySelector('#category')
const addBtn = document.querySelector('#add-book-btn')

//DEFINE VARIABLES
let titleValidated, authorValidated, priorityValidated, categoryValidate
let localStorageBooks = JSON.parse(localStorage.getItem("books"))
let booksArr = localStorageBooks ? [...localStorageBooks] : []

//HELPFULL FUNCTIONS AND EVENTS
//input validation
const validateInput = (input, fieldName, min) => {
    let validated
    !input.value ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Pole ${fieldName} nie może być puste.`) :
        input.value.length < min ? (input.classList.add('input-error'), input.nextSibling.nextSibling.innerHTML = `Pole ${fieldName} nie może być krótsze, niż ${min} znaki(-ów)`) :
            (input.classList.remove('input-error'), input.nextSibling.nextSibling.innerHTML = ``, validated = true)
    return validated
}

//select validation
const validateSelect = (select, fieldName) => {
    let validated
    select.value === '0' ? (select.classList.add('input-error'), select.nextSibling.nextSibling.innerHTML = `Musisz wybrać ${fieldName}`) :
        (select.classList.remove('input-error'), select.nextSibling.nextSibling.innerHTML = ``, validated = true)
    return validated
}

//close modal window function
const closeModalWindow = () => {
    modal.style.display = "none"
}

//show modal window event
modalBtn.onclick = function () {
    modal.style.display = "grid"
}

//close modal window events
closeBtn.onclick = function () {
    closeModalWindow()
}

window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none"
    }
}

//add click event to add new book button
addBtn.addEventListener('click', e => {
    e.preventDefault()
    addNewBook()
})
//MAIN FUNCTIONS
//get books from local storage
const getBooks = () => {
    localStorageBooks && localStorageBooks.map(v => {
        tr = document.createElement('tr')
        tr.innerHTML = ` <tr>
        <td>${v.title}</td>
        <td>${v.author}</td>
        <td>${v.priority}</td>
        <td>${v.category}</td>
      </tr>
    <tr>`
        tbodyEl.appendChild(tr)
    })
}
//add new book to page and local storage
const addNewBook = () => {
    tr = document.createElement('tr')
    tr.innerHTML = ` <tr>
    <td>${titleEl.value}</td>
    <td>${authorEl.value}</td>
    <td>${priorityEl.value}</td>
    <td>${categoryEl.value}</td>
  </tr>
<tr>`

    let books = {
        'title': titleEl.value,
        'author': authorEl.value,
        'priority': priorityEl.value,
        'category': categoryEl.value
    }

    validateInput(titleEl, 'Tytuł', 1) ? titleValidated = true : titleValidated = false
    validateInput(authorEl, 'Autor', 3) ? authorValidated = true : authorValidated = false
    validateSelect(priorityEl, 'Priorytet') ? priorityValidated = true : priorityValidated = false
    validateSelect(categoryEl, 'Priorytet') ? categoryValidated = true : categoryValidated = false

    !!titleValidated && !!authorValidated && !!priorityValidated && !!categoryValidated && (booksArr.push(books),
        localStorage.setItem('books', JSON.stringify(booksArr)), tbodyEl.appendChild(tr), closeModalWindow(), modalForm.reset())
}

//INVOKE GET BOOKS FUNCTION
getBooks()

