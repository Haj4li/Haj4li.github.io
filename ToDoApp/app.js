const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");

function addTask(event) {
  event.preventDefault();
  const taskText = newTaskInput.value;
  if (taskText) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="task-done">Done</button>
    `;
    taskList.appendChild(taskItem);
    newTaskInput.value = "";
  }
}

function removeTask(event) {
  if (event.target.classList.contains("task-done")) {
    const taskItem = event.target.closest("li");
    taskList.removeChild(taskItem);
  }
}

function saveTasks() {
  const taskItems = taskList.querySelectorAll("li");
  const taskData = [];
  taskItems.forEach((taskItem) => {
    const taskText = taskItem.querySelector(".task-text").textContent;
    taskData.push(taskText);
  });
  localStorage.setItem("taskList", JSON.stringify(taskData));
}

function loadTasks() {
  const taskData = JSON.parse(localStorage.getItem("taskList"));
  if (taskData) {
    taskData.forEach((taskText) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span class="task-text" style="">${taskText}</span>
        <button class="task-done">Done</button>
      `;
      taskList.appendChild(taskItem);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  const addTaskButton = document.getElementById("add-task");
  addTaskButton.addEventListener("click", addTask);
  taskList.addEventListener("click", removeTask);
  window.addEventListener("beforeunload", saveTasks);
});
