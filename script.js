const cards  = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) { 
        // [終了]：時間切れ
        return clearInterval(timer);
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({target: clickedCard}) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneIcon =cardOne.querySelector(".back-view i").classList.value,
        cardTwoIcon = cardTwo.querySelector(".back-view i").classList.value;
        matchCards(cardOneIcon, cardTwoIcon);
    }
}

function matchCards(icon1, icon2){
    if(icon1 === icon2){
        matchedCards++;
        if(matchedCards  == 6 && timeLeft > 0) {
            // [終了]：すべてのカードを当てられたとき
            return clearInterval(timer);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(()=>{
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },400)

    setTimeout(() => {
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne = cardTwo= "";
        disableDeck = false;
    }, 1200);
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer)
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;

    let arr = ["bxl-java", "bxl-go-lang", "bxl-tiktok", "bxl-php", "bxl-python", "bxl-c-plus-plus"];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() => {
            iconTag.classList.value = `bx ${arr[index % 6]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    })
}

shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);

console.log(cards.length)
cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});

