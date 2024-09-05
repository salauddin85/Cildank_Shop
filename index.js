const mensProduct = document.getElementById("mensProduct");
const menstopProduct = document.getElementById("menstopProduct");
const womensProduct = document.getElementById("womensProduct");
const womenstopProduct = document.getElementById("womenstopProduct");


fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Mens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(0, 4);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-6";
        div.id="mensProducts";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        mensProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));



//  Mens Top Product
fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Mens/")
.then((res) => res.json())
.then((data) => {
  if (Array.isArray(data.results)) {
    // Limit to 4 products
    const productsToShow = data.results.slice(3, 5);

    productsToShow.forEach((product) => {
      // Create a new div element for each product
      const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

      const div = document.createElement("div");
      div.className = "";

      // Set the inner HTML for the product card
      div.innerHTML = `
              <div class="card card-hover">
                   
                      <a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}',
                          '${encodeURIComponent(product.color)}',
                  )">
                          <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                      </a>



                  <div class="card-body">
                      <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}',
                          '${encodeURIComponent(product.color)}',
                  )"> ${product.name}</h5>
                      <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}',
                          '${encodeURIComponent(product.color)}',
                  )">$${product.price}</h6>
                  </div>
              </div>


                  
              `;

      // Append the new div to the mensProduct element
      menstopProduct.appendChild(div);
    });
  } else {
    console.error(
      "Expected data.results to be an array, but got:",
      data.results
    );
  }
})
.catch((err) => console.error("Error fetching data:", err));


const  MensProductDetails = (name, price, quantity, sub_category, image, description, id,color) => {
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}&color=${encodeURIComponent(color)}`;
    window.location.href = detailsUrl;
};




fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Womens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(0, 4);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-6";
        div.id="womensProducts";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        womensProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));




  // womens top product
  fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Womens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(3, 5);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}',
                            '${encodeURIComponent(product.color)}',
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        womenstopProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));





const  WomensProductDetails = (name, price, quantity, sub_category, image, description, id,color) => {
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}&color=${encodeURIComponent(color)}`;
    window.location.href = detailsUrl;
};











const loadReviews = () => {
  fetch("https://cildank-shop.onrender.com/products/review/")
      .then((res) => res.json())
      .then((data) => {
          console.log("review", data);
          
          // Use slice to limit to 2 reviews
          const limitedData = data.slice(0, 2);

          limitedData.forEach(review => {
              console.log("products id", review.products.id);
              
              const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${review.image}`;

              const newli = document.createElement("li");
              const allReview = document.getElementById("allReview");
              newli.className = "slide-visible";
              newli.innerHTML = `
                  <div class="cards-review shadow bg-white text-black h-100">
                      <div class="ratio ratio-16x9">
                          <img src="${imageUrl}" class="img-class " id="img-reivew" alt="...">
                      </div>
                      <div class="card-body p-3 p-xl-5" id="review-body">
                          <h3 class="card-title h5">${review.name}</h3>
                          <h3 class="card-title h5">${review.rating}</h3>
                          <p class="card-text">${review.body}</p>
                      </div>
                  </div>
              `;

              allReview.appendChild(newli);
          });
      })
      .catch((err) => console.log(err));
};

loadReviews();


