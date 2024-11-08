async function fetchUsers() {
    try {
      const apiUrl = 'https://cildank-shop-deploy-versel.vercel.app/auth/admin-account/';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const totalUsers = data.length; 
      document.getElementById('totalUser').innerText = totalUsers;
  
      const userTableBody = document.getElementById('userTableBody');
      userTableBody.innerHTML = ''; // Clear existing data
  
      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>#${user.id}</td>
          <td>${user.user_name}</td>
          <td>${user.user_email}</td>
          <td>${user.account_no}</td>
          <td>$${parseFloat(user.balance).toFixed(2)}</td>
          <td>${new Date(user.created_on).toLocaleDateString()}</td>
          <td>
            
            <button class="btn btn-danger btn-sm" id=${user.id} onclick="UserDelete(event, ${user.id})">Delete</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });
  
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  

  // Execute the functions to fetch data
  fetchUsers();

  const UserDelete = (event, id) => {
    event.preventDefault(); // Prevents default button behavior
    
    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to delete this user?");
    
    if (!confirmed) {
      return; // Exit if the user clicks "Cancel"
    }
    
    console.log(id, "delete id");
    
    fetch(`https://cildank-shop-deploy-versel.vercel.app/auth/admin-account/${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem("authToken")}`
      }
    })
    .then(res => {
      if (!res.ok) {
        alert("Failed to delete the user");
        throw new Error("Delete request failed");
      }
      return res.json();
    })
    .then(data => {
      alert("User Deleted Successfully");
      console.log(data);
      fetchUsers(); // Refresh the user list after deletion
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };
  

// -------------------------------------------------------------------------
 

// ------------------------------------------------------------------------





// ----------------------------------------------------------------------------

  const AdminReport = () => {
    fetch("https://cildank-shop-deploy-versel.vercel.app/purchases/adminReportView/", {
      method: "GET",
      headers: {
        'Authorization': `Token ${localStorage.getItem("authToken")}`
      }
    })
    .then(res => {
      if (!res.ok) {
        alert("Failed to load Admin Report Details");
        return null;  // Return null to avoid chaining issues
      }
      return res.json(); // Only parse JSON if the response is OK
    })
    .then(data => {
      if (data) {
        console.log(data)
        console.log("Total Payment:", data.total_payment);
        // console.log("Total Sales Count:", data.low_stock_products);
        document.getElementById("lowStackCount").innerText=data.low_stock_products
        document.getElementById("TotalOrder").innerText=data.total_order
        document.getElementById("totalReview").innerText=data.total_review
        document.getElementById("totalSales").innerText=data.total_sales_count
        document.getElementById("totalIncome").innerText=`${data.total_payment} BDT`
        // ORDER DETAILS
        document.getElementById("TotalOrderProcess").innerText = `Total Orders Processing: ${data.order_pending}`;
        document.getElementById("TotalOrderCanceld").innerText = `Total Orders Canceled: ${data.order_canceled}`;
        document.getElementById("TotalOrderCompleted").innerText = `Total Orders Completed: ${data.order_completed}`;
        // Iterate through the product_income array
        data.product_income.forEach(product => {
          // console.log(`Product Name: ${product.product__name}`);
          // console.log(`Subcategory: ${product.product__sub_category__name}`);
          // console.log(`Price: $${product.product__price}`);
          // console.log(`Total Quantity Sold: ${product.total_quantity}`);
          // console.log(`Total Income: $${product.total_income}`);
          console.log("---------");
        });
      }
    })
    .catch(error => {
      console.error("Error:", error);
      // alert("An error occurred while fetching the Admin Report");
    });
  };
  
  // Call the function
  AdminReport();
  // ------------------------------------------------------------------------
