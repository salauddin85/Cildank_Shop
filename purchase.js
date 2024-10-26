



// পণ্য বিস্তারিত তথ্য লোড করার ফাংশন
const PurchaseDetails = () => {
  const token = localStorage.getItem("authToken");
  console.log("inside token purchase", token);
  if (!token) {
    alert("Authentication token not found. Please log in.");

    window.location.href = "https://salauddin85.github.io/Cildank_Shop/login.html";
    return;
  }
  fetch("https://cildank-shop-deploy-versel.vercel.app/purchases/purchase_all/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const PurchaseDetails = document.getElementById("PurchaseDetails");
      PurchaseDetails.innerHTML = ""; // আগের ডেটা মুছে ফেলা

      // পণ্যগুলিকে একত্রিত করতে একটি অবজেক্ট ব্যবহার
      const aggregatedProducts = {};

      if (Array.isArray(data)) {
        data.forEach((product) => {
          const productId = product.product.id;
          const quantity = product.quantity || 1; // যদি পরিমাণ না দেওয়া থাকে, তবে 1 ধরবে
          const price = product.product.price;

          if (aggregatedProducts[productId]) {
            // যদি পণ্যটি আগেই তালিকায় থাকে, তবে পরিমাণ এবং মোট দাম আপডেট করবে
            aggregatedProducts[productId].quantity += quantity;
            aggregatedProducts[productId].totalPrice += price * quantity;
          } else {
            // যদি পণ্যটি তালিকায় না থাকে, তবে তা যুক্ত করবে
            aggregatedProducts[productId] = {
              ...product,
              quantity: quantity,
              totalPrice: price * quantity,
            };
          }
        });

        // একত্রিত ডেটা ব্যবহার করে প্রতিটি পণ্য একবার করে প্রদর্শন করবে
        Object.values(aggregatedProducts).forEach((product) => {
          console.log(product);
          const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.product.image}`;

          const newDiv = document.createElement("div");
          console.log(product.product.id);
          newDiv.className = "row mt-3";
          newDiv.innerHTML = `
            <div class="col-3">
              <a><img src="${imageUrl}" id="pur-list-img" class="img-fluid text-decoration-none rounded w-75 h-100" alt="${product.product.name}"></a>
            </div>
            <div class="col-2 fs-5 fw-bold text-black pur-list-sub">
              <b>${product.product.sub_category}</b>
            </div>
            <div class="col-3" id="list-details">
              <a href="./details.html" class="text-decoration-none fw-bold mb-3 text-black fs-5 ">${product.product.name}</a> <br>
              <b class="text-black fs-5 mt-5 fw-bold">Size:${product.product.size}</b> <br>
              <b class="text-black fs-5 fw-bold">Quantity: ${product.quantity}</b> <br>
              <b class="text-black fs-5 fw-bold">Total Price: $${product.totalPrice.toFixed(2)}</b> <br>
              <button type="button" onclick="PurchaseReview(${product.product.id})" class="viewProduct-btn mt-5 mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Review </button>

              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="w-100 mx-auto mt-5 review-box shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                      <form class="Review-form w-100 px-auto" id="Reviewforms" onsubmit="SubmitReview(event)">
                        
                        <div class="mb-3 ms-4">
                          <label for="body" class="form-label fs-5 text-black fw-bold">Body*</label>
                          <textarea class="form-control rounded-0 border-1 border-black text-black common-name" id="body" name="body" placeholder="body" required></textarea>
                        </div>
                        <div class="mb-3 ms-4">
                          <label for="image" class="form-label fs-5 text-black fw-bold text-center">Image*</label>
                          <input type="file" class="form-control rounded-0 border-1 border-black text-center text-black common-name" required id="image" name="image" accept="image/*">
                        </div>
                        <div class="mb-3 ms-4 text-black fw-bold">
                            <label for="rating" class="form-label">Rate*</label>
                            <select class="form-select rounded-0 border-1 border-black" id="rating" name="rating" required>
                              <option value="">Select a rating</option> <!-- Placeholder option -->
                              <option value="⭐">⭐</option>
                              <option value="⭐⭐">⭐⭐</option>
                              <option value="⭐⭐⭐">⭐⭐⭐</option>
                              <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                              <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" name="submitAction" value="send" id="submitReview" class="btn btn-primary">Send</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1">
              <b class="fs-5 fw-bold text-black">$${product.product.price}</b>
            </div>
          `;
          PurchaseDetails.appendChild(newDiv);
        });
      } else {
        console.error("error", data);
      }
    });
};

// পণ্য বিস্তারিত লোড করা হবে
PurchaseDetails();

let currentProductId = null; // গ্লোবাল ভ্যারিয়েবল

// Review Button Click Event
const PurchaseReview = (id) => {
  // event.preventDefault(); // ডিফল্ট আচরণ বন্ধ করা
  currentProductId = id; // প্রোডাক্ট আইডি সংরক্ষণ করা
  console.log("Captured product ID for review:", currentProductId);
};


// https://cildank-shop-deploy-versel.vercel.app/products/add_review/

// Review Submit Function

// Review Submit Function

const uploadPreset = 'image_upload_cildank'; // তোমার তৈরি করা upload preset এর নাম
const SubmitReview = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const imageInput = document.getElementById("image");
  const imageFile = imageInput.files[0]; // Get the selected file
  console.log(imageFile); // Check if the file is correct

  if (!imageFile) {
    alert("Please select an image file.");
    return;
  }

  // Upload image to Cloudinary
  const cloudinaryFormData = new FormData();
  cloudinaryFormData.append('file', imageFile); // Add file
  cloudinaryFormData.append('upload_preset', uploadPreset); // Add upload_preset

  try {
    const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dnzqmx8nw/image/upload`, {
      method: "POST",
      body: cloudinaryFormData,
    });

    const cloudinaryData = await cloudinaryResponse.json();

    if (cloudinaryResponse.ok) {
      // Get the image URL
      const imageUrl = cloudinaryData.secure_url;

      const formData = new FormData(document.getElementById("Reviewforms"));
      const data = {
        body: formData.get("body"),
        image: imageUrl,
        rating: formData.get("rating"),
      };

      const token = localStorage.getItem("authToken"); // Get token from localStorage

      const response = await fetch(`https://cildank-shop-deploy-versel-ba1b.vercel.app/products/add_review/${currentProductId}`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Review Added Successfully");
      } else {
        const errorData = await response.json(); // Parse the error response
        alert("Review failed: " + (errorData.error || response.statusText)); // Display error message
      }
    } else {
      alert("Image upload failed: " + cloudinaryData.error.message); // Show error if image upload fails
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred: " + error); // General error handling
  }
};






