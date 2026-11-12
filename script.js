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

function getDueDate(datestr) {
  if (!datestr) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDay = new Date(datestr);
  dueDay.setHours(0, 0, 0, 0);

  const daysUntilDue = Math.round((dueDay - today) / (1000 * 60 * 60 * 24));
  return daysUntilDue;
}

function showListHandler(arr) {
  listContainer.innerHTML = "";
  arr.forEach((todoTask) => {
    const task = document.createElement("li");
    task.classList.add("task");
    task.classList.toggle("done", todoTask.done);
    task.dataset.id = todoTask.id;
    const dueDate = getDueDate(todoTask.date);

    let dueStatus;
    if (dueDate === null || todoTask.done) {
      dueStatus = "";
    } else if (dueDate < 0) {
      dueStatus = "Overdue";
    } else if (dueDate === 0) {
      dueStatus = "Due Today";
    } else if (dueDate === 1) {
      dueStatus = `Due Tomorrow`;
    } else {
      dueStatus = `Due in ${dueDate} days`;
    }
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
        setTimeout(() => {
          const updatedTitle = task.querySelector(".editTitle").value;
          const updatedDate = task.querySelector(".editDate").value || null;
          if (!updatedTitle) return;

          todoTask.title = updatedTitle;
          todoTask.date = updatedDate;
          todoTask.dueTime = updatedDate
            ? new Date(updatedDate + "T00:00:00").getTime()
            : null;

          editingId = null;
          localStorage.setItem("todos", JSON.stringify(todoArr));
          updateList();
        }, 200);
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
               <p class="taskDateText">
                <span class="taskDate"></span>
                <span class="taskDue"></span>
               </p>         
            </div>
            <div class="taskActions">
              <button class="btn editBtn" ${todoTask.done ? "disabled" : ""}>Edit</button>
              <button class="btn deleteBtn">Delete</button>
            </div>`;
    const taskDue = task.querySelector(".taskDue");
    const taskDate = task.querySelector(".taskDate");
    task.querySelector(".taskTitle").textContent = todoTask.title;
    task.querySelector(".taskDate").textContent = formatDate(todoTask.date);
    task.querySelector(".taskDue").textContent = dueStatus;

    if (dueDate < 0) {
      taskDue.classList.add("overdue");
      taskDate.classList.add("overduedate");
    } else if (dueDate === 0) {
      taskDue.classList.add("duesoon");
    } else if (dueDate === 1) {
      taskDue.classList.add("duesoon");
    } else {
      dueStatus = `Due in ${dueDate} days`;
    }
    task.querySelector(".editBtn").addEventListener("click", () => {
      setTimeout(() => {
        editingId = todoTask.id;
        updateList();
      }, 100);
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
        editBtn.style.display = "";
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
const reqText = document.querySelector(".req");

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const id = Math.floor(Math.random() * 100000);
  const title = event.target.title.value;
  const date = event.target.date.value || null;
  const dueTime = date ? new Date(date + "T00:00:00").getTime() : null;

  if (!title) {
    reqText.hidden = false;
    setTimeout(() => {
      reqText.hidden = true;
    }, 3000);
    return;
  }
  const todoObj = {
    id,
    title,
    date,
    done: false,
    createdAt: Date.now(),
    dueTime,
  };

  todoArr.push(todoObj);

  localStorage.setItem("todos", JSON.stringify(todoArr));
  console.log(todoObj);

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
      taskCount.textContent = completedCount
        ? `${completedCount} completed`
        : "nothing completed yet";
      statusResult = task.done;
    } else if (statusFilter === "pending") {
      taskCount.textContent = pendingCount
        ? `${pendingCount} pending`
        : "all caught up";
      statusResult = !task.done;
    }
    return searchResult && statusResult;
  });

  if (sortByValue === "newest") {
    filteredArr.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortByValue === "oldest") {
    filteredArr.sort((a, b) => a.createdAt - b.createdAt);
  } else if (sortByValue === "soonest") {
    filteredArr.sort(
      (a, b) => (a.dueTime || 9999999999999) - (b.dueTime || 9999999999999),
    );
  } else if (sortByValue === "latest") {
    filteredArr.sort((a, b) => (b.dueTime || -1) - (a.dueTime || -1));
  } else if (sortByValue === "atoz") {
    filteredArr.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortByValue === "ztoa") {
    filteredArr.sort((a, b) => b.title.localeCompare(a.title));
  }

  showListHandler(filteredArr);
  updatedListDisplay();
  todoForm.style.height = filteredArr.length > 1 ? "auto" : "100%";
}

updateList();
console.log(todoArr);
