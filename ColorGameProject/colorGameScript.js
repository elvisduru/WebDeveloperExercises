//List of Colors
var colors = generateRandomColors(6);
var pickedColor = pickColor();
//Display the pickedColor
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var mediumBtn = document.querySelector("#mediumBtn");
var hardBtn = document.querySelector("#hardBtn");

//Loop though each square 
//      assign it a color from the colors array
//      add a click event listener
for(var i = 0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        var clickedColor = this.style.backgroundColor;
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);             //Changes all squares to the clickedColor
            h1.style.backgroundColor = clickedColor;
        }
        else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

//Change the color of ALL squares
function changeColors(color){
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//Pick a random color
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Generate array of random colors
function generateRandomColors(number){
    var array = [];
    for(var i = 0; i < number; i++){
        //get random color and push into array
        array.push(randomColor());
    }
    return array;
}

//Generates an RGB value of 0 - 255
function randomColor(){
    var r = Math.floor(Math.random() * 256); //r = Red
    var g = Math.floor(Math.random() * 256); //g = Green
    var b = Math.floor(Math.random() * 256); //b = Blue
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//Generate Random Colors,
//  Pick a new random color from array
//  change colors of squares
resetButton.addEventListener("click", function(){
    colors = generateRandomColors(6);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i ++){
        squares[i].style.background = colors[i];
    }
    h1.style.backgroundColor = "#232323";
    resetButton.textContent = "New Colors";
});

easyBtn.addEventListener("click",function(){
    easyBtn.classList.add("selected");
    mediumBtn.classList.remove("selected");
    hardBtn.classList.remove("selected");
});
mediumBtn.addEventListener("click",function(){
    easyBtn.classList.remove("selected");
    mediumBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
});
hardBtn.addEventListener("click",function(){
    easyBtn.classList.remove("selected");
    mediumBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
});