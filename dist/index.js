!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n.p;async function l({total:e,target:t}){var n,l,a,o,r;const i=t.actor,u=i.owner;if(console.log(i.permission),!u)return;const c=null==i||null===(n=i.data)||void 0===n?void 0:n.name,d=null==i||null===(l=i.data)||void 0===l||null===(a=l.data)||void 0===a||null===(o=a.attributes)||void 0===o||null===(r=o.hp)||void 0===r?void 0:r.value;let f={initialformula:`${d} - ${e}`,name:c};const s=await renderTemplate("modules/prompt-inflict-damage/dist/dialog.html",f);return new Promise(t=>{new Dialog({title:game.i18n.localize("PID.InflictDamageQuestion"),content:s,buttons:{inflict:{label:game.i18n.localize("PID.Inflict"),callback:async n=>{const l=n[0].querySelector("form").querySelector('[name="halved"]').checked,a=n[0].querySelector("form").querySelector('[name="modifier"]').value,{damage:o,hp:r}=function({hp:e,damage:t,isHalved:n,modifier:l}){const a=n?Math.floor(t/2):t,o="string"==typeof l&&l.replaceAll(" ",""),r=o&&o.split(/(?<=[+-][0-9]+)/i);let i=a;return r.length>0&&r.forEach((function(e){i=+i+ +e})),{damage:i>0?i:null,hp:e-i>0?e-i:0}}({hp:d,damage:e,isHalved:l,modifier:a});i.update({"data.attributes.hp.value":r}),o&&await ChatMessage.create({content:game.i18n.format("PID.DamageInflicted",{name:c,damage:o}),rollMode:"selfroll"}),t()}},cancel:{label:game.i18n.localize("PID.Cancel"),callback:()=>t(null)}},default:"inflict",close:()=>t(null)},{}).render(!0)})}let a=!1;Hooks.on("ready",()=>{a=!0}),Hooks.on("renderChatMessage",(e,t,n)=>{a&&async function({app:e={},data:t={}}){var n,a,o,r;const i=null==e||null===(n=e.data)||void 0===n||null===(a=n.flags)||void 0===a||null===(o=a.dnd5e)||void 0===o||null===(r=o.roll)||void 0===r?void 0:r.type,u=e.user&&e.user.targets,c="damage"===i;if(console.log("ciao",{type:i,targets:u}),!c)return;if(0===u.length)return;const d=e._roll.total;u.forEach((function(e){l({total:d,target:e})}))}({app:e,data:n})})}]);