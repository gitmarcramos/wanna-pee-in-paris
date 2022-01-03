import{j as f,r as c,v as E,R as k,a as A}from"./vendor.e36e2ff8.js";const S=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerpolicy&&(i.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?i.credentials="include":r.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}};S();const e=f.exports.jsx,t=f.exports.jsxs,m=f.exports.Fragment;function w(a){return e("span",{className:"error-message",children:a.msg})}function I(a){const[s,n]=c.exports.useState(""),d=y=>{n(y.currentTarget.value)},[r,i]=c.exports.useState(null),o=["75001","75002","75003","75004","75005","75006","75007","75008","75009","75010","75011","75012","75013","75014","75015","75016","75017","75018","75019","75020"],u=()=>{o.includes(s)&&(i(s),n(""))},[h,l]=c.exports.useState({latitude:null,longitude:null});c.exports.useEffect(()=>{a.getArr(r),a.getGeolocate(h)},[r,h]);const[v,N]=c.exports.useState(!1),x=()=>{(isNaN(s)||s.length!==5||!o.includes(s))&&N(!0)};return t("div",{className:"main-search container",children:[e("h1",{className:"body",children:"Dans quel arrondissement cherchez-vous ?"}),t("div",{className:"search-options",children:[t("div",{className:"search-bar",children:[e("input",{type:"text",className:"search-input",onInput:d,value:s}),e("button",{className:"button button--search",onClick:()=>{u(),x(),n("")},children:"Go !"})]}),v&&e(w,{msg:"Veuillez entrer un arrondissement de Paris entre 75001 et 75020"})]})]})}var R="/assets/Close.9d59c4e7.svg";var p="/assets/clock.64606870.svg",b="/assets/wheel.3d4ab1d9.svg",g="/assets/baby.9224b752.svg";function _(a){const s=a.data;return t("div",{className:"item-result",children:[e("h4",{className:"title",children:s.fields.adresse}),t("div",{className:"item-result-infos",children:[s.fields.horaire==="Voir fiche \xE9quipement"?t("div",{className:"item-result-infos--item",children:[e("img",{src:p,alt:"Icone des horaires"}),e("a",{href:s.fields.url_fiche_equipement,className:"body-min",target:"_blank",children:"Consulter"})]}):e(m,{children:s.fields.horaire?t("div",{className:"item-result-infos--item",children:[e("img",{src:p,alt:"Icone des horaires"}),e("h5",{className:"body-min",children:s.fields.horaire})]}):t("div",{className:"item-result-infos--item",children:[e("img",{src:p,alt:"Icone des horaires",className:"disabled"}),e("h5",{className:"body-min",children:"Non sp\xE9cifi\xE9"})]})}),s.fields.acces_pmr==="Oui"?t("div",{className:"item-result-infos--item",children:[e("img",{src:b,alt:"Icon d'acc\xE8s PMR"}),e("h5",{className:"body-min",children:"Acc\xE8s PMR"})]}):t("div",{className:"item-result-infos--item disabled",children:[e("img",{src:b,alt:"Icon d'acc\xE8s PMR"}),e("h5",{className:"body-min",children:"Acc\xE8s PMR"})]}),s.fields.relais_bebe&&s.fields.relais_bebe==="Oui"?t("div",{className:"item-result-infos--item",children:[e("img",{src:g,alt:"Icon de relais b\xE9b\xE9"}),e("h5",{className:"body-min",children:"Relais b\xE9b\xE9"})]}):t("div",{className:"item-result-infos--item disabled",children:[e("img",{src:g,alt:"Icon de relais b\xE9b\xE9"}),e("h5",{className:"body-min",children:"Relais b\xE9b\xE9"})]})]})]})}function P(){const[a,s]=c.exports.useState(!0);return c.exports.useEffect(()=>{const n=setTimeout(()=>{s(!1)},800);return()=>{clearTimeout(n)}},[]),e(m,{children:a?t("div",{className:"loader",children:[e("h1",{className:"body white",children:"Recherche en cours"}),t("svg",{width:"58",height:"58",viewBox:"0 0 58 58",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("circle",{id:"loader-out",cx:"29",cy:"29",r:"28",stroke:"white",strokeWidth:"2",strokeDasharray:"170"}),e("circle",{id:"loader-middle",cx:"29",cy:"29",r:"21",stroke:"white",strokeWidth:"2",strokeDasharray:"150"}),e("circle",{id:"loader-in",cx:"29",cy:"29",r:"13",stroke:"white",strokeWidth:"2",strokeDasharray:"50"})]})]}):e(m,{})})}function M(a){const[s,n]=c.exports.useState([]);c.exports.useState({longitude:"",latitude:""});//! Here trying to manage the geolocation, but not working with only the button because it needs to have a REAL arrondissement to avoid empty array in results
c.exports.useState("");const[d,r]=c.exports.useState(""),i=l=>{l.currentTarget.checked?r("&refine.acces_pmr=Oui"):r("")},[o,u]=c.exports.useState(""),h=l=>{l.currentTarget.checked?u("&refine.relais_bebe=Oui"):u("")};return console.log(s),c.exports.useEffect(async()=>{try{const l=await(await fetch("https://opendata.paris.fr/api/records/1.0/search/?dataset=sanisettesparis&q=&rows=100&q=&facet=type&facet=statut&facet=arrondissement&facet=horaire&facet=acces_pmr&facet=relais_bebe&refine.arrondissement="+a.data+d+o+"")).json();n(l.records)}catch(l){console.error(l)}},[d,o]),t(m,{children:[e(P,{}),t("div",{className:"search-results container",children:[t("div",{className:"search-results__data",children:[e("img",{src:R,alt:"Close button",className:"close-svg",onClick:a.reset}),t("div",{className:"search-results__data--main",children:[t("h1",{className:"title",children:["Toilettes publiques dans le ",a.data]}),t("h2",{children:[s.length," r\xE9sultats"]})]}),t("div",{className:"search-results__data--filter",children:[e("h3",{className:"sub",children:"Filtrer"}),t("div",{className:"filter-input",children:[t("div",{className:"filter-input--item",children:[e("label",{htmlFor:"acces-pmr",className:"body-min",children:"Acc\xE8s PMR"}),e("input",{type:"checkbox",id:"acces-pmr",onChange:i})]}),t("div",{className:"filter-input--item",children:[e("label",{htmlFor:"relais-bebe",className:"body-min",children:"Relais b\xE9b\xE9"}),e("input",{type:"checkbox",id:"relais-bebe",onChange:h})]})]})]}),e("button",{className:"button-link body",onClick:a.reset,children:"Nouvelle recherche"})]}),s.length===0?e(m,{children:e("div",{className:"toilet",children:e("span",{className:"body",children:"Il n'y a pas de toilettes disponible avec ces crit\xE8re. Veuillez modifier votre recherche."})})}):e("div",{className:"toilet",children:s.map(l=>e(_,{data:l},E()))})]})]})}var C="/assets/logo.461c5b3a.svg",L="/assets/Illustration.ae8743b6.svg";function O(){const[a,s]=c.exports.useState(null),n=l=>{s(l)},d=()=>{s(null),i({latitude:null,longitude:null})},[r,i]=c.exports.useState({latitude:null,longitude:null}),o=l=>{i(l)},[u,h]=c.exports.useState(window.innerWidth);return e(m,{children:u>500?e("div",{className:"mobile-check",children:e("h1",{className:"body",children:"Ce site Internet est accessible uniquement sur mobile"})}):t("div",{className:"App",children:[e("img",{src:C,className:"logo",alt:"Wanna Pee in Paris Logo",onClick:d}),e("img",{src:L,className:"illustration",alt:"Home page illustration"}),a===null&&e(I,{getArr:n,getGeolocate:o}),(r.latitude||a)&&e(M,{data:a,reset:d,geoData:r})]})})}k.render(e(A.StrictMode,{children:e(O,{})}),document.getElementById("root"));
