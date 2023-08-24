//Reconoce el click del botón JUGAR
let botonjugar = document.getElementById("jugar");
botonjugar.addEventListener("click", checkValues);

//Función para validar el ingreso del nombre
let nombre;

function checkValues() {
    nombre = document.getElementById("nombre").value;
    nombre = nombre.toUpperCase();
    let formatonombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    let validacion = true;

    //Mensaje de alerta si no se ingresa un nombre válido o está vacío
    if (!formatonombre.test(nombre)) {
        alert("Por favor, ingresá un nombre");
        validacion = false;
    }
    //Reemplaza los encabezados del juego para empezar a jugar
    if (validacion) {
        document.getElementById("descripcion1").innerHTML = "¡A jugar, " + nombre + "!";
        document.getElementById("descripcion2").innerHTML = "Elegí una opción:";
        document.getElementById("formulario").innerHTML = "";
        return nombre
    }
}

//Definición de constantes
const piedra = "piedra";
const papel = "papel";
const tijeras = "tijeras";

//Funciones para obtención de la jugada del usuario según el click
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

//Jugar partido con tanteador y mostrando jugadas
let puntosComputadora = 0;
let puntosUsuario = 0;
let terminar = false;

function jugarPartido() {
    let jugadaComputadora = obtenerJugadaComputadora();
    let resultado = determinarGanador(jugadaComputadora, jugadaUsuario);

    document.getElementById("rondausuario").innerHTML = nombre + ": " + jugadaUsuario;
    document.getElementById("rondacomputadora").innerHTML = "COMPU: " + jugadaComputadora

    if (nombre === undefined || nombre === "") {
        alert("Por favor, ingresá un nombre")
        limpiarYRecargar();
    }

    //Resultado de la ronda con sonidos
    else if (resultado === "Gana la compu") {
        puntosComputadora += 1;
        let audioabucheo = document.getElementById("abucheo");
        audioabucheo.src = "gamemultimedia/abucheo.mp3";
        audioabucheo.play();

    } else if (resultado === "Gana " + nombre) {
        puntosUsuario += 1;
        let audiofestejo = document.getElementById("festejo");
        audiofestejo.src = "gamemultimedia/festejo.mp3";
        audiofestejo.play();

    }else if (resultado === "Empate") {
        let audionovalido = document.getElementById("novalido");
        audionovalido.src = "gamemultimedia/novalido.mp3";
        audionovalido.play();

    }
    document.getElementById("descripcion1").innerHTML = resultado;
    document.getElementById("descripcion2").innerHTML = nombre + ": " + puntosUsuario + "  |  Computadora: " + puntosComputadora;
    document.getElementById("formulario").innerHTML = ""
    if (puntosComputadora >= 3 || puntosUsuario >= 3) {
        setTimeout(tanteadorFinal, 1500);
    }
}

//Función que muestra el resultado final del partido con sonidos
function tanteadorFinal() {
    let resultadoPartido;
    if (puntosComputadora > puntosUsuario) {
        resultadoPartido = "LA COMPU GANA EL PARTIDO, LO SIENTO, " + nombre + "...";
        let audioderrota = document.getElementById("derrota");
        audioderrota.src = "gamemultimedia/derrota.mp3";
        audioderrota.play();
    } else {
        resultadoPartido = "¡GANASTE EL PARTIDO, " + nombre + "!";
        let audiovictory = document.getElementById("victory");
        audiovictory.src = "gamemultimedia/victory.mp3";
        audiovictory.play();
    }
    document.getElementById("descripcion1").innerHTML = resultadoPartido;
    desactivarOnclick();
}

//Función para limpiar el formulario y recargar la página
function limpiarYRecargar() {
    document.getElementById("formulario").reset();
    location.reload();
}

//Función para desactivar onclick una vez terminado el partido
function desactivarOnclick() {
    let jugadaPiedra = document.getElementById("piedra");
    jugadaPiedra.onclick = null;
    let jugadaPapel = document.getElementById("papel");
    jugadaPapel.onclick = null;
    let jugadaTijeras = document.getElementById("tijeras");
    jugadaTijeras.onclick = null;
}