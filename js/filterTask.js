let btnFilter = document.querySelectorAll('.filter');
let btnClear = document.querySelector('#clear');

let arrayActivesTasks = [];
let arrayAllTask = [];
let arrayCompletedTask = [];

btnFilter.forEach((el) => {
  el.addEventListener('click',() => changeFilter(el) );
})

btnClear.addEventListener('click', () => clearCompleteTasks())

function changeFilter(el){
  btnFilter.forEach((el) => {
    el.classList.remove('active');
  })
  el.classList.toggle('active');

  switch(el.id){
    case 'all':
      arrayAllTask = [...tasksArray];
      
      listHtml.innerHTML = '';

      arrayAllTask.forEach((el) => {
        createCardTask(el)
      })
    break;

    case 'active':
      arrayActivesTasks = tasksArray.filter((el) => !el.completed);
      listHtml.innerHTML = ''

      arrayActivesTasks.forEach((el) => {
        createCardTask(el);
      })
     
    break;

    case 'completed':
      arrayCompletedTask = tasksArray.filter((el) => el.completed);
      listHtml.innerHTML = '';

      arrayCompletedTask.forEach((el) => {
        createCardTask(el);
      })
    break;

  }
}

function clearCompleteTasks(){
  let arrayClear = tasksArray.filter((el) => !el.completed);
  tasksArray = arrayClear;

  listHtml.innerHTML = '';

  tasksArray.map((el) => {
    createCardTask(el);
  })

  saveTaskInStorage(tasksArray);
  recoveryTaskInStorage();
}