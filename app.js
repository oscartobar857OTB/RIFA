<!-- Firebase App (núcleo) -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
<!-- Firestore -->
<script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js"></script>

<script>
  // Configuración de tu proyecto Firebase
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

  const listaDisponibles = document.getElementById("lista-numeros");
  const listaReservados = document.getElementById("lista-reservados");

  // Mostrar en tiempo real disponibles y reservados
  db.collection("numeros").onSnapshot((snapshot) => {
    listaDisponibles.innerHTML = "";
    listaReservados.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.classList.add("numero");
      div.textContent = doc.id;

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

    await db.collection("numeros").doc(numero).update({
      reservado: true
    });

    document.getElementById("mensaje").textContent = `Número ${numero} reservado con éxito.`;
    document.getElementById("form-reserva").reset();
  });
</script>

