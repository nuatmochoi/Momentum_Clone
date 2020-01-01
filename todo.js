const toDoForm = document.querySelector(".js-toDoForm");
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){ //using target 
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo){ // Using item that is TRUE, make new array
        return toDo.id!==parseInt(li.id);
    }) 
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    // local storage -> only saved by string
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // object -> string
}

function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newID = toDos.length+1
    const span = document.createElement("span");
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText=text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id= newID;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newID
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintTodo(currentValue);
    toDoInput.value="";
}



function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !==null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ // function execution for each array element
            paintTodo(toDo.text);
        }); 
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();