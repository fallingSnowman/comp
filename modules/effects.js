function fadeIn(customColour, callback) {
    const element = document.createElement("div");
    element.classList.add("fade");
    document.querySelector("body").appendChild(element);

    element.style.display = "block";
    element.style.width = "100vw";
    element.style.height = "100vh";
    element.style.position = "absolute";
    element.style.zIndex = "1000000000000";
    element.style.opacity = 0;

    if (customColour === undefined){
        element.style.background = "black";
    }else{
        element.style.background = customColour;
    }
    let opacity = 0;
    var interval = setInterval(()=>{
        if (opacity < 1) {
            opacity += 0.1;
            element.style.opacity = opacity;
        }else{
            console.log("oo")
            clearInterval(interval);
            opacity = undefined;
            if (callback === undefined){return;};
            callback();
        }
    }, 100);

}
function fadeOut(element) {
    let opacity = 1;
    var interval = setInterval(()=>{
        if (opacity > 0) {
            opacity -= 0.1;
            element.style.opacity = opacity;
        }else{
            clearInterval(interval);
            element.style.display = "none";
            element.remove()
            opacity = undefined;
        }
    }, 100);
}

const BG = {
    order: "./assets/order/background.png",
    choosing: "./assets/main/backgroundStuff.png",
    decorate: "./assets/main/backgroundStuff.png",
    gameOver: "./assets/gameOver/gameOver.png"
}
function changeBG(bg){
    if (BG[bg] === undefined){
        errorHandler();
        console.log("Undefined background option: "+bg+", "+BG[bg]);
        return false;}
    document.querySelector(".background").src = BG[String(bg)];
}

const UI = {
    general: [
        {
            name: "bottom bar",
            enableFunction: ()=>{
                document.querySelector(".bottom-bar").style.display = "flex";
                document.getElementById("order").addEventListener("click", clickOrder);
                document.getElementById("choose").addEventListener("click", clickChoose);
                document.getElementById("decorate").addEventListener("click", clickDecorate);
            },
            disableFunction: ()=>{
                document.querySelector(".bottom-bar").style.display = "none";
            }
        },
        {
            name: "timer",
            enableFunction: ()=>{
                document.querySelector(".timer").style.display = "block";
            },
            disableFunction: ()=>{
                document.querySelector(".timer").style.display = "none";
            },
        }
    ],
    order: [
        {
            name: "heart",
            enableFunction: ()=>{
                document.querySelector(".hearts").style.display = "block";
            },
            disableFunction: ()=>{
                document.querySelector(".hearts").style.display = "none";
            },
        },
        {
            name: "sprite",
            enableFunction: ()=>{
                document.querySelector(".sprite").style.display = "block";
            },
            disableFunction: ()=>{
                document.querySelector(".sprite").style.display = "none";
            }
        },
        {
            name: "message-bubble",
            enableFunction: ()=>{
                document.querySelector(".message-bubble").style.display = "block";
                document.querySelector(".message-bubble button").addEventListener("click", clickSubmit);
            },
            disableFunction: ()=>{
                document.querySelector(".message-bubble").style.display = "none";
                document.querySelector(".message-bubble button").removeEventListener("click", clickSubmit);
            }
        }
        //continue
    ],
    choosing: [
        {
            name: "nav arrows",
            enableFunction: ()=>{
                if (unlocked.order1 === false){return;}

                document.querySelector(".arrows").style.display = "flex";
                document.querySelector(".layer-4").style.display = "flex";

                enableArrow("right");
                enableArrow("left");
                disableArrow("left");


                document.querySelector(".left-arrow").addEventListener("click",clickArrow);
                document.querySelector(".right-arrow").addEventListener("click",clickArrow);
            },
            disableFunction: ()=>{
                if (unlocked.order1 === false){return;}

                document.querySelector(".arrows").style.display = "none";
                document.querySelector(".layer-4").style.display = "block";

                document.querySelector(".left-arrow").removeEventListener("click",clickArrow);
                document.querySelector(".right-arrow").removeEventListener("click",clickArrow);
            }
        },
        {
            name: "top bar",
            enableFunction: ()=>{
                document.querySelector(".top-bar").style.display = "block";
                document.querySelector(".arrow").style.display = "block";
                document.querySelector(".arrow").addEventListener("click",clickTopBar);
            },
            disableFunction: ()=>{
                document.querySelector(".top-bar").style.display = "none";
                document.querySelector(".arrow").style.display = "none";
                document.querySelector(".arrow").removeEventListener("click",clickTopBar);
            },
            updateFunction: ()=>{

            }
        },
        {
            name: "presents ui",
            enableFunction: ()=>{
                document.querySelector(".presents").style.display = "block";
                document.getElementById("1").style.display = "block";

                document.querySelectorAll(".presents img").forEach(element => {
                    element.addEventListener("click", clickPresent);
                });
            },
            disableFunction: ()=>{
                document.querySelector(".presents").style.display = "none";
                document.getElementById(String(pageChoosing.pg+1)).style.display = "none";
                document.querySelectorAll(".set").forEach(element=>{
                    element.style.display = "none";
                })
                document.querySelectorAll(".presents img").forEach(element => {
                    element.removeEventListener("click", clickPresent);
                });
            },
            updateFunction: ()=>{
                if (pageChoosing.pg === 0){disableArrow("left");}else if(pageChoosing.pg !== 0){enableArrow("left");}
                if (pageChoosing.pg === returnRange()){disableArrow("right")}else if(pageChoosing.pg !== returnRange()){enableArrow("right");}

                document.querySelectorAll(".set").forEach(element=>{
                    element.style.display = "none";
                })
                document.getElementById(String(pageChoosing.pg+1)).style.display = "block";
            },
        },
    ],
    decorate:[
        {
            name: "accessories ui",
            enableFunction: ()=>{
                document.querySelector(".accessories").style.display = "block";
                document.querySelectorAll(".accessories img").forEach(element => {
                    if (!element.parentNode.classList.contains("box")){
                        element.addEventListener("click", clickAccessory);
                    }
                });
            },
            disableFunction: ()=>{
                document.querySelector(".accessories").style.display = "none";
                document.querySelectorAll(".accessories img").forEach(element => {
                    element.removeEventListener("click", clickAccessory);
                });
            }
        },
        {
            name: "top bar",
            enableFunction: ()=>{
                document.querySelector(".top-bar").style.display = "block";
                document.querySelector(".arrow").style.display = "block";
                document.querySelector(".arrow").addEventListener("click",clickTopBar);
            },
            disableFunction: ()=>{
                document.querySelector(".top-bar").style.display = "none";
                document.querySelector(".arrow").style.display = "none";
                document.querySelector(".arrow").removeEventListener("click",clickTopBar);
            }
        },
    ],
    pause:[
        {
            name: 'other',
            enableFunction: ()=>{
                document.querySelector(".pause").style.display = "flex";
                document.querySelector(".pause .retr").style.display = document.querySelector(".continue").style.display;
            },
            disableFunction: ()=>{
                document.querySelector(".pause").style.display = "none";
            },
        },
        {
            name: 'buttons',
            enableFunction: ()=>{
                document.querySelector(".continue").addEventListener("click", function(){
                    disableUI("pause");
                    unpauseTimer(()=>{
                        updateFunction();
                    })
                });
            },
            disableFunction: ()=>{

            },
        }
    ]
}
const disableArrow = function(type){
    document.querySelector("."+type+"-arrow").style.display = "none";
}
const enableArrow = function(type){
    document.querySelector("."+type+"-arrow").style.display = "block";
}
const updateFunction =  function(life){
    document.getElementById("h"+String(life+1)).src = "./assets/brokenHeartIcon.png";
    if (life === 0){
        setTimeout(function () {
            audioCurrentDisconnect();
            audioPlay(".audio/gameOverGingle.ogg");
            fadeIn(undefined, ()=>{
                gameOverState();
                fadeOut(document.querySelector(".fade"));
            })
        }, 100);
        return;
    }
    audioPlay("./audio/error.ogg");
}


function enableUI(ui){
    if (UI[ui] === undefined){
        errorHandler();
        throw new Error("Undefined user interface option: "+ui+", "+UI[ui]);}
    UI[String(ui)].forEach(element => {//REPLACE
        console.log(element.name+" was enabled");
        element.enableFunction();
    });
}
function disableUI(ui){
    if (UI[ui] === undefined){
        errorHandler();
        throw new Error("Undefined user interface option: "+ui+", "+UI[ui]);}
    UI[String(ui)].forEach(element => {//REPLACE
        console.log(element.name+" was disabled");
        element.disableFunction();
    });
}

function returnRange(){
    range = 0;
    for (let key in unlocked) {
        if (unlocked[key] === true){
            range++;
            continue;
        }
        break;
    }
    return range;
}

function p() {
    this.currentTime = 0;
    this.play();
}
const audioPlay = function(filePath, boolAudioLoop){
    let audio = new Audio(filePath);
    if(boolAudioLoop){
        currentAudio = audio;
        audio.addEventListener('ended',p, false);
    }
    audio.autoplay = true;
    audio.play();
}
const audioCurrentDisconnect = function(){
    currentAudio.removeEventListener('ended',p);
    currentAudio.pause();
}