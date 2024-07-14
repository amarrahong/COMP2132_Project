class DiceGame {
    constructor() {
        this.playerTotalScore = 0;
        this.computerTotalScore = 0;
        this.round = 0;
        this.rollButton = document.getElementById('roll-button');
        this.resetButton = document.getElementById('reset-button');
        this.playerDice = document.getElementById('player-dice');
        this.computerDice = document.getElementById('computer-dice');
        this.playerRoundScoreElem = document.getElementById('player-round-score');
        this.computerRoundScoreElem = document.getElementById('computer-round-score');
        this.playerTotalScoreElem = document.getElementById('player-total-score');
        this.computerTotalScoreElem = document.getElementById('computer-total-score');
        this.resultElem = document.getElementById('result');

        this.rollButton.addEventListener('click', () => this.rollDice());
        this.resetButton.addEventListener('click', () => this.resetGame());
    }

    rollDice() {
        if (this.round >= 3) return;
        
        const playerRoll = this.getRoll();
        const computerRoll = this.getRoll();

        this.displayDice(this.playerDice, playerRoll);
        this.displayDice(this.computerDice, computerRoll);

        const playerRoundScore = this.calculateScore(playerRoll);
        const computerRoundScore = this.calculateScore(computerRoll);

        this.playerTotalScore += playerRoundScore;
        this.computerTotalScore += computerRoundScore;

        this.updateScores(playerRoundScore, computerRoundScore);

        this.round++;
        
        if (this.round === 3) {
            this.displayWinner();
        }
    }

    getRoll() {
        return [this.randomDice(), this.randomDice()];
    }

    randomDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    displayDice(element, roll) {
        element.innerHTML = '';
        roll.forEach(dice => {
            const img = document.createElement('img');
            img.src = `../public/images/dice${dice}.png`;
            element.appendChild(img);
        });
    }

    calculateScore(roll) {
        const [a, b] = roll;
        if (a === 1 || b === 1) {
            return 0;
        }
        if (a === b) {
            return (a + b) * 2;
        }
        return a + b;
    }

    updateScores(playerRoundScore, computerRoundScore) {
        this.playerRoundScoreElem.textContent = playerRoundScore;
        this.computerRoundScoreElem.textContent = computerRoundScore;
        this.playerTotalScoreElem.textContent = this.playerTotalScore;
        this.computerTotalScoreElem.textContent = this.computerTotalScore;
    }

    displayWinner() {
        let winner = '';
        if (this.playerTotalScore > this.computerTotalScore) {
            winner = 'Player wins!';
        } else if (this.computerTotalScore > this.playerTotalScore) {
            winner = 'Computer wins!';
        } else {
            winner = 'It\'s a tie!';
        }
        this.resultElem.textContent = winner;
    }

    resetGame() {
        this.playerTotalScore = 0;
        this.computerTotalScore = 0;
        this.round = 0;
        this.playerRoundScoreElem.textContent = 0;
        this.computerRoundScoreElem.textContent = 0;
        this.playerTotalScoreElem.textContent = 0;
        this.computerTotalScoreElem.textContent = 0;
        this.playerDice.innerHTML = '';
        this.computerDice.innerHTML = '';
        this.resultElem.textContent = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DiceGame();
});
