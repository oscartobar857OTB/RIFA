// Configuración Firebase (reemplaza con tus credenciales)
var firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Cargar números reservados
function cargarReservas() {
    const tbody = document.getElementById('reservas-body');
    tbody.innerHTML = "<tr><td colspan='3'>Cargando datos...</td></tr>";

    db.collection("numeros")
        .where("reservado", "==", true)
        .orderBy("numero")
        .onSnapshot(snapshot => {
            tbody.innerHTML = "";
            if (snapshot.empty) {
                tbody.innerHTML = "<tr><td colspan='3'>No hay reservas registradas</td></tr>";
                return;
            }
            snapshot.forEach(doc => {
                const data = doc.data();
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${data.numero}</td>
                    <td>${data.nombre || "-"}</td>
                    <td>${data.telefono || "-"}</td>
                `;
                tbody.appendChild(tr);
            });
        });
}

cargarReservas();
