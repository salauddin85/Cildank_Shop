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



  // const loadCategories = () => {
  //   fetch("http://127.0.0.1:8000/categories/category_list/")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data); // Log the data to inspect its structure
  //         displayCategories(data);
  //       })
  //       .catch((err) => console.log(err));
  // };
  
  // const displayCategories = (categories) => {
  //   categories.forEach((category) => {
  //       const parent = document.getElementById("category-container");
  //       const li = document.createElement("li");
  //       li.className = "nav-item pe-3 fs-5";
  //       li.innerHTML = `
  //       <div class="dropdown">
  //             <a class="text-secondary link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" data-bs-toggle="dropdown" aria-expanded="false">
  //               <b style="text-decoration: none; cursor: pointer;">${category.name}</b>
  //             </a>
  //             <ul class="dropdown-menu">
  //               <li><a class="dropdown-item" href="#">categories</a></li>
  //             </ul>
  //         </div>
  //       `;
  //       parent.appendChild(li);
  //   });
  // };
  
  // loadCategories();
  



  const loadCategoriesAndSubcategories = () => {
    Promise.all([
      fetch("http://127.0.0.1:8000/categories/category_list/").then(res => res.json()),
      fetch("http://127.0.0.1:8000/categories/subcategory_list/").then(res => res.json())
    ])
    .then(([categories, subcategories]) => {
      console.log(categories, subcategories); // Inspect the data structure
      displayCategories(categories, subcategories);
    })
    .catch((err) => console.log(err));
  };
  
  const displayCategories = (categories, subcategories) => {
    const parent = document.getElementById("category-container");
  
    categories.forEach((category) => {
        const li = document.createElement("li");
        li.className = "nav-item pe-3 fs-5";
  
        // Filter subcategories for the current category using the 'category' field in subcategory data
        const filteredSubcategories = subcategories.filter(subcategory => subcategory.category === category.id);
  
        // Build the dropdown menu for subcategories
        const subcategoryItems = filteredSubcategories.map(subcategory => 
          `<li><a class="dropdown-item" href="#">${subcategory.name}</a></li>`
        ).join('');
  
        li.innerHTML = `
        <div class="dropdown">
          <a class="text-secondary link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" data-bs-toggle="dropdown" aria-expanded="false">
            <b style="text-decoration: none; cursor: pointer;">${category.name}</b>
          </a>
          <ul class="dropdown-menu">
            ${subcategoryItems}
          </ul>
        </div>
        `;
  
        parent.appendChild(li);
    });
  };
  
  // Initialize the loading process
  loadCategoriesAndSubcategories();
  