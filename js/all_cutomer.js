 // CustomerALlDetails
// Function to fetch and display all orders
const CustomerAllOrderDetails = () => {
    fetch("https://cildank-shop-deploy-versel.vercel.app/purchases/order/", {
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
      console.log(data)
      if (!data) return;
  
      const orderTableBody = document.getElementById("AllCustomerOrderTableBody");
      const totalCustomerOrder = document.getElementById("totalCustomerOrder");
  
      orderTableBody.innerHTML = ''; // Clear the table body
      totalCustomerOrder.innerText = data.length; // Set the total orders count
  
      data.forEach(order => {
        const row = document.createElement("tr");
  
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${order.product.image || "default-image.jpg"}`;
        const createdDate = new Date(order.created_at).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric"
        });
        
        row.innerHTML = `
          <td><img src="${imageUrl}" alt="${order.product.name}" style="width: 70px; height:70px; border-radius: 50%;"></td>
          <td>${order.id}</td>
          <td>${order.username}</td>
          <td>${order.product.name}</td>
          <td>$${parseFloat(order.product.price).toFixed(2)}</td>
          <td>${order.quantity}</td>
          <td>$${parseFloat(order.total_price).toFixed(2)}</td>
          <td>${order.status}</td>
          <td>${createdDate}</td>
          <td>
            <button class="btn btn-primary btn-sm" onclick="EditStatusForm(event, ${order.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="CustomersOrdersDelete(event, ${order.id})">Delete</button>
          </td>
        `;
  
        orderTableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      // alert("An error occurred while loading customer order details.");
    });
  };
  
  
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
      
      fetch(`https://cildank-shop-deploy-versel.vercel.app/purchases/order/${id}/`, {
        method: "DELETE",
        headers: {
          'Authorization': `Token ${localStorage.getItem("authToken")}`
        }
      })
      .then(res => {
        if (res.status === 204) {  // No Content - successful deletion
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
  
  
  // order edit
  // Function to open the modal and set the order ID for editing
  function EditStatusForm(event, orderId) {
    event.preventDefault();
    document.getElementById("editOrderId").value = orderId;
    const editStatusModal = new bootstrap.Modal(document.getElementById("editStatusModal"));
    editStatusModal.show();
  }
  
  // Function to save the status change
  function saveStatusChange() {
    const orderId = document.getElementById("editOrderId").value;
    const newStatus = document.getElementById("orderStatus").value;
    console.log(newStatus)
  
    fetch(`https://cildank-shop-deploy-versel.vercel.app/purchases/order/${orderId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("authToken")}`
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      return response.json();
    })
    .then(data => {
      alert("Order status updated successfully!");
      const editStatusModal = bootstrap.Modal.getInstance(document.getElementById("editStatusModal"));
      editStatusModal.hide();
      CustomerAllOrderDetails(); // Refresh the order list
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while updating the status.");
    });
  }
  