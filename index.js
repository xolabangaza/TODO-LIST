let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null;

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDateInput = document.getElementById("dueDate");
    const dueDate = dueDateInput.value;

    const currentDateTimeSA = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));

    if (title && description && dueDate) {
        
        if (dueDate < currentDateTimeSA.toISOString().split('T')[0]) {
            alert("Please select a due date starting from today or later.");
            return;
        }

        
        const currentTimeSA = currentDateTimeSA.toLocaleTimeString('en-ZA', { timeZone: 'Africa/Johannesburg' });
        const task = {
            title,
            description,
            dueDate,
            timestamp: currentTimeSA
        };

        if (editingIndex !== null) {
            
            tasks[editingIndex] = task; 
            editingIndex = null; 
        } else {
            tasks.push(task); 
        }

        updateTasks();
        setRemindersForTasks(); 
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
}

function setRemindersForTasks() {
    tasks.forEach(task => {
        const dueDate = new Date(task.dueDate);
        const timeUntilDue = dueDate - new Date(); 
        const reminderTime = 24 * 60 * 60 * 1000; 

        
        if (timeUntilDue > 0 && timeUntilDue <= reminderTime) {
            const reminderDelay = timeUntilDue - reminderTime; 
            setTimeout(() => {
                showReminder(task);
            }, reminderDelay);
        }
    });
}

function showReminder(task) {
    
    alert(`Reminder: Task "${task.title}" is due on ${task.dueDate}`);
}

// Function to show tasks due soon when reminder icon is clicked
function showDueTasks() {
    const now = new Date();
    const soonTasks = tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        const timeUntilDue = dueDate - now; // Time difference in milliseconds
        const reminderTime = 24 * 60 * 60 * 1000; // 1 day before due date (adjust as needed)
        return timeUntilDue > 0 && timeUntilDue <= reminderTime;
    });

    if (soonTasks.length > 0) {
        alert("Tasks due soon:\n" + soonTasks.map(task => `${task.title} - Due: ${task.dueDate}`).join("\n"));
    } else {
        alert("No tasks due soon.");
    }
}


const reminderIcon = document.getElementById("reminderIcon");
reminderIcon.addEventListener("click", showDueTasks);


function sortTask() {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    updateTasks();
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
    updateTasks();
}

function editTask(index) {
    const taskToEdit = tasks[index];
    document.getElementById("title").value = taskToEdit.title;
    document.getElementById("description").value = taskToEdit.description;
    document.getElementById("dueDate").value = taskToEdit.dueDate;
    editingIndex = index;
}


function displayTasks(taskArray = tasks) {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  taskArray.forEach((task, index) => {
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

function searchTasks() {
  const searchTerm = document.getElementById("searching").value.toLowerCase();
  const matchingTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(searchTerm) ||
      task.description.toLowerCase().includes(searchTerm) ||
      task.dueDate.toLowerCase().includes(searchTerm) ||
      task.timestamp.toLowerCase().includes(searchTerm)
  );

  if (matchingTasks.length > 0) {
      displayTasks(matchingTasks);
  } else {
      alert('No matching tasks found.');
      
      displayTasks(); 
  }
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


window.addEventListener('load', function() {
    displayTasks();
    setRemindersForTasks(); 
});


window.addEventListener('beforeunload', function() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
});


const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const logoutButton = document.getElementById("logoutButton");

console.log("Logged In User:", loggedInUser); 

// if (loggedInUser) {
//     logoutButton.style.display = "flex";
// } else {
//     logoutButton.style.display = "none";
// }


logoutButton.addEventListener("click", function() {
    alert('You logged out')
    console.log("Logout Button Clicked");

    
    localStorage.removeItem("loggedInUser");
    console.log("Logged Out"); 
     
    
    window.location.href = "./login.html"; 
});
