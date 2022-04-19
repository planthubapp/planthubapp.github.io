var BASE_URL = "https://plant-hub-api.herokuapp.com";
let slideIndex = 1;
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
var category_description = [
  "There's nothing like a garden full of gorgeous flowers that can \
withstand the summer heat. From the captivating aromas to the arresting \
colors, this roundup of the best summer flowers is all you need to begin \
designing the perfect garden.Summer is the best season to enjoy plants - \
mother nature’s gift to us. The beautiful scenery and fragrant flowers \
bring a refreshing aura to any space. There is a variety of Indian \
summer flowers that bloom from which you can take your pick. In this \
app, we share the best Indian summer flowers that will keep you fresh \
from the scorching sun.",
  "Even though a chill is in the air in parts of the country, it doesn't \
mean the gardening season is completely over—that's right: There are \
plenty of plants and flowers that bloom in winter. Many perennials, \
annuals, and shrubs actually bloom in the coldest months of the year, \
sometimes when there's still snow on the ground in colder regions. \
In India, winter is the best time to grow many different species of \
beautiful blooming annuals. The seeds of winter flowering annuals are \
sown in October-November. Some seedlings almost hibernate during the \
cold months of December & January & start growing as soon as the spring\
sets in.",
  "Spring is all about the blossoms. The ground defrosts and an explosion\
of colours rises up out of torpid trees, bushes, and plants. Many spring\
flowers are short-lived, but they are so full of charm and fragrance that\
they add life to the garden! A spring tree can bring in a lot to a \
garden and that’s why every gardener loves to plant one. Spring is \
without a doubt the most energizing season to submerge oneself in \
the nursery. The agonizing climate of winter has started to lift, and \
the snow has begun to melt. Bulbs rise up from the ground like a rainbow\
that ascents and branches wake up with their green buds that signal a \
fresh start.",
  "Summer flowers like to show off, but autumn has its own brand of beauty.\
Many annuals, perennials, and shrubs bloom in the fall all the way until a\
hard freeze (even after that, there are some flowers that bloom in late winter!)\
Autumn is a beautiful season because each leaves looks like flower in this season. \
The Autumn season starts from September and ends in November. It is an ideal \
season to grow glamorous flowers in the garden",
  "Adding new flowers to your garden is sure to bring delight to the eye and \
sweet-smelling fragrance to passersby! Each bloom is to brighten days no \
matter where it's planted. Keep things fresh by mixing up what you plant \
each season, with pops of color from annuals and perennials, which come \
back year after year, plus spring-flowering bulbs, evergreens, and flowering \
shrubs. You can even add plants that bloom in winter to brighten the darkest \
days of the year! Having many types of blooms will give you more color to last \
and also create habitat and food for pollinators such as bees, hummingbirds, \
and butterflies.",
  "Even if your home is lacking in square footage, incorporating greenery \
is essential to bringing it to life. Indoor plants add more beauty to a \
space while also providing functional benefits, like promoting a positive \
mood, purifying the air, and making you feel connected to nature without \
having to step outside. So there is no reason to let a small space or lack \
of gardening experience stop you from utilizing your green thumb inside your home!",
];
var category_images = [
  "https://wallpaperaccess.com/full/6606130.jpg",
  "https://wallpaperaccess.com/full/549556.jpg",
  "https://wallpapercave.com/wp/wp5561559.jpg",
  "https://wallpaperaccess.com/full/1234763.jpg",
  "https://picstatio.com/large/127994/meadow-white-pink-flowers-plants.jpg",
  "https://media.allure.com/photos/5fdcf516563e46c7d11ee93f/master/pass/AllureBeginnerHouseplants.jpg",
];
var category = categories[0];

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
  change_category((category_index += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function change_category(n) {
  if (n == 6) {
    n = 0;
    category_index = 0;
  }
  if (n == -1) {
    n = 5;
    category_index = 5;
  }
  document.getElementById("category").innerText = categories[n];
  document.getElementById("category-description").innerText =
    category_description[n];
  document.getElementById("category-image").src = category_images[n];
  category = categories[n];
  view_by_category();
}

function changeContent() {
  for (var i = 0; i < json.AllPlants.length; i++) {
    if (i == 0) {
      document.getElementById("card-0").style.backgroundImage =
        "url(" + json.AllPlants[0].Plant_image["LxH"] + ")";
    } else if (i == 1) {
      document.getElementById("card-1").style.backgroundImage =
        "url(" + json.AllPlants[1].Plant_image["LxH"] + ")";
    } else {
      document.getElementById("card-" + i).style.backgroundImage =
        "url(" + json.AllPlants[i].Plant_image["2LxH"] + ")";
    }
    var p_name = json.AllPlants[i].Plant_name;
    var p_fact = json.AllPlants[i].Plant_facts[0];

    if(p_name.length>30){
      p_name = p_name.substring(0,30) + "..."
    }
    if(p_fact.length>125){
      p_fact= p_fact.substring(0,125) + "..."
    }
    document.getElementById("card-fact-" + i).innerText =
      p_fact

    document.getElementById("card-name-" + i).innerText = p_name
      
  }
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}


function view_by_category() {
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_plants_by_category?category=" + category;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      json = JSON.parse(this.responseText);
      plants = json.AllPlants;
      console.log(json);
      changeContent();
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
change_category(category_index);
