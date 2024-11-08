// Function to generate slug from category or subcategory name
const generateSlug = (name) => {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, ''); // Remove all non-alphanumeric characters except hyphens
}

// Event listener to update slug on category name input
document.getElementById('addcategoryName').addEventListener('input', (e) => {
    const categoryName = e.target.value;
    const slug = generateSlug(categoryName);
    document.getElementById('addCategorySlug').value = slug;
});

// Event listener to update slug on subcategory name input
document.getElementById('subCategoryName').addEventListener('input', (e) => {
    const subCategoryName = e.target.value;
    const slug = generateSlug(subCategoryName);
    document.getElementById('subCategorySlug').value = slug;
});

// Function to fetch categories and populate the category select dropdown in subcategory form
// ক্যাটাগরি ফেচ করার ফাংশন
const fetchCategories = () => {
  fetch("https://cildank-shop-deploy-versel.vercel.app/categories/category_list/")
    .then(response => response.json())
    .then(data => {
      const categorySelect = document.getElementById('categorySelect');
      categorySelect.innerHTML = '<option value="">Select Category</option>'; // সিলেক্ট ড্রপডাউন প্রথমে একটি ডিফল্ট অপশন থাকবে

      // ক্যাটাগরি ডেটা থেকে সব ক্যাটাগরি অপশন তৈরি
      data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching categories:", error));
};

// সাবক্যাটাগরি ফেচ করার ফাংশন
const fetchSubCategories = (categoryId) => {
  fetch(`https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/`)
    .then(response => response.json())
    .then(data => {
      const subCategorySelect = document.getElementById('subCategory');
      subCategorySelect.innerHTML = '<option value="">Select Subcategory</option>'; // ডিফল্ট অপশন তৈরি

      // সাবক্যাটাগরি ডেটা থেকে ক্যাটাগরি ID এর সাথে মিলিয়ে সাবক্যাটাগরি গুলো ফিল্টার করা
      data.filter(subCategory => subCategory.category == categoryId)
          .forEach(subCategory => {
        const option = document.createElement('option');
        option.value = subCategory.id;
        option.textContent = subCategory.name;
        subCategorySelect.appendChild(option);
      });
    })
    .catch(error => console.error("Error fetching subcategories:", error));
};

// ক্যাটাগরি সিলেক্ট হলে সাবক্যাটাগরি লোড করা হবে
document.getElementById('categorySelect').addEventListener('change', (e) => {
  const categoryId = e.target.value;
  if (categoryId) {
    fetchSubCategories(categoryId); // সাবক্যাটাগরি ফেচ করা
  } else {
    document.getElementById('subCategory').innerHTML = '<option value="">Select Subcategory</option>'; // যদি ক্যাটাগরি নির্বাচন না করা হয়
  }
});

// পেইজ লোড হওয়ার পর ক্যাটাগরি ফেচ করা
window.onload = fetchCategories;

// Function to handle Category form submission
const handleCategorySubmit = (event) => {
    event.preventDefault();

    const categoryForm = document.getElementById("addCategoryForm");
    const categoryData = new FormData(categoryForm);

    const data = {
        name: categoryData.get("name"),
        slug: categoryData.get("slug")
    };

    const token = localStorage.getItem("authToken");
    
    if (!token) {
        alert("You are not authenticated.");
        return;
    }

    fetch("https://cildank-shop-deploy-versel.vercel.app/categories/category_list/", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Category added successfully!");
    })
    .catch(error => console.error(error));
};

// Function to handle Subcategory form submission
const handleSubCategorySubmit = (event) => {
    event.preventDefault();

    const subCategoryForm = document.getElementById("subCategoryForm");
    const subCategoryData = new FormData(subCategoryForm);

    const data = {
        name: subCategoryData.get("subcategory_name"),
        slug: subCategoryData.get("slug"),
        category: subCategoryData.get("category")
    };

    const token = localStorage.getItem("authToken");

    if (!token) {
        alert("You are not authenticated.");
        return;
    }

    fetch("https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/", {
        method: "POST",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Subcategory added successfully!");
    })
    .catch(error => console.error(error));
};



// --------------------------------------------------
// ক্যাটাগরি লোড করার ফাংশন
// const loadCategories = () => {
//     fetch("http://127.0.0.1:8000/categories/category_list/")
//       .then(response => response.json())
//       .then(data => {
//         const categoryDropdown = document.getElementById('categoryDropdown');
//         categoryDropdown.innerHTML = '<option value="">Select Category</option>'; // সিলেক্ট ড্রপডাউন প্রথমে একটি ডিফল্ট অপশন থাকবে
  
//         // ক্যাটাগরি ডেটা থেকে সব ক্যাটাগরি অপশন তৈরি
//         data.forEach(category => {
//             console.log(category)
//           const option = document.createElement('option');
//           option.value = category.name; // value হিসেবে category ID সেট করা
//           option.textContent = category.name; // name হিসেবে category নাম দেখানো
//           categoryDropdown.appendChild(option);
//         });
//       })
//       .catch(error => console.error("Error fetching categories:", error));
//   };
// loadCategories()
  // সাবক্যাটাগরি লোড করার ফাংশন
  const loadSubCategories = () => {
    fetch("https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/")
      .then(response => response.json())
      .then(data => {
        const subcategoryDropdown = document.getElementById('subcategoryDropdown');
        subcategoryDropdown.innerHTML = '<option value="">Select Subcategory</option>'; // ডিফল্ট অপশন তৈরি
  
        // সব সাবক্যাটাগরি অপশন তৈরি
        data.forEach(subCategory => {
          const option = document.createElement('option');
          option.value = subCategory.id; // value হিসেবে subcategory ID সেট করা
          option.textContent = subCategory.name; // name হিসেবে subcategory নাম দেখানো
          subcategoryDropdown.appendChild(option);
        });
      })
      .catch(error => console.error("Error fetching subcategories:", error));
  };
  
  loadSubCategories()

// ------------------------------------------------



async function handleProductFormSubmit(event) {
            event.preventDefault(); // Prevent traditional form submission

            const form = document.getElementById("productAddForm");
            const formData = new FormData(form);

            // Get the image file from form data
            const imageFile = formData.get("image");
            const Color = formData.get('color').toUpperCase();

            // Upload image to Cloudinary and get the URL
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await uploadImageToCloudinary(imageFile);
                if (!imageUrl) {
                    console.error("Image upload failed.");
                    return;
                }
            }

            // Prepare product data for POST request
            const productData = {
                name: formData.get("productName"),
                sub_category: formData.get("subcategory"),
                image: imageUrl, 
                price: formData.get("price"),
                quantity: formData.get("quantitys"),
                description: formData.get("description"),
                size: formData.get("size"),
                color: Color,
                low_stock_threshold: formData.get("isLowStock"),
            };
            console.log(productData)
            // Send product data to the API
            try {
                const authToken = localStorage.getItem('authToken'); // Replace this with your actual token value
                const response = await fetch("https://cildank-shop-deploy-versel.vercel.app/products/product/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${authToken}` // Send token in Authorization header
                    },
                    body: JSON.stringify(productData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log("Product successfully added:", result);
                    alert("Product added successfully!");
                } else {
                    const errorData = await response.json();
                    console.error("Failed to add product:", errorData);
                    alert("Failed to add product. Check console for details.");
                }
            } catch (error) {
                console.error("Error submitting product data:", error);
            }
        }

        async function uploadImageToCloudinary(imageFile) {
            const uploadPreset = 'image_upload_cildank';
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append('file', imageFile);
            cloudinaryFormData.append('upload_preset', uploadPreset);

            try {
                const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dnzqmx8nw/image/upload`, {
                    method: "POST",
                    body: cloudinaryFormData,
                });

                const cloudinaryData = await cloudinaryResponse.json();
                if (cloudinaryResponse.ok) {
                    return cloudinaryData.secure_url; // Return the image URL
                } else {
                    console.error("Failed to upload image:", cloudinaryData.error.message);
                    return null;
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                return null;
            }
        }