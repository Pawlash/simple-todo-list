interface Task {
  id: number;
  title: string;
}

const tasks: Task[] = JSON.parse(localStorage.getItem("tasks")!) || [];

function addTask(title: string): void {
  const taskList = document.querySelector('.task-list') as HTMLUListElement;

  const li = document.createElement('li');
  li.textContent = title;

  const doneButton = document.createElement('button');
  doneButton.textContent = '✔️';
  doneButton.classList.add('done-button');

  doneButton.addEventListener('click', () => {
    taskList.removeChild(li);
  });

  li.appendChild(doneButton);
  taskList.appendChild(li);
}

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = () => {
  const taskList = document.querySelector(".task-list") as HTMLUListElement;
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;

    const doneButton = document.createElement('button');
    doneButton.textContent = '✔️';
    doneButton.classList.add('done-button');
    doneButton.addEventListener('click', () => {
      taskList.removeChild(li);
    });

    li.appendChild(doneButton);
    taskList.appendChild(li);
  });
};

document.querySelector(".task-set")?.addEventListener("click", () => {
  const input = document.getElementById("task-input") as HTMLInputElement;
  const title = input.value.trim();
  if (title) {
    addTask(title);
    input.value = "";
  }
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const input = document.getElementById("task-input") as HTMLInputElement;
    const title = input.value.trim();
    if (title) {
      addTask(title);
      input.value = "";
    }
  }
});

renderTasks();
