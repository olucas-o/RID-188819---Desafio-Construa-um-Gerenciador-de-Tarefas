let tasks = [
  { id: 1, name: "Implementar tela de listagem de tarefas", label: "frontend", completed: false },
  { id: 2, name: "Criar endpoint para cadastro de tarefas", label: "backend", completed: false },
  { id: 3, name: "Implementar protótipo da listagem de tarefas", label: "ux", completed: true }
];

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    if (task.completed) taskDiv.classList.add("completed");

    const taskName = document.createElement("span");
    taskName.textContent = `${task.name} (${task.label})`;

    const taskAction = document.createElement("div");

    if (task.completed) {
      const check = document.createElement("span");
      check.textContent = "✔";
      check.classList.add("check");
      taskAction.appendChild(check);
    } else {
      const button = document.createElement("button");
      button.textContent = "Concluir";
      button.onclick = () => completeTask(task.id);
      taskAction.appendChild(button);
    }

    taskDiv.appendChild(taskName);
    taskDiv.appendChild(taskAction);
    taskList.appendChild(taskDiv);
  });

  updateCounter();
}

function completeTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = true;
    renderTasks();
  }
}

function updateCounter() {
  const counter = document.getElementById("task-counter");
  const completedTasks = tasks.filter(t => t.completed).length;
  counter.textContent = `${completedTasks} tarefa(s) concluída(s)`;
}

document.getElementById("task-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById("task-name");
  const labelInput = document.getElementById("task-label");

  const newTask = {
    id: Date.now(),
    name: nameInput.value,
    label: labelInput.value || "geral",
    completed: false
  };

  tasks.push(newTask);
  nameInput.value = "";
  labelInput.value = "";
  renderTasks();
});


renderTasks();
