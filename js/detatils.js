
// let quantity_total = ""; 


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: decodeURIComponent(params.get("name")),
        price: decodeURIComponent(params.get("price")),
        quantity: decodeURIComponent(params.get("quantity")),
        sub_category: decodeURIComponent(params.get("sub_category")), // Directly use sub_category
        description: decodeURIComponent(params.get("description")),
        image: decodeURIComponent(params.get("image")),
        id: decodeURIComponent(params.get("id")),
        color: decodeURIComponent(params.get("color"))
        
    };
}

// Function to display product details on the details page

/*
<div>
    <button type="button" onclick="handlePurchase('${id}')" class="fs-5 purchase-btn w-100 p-3 px-5 rounded border-0 mb-2 text-light">Purchase</button>
</div>
*/


function displayProductDetails() {
    const { name, price, quantity, sub_category, description, image, id,color } =
        getQueryParams();
    if (
        !name ||
        !price ||
        !quantity ||
        !sub_category ||
        !description ||
        !image ||
        !id ||
        !color
    ) {
        console.error("Missing product details");
        return;
    }
    ReveiewProduct(id);
    const productDetails = document.getElementById("product-details");
    // console.log(reviewProductbody,reviewProductname,reviewProductimage)
    // console.log(id,reviewProductsid)
    if (parseInt(quantity, 10) <= 0) {
        alert("No more Product Available");
        return;
    }
    // console.log(product_quantity,"product quantity")
    productDetails.innerHTML = `
        <div class="row gap-5">
          
            <div class="col-lg-5">
                <div class="cards mt-5">
                    <img src="${image}" class="card-img-top" alt="${name}">
                </div> 
                  <div class="review-section " id="reviewDetails">

                  </div>
            </div> 

            <div class="col-12 col-lg-5">
                <div class="mt-3">
                    <small class="text-light opacity-50">Cildank</small>
                    <h2  class ="fw-bold ">${name}</h2>
                    <h4 class ="fw-bold mt-4">${sub_category}</h4>
                    <h5 class ="fw-bold ">Price:$${price}</h5>
                    <h5 class ="fw-bold text-uppercase mt-4">Color: ${color}</h5>
                    <p class="fw-bold opacity-75">Tax included</p>
                </div>

                <div class="d-flex mt-4 justify-content-evenly  gap-3" id="purchase-add-to-cart-button">
                    <div class="quantity-container">
                        <button class="quantity-btn" id="decrease" onclick="changeQuantity(-1)">−</button>
                        <input type="number" id="quantity" value="1" min="1">
                        <button class="quantity-btn" id="increase" onclick="changeQuantity(1)">+</button>
                    </div>
                    <div>
                        <button type="button" onclick="handleCart('${id}')" class="btn btn-outline-danger px-5 py-3 mb-2 text-bold align-items-center text-black fw-bold text-uppercase mb-5 border-2" style="width: 350px;">Add To Cart</button>
                    </div>
                </div>

                <div>
                    <p class="fw-bold">${description}</p>
                    <ul>
                        <li>Faded ${name}</li>
                        <li>Fit: Regular</li>
                        <li>Full cover graphic logo design hand printed</li>
                    </ul>
                    <p>Due to the nature of this custom product it is non-refundable and no discount codes will be valid.</p>
                </div>

               <div class="accordion " id="accordionExample" style="border: 2px solid gray; border-radius: 10px; background-color: #f8f9fa; padding: 10px;">
                    <!-- Shipping Section -->
                    <div class="accordion-item" style="border-bottom: 1px solid #ccc;">
                        <h2 class="accordion-header">
                            <button class="accordion-button bg-dark-subtle text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style="background-color: #5a5a5a; color: #fff; font-weight: bold;">
                                Shipping
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body" style="padding: 15px; color: #333;">
                                <p>Free UK Standard Up to 7 days Delivery on orders over  $50. $3.99 UK Standard Delivery (up to 7 days). $4.99 UK Next Day Delivery (please note this is not available on every product). Cut off for UK Next Day Delivery is 3:30pm. Check Delivery & Returns section for international courier info. We ship globally & country-specific info can be found in the deliveries section in the website footer. Delivery carriers are identified at checkout based on the country you are ordering from. We offer overseas delivery options ranging from Express 1-2 day through to Economy 3-7 working days.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Returns Section -->
                    <div class="accordion-item mt-2" style="border-bottom: 1px solid #ccc;">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed bg-dark-subtle text-black" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style="background-color: #5a5a5a; color: #fff; font-weight: bold;">
                                Returns
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body" style="padding: 15px; color: #333;">
                                <p>We offer pre-paid return Royal Mail labels on all UK orders. EU and US customers can also download DHL fully tracked returns labels via the website returns portal. We offer a lifetime returns policy. Please refer to full T&C's to ensure return quality standards are met. Refunds are offered on all full-price items. Anything purchased in our sale will be refunded via e-credit note.</p>
                            </div>
                        </div>
                    </div>
                </div>

            
            </div>
           
             
        </div>
        

        
           
  
    `;
}

document.addEventListener("DOMContentLoaded", displayProductDetails);

let quantity_total = "";  // Protome empty thakbe

document.addEventListener("DOMContentLoaded", () => {
    const quantityInput = document.getElementById("quantity");
    quantity_total = quantityInput.value; // Protome quantity_total ke set korchi
    handleQuantity(quantity_total)
    // Quantity barano ba komanor function
    window.changeQuantity = function(amount) {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity + amount >= 1) {  // Quantity 1 er kom jate na hoy
            quantityInput.value = currentQuantity + amount;
            quantity_total = quantityInput.value;  // Update global quantity_total
            handleQuantity(quantity_total)
            console.log("Updated quantity_total:", quantity_total); // Confirm update in console
        }
    }
});







const ReveiewProduct = (id) => {
    console.log("review product", id);

    fetch(`https://cildank-shop-deploy-versel.vercel.app/products/reviews_by_product/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            console.log("review by product", data);

            const reviewDetails = document.getElementById("reviewDetails");

            data.forEach((review) => {
                console.log(review,"review data")
                // const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${review.image}`;
                const correctedImageUrl = review.image.replace("image/upload/", "");


                const div = document.createElement("div");
                div.className = ""; // Bootstrap grid classes for responsive design

                div.innerHTML = `
                <div class="cards shadow mt-5" style="height:50%;width:70%;">
                    <img src="${correctedImageUrl}" class="card-img-top img-fluid w-75 h-50 ms-5 mt-2 rounded" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${review.name}</h5>
                        <h6 class="card-title">${review.rating}</h6>
                        <p class="card-text">${review.body}</p>
                        
                        <!-- Button trigger modal 
                        <button type="button" class="btn btn-primary rounded-0  mb-3" data-bs-toggle="modal" data-bs-target="#editModal-${review.id}">
                        Edit
                        </button>
                        -->
                        <button type="button" class="btn btn-danger rounded-0 ms-3 mb-3" onclick="handleReviewDelete(${review.id})">
                            Delete
                        </button>

                        <!-- Modal -->
                        <div class="modal fade " id="editModal-${review.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body h-50" style="margin-top:-10px;">
                            <form id="reviewEdit-${review.id}" onsubmit="handleReviewEdit(event, ${review.id})">
                                <div class="mb-3">
                                    <label for="body-${review.id}" class="form-label fs-5 text-black">Body*</label>
                                    <textarea class="form-control text-black" id="body-${review.id}" name="body" placeholder="body">${review.body}</textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="image-${review.id}" class="form-label fs-5 text-black">Image*</label>
                                    <input type="file" class="form-control text-black" id="image-${review.id}" name="image" accept="image/*">
                                    <img id="preview-${review.id}" src="${correctedImageUrl}" class="img-fluid mt-2 w-50 h-50" alt="review image" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fs-5 text-black">Rating*</label>
                                    <div>
                                        <div>
                                            <input type="radio" name="rating-${review.id}" id="rating-${review.id}-1" value="⭐" ${review.rating === "⭐" ? "checked" : ""}>
                                            <label for="rating-${review.id}-1">⭐</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="rating-${review.id}" id="rating-${review.id}-2" value="⭐⭐" ${review.rating === "⭐⭐" ? "checked" : ""}>
                                            <label for="rating-${review.id}-2">⭐⭐</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="rating-${review.id}" id="rating-${review.id}-3" value="⭐⭐⭐" ${review.rating === "⭐⭐⭐" ? "checked" : ""}>
                                            <label for="rating-${review.id}-3">⭐⭐⭐</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="rating-${review.id}" id="rating-${review.id}-4" value="⭐⭐⭐⭐" ${review.rating === "⭐⭐⭐⭐" ? "checked" : ""}>
                                            <label for="rating-${review.id}-4">⭐⭐⭐⭐</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="rating-${review.id}" id="rating-${review.id}-5" value="⭐⭐⭐⭐⭐" ${review.rating === "⭐⭐⭐⭐⭐" ? "checked" : ""}>
                                            <label for="rating-${review.id}-5">⭐⭐⭐⭐⭐</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary rounded-0" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-success rounded-0">Submit</button>
                                </div>
                            </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            `;
                reviewDetails.appendChild(div);
            });
        })
        .catch((error) => {
            console.error("Error fetching reviews:", error);
        });
};


// const handleReviewEdit = (event, reviewId) => {
//     event.preventDefault();
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//         alert("You are not authenticated user. Please log in.");
//         window.location.href = "https://salauddin85.github.io/Cildank_Shop/login.html";
//         return;
//     }
//     const form = document.getElementById(`reviewEdit-${reviewId}`);
//     const formData = new FormData(form);  // Using FormData to handle file uploads

//     // Extract updated values
//     const newBody = formData.get('body');
    
//     // Extract the selected rating
//     const ratingRadioButtons = form.querySelectorAll(`input[name="rating-${reviewId}"]:checked`);
//     const newRating = ratingRadioButtons.length ? ratingRadioButtons[0].value : '';

//     // Create a new FormData instance to include updated values
//     const updatedFormData = new FormData();
//     updatedFormData.append('body', newBody);
//     updatedFormData.append('rating', newRating);
    
//     // Append image file if a new file is selected
//     const imageInput = form.querySelector(`#image-${reviewId}`);
//     if (imageInput.files.length) {
//         updatedFormData.append('image', imageInput.files[0]);
//     }

//     // Check the number of changes
//     let changes = 0;
//     const originalBody = formData.get('body');
//     const originalImage = formData.get('image');
//     const originalRating = formData.get('rating');
    
//     if (originalBody !== newBody) changes++;
//     if (originalImage !== updatedFormData.get('image')) changes++;
//     if (originalRating !== newRating) changes++;

//     // Determine method based on number of changes
//     const method = changes >= 3 ? 'PUT' : 'PATCH';

//     const url = `https://cildank-shop-deploy-versel.vercel.app/products/review/${reviewId}/`;

//     fetch(url, {
//         method: method,
//         headers: {
//             Authorization: `Token ${token}`,
//             // 'Content-Type': 'application/json', // Not needed for FormData
//         },
//         body: updatedFormData,
//     })
//     .then(response => {
//         if (response.ok) {
//             alert("Review updated successfully!");
//             ReveiewProduct(reviewId);  // Refresh reviews
//         } else {
//             alert("Error updating review.");
//         }
//     })
//     .catch((error) => {
//         console.error("Error updating review:", error);
//     });
// };









const handleReviewDelete = (reviewId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        alert("You are not authenticated user. Please log in.");
        window.location.href = "./login.html";
        return;
    }
    const confirmed = confirm("Are you sure you want to remove review from Product?");
    
    if (!confirmed) {
      return; // Exit if the user clicks "Cancel"
    }

    fetch(`https://cildank-shop-deploy-versel.vercel.app/products/review/${reviewId}/`, {
        method: 'DELETE',
        headers: {
            Authorization: `Token ${token}`,
        },
    })
    .then(response => {
        if (response.ok) {
            alert("Review deleted successfully!");
            ReveiewProduct();  // Refresh reviews or redirect as needed
        } else {
            alert("Error deleting review.");
        }
    })
    .catch((error) => {
        console.error("Error deleting review:", error);
    });
};













const handlePurchase = (id) => {
    console.log("Purchase ID:", id);
    const token = localStorage.getItem("authToken");
    console.log("Retrieved token:", token);

   
    if (!token) {
        alert("No authentication token found. Please log in.");
        return;
    }
    

    
    // showAccount()
    fetch(`https://cildank-shop-deploy-versel.vercel.app/purchases/list/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
        },
        // body: JSON.stringify({ id: id }),  // Adjust body as needed
    })
        .then((res) => {
            if (!res.ok) {
                return res.json().then((data) => {
                    console.log("Error details:", data);  // Logs error details from the response
                    throw new Error(`${data.error}`);
                });
            }
            return res.json();
        })
        .then((data) => {
            console.log(data,"purchase data");
            // alert( data.error);
            // console.log(data)

            alert("Purchase Successful. Check Your Mail.");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message}`);
            // Optionally, log more details if available
            if (error.response) {
                error.response
                    .text()
                    .then((text) => console.error("Response body:", text));
            }
        });
};




