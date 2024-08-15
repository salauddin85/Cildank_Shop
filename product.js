





// // main code 

// const totalProduct = document.getElementById("totalProduct");
// const products = document.getElementById("products");
// const loadMoreButton = document.getElementById("load-more-button");
// const previousButton = document.getElementById("previous-button");

// const sortLowToHigh = document.getElementById("sortLowToHigh");
// const sortHighToLow = document.getElementById("sortHighToLow");

// let currentPage = 1;
// let previousPage = null;
// let sortOrder = ''; // This will store 'asc' or 'desc' based on user selection

// function loadProducts(page, sort = '') {
//     let url;
    
//     if (sort) {
//         url = `http://127.0.0.1:8000/products/product/sorted_by_price/?order=${sort}&page=${page}`;
//     } else {
//         url = `http://127.0.0.1:8000/products/product/?page=${page}`;
//     }

//     fetch(url)
//         .then(res => res.json())
//         .then(data => {
//             console.log('API Response:', data);
//             products.innerHTML = '';

//             if (data.count !== undefined) {
//                 totalProduct.textContent = `${data.count} Results`;
//             }

//             if (Array.isArray(data.results)) {
//                 data.results.forEach(product => {
//                     const productCol = document.createElement("div");
//                     productCol.className = "col";

//                     productCol.innerHTML = `
//                         <div class="card">
//                             <a href="./details.html"><img src="${product.image}" class="card-img-top" alt="${product.name}"></a>
//                         </div>
//                         <div>
//                             <div class="card-body mt-2 mb-3">
//                                 <a href="./details.html" class="card-title text-decoration-none ">${product.name}</a>
//                                 <p></p>
//                                 <a href="./details.html" class="card-text text-decoration-none text-black">Price: $${product.price}</a>
//                             </div>
//                         </div>
//                     `;
//                     products.appendChild(productCol);
//                 });
//             } else {
//                 console.error('Expected data.results to be an array, but got:', data.results);
//             }

//             // Update button visibility
//             if (data.next) {
//                 loadMoreButton.style.display = 'block';
//                 previousButton.style.display = 'none';
//             } else {
//                 loadMoreButton.style.display = 'none';
//                 previousButton.style.display = 'block';
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
// }

// // Initial load of products
// loadProducts(currentPage);

// // Event listeners for sorting
// sortLowToHigh.addEventListener('click', () => {
//     sortOrder = 'asc';
//     currentPage = 1; // Reset to the first page
//     loadProducts(currentPage, sortOrder);
// });

// sortHighToLow.addEventListener('click', () => {
//     sortOrder = 'desc';
//     currentPage = 1; // Reset to the first page
//     loadProducts(currentPage, sortOrder);
// });

// // Load more products on button click
// loadMoreButton.addEventListener('click', () => {
//     previousPage = currentPage;
//     currentPage++;
//     loadProducts(currentPage, sortOrder);
// });

// // Load previous products on button click
// previousButton.addEventListener('click', () => {
//     if (previousPage) {
//         currentPage = previousPage;
//         previousPage = null; // Clear previous page tracker
//         loadProducts(currentPage, sortOrder);
//     }
// });











// main code


const detailsProduct = document.getElementById("detailsProduct");
const totalProduct = document.getElementById("totalProduct");
const products = document.getElementById("products");
const loadMoreButton = document.getElementById("load-more-button");
const previousButton = document.getElementById("previous-button");

const sortLowToHigh = document.getElementById("sortLowToHigh");
const sortHighToLow = document.getElementById("sortHighToLow");

let currentPage = 1;
let previousPage = null;
let sortOrder = ''; // This will store 'asc' or 'desc' based on user selection

function loadProducts(page, sort = '') {
    let url;
    
    if (sort) {
        url = `http://127.0.0.1:8000/products/product/sorted_by_price/?order=${sort}&page=${page}`;
        console.log("inside sort")
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data);
            products.innerHTML = '';

            if (data.count !== undefined) {
                totalProduct.textContent = `${data.count} Results`;
            }

            if (Array.isArray(data)) {
                console.log("inside 157 line")
                data.forEach(product => {
                    // console.log(product)
                    console.log("id",product.id)
                    const productCol = document.createElement("div");
                    productCol.className = "col";
                    productCol.innerHTML = `
                        <div class="card">
                            <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}','${product.id}')">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            </a>
                        </div>
                        <div>
                            <div class="card-body mt-2 mb-3">
                                <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}','${product.id}')" class="card-title text-decoration-none">${product.name}</a>
                                <p></p>
                                <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}','${product.id}')" class="card-text text-decoration-none text-black">Price: $${product.price}</a>
                            </div>
                        </div>
                    `;
                    products.appendChild(productCol);
                });
            } else {
                console.error('Expected data.results to be an array, but got:', data.results);
            }

            // Update button visibility
            if (data.next) {
                loadMoreButton.style.display = 'block';
                previousButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'none';
                previousButton.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } 
    else
    {

        url = `http://127.0.0.1:8000/products/product/?page=${page}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data);
            products.innerHTML = '';

            if (data.count !== undefined) {
                totalProduct.textContent = `${data.count} Results`;
            }

            if (Array.isArray(data.results)) {
                console.log("inside 157 line")
                data.results.forEach(product => {
                    // console.log(product)
                    console.log("id",product.id)
                    const productCol = document.createElement("div");
                    productCol.className = "col";
                    productCol.innerHTML = `
                        <div class="card">
                            <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}')">
                                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                            </a>
                        </div>
                        <div>
                            <div class="card-body mt-2 mb-3">
                                <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}')" class="card-title text-decoration-none">${product.name}</a>
                                <p></p>
                                <a href="#" onclick="showDetails('${product.name}', '${product.price}', '${product.quantity}', '${product.sub_category}', '${product.image}', '${product.description}')" class="card-text text-decoration-none text-black">Price: $${product.price}</a>
                            </div>
                        </div>
                    `;
                    products.appendChild(productCol);
                });
            } else {
                console.error('Expected data.results to be an array, but got:', data.results);
            }

            // Update button visibility
            if (data.next) {
                loadMoreButton.style.display = 'block';
                previousButton.style.display = 'none';
            } else {
                loadMoreButton.style.display = 'none';
                previousButton.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    
}

// Initial load of products
loadProducts(currentPage);

// Event listeners for sorting
sortLowToHigh.addEventListener('click', () => {
    
    sortOrder = 'asc';
    console.log("sortlowtohigh")
    currentPage = 1; // Reset to the first page
    loadProducts(currentPage, sortOrder);
});

sortHighToLow.addEventListener('click', () => {
    sortOrder = 'desc';
    currentPage = 1; // Reset to the first page
    loadProducts(currentPage, sortOrder);
});

// Load more products on button click
loadMoreButton.addEventListener('click', () => {
    previousPage = currentPage;
    currentPage++;
    loadProducts(currentPage, sortOrder);
});

// Load previous products on button click
previousButton.addEventListener('click', () => {
    if (previousPage) {
        currentPage = previousPage;
        previousPage = null; // Clear previous page tracker
        loadProducts(currentPage, sortOrder);
    }
});

const showDetails = (name, price, quantity, sub_category, image, description) => {
    console.log("details",name,sub_category,price,description,image,quantity)
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`;
    window.location.href = detailsUrl;
};
