"use strict";
var _a;
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask(title) {
    const taskList = document.querySelector('.task-list');
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
    const taskList = document.querySelector(".task-list");
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
(_a = document.querySelector(".task-set")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const input = document.getElementById("task-input");
    const title = input.value.trim();
    if (title) {
        addTask(title);
        input.value = "";
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = document.getElementById("task-input");
        const title = input.value.trim();
        if (title) {
            addTask(title);
            input.value = "";
        }
    }
});
renderTasks();
//# sourceMappingURL=index.js.map