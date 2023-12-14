document.addEventListener("DOMContentLoaded", ()=>{
    window.onerror = function() {errorHandler();};
    document.querySelectorAll(".ui").forEach((ele)=>{
        ele.style.display = "none";
    })
    document.querySelectorAll("button").forEach(element=>{
        element.addEventListener("click", ()=>{
            new Audio("./audio/click.wav").play();
        })
    })
    document.querySelector(".overly").addEventListener("click", ()=>{
        document.querySelector(".overly").style.display = "none";
        audioPlay("./audio/menu.mp3", true); 
        document.querySelectorAll(".set").forEach((ele)=>{
            ele.style.display = "none";
        })
    
        document.querySelector("#play").addEventListener('click' ,buttonPlayEvent);
        newOrder();
        order.display();
    })
})

