let addTask = document.getElementById("addTask");
let taskValue = document.querySelector("section form .box input");
let tasks = document.querySelector("section form .tasks");
let forms = document.forms[0];
let removeTask = document.getElementById("removeTask");
let noneTasks = document.getElementById("none-tasks")






let taskList = JSON.parse(localStorage.getItem("tasks")) || [];


function checkArray(){
    if (taskList.length === 0) {
        noneTasks.classList.remove("show")
    } else {
        noneTasks.classList.add("show")
    }
}


const addClickEventToTask = (taskDiv) => {
    taskDiv.addEventListener("click", () => {
        taskDiv.classList.toggle("show-task");
    });
};







forms.addEventListener("submit", (e) => {
    e.preventDefault();
});


function createTaskElement(task) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    let inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    taskDiv.appendChild(inputCheck);

    let label = document.createElement("label");
    label.textContent = task;
    taskDiv.appendChild(label);

    tasks.appendChild(taskDiv);
    addClickEventToTask(taskDiv); 
    checkArray()
    return taskDiv; 
}

taskList.forEach(task => {
    createTaskElement(task);
});


let addTasks = () => {
    if (taskValue.value === "") {
        return false;
    } else {
        let currentValue = taskValue.value;
        createTaskElement(currentValue);
        taskList.push(currentValue);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        taskValue.value = "";
        checkArray()
    }
};




let checkClass = () => {
    document.querySelectorAll(".task").forEach((ele) => {
        if (ele.classList.contains("show-task")) {
    
            // return label
            let taskText = ele.querySelector("label").textContent;
    
    
            // return index
            let index = taskList.indexOf(taskText);
    
    
            // check index found or not found
            if (index !== -1) {
                taskList.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(taskList));
            }
            ele.remove();
            checkArray()
        } else {
            return false;
        }
    });
}


addTask.addEventListener("click", addTasks);
removeTask.addEventListener("click", checkClass)

