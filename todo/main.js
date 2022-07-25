let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// empty array to store the task

 let arrayOfTasks = [];

 //check if there is tasks in local storage
 if (localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
 }

// Trigger get data store the tasks
getDataFromLocalStorage();

// add tasks 
submit.onclick = function () {
 if (input.value !== ""){
 addTaskToArray(input.value); //add task to array
 input.value = ""; // empty input field
}
};

//click on tasks element 
tasksDiv.addEventListener("click", (e) => {
    //delete button 
    if 
    (e.target.classList.contains("del")){
            //remove tasks from local storage 
            deletTaskWith(e.target.parentElement.getAttribute("data-id"));
       
        //remove element from page 
        e.target.parentElement.remove();
    }
    //Task Element 
    if (e.target.classList.contains("task")){
        //Toggle Complete For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //Toggle done class 
        e.target.classList.toggle("done");   
    }

});


    function addTaskToArray(taskText) {
        //Task data
        const task = {
            id: Date.now(), 
            title : taskText,
            completed: false
        };
        //Push task to array of tasks 
        arrayOfTasks.push(task);
        addElementsToPageFrom(arrayOfTasks);
        //add tasks to local storage
        addDataToLocalStorageFrom(arrayOfTasks);


}
function  addElementsToPageFrom(arrayOfTasks) {
//empty tasks div
tasksDiv.innerHTML = "";
//looping on array of tasks 
arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check task done
    if (task.completed){
        div.className="taskdone";
    }
    div.setAttribute("data-id" , task.id);
    div.appendChild(document.createTextNode(task.title));
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("delete"));
    //append button to main div
    div.appendChild(span);
    // add task div to tasks container
    tasksDiv.appendChild(div);



});
}
function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks');
    if (data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);

    }
}
function deletTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ?  (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
            
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

 
