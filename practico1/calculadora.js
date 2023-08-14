//Reconoce el click del botón calcular
let botoncalcular = document.getElementById("calcular");
botoncalcular.addEventListener("click", checkValues);

//Función para validación de los inputs y mostrar resultados
//Avisa uso de notación científica ante resultados con gran cantidad de dígitos
function checkValues() {
    let inputoperando1 = document.getElementById('operando1').value;
    let inputoperando2 = document.getElementById('operando2').value;
    let selectoperacion = document.getElementById('operacion').value;
    let formatonumeros = /^-?\d+(\.\d+)?$/;
    let validacion = true;

    //Mensaje de alerta si el primer valor no es un número o está vacío
    if (!formatonumeros.test(inputoperando1)) {
        alert("El primer casillero debe contener un número");
        validacion = false;
    }

    //Mensaje de alerta si no se selecciona ninguna operación
    if (selectoperacion === "seleccionar") {
        alert("Seleccione una operación");
        validacion = false;
    }

    //Mensaje de alerta si el segundo valor no es un número o está vacío
    if (!formatonumeros.test(inputoperando2)) {
        alert("El segundo casillero debe contener un número");
        validacion = false;
    }

    //Mensaje de alerta para división por cero
    if (selectoperacion == "division" && inputoperando2 == 0) {
        alert("El divisor no puede ser cero");
        validacion = false;
    }

    //Si pasa la validación se calcula el resultado
    if (validacion) {
        inputoperando1 = parseFloat(inputoperando1);
        inputoperando2 = parseFloat(inputoperando2);
        resultado = calcularResultado(selectoperacion, inputoperando1, inputoperando2);
    }

    //Función anidada que cuenta dígitos decimales del resultado
    function contarDigitosDecimales(resultado) {
        let numeroComoTexto = resultado.toString();
        let partes = numeroComoTexto.split('.');

        if (partes.length === 2) {
            return partes[1].length;
        }
        return 0; //Si no hay decimales
    }

    let cantidadDigitosDecimales = contarDigitosDecimales(resultado);

    //Ante resultados con muchos dígitos avisa
    //que se podría utilizar notación científica
    if (resultado > Math.pow(10, 12) || cantidadDigitosDecimales > 12) {
        alert("Números con muchos dígitos podrían mostrarse en notación científica");
    }

    //Escribe el resultado en la calculadora
    document.getElementById("mensaje1").innerHTML = "El resultado es: ";
    document.getElementById("mensaje2").innerHTML = resultado;
}

//Funciones de las distintas operaciones matemáticas
function suma(x, y) {
    return x + y;
}

function resta(x, y) {
    return x - y;
}

function multiplicacion(x, y) {
    return x * y;
}

function division(x, y) {
    return x / y;
}

//Función que reconoce qué operación hacer y ejecuta el cálculo
function calcularResultado(opcion, num1, num2) {
    let resultado;
    switch (opcion) {
        case "suma":
            resultado = suma(num1, num2);
            break;
        case "resta":
            resultado = resta(num1, num2);
            break;
        case "multiplicacion":
            resultado = multiplicacion(num1, num2);
            break;
        case "division":
            resultado = division(num1, num2);
            break;
    }
    return resultado;
}

//Reconoce el click del botón reset
let botonreset = document.getElementById("reset");
botonreset.addEventListener("click", limpiarYRecargar);

//Función para limpiar el formulario y recargar la página
function limpiarYRecargar() {
    document.getElementById("survey-form").reset();
    location.reload();
}
