// Fetch the profile data from the API
const isAdmin = localStorage.getItem("isAdmin") === 'true'; // Check if isAdmin is 'true'
fetch('https://cildank-shop-deploy-versel.vercel.app/auth/profile/', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('authToken')}`  // Assuming token is stored in localStorage
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
    const profileContainer = document.getElementById('profile-container');

    // Get the first element of the data array (assuming the response is an array)
    const profile = data[0];

    // Check if isAdmin is true or false
    let profileHTML = '';

    if (isAdmin) {
        // If isAdmin is true, show only username and email
        profileHTML = `
            <h2>Admin Profile</h2>
            <p><strong>Username:</strong> ${profile.username}</p>
            <p><strong>Email:</strong> ${profile.user_email}</p>
            <p><strong>IsAdmin:</strong> ${isAdmin}</p>
        `;
    } else {
        // If isAdmin is false, show all details
        profileHTML = `
            <h2>User Profile</h2>
            <p><strong>Role:</strong>Customer</p>

            <p><strong>Username:</strong> ${profile.username}</p>
            <p><strong>Email:</strong> ${profile.user_email}</p>
            <p><strong>Full Name:</strong> ${profile.full_name}</p>
            <p><strong>First Name:</strong> ${profile.first_name}</p>
            <p><strong>Last Name:</strong> ${profile.last_name}</p>
        `;
    }

    // Insert the profile information into the HTML
    profileContainer.innerHTML = profileHTML;
})
.catch(error => {
    console.error('Error fetching profile data:', error);
});
