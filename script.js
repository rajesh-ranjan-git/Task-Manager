let add_task = document.getElementById("add_task_btn");
let delete_task = document.getElementById("delete_task_btn");
let main = document.querySelector(".main");
let input_task = document.querySelector(".input_task");
let done = document.querySelector("#done");
let input_data = document.querySelector(".input_content>textarea");
let task_arr = [];

add_task.addEventListener("click", () => {
  add_task.setAttribute("class", "add_task_btn");
  show_input_task_box();
});

delete_task.addEventListener("click", () => {
  delete_task.setAttribute("class", "delete_task_btn");
});

let show_task_box = (textarea_data) => {
  let task = document.querySelector(".task");
  let task_data = document.querySelector("#task_data");
  task.style.display = "block";
  input_task.style.display = "none";
  task_data.innerHTML = textarea_data;
};

let show_input_task_box = () => {
  document.querySelector(".main h1").style.display = "none";
  input_task.style.display = "block";

  //   input_task.addEventListener("keypress", (event) => {
  //     if (event.key === "Enter") {
  //       console.log(input_task.value);
  //     }
  //   });

  done.addEventListener("click", () => {
    let textarea_data = input_data.value;
    task_arr.push(input_data.value);
    add_task.removeAttribute("class", "add_task_btn");
    show_task_box(textarea_data);
    console.log(task_arr);
  });
};
