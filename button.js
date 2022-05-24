const hamburgerBtn = document.getElementById("hamburderBtn");
const searchBtn = document.getElementById("searchBtn");
const sideSearchBtn = document.getElementById("sideSearchBtn");
const sideMenu = document.getElementById("mySidenav");
const closeBtn = document.getElementById("closeBtn");
const searchInput = document.getElementById("searchInput");
const goBtn = document.getElementById("GoBtn");
const sideSearchInput = document.getElementById("sideSearchInput");
const sideGoBtn = document.getElementById("sideGoBtn");

function showSideMenu() {
  sideMenu.classList.remove("hidden");
}

function hideSideMenu() {
  sideMenu.classList.add("hidden");
  sideSearchInput.classList.add("hidden");
  sideGoBtn.classList.add("hidden");
}

function showSearch() {
  searchInput.classList.toggle("hidden");
  goBtn.classList.toggle("hidden");
  searchInput.focus();
}

function showSideSearch() {
  sideSearchInput.classList.toggle("hidden");
  sideGoBtn.classList.toggle("hidden");
  sideSearchInput.focus();
}

hamburgerBtn.addEventListener("click", showSideMenu);
closeBtn.addEventListener("click", hideSideMenu);
searchBtn.addEventListener("click", showSearch);
sideSearchBtn.addEventListener("click", showSideSearch);

console.log(hamburgerBtn)