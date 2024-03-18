const { v4: uuidv4 } = require('uuid')
const { formatDistanceToNow } = require("date-fns");

const inputTitle = document.getElementById("title-input");
const inputDescription = document.getElementById("description-input");
const inputDate = document.getElementById("date-input");
const inputBtn = document.getElementById("input-btn");
const todoForm = document.getElementById("todo-form");
const todosContainer = document.getElementById("todos-container");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

let todosList = [];

class Todo {

  constructor(id, title, description, dueDate , completed ){
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  addTodo(todo){
    todosList.push(todo)
  }

};

const disablePrevDate = () => {

  const todayDate = new Date();

  let month = todayDate.getMonth() + 1;
  let day = todayDate.getDate();
  let year = todayDate.getFullYear();

  if(month < 10) month = '0' + month.toString();
  if(day < 10) day = '0' + day.toString();

  const maxDate = `${year}-${month}-${day}`;
  inputDate.setAttribute('min', maxDate);
}

const handleToogleCompleted = (e) => {
  const todoId =e.target.id; 

  todosList.forEach( (element, index) => {

    if(element.id == todoId){
      todosList[index].completed ? todosList[index].completed = false : todosList[index].completed = true
    }

  } );
  return createTodoToDisplay(todosList)
}

const handleDelete = (todo) => {
  const todoId =todo.id;
  const newTodos = todosList.filter((todo) => todo.id !== todoId);
  todosList = newTodos;
  createTodoToDisplay(todosList)
}

const createTodoToDisplay = (todos) => {

  todosContainer.innerHTML = "";

  todos.map( todo => {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", todo.id);

    const pElement = document.createElement("p");
    todo.completed ? pElement.classList = "todo-completed" : pElement.classList = "";
    pElement.textContent = todo.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("id", "deleteBtn");
  

    const divTodoTime = document.createElement('div');
    divTodoTime.classList = "todo-time"
    divTodoTime.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: #7d7fa5;"><path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path><path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path></svg>
      <span>${formatDistanceToNow(todo.dueDate)}</span>
    `;

    todoCard.appendChild(input);
    todoCard.appendChild(pElement);
    todoCard.appendChild(divTodoTime);
    todoCard.appendChild(deleteBtn);
    

    input.addEventListener("click", handleToogleCompleted);
    deleteBtn.addEventListener("click", () => handleDelete(todo));

    todosContainer.appendChild(todoCard);


  } )

}


const displayTodos = (e) => {

  e.preventDefault();

  const todoId = uuidv4();
  const todoTitle = inputTitle.value;
  const todoDescription = inputDescription.value;
  const todoDate = inputDate.value;

  const todoToAdd = new Todo( todoId, todoTitle, todoDescription, todoDate , false);
  todoToAdd.addTodo(todoToAdd);
  
  inputTitle.value = "";
  inputDescription.value = "";
  inputDate.value = "";
  modal.style.display = "none";
  
  createTodoToDisplay(todosList);
}


todoForm.addEventListener("submit", displayTodos);

inputBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

disablePrevDate();
createTodoToDisplay(todosList);

