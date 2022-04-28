// troca de tema dark - light
const btnThemeSwitch = document.querySelector('#btn-theme');
const body = document.querySelector('body');
const bgImageTheme = document.querySelector('#bg-image');

const dark = [
  ['--light', 'hsl(0, 0%, 98%)'],
  ['--dark-bg', 'hsl(235, 21%, 11%)'],
  ['--dark-desaturated', 'hsl(235, 24%, 19%)'],
  [' --blue', 'hsl(234, 11%, 52%)'],
  ['--border-bottom', '1px solid rgba(255, 255, 255, 0.205)'],
  [{bgImage: "url('../images/bg-desktop-dark.jpg')" , theme:'dark'}]
]

const light = [
  ['--light', 'hsl(235, 21%, 11%)'],
  ['--dark-bg', 'hsl(236, 33%, 92%)'],
  ['--dark-desaturated', 'hsl(0, 0%, 98%)'],
  [' --blue', 'hsl(234, 11%, 52%)'],
  ['--border-bottom', '1px solid rgba(24, 23, 23, 0.205)'],
  [{bgImage: "url('../images/bg-desktop-light.jpg')", theme:'light'}]
]


btnThemeSwitch.addEventListener('click', ()=>{
  let currentTheme = localStorage.getItem('theme');

  if(currentTheme === null || currentTheme === undefined){
    swithTheme(light)
  }

  if(currentTheme == 'dark'){
    swithTheme(light)
  }

  if(currentTheme == 'light'){
    swithTheme(dark)
  }
})

window.addEventListener('load', ()=>{
  let currentTheme = localStorage.getItem('theme');
  if(currentTheme == ' dark'){
    swithTheme(dark)
  }

  if(currentTheme == 'light'){
    swithTheme(light)
  }
})


function swithTheme(theme){
  // altera os valores das variaveis CSS 
  theme.forEach((el)=>{
    body.style.setProperty(el[0], el[1])

    // altera a imagem de fundo e o icone de acordo com a troca de tema 
    if(typeof(el[0]) == "object") {
      bgImageTheme.style.setProperty('background-image', el[0].bgImage);
      
      if(el[0].theme == 'dark'){
        btnThemeSwitch.setAttribute('src', './images/icon-sun.svg')
        localStorage.setItem('theme', 'dark');

      }
      else{
        btnThemeSwitch.setAttribute('src', './images/icon-moon.svg')
        localStorage.setItem('theme', 'light');
      }
    }
  })

}
