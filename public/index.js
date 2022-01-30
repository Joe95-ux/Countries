const navigation = document.querySelector(".navigation");
const checkbox = document.getElementById("checkbox");
const countriesContainer = document.querySelector(".countries-container");
const filter = document.querySelector(".filter");
const filterDropdown = document.querySelector(".filter-dropdown");
const chevron = document.querySelector(".filter i");
const returnBtn = document.querySelector(".container-fluid form");
const singleCountry = document.getElementById("single-country");
const footer = document.querySelector("footer");
//toggle between light and dark modes

checkbox.addEventListener("change", (e) => {
  navigation.classList.toggle("dark-nav");
  if (countriesContainer !== null) {
    countriesContainer.classList.toggle("dark");
  }
  footer.classList.toggle("dark-footer");
  if(singleCountry !==null){
    singleCountry.classList.toggle('dark-theme');
  }
  
});

if (chevron !== null) {
  filter.addEventListener("click", function () {
    chevron.classList.toggle("chevron-active");
    filterDropdown.classList.toggle("toggle-dropdown");
  });
}

//go back to previous page

if (returnBtn !== null) {
  returnBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    history.back();
  });
}

//navigation scrolling event

window.addEventListener("scroll", function () {
  let windowPosition = window.scrollY > 0;
  navigation.classList.toggle("scroll-active", windowPosition);
});

//copyright
const currentYear = new Date().getFullYear();
const copyrightYear = document.querySelector(".copyright");
copyrightYear.innerHTML += currentYear;
