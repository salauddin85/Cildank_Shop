const handlePurchase = (event) => 
    {
        event.preventDefault();
    
        const form = document.getElementById('purchase');
        const formData = new FormData(form);

    
        const PurcheseData = 
        {
            quantity: formData.get('quantity'),
            
        };
    
        console.log('login data',PurcheseData);
    
        fetch("http://127.0.0.1:8000/auth/login/", 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(PurcheseData),
        
        })
        .then(res => res.json())
        .then(data => {
            console.log("set data",data);
            
            
            // window.location.href = "./";
            alert("Purchase Successfully Check Your Mail")
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    


