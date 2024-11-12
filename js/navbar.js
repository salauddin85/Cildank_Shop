function loadRegularNavbar() {
    fetch("navbar.html")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load navbar");
        }
        return res.text();
      })
      .then((data) => {
        document.getElementById("navbar").innerHTML = data;
        setupAuthLinks();
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
      });
  }
  
  function setupAuthLinks() {
    const navElement = document.getElementById("auth-element");
    const navbarItem = document.getElementById("navbarItem");
    const shopCart = document.getElementById("shopCart");
    const profile = document.getElementById("profile");
    const token = localStorage.getItem("authToken");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
  
    if (token && token !== "undefined") {
      navElement.innerHTML += `
        <li class="nav-item p-2" id="logout">
          <a
            type="button"
            class="btn btn-warning text-black fw-bold text-bold px-5"
            onclick="handleLogout()"
          >
            LOGOUT
          </a>
        </li>
      `;
      
    } 
    if (isAdmin) {
      shopCart.remove();
      profile.remove()
      navbarItem.innerHTML += `
        <li class="custom-navbar-nav-item ms-1">
          <a href="./profile.html" class="custom-nav-link text-decoration-none">Profile</a>
        </li>
        <li class="custom-navbar-nav-item ms-1">
          <a href="./admin.html" class="custom-nav-link text-decoration-none">Admin Dashboard</a>
        </li>
      `;
      
    }
    
    if(!token ||  token == "undefined") {
      navElement.innerHTML += `
        <li class="nav-item p-2" id="login">
          <a
            type="button"
            class="btn btn-dark text-bold px-5"
            href="./login.html"
          >
            LOGIN
          </a>
        </li>
        <li class="nav-item" id="registration-link">
          <a
            class="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            href="./registration.html"
          >
            Create My Account
          </a>
        </li>
      `;
    }
  }
  
  // Call the loadRegularNavbar function on page load
  loadRegularNavbar();