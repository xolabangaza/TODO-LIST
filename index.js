
let tasks = [];

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDateInput = document.getElementById("dueDate");
  const dueDate = dueDateInput.value;

  const currentDateTimeSA = new Date(new Date().toLocaleString("en-US", {timeZone: "Africa/Johannesburg"}));

  if (title && description && dueDate) {
      // I'm Check if the due date is in the past or the same as the current date
      if (dueDate < currentDateTimeSA.toISOString().split('T')[0]) {
          alert("Please select a due date starting from today or later.");
          return;
      }
       // Get current time in South Africa Standard Time
      const currentTimeSA = currentDateTimeSA.toLocaleTimeString('en-ZA', { timeZone: 'Africa/Johannesburg' }); 
      const task = { 
          title, 
          description, 
          dueDate,
          timestamp: currentTimeSA
      };
      tasks.push(task);
      displayTasks();
      clearInputs();
  } else {
      alert("Please fill in all fields.");
  }
}


function sortTask() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    displayTasks();
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3><strong>${task.title}</strong></h3>
      <p>${task.description}</p>
      <p><em>Due Date: ${task.dueDate}</em></p>
      <p><em>Timestamp: ${task.timestamp}</em></p>
      <i onclick="editTask(${index})" class="fa-solid fa-pen-to-square fa-lg"></i>
      <i onclick="deleteTask(${index})" class="fa-solid fa-trash fa-lg"></i>
    `;
    taskList.appendChild(li);
  });
}

function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function editTask(index) {
    const taskToEdit = tasks[index];
    document.getElementById("title").value = taskToEdit.title;
    document.getElementById("description").value = taskToEdit.description;
    document.getElementById("dueDate").value = taskToEdit.dueDate;
}


function searchTasks() {
  const searching = document.getElementById("searching").value.toLowerCase();
  for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].toLowerCase().includes(searching)) {
          console.log("I Found", tasks[i], "at index", i);
      }
      else{
        alert(tasks[i] + ' not found')
      }
  }
}

// // function searchTasks() {
// //   const searching = document.getElementById("searching").value.toLowerCase();
// //   for (let i = 0; i < tasks.length; i++ ) {
// //     if(tasks(i) === target)
// //     console.log("I Found" , target , "at index" , i)
// //    break;
// //   }

// //   for (let i = 0;  i < tasks.length; i++) {
// //     if (tasks[i] === target) {
// //        console.log("Found" , target, "at index", i);
// //        break;
// //     } else{
// //        console.log("Not Found");
// //     }
// //   }
    
// // }