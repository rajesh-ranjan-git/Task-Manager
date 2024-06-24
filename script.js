let add_task = document.getElementById("add_task_btn");
let delete_task = document.getElementById("delete_task_btn");
let main = document.querySelector(".main");
let input_task = document.querySelector(".input_task");
let task_item_container = document.querySelector(".task_container");
let task = document.querySelector(".task");
let no_task = document.querySelector(".main h1");
let done = document.querySelector(".done");
let input_data = document.querySelector(".input_content>textarea");
let input_priority = document.querySelector(".input_priority");
let filtered_data = document.querySelector(".pri_selector");
let clear_selection = document.querySelector("#clear_selection");
let all_data = [];
let task_arr = [];
let task_obj = "";
let counter = 0;
let flag = false;

// Add Task button
add_task.addEventListener("click", () => {
  add_task.classList.add("add_task_btn");
  no_task.style.display = "none";
  input_task.style.display = "block";
  show_input_task_box();
});

//Show input task box function
let show_input_task_box = () => {
  let active_priority = activate_priority();

  input_task.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      done.click();
    }
  });

  done.addEventListener("click", () => {
    task_arr = localStorage.getItem("task_arr");

    if (task_arr == null || task_arr.length == 0) {
      task_arr = [];
    } else {
      task_arr = JSON.parse(task_arr);
    }

    if (input_data.value == "") {
      input_task.style.display = "none";
      add_task.classList.remove("add_task_btn");
      return;
    }

    task_obj = {
      priority: 0,
      text: input_data.value,
    };

    set_priority(active_priority, task_obj);

    task_arr.push(task_obj);

    localStorage.setItem("task_arr", JSON.stringify(task_arr));

    input_data.value = "";
    add_task.classList.remove("add_task_btn");
    input_task.style.display = "none";
    show_task_box();
    edit_task();
  });

  remove_priority_selection();
};

// Set priority for task
let activate_priority = () => {
  let set_active_priority = [false, false, false, false];

  for (let i = 0; i < set_active_priority.length; i++) {
    input_priority.children[i].addEventListener("click", () => {
      for (let j = 0; j < set_active_priority.length; j++) {
        if (i == j) {
          input_priority.children[j].classList.add("active");
          set_active_priority[j] = true;
        } else {
          input_priority.children[j].classList.remove("active");
          set_active_priority[j] = false;
        }
      }
    });
  }

  return set_active_priority;
};

// To remove the selected priority
let remove_priority_selection = () => {
  pri_1_input.classList.remove("active");
  pri_2_input.classList.remove("active");
  pri_3_input.classList.remove("active");
  pri_4_input.classList.remove("active");
};

//Set priority
let set_priority = (active_priority, task_obj) => {
  for (let i = 0; i < active_priority.length; i++) {
    if (active_priority[i]) {
      task_obj.priority = i + 1;
    }
  }
};

// Show task container
let show_task_box = () => {
  let task_arr = localStorage.getItem("task_arr");
  task_arr = JSON.parse(task_arr);

  if (task_arr == null || task_arr.length == 0) {
    no_task.style.display = "block";
    task_item_container.style.display = "none";
  } else {
    show(task_arr);
  }
};

// Show tasks
let show = (task_arr) => {
  task_item_container.style.display = "flex";
  let task_counter = 1;
  task_item_container.innerHTML = "";
  for (let i = 0; i < task_arr.length; i++) {
    let task_item = document.createElement("div");
    task_item.classList.add("task");
    task_item.setAttribute("id", task_counter);
    task_item.innerHTML = `<div class="task_header"></div>
        <p id="task_data">${task_arr[i].text}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M6 8V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6ZM19 10H5V20H19V10ZM11 15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 14.7403 13.5978 15.3866 13 15.7324V18H11V15.7324ZM8 8H16V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8Z"
          ></path>
        </svg>`;

    task_item_container.appendChild(task_item);

    set_header_color(task_arr, i);

    task_counter++;
  }
};

// Set Task Header Color
let set_header_color = (task_arr, i) => {
  if (task_arr[i].priority == 0) {
    task_item_container.children[i].firstChild.style.backgroundColor =
      "rgb(80, 80, 80)";
  } else if (task_arr[i].priority == 1) {
    task_item_container.children[i].firstChild.style.backgroundColor = "red";
  } else if (task_arr[i].priority == 2) {
    task_item_container.children[i].firstChild.style.backgroundColor = "yellow";
  } else if (task_arr[i].priority == 3) {
    task_item_container.children[i].firstChild.style.backgroundColor =
      "rgb(0, 0, 87)";
  } else {
    task_item_container.children[i].firstChild.style.backgroundColor = "green";
  }
};

// Edit task
let edit_task = () => {
  let task_arr = localStorage.getItem("task_arr");
  task_arr = JSON.parse(task_arr);

  if (task_arr == null || task_arr.length == 0) {
    return;
  }

  for (let i = 0; i < task_arr.length; i++) {
    let lock = task_item_container.children[i].children[2];
    let task_data = task_item_container.children[i].children[1];
    lock.addEventListener("click", () => {
      edit(lock, task_data, i);
    });
  }
};

//Edit function
let edit = (lock, task_data, i) => {
  lock.classList.add("edit_task");
  let prev_value = task_data.textContent;
  task_data.innerHTML = `<textarea class="task_textarea" placeholder="Update text here..." >${prev_value}</textarea>
  <button id"edit_button" style="display : none">Edit</button>`;

  document
    .querySelector(".task_textarea")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        task_data.children[1].click();
      }
    });

  task_data.children[1].addEventListener("click", () => {
    task_data.innerHTML = task_data.firstChild.value;
    lock.classList.remove("edit_task");

    let task_arr = localStorage.getItem("task_arr");
    task_arr = JSON.parse(task_arr);

    for (let j = 0; j < task_arr.length; j++) {
      if (i == j) {
        task_arr[i].text = task_data.innerHTML;
      }
    }

    localStorage.setItem("task_arr", JSON.stringify(task_arr));
  });
};

// Filter tasks
let filtered_tasks = () => {
  let set_priority_filter = [false, false, false, false, false];

  for (let i = 1; i < filtered_data.children.length; i++) {
    filtered_data.children[i].addEventListener("click", () => {
      for (let j = 1; j < filtered_data.children.length; j++) {
        if (i == j) {
          filtered_data.children[j].classList.add("active");
          set_priority_filter[j - 1] = true;
          show_filtered_data(set_priority_filter);
        } else {
          filtered_data.children[j].classList.remove("active");
          set_priority_filter[j - 1] = false;
        }
      }
      filtered_tasks();
    });
  }
};

// Show filtered tasks
let show_filtered_data = (set_priority_filter) => {
  let all_data = localStorage.getItem("task_arr");

  if (all_data != null || all_data.length != 0) {
    all_data = JSON.parse(all_data);
  } else {
    return;
  }

  for (let i = 0; i < set_priority_filter.length; i++) {
    if (set_priority_filter[i] == true) {
      all_data = priority_check(all_data, i);
    }
  }

  if (all_data.length != 0) {
    no_task.style.display = "none";
    show(all_data);
  } else {
    no_task.style.display = "block";
    task_item_container.style.display = "none";
  }
};

// Checking priority for filter
let priority_check = (all_data, i) => {
  let obj = [];
  for (let j = 0; j < all_data.length; j++) {
    if (all_data[j].priority == i) {
      obj.push(all_data[j]);
    }
  }
  return obj;
};

//Clear filter
clear_selection.addEventListener("click", () => {
  no_task.style.display = "none";
  for (let i = 1; i < filtered_data.children.length; i++) {
    filtered_data.children[i].classList.remove("active");
  }
  show_task_box();
  edit_task();
});

// Delete Task button
delete_task.addEventListener("click", () => {
  if (flag == false) {
    delete_task.classList.add("delete_task_btn");
    for (let i = 0; i < task_item_container.children.length; i++) {
      task_item_container.children[i].lastChild.style.display = "none";
    }
    delete_tasks();
    flag = true;
  } else {
    delete_task.classList.remove("delete_task_btn");
    for (let i = 0; i < task_item_container.children.length; i++) {
      task_item_container.children[i].lastChild.style.display = "block";
    }
    flag = false;
  }
});

// Delete task function
let delete_tasks = () => {
  for (let i = 0; i < task_item_container.children.length; i++) {
    task_item_container.children[i].addEventListener("dblclick", () => {
      del(task_item_container.children[i].children[1].innerText);
      delete_tasks();
    });
  }
};

// Delete function
let del = (task_content) => {
  let d_task_arr = localStorage.getItem("task_arr");
  d_task_arr = JSON.parse(d_task_arr);

  for (let i = 0; i < d_task_arr.length; i++) {
    if (d_task_arr[i].text == task_content) {
      d_task_arr.splice(i, 1);
      localStorage.setItem("task_arr", JSON.stringify(d_task_arr));
      show_task_box();
      edit_task();
      for (let i = 0; i < task_item_container.children.length; i++) {
        task_item_container.children[i].lastChild.style.display = "none";
      }
    }
  }
};

show_task_box();

edit_task();

filtered_tasks();
