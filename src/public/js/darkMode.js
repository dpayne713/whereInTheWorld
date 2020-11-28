const darkMode = document.querySelector('#darkMode'); 
const moon = document.querySelector('.header__darkMode-label'); 

const lightModeMoonHTML = `<i class="far fa-moon header__darkMode-i"></i><span class="header__darkMode-text">Dark Mode</span>`
const darkModeMoonHTML = `<i class="fas fa-moon header__darkMode-i"></i><span class="header__darkMode-text">Light Mode</span>`


//check for saved theme; 
const savedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
//If there is a saved theme set attributes to that theme and fill out moon HTML 
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)

    if (savedTheme === 'dark') {
        darkMode.checked = true; 
        moon.innerHTML = darkModeMoonHTML; 
    } else {
        moon.innerHTML = lightModeMoonHTML; 
    }
// if there is not set to light mode and save 
} else {
    moon.innerHTML = lightModeMoonHTML; 
    document.documentElement.setAttribute('data-theme', 'light'); 
    localStorage.setItem('theme', 'dark'); 
}



darkMode.addEventListener('change', (event)=> {

    if(event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark'); 
        localStorage.setItem('theme', 'dark');
        moon.innerHTML = darkModeMoonHTML;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        moon.innerHTML = lightModeMoonHTML;
    }
})