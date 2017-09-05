
function Puzzle(phraseList){
	var x = Math.floor(Math.random()*phraseList.length);
	this.phrase = phraseList[x];
	this.length = this.phrase.length;
	this.letters = this.phrase.split("");
	this.currentSolution = this.letters.slice();
	for (var i = 0; i < this.length; i++){
		if (this.currentSolution[i] === " "){
			//do nothing;
		}else{
			this.currentSolution[i] = "_";
		}
	}
	this.board = function(){
		return this.currentSolution.join(" ");
	}
	this.guess = function(char){
		var matches = 0;
		for (var n = 0; n < this.length; n++){
			if (this.letters[n].toLowerCase() === char.toLowerCase()){
				this.currentSolution[n] = this.letters[n];
				matches ++;
			}
		}
		console.log(matches);
		return matches;
	}
	
}


function HangmanGame(phraseList, lives) {
	this.alreadyGuessed = [];
	this.puzzle = new Puzzle(phraseList);
	this.lives = lives;
	this.wins = 0;
	this.updateScreen = function(){
		//display this.puzzle
		console.log(this.puzzle.board());
		console.log("Wins: " + this.wins);
		console.log("Already Guessed: " + this.alreadyGuessed.join(" "));
		console.log("Number of Incorrect Guesses Remaining: " + this.lives);
	}

	this.legalMove = function(char){
		return /\w/.test(char) && !(this.alreadyGuessed.includes(char.toLowerCase()));
	}

	this.takeTurn = function(event){
		var letter = event;//replace with keypress event
		if (!this.legalMove(letter)){
			console.log("illegal move");
			return;
			//do nothing
		}else{
			var guess = this.puzzle.guess(letter);
			this.alreadyGuessed.push(letter.toLowerCase());
			if (guess == 0){
				this.lives --;
				return this.updateScreen();
			}else if(this.puzzle.board().indexOf("_") == -1) {
				console.log("You win!");
				this.wins ++;
				return this.newGame();
			}else if (this.lives < 1){
				console.log("Game Over -- You Lose");
				return this.newGame();
			}else{
				return this.updateScreen();
			}
		}
	}

	this.newGame = function(){
		console.log("new puzzle!");
		this.puzzle = new Puzzle(phraseList);
		this.lives = lives;
		this.alreadyGuessed = [];
		return this.updateScreen();
	}



}



var game = new HangmanGame(["this is just a puzzle", "now another puzzle"], 7);
game.updateScreen();
game.takeTurn("z");
game.takeTurn("u");
game.takeTurn("p");
game.takeTurn("l");
game.takeTurn("t");
game.takeTurn("e");
game.takeTurn("h");
game.takeTurn("z");
game.takeTurn("+");
game.takeTurn("i");
game.takeTurn("s");
game.takeTurn("n");
game.takeTurn("o");
game.takeTurn("w");
game.takeTurn("j");
game.takeTurn("q");
game.takeTurn("y");
game.takeTurn("a");
game.takeTurn("x");
game.takeTurn("b");






// var puzzle = new Puzzle(["this is just a puzzle", "now another puzzle"]);
// console.log(puzzle.phrase);
// console.log(puzzle.length);
// console.log(puzzle.letters);
// console.log(puzzle.board());
// console.log(puzzle.guess("e"));
// console.log(puzzle.guess("z"));
// console.log(puzzle.guess("k"));
// console.log(puzzle.guess("e"));
// console.log(puzzle.guess("p"));
// console.log(puzzle.guess("u"));
// console.log(puzzle.guess("l"));
// console.log(puzzle.guess("x"));
// console.log(puzzle.board());
