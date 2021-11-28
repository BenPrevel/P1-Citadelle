let statut = localStorage.getItem("citadelleStatut");
let statutImg = document.querySelector(".victoryImg");
localStorage.setItem("citadelleStatut", "");

//Initialization title and img with the result in script.js code
document.querySelector("h1").innerHTML= statut;

if (statut == null){
    document.querySelector("h1").innerHTML= "Dit donc... ça veut tricher ?"
    statutImg.src = ""; 
} else {
    if (statut == "Victoire"){
        statutImg.src = "/img/victory.gif"; 
    }else if (statut == "Game over"){
        statutImg.src = "/img/defeat.gif"; 
    }else if (statut == "Match nul") {
        statutImg.src = "img/spaceShuttle.png"; 
    } else {
        document.querySelector("h1").innerHTML= "Dit donc... ça veut tricher ?"
        statutImg.src = ""; 
    }
}

