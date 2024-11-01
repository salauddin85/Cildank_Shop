



const handleAmount = (event) => {
    event.preventDefault();

    const form = document.getElementById('transaction-form');
    const token = localStorage.getItem("authToken");
    
    // টোকেন চেক করুন
    if (!token) {
        // alert("You are not authenticated user. Please log in.");
        window.location.href = "./login.html";
        return;
    }

    const formData = new FormData(form);
    const amountData = {
        transaction_amount: formData.get('amount'),
        deposit: formData.get('deposit'), // আপনার সার্ভারে যা প্রত্যাশা করে
    };

    fetch("http://127.0.0.1:8000/transactions/deposit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(amountData),
    })
    .then(res => {
        if (res.ok) {
            return res.json().then(data => {
                // সফল প্রতিক্রিয়া হ্যান্ডেল করুন
                alert("Deposit Successful! Check your mail or user account.");
                // এখানে ডেটা লগ করতে পারেন যদি দরকার হয়
                console.log(data);
            });
        } else if (res.status === 400) {
            return res.json().then(data => {
                // খারাপ অনুরোধ হ্যান্ডেল করুন
                alert( (data.error || "Bad request. Please check your input."));
            });
        } else if (res.status === 404) {
            alert("Error: " + "No User Account Found."); // ব্যবহারকারী অ্যাকাউন্ট না পাওয়া গেলে
        } else {
            // অন্যান্য HTTP ত্রুটি হ্যান্ডেল করুন
            alert("An unexpected error occurred. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An unexpected error occurred. Please try again.");
    });
};

