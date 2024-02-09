let formInput="";
function saveForm(){
 let detailsInput= document.getElementById("taskDetails").value;
 let dateInput= document.getElementById("taskDate").value;
 let timeInput= document.getElementById("taskTime").value;

formInput += `task date is : ${dateInput} task time is : ${timeInput} task details : ${detailsInput}`;
    console.log(formInput);
}

function eraseNote() {
    let note = document.getElementById("noteNum2");
    note.style.display = "none";
localStorage.removeItem("imageDataKey");


}