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

    // Push new task to tasks array
    let newTask =
    {
        textOutput: `task details: ${detailsInput}`,
        elseOutput: `task date is: ${dateInput} task time is: ${timeInput}`,
        checked: false // Initially unchecked
    }
    tasks.push(newTask);

    // Save updated tasks to local storage
    saveTasksToLocalStorage(tasks);

    // Render tasks on the page
    renderTasks(tasks);
    console.log(newTask);

    resetForm()

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
    let mainNode = document.getElementById("mainTaskContainer")
    mainNode.innerHTML = "";

    // Render each task
    tasks.forEach((task, index) => {
        // Create task div
        let taskDiv = document.createElement("div");
        taskDiv.className = "task box fw-light";
        // let btn = document.createElement('button');
        // btn.setAttribute('type', "button")
        // btn.onclick = eraseTask; 
        // btn.className="btn btn-default"
        // btn.setAttribute('aria-label', "Left Align");
        // btn.innerHTML = `<span class="glyphicon glyphicon-remove glyphicon-location" aria-hidden="true"></span>`
        // taskDiv.appendChild(btn);
        taskInnerDiv = document.createElement('div');
        taskInnerDiv.className = 'box-inner-container';
        taskDiv.appendChild(taskInnerDiv);
        taskInnerDiv.innerHTML = `
        <div class="btn-icon-container">
    <div class="checkbox-container">
        <input type="checkbox" class="task-checkbox" id="task${index}" ${task.checked ? 'checked' : ''} onchange="updateTask(${index}, this.checked)">
    </div>
    <div class="glyphicon-location">
        <button type="button" class="btn btn-default" aria-label="Left Align" onclick="eraseTask()">
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
    </div>
</div>

    <div class="box-inner-container">
        <label for="task${index}" class="textOutput overflow-y-auto fw-medium">${task.textOutput}</label><br>
        <div class="TaskElseOutput">${task.elseOutput}</div>
    </div>
        `;
        // taskCheckIcon = document.createElement('div');
        // taskInnerDiv.appendChild(taskCheckIcon);
        // taskCheckIcon.className = 'tbn-icon-container';
        // taskCheckIcon.innerHTML = ` 
        // <div class="btn-container">
        // <button type="button" class="btn btn-default" aria-label="Left Align" onclick="eraseTask()">
        //     <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        // </button>
        // <div/>
        // <input type="checkbox" class="task-checkbox" id="task${index}" ${task.checked ? 'checked' : ''} onchange="updateTask(${index}, this.checked)">`


        mainNode.appendChild(taskDiv);
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


function eraseTask(event) {
    let note = event.target.parentNode.parentNode
    let checkBox = note.querySelector('input[type="checkbox"]');
    if (checkBox !== null) {
        checkBox.setAttribute('checked', true);
        let taskId = checkBox.id;
        let taskIdNum = taskId.match(/[0-9]+/);
        updateTask(taskIdNum[0], true)
        deleteCheckedTasks();
        initTasks();
    }
}


// Function to initialize tasks on page load
function initTasks() {
    let tasks = getTasksFromLocalStorage();
    renderTasks(tasks);
};

window.onload = initTasks;