function imageClick(imageNumber) {
    setTimeout(() => {
        //Find the slider element
        const sliderElement = document.getElementById("pgalleryModal");
        //Slide to he right image
        swiffyslider.slideTo(sliderElement, imageNumber);
        //Listen to slide end and set focus to the container to enable keyboard navigation
        swiffyslider.onSlideEnd(sliderElement, () =>
            sliderElement.querySelector(".slider-container").focus()
        );
    }, 200);
}

function thumbHover(imageNumber) {
    //Find the slider element
    const sliderElement = document.getElementById("pgallery");
    //Slide to he right image
    swiffyslider.slideTo(sliderElement, imageNumber);
}

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        price: params.get("price"),
        quantity: params.get("quantity"),
        sub_category: params.get("sub_category"),
        description: params.get("description"),
        image: params.get("image"),
    };
}

function displayProductDetails() {
    const { name, price, quantity, sub_category, description, image } =
        // console.log(sub_category)
        getQueryParams();
    const productDetails = document.getElementById("product-details");
    if(quantity.length<0)
    {
        alert("No more Product Available")
    }
    productDetails.innerHTML = `
                <div class="col-5">
                        <div class="card">
                            <a href="./details.html"><img src="${image}" class="card-img-top" alt="...">
                            </a>
                        
                        </div> 
                </div> 
                    


           <div class=" col-12 col-lg-5 ">

                <div class="mt-3">
                    <small class="text-secondary opacity-50 ">Fashion-Fusion-Shop</small>
                    <h2>${name}</h2>
                    <h4>${sub_category}</h4>
    
                    <h5>$${price}</h5>
                    <p class="text-secondary opacity-75">Tax included</p>
                </div>
                <div>

                    <h6>Size</h6>
                    <button class="border border-1 border-black btn btn-light">S</button>
                    <button class="border border-1 border-black btn btn-light">M</button>
                    <button class="border border-1 border-black btn btn-light">L</button>
                </div>
                <form action="">
                    <div>
                    <hr class="opacity-25 fs-5">
                    <div class="mt-4 d-flex gap-3">
                        
                        <div>
                        <b class="">Quantity</b>: <input type="text" class="p-3 border-2 rounded border border-info w-50 "></input>
            
                        </div>
                        <div>
                        <button type="submit"
                            class="btn btn-outline-danger   px-5 py-3 mb-2 text-bold align-items-center text-secondary  mb-5  border-2"
                            style="width: 350px;">Add To Cart</button>
                        </div>
                    </div>
            
                    </div>
                    <div>
                    <button type="submit" class="fs-5 purchase-btn w-75 p-3 rounded border-0 mb-2 text-light">Purchase</button>
                    </div>
            
                </form>
                <div>
                    <p>${description}</p>
                    <li>Faded ${name}</li>
                    <li>Fit: Regular</li>
                    
                    <li>Full cover graphic logo design hand printed</li>
                    <p>Due to nature of this custom product it is non refundable and no discount codes will be valid.</p>
                </div>
          <!-- accurdiam  -->
          <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Shipping
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample"> 
                  <div class="accordion-body">
                    <p>Free UK Standard Up to 7 days Delivery on orders over £40

                      £3.99 UK Standard Delivery (up to 7 days)
                      
                      £4.99 UK Next Day Delivery (please note this is not available on every product)
                      
                      Cut off for UK Next Day Delivery is 3:30pm
                      
                      Check Delivery & Returns section for international courier info
                      
                      We ship globally & country specific info can be found in the deliveries section in the website footer. Delivery carriers are identified at checkout based on the country you are ordering from. We offer overseas delivery options ranging from Express 1-2 day through to Economy 3-7 working days.
                      
                      Returns
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Returns
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p>We offer pre paid return Royal Mail labels on all UK orders. <br>

                      EU and US customers can also download DHL fully tracked returns labels via the website returns portal. <br>
                      
                      We offer a lifetime returns policy. Please refer to full T&C's to ensure return quality standards are met.
                      
                      Refunds are offered on all full price items. Anything purchased in our sale will be refunded via e-credit note.</p>
                  </div>
                </div>
              </div>
            
            </div>
            <div>

            </div>
              

          
        </div> 

            `;
}

displayProductDetails();
