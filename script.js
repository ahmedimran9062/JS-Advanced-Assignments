const themeBtn = document.querySelector(".themeBtn");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeBtn.textContent = "light mode";
} else {
  document.documentElement.removeAttribute("data-theme");
  themeBtn.textContent = "dark mode";
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    document.documentElement.removeAttribute("data-theme");
    themeBtn.textContent = "dark mode";
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    themeBtn.textContent = "light mode";
    localStorage.setItem("theme", "dark");
  }
}
themeBtn.addEventListener("click", toggleTheme);

function formatDate(datestr) {
  if (!datestr) return `-`;
  return new Date(datestr + "T00:00:00")
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

let todoArr = JSON.parse(localStorage.getItem("todos")) || [];
const todoForm = document.querySelector("#form");

const listContainer = document.querySelector(".list-container");
let editingId = null;
const taskCount = document.querySelector(".task-count");

function showListHandler(arr) {
  listContainer.innerHTML = "";
  arr.forEach((todoTask) => {
    const task = document.createElement("li");
    task.classList.add("task");
    task.classList.toggle("done", todoTask.done);
    task.dataset.id = todoTask.id;
    if (todoTask.id === editingId) {
      task.innerHTML = `
                  <div>
              <input type="checkbox" disabled/>
            </div>
            <div class="taskInfo">
              <input
                type="text"
                class="form-input editTitle"
                aria-label="Edit title"
              />
              <input
                type="date"
                class="form-input editDate"
                aria-label="Edit date"
              />
            </div>
            <div class="taskActions">
              <button class="btn saveBtn">save</button>
              <button class="btn cancelBtn">cancel</button>
            </div>
      `;
      task.querySelector(".editTitle").value = todoTask.title;
      task.querySelector(".editDate").value = todoTask.date || "";

      task.querySelector(".saveBtn").addEventListener("click", () => {
        const updatedTitle = task.querySelector(".editTitle").value;
        if (!updatedTitle) return;

        todoTask.title = updatedTitle;
        todoTask.date = task.querySelector(".editDate").value || null;

        editingId = null;
        localStorage.setItem("todos", JSON.stringify(todoArr));
        updateList();
      });
      task.querySelector(".cancelBtn").addEventListener("click", () => {
        editingId = null;
        updateList();
      });

      listContainer.append(task);
      return;
    }

    task.innerHTML = `<div>
              <input class="checkBox" type="checkbox" ${todoTask.done ? "checked" : ""}/>
            </div>
            <div class="taskInfo">
              <p class="taskTitle"></p>
              <p class="taskDate"></p>
            </div>
            <div class="taskActions">
              <button class="btn editBtn" ${todoTask.done ? "disabled" : ""}>Edit</button>
              <button class="btn deleteBtn">Delete</button>
            </div>`;

    task.querySelector(".taskTitle").textContent = todoTask.title;
    task.querySelector(".taskDate").textContent = formatDate(todoTask.date);

    task.querySelector(".editBtn").addEventListener("click", () => {
      editingId = todoTask.id;
      updateList();
    });

    const deleteBtn = task.querySelector(".deleteBtn");
    const editBtn = task.querySelector(".editBtn");
    deleteBtn.addEventListener("click", () => {
      if (deleteBtn.classList.contains("confirmBtn")) {
        todoArr = todoArr.filter((t) => t !== todoTask);
        localStorage.setItem("todos", JSON.stringify(todoArr));
        updateList();
        return;
      }
      deleteBtn.textContent = "confirm?";
      deleteBtn.classList.add("confirmBtn");
      editBtn.style.display = "none";

      setTimeout(() => {
        deleteBtn.textContent = "delete";
        deleteBtn.classList.remove("confirmBtn");
        editBtn.style.display = "inline";
      }, 3000);
    });

    task
      .querySelector(".checkBox")
      .addEventListener("change", function (event) {
        const taskId = Number(event.target.closest(".task").dataset.id);
        const foundTask = todoArr.find((task) => task.id === taskId);

        if (foundTask) {
          foundTask.done = event.target.checked;
        }
        localStorage.setItem("todos", JSON.stringify(todoArr));

        updateList();
      });

    listContainer.append(task);
  });
}

let statusFilter = "all";
const filterBtns = document.querySelectorAll(".filter-btns .btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    statusFilter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    updateList();
  });
});

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const id = Math.floor(Math.random() * 100000);
  const title = event.target.title.value;
  const date = event.target.date.value || null;

  const todoObj = {
    id,
    title,
    date,
    done: false,
    createdAt: Date.now(),
  };

  todoArr.push(todoObj);

  localStorage.setItem("todos", JSON.stringify(todoArr));

  updateList();
  event.target.reset();
});

const emptyListText = document.querySelector("#empty-text");
const wholeList = document.querySelector("#whole-list");

function updatedListDisplay() {
  if (todoArr.length) {
    emptyListText.style.display = "none";
    wholeList.classList.remove("hidden");
  } else {
    emptyListText.style.display = "grid";
    wholeList.classList.add("hidden");
  }
}

function updateList() {
  const completedCount = todoArr.filter((task) => task.done).length;
  const pendingCount = todoArr.filter((task) => !task.done).length;
  const searchValue = document
    .querySelector("#search")
    .value.toLowerCase()
    .trim();

  const sortByValue = document.querySelector("#sort").value;
  const filteredArr = todoArr.filter((task) => {
    const searchResult = task.title.toLowerCase().includes(searchValue);
    let statusResult = true;
    if (todoArr.length) {
      taskCount.textContent = `${pendingCount} PENDING · ${completedCount} COMPLETED`;
    }

    if (statusFilter === "completed") {
      completedCount
        ? (taskCount.textContent = `${completedCount} completed`)
        : (taskCount.textContent = "nothing completed yet");
      statusResult = task.done;
    } else if (statusFilter === "pending") {
      pendingCount
        ? (taskCount.textContent = `${pendingCount} pending`)
        : (taskCount.textContent = "all caught up");

      statusResult = !task.done;
    }
    return searchResult && statusResult;
  });

  if (sortByValue === "newest") {
    filteredArr.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortByValue === "oldest") {
    filteredArr.sort((a, b) => a.createdAt - b.createdAt);
  }

  showListHandler(filteredArr);
  updatedListDisplay();
}
updateList();
