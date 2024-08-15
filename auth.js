const handleRegistration = (event) => 
    {
        event.preventDefault();
    
        const form = document.getElementById('registration-form');
        const formData = new FormData(form);
    
        const registrationData = 
        {
            username: formData.get('username'),
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password')
        };
    
        console.log('registration data', registrationData);
    
        fetch("http://127.0.0.1:8000/auth/register/", 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationData),
        
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            alert("Registration Successful. Please check your email for confirmation.");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    


    const handleLogin = (event) => 
        {
            event.preventDefault();
        
            const form = document.getElementById('login-form');
            const formData = new FormData(form);
        
            const loginData = 
            {
                username: formData.get('username'),
               
                password: formData.get('password'),
                
            };
        
            console.log('login data',loginData);
        
            fetch("http://127.0.0.1:8000/auth/login/", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            
            })
            .then(res => res.json())
            .then(data => {
                console.log("set data",data);
                console.log("user data",data.user_id);
                console.log("token data",data.token);
                localStorage.setItem("authToken", data.token);
                window.location.href = "./index.html";
            })
            .catch(error => {
                console.error('Error:', error);
            });
        };
        


const handleLogout = ()=>{
    const token = localStorage.getItem("authToken");
    // console.log(token)
    fetch(' http://127.0.0.1:8000/auth/logout/',
    {
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            Authorization:`Token ${token}`,
        },
    })
    .then((res) =>{
        console.log(res);
        if (res.ok){
            localStorage.removeItem("authToken");
            window.location.href = "./login.html";
        }
    })
    .catch((err) =>{
        console.log("Logout error",err);
    })
}
