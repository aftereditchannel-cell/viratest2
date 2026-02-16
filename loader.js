window.addEventListener("load", ()=>{
    const loader = document.getElementById("loader");
    setTimeout(()=>{
        loader.classList.add("loader-hide");
        setTimeout(()=>{loader.remove();},900);
    },1800);
});
