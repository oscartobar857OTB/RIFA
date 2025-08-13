/// ===================
//  CONFIGURAR FIREBASE
// ===================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getFirestore, collection, doc, setDoc, getDocs, onSnapshot, updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
  authDomain: "rifasammuel.firebaseapp.com",
  projectId: "rifasammuel",
  storageBucket: "rifasammuel.firebasestorage.app",
  messagingSenderId: "707645550462",
  appId: "1:707645550462:web:e8e352c99fcf9e72db73c3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===================
//  NÚMEROS DISPONIBLES INICIALES
// ===================
const numeros_iniciales = [
  "079", "080", "088", "092", "108", "109", "126", "181", "182",
  "183", "185", "193", "194", "243", "244", "245", "250", "268",
  "335", "337", "452", "453", "460", "471", "530", "531", "534",
  "542", "554", "555", "607", "608", "609", "615", "618", "622",
  "627", "723", "724", "725", "731", "746", "747", "749", "841",
  "842", "853", "905", "906", "921"
];

// ===================
//  FUNCIÓN PARA CARGAR NÚMEROS SI NO EXISTEN
// ===================
async function inicializarNumeros() {
  const snapshot = await getDocs(collection(db, "numerosrifa"));
  if (snapshot.empty) {
    for (let num of numeros_iniciales) {
      await setDoc(doc(db, "numerosrifa", num), {
        numero: num,
        nombre: "",
        direccion: "",
        telefono: "",
        reservado: false
      });
    }
    console.log("Números iniciales cargados.");
  }
}

// ===================
//  MOSTRAR LISTA DE NÚMEROS EN TIEMPO REAL
// ===================
const listaNumeros = document.getElementById("lista-numeros");
const selectNumeros = document.getElementById("numero-select");

onSnapshot(collection(db, "numerosrifa"), (snapshot) => {
  listaNumeros.innerHTML = "";
  selectNumeros.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.reservado) {
      // Agregar a lista en pantalla
      const li = document.createElement("li");
      li.textContent = data.numero;
      listaNumeros.appendChild(li);

      // Agregar al selector de reserva
      const option = document.createElement("option");
      option.value = data.numero;
      option.textContent = data.numero;
      selectNumeros.appendChild(option);
    }
  });
});

// ===================
//  RESERVAR UN NÚMERO
// ===================
document.getElementById("form-reserva").addEventListener("submit", async (e) => {
  e.preventDefault();

  const numero = selectNumeros.value;
  const nombre = document.getElementById("nombre").value;
  const direccion = document.getElementById("direccion").value;
  const telefono = document.getElementById("telefono").value;

  await updateDoc(doc(db, "numerosrifa", numero), {
    nombre,
    direccion,
    telefono,
    reservado: true
  });

  alert(`Número ${numero} reservado con éxito`);
  e.target.reset();
});

// ===================
//  EJECUTAR INICIALIZACIÓN
// ===================
inicializarNumeros();
