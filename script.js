const CLASSES=[
 {n:"Musculation",t:"force",d:"Plateau libre et machines guidées, programme sur mesure.",h:"Tous les jours · 6h–23h",c:"#2438ff",i:"M20 60h120M40 40v40M60 30v60M100 30v60M120 40v40"},
 {n:"CrossFit",t:"force",d:"Circuits à haute intensité pour gagner force et endurance.",h:"Lun, Mer, Ven · 18h",c:"#ff5a1f",i:"M30 80l30-40 20 25 20-35 30 50"},
 {n:"Boxe",t:"cardio",d:"Technique, cardio et défoulement, avec ou sans combat.",h:"Mar, Jeu · 19h",c:"#10141a",i:"M50 40h40a20 20 0 0 1 0 50H50z"},
 {n:"Spinning",t:"cardio",d:"Cours de vélo en musique, énergie garantie.",h:"Lun à Sam · 7h et 18h",c:"#2438ff",i:"M40 80a20 20 0 1 0 .1 0M110 80a20 20 0 1 0 .1 0M60 80l25-35h25"},
 {n:"Yoga",t:"detente",d:"Souplesse, respiration et récupération.",h:"Dim, Mer · 9h",c:"#ff5a1f",i:"M80 35a10 10 0 1 0 .1 0M80 50v25M55 65l25 10 25-10M65 95l15-20 15 20"},
 {n:"Stretching",t:"detente",d:"Étirements guidés pour mieux récupérer entre les séances.",h:"Sam · 11h",c:"#10141a",i:"M40 90q40-70 80 0"}
];
const PLANS=[
 {n:"Essentiel",p:3000,f:["Accès salle musculation","Vestiaires et douches","1 bilan forme offert"]},
 {n:"Premium",p:4500,best:1,f:["Tous les cours collectifs","Accès 7j/7 de 6h à 23h","Suivi mensuel avec un coach"]},
 {n:"Duo",p:7500,f:["2 personnes, tout inclus","Programme personnalisé","2 séances coaching par mois"]}
];
const $=s=>document.querySelector(s);
const fmt=n=>n.toLocaleString("fr-FR");
function renderClasses(f){
 $("#classes").innerHTML=CLASSES.filter(c=>f==="all"||c.t===f).map(c=>
 `<article class="cls"><svg viewBox="0 0 160 130" aria-hidden="true"><rect width="160" height="130" fill="${c.c}"/><path d="${c.i}" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg><div><h3>${c.n}</h3><p>${c.d}</p><small>${c.h}</small></div></article>`).join("");
}
function renderPlans(monthly){
 $("#plans").innerHTML=PLANS.map(x=>{
  const price=monthly?x.p:Math.round(x.p*.8);
  return `<div class="plan${x.best?" best":""}"><h3>${x.n}</h3><div class="price">${fmt(price)} <small>DA / mois</small></div><ul>${x.f.map(i=>`<li>${i}</li>`).join("")}</ul><a class="btn" href="#contact">Choisir ${x.n}</a></div>`;
 }).join("");
}
$("#filters").addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 document.querySelectorAll("#filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));
 renderClasses(b.dataset.f);
});
$("#billing").addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 document.querySelectorAll("#billing button").forEach(x=>x.setAttribute("aria-pressed",x===b));
 renderPlans(b.dataset.m==="1");
});
$("#calc").addEventListener("click",()=>{
 const p=+$("#poids").value,t=+$("#taille").value/100;
 if(!p||!t){$("#imcOut").textContent="Entre ton poids et ta taille.";return}
 const v=p/(t*t);
 const c=v<18.5?"Insuffisance pondérale":v<25?"Poids normal":v<30?"Surpoids":"Obésité";
 $("#imcOut").textContent=`Ton IMC est de ${v.toFixed(1).replace(".",",")} : ${c}.`;
});
$("#form").addEventListener("submit",e=>{
 e.preventDefault();
 const nom=$("#nom").value.trim(),tel=$("#tel").value.replace(/\s/g,""),m=$("#msg");
 if(nom.length<3){m.className="msg err";m.textContent="Entre ton nom complet.";return}
 if(!/^0[567]\d{8}$/.test(tel)){m.className="msg err";m.textContent="Numéro invalide. Exemple : 0555123456.";return}
 m.className="msg ok";m.textContent=`Merci ${nom.split(" ")[0]} ! On te rappelle sous 24 h.`;
 e.target.reset();
});
$("#menuBtn").addEventListener("click",()=>{
 const o=$("#nav").classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",o);
});
$("#nav").addEventListener("click",e=>{if(e.target.tagName==="A"){$("#nav").classList.remove("open")}});
document.querySelectorAll("[data-n]").forEach(el=>{
 const end=+el.dataset.n;let s=null;
 const step=t=>{s??=t;const k=Math.min((t-s)/1200,1);el.textContent=fmt(Math.round(end*k))+(k===1?"+":"");if(k<1)requestAnimationFrame(step)};
 requestAnimationFrame(step);
});
renderClasses("all");renderPlans(true);