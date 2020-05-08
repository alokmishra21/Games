var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var lives = 3;
var score = 0;
var speed = 2;
var foodRadius = 8;

var rightPressed = false;
var leftPressed = false;
var upPressed = true;
var downPressed = false;

var snake_length = 12;
var snake_width = 8;
var len_factor = 4;
var snake_orientation = 0;

var foodX = Math.random() * canvas.width;
var foodY = Math.random() * canvas.height;
var snakeX = canvas.width / 2.0;
var snakeY = canvas.height / 2.0;

function generateFoodCoord()
{
	foodX = Math.random() * canvas.width;
	foodY = Math.random() * canvas.height;
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawSnake()
{
	ctx.beginPath();
	if (upPressed) // UP
	{
		ctx.rect(snakeX, snakeY, 1 * snake_width, snake_length);
		snakeY -= speed;
		if (snakeY == 0)
			snakeY = canvas.height - snake_length;
	}
	else if (downPressed) // Down
	{
		ctx.rect(snakeX, snakeY - snake_length, 1 * snake_width, snake_length);
		snakeY += speed;
		if (snakeY == canvas.height)
			snakeY = snake_length;
	}
	else if (leftPressed) // Left
	{
		ctx.rect(snakeX, snakeY, snake_length, 1 * snake_width);
		snakeX -= speed;
		if (snakeX == 0)
			snakeX = canvas.width - snake_length;
	}
	else // right
	{
		ctx.rect(snakeX - snake_length, snakeY, snake_length, 1 * snake_width);
		snakeX += speed;
		if (snakeX == canvas.width)
			snakeX = 0;
	}

	ctx.fillStyle = "#004150"
	ctx.fill();
	ctx.closePath();
}


document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

function drawFood() {
	ctx.beginPath();
	ctx.arc(foodX, foodY, foodRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
    // drawing code
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFood();
	drawSnake();
	drawScore();
	drawLives();

	// snake eat food
	if (snakeX >= foodX - snake_width && 
		snakeX <= foodX + snake_width && 
		snakeY >= foodY - snake_width &&
		snakeY <= foodY + snake_width) {
		generateFoodCoord();
		snake_length += len_factor;
		score++;
	}

	// drawSanke();
			    // alert("GAME OVER");
			    // document.location.reload();
			    // requestAnimationFrame(draw); // Needed for Chrome to end game
	requestAnimationFrame(draw);
	}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        leftPressed = upPressed = downPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
        upPressed = downPressed = rightPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
        leftPressed = rightPressed = downPressed = false;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
        leftPressed = rightPressed = upPressed = false;
    }
}

// function keyUpHandler(e) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = false;
//     }
//     else if(e.key == "Up" || e.key == "ArrowUp") {
//         upPressed = false;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         downPressed = false;
//     }

// }

draw();
