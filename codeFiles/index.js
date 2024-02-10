// let textOutput1 = "";
// let textOutput2 = "";
// let textOutput3 = "";
// let elseOutput1 = "";
// let elseOutput2 = "";
// let elseOutput3 = "";


// function saveForm() {
//     let detailsInput = document.getElementById("taskDetails").value;
//     let dateInput = document.getElementById("taskDate").value;
//     let timeInput = document.getElementById("taskTime").value;
//     let task1TextOutput = document.getElementById("1stTaskTextOutput");
//     let task2TextOutput = document.getElementById("2ndTaskTextOutput");
//     let task3TextOutput = document.getElementById("3rdTaskOutput");
//     let task1ElseOutput = document.getElementById("1stTaskElseOutput");
//     let task2ElseOutput = document.getElementById("2ndTaskElseOutput");
//     let task3ElseOutput = document.getElementById("3rdTaskElseOutput");


//     let formTextInput = ` task details : ${detailsInput}`;
//     let formElseInput = `task date is : ${dateInput} task time is : ${timeInput}`;

//     if (textOutput1 === "" && elseOutput1 === "") {
//         textOutput1 += formTextInput;
//         elseOutput1 += formElseInput;

//     } else if (textOutput2 === "" && elseOutput2 === "") {
//         textOutput2 += formTextInput;
//         elseOutput2 += formElseInput;
//     } else {
//         textOutput3 += formTextInput;
//         elseOutput3 += formElseInput;

//     }

//     console.log(formTextInput);
//     console.log(formElseInput);


//     task1TextOutput.innerHTML = textOutput1;
//     task2TextOutput.innerHTML = textOutput2;
//     task3TextOutput.innerHTML = textOutput3;

//     task1ElseOutput.innerHTML = elseOutput1;
//     task2ElseOutput.innerHTML = elseOutput2;
//     task3ElseOutput.innerHTML = elseOutput3;



// }

// function deleteCheckedTasks1() {
//     for (let i = 1; i <= 3; i++) {
//         let checkbox = document.getElementById(`task${i}Checkbox`);
//         if (checkbox.checked) {
//             document.getElementById(`${i}stTaskTextOutput`).innerHTML = '';
//             document.getElementById(`${i}stTaskElseOutput`).innerHTML = '';
//             checkbox.checked = false;
//         }
//     }
// }
