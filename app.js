let numerosDisponibles = [];

// Cargar números desde numeros.json
fetch("numeros.json")
    .then(res => res.json())
    .then(data => {
        numerosDisponibles = data.numeros_disponibles;
        mostrarNumeros();
    })
    .catch(err => console.error("Error cargando números:", err));

function mostrarNumeros() {
    const contenedor = document.getElementById("lista-numeros");
    contenedor.innerHTML = "";
    numerosDisponibles.forEach(num => {
        const div = document.createElement("div");
        div.classList.add("numero");
        div.textContent = num;
        contenedor.appendChild(div);
    });
}

document.getElementById("form-reserva").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const numero = parseInt(document.getElementById("numero").value.trim());
    const pago = document.getElementById("pago").value;

    if (!numerosDisponibles.includes(numero)) {
        document.getElementById("mensaje").textContent = "Ese número ya fue reservado o no existe.";
        return;
    }

    // Simulación de envío (Aquí iría la lógica para guardar en Firebase o enviar correo)
    console.log("Reserva enviada:", { nombre, direccion, telefono, email, numero, pago });

    // Eliminar número reservado de la lista
    numerosDisponibles = numerosDisponibles.filter(n => n !== numero);
    mostrarNumeros();

    document.getElementById("mensaje").textContent = `Número ${numero} reservado con éxito.`;
    document.getElementById("form-reserva").reset();
});
