"use strict";const e=document.getElementById("producto"),t=document.querySelector(".producto__imagen"),c=document.querySelector(".producto__thumbs"),r=document.querySelector("#incrementar-cantidad"),a=document.querySelector("#disminuir-cantidad");let u=document.querySelector("#cantidad");const d=e.querySelector("#propiedad-color");c.addEventListener("click",(e=>{if("IMG"===e.target.tagName){const c=e.target.src,r=c.lastIndexOf("/"),a=c.substring(r+1);t.src=`./img/products/${a}`}})),d.addEventListener("click",(e=>{if("INPUT"===e.target.tagName){const c=e.target.value;t.src=`./img/products/${c}.jpg`;document.querySelectorAll(".producto__thumb-img").forEach(((e,t)=>{e.src=`./img/thumbs/${c}/${c}${t+1}.jpg`}))}})),r.addEventListener("click",(e=>{u.value=parseInt(u.value)+1})),a.addEventListener("click",(e=>{u.value=parseInt(u.value)-1,parseInt(u.value)<=1&&(u.value=1)}));
//# sourceMappingURL=bundle.js.map
