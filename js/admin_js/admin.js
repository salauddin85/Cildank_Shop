async function fetchUsers() {
    try {
      const apiUrl = 'http://127.0.0.1:8000/auth/admin-account/';
      
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
    
    fetch(`http://127.0.0.1:8000/auth/admin-account/${id}/`, {
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
  // CustomerALlDetails
// Function to fetch and display all orders
const CustomerAllOrderDetails = () => {
  fetch("http://127.0.0.1:8000/purchases/order/", {
    method: "GET",
    headers: {
      'Authorization': `Token ${localStorage.getItem("authToken")}`
    }
  })
  .then(res => {
    if (!res.ok) {
      alert("Failed to load customer order details");
      return null;
    }
    return res.json();
  })
  .then(data => {
    if (data) {
      const orderTableBody = document.getElementById("AllCustomerOrderTableBody");
      const totalCustomerOrder = document.getElementById("totalCustomerOrder");

      orderTableBody.innerHTML = ''; // Clear the table body
      totalCustomerOrder.innerText = data.length; // Set the total orders count

      data.forEach(order => {
        const row = document.createElement("tr");

        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${order.product.image}`;
        
        row.innerHTML = `
          <td><img src="${imageUrl}" alt="${order.product.name}" style="width: 70px; height:70px;border-radius: 50%;"></td>
          <td>${order.id}</td>
          <td>${order.username}</td>
          <td>${order.product.name}</td>
          <td>$${parseFloat(order.product.price).toFixed(2)}</td>
          <td>${order.quantity}</td>
          <td>$${parseFloat(order.total_price).toFixed(2)}</td>
          <td>${order.status}</td>
          <td>${new Date(order.created_at).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="EditStatusForm(event,${order.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="CustomersOrdersDelete(event, ${order.id})">Delete</button>
          </td>
        `;

        orderTableBody.appendChild(row);
      });
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
};

// // // Function to open the edit modal and set data
// const EditStatusForm = () => {
 
//   // Show the modal
//   const editModal = new bootstrap.Modal(document.getElementById("editStatusModal"));
//   editModal.show();
  
 
// };


// // Initial call to load data when the page loads
CustomerAllOrderDetails();



//   // Order Delete
  const CustomersOrdersDelete = (event, id) => {
    event.preventDefault(); // Prevents default button behavior
    
    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to delete this order?");
    
    if (!confirmed) {
      return; // Exit if the user clicks "Cancel"
    }
    
    console.log(id, "delete id");
    
    fetch(`http://127.0.0.1:8000/purchases/order/${id}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `Token ${localStorage.getItem("authToken")}`
      }
    })
    .then(res => {
      if (res.status === 201) {  // No Content - successful deletion
        alert("Order deleted successfully.");
        fetchUsers(); // Refresh the order list after deletion
      } else if (res.status === 404) { // Not Found - order not found
        alert("Order not found.");
      } else { // Other errors
        alert("Failed to delete the order. Please try again.");
      }
      return res.json();
    })
    .then(data => {
      if (data && data.error) {
        alert(data.error); // Display backend error message if available
      }
    })
    .catch(error => {
      console.error("Error:", error);
      // alert("An error occurred while trying to delete the order.");
    });
  };
  CustomersOrdersDelete()




// ------------------------------------------------------------------------







  const AdminReport = () => {
    fetch("http://127.0.0.1:8000/purchases/adminReportView/", {
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
  