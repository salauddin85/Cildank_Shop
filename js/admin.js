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
      return null;
    }
    return res.json(); // Parse JSON if response is ok
  })
  .then(data => {
    if (data) {
      // Check and log the data to ensure values are available
      console.log(data);
       // Update the text content for various metrics
       document.getElementById("lowStackCount").innerText = data.low_stock_products;
       document.getElementById("TotalOrder").innerText = data.total_order;
       document.getElementById("totalReview").innerText = data.total_review;
       document.getElementById("totalSales").innerText = data.total_sales_count;
       document.getElementById("totalIncome").innerText = `${data.total_payment} BDT`;
 
       document.getElementById("TotalOrderProcess").innerText = `Total Orders Processing: ${data.order_pending}`;
       document.getElementById("TotalOrderCanceld").innerText = `Total Orders Canceled: ${data.order_canceled}`;
       document.getElementById("TotalOrderCompleted").innerText = `Total Orders Completed: ${data.order_completed}`;
      // Ensure the correct data exists and map them into arrays for sales and income
      const labels = ['Today', 'This Week', 'This Month'];

      // Mapping data correctly
      const salesData = [
        data.total_sales_today || 0, // Use default value 0 if the value is null/undefined
        data.total_sales_last_7_days || 0,
        data.total_sales_last_30_days || 0
      ];

      const incomeData = [
        data.total_income_today || 0,
        data.total_income_last_7_days || 0,
        data.total_income_last_30_days || 0
      ];

      // Get the context of the canvas element for the chart
      const ctx = document.getElementById('salesIncomeChart').getContext('2d');

      // Create the bar chart using Chart.js
      const salesIncomeChart = new Chart(ctx, {
        type: 'bar',  // Bar chart type
        data: {
          labels: labels,  // X-axis labels (Today, Week, Month)
          datasets: [{
            label: 'Total Sales', // Dataset label for Sales
            data: salesData, // Data for sales
            backgroundColor: 'rgba(54, 162, 235, 0.6)', // Sales bar color
            borderColor: 'rgba(54, 162, 235, 1)', // Sales border color
            borderWidth: 1 // Border width for sales bars
          }, {
            label: 'Total Income', // Dataset label for Income
            data: incomeData, // Data for income
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Income bar color
            borderColor: 'rgba(255, 99, 132, 1)', // Income border color
            borderWidth: 1 // Border width for income bars
          }]
        },
        options: {
          responsive: true, // Make the chart responsive
          scales: {
            y: {
              beginAtZero: true, // Ensure y-axis starts at 0
              ticks: {
                stepSize: 500, // Set step size on the y-axis
                callback: function(value) {
                  return value + ' BDT'; // Add currency symbol
                }
              }
            }
          },
          plugins: {
            legend: {
              position: 'top', // Position the legend on top
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.dataset.label + ': ' + tooltipItem.raw + ' BDT'; // Add BDT to tooltips
                }
              }
            }
          }
        }
      });
    }
  })
  .catch(error => {
    console.error("Error:", error);
    alert("An error occurred while fetching the Admin Report");
  });
};

// Call the function to fetch data and render the chart
AdminReport();
