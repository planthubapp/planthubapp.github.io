var BASE_URL = "https://plant-hub-api.herokuapp.com";
category_index = 0;
var plants;
var categories = [
  "Summer",
  "Winter",
  "Spring",
  "Autumn",
  "Flowering",
  "Indoor",
];
var imgObject = [
  "https://wallpaperaccess.com/full/6606130.jpg",
  "https://wallpaperaccess.com/full/549556.jpg",
  "https://wallpapercave.com/wp/wp5561559.jpg",
  "https://wallpaperaccess.com/full/1234763.jpg",
  "https://picstatio.com/large/127994/meadow-white-pink-flowers-plants.jpg",
  "https://media.allure.com/photos/5fdcf516563e46c7d11ee93f/master/pass/AllureBeginnerHouseplants.jpg",
];
var category = categories[0];


var mainImg = 0;
let prevImg = imgObject.length - 1;
let nextImg = 1;

function loadGallery() {
  let mainView = document.getElementById("mainView");
  mainView.style.background = "url(" + imgObject[mainImg] + ")";
  document.getElementById("content").innerHTML = `${category} Plants`;

  let leftView = document.getElementById("leftView");
  leftView.style.background = "url(" + imgObject[prevImg] + ")";

  let rightView = document.getElementById("rightView");
  rightView.style.background = "url(" + imgObject[nextImg] + ")";

  let linkTag = document.getElementById("linkTag");
  linkTag.href = imgObject[mainImg];
}

function scrollRight() {
  prevImg = mainImg;
  mainImg = nextImg;
  if (mainImg == 6) {
    mainImg = 0;
  }
  category = categories[mainImg];
  view_by_category();

  if (nextImg >= imgObject.length - 1) {
    nextImg = 0;
  } else {
    nextImg++;
  }
  loadGallery();
}

function scrollLeft() {
  nextImg = mainImg;
  mainImg = prevImg;
  if (mainImg == -1) {
    mainImg = 5;
  }
  category = categories[mainImg];
  view_by_category();

  if (prevImg === 0) {
    prevImg = imgObject.length - 1;
  } else {
    prevImg--;
  }
  loadGallery();
}

document.getElementById("navRight").addEventListener("click", scrollRight);
document.getElementById("navLeft").addEventListener("click", scrollLeft);
document.getElementById("rightView").addEventListener("click", scrollRight);
document.getElementById("leftView").addEventListener("click", scrollLeft);

loadGallery();

function view_by_category() {
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_plants_by_category?category=" + category;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      json = JSON.parse(this.responseText);
      plants = json.AllPlants;
      console.log(json);
    }
    if (http.readyState == 4 && http.status == 500) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops Something went wrong...",
      });
    }
    if (http.readyState == 4 && http.status == 404) {
      json = JSON.parse(this.responseText);
      plants = json.AllPlants;
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops, There's no Plant with that Category...",
      });
    }
    
    addCard();
  };
  http.open("get", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}
view_by_category();

function addCard() {
  var div = document.querySelector("#inner-card-container");
  div.innerHTML = "";

  if (plants != null) {
    for (let i = 0; i < json.AllPlants.length; i++) {
      var card = document.createElement("div");
      card.className = "card";
      var cardImage = document.createElement("div");
      cardImage.className = "card-image";
      cardImage.style.backgroundImage =
        "url(" + plants[i].Plant_image["Lx2H"] + ")";
      card.appendChild(cardImage);
      var cardText = document.createElement("div");
      cardText.className = "card-text";
      var plant_name = plants[i].Plant_name;
      if (plant_name.length > 20) {
        plant_name = plant_name.substring(0, 20) + "...";
      }
      cardText.innerText = plant_name;
      cardImage.appendChild(cardText);
      div.appendChild(card);
    }
  }
  else{
    div.innerHTML = "No Plants Found";
    div.style.justifyContent = "center";
  }
}
