// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    // Convert tasks array to JSON string
    const tasksJSON = JSON.stringify(tasks);
    // Store JSON string in local storage
    localStorage.setItem('tasks', tasksJSON);
}

// Function to retrieve tasks from local storage
function getTasksFromLocalStorage() {
    // Retrieve JSON string from local storage
    const tasksJSON = localStorage.getItem('tasks');
    // Convert JSON string to tasks array
    return JSON.parse(tasksJSON) || [];
}

// Function to save form data and update task details
function saveForm1() {
    let detailsInput = document.getElementById("taskDetails").value;
    let dateInput = document.getElementById("taskDate").value;
    let timeInput = document.getElementById("taskTime").value;
    let tasks = getTasksFromLocalStorage();
    if (detailsInput && dateInput && timeInput) {
        let newTask =
        {
            textOutput: `Task Details - ${detailsInput}`,
            elseOutput: `Task Date Is: ${dateInput} Task Time Is: ${timeInput}`,
            checked: false
        }
        tasks.push(newTask);
        // Save updated tasks to local storage
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
    detailsInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
}

// Function to render tasks on the page
function renderTasks(tasks) {
    // Clear previous task output
    let mainTaskContainer = document.getElementById("mainTaskContainer")
    mainTaskContainer.innerHTML = "";

    // Render each task
    tasks.forEach((task, index) => {
        // Create task div
        let taskDiv = document.createElement("div");
        taskDiv.className = "task box fw-light";
        taskInnerDiv = document.createElement("div");
        taskInnerDiv.className = "box-inner-container";
        taskDiv.appendChild(taskInnerDiv);
        taskInnerDiv.innerHTML = `
        <div class="btn-icon-container">
            <div class="checkbox-container">
                <input type="checkbox" class="task-checkbox" id="task${index}" 
                ${task.checked ? 'checked' : ''} onchange="updateTask(${index}, this.checked)">
            </div>
            <div class="glyphicon-location">
                <button type="button" id="delete${index}" class="btn btn-default" 
                aria-label="Left Align" onclick="eraseTask(this)">
                    <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </button>
            </div>
        </div>
        <div class="box-inner-container">
            <label for="task${index}" class="textOutput overflow-y-auto fw-light">${task.textOutput}</label><br>
            <div class="TaskElseOutput">${task.elseOutput}</div>
        </div>
        `;
        console.log(`my task with the added  index ${index}: ${task}`);

        mainTaskContainer.appendChild(taskDiv);
    });
}


// Function to update task status (checked/unchecked)
function updateTask(index, checked) {
    let tasks = getTasksFromLocalStorage();
    tasks[index].checked = checked;
    saveTasksToLocalStorage(tasks);
}

// Function to delete checked tasks
function deleteCheckedTasks() {
    let tasks = getTasksFromLocalStorage();
    // Remove checked tasks
    let tasksRemaining = tasks.filter(task => !task.checked);

    // Render remaining tasks
    if (tasks.length > tasksRemaining.length) {
        saveTasksToLocalStorage(tasksRemaining);
        renderTasks(tasksRemaining);
    };
}


function eraseTask(noteElement) {
    let noteId = noteElement.id;
    if (noteId !== null) {
        let taskIdNum = noteId.match(/[0-9]+/); //this gives us the number of the note - if its "note_number_1" we will receive "1"
        updateTask(taskIdNum[0], true)//this takes the task id number and changes the element to checked so we can erase the task
        deleteCheckedTasks(); 
    }
}


// Function to initialize tasks on page load
function initTasks() {
    deleteCheckedTasks(); // Delete checked tasks when the page is loaded
    let tasks = getTasksFromLocalStorage();
    renderTasks(tasks);

};

window.onload = initTasks;