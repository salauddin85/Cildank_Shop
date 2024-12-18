
let total_quantity=""
const handleQuantity =(quantity)=>{
  // handleCart(quantity)
  console.log(quantity)
  total_quantity=quantity
}

const handleCart = (id) => {
  console.log(quantity_total)
  console.log("inside cart", id);
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  if (!token) {
    //   alert("No authentication token found. Please log in.");
      return;
  }
  fetch(`https://cildank-shop-deploy-versel.vercel.app/products/wishlist/add_product/${id}/${total_quantity}/`, {
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
  const confirmed = confirm("Are you sure you want to remove product from cart?");
    
    if (!confirmed) {
      return; // Exit if the user clicks "Cancel"
    }
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
      alert("Remove product in Wishlist Successfully")
      console.log("Product removed:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};



let Total = 0;

let uniqueProductIds = [];
let TotalQuantity = 0; // Initialize TotalQuantity
// Function to load wishlist and capture unique product IDs
const loadWishlist = () => {
    const token = window.localStorage.getItem("authToken");
    if (!token) {
        // alert("You are not authenticated. Please log in.");
        window.location.href = "./login.html";
        return;
    }
    
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
        data.forEach((cartlist) => {
            cartlist.products.forEach((item) => {
                const product = item.product; // Access the product object
                const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;
                
                // Add product ID to the set to ensure uniqueness
                productIdsSet.add(product.id);

                const productQuantityPrice = product.price * item.quantity;

                const shopCart = document.getElementById("shopCarts");
                const newDiv = document.createElement("div");
                newDiv.className = "row mt-3";
                newDiv.innerHTML = `
                    <div class="col-12 d-flex mx-3">
                        <div class="col">
                            <a><img src="${imageUrl}" class="img-fluid w-75 h-100 text-decoration-none rounded cursor-text" alt="${product.name}"></a>
                        </div>
                        <div class="col ms-4">
                            <a class="text-decoration-none text-black">${product.name}</a>
                            <div><b>${product.size}</b></div>
                        </div>
                        <div class="col ms-5">
                            <a class="text-decoration-none text-black">$ ${product.price}</a>
                        </div>
                        <div class="col">
                            <a class="text-decoration-none text-black">$ ${item.quantity}</a>
                        </div>
                        <div class="col">
                            <a class="text-decoration-none text-black" id="product-quantity-price">Total $${productQuantityPrice}</a>
                        </div>
                        <div class="col">
                            <a href=""><i class="fa-regular fa-trash-can text-black fs-5" onclick="removeCart('${product.id}', event)"></i></a>
                        </div>
                    </div>
                `;

                Total += parseFloat(productQuantityPrice); // Calculate total price
                TotalQuantity += item.quantity; // Calculate total quantity
                shopCart.appendChild(newDiv);
            });
        });

        // Convert set to array and store globally
        uniqueProductIds = Array.from(productIdsSet);
        
        // Update the total quantity in the navbar
        document.getElementById("total-quantity").innerText = TotalQuantity;

        // Update total price in the cart
        document.getElementById("taka").innerText = `${Total}`;
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};

loadWishlist();



// Handle Cart for Purchase
const handleCartPurchase = (event) => {
  event.preventDefault();

  const recipientName = document.getElementById("recipientName").value;
  const addressLine1 = document.getElementById("addressLine1").value;
  const addressLine2 = document.getElementById("addressLine2").value;
  const city = document.getElementById("city").value;
  const postalCode = document.getElementById("postalCode").value;
  const country = document.getElementById("country").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const taka = document.getElementById("taka").textContent;
  const Taka = String(taka);
  const token = localStorage.getItem("authToken");

  if (!token) {
    //   alert("No authentication token found. Please log in.");
      window.location.href = "./login.html";
      return;
  }

  fetch("https://cildank-shop-deploy-versel.vercel.app/purchases/payment/initiate/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({
          amount: Taka,
          address: {
              recipient_name: recipientName,
              phoneNumber:phoneNumber,
              address_line_1: addressLine1,
              address_line_2: addressLine2,
              city: city,
              postal_code: postalCode,
              country: country
          },
          product_ids: uniqueProductIds
      }),
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      } else {
          return res.json().then(data => {
              alert(`Error: ${data.message || 'Unknown error'}`);
              throw new Error(data.message || 'Unknown error');
          });
      }
  })
  .then(data => {
      if (data.status === 'success') {
          window.location.href = data.redirect_url; // Payment Gateway e redirect
      } else {
          alert(`Payment initiation failed: ${data.message}`);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
  });
};



