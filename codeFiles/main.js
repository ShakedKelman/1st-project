
function saveTasksToLocalStorage(tasks) {// function to save tasks to local storage so we can all it when needed
    const tasksJSON = JSON.stringify(tasks); // this turns it into JSON string
    localStorage.setItem('tasks', tasksJSON);// this Stores JSON  in local storage
    console.log(JSON.parse(tasksJSON));
}


function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    if (tasksJSON) {
        return JSON.parse(tasksJSON);
    } else {
        return [];
    }
}

function saveForm() {//  this function saves form data to local storage and update task details
    let detailsInput = document.getElementById("taskDetails").value;
    let dateInput = document.getElementById("taskDate").value;
    let timeInput = document.getElementById("taskTime").value;
    let tasks = getTasksFromLocalStorage();
    if (detailsInput && dateInput && timeInput) {//this "if" is to make sure all inputs are filled
        let newTask =//setting an object literal called newTask
        {
            textOutput: `Task Details - ${detailsInput}`,
            elseOutput: `Task Date Is: ${dateInput} Task Time Is: ${timeInput}`,
            checked: false // setting checked as false for my default
        }
        tasks.push(newTask);
        // saving updated tasks to local storage
        saveTasksToLocalStorage(tasks);
        renderTasks(tasks);
        console.log(newTask);
        resetForm()
    }
    else {
        alert("please fill all inputs")
    }
}

function resetForm() {
    let detailsInput = document.getElementById("taskDetails");
    let dateInput = document.getElementById("taskDate");
    let timeInput = document.getElementById("taskTime");
    detailsInput.value = ""; // changing the value to empty string to erase the inputs
    dateInput.value = "";
    timeInput.value = "";
}


function renderTasks(tasks) {// this function renders (like reload) tasks on the page
    let mainTaskContainer = document.getElementById("mainTaskContainer")
    mainTaskContainer.innerHTML = "";// clearing previous task output

    for (let index = 0; index < tasks.length; index++) {// Rendering each task (by task index)
        let task = tasks[index];
        let taskDiv = document.createElement("div");// creating a new element to contain the tasks
        taskDiv.className = "task box fw-light";// adding classes for styling

        let taskInnerDiv = document.createElement("div");// creating another div inside taskDiv
        taskInnerDiv.className = "box-inner-container";
        taskDiv.appendChild(taskInnerDiv);

        //adding all my necessary tags in my js for more dynamic file

        taskInnerDiv.innerHTML =
            `<div class="btn-icon-container">
            <div class="checkbox-container">
                <input type="checkbox" class="task-checkbox" id="task${index}" ${task.checked ? 'checked' : ''}
                    onchange="updateTask(${index}, this.checked)">
            </div>
            <div class="glyphicon-location">
                <button type="button" id="delete${index}" class="btn btn-default" aria-label="Left Align"
                    onclick="eraseTask(${index})">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>
        </div>
        <div class="box-inner-container">
            <label for="task${index}" class="textOutput overflow-y-auto fw-light">${task.textOutput}</label><br>
            <div class="TaskElseOutput">${task.elseOutput}</div>
        </div>`;


        console.log(`Task and its index ${index}: ${task}`);
        mainTaskContainer.appendChild(taskDiv);//adding taskDiv
    }
}

function updateTask(index, checked) {// this function shows task status ( if checked/unchecked)
    let tasks = getTasksFromLocalStorage();
    tasks[index].checked = checked;// checking if task ( task number is the index) is checked and putting it the value of checked
    saveTasksToLocalStorage(tasks);
}

function deleteCheckedTasks() {// this function deletes checked tasks
    let tasks = getTasksFromLocalStorage();
    let tasksRemaining = [];// task remaining will have all the unchecked tasks
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].checked) {
            tasksRemaining.push(tasks[i]);
            console.log(tasksRemaining);
        }
    }
    if (tasks.length > tasksRemaining.length) {// if tasks have more tasks than tasks remaining we enter the statement
        saveTasksToLocalStorage(tasksRemaining);//saving remaining tasks
        renderTasks(tasksRemaining);// now we wont have the checked tasks in the html and in local storage
    }
}

function eraseTask(taskIdNum) { // this function erases  a whole note also from local storage
    if (taskIdNum !== null) { // if note id is not null we delete the targeted note
        updateTask(taskIdNum, true)//this takes the task id number and changes the element to checked so we can erase the task
        deleteCheckedTasks(); // using the deleteCheckedTasks function properties to delete the note - instead of re writing what that function contains
    }
}

function initTasks() {// this function initializes tasks when page is loaded
    deleteCheckedTasks(); // this deletes checked tasks when the page is loaded
    let tasks = getTasksFromLocalStorage();
    renderTasks(tasks);
};

window.onload = initTasks; // calling the function on page reload