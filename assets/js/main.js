var BASE_URL = "https://plant-hub-api.herokuapp.com";
category_index = 0;
var json;
var categories = [
  "Summer",
  "Winter",
  "Spring",
  "Autumn",
  "Flowering",
  "Indoor",
];
var category = categories[0];

let imgObject = [
  "https://placeimg.com/450/450/any",
  "https://placeimg.com/450/450/animals",
  "https://placeimg.com/450/450/architecture",
  "https://placeimg.com/450/450/nature",
  "https://placeimg.com/450/450/people",
  "https://placeimg.com/450/450/tech",
  "https://picsum.photos/id/1/450/450",
  "https://picsum.photos/id/8/450/450",
  "https://picsum.photos/id/12/450/450",
  "https://picsum.photos/id/15/450/450",
  "https://picsum.photos/id/5/450/450",
];

let mainImg = 0;
let prevImg = imgObject.length - 1;
let nextImg = 1;

function loadGallery() {
  let mainView = document.getElementById("mainView");
  mainView.style.background = "url(" + imgObject[mainImg] + ")";
  document.getElementById('content').innerHTML = "Summer Plants"
  

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
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 37) {
    scrollLeft();
  } else if (e.keyCode === 39) {
    scrollRight();
  }
});

loadGallery();

function view_by_category() {
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_plants_by_category?category=" + category;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      json = JSON.parse(this.responseText);
      plants = json.AllPlants;
      console.log(json);
      // changeContent();
    }
    if (http.readyState == 4 && http.status == 500) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops Something went wrong...",
      });
    }
    if (http.readyState == 4 && http.status == 404) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops, There's no Product with that name...",
      });
    }
  };
  http.open("get", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}
view_by_category();