let add_task = document.getElementById("add_task_btn");
let delete_task = document.getElementById("delete_task_btn");
let main = document.querySelector(".main");
let input_task = document.querySelector(".input_task");
let task_item_container = document.querySelector(".task_container");
let task = document.querySelector(".task");
let no_task = document.querySelector(".main h1");
let done = document.querySelector("#done");
let input_data = document.querySelector(".input_content>textarea");
let pri_1 = document.querySelector("#pri_1");
let pri_2 = document.querySelector("#pri_2");
let pri_3 = document.querySelector("#pri_3");
let pri_4 = document.querySelector("#pri_4");
let lock = document.querySelector(".task>svg");
let task_arr = [];
let task_obj = "";
let counter = 0;

add_task.addEventListener("click", () => {
  add_task.classList.add("add_task_btn");
  no_task.style.display = "none";
  show_input_task_box();
});

delete_task.addEventListener("click", () => {
  if (task_arr.length > 0) {
    delete_task.classList.add("delete_task_btn");
    for (let i = 0; i < task_arr.length; i++) {
      let delete_item = document.getElementById(i + 1);
      let temp = `#${i + 1} p`;
      console.log(temp);
      delete_item.addEventListener("dblclick", () => {
        let delete_item_content = document.querySelector(temp.toString());
        console.log(delete_item);
        console.log(task_arr);
      });
      break;
    }
  }
});

let show_task_box = () => {
  let task_arr = localStorage.getItem("task_arr");
  task_arr = JSON.parse(task_arr);

  if (task_arr == null || task_arr.length == 0) {
    no_task.style.display = "block";
    task_item_container.style.display = "none";
  } else {
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
      task_counter++;
    }
  }
};

let show_input_task_box = () => {
  //   input_task.addEventListener("keypress", (event) => {
  //     if (event.key === "Enter") {
  //       console.log(input_task.value);
  //     }
  //   });
  input_task.style.display = "block";
  done.addEventListener("click", () => {
    task_arr = localStorage.getItem("task_arr");

    if (task_arr == null) {
      task_arr = [];
    } else {
      task_arr = JSON.parse(task_arr);
    }

    if (input_data.value == "") return;

    task_obj = {
      priority: "",
      text: input_data.value,
    };

    task_arr.push(task_obj);

    localStorage.setItem("task_arr", JSON.stringify(task_arr));

    input_data.value = "";
    add_task.removeAttribute("class", "add_task_btn");
    input_task.style.display = "none";
    show_task_box();
  });
};

show_task_box();
