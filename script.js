console.log("JS loaded");

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function executeFilterAction(event){
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    todoList.innerHTML = '';
    const todos = loadTodos();

    if(value == "all"){
        console.log(todoList)
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        })
    }else if(value == "pending"){
        todos.todoList.forEach(todo =>{
            if(todo.isCompleted !== true)
                appendTodoInHtml(todo);
        })
    }else{
        todos.todoList.forEach(todo =>{
            if(todo.isCompleted == true)
                appendTodoInHtml(todo);
        })
    }
}

function appendTodoInHtml(todo, index) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");
    todoItem.classList.add("todoItem");

    const textDiv = document.createElement("div");
    textDiv.textContent = todo.text;
    if (todo.isCompleted) {
        textDiv.style.textDecoration = "line-through"; // Strike-through for completed items
    }

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", () => editTodo(index));

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => deleteTodo(index));

    // Completed Button
    const completBtn = document.createElement("button");
    completBtn.textContent = "Completed";
    completBtn.classList.add("completBtn");
    completBtn.addEventListener("click", () => completeTodo(index));

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);
    todoList.appendChild(todoItem);
}

function deleteTodo(index) {
    const todos = loadTodos();
    todos.todoList.splice(index, 1); // Remove the todo at the given index
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(); // Re-render the list after deletion
}

// Function to mark a todo as completed
function completeTodo(index) {
    const todos = loadTodos();
    todos.todoList[index].isCompleted = !todos.todoList[index].isCompleted; // Toggle the completion status
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(); // Re-render the list to reflect changes
}

// Function to render todos (clear and re-append)
function renderTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ''; // Clear the current list
    const todos = loadTodos();
    todos.todoList.forEach((todo, index) => {
        appendTodoInHtml(todo, index);
    });
}


document.addEventListener("DOMContentLoaded", ()=> {

    const todoInput = document.getElementById("todoInput");

    const submitButtan = document.getElementById("addTodo");

    // const todoList = document.getElementById("todoList");
    const filterBtns = document.getElementsByClassName("filter-btn");

    for(const btn of filterBtns){
        btn.addEventListener("click", executeFilterAction)
    }

    submitButtan.addEventListener("click",(event) => {
        const todoText = todoInput.value;
        if(todoText == ''){
            alert("Please write something for the todo");
        } else{
            addTodoToLocalStorage({text: todoText, isCompleted: false});
            appendTodoInHtml({text: todoText, isCompleted: false});
            todoInput.value = '';
        }
    })
    
    todoInput.addEventListener("change", (event) => {
        //  This call back method is fired everytime there is a change in the input tag

        // console.log("somthisn changed",event.target.value)

        const todoText = event.target.value;

        event.target.value = todoText.trim();
        console.log(event.target.value);
    })
    const todos = loadTodos();

    todos.todoList.forEach(todo => {
       appendTodoInHtml(todo);
    })
})