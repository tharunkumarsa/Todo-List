const apiUrl = "http://localhost:5000/tasks";

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        
        const taskText = document.createElement("span");
        taskText.textContent = task.name;

        const buttonContainer = document.createElement("div");

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleComplete(task._id, task.completed);

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(task._id, task.name);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteTask(task._id);

        buttonContainer.append(completeBtn, editBtn, deleteBtn);
        li.append(taskText, buttonContainer);
        taskList.appendChild(li);
    });
}

async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskName = taskInput.value.trim();
    if (!taskName) return alert("Please enter a task");

    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName })
    });

    taskInput.value = "";
    fetchTasks();
}

async function editTask(id, oldName) {
    const newName = prompt("Edit task:", oldName);
    if (!newName) return;

    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
    });

    fetchTasks(); // Refresh UI
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
}

async function toggleComplete(id, completed) {
    await fetch(`${apiUrl}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed })
    });

    fetchTasks();
}

document.addEventListener("DOMContentLoaded", fetchTasks);
