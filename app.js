// Importar SDK de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCFsqGe_mO4_Ffo3utLuyRdZsHwi_0sQhY",
  authDomain: "rifa-sammuel.firebaseapp.com",
  projectId: "rifa-sammuel",
  storageBucket: "rifa-sammuel.firebasestorage.app",
  messagingSenderId: "55269628049",
  appId: "1:55269628049:web:ce7ebe29c76d00e8170730",
  measurementId: "G-DTPC1ZCGCM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mostrar números disponibles en tiempo real
const lista = document.getElementById("lista-numeros");
onSnapshot(collection(db, "numeros"), (snapshot) => {
  lista.innerHTML = "";
  snapshot.forEach((doc) => {
    if (!doc.data().reservado) {
      const div = document.createElement("div");
      div.classList.add("numero");
      div.textContent = doc.id;
      lista.appendChild(div);
    }
  });
});

// Manejo de formulario
document.getElementById("form-reserva").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const numero = document.getElementById("numero").value.trim();
  const docRef = doc(db, "numeros", numero);

  await updateDoc(docRef, { reservado: true });

  document.getElementById("mensaje").textContent = `Número ${numero} reservado con éxito.`;
  document.getElementById("form-reserva").reset();
});
