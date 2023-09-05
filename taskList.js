const taskInput = document.getElementById("task");
const form = document.getElementById("task-form");
const collection = document.querySelector(".collection");
const clearTasks = document.querySelector(".clear-tasks");
const filter = document.getElementById("filter");


form.addEventListener("submit", AddTask);
collection.addEventListener("click", RemoveTask);
clearTasks.addEventListener("click", RemoveAll);
filter.addEventListener("keyup",FilterTask);
document.addEventListener("DOMContentLoaded",GetTasks);

function AddTask(e){
    
    if (taskInput.value === '') {
        alert('لطفا وظیفه ای را وارد نمایید');
    }
    
    let li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    let link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fas fa-trash-alt"></i>';
    li.appendChild(link);
    
    collection.appendChild(li);
    
    StoreTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

function RemoveTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("آیا مطمئن هستید؟")){
        e.target.parentElement.parentElement.remove();
        RemoveTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}
function RemoveAll(e){
    if(confirm("آیا مطمئن هستید؟"))
         collection.innerHTML = "";
}
function FilterTask(e){
   
    let text = e.target.value.toLowerCase();
    let items = document.querySelectorAll(".collection-item");
    for (const item of items) {
        if(item.firstChild.textContent.indexOf(text) != -1){
           item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    }

}
function StoreTaskInLocalStorage(task)
{

    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function GetTasks(){

    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    for (const item of tasks) {
        let li = document.createElement("li");
        li.className = 'collection-item';
        li.innerText = item;

        let link = document.createElement("a");
        link.className = "delete-item";
        link.innerHTML = '<i class="fas fa-trash-alt"></i>';

        li.appendChild(link);
        collection.appendChild(li);

    }
}
function RemoveTaskFromLocalStorage(li)
{
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task,index){
        if(task === li.textContent){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
           
}

