// Cuenta regresiva para el 19 de noviembre de 2026.
// La hora objetivo es la medianoche local del dispositivo.

const fechaObjetivo = new Date(2026, 10, 19, 0, 0, 0).getTime();

const campos = {
    dias: document.getElementById('dias'),
    horas: document.getElementById('horas'),
    minutos: document.getElementById('minutos'),
    segundos: document.getElementById('segundos')
};

const mensajeElemento = document.getElementById('mensaje');

const mensajesPorHora = [
    '¿Ya estás emocionado, amor? ♡',
    'Cada vez falta menos para nuestra aventura.',
    '¿Ya preparaste el control, corazón?',
    '¡La espera casi termina!',
    '¿Listo para descubrir Vice City?',
    'Ya casi, mi amor. ♡',
    'Espero que estés tan emocionado como yo.',
    '¡Se acerca nuestro gran momento!',
    '¿Qué será lo primero que haremos?',
    '¡Prepara todo, amor!',
    'La cuenta regresiva está por terminar.',
    '¡UNA HORA, AMOR! 😍'
];

let ultimoMensaje = '';

function dosDigitos(valor) {
    return String(valor).padStart(2, '0');
}

function elegirMensaje(horasRestantes) {
    if (horasRestantes <= 0) {
        return '¡LA AVENTURA COMIENZA AHORA! ♡';
    }

    // Durante las últimas 12 horas, muestra un mensaje distinto
    // según la hora que falta. Si faltan más de 12, la secuencia se repite.
    const horaDeReferencia = Math.ceil(horasRestantes);
    const indice = horaDeReferencia <= 12
        ? 12 - horaDeReferencia
        : (12 - (horaDeReferencia % 12)) % 12;

    return mensajesPorHora[Math.min(indice, mensajesPorHora.length - 1)];
}

function actualizarContador() {
    const ahora = Date.now();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        campos.dias.textContent = '000';
        campos.horas.textContent = '00';
        campos.minutos.textContent = '00';
        campos.segundos.textContent = '00';
        mensajeElemento.textContent = '¡LA AVENTURA COMIENZA AHORA! ♡';
        clearInterval(intervalo);
        return;
    }

    const totalSegundos = Math.floor(diferencia / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    campos.dias.textContent = String(dias).padStart(3, '0');
    campos.horas.textContent = dosDigitos(horas);
    campos.minutos.textContent = dosDigitos(minutos);
    campos.segundos.textContent = dosDigitos(segundos);

    const horasRestantes = diferencia / 3600000;
    const nuevoMensaje = elegirMensaje(horasRestantes);

    if (nuevoMensaje !== ultimoMensaje) {
        mensajeElemento.textContent = nuevoMensaje;
        ultimoMensaje = nuevoMensaje;
    }
}

actualizarContador();
const intervalo = setInterval(actualizarContador, 1000);
