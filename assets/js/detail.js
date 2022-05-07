var BASE_URL = "https://plant-hub-api.herokuapp.com";
var Plant_id = localStorage.getItem("Plant_id");
var plant;
console.log(Plant_id);
function load_Plant() {
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_by_plant_id?id=" + Plant_id;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      json = JSON.parse(this.responseText);
      plant = json.Plant;
      console.log(json);
      displayData();
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
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops, There's no Plant with that Category...",
      });
    }
  };
  http.open("get", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}
// function displayPlant(){
//     console.log(plant);

// }
load_Plant();

function displayData() {
  document.getElementById("plant-name").innerText = plant.Plant_name;
  document.getElementById("plant-price").innerText = plant.Plant_price;
  document.getElementById("plant-seller").innerText = "Seller: " + plant.Seller;
  document.getElementById("plant-category").innerText =
    "Category: " + plant.Plant_category;
  document.getElementById("plant-image").src = plant.Plant_image["Lx2H"];
  document.getElementById("water-requirement").innerText =
    plant.Water_Requirement;
  document.getElementById("fragrance").innerText = plant.Fragrance;
  document.getElementById("sunlight").innerText = plant.Sunlight_Requirement;
  document.getElementById("pots").innerText = plant.With_Pots;
  document.getElementById("use").innerText = plant.Use;
  document.getElementById("size").innerText = plant.Size;
  document.getElementById("genus").innerText = plant.Genus;
  document.getElementById("plant-description").innerText =
    plant.Plant_description;
  displayFacts();
}
function displayFacts() {
  var ul = document.getElementById("facts");
  ul.innerHTML = "";

  for (let i = 0; i < plant.Plant_facts.length; i++) {
    var li = document.createElement("li");
    li.innerText = i+1+'. '+plant.Plant_facts[i];
    ul.appendChild(li);
  }
}
