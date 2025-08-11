const firebaseConfig = {
  apiKey: "AIzaSyDo3cgRT87JQkV9kgJG2mrPnUkb5HugH9Q",
  authDomain: "rifasammuel.firebaseapp.com",
  projectId: "rifasammuel",
  storageBucket: "rifasammuel.firebasestorage.app",
  messagingSenderId: "707645550462",
  appId: "1:707645550462:web:42735685340fb79e5d8d2f",
  measurementId: "G-W3HY4MHHV4"
};
if(!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const loginBtn = document.getElementById('loginBtn');
const loginMsg = document.getElementById('loginMsg');
const loginSection = document.getElementById('loginSection');
const adminPanel = document.getElementById('adminPanel');
const tablaBody = document.querySelector('#tablaReservas tbody');

loginBtn.addEventListener('click', ()=>{
  const u = document.getElementById('adminUser').value;
  const p = document.getElementById('adminPass').value;
  if(u === 'oscartobar857' && p === '0S483tob'){
    loginSection.style.display = 'none';
    adminPanel.style.display = 'block';
    iniciarEscuchaReservas();
  } else {
    loginMsg.textContent = 'Usuario o contraseña incorrectos.';
  }
});

function iniciarEscuchaReservas(){
  db.collection('reservas').orderBy('creadoEn','desc').onSnapshot(snapshot=>{
    tablaBody.innerHTML = '';
    snapshot.forEach(doc=>{
      const d = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${d.nombre||''}</td><td>${d.telefono||''}</td><td>${d.email||''}</td><td>${d.numero||''}</td><td>${d.pago||''}</td><td><button data-id="${doc.id}" class="delBtn">Eliminar</button></td>`;
      tablaBody.appendChild(tr);
    });
    document.querySelectorAll('.delBtn').forEach(btn=> btn.addEventListener('click', async ()=>{
      const id = btn.dataset.id;
      const doc = await db.collection('reservas').doc(id).get();
      if(!doc.exists) return;
      const numero = doc.data().numero;
      await db.collection('reservas').doc(id).delete();
      await db.collection('numeros').doc(String(numero)).update({estado:'disponible'});
    }));
  });
}
