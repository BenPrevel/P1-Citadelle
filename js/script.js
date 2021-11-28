let stockPlayer = 100;
let stockBot = 100;
let randomBotStake = missilesNumberBot(stockBot);
let playerLife = 3;
let botLife = 3;
let result ='';
const divStockPlayer = document.querySelector(".stockPlayer");
const divStockBot = document.querySelector(".stockBot");
const historicDiv = document.querySelector(".historicContainer");


// RECOVER NUMBER OF MISSILE PLAYER
function recoverMissilePlayer() {
  const inputValue = document.querySelector(".inputMissiles");
  return parseInt(inputValue.value);
}

// RANDOMIZATION NUMBER OF MISSILE BOT
function missilesNumberBot(stock){
  return Math.floor(Math.random() * stock);
}

//IF PLAYER WIN THE ROUND
function winningRound(){
  const winningPhrase = `Vous avez envoyé ${recoverMissilePlayer()} missiles. Atomisator a tiré ${randomBotStake} missiles. Vous avez gagné. <br/><br/> `;
  historicDiv.innerHTML += winningPhrase;
  switch (botLife) {
    case 3:
      botHeart3 = document.querySelector(".heartBot3");
      botHeart3.src = "img/heart.png";
      break;
    case 2:
      botHeart2 = document.querySelector(".heartBot2");
      botHeart2.src = "img/heart.png";
      break;
    case 1:
      botHeart1 = document.querySelector(".heartBot1");
      botHeart1.src = "img/heart.png";
      break;
  }
  botLife--;
}

//IF PLAYER LOOSE THE ROUND
function looseRound(){
  const losingPhrase = `Vous avez envoyé ${recoverMissilePlayer()} missiles. Atomisator a tiré ${randomBotStake} missiles. Vous avez perdu. <br/><br/> `;
  historicDiv.innerHTML += losingPhrase;
  switch (playerLife) {
    case 3:
      playerHeart3 = document.querySelector(".heartPlayer3");
      playerHeart3.src = "img/heart.png";
      break;
    case 2:
      playerHeart2 = document.querySelector(".heartPlayer2");
      playerHeart2.src = "img/heart.png";
      break;
    case 1:
      playerHeart1 = document.querySelector(".heartPlayer1");
      playerHeart1.src = "img/heart.png";
      break;
  }

  playerLife--;
}

//EQUALITY
function equalRound(){
  const drawPhrase = `Vous avez envoyé ${recoverMissilePlayer()} missiles. Atomisator a tiré ${randomBotStake} missiles. La manche doit être rejouée. <br/><br/> `;
  historicDiv.innerHTML += drawPhrase;
}

//RECOVER THE RESULT OF THE GAME
function lastResult(score){
  localStorage.setItem("citadelleStatut", score);
  window.location.href = '../victoryOver.html' 
}

//COMPARE THE LIFE OF PLAYER AND BOT
function lifeCompare (){
  if (playerLife > botLife){
    return "Victoire";

  } else if (playerLife < botLife){
    return "Game over";

  } else{
    return "Match nul";
  }
}



//CLICK ON FIRE BUTTON => CHECK VALUE IN INPUT DEPENDING ON 3 CONDITIONS------------------------------
const fireButton = document.querySelector(".fireButton");

fireButton.addEventListener("click", () => {
  if (typeof recoverMissilePlayer() === "number" && recoverMissilePlayer() >= 0 && recoverMissilePlayer() <= 100){ 

    //STAKE TO HIGHER
    if ((stockPlayer - recoverMissilePlayer()) < 0) {
      historicDiv.innerHTML += `Erreur : Vous ne pouvez pas miser plus que votre stock. <br/><br/>`;


    } else {
      if (recoverMissilePlayer() > randomBotStake) {
        winningRound();

      } else if (randomBotStake > recoverMissilePlayer()) {
        looseRound();

      } else if (recoverMissilePlayer() === randomBotStake) {
        equalRound();
      }

      stockBot -= randomBotStake;
      stockPlayer -= recoverMissilePlayer();
      divStockBot.innerHTML = `Stock : ${stockBot}`;
      divStockPlayer.innerHTML = `Stock : ${stockPlayer}`;
      randomBotStake = missilesNumberBot(stockBot);
    }

    document.querySelector(".inputMissiles").value = "";
   

    if (playerLife == 0 && botLife > 0) {
      lastResult("Game over");

    } else if (botLife == 0 && playerLife > 0){
      lastResult("Victoire");
  
    } else if ((stockPlayer+stockBot) == 0 || (playerLife+botLife)==0){
      result = lifeCompare();
      lastResult(result);
    }

  } else {
    historicDiv.innerHTML += `Erreur : mise possible entre 0 et 100. <br/><br/>`;
  }
});