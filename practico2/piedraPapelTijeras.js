//Reconoce el click del botón JUGAR
let botonjugar = document.getElementById("jugar");
botonjugar.addEventListener("click", checkValues);

//Función para validar el ingreso del nombre
function checkValues() {
    let nombre = document.getElementById("nombre").value;
    let formatonombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    let validacion = true;

    //Mensaje de alerta si no se ingresa un nombre válido o está vacío
    if (!formatonombre.test(nombre)) {
        alert("Por favor, ingresá un nombre");
        validacion = false;
    }
    //Reemplaza los encabezados del juego para empezar a jugar
    if (validacion) {
        document.getElementById("descripcion").innerHTML = "¡A jugar, " + nombre + ", elegí una opción!";
        document.getElementById("formulario").innerHTML = "";
        escribirNombre(nombre);
    }
}

function escribirNombre(nombre) {
console.log(nombre);
}
/*
//Definición de constantes
const piedra = "piedra";
const papel = "papel";
const tijeras = "tijeras";


//Obtener jugada de la computadora
function obtenerJugadaComputadora() {
    let listaJugadas = [piedra, papel, tijeras];
    let jugadaNumeroCompu = Math.floor(Math.random() * 3);
    let jugadaComputadora = listaJugadas[jugadaNumeroCompu];
    return jugadaComputadora;
}

function jugadaPiedra() {
    let jugadaUsuario = piedra;
    return jugadaUsuario;
}

function jugadaPapel() {
    let jugadaUsuario = papel;
    return jugadaUsuario;
}

function jugadaTijeras() {
    let jugadaUsuario = tijeras;
    return jugadaUsuario;
}

/*obtenerJugadaComputadora()
console.log(jugadaComputadora + " compu");
console.log(jugadaUsuario + " usuario");


/*
//Jugar partido con tanteador
let puntosComputadora = 0;
let puntosUsuario = 0;
let terminar = false;

//while (terminar === false) {
    let jugadaComputadora = obtenerJugadaComputadora();
    let jugadaUsuario = obtenerJugadaUsuario();
    let resultado = determinarGanador(jugadaComputadora, jugadaUsuario, nombre);
    if (resultado === "Gana la compu") {
        puntosComputadora += 1
    } else if (resultado === "Gana " + nombre) {
        puntosUsuario += 1
    }
    document.getElementById("descripcion").innerHTML = resultado;
    document.getElementById("formulario").innerHTML = nombre + ": " + puntosUsuario + "  |  Computadora: " + puntosComputadora;

    /*if (puntosComputadora > 3 && puntosUsuario > 3) {
        terminar = true;
    }

}

let resultadoPartido;
if (puntosComputadora > puntosUsuario) {
    resultadoPartido = "Gana la computadora, lo siento, " + nombre;
} else {
    resultadoPartido = "Ganaste, " + nombre + "!";
}

document.getElementById("descripcion").innerHTML = resultadoPartido;


 
//Determinar ganador
function determinarGanador(jugadaComputadora, jugadaUsuario, nombre) {
    let resultado;
    if (jugadaComputadora === jugadaUsuario) {
        resultado = "Empate";
    } else if (jugadaComputadora === "piedra" && jugadaUsuario === "papel") {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === "piedra" && jugadaUsuario === "tijeras") {
        resultado = "Gana la compu";
    } else if (jugadaComputadora === "papel" && jugadaUsuario === "piedra") {
        resultado = "Gana la compu";
    } else if (jugadaComputadora === "papel" && jugadaUsuario === "tijeras") {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === "tijeras" && jugadaUsuario === "piedra") {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === "tijeras" && jugadaUsuario === "papel") {
        resultado = "Gana la compu";
    }
    return resultado;
}

*/