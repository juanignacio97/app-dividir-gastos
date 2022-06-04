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

// Reinicia las variables. Se llama al iniciar el documento y cada vez que se reinicia.
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
        event.stopImmediatePropagation(); // Para evitar que se llame al alert más de una vez.
        nombre = nombre_input.value;
        monto = monto_input.value;
        let dlg = validar(nombre, monto);
        if (dlg.result) {
            agregar(nombre, monto);
            form.reset();
        } else {
            alert(dlg.message);
        }
    });

    reiniciar_button.addEventListener('click', (event) => init());
}

// Valida los datos ingresados.
function validar(nombre, monto) {
    let dialog = {result: false, message: ''}
    if (nombre === "") {
        dialog.result = false;
        dialog.message = 'Por favor, introduzca un nombre.';
        nombre_input.focus();
    } else if (monto === "") {
        dialog.result = false;
        dialog.message = 'Por favor, introduzca un monto.';
        monto_input.focus();
    } else if (isNaN(monto)) {
        dialog.result = false;
        dialog.message = 'Por favor, introduzca un monto válido.';
        monto_input.focus();  
    } else {
        dialog.result = true;
        dialog.message = '';
    }
    return dialog;
}

// Agrega una persona al contador, acumula el monto y lo agrega a la lista.
function agregar(nombre, monto) {
    cant_personas++;
    monto_total += Number(monto);
    lista_personas.innerHTML += `<li class="list-group-item d-flex justify-content-between">
                                 <div class="me-auto">${nombre}</div>
                                 <span>$${monto}</span>
                                 </li>`;
    repartir();
}

// Calcula el monto total por persona y lo muestra.
function repartir() {
    if (cant_personas !== 0) {
        monto_por_persona = (monto_total / cant_personas).toFixed(2); // Para truncar a dos decimales.
        total_div.innerHTML = `<div class="row mt-4">
                                    <div class="col-6"><h3>Total:</h3></div>
                                    <div class="col-6 d-flex justify-content-end"><h3><b>$${monto_total.toFixed(2)}</b></h3>
                                    </div>
                               </div>
                              <div class="row">
                                    <div class="col-6"><h5>Cada uno deberá pagar:</h5></div>
                                    <div class="col-6 d-flex justify-content-end"><h5>$${monto_por_persona}</h5></div>
                              </div>`;
    } else {
        return;
    }
}

document.addEventListener("DOMContentLoaded", init()); // Llama a la función init una vez que el documento termine de cargar.
