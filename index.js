let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let editingIndex = null;

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDateInput = document.getElementById("dueDate");
    const dueDate = dueDateInput.value;

    const currentDateTimeSA = new Date(new Date().toLocaleString("en-US", { timeZone: "Africa/Johannesburg" }));

    if (title && description && dueDate) {
        // Check if the due date is in the past or the same as the current date
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

        if (editingIndex !== null) {
            // If editingIndex is not null, it means we are editing an existing task
            tasks[editingIndex] = task; // Update the existing task with the new values
            editingIndex = null; // Reset editingIndex after editing is done
        } else {
            tasks.push(task); 
        }

        updateTasks();
        clearInputs();
    } else {
        alert("Please fill in all fields.");
    }
}

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
      displayTasks(); // Display all tasks if no matching tasks found
  }
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Load tasks when the page loads
window.addEventListener('load', function() {
    displayTasks();
});

// Save tasks to local storage before the page unloads
window.addEventListener('beforeunload', function() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
});
