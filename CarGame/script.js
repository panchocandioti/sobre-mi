var blockSize = 25;
var total_row = 17; //total row number
var total_col = 17; //total column number
var board;
var context;

let carX = 0;
let carY = 1;

// Set the total number of rows and columns
var speedX = 0; //speed of car in x coordinate.
var speedY = 0; //speed of car in Y coordinate.

var car = [];

var gameOver = false;

let level = 1;
let lap = 0;
let vidas = 3;
let puntos = 0;
let activarPuntaje = false;

let intervalID;
let intervalo = 400;

jugar();

function jugar() {
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");
	document.addEventListener("keyup", changeDirection);
	setSpeed(); // Llamada a la función para establecer velocidad
}

//Cambio de la velocidad
function setSpeed() {
	clearInterval(intervalID); // Detener el intervalo actual
	intervalo -= 60; // Reducir el intervalo en 10 milisegundos
	intervalID = setInterval(update, intervalo);
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "blue";
	context.fillRect(0, 0, board.width, board.height);

	//línea de llegada
	context.fillStyle = "lightgreen";
	context.fillRect(blockSize * 8, 0, blockSize, blockSize * 3);

	// Dibuja el primer circuito
	context.fillStyle = "black";
	context.fillRect(blockSize * 3, blockSize * 3, (board.width - (blockSize * 6)), (board.height - (blockSize * 6)));

	if (level > 1) {
		context.fillStyle = "brown";
		context.fillRect(0, blockSize * 14, blockSize * 2, blockSize * 2);
		context.fillRect(blockSize * 15, blockSize * 5, blockSize * 2, blockSize * 2);
	}

	if (level > 2) {
		context.fillStyle = "grey";
		context.fillRect(blockSize * 5, blockSize * 15, blockSize * 2, blockSize * 2);
		context.fillRect(blockSize * 14, blockSize * 13, blockSize * 1, blockSize * 2);
	}

	//Update Position Car
	car[0] = [carX, carY];
	context.fillStyle = "white";
	carX += speedX * blockSize; //updating car position in X coordinate.
	carY += speedY * blockSize; //updating car position in Y coordinate.
	context.fillRect(carX, carY, blockSize, blockSize);
	isOUT();
	isCrash();
	isLap();

	//Update points
	if (activarPuntaje) {
		puntos += level * 10;
		document.getElementById("puntos").innerHTML = "Puntos: " + puntos;
	}
	document.getElementById("vidas").innerHTML = "Vidas: " + vidas;
}

// Movement of the car - We are using addEventListener
function changeDirection(e) {
	activarPuntaje = true;
	if (e.code == "ArrowUp" && speedY != 1) {
		// If up arrow key pressed with this condition...
		// car will not move in the opposite direction
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		//If down arrow key pressed
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		//If left arrow key pressed
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		//If Right arrow key pressed
		speedX = 1;
		speedY = 0;
	}
}

function isOUT() {
	if (carX < 0
		|| carX > total_col * blockSize
		|| carY < 0
		|| carY > total_row * blockSize) {

		// Out of bound condition
		pierdeVida();
	}
}

function isCrash() {
	if (carX > blockSize * 2
		&& carX < board.width - 3 * blockSize
		&& carY > blockSize * 2
		&& carY < board.height - 3 * blockSize) {
		pierdeVida();
	}

	if (level > 1) {
		if ((carX >= 0 && carX <= blockSize && carY >= 14 * blockSize && carY <= 15 * blockSize)
			|| (carX >= 15 * blockSize && carX <= 16 * blockSize && carY >= 5 * blockSize && carY <= 6 * blockSize)) {
			pierdeVida();
		}
	}

	if (level > 2) {
		if ((carX >= 5 * blockSize && carX <= 6 * blockSize && carY >= 15 * blockSize && carY <= 16 * blockSize)
			|| (carX === 14 * blockSize && carY >= 13 * blockSize && carY <= 14 * blockSize)) {
			pierdeVida();
		}
	}
}

function isLap() {
	if (carX === blockSize * 8
		&& carY < blockSize * 4) {
		lap += 1;
	}

	document.getElementById("vuelta").innerHTML = "Vuelta: " + lap;

	if (lap === 3 && level <= 3) {
		level += 1;
		let audiofestejo = document.getElementById("festejo");
		audiofestejo.src = "./multimedia/festejo.mp3";
		audiofestejo.play();
		puntos += level * 3000;
		lap = 0;
		jugar();
	}

	document.getElementById("nivel").innerHTML = "Nivel: " + level;

	if (level > 3) {
		let audiofestejo = document.getElementById("festejo");
		audiofestejo.src = "./multimedia/festejo.mp3";
		audiofestejo.play();
		document.getElementById("contenedor").innerHTML = "";
		document.getElementById("canvas").innerHTML = "Puntaje final: " + puntos;
		document.getElementById("instrucciones").innerHTML = "El puntaje final contempla vidas perdidas, nivel alcanzado y recorrido logrado en dicho nivel";
		gameOver = true;
		alert("¡GANASTE! ¡CAMPEÓN!");
	}
}

function pierdeVida() {
	vidas -= 1;
	puntos = parseInt(puntos/2);

	let audionovalido = document.getElementById("novalido");
	audionovalido.src = "./multimedia/novalido.mp3";
	audionovalido.play();

	if (vidas <= 0) {
		gameOver = true;
		alert("¡Game Over!")
	} else {
		carX = 0;
		carY = 0;
		speedX = 0;
		speedY = 1;
		alert("¡Perdiste una vida!");
	}
}