// $(document).ready(function () {//initialize game once the page starts up
window.onload = function () {//initialize game once the page starts up

    var games = ["deisitiny", "batetlefield", "zeleda"];//Created an array that has the words for the game

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z']; //created an array for the alphabet

    var game, chose, answers, wrong_key, userguess, count, reamining, wins, losses, lives, remaining_guesses, remaining_letters, alph;

    document.getElementById("next").style.visibility = "hidden";
    document.getElementsByClassName("img1").style.visibility = "hidden";

    document.getElementById("start").onclick = function start() {
        //------------------------VARIABLES----------------------------------------

        game = games[Math.floor(Math.random() * games.length)];//Randomly selected the word out of the array
        chosen = [];//empty array to put the letters in each word chosen at random by PC to later compare to what user inputs
        answers = [];//created an empty array to be used later for displaying the amount of letters in the word using underscore
        alph = [];
        wrong_key = 0;
        userguess = 0;
        count = 0;
        remaining = game.length;
        wins = 0;
        losses = 0;
        lives = 3;
        remaining_guesses = 5;

        //--------------------------------------------------------------------------

        //---------------------------LOOPS------------------------------------------
        for (var i = 0; i < game.length; i++) {     //split string of the word into characters to store in an array to later compare with the letter the user guessed
            chosen.push(game.charAt(i));
            answers[i] = "_";
        }
        remaining_letters = answers.length;//use length of array minus the amount of letters inside word

        //--------------------------------------------------------------------------

        //---------------------------MESSAGES---------------------------------------

        console.log("Length of array and underscores : " + answers.length + answers);
        console.log("array of word :" + chosen);
        console.log("chosen  word :" + game);
        document.getElementById("remains").innerHTML = remaining_letters;
        document.getElementById("guess").innerHTML = answers.join(" ");//switch the text from the div element to the amount of letter that user needs to guess and take out commas by using .join
        document.getElementById("remain").innerHTML = remaining_guesses;
        document.getElementById("lives").innerHTML = lives;

        //--------------------------------------------------------------------------
    }

    document.getElementById("next").onclick = function gaming() {
        game = games[Math.floor(Math.random() * games.length)];
        chosen = [];//empty array to put the letters in each word chosen at random by PC to later compare to what user inputs
        answers = [];//created an empty array to be used later for displaying the amount of letters in the word using underscore
        alph = [];//save the letters that have been guessed 
        wrong_key = 0;
        userguess = 0;
        count = 0;
        remaining = game.length;
        remaining_guesses = 5;
        for (var i = 0; i < game.length; i++) {     //split string of the word into characters to store in an array to later compare with the letter the user guessed
            chosen.push(game.charAt(i));
            answers[i] = "_";
        }
        remaining_letters = answers.length;//use length of array minus the amount of letters inside word

        //--------------------------------------------------------------------------

        //---------------------------MESSAGES---------------------------------------

        console.log("Length of array and underscores : " + answers.length + answers);
        console.log("array of word :" + chosen);
        console.log("chosen  word :" + game);
        document.getElementById("remains").innerHTML = remaining_letters;
        document.getElementById("guess").innerHTML = answers.join(" ");//switch the text from the div element to the amount of letter that user needs to guess and take out commas by using .join
        document.getElementById("remain").innerHTML = remaining_guesses;
        document.getElementById("lives").innerHTML = lives;
        document.getElementById("next").style.visibility = "hidden";
       


    }

    document.getElementById("restart").onclick = start;

    document.onkeyup = function (event) {//user presses a key
 
        var letter = String.fromCharCode(event.which).toLocaleLowerCase();//created a variable to store the users input and change it to lower case
        wrong_key = alphabet.indexOf(letter);//compares the letter pressed to the array alphabet
        userguess = chosen.indexOf(letter);
        console.log(alph);
        console.log("guessed letter :" + letter);
        console.log("position of letter in array :" + userguess);

        if (wrong_key == -1) {//if the button pressed by user is not a letter it will alert them
            alert("Try using a letter in the human alphabet");
        }

        if (userguess != -1) { //if the user guessed letter is in the word

            for (var j = 0; j < game.length; j++) {//runs through the array of the word chosen comparing it to the letter guessed, replacing the letter in the correct position
                
                if (game[j] === letter && alph.indexOf(letter) == -1) {
                    answers[j] = letter;
                    count++;
                    remaining_letters = game.length - count; //stores the amount of letters remaining according to the user guess and the letters in the word
                } else {
                    remaining_letters = game.length - count;
                    
                }
            }
            alph.push(letter);
            
            if (remaining_letters == 0 && remaining_guesses > 0) {
                wins++;
                answers = [];
                chosen = [];
                document.getElementById("wins").innerHTML = wins;
                document.onkeyup = null;
                document.getElementById("next").style.visibility = "visible";
            }

            alert("You guessed it!!");
            console.log("amount of letters in word :" + count);
            console.log("amount of letters remaining :" + remaining_letters);
            console.log("array of answer with letter guessed : " + answers);
            document.getElementById("guess").innerHTML = answers.join(" ");//reaplaces the underscore with the right letter
            document.getElementById("remains").innerHTML = remaining_letters;
        }

        if (userguess == -1 && remaining_guesses > 0 ) { //if the user guessed letter is used in the word
            alert("WRONG GUESS!!");
            remaining_guesses--;
            document.getElementById("remain").innerHTML = remaining_guesses;
            if (remaining_guesses == 0) {
                lives--;
                document.getElementById("next").style.visibility = "visible";
                document.getElementById("lives").innerHTML = lives;
                if (lives == 0) {
                    document.getElementById("next").style.visibility = "hidden";
                    alert("You lost!!!");
                    answers = [];
                }
            }

        }


    }

}
