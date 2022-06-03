var cant_personas = 0;
var monto_total = 0;
var monto_por_persona = 0;

const lista_personas = document.getElementById("lista-personas");
const total_div = document.getElementById("total");

const agregar_button = document.getElementById("agregar");
const reiniciar_button = document.getElementById("reiniciar");

const nombre_input = document.getElementById("nombre");
const monto_input = document.getElementById("monto");

const form = document.getElementById('form-agregar');

function init() {
    form.reset();
    let nombre = '';
    let monto = '';
    cant_personas = 0;
    monto_total = 0;
    monto_por_persona = 0;

    lista_personas.innerHTML = "";
    total_div.innerHTML = "";

    nombre_input.focus();

    agregar_button.addEventListener('click', (event) => {
        nombre = nombre_input.value
        monto = monto_input.value
        if (validar(nombre, monto)) {
            agregar(nombre, monto);
            form.reset();
        }
    });

    reiniciar_button.addEventListener('click', (event) => init());
}

function validar(nombre, monto) {
    if (nombre === "") {
        nombre_input.focus();
        return false;
    } else if (monto === "") {
        monto_input.focus();
        return false;
    } else if (isNaN(monto)) {
        monto_input.focus();
        return false;
    } else {
        return true;
    }
}

function agregar(nombre, monto) {
    cant_personas++;
    monto_total += Number(monto);
    lista_personas.innerHTML += `<li>${nombre} $${monto}</li>`;
    repartir();
}

function repartir() {
    if (cant_personas !== 0) {
        monto_por_persona = (monto_total / cant_personas).toFixed(2);
        total_div.innerHTML = `<h3>Total: $${monto_total}</h3>
                               <h5>Cada uno deberá pagar: $${monto_por_persona}</h5>`;
    } else {
        return;
    }
}

document.addEventListener("DOMContentLoaded", init());
