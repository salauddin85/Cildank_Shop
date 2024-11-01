const loadNavbar = () => {
  fetch("navbar.html")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load navbar");
      }
      return res.text();
    })
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;

      const navElement = document.getElementById("auth-element");
      const token = localStorage.getItem("authToken");
      console.log(token);

      // লগইন এবং লগআউট লিঙ্কের জন্য শর্তাবলী
      if (token && token !== "undefined") {
        navElement.innerHTML += `
        <li class="custom-navbar-nav-item">
          <a href="./index.html" class="custom-nav-link text-decoration-none">Home</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./allproducts.html" class="custom-nav-link text-decoration-none">All Products</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./about.html" class="custom-nav-link text-decoration-none">About Us</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./contact.html" class="custom-nav-link text-decoration-none">Contact Us</a>
        </li>
          <li class="nav-item p-2" id="logout">
            <a
              type="button"
              class="btn btn-warning text-black fw-bold text-bold px-5"
              onclick="handleLogout()"
            >
              LOGOUT
            </a>
          </li>
          <li class="nav-item dropdown fs-5 ms-2" style="margin-top: -5px;">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-regular fa-user account-icon cart-account-icon"></i>
          </a>
          <ul class="dropdown-menu" id="profileDetails"></ul>
        </li>
        <li>
          <a href="./shop_cart.html" class="text-decoration-none">
            <i class="fa-solid fa-cart-shopping fs-5 p-2 position-relative cart-account-icon">
              <span id="total-quantity" class="position-absolute start-100 top-0 bg-light translate-middle p-2 badge rounded-circle text-black" style="font-size: 13px;">
                0
              </span>
            </i>
          </a>
        </li>
        `;
      } else {
        navElement.innerHTML += `
          <li class="custom-navbar-nav-item">
          <a href="./index.html" class="custom-nav-link text-decoration-none">Home</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./allproducts.html" class="custom-nav-link text-decoration-none">All Products</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./about.html" class="custom-nav-link text-decoration-none">About Us</a>
        </li>
        <li class="custom-navbar-nav-item">
          <a href="./contact.html" class="custom-nav-link text-decoration-none">Contact Us</a>
        </li>
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
          <li class="nav-item dropdown fs-5 ms-2" style="margin-top: -5px;">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-regular fa-user account-icon cart-account-icon"></i>
          </a>
          <ul class="dropdown-menu" id="profileDetails"></ul>
        </li>
        <li>
          <a href="./shop_cart.html" class="text-decoration-none">
            <i class="fa-solid fa-cart-shopping fs-5 p-2 position-relative cart-account-icon">
              <span id="total-quantity" class="position-absolute start-100 top-0 bg-light translate-middle p-2 badge rounded-circle text-black" style="font-size: 13px;">
                0
              </span>
            </i>
          </a>
        </li>
        `;
      }
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
};

// ফাংশনটি কল করুন
loadNavbar();


