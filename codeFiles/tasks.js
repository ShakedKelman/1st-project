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
 detailsInput.value="";
 dateInput.value="";
 timeInput.value="";
 


}

// Function to render tasks on the page
function renderTasks(tasks) {
    // Clear previous task output
   let main_node = document.getElementById("mainTaskContainer")
   main_node.innerHTML = "";

    // Render each task
    tasks.forEach((task, index) => {
        // Create task div
        let taskDiv = document.createElement("div");
        taskDiv.className = "task box";
        let btn = document.createElement('button');
        btn.setAttribute('type', "button")
        btn.onclick = eraseTask; 
        btn.className="btn btn-default"
        btn.setAttribute('aria-label', "Left Align");
        btn.innerHTML = `<span class=" glyphicon glyphicon-remove" aria-hidden="true"></span>`
        taskDiv.appendChild(btn);
        taskInnerDiv = document.createElement('div');
        taskInnerDiv.className = 'box-inner-container';
        taskDiv.appendChild(taskInnerDiv);
        taskInnerDiv.innerHTML = `
            <input type="checkbox" id="task${index}" ${task.checked ? 'checked' : ''} onchange="updateTask(${index}, this.checked)">
            <label for="task${index}">${task.textOutput}</label><br>
            <div class="TaskElseOutput">${task.elseOutput}</div>
        `;
        main_node.appendChild(taskDiv);
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


function eraseTask(evnt) {
    let note = evnt.target.parentNode.parentNode
    let chkbx = note.querySelector('input[type="checkbox"]');
    if (chkbx !== null) {
        chkbx.setAttribute('checked', true);
        let taskId = chkbx.id;
        let taskIdNum = taskId.match(/[0-9]+/);
        updateTask(taskIdNum[0], true)
        deleteCheckedTasks();
        init_tasks();
    }
}


// Function to initialize tasks on page load
 function init_tasks() {
    let tasks = getTasksFromLocalStorage();
    renderTasks(tasks);
};

window.onload = init_tasks;