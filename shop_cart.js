

const handleCart = (id) => {
  console.log("inside cart", id);
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  if (!token) {
      alert("No authentication token found. Please log in.");
      return;
  }

  fetch(`https://cildank-shop-deploy-versel.vercel.app/products/wishlist/add_product/${id}/${quantity_total}/`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      },
  })
  .then((res) => {
      // Check if the response is ok (status in the range 200-299)
      if (!res.ok) {
          return res.json().then((data) => {
              // Handle error responses from the backend
              alert(data.error || 'An error occurred.'); // Show error message from backend
              throw new Error(data.error || 'An error occurred.');
          });
      }
      return res.json();
  })
  .then((data) => {
      console.log("set data", data);
      alert("Added to cart successfully! Check your cart, please.");
  })
  .catch((error) => {
      console.error("Error:", error);
  });
};


// const removeCart= (id) => {
//   console.log("inside remove cart", id);
//   const token = localStorage.getItem("authToken");
//   console.log("token", token);
//   fetch(`https://cildank-shop-deploy-versel.vercel.app/products/wishlist/remove_product/${id}/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`,
//     },
//     // body: JSON.stringify(id),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("set data", data);

//       // window.location.href = "./";
//       // alert("Add to cart successfully Check Cart Please")
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };


const removeCart = (id,event) => {
  event.preventDefault();

  console.log("inside remove cart", id);
  const token = localStorage.getItem("authToken");
  console.log("token", token);

  fetch(`https://cildank-shop-deploy-versel.vercel.app/products/wishlist/remove_product/${id}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        // রেসপন্স সফল হলে DOM থেকে প্রোডাক্টটি সরান
        const productElement = document.getElementById(id);
        if (productElement) {
          productElement.remove(); // প্রোডাক্ট এলিমেন্ট সরানো
        }
      } else {
        console.error("Failed to remove product from cart");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Product removed:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};





let Total = 0;


// Global variable to store unique product IDs
let uniqueProductIds = [];
console.log("hello",uniqueProductIds)
// Function to load wishlist and capture unique product IDs
const loadWishlist = () => {
  const token = window.localStorage.getItem("authToken");
  console.log(token);
  
  // Temporary set to capture unique product IDs
  const productIdsSet = new Set();

  fetch("https://cildank-shop-deploy-versel.vercel.app/products/wishlist/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("set data", data);
      data.forEach((cartlist) => {
        cartlist.products.forEach((product) => {
          const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

          // Add product ID to the set to ensure uniqueness
          productIdsSet.add(product.id);

          const shopCart = document.getElementById("shopCart");
          const newDiv = document.createElement("div");
          newDiv.className = "row mt-3";
          newDiv.innerHTML = `
            <div class="col-12 d-flex mx-3 ">
                <div class="col">
                    <a href="./details.html"><img src="${imageUrl}"
                            class="img-fluid w-75 h-100 text-decoration-none rounded" alt="...">
                    </a>
                </div>
                <div class="col ms-4">
                    <a href="./details.html" class="text-decoration-none text-black">${product.name}</a>
                    <div>
                        <b>${product.size}</b>
                    </div>
                </div>
                <div class="col">
                    <a href="./details.html" class="text-decoration-none text-black">$ ${product.price}</a>
                </div>
                <div class="col">
                    <!-- remove cart icon -->
                    <a href=""> <i class="fa-regular fa-trash-can text-black fs-5" onclick="removeCart('${product.id}',event)"></i></a>
                </div>
            </div>
          `;
          Total += parseFloat(product.price);
          shopCart.appendChild(newDiv);
        });
      });

      // Convert set to array and store globally
      uniqueProductIds = Array.from(productIdsSet);
      console.log("Unique Product IDs:", uniqueProductIds);
     
      
      document.getElementById("taka").innerText = `${Total}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};


loadWishlist();
// Function to handle purchase

const handleCartPurchase = () => {
  const taka = document.getElementById("taka").textContent;
  const Taka = String(taka);
  console.log(Taka);

  const token = localStorage.getItem("authToken");
  console.log("Retrieved token:", token);
  console.log("all ids", uniqueProductIds);

  if (!token) {
    alert("No authentication token found. Please log in.");
    window.location.href="https://salauddin85.github.io/Cildank_Shop/login.html"
    return;
  }

  fetch("https://cildank-shop-deploy-versel.vercel.app/purchases/payment_cart/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify({ 
      total_amount: Taka, 
      product_ids: uniqueProductIds  
    }),  
  })
  .then(res => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 400) {
      return res.json().then(data => {
        // Show backend error message in alert
        alert(` ${data.error || 'Unknown error'}`);
        throw new Error(data.error || 'Unknown error');
      });
    } else {
      throw new Error('Unexpected status code: ' + res.status);
    }
  })
  .then(data => {
    console.log(data);
    alert("Purchase Successful. Check Your Mail or Purchases List.");
  })
  .catch(error => {
    console.error('Error:', error);
    alert(` ${error.message}`);
  });
};




// Load wishlist when the page loads