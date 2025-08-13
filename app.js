// Importar SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js";
import { getFirestore, collection, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
  authDomain: "rifasammuel.firebaseapp.com",
  projectId: "rifasammuel",
  storageBucket: "rifasammuel.firebasestorage.app",
  messagingSenderId: "707645550462",
  appId: "1:707645550462:web:42735685340fb79e5d8d2f",
  measurementId: "G-W3HY4MHHV4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elementos HTML
const listaDisponibles = document.getElementById("lista-numeros");
const listaReservados = document.getElementById("lista-reservados");

// Mostrar en tiempo real disponibles y reservados
onSnapshot(collection(db, "numeros"), (snapshot) => {
  listaDisponibles.innerHTML = "";
  listaReservados.innerHTML = "";
  
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.classList.add("numero");
    div.textContent = docSnap.id;

    if (!data.reservado) {
      listaDisponibles.appendChild(div);
    } else {
      listaReservados.appendChild(div);
    }
  });
});

// Manejo del formulario
document.getElementById("form-reserva").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const numero = document.getElementById("numero").value.trim();
  const docRef = doc(db, "numeros", numero);

  await updateDoc(docRef, { reservado: true });

  document.getElementById("mensaje").textContent = `Número ${numero} reservado con éxito.`;
  document.getElementById("form-reserva").reset();
});
