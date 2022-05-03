const inputs = document.querySelectorAll(".input");
var BASE_URL = "https://plant-hub-api.herokuapp.com";

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

function register() {
  name = document.querySelector("#name").value;
  email = document.querySelector("#email").value;
  pass = document.querySelector("#pwd").value;
  confirm_pass = document.querySelector("#confirm_pwd").value;
  if (name && email && pass && confirm_pass) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(pass)) {
        if (pass != confirm_pass) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Those passwords didn’t match. Try again....",
          });
        }
        else{
          var http = new XMLHttpRequest();
          let doc = {
            email: email,
            pwd: pass,
            name: name,
          };
          var data = JSON.stringify(doc);
          var url = `${BASE_URL}/register`;
          http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
              Swal.fire({
								title: "Registration Successful",
								html: '"Please check your email to get OTP for account activation"',
								timer: 2000,
								timerProgressBar: true,
								didOpen: () => {
								Swal.showLoading()
								timerInterval = setInterval(() => {
								}, 100)
								},
								willClose: () => {
								clearInterval(timerInterval)
								}
							}).then((result) => {
								location.href="./index.html"
							});
            }
            if (http.readyState == 4 && http.status == 500) {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "That Email is already registered, Use any other Email for registeration",
              });
            }
          };
          http.open("post", url, true);
          http.setRequestHeader("Content-Type", "application/json");
          http.send(data);
        }
      } 
      else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Password must contain atleast 8 characters, atleast one numeric and atleast one symbol.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Invalid Email format....",
      });
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "All fields are required...",
    });
  }
}
