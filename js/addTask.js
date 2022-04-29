const form = document.forms.newTask;
let listHtml = document.querySelector('.list');

let tasksArray = []

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { task } = form;
  

  let newTask = {
    id: tasksArray.length,
    title: task.value,
    completed: false
  }

  tasksArray.push(newTask);

  task.value = "";

  createCardTask(newTask);
  saveTaskInStorage(tasksArray)
})

function createCardTask(newTask){
  let taskHtml =`
  <div class="input tarefa tarefa-${newTask.id} ${newTask.completed? 'completed': ''}">
    <div class="round">
      <input class="checkbox" type="checkbox" onchange="(checkedTask(${newTask.id}))" id="checkbox-${newTask.id}">
      <label for="checkbox-${newTask.id}" class="checkmark"></label>
    </div>
    <span>${newTask.title}</span>
    <img onclick="deleteTask(${newTask.id})" class="delete" src="./images/icon-cross.svg" alt="" srcset="">
  </div>`
 
  listHtml.innerHTML += taskHtml;
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
}

function saveTaskInStorage(tasksArray){
  let strgParse = JSON.stringify(tasksArray);
  localStorage.setItem('tasks',strgParse)
}

function recoveryTaskInStorage(){
  let taskSaved = localStorage.getItem('tasks');
  let json = JSON.parse(taskSaved);

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
