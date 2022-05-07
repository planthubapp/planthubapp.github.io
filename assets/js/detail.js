var BASE_URL = "https://plant-hub-api.herokuapp.com";
var Plant_id = localStorage.getItem('Plant_id');
var plant;
console.log(Plant_id);
function load_Plant(){
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_by_plant_id?id=" + Plant_id;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      json = JSON.parse(this.responseText);
      plant = json.Plant;
      console.log(json);
      displayPlant();
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
function displayPlant(){
    console.log(plant);
}
load_Plant();