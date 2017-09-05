
function HangmanGame(phraseList, lives) {
	this.alreadyGuessed = [];
	this.puzzle = new Puzzle(phraseList);
	this.lives = lives;
	this.wins = 0;
	var threatLevels = ["black", "red", "orange", "yellow", "green", "blue", "indigo", "violet"];
	var threatInverse = ["white", "blue", "indigo", "violet", "magenta", "red", "orange", "yellow"];
	this.updateScreen = function(){
		//display this.puzzle
		console.log(this.puzzle.board());
		console.log("Wins: " + this.wins);
		console.log("Already Guessed: " + this.alreadyGuessed.join(" "));
		console.log("Number of Incorrect Guesses Remaining: " + this.lives);
    document.querySelector("#board").innerHTML = this.puzzle.board();
    document.querySelector("#lives").innerHTML = "Incorrect guesses left: " + this.lives;
    document.querySelector("#guessed").innerHTML = "Already guessed: " + this.alreadyGuessed.join(" ");
    document.querySelector("#wins").innerHTML = "Wins: " + this.wins;
    document.querySelector(".jumbotron").style.background = threatLevels[this.lives];
    document.querySelector(".jumbotron").style.color = threatInverse[this.lives];
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
				if (this.lives < 1){
					return this.youLose();
				}else{
					return this.updateScreen();
				}
			}
			if(this.puzzle.board().indexOf("_") == -1) {
				return this.youWin();

			}else{
				return this.updateScreen();
			}
		}
	}

	this.youLose = function(){
		var answer = this.puzzle.phrase;
		var nextGame = this.newGame();
		document.querySelector(".jumbotron h1").innerHTML = "You Lose!";
		document.querySelector("#board").innerHTML = answer;
		document.onkeyup = function(){
			return nextGame;
		}
	}

	this.youWin = function(){
		this.wins ++;
		var answer = this.puzzle.phrase;
		var nextGame = this.newGame();
		document.querySelector(".jumbotron h1").innerHTML = "You Win!";
		document.querySelector("#board").innerHTML = answer;
		document.onkeyup = function(){
			return nextGame;
		}
	}


	this.newGame = function(){
		console.log("new puzzle!");
		this.puzzle = new Puzzle(phraseList);
		this.lives = lives;
		this.alreadyGuessed = [];
		document.querySelector(".jumbotron h1").innerHTML = "Hangman";
		return this.updateScreen();
	}
}


function Puzzle(phraseList){
	var x = Math.floor(Math.random()*phraseList.length);
	this.phrase = phraseList[x];
	this.length = this.phrase.length;
	this.letters = this.phrase.split("");
	this.currentSolution = this.letters.slice();
	for (var i = 0; i < this.length; i++){
		if (this.currentSolution[i] === " "){
			this.currentSolution[i] = " ";
		}else if(this.currentSolution[i] === "-"){
			this.currentSolution[i] = "-";
		}else if(this.currentSolution[i] === "'"){
			this.currentSolution[i] = "'";
		}else{
			this.currentSolution[i] = "_";
		}
	}
	this.board = function(){
		return this.currentSolution.join("");
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


var colorIdioms = ["a white lie","white noise","white as a sheet","white as a ghost","white-collar","a white flag","to whitewash something","white wine","a white Christmas","a white wedding","a white person","white-hot","a white paper","a white elephant","white as the driven snow","white with rage","to bleed someone white","showing the white feather","a white-knuckle ride","chasing the white dragon","that's mighty white of you","lily-white","white horses","wearing a white hat","white flight","white trash","whiter than white","a white pointer","to blackmail someone","to black out","a blackout","the blackout","black magic","the pot calling the kettle black","the black market","little black book","a black sheep","black gold","black tie","black humor","a black day","a blackleg","to be in black and white","to be black and white","in the black","a black mood","a black eye","to blacklist someone","to blackball someone","black and blue","a black look","as black as night","pitch black","a black person","black ops","black-hearted","a black mark","to blacken someone's name","the Black Death","a black rat","Black Friday","the black dog","beyond the black stump","in the red","a redhead","red light district","to see red","red with rage","turn red","a red herring","to paint the town red","a red flag","caught red-handed","roll out the red carpet","red tape","not one red cent","a red letter day","a scarlet woman","scarlet fever","red-hot","red card","a redskin","red alert","a red-blooded male","a redshift","like a red flag to a bull","red","bleed red ink","red in tooth and claw","redlining","redshirting","a red state","a redneck","a red bone","the red scare","the red eye","green with envy","the green-eyed monster","to give the green light","to be green","to be green","the green room","village green","to turn green","green around the gills","a greenbelt","greens","a green","a greengrocer","the grass is always greener on the other side","greener pastures","a greenhouse","the greenhouse effect","to greenwash something","little green men","as sure as God made little green apples","colorless green ideas sleep furiously","to have green fingers","to have a green thumb","a greenie","a green card","a greenhorn","greenbacks","yellow","a yellow streak","yellow-bellied","yellow journalism","a yellow card","the yellow peril","yellow fever","a yellow boy","yellow fever","a yellow bone","a yellow dog Democrat","out of the blue","a bolt from the blue","to be blue","a blue funk","the blues","a blue note","once in a blue moon","blue-collar","a blue blood","to talk a blue streak","to turn blue","blue with cold","until you're blue in the face","a blue law","blue chip stock","working blue","a blue movie","a blueprint","true blue","blue on blue","into the wild blue yonder","blue balls","to turn the air blue","between the devil and the deep blue sea","the boys in blue","the thin blue line","a blueshift","a blue state","a blue","to scream blue murder","a blue-eyed boy","having a blue","make a blue","a brown-noser","a brown out","in a brown study","brown bread","browned off","purple prose","born in the purple","the Purple Heart","a purple patch","agent orange","Orangemen","in the pink of health","tickled pink","a pinko","to see the world through rose-colored glasses","rosy","to get a pink slip","the pink pound","grey area","grey matter","to give someone grey hairs","gray market","the grey vote","grey nomads","the silver screen","a golden boy","a golden handshake","a golden parachute","the golden hour","golden ears","a golden shower","a golden mean","off-color","to show your true colors","a colorless person","colorful","colorful language","to pass with flying colors","local color","color commentary","a horse of a different color","a person of color","a country's colors"];

var phraseList = ["this is just a puzzle", "now another puzzle"];
var thisGame = new HangmanGame(colorIdioms, 7);

document.onkeypress = function(event){
	var guess = event.key;
	thisGame.takeTurn(guess);
}


