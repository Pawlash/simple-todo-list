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
    removeTaskFromStorage(title);
  });

  li.appendChild(doneButton);
  taskList.appendChild(li);
  saveTaskToStorage(title);
}

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const saveTaskToStorage = (title: string) => {
  const newTask: Task = {
    id: Date.now(),
    title: title
  };
  tasks.push(newTask);
  saveTasks();
};

const removeTaskFromStorage = (title: string) => {
  const index = tasks.findIndex(task => task.title === title);
  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks();
  }
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
      removeTaskFromStorage(task.title);
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
