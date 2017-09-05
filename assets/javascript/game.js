
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
		console.log(char);
		// for (var n = 0; n < this.length; n++){
		// 	if (this.letters[n].toLowerCase() === char.toLowerCase()){
		// 		this.currentSolution[n] = this.letters[n];
		// 		matches ++;
		// 	}
		// }
		// return matches;
	}
	
}


function HangmanGame(phraseList, lives, wins) {
	this.alreadyGuessed = [];
	this.puzzle = new Puzzle(phraseList);
	this.lives = lives;
	this.wins = wins;
	this.updateScreen = function(){
		//display this.puzzle
		console.log(this.puzzle.board());
		console.log("Wins: " + this.wins);
		console.log("Already Guessed: " + this.alreadyGuessed.join(" "));
		console.log("Number of Incorrect Guesses Remaining: " + this.lives);
	}

	this.legalMove = function(char){
		return /\w/.test(char) && !(char.toLowerCase() in this.alreadyGuessed);//&
	}

	this.takeTurn = function(event){
		var letter = event;//replace with keypress event
		console.log("event = " + event);
		if (!this.legalMove(letter)){
			return;
			//do nothing
		}else{
			var guess = this.puzzle.guess();
			this.alreadyGuessed.push(letter.toLowerCase());
			if (guess == 0){
				this.lives --;
				return this.updateScreen();
			}
			if(this.puzzle.board().indexOf("_") == -1) {
				console.log("You win!");
				this.wins ++;
				return this.updateScreen();
			}
		}

	}
}



var game = new HangmanGame(["this is just a puzzle", "now another puzzle"], 7, 0);
game.updateScreen();
game.takeTurn("z");





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
