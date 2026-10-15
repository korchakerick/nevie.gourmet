'use strict';
const config = window.NEVIE_CONFIG;
const money = value => value.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
const dialog = document.querySelector('#order-dialog');
let selectedOrder;
const validPhone = () => /^55\d{10,11}$/.test(config.whatsapp);
config.products.forEach(product => {
  const card = document.createElement('article'); card.className = `product ${product.theme}`;
  // Dados do catálogo são mantidos no arquivo local config.js.
  card.innerHTML = `<div class="product-image"><img src="${product.image}" alt="${product.alt}" loading="lazy" width="900" height="1000"><span class="size">${product.size}</span><span class="image-label">IMAGEM ILUSTRATIVA</span></div><div class="product-content"><p class="eyebrow">BATIDINHA GOURMET</p><h3>${product.flavor}<span>✧</span></h3><p>${product.description}</p><fieldset><legend>Escolha sua versão</legend>${product.options.map((option,i)=>`<label><input type="radio" name="${product.id}" value="${i}" ${i===0?'checked':''}><span>${option.label}${option.alcohol?' <small>18+</small>':''}</span><strong>${money(option.price)}</strong></label>`).join('')}</fieldset><button class="button order-button">Pedir pelo WhatsApp <span>↗</span></button></div>`;
  card.querySelector('button').addEventListener('click',()=>openOrder(product,product.options[Number(card.querySelector('input:checked').value)]));
  document.querySelector('#product-list').append(card);
});
function openOrder(product, option) {
  selectedOrder = {product,option};
  document.querySelector('#dialog-title').textContent = product.flavor;
  document.querySelector('#dialog-info').textContent = `${product.name} · ${product.size} · ${option.label} · ${money(option.price)}`;
  document.querySelector('#age-label').hidden = !option.alcohol;
  document.querySelector('#age-confirm').checked = false;
  document.querySelector('#order-message').value = `Olá, Névie Gourmet! Gostaria de pedir: ${product.name}, ${product.size}, opção ${option.label.toLowerCase()} (${money(option.price)}). Poderiam confirmar a disponibilidade e as opções de atendimento?`;
  document.querySelector('#order-status').textContent = validPhone() ? 'Confira sua escolha e continue para combinar os detalhes.' : 'O WhatsApp oficial ainda não foi informado. O envio estará disponível assim que o canal for configurado. Você pode copiar a mensagem.';
  document.querySelector('#send-order').disabled = !validPhone();
  dialog.showModal();
}
document.querySelector('#send-order').addEventListener('click',()=>{
  if (!validPhone()) return;
  if(selectedOrder.option.alcohol && !document.querySelector('#age-confirm').checked){document.querySelector('#order-status').textContent='Confirme que você tem 18 anos ou mais para continuar.';document.querySelector('#age-confirm').focus();return;}
  window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(document.querySelector('#order-message').value)}`,'_blank','noopener,noreferrer');
});
document.querySelector('#copy-order').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#order-message').value);document.querySelector('#order-status').textContent='Mensagem copiada!';}catch{document.querySelector('#order-message').select();document.querySelector('#order-status').textContent='Selecione e copie a mensagem acima.';}});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const toggle=document.querySelector('.menu-toggle');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);toggle.textContent=open?'×':'☰';});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{toggle.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open');toggle.textContent='☰';}));
function contactLink(target,url,label){const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener noreferrer';document.querySelector(target).replaceChildren(a);}
if(validPhone())contactLink('#whatsapp-contact',`https://wa.me/${config.whatsapp}`,'Converse pelo WhatsApp ↗');
if(/^https:\/\/(www\.)?instagram\.com\/[\w.]+\/?$/.test(config.instagram))contactLink('#instagram-contact',config.instagram,'Acompanhe no Instagram ↗');
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.classList.add('image-unavailable');img.alt='Imagem ilustrativa indisponível — foto do produto a adicionar';}));
