const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
updateResult();

document.querySelector('.js-rock-button')
 .addEventListener('click', ()=>{
    playGame('Rock');
 });

 document.querySelector('.js-paper-button')
 .addEventListener('click', ()=>{
    playGame('Paper');
 });

 document.querySelector('.js-scissors-button')
 .addEventListener('click', ()=>{
    playGame('Scissors');
 });

 document.querySelector('.js-autoplay')
 .addEventListener('click', ()=>{
    autoPlay();
 });

 document.querySelector('.js-reset-button')
  .addEventListener('click', () =>{
    showResetConfirmation();
  })

 document.body.addEventListener('keydown', (event) =>{
    if (event.key === 'r') {
        playGame('Rock');
    } else 
    if (event.key === 'p') {
        playGame('Paper')
    } else
    if (event.key === 's') {
        playGame('Scissors');
    } else 
    if (event.key === 'a') {
        autoPlay();
    } else
    if (event.key === 'Backspace') {
       
        showResetConfirmation();
    
    }
 })


function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
        } else
    if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove  = 'Paper'
        } else 
    if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissors'
    };
    return computerMove;
};
    let isAutoplaying = false;
    let intervalId;

function autoPlay() {
     if (!isAutoplaying){
         intervalId = setInterval(()=>{
           const playerMove = pickComputerMove();
           playGame(playerMove);   
        }, 1000);

    isAutoplaying = true;

    document.querySelector('.js-autoplay')
     .innerHTML = 'Stop Playing'
} else {

    clearInterval(intervalId);
    isAutoplaying = false;

    document.querySelector('.js-autoplay')
     .innerHTML = 'Auto Play'
};
}
function playGame (playerMove){
    let computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Rock'){

        if (computerMove === 'Rock') {
            result = 'Tie.'
        } else
        if (computerMove === 'Paper') {
            result = 'You lose.'
        } else 
        if (computerMove === 'Scissors') {
            result = 'You win.'
        };
    } else 

    if ( playerMove === 'Paper') {

        if (computerMove === 'Rock') {
            result = 'You win.'
        } else
        if (computerMove === 'Paper') {
            result = 'Tie.'
        } else 
        if (computerMove === 'Scissors') {
            result = 'You lose.'
        };
    } else 

    if (playerMove === 'Scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose.'
        } else
        if (computerMove === 'Paper') {
            result = 'You win.'
        } else 
        if (computerMove === 'Scissors') {
            result = 'Tie.'
        };
    };

    if (result === 'You win.') {
        score.wins +=1;
    } else 
    if (result ==='You lose.') {
        score.losses +=1;
    } else
    if (result === 'Tie.') {
        score.ties +=1;
    };
    
   localStorage.setItem('score',JSON.stringify(score));

   document.querySelector('.js-result')
    .innerHTML = result;
   
  updateResult();

  document.querySelector('.js-moves')
   .innerHTML = `You <image src="images/${playerMove}-emoji.png" class="move-image">  <image src="images/${computerMove}-emoji.png" class="move-image"> Computer`;

}

function updateResult(){
document.querySelector('.js-score')
 .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Tie: ${score.ties}`
};

function resetButton(){
  score.wins = 0,
  score.losses = 0,
  score.ties = 0

  localStorage.removeItem('score'); 
  updateResult();
};

function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button> `;

document.querySelector('.js-reset-confirm-yes')
.addEventListener('click', () => {
  resetButton();
  hideResetConfirmation();
});

document.querySelector('.js-reset-confirm-no')
.addEventListener('click', () => {
   hideResetConfirmation();
});
};

function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }
