const buttonPlayEvent = function() {
    this.removeEventListener('click', buttonPlayEvent);  
    fadeIn(undefined, ()=>{
        enableUI("general");
        UI.general[1].disableFunction();
        document.querySelector(".menu").style.display = "none";
        document.querySelector(".overlay img").remove();
        fadeOut(document.querySelector(".fade"));
        orderState();
        
        audioCurrentDisconnect();
        audioPlay("./audio/mainTheme.ogg", true);


        document.body.addEventListener('keyup', function (e) {
            if (e.key === "Escape"){
                if(document.querySelector(".pause").style.display === "none"){
                    pauseState()
                    return;
                }

            }
        })
    });
}


const orderState = function() {
    switch (pageChoosing.ord) {
        case 1:
            disableUI("choosing");
            break;
        case 2:
            disableUI("decorate");
            break;
    }

    changeBG("order");
    enableUI("order");
    pageChoosing = {ord:0,pg:0};
}
const chooseState = function() {
    switch (pageChoosing.ord) {
        case 0:
            disableUI("order");
            break;
        case 2:
            disableUI("decorate");
            break;
    }

    changeBG("choosing");
    enableUI("choosing");
    pageChoosing = {ord:1,pg:0};
}
const decorateState = function(){
    switch (pageChoosing.ord) {
        case 0:
            disableUI("order");
            break;
        case 1:
            disableUI("choosing");
            break;
    }

    changeBG("decorate");
    enableUI("decorate");
    pageChoosing = {ord:2, pg:0};
}
const gameOverState = function(){
    pauseTimer();

    audioPlay("./audio/gameOver.ogg", true);
    disableUI("general");
    disableUI("order");
    changeBG("gameOver");


    document.querySelector(".retry").addEventListener("click", ()=>{
        window.location.reload();
    })
    document.querySelector(".overlay div").style.display = "block";
    console.log(ID);
    let score = calculateScore(ID);
    document.querySelector("#score").textContent = score;
    if (localStorage.getItem("score") === undefined || localStorage.getItem("score") < calculateScore(ID)){
        document.querySelector("#bestScore").textContent = score;
        saveScore(score)
    } else{
        document.querySelector("#bestScore").textContent = localStorage.getItem("score");
    }
    document.querySelector(".retry").style.display = "block";

    pageChoosing = {ord:3, pg:0};
}
const pauseState = function(){
    enableUI("pause");

    pauseTimer();

    document.querySelector(".retr").addEventListener("click", ()=>{
        window.location.reload();
    })
}

const errorHandler = function(){
    let doc = document.createElement("p");
    doc.textContent = "An error occured. Please check dev console!";
    doc.style.fontFamily = "fdfd";
    doc.style.fontSize = "8px";
    doc.style.color = "red";
    document.body.appendChild(doc);
}

const newOrder = function(){
    ID++;
    order =  new Order(ID);
}

const clickTopBar = function(){
    if (document.querySelector(".layer-3 .arrow").style.rotate == "-90deg"){
        document.querySelector(".top-bar div").classList.add("float-up");
        document.querySelector(".layer-3 .arrow").style.rotate = "90deg";
        return;
    }
    document.querySelector(".top-bar div").classList.remove("float-up");
    document.querySelector(".layer-3 .arrow").style.rotate = "-90deg";
}

const clickArrow = function(){
    if (this.classList.contains("right-arrow")){
        if (pageChoosing.pg === returnRange()){return;}
        pageChoosing.pg++;
    }else{
        if (pageChoosing.pg === 0){return;}
        pageChoosing.pg--;
    }
    UI.choosing[2].updateFunction();
}

const clickPresent = function(){
    let filename = this.src.split("/")[this.src.split("/").length-1].replace(".png", "");
    if (filename.search("Glow") != -1){
        return undefined;
    }
    if (currentOrder.present !== ""){
        document.querySelector("img[src*='"+currentOrder.present+"Glow.png']").src = "assets/main/presents/"+currentOrder.present+".png";
    }
    currentOrder.present = filename;
    this.src = this.src.replace(".png", "")+"Glow"+".png";
}
const clickAccessory = function(){
    let filename = this.src.split("/")[this.src.split("/").length-1].replace(".png", "");
    if (filename.search("Glow") != -1){
        return undefined;
    }
    console.log(currentOrder);
    if (filename.search("WrapperThingie") != -1){
        if (currentOrder.accessory !== ""){
            document.querySelector("img[src*='"+currentOrder.accessory+"Glow.png']").src = "assets/main/accessories/"+currentOrder.accessory+".png";
        }
        currentOrder.accessory = filename;
    }else if (filename.search("Wrapper") != -1){
        if (currentOrder.wrap !== ""){
            document.querySelector("img[src*='"+currentOrder.wrap+"Glow.png']").src = "assets/main/accessories/"+currentOrder.wrap+".png";
        }
        currentOrder.wrap = filename;
    }else if (filename.search("Ribbon") != -1){
        if (currentOrder.ribbon !== ""){
            document.querySelector("img[src*='"+currentOrder.ribbon+"Glow.png']").src = "assets/main/accessories/"+currentOrder.ribbon+".png";
        }    
        currentOrder.ribbon = filename;
    }
    this.src = this.src.replace(".png", "")+"Glow"+".png";
}

const clickOrder = function(){
    pageChoosing.pg = 0;
    orderState();
}
const clickChoose = function(){
    pageChoosing.pg = 0;
    chooseState();
}
const clickDecorate = function(){
    pageChoosing.pg = 0;
    decorateState();
}
const clickSubmit = function(){
    pauseTimer();
    UI.general[1].enableFunction();
    for (let key in currentOrder) {     
        if (currentOrder[key] === ""){
            life--;
            updateFunction(life);
            currentOrder = {
                present: "",
                wrap: "",
                ribbon: "",
                accessory: ""
            };
            newOrder();
            order.display();
            console.log(order.time);
            timer(order.time, ()=>{
                life--;
                updateFunction(life);
                currentOrder = {
                    present: "",
                    wrap: "",
                    ribbon: "",
                    accessory: ""
                };
                newOrder();
                order.display();
                timer(order.time, ()=>{
                    life--;
                    updateFunction(life);
                    currentOrder = {
                        present: "",
                        wrap: "",
                        ribbon: "",
                        accessory: ""
                    };
                    newOrder();
                    order.display();
                })
            })
            return;
        }
    }
    if (order.compare(currentOrder) === false){
        life--;
        UI.order[0].updateFunction()
    }
    document.querySelector("img[src*='"+currentOrder.present+"Glow.png']").src = "assets/main/presents/"+currentOrder.present+".png";
    document.querySelector("img[src*='"+currentOrder.wrap+"Glow.png']").src = "assets/main/accessories/"+currentOrder.wrap+".png";
    document.querySelector("img[src*='"+currentOrder.ribbon+"Glow.png']").src = "assets/main/accessories/"+currentOrder.ribbon+".png";
    document.querySelector("img[src*='"+currentOrder.accessory+"Glow.png']").src = "assets/main/accessories/"+currentOrder.accessory+".png";

    currentOrder = {
        present: "",
        wrap: "",
        ribbon: "",
        accessory: ""
    };
    newOrder();
    order.display();
    timer(order.time, ()=>{
        life--;
        updateFunction(life);
        currentOrder = {
            present: "",
            wrap: "",
            ribbon: "",
            accessory: ""
        };
        newOrder();
        order.display();
        timer(order.time, ()=>{
            life--;
            updateFunction(life);
            currentOrder = {
                present: "",
                wrap: "",
                ribbon: "",
                accessory: ""
            };
            newOrder();
            order.display();
        })
    })
}

const timer = function(t, callback){
    time = t-1;
    interval = setInterval(()=>{
        time--;
        document.querySelector(".timer h1").innerHTML = String(time);
        if (time <= 0){
            clearInterval(interval);
            callback();
        }  
    }, 1000);
}
const pauseTimer = function(){
    clearInterval(interval);
}
const unpauseTimer = function(callback){
    interval = setInterval(()=>{
        time--;
        document.querySelector(".timer h1").textContent = String(time);
        if (time <= 0){
            clearInterval(interval);
            callback();
        }  
    }, 1000);
}

const calculateScore = function(ID){
    return ID*100 + Math.floor(Math.random()*100)-1;
}
const saveScore = function(score){
    localStorage.setItem("score", score);
}
