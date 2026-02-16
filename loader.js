window.addEventListener("load", ()=>{

    const loader = document.getElementById("loader");

    setTimeout(()=>{
        loader.classList.add("loader-hide");

        setTimeout(()=>{

            const session = localStorage.getItem("vira_session");

            if(session){
                // قبلاً وارد شده
                window.location.href = "home.html";
            }else{
                // اولین ورود
                window.location.href = "auth.html";
            }

        },900);

    },1800);

});
