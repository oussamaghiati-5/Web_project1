document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    var taskInput = document.getElementById("add");
    var tasksContainer = document.querySelector(".list-group.todos.mx-auto.text-light");
    var form = document.querySelector(".add");
    var searchInput = document.querySelector("[data-search]");

    // ✅ Function to get all task elements
    function getAllTasks() {
        return document.querySelectorAll(".list-group-item"); // Returns a NodeList
    }

    // ✅ Handle task submission (Add new task)
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form refresh

        let taskValue = taskInput.value.trim();
        if (taskValue === "") {
            alert("Add a task!");
            return;
        }

        // Create new task element
        let newTask = document.createElement("li");
        newTask.innerHTML = `
            <span>${taskValue}</span>
            <i class="far fa-trash-alt delete" style="cursor: pointer;"></i>
        `;
        newTask.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        // Append new task to the list
        tasksContainer.appendChild(newTask);

        // Clear input field
        taskInput.value = "";
    });

    // ✅ Handle task deletion (Event Delegation)
    tasksContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete")) {
            e.target.parentElement.remove(); // Remove the parent <li>
        }
    });

    // ✅ Handle search functionality (Filtering tasks)
    searchInput.addEventListener("input", (e) => {
        const value = e.target.value.toLowerCase().trim(); // Normalize search input
        console.log("Search Input:", value);

        let tasks = getAllTasks(); // Get all tasks
        console.log("All Tasks:", tasks);

        tasks.forEach(task => {
            let taskText = task.querySelector("span")?.textContent.toLowerCase().trim(); // Get text inside <span>
            console.log("Task Text:", taskText);

            const isVisible = taskText.includes(value);
            
            // ✅ Show the task if it matches, otherwise hide it
            task.classList.toggle("hide", !isVisible);

            console.log("Is Visible:", isVisible);
        });
    });
});
