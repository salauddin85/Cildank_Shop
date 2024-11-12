const apiUrl = "https://cildank-shop-deploy-versel.vercel.app/products/product/";
const authToken = localStorage.getItem("authToken"); // Replace with actual token

let currentPage = 1; // Start from page 1
let totalPages = 1;  // Total pages, initially 1

// Fetch products from API
function fetchProducts(page = 1) {
    console.log(page, "page number");
    fetch(`${apiUrl}?page=${page}`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the response data to see its structure
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = ""; // Clear existing rows before appending new ones
        
        // Loop through the fetched products and display them in the table
        data.results.forEach(product => {
            const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

            // Create a new product row in the table
            const productRow = document.createElement('tr');
            productRow.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${imageUrl}" alt="${product.name}"></td>
                <td>${product.name}</td>
                <td>${product.sub_category_name}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>
                <td>${product.is_low_stock}</td>
                <td><button class="btn btn-primary">Edit</button><button class="btn btn-danger ms-2 mt-1">Delete</button></td>
            `;
            productContainer.appendChild(productRow);
        });

        // Update total pages based on the response (assuming it's part of the data)
        // totalPages = data.total_pages; // Ensure there's always a totalPages value
        totalPages = 2; // Ensure there's always a totalPages value
        console.log(totalPages,"totlapages")
        updatePaginationButtons();
    })
    .catch(error => {
        console.error("Error fetching products:", error);
    });
}

// Update pagination buttons based on current page
function updatePaginationButtons() {
    const previousBtn = document.getElementById('previous-btn');
    const nextBtn = document.getElementById('next-btn');

    // Enable or disable the Previous button based on currentPage
    previousBtn.disabled = currentPage === 1;

    // Enable or disable the Next button based on currentPage and totalPages
    nextBtn.disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('previous-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;  // Decrease currentPage
        fetchProducts(currentPage);  // Fetch new products
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;  // Increase currentPage
        fetchProducts(currentPage);  // Fetch new products
    }
});

// Initial fetch call
fetchProducts(currentPage);  // Fetch products for the first page
