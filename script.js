console.log("JS loaded");

function loadTodos(){
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", ()=> {

    const todoInput = document.getElementById("todoInput");

    const submitButtan = document.getElementById("addTodo");

    submitButtan.addEventListener("click",(event) => {
        const todoText = todoInput.value;
        if(todoText == ''){
            alert("Please write something for the todo");
        } else{
            addTodoToLocalStorage(todoText);
        }
    })
    
    todoInput.addEventListener("change", (event) => {
        //  This call back method is fired everytime there is a change in the input tag

        // console.log("somthisn changed",event.target.value)

        const todoText = event.target.value;

        event.target.value = todoText.trim();
        console.log(event.target.value);
    })
    loadTodos();
})