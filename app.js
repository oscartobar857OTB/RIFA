// Importar Firebase v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
    authDomain: "rifasammuel.firebaseapp.com",
    projectId: "rifasammuel",
    storageBucket: "rifasammuel.firebasestorage.app",
    messagingSenderId: "707645550462",
    appId: "1:707645550462:web:xxxxxxxxxxxxxxxxxx"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección
const numerosRef = collection(db, "numerosrifa");

// Cargar números
async function cargarNumeros() {
    const numerosList = document.getElementById("numerosList");
    numerosList.innerHTML = "";
    const snapshot = await getDocs(numerosRef);
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const li = document.createElement("li");
        li.classList.add(data.pago === "Sí" ? "vendido" : "disponible");
        li.textContent = `#${docSnap.id} - ${data.nombre || "Libre"} (${data.pago || "Pendiente"})`;
        numerosList.appendChild(li);
    });
}

// Guardar compra
document.getElementById("compraForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const numero = document.getElementById("numero").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const pago = document.getElementById("pago").value;
    const metodoPago = document.getElementById("metodoPago").value;

    if (!numero) {
        alert("Por favor ingrese un número válido.");
        return;
    }

    await setDoc(doc(numerosRef, numero), {
        nombre,
        telefono,
        pago,
        metodoPago
    });

    alert("Compra registrada con éxito.");
    document.getElementById("compraForm").reset();
    cargarNumeros();
});

// Inicial
cargarNumeros();
