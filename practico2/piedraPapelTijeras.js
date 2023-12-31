//Reconoce el click del botón JUGAR
let botonjugar = document.getElementById("jugar");
botonjugar.addEventListener("click", checkValues);

//Función para validar el ingreso del nombre
let nombre;
let formatonombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

function checkValues() {
    nombre = document.getElementById("nombre").value;
    nombre = nombre.toUpperCase();
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

function jugarPartido() {

    //Si se presiona piedra, papel o tijeras sin haber puesto el nombre no juega
    if (nombre === undefined || nombre === "" || !formatonombre.test(nombre)) {
        alert("Por favor, ingresá un nombre");
        limpiarYRecargar();
        return;
    }

    //Oculta el botón de reset para no confundir al jugador
    ocultarBotonReset();

    //Resultado de la ronda
    let jugadaComputadora = obtenerJugadaComputadora();
    let resultado = determinarGanador(jugadaComputadora, jugadaUsuario);

    //Muestra jugada elegida por usuario y computadora
    document.getElementById("rondausuario").innerHTML = nombre + ": " + jugadaUsuario;
    document.getElementById("rondacomputadora").innerHTML = "COMPU: " + jugadaComputadora;

    //Sonidos para cada resultado de ronda
    if (resultado === "Gana la compu") {
        puntosComputadora += 1;
        let audioabucheo = document.getElementById("abucheo");
        audioabucheo.src = "gamemultimedia/abucheo.mp3";
        audioabucheo.play();

    } else if (resultado === "Gana " + nombre) {
        puntosUsuario += 1;
        let audiofestejo = document.getElementById("festejo");
        audiofestejo.src = "gamemultimedia/festejo.mp3";
        audiofestejo.play();

    } else if (resultado === "Empate") {
        let audionovalido = document.getElementById("novalido");
        audionovalido.src = "gamemultimedia/novalido.mp3";
        audionovalido.play();
    }

    //Muestra el resultado de la ronda y el tanteador parcial
    document.getElementById("descripcion1").innerHTML = resultado;
    document.getElementById("descripcion2").innerHTML = nombre + ": " + puntosUsuario + "   |   COMPU: " + puntosComputadora;
    document.getElementById("formulario").innerHTML = ""
    if (puntosComputadora >= 3 || puntosUsuario >= 3) {
        desactivarOnclick();
        setTimeout(tanteadorFinal, 1250);
    }
}

//Función que muestra el resultado final del partido con sonidos + GIF + mostrar el botón reset de nuevo
function tanteadorFinal() {
    let resultadoPartido;
    let fondo = document.getElementById("fondo");
    if (puntosComputadora > puntosUsuario) {
        resultadoPartido = "LA COMPU GANA EL PARTIDO, LO SIENTO, " + nombre + "...";
        let audioderrota = document.getElementById("derrota");
        audioderrota.src = "gamemultimedia/derrota.mp3";
        audioderrota.play();
        fondo.style.backgroundImage = "url(gamemultimedia/gameover.gif)";
    } else {
        resultadoPartido = "¡GANASTE EL PARTIDO, " + nombre + "!";
        let audiovictory = document.getElementById("victory");
        audiovictory.src = "gamemultimedia/victory.mp3";
        audiovictory.play();
        fondo.style.backgroundImage = "url(gamemultimedia/confetti2.gif)";
    }
    document.getElementById("descripcion1").innerHTML = resultadoPartido;
    mostrarBotonReset();
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

//Función para ocultar el botón de reset
function ocultarBotonReset() {
    let botonreset = document.getElementById("reset");
    botonreset.style.display = "none";
}

//Función para mostrar el botón de reset
function mostrarBotonReset() {
let botonreset = document.getElementById("reset");
botonreset.style.display = "block";
}