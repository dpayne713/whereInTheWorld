

const filterBTN = document.querySelector('.main__search-FILTER-DROPDOWN'); 
const filterLIST = document.querySelector('.main__search-FILTER-FORM-list'); 
const filterCONTAINER = document.querySelector('main__search-FILTER-CONTAINER');

filterBTN.addEventListener('click', (event)=> {
    filterLIST.classList.toggle('visible');
}); 

