fetch("navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
    
const navElement = document.getElementById("auth-element");
// console.log("finding token")
const token = localStorage.getItem("authToken");
// console.log("find token",token)
if (token && token !== "undefined") {
//   console.log("inside if")
  navElement.innerHTML += `
           <li class="nav-item p-2">
              <a
                type="button"
                class="btn btn-info text-warning-emphasis  text-bold px-5" onclick="handleLogout()"
            
                >LOGOUT</a
              >
            </li>
    
    `;
}
else{
    // console.log("inside else")
    navElement.innerHTML +=`
            
            <li class="nav-item p-2">
              <a
                type="button"
                class="btn btn-dark text-bold px-5"
                href="./login.html"
                >LOGIN</a
              >
            </li>
            <li class="nav-item">
              <a
                class="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                href="./registration.html"
            
                >Create My Account</a
              >
            </li>
    
    
    `
}
  });




