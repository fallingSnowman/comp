class Order{
    #interests = [
        "Swimming",
        "Tennis",
        "Computer games",
        "Drawing",
        "Writing",
        "Makeup",
        "Music",
        "Collecting toys"
    ]
    #itemsRating = {
        "dinoPlushie":[1,0,2,2,1,0,0,5],
        "musicThingie":[0,0,2,2,2,0,5,3], 
        "wand":[0,0,4,2,2,3,0,5],
        "tennisBall":[3,5,2,0,0,0,0,4],
        "book":[0,0,3,4,4,0,4,0],
        "heartNecklace":[0,0,2,2,2,5,0,5], 
        "penSet":[0,0,2,5,5,0,3,3],
        "console":[0,0,5,2,2,0,2,5],
        "goggles":[5,3,0,0,0,0,0,1],
        "lipstick":[0,0,0,3,0,5,1,0],
    }
    id;
    constructor(id){
        this.id = id;
        this.colour = ["yellow", "blue", "red"][Math.floor(Math.random()*2)];
        this.interests = this.#interests[Math.floor(Math.random()*(this.#interests.length-1))];
        this.age = Math.floor(Math.random()*9)+6;
        this.time = Math.floor(60 - Math.pow(1.05, id));
    }
    compare(currentOrder){
        let totalScore = 0;
        let presentIndex = this.#interests.findIndex((element)=>{return this.interests === element});
        console.log(presentIndex);
        totalScore+= this.#itemsRating[currentOrder.present][presentIndex];
        if (currentOrder.wrap.toLowerCase().search(String(this.colour)) != -1){
            totalScore += 5;
        }   
        if (currentOrder.ribbon.toLowerCase().search(String(this.colour)) != -1){
            totalScore += 5;
        }
        if (currentOrder.accessory.toLowerCase().search(String(this.colour)) != -1){
            totalScore += 5;
        }
        console.log(totalScore);
        if (totalScore>=10){
            return true;
        }
        return false;
    }
    display(){
        //display data the dialog box
        document.querySelectorAll(".id").forEach(element=>{element.textContent = String(this.id);})
        document.querySelectorAll(".age").forEach(element=>{element.textContent = String(this.age);})
        document.querySelectorAll(".colour").forEach(element=>{element.textContent = String(this.colour);})
        document.querySelectorAll(".interests").forEach(element=>{element.textContent = String(this.interests);})
    }
}