const firebaseConfig = {
  apiKey: "AIzaSyCFsqGe_mO4_Ffo3utLuyRdZsHwi_0sQhY",
  authDomain: "rifa-sammuel.firebaseapp.com",
  projectId: "rifa-sammuel",
  storageBucket: "rifa-sammuel.firebasestorage.app",
  messagingSenderId: "55269628049",
  appId: "1:55269628049:web:ce7ebe29c76d00e8170730",
  measurementId: "G-DTPC1ZCGCM"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const numerosIniciales = [79,80,88,92,108,109,126,181,182,183,185,193,194,243,244,245,250,268,335,337,452,453,460,471,530,531,534,542,554,555,607,608,609,615,618,622,627,723,724,725,731,746,747,749,841,842,853,905,906,921];

const lista = document.getElementById('lista-numeros');
const form = document.getElementById('reservaForm');
const mensaje = document.getElementById('mensaje');

async function inicializarNumeros(){
  const batch = db.batch();
  for(const n of numerosIniciales){
    const docRef = db.collection('numeros').doc(String(n));
    const doc = await docRef.get();
    if(!doc.exists){
      batch.set(docRef, {estado:'disponible', creadoEn: firebase.firestore.FieldValue.serverTimestamp()});
    }
  }
  try{ await batch.commit(); }catch(e){ console.warn('batch commit', e); }
}

function renderizarNumeros(numeros){
  lista.innerHTML = '';
  numeros.forEach(num=>{
    const d = document.createElement('div');
    d.className = 'numero';
    d.textContent = String(num).padStart(3,'0');
    d.dataset.numero = num;
    d.addEventListener('click', ()=>{
      const input = document.querySelector('input[name="numero"]');
      if(input) input.value = num;
    });
    lista.appendChild(d);
  });
}

async function obtenerDisponibles(){
  const snap = await db.collection('numeros').where('estado','==','disponible').get();
  const disponibles = snap.docs.map(d=>Number(d.id)).sort((a,b)=>a-b);
  return disponibles;
}

function observar(){
  return db.collection('numeros').onSnapshot(snap=>{
    const disponibles = [];
    snap.forEach(doc=>{ if(doc.data().estado==='disponible') disponibles.push(Number(doc.id)); });
    renderizarNumeros(disponibles);
  });
}

async function reservarEnFirestore(data){
  const numero = String(data.numero).trim();
  const numeroRef = db.collection('numeros').doc(numero);
  try{
    await db.runTransaction(async tx=>{
      const doc = await tx.get(numeroRef);
      if(!doc.exists) throw new Error('Número inválido');
      if(doc.data().estado!=='disponible') throw new Error('Número ya reservado');
      const resRef = db.collection('reservas').doc();
      tx.set(resRef, {nombre:data.nombre,direccion:data.direccion,telefono:data.telefono,email:data.email,numero:numero,pago:data.pago,creadoEn: firebase.firestore.FieldValue.serverTimestamp()});
      tx.update(numeroRef, {estado:'vendido', vendidoEn: firebase.firestore.FieldValue.serverTimestamp()});
    });
    return {ok:true};
  }catch(err){
    return {ok:false, error: err.message||err};
  }
}

document.addEventListener('DOMContentLoaded', async ()=>{
  await inicializarNumeros();
  const disp = await obtenerDisponibles();
  renderizarNumeros(disp);
  observar();

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    mensaje.textContent = 'Procesando...';
    const fd = new FormData(form);
    const obj = Object.fromEntries(fd.entries());
    const res = await reservarEnFirestore(obj);
    if(!res.ok){
      mensaje.textContent = '❌ ' + res.error;
      return;
    }
    try{
      const resp = await fetch('https://formspree.io/f/mnqevrjy', {method:'POST', body: fd, headers:{'Accept':'application/json'}});
      if(!resp.ok){
        mensaje.textContent = '✅ Reserva guardada. Error enviando email.';
        form.reset();
        return;
      }
    }catch(e){
      mensaje.textContent = '✅ Reserva guardada. Error enviando email.';
      form.reset();
      return;
    }
    mensaje.textContent = '✅ Reserva completada. Revisa tu correo.';
    form.reset();
  });
});
