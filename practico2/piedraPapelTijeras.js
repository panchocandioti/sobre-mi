//Reconoce el click del botón JUGAR
let botonjugar = document.getElementById("jugar");
botonjugar.addEventListener("click", checkValues);

//Función para validar el ingreso del nombre
let nombre;

function checkValues() {
    nombre = document.getElementById("nombre").value;
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
        return nombre
    }
}

//Definición de constantes
const piedra = "piedra";
const papel = "papel";
const tijeras = "tijeras";

//Obtención de la jugada del usuario según el click
let jugadaUsuario;

function jugadaPiedra() {
    jugadaUsuario = piedra;
    jugarPartido();
    return jugadaUsuario;
}

function jugadaPapel() {
    jugadaUsuario = papel;
    jugarPartido();
    return jugadaUsuario;
}

function jugadaTijeras() {
    jugadaUsuario = tijeras;
    jugarPartido();
    return jugadaUsuario;
}

//Obtener jugada de la computadora
function obtenerJugadaComputadora() {
    let listaJugadas = [piedra, papel, tijeras];
    let jugadaNumeroCompu = Math.floor(Math.random() * 3);
    let jugadaComputadora = listaJugadas[jugadaNumeroCompu];
    return jugadaComputadora;
}

//Determinar ganador
function determinarGanador(jugadaComputadora, jugadaUsuario) {
    let resultado;
    if (jugadaComputadora === jugadaUsuario) {
        resultado = "Empate";
    } else if (jugadaComputadora === piedra && jugadaUsuario === papel) {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === piedra && jugadaUsuario === tijeras) {
        resultado = "Gana la compu";
    } else if (jugadaComputadora === papel && jugadaUsuario === piedra) {
        resultado = "Gana la compu";
    } else if (jugadaComputadora === papel && jugadaUsuario === tijeras) {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === tijeras && jugadaUsuario === piedra) {
        resultado = "Gana " + nombre;
    } else if (jugadaComputadora === tijeras && jugadaUsuario === papel) {
        resultado = "Gana la compu";
    }
    return resultado;
}

//Jugar partido con tanteador
let puntosComputadora = 0;
let puntosUsuario = 0;
let terminar = false;

function jugarPartido() {
    let jugadaComputadora = obtenerJugadaComputadora();
    let resultado = determinarGanador(jugadaComputadora, jugadaUsuario);
    if (nombre === undefined) {
        alert("Por favor, ingresá un nombre")
        limpiarYRecargar();
    }
    if (resultado === "Gana la compu") {
        puntosComputadora += 1
    } else if (resultado === "Gana " + nombre) {
        puntosUsuario += 1
    }
    document.getElementById("descripcion").innerHTML = resultado;
    document.getElementById("formulario").innerHTML = nombre + ": " + puntosUsuario + "  |  Computadora: " + puntosComputadora;
    if (puntosComputadora >= 3 || puntosUsuario >= 3) {
        tanteadorFinal();
    }
}

function tanteadorFinal() {
    let resultadoPartido;
    if (puntosComputadora > puntosUsuario) {
        resultadoPartido = "LA COMPU GANA EL PARTIDO, LO SIENTO " + nombre + "...";
    } else {
        resultadoPartido = "GANASTE EL PARTIDO, " + nombre + "!";
    }
    document.getElementById("descripcion").innerHTML = resultadoPartido;
}

//Función para limpiar el formulario y recargar la página
function limpiarYRecargar() {
    document.getElementById("formulario").reset();
    location.reload();
}