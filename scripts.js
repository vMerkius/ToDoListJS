let toDoList = [
  {
    taskName: "pierwsze zadanie",
    done: false,
  },
  {
    taskName: "drugie zadanie",
    done: false,
  },
];
const renderList = () => {
  let toDoContainer = document.querySelector("#list-container");
  toDoContainer.innerHTML = "";
  let newTask;
  toDoList.forEach((task) => {
    if (task.done === false) {
      newTask = `
      <div class="task">
        <p>${task.taskName}</p>
        <div class="task-buttons">
          <img class="img-done" src="./img/done.png"/>
          <img class="img-trash" src="./img/trash.png"/>
        </div>
      </div>
    `;
    } else {
      newTask = `
      <div class="task">
        <p class="done">${task.taskName}</p>
        <div class="task-buttons">
          <img class="img-done" src="./img/done.png"/>
          <img class="img-trash" src="./img/trash.png"/>
        </div>
      </div>
    `;
    }
    toDoContainer.innerHTML += newTask;
  });
};

// Adding new task
document.querySelector("#ad-button").addEventListener("click", () => {
  const newTask = document.querySelector("#task");
  const task = {
    taskName: newTask.value,
    done: false,
  };
  toDoList.push(task);
  renderList();
});
document.querySelector("#list-container").addEventListener("click", (event) => {
  if (event.target.className === "img-trash") {
    const all = [...document.querySelectorAll(".img-trash")];
    const id = all.indexOf(event.target);
    toDoList = toDoList.filter((el, index) => {
      return index !== id;
    });
    renderList();
  }
  if (event.target.className === "img-done") {
    const taskContainer = event.target.closest(".task");
    const taskDone = taskContainer.querySelector("p");
    taskDone.style.textDecoration = "line-through";

    // Changing task status
    const all = [...document.querySelectorAll(".img-done")];
    const id = all.indexOf(event.target);
    toDoList = toDoList.map((el, index) => {
      if (index === id)
        return {
          taskName: el.taskName,
          done: !el.done,
        };
      else return el;
    });
    renderList();
  }
});
renderList();
