// Данные задач (пока храним в массиве)
let tasks = [
    { id: 1, text: "Написать код", column: "planned" }
]

// DOM-элементы
const taskForm = document.getElementById("taskForm")
const taskInput = document.getElementById("taskInput")
const columns = {
    planned: document.querySelector(".board__column:nth-child(1)"),
    progres: document.querySelector(".board__column:nth-child(2)"),
    done: document.querySelector(".board__column:nth-child(3)"),
}

// Добавление задачи
taskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const text = taskInput.value.trim()
    if(text) {
        const newTask = { id: Date.now(), text, column: "planned" }
        tasks.push(newTask)
        renderTask(newTask)
        taskInput.value = ""
    }
})

// Отображение задачи
function renderTask(task) {
    const taskElement = document.createElement("div")
    taskElement.className = "task"
    taskElement.setAttribute("draggable", "true")
    taskElement.dataset.id = task.id

    taskElement.innerHTML = `
    <p class="task__text">${task.text}</p>
    <button class="task__delete">X</button>
    `

    // Удаление задачи
    taskElement.querySelector(".task__delete").addEventListener('click', () => {
        tasks = tasks.filter(t => t.id !== task.id)
        taskElement.remove()
    })
    columns[task.column].appendChild(taskElement)
}

// Первоначальная отрисовка
tasks.forEach(task => renderTask(task))