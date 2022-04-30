// troca de tema dark - light
const btnThemeSwitch = document.querySelector('#btn-theme');
const html = document.querySelector('html');
const bgImageTheme = document.querySelector('#bg-image');

const themes = {
  light: {
    text: 'hsl(235, 21%, 11%)',
    borderColorItems: '1px solid rgba(24, 23, 23, 0.205)',
    backgroundCard: 'hsl(0, 0%, 98%)',
    background: 'hsl(236, 33%, 92%)',
    textSmall: 'hsl(234, 11%, 52%)',
    bgImage: "url('./images/bg-desktop-light.jpg')",
    iconTheme: './images/icon-moon.svg'
  },

  dark: {
    text: 'hsl(0, 0%, 98%)',
    borderColorItems: '1px solid rgba(255, 255, 255, 0.205)',
    backgroundCard: 'hsl(235, 24%, 19%)',
    background: 'hsl(235, 21%, 11%)',
    textSmall: 'hsl(234, 11%, 52%)',
    bgImage: "url('./images/bg-desktop-dark.jpg')",
    iconTheme: './images/icon-sun.svg'
  }
}

const themeSave = localStorage.getItem('theme');
if(themeSave){
  setTheme(themeSave);
}

if(!themeSave){
  setTheme('dark');
}

function setTheme(newTheme){
  const themeColors = themes[newTheme];

  Object.keys(themeColors).map(key=>{
    html.style.setProperty(`--${key}`,` ${themeColors[key]}`);
  })

  bgImageTheme.style.setProperty('background-image', `${themeColors.bgImage}`);
  btnThemeSwitch.setAttribute('src', themeColors.iconTheme);
  localStorage.setItem('theme', newTheme);
}


btnThemeSwitch.addEventListener('click',()=> {
  let themeSave = localStorage.getItem('theme');

  if(themeSave == 'light'){
    setTheme('dark');
    
  }

  if(themeSave == 'dark'){
    setTheme('light');
  }
})
