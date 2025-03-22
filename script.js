let playerChoices = {
    player1: null,
    player2: null,
};

let roundResults = [];
const totalRounds = 10;

function makeChoice(player, choice) {
    playerChoices[player] = choice;

    if (player === 'player1') {
        document.getElementById('player1').style.display = 'none';
        document.getElementById('player2').style.display = 'block';
        document.getElementById('round-result').textContent = `Player 1 chose ${choice}. Waiting for Player 2...`;
    } else if (player === 'player2') {
        document.getElementById('player2').style.display = 'none';
        document.getElementById('round-result').textContent = `Player 2 chose ${choice}. Calculating result...`;

        fetch('/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerChoices),
        })
        .then(response => response.json())
        .then(data => {
            roundResults.push(data.result);
            document.getElementById('round-result').textContent = `Player 1 chose ${playerChoices.player1}, Player 2 chose ${playerChoices.player2}. ${data.result}`;
            
            if (roundResults.length >= totalRounds) {
                displayFinalResult();
            } else {
                resetRound();
            }
        });
    }
}

function resetRound() {
    playerChoices.player1 = null;
    playerChoices.player2 = null;
    document.getElementById('player1').style.display = 'block';
    document.getElementById('player2').style.display = 'none';
}

function displayFinalResult() {
    const gameDiv = document.getElementById('game');
    const finalResultDiv = document.getElementById('final-result');
    
    gameDiv.style.display = 'none';
    finalResultDiv.style.display = 'block';
    
    const player1Wins = roundResults.filter(result => result === "Player 1 wins!").length;
    const player2Wins = roundResults.filter(result => result === "Player 2 wins!").length;
    const ties = roundResults.filter(result => result === "It's a tie!").length;
    
    document.getElementById('result').textContent = `Final Score: Player 1 - ${player1Wins}, Player 2 - ${player2Wins}, Ties - ${ties}`;
}