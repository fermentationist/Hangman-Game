
var gameOver = false;
function HangmanGame(phraseList, lives) {
	this.alreadyGuessed = [];
	this.puzzle = new Puzzle(phraseList);
	this.lives = lives;
	this.wins = 0;
	this.losses = 0;
	// var gameOver = false;
	var threatLevels = ["black", "red", "orange", "#FFCA00", "#7D9F5D", "#1D669D", "indigo", "violet"];
	var threatInverse = ["white", "#00BFD8", "indigo", "violet", "magenta", "red", "orange", "yellow"];

	this.randomComplements = function(){
		var red = Math.floor(Math.random() * 255) + 1;
		var green = Math.floor(Math.random() * 255) + 1;
		var blue = Math.floor(Math.random() * 255) + 1;

		var rComp = 255 - red;
		var gComp = 255 - green;
		var bComp = 255 - blue;

		function convert(dec){//convert numbers between 0 and 255 to hex string
		  var a = Math.floor(dec/16);
		  var b = dec%16;
		  var f = function(x){
		    switch(x){
		      case 10:
		        x = "A";
		        break;
		      case 11:
		        x = "B";
		        break;
		      case 12:
		        x = "C";
		        break;
		      case 13:
		        x = "D";
		        break;
		      case 14:
		        x = "E";
		        break;
		      case 15:
		        x = "F";
		        break;
		      case 16:
		        x = "G";
		        break;
		      default:
		        x = x.toString();
		    }
		    return x;
		  } 
		  return (f(a) + f(b));
		}
		var color = "#" + (convert(red) + convert(green) + convert(blue));
		var complement = "#" + (convert(rComp) + convert(gComp) + convert(bComp));
		return [color,complement];
	}

	this.colorArrays = function(){
		var bg = ["black"];
		var fg = ["white"];
		for(var q = 0; q < 7; q ++){
			var rndComp = this.randomComplements();
			bg.push(rndComp[0]);
			fg.push(rndComp[1]);
		}
		return [bg,fg];
	}

	var newColorSet = this.colorArrays();

	this.backgroundColors = newColorSet[0];
	this.textColors = newColorSet[1];

	this.updateScreen = function(){
		//display this.puzzle
		console.log(this.puzzle.board());
		console.log("Wins: " + this.wins);
		console.log("Already Guessed: " + this.alreadyGuessed.join(" "));
		console.log("Number of Incorrect Guesses Remaining: " + this.lives);
		console.log("this.randomComplements() = ", this.randomComplements());
    document.querySelector("#board").innerHTML = this.puzzle.board();
    document.querySelector("#lives").innerHTML = "Guesses left: " + this.lives;
    document.querySelector("#guessed").innerHTML = this.alreadyGuessed.join(" ");
    document.querySelector("#wins").innerHTML = "Wins: " + this.wins;
    document.querySelector("#losses").innerHTML = "Losses: " + this.losses;
    document.querySelector(".jumbotron").style.background = this.backgroundColors[this.lives];//threatLevels[this.lives];
    document.querySelector(".jumbotron").style.color = this.textColors[this.lives];//threatInverse[this.lives];
	}

	this.legalMove = function(char){
		return !(this.alreadyGuessed.includes(char));
	}

	this.takeTurn = function(letter){
		if (gameOver){
			return;
		}
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
					this.updateScreen();
					this.losses++;
					return this.gameOverScreen("Lose");
				}else{
					return this.updateScreen();
				}
			}
			if(this.puzzle.board().indexOf("_") == -1) {
				this.wins++;
				return this.gameOverScreen("Win");
			}else{
				return this.updateScreen();
			}
		}
	}

	this.gameOverScreen = function(winStr){
		var answer = this.puzzle.phrase;
		document.querySelector(".jumbotron h1").style.display = "block";
		document.querySelector(".jumbotron h1").style.paddingBottom = "20px";
		document.querySelector(".jumbotron h1").innerHTML = "You " + winStr + "!";
		document.querySelector("#board").innerHTML = answer;
		document.querySelector("#hiddenInput").blur(); 
		document.querySelector("#button").style.display = "initial";
		document.querySelector("#button").focus();
		gameOver = true;

		return;
	}

	this.newGame = function(){
		document.querySelector("#hiddenInput").innerHTML = ""; 
		gameOver = false;
		document.querySelector("#button").style.display = "none";
		document.querySelector(".jumbotron h1").innerHTML = "Hangman";
		this.updateScreen();
		console.log("new puzzle!");
		this.puzzle = new Puzzle(phraseList);
		this.lives = lives;
		this.alreadyGuessed = [];
		var newColorSet = this.colorArrays();
		this.backgroundColors = newColorSet[0];
		this.textColors = newColorSet[1];
		return this.updateScreen();
	}


}


function Puzzle(phraseList){
	var x = Math.floor(Math.random() * phraseList.length);
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

//tricks virtual keyboard on mobile devices to open, by selecting a hidden input field
function openKeyboard(){
	document.querySelector("#hiddenInput").select(); 
	document.querySelector(".jumbotron h1").style.display = "none";
}

//this detects keystrokes from hard keyboard and iPhone virtual keyboard
document.onkeypress = function(event){
	var guess = event.key.toLowerCase();
	var code = event.keyCode;
	if (gameOver == true && code == 13){
		return thisGame.newGame();
	}
	return submitGuess(guess, code);
}

//android workaround - oninput.data, then backspace after each keystroke// 
document.oninput = function(event){
	var guess = event.data.toLowerCase();
	var code = guess.charCodeAt();
	return submitGuess(guess, code);
}

//needed for Android workaround
function simulatedBackspace(){
	document.querySelector("#hiddenInput").select(); 
	document.querySelector("#hiddenInput").value = ""; 
}

// $('#hiddenInput').on('keyup', function( event ){
// 	var guess = $(this).val().split('').pop().toLowerCase();
// 	var code = guess.charCodeAt();
// 	return submitGuess(guess, code);
// });

function submitGuess(guess, code){
	simulatedBackspace();
	if (code >= 97 && code <= 122){
		return thisGame.takeTurn(guess);
	}
}




var colorIdioms = ["a white lie","white noise","white as a sheet","white as a ghost","white-collar",
"a white flag","to whitewash something","white wine","a white Christmas","a white wedding","white-hot",
"a white paper","a white elephant","white as the driven snow","white with rage","to bleed someone white",
"showing the white feather","a white-knuckle ride","chasing the white dragon","lily-white","white horses",
"wearing a white hat","white trash","whiter than white","a white pointer","to blackmail someone",
"to black out","a blackout","the blackout","black magic","the pot calling the kettle black",
"the black market","little black book","a black sheep","black gold","black tie","black humor",
"a black day","a blackleg","to be in black and white","to be black and white","in the black",
"a black mood","a black eye","to blacklist someone","to blackball someone","black and blue",
"a black look","as black as night","pitch black","black ops","black-hearted","a black mark",
"to blacken someone's name","the Black Death","a black rat","Black Friday","the black dog",
"beyond the black stump","in the red","a redhead","red light district","to see red","red with rage",
"turn red","a red herring","to paint the town red","a red flag","caught red-handed",
"roll out the red carpet","red tape","not one red cent","a red letter day","a scarlet woman",
"scarlet fever","red-hot","red card","red alert","a red-blooded male","a redshift",
"like a red flag to a bull","red","bleed red ink","red in tooth and claw","redlining","redshirting",
"a red state","a redneck","a red bone","the red scare","the red eye","green with envy",
"the green-eyed monster","to give the green light","to be green","to be green","the green room",
"village green","to turn green","green around the gills","a greenbelt","greens","a green","a greengrocer",
"the grass is always greener on the other side","greener pastures","a greenhouse","the greenhouse effect",
"to greenwash something","little green men","as sure as God made little green apples",
"colorless green ideas sleep furiously","to have green fingers","to have a green thumb","a greenie",
"a green card","a greenhorn","greenbacks","yellow","a yellow streak","yellow-bellied","yellow journalism",
"a yellow card","yellow fever","yellow fever","a yellow bone","a yellow dog Democrat","out of the blue",
"a bolt from the blue","to be blue","a blue funk","the blues","a blue note","once in a blue moon",
"blue-collar","a blue blood","to talk a blue streak","to turn blue","blue with cold",
"until you're blue in the face","a blue law","blue chip stock","working blue",
"a blue movie","a blueprint","true blue","blue on blue","into the wild blue yonder","blue balls",
"to turn the air blue","between the devil and the deep blue sea","the boys in blue","the thin blue line",
"a blueshift","a blue state","a blue","to scream blue murder","a blue-eyed boy","having a blue",
"make a blue","a brown-noser","a brown out","in a brown study","brown bread","browned off","purple prose",
"born in the purple","the Purple Heart","a purple patch","agent orange","Orangemen",
"in the pink of health","tickled pink","a pinko","to see the world through rose-colored glasses","rosy",
"to get a pink slip","the pink pound","gray area","gray matter","to give someone gray hairs","gray market",
"the gray vote","gray nomads","the silver screen","a golden boy","a golden handshake","a golden parachute",
"the golden hour","golden ears","a golden shower","a golden mean","off-color","to show your true colors",
"colorful","colorful language","to pass with flying colors","local color",
"color commentary","a horse of a different color","a country's colors"];

var thisGame = new HangmanGame(colorIdioms, 6);


