// Configuración Firebase (reemplaza con tus credenciales)
var firebaseConfig = {
apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
  authDomain: "rifasammuel.firebaseapp.com",
  projectId: "rifasammuel",
  storageBucket: "rifasammuel.firebasestorage.app",
  messagingSenderId: "707645550462",
  appId: "1:707645550462:web:42735685340fb79e5d8d2f",
  measurementId: "G-W3HY4MHHV4"
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
