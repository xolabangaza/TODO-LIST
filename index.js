let tasks = [];

function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;

  if (title && description && dueDate) {
    const task = { title, description, dueDate };
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
      <strong>${task.title}</strong>
      <p>${task.description}</p>
      <p><em>Due Date: ${task.dueDate}</em></p>
      <i onclick="editTask(${task.id})" class="fa-solid fa-pen-to-square fa-lg"></i>
      <i onclick="deleteTask(${task.id})" class="fa-solid fa-trash fa-lg"></i>
    `;
    taskList.appendChild(li);
  });
}

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function editTask(id) {
  const taskToEdit = tasks.find(task => task.id === id);
  document.getElementById("title").value = taskToEdit.title;
  document.getElementById("description").value = taskToEdit.description;
  document.getElementById("dueDate").value = taskToEdit.dueDate;
  deleteTask(id);
}
