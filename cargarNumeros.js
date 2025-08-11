import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

// Configuración de tu Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
  authDomain: "rifasammuel.firebaseapp.com",
  projectId: "rifasammuel",
  storageBucket: "rifasammuel.firebasestorage.app",
  messagingSenderId: "707645550462",
  appId: "1:707645550462:web:42735685340fb79e5d8d2f",
  measurementId: "G-W3HY4MHHV4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Lista de números disponibles
const numeros = [
  "079", "080", "088", "092", "108", "109", "126", "181", "182", "183",
  "185", "193", "194", "243", "244", "245", "250", "268", "335", "337",
  "452", "453", "460", "471", "530", "531", "534", "542", "554", "555",
  "607", "608", "609", "615", "618", "622", "627", "723", "724", "725",
  "731", "746", "747", "749", "841", "842", "853", "905", "906", "921"
];

// Función para insertar
async function cargarNumeros() {
  for (let num of numeros) {
    await setDoc(doc(db, "numeros", num), { reservado: false });
    console.log(`Número ${num} agregado`);
  }
  console.log("✅ Todos los números han sido cargados en Firestore");
}

cargarNumeros();
