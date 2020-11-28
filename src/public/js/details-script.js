
const back = document.querySelector('#back'); 


back.addEventListener('click', (event)=> {
    event.preventDefault(); 
    window.history.back()
});
