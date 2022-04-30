const form = document.forms.newTask;
let listHtml = document.querySelector('.list');
let taskCountEl  = document.querySelector('#task-count');

let tasksArray = []
let taskCount ;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { task } = form;
  
  //validações

  if(task.value == ''){
    toast('não é possivel criar uma tarefa em branco',"#d9534f");
    return;
  }

  if(task.value.length < 8){
    toast('a tarefa deve ter no minimo 8 caracteres',"#d9534f");
    return
  }

  let newTask = {
    id: tasksArray.length,
    title: task.value,
    completed: false
  }

  tasksArray.push(newTask);

  task.value = "";

  createCardTask(newTask);
  saveTaskInStorage(tasksArray)
  toast('tarefa adicionada', '#5cb85c');
})

function toast( msg, color ){
  Toastify({
    text: msg,
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
    },
    onClick: function(){} // Callback after click
  }).showToast();
}

function createCardTask(newTask){
  let taskHtml =`
  <div class="input tarefa tarefa-${newTask.id} ${newTask.completed? 'completed': ''}">
    <div class="round">
      <input class="checkbox" ${newTask.completed ? 'checked': ''} type="checkbox" onchange="(checkedTask(${newTask.id}))" id="checkbox-${newTask.id}">
      <label for="checkbox-${newTask.id}" class="checkmark"></label>
    </div>
    <span>${newTask.title}</span>
    <img onclick="deleteTask(${newTask.id})" class="delete" src="./images/icon-cross.svg" alt="" srcset="">
  </div>`
 
  listHtml.innerHTML += taskHtml;

  saveTaskInStorage(tasksArray)
  recoveryTaskInStorage();
}

function checkedTask(id){
  let taskCheck = tasksArray.find(el => el.id == id);
  taskCheck.completed = !taskCheck.completed;
  saveTaskInStorage(tasksArray)

  let check = document.getElementById(`checkbox-${id}`);
  check.setAttribute('checked', true);
  let taskCompleted = document.querySelector(`.tarefa-${id}`)
  taskCompleted.classList.toggle('completed');
  
}

function deleteTask(id){
  let newArray = tasksArray.filter(el => el.id != id);
  tasksArray = [...newArray];

  saveTaskInStorage(tasksArray);


  listHtml.innerHTML = "";
  tasksArray.map((el) => {
    createCardTask(el);
  });

  recoveryTaskInStorage();
}

function saveTaskInStorage(tasksArray){
  let strgParse = JSON.stringify(tasksArray);
  localStorage.setItem('tasks',strgParse)
}

function recoveryTaskInStorage(){
  let taskSaved = localStorage.getItem('tasks');
  let json = JSON.parse(taskSaved);

  if(json.length != 0){
    taskCount = json.length
  }
  else{
    taskCount = 0;
  }
  taskCountEl.innerText = `${taskCount} tarefa${taskCount == 0 || taskCount > 1 ? 's': ''}`;
  return json;
}

window.addEventListener('load', ()=>{
  let savedTasks = recoveryTaskInStorage();
  if(savedTasks){
    tasksArray = [... savedTasks];
    
    tasksArray.map((el) => {
      createCardTask(el)
      if(el.completed){
        let check =document.getElementById(`checkbox-${el.id}`)
        check.setAttribute('checked', true)
      }
    })
  }
})
