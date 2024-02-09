let output1 = "";
let output2 = "";
let output3 = "";


function saveForm() {
    let detailsInput = document.getElementById("taskDetails").value;
    let dateInput = document.getElementById("taskDate").value;
    let timeInput = document.getElementById("taskTime").value;
    let task1Output = document.getElementById("1stTaskOutput");
    let task2Output = document.getElementById("2ndtTaskOutput");
    let task3Output = document.getElementById("3rdTaskOutput");

    let formInput = `task date is : ${dateInput} task time is : ${timeInput} task details : ${detailsInput}`;
    if (output1 === "") {
        output1 += formInput;
    } else if (output2 === "") {
        output2 += formInput;
    } else {
        output3 += formInput;
    }
    
    console.log(formInput);

    task1Output.innerHTML = output1;
    task2Output.innerHTML = output2;
    task3Output.innerHTML = output3;

}

function eraseNote() {
    let note = document.getElementById("noteNum2");
    note.style.display = "none";
    localStorage.removeItem("imageDataKey");


}