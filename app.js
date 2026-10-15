'use strict';

const config = window.NEVIE_CONFIG;
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const dialog = document.querySelector('#order-dialog');
const ageConfirm = document.querySelector('#age-confirm');
const status = document.querySelector('#order-status');
const sendOrder = document.querySelector('#send-order');
let selectedOrder;

function orderMessage(product, option) {
  const version = option.label ? `, versão ${option.label.toLowerCase()}` : '';
  return `Olá! Gostaria de pedir um ${product.name} de ${product.size}${version}, por ${money(option.price)}.`;
}
function whatsappURL(message) {
  return `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`;
}
// Recorte apenas na exibição: o JPEG fornecido permanece intacto e é compartilhado por todos os cartões.
function imageMarkup(photo, id) {
  if (!photo.image) return '';
  if (!photo.crop) return `<div class="photo-asset"><img src="${escapeHTML(photo.image)}" alt="${escapeHTML(photo.alt)}" loading="lazy" decoding="async" width="600" height="750"></div>`;
  const [x, y, width, height] = photo.crop;
  const clipId = `photo-clip-${id}`;
  return `<div class="photo-asset"><svg class="photo-crop" viewBox="${x} ${y} ${width} ${height}" role="img" aria-label="${escapeHTML(photo.alt)}" preserveAspectRatio="xMidYMid meet"><defs><clipPath id="${clipId}"><rect x="${x}" y="${y}" width="${width}" height="${height}"/></clipPath></defs><image href="${escapeHTML(photo.image)}" width="${config.menuImage.width}" height="${config.menuImage.height}" clip-path="url(#${clipId})"/></svg></div>`;
}
function watchPhoto(container) {
  const asset = container.querySelector('.photo-asset');
  const image = asset?.querySelector('img, image');
  if (!image) return;
  const showPhoto = () => container.classList.add('has-photo');
  const showPlaceholder = () => { container.classList.remove('has-photo'); asset.remove(); };
  image.addEventListener('load', showPhoto);
  image.addEventListener('error', showPlaceholder);
  if (image instanceof HTMLImageElement && image.complete) image.naturalWidth ? showPhoto() : showPlaceholder();
}
function photoMarkup(product) {
  return `<div class="photo-placeholder"><span class="photo-symbol" aria-hidden="true">✧</span><span>Foto indisponível</span><small>NÉVIE GOURMET</small></div>${imageMarkup(product, product.id)}`;
}

config.products.forEach(product => {
  const card = document.createElement('article');
  card.className = `product ${product.category}`;
  card.dataset.productId = product.id;
  const optionsMarkup = product.options.length > 1
    ? `<fieldset><legend>Escolha sua versão</legend>${product.options.map((option, index) => `<label><input type="radio" name="${escapeHTML(product.id)}" value="${index}" ${index === 0 ? 'checked' : ''}><span>${escapeHTML(option.label)}${option.alcohol ? ' <small>18+</small>' : ''}</span><strong>${money(option.price)}</strong></label>`).join('')}</fieldset>`
    : '<p class="single-option">Açaí de garrafa · pronto para refrescar.</p>';
  card.innerHTML = `<div class="product-image">${photoMarkup(product)}<span class="size">${escapeHTML(product.size)}</span></div><div class="product-content"><p class="eyebrow">${product.category === 'acai' ? 'AÇAÍ GOURMET' : 'BATIDINHA GOURMET'}</p><h4>${escapeHTML(product.category === 'acai' ? product.name : product.flavor)}</h4><p class="product-description">${escapeHTML(product.description)}</p>${optionsMarkup}<div class="selected-price"><strong>${money(product.options[0].price)}</strong><span>${product.options[0].label || product.size}</span></div><a class="button order-button" target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp <svg class="arrow-icon" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 15 15 5M5 5h10v10"/></svg></a><p class="selection-status sr-only" role="status"></p></div>`;
  const link = card.querySelector('.order-button');
  const selected = () => product.options[Number(card.querySelector('input:checked')?.value ?? 0)];
  function updateSelection(announce = false) {
    const option = selected();
    if (announce && option.crop) {
      const container = card.querySelector('.product-image');
      container.querySelector('.photo-asset')?.remove();
      container.classList.remove('has-photo');
      container.insertAdjacentHTML('beforeend', imageMarkup({ ...product, crop: option.crop, alt: `${product.alt}, ${option.label.toLowerCase()}` }, product.id));
      watchPhoto(container);
    }
    link.href = whatsappURL(orderMessage(product, option));
    link.setAttribute('aria-label', `Pedir pelo WhatsApp: ${product.name}, ${product.size}${option.label ? `, ${option.label}` : ''}, ${money(option.price)}`);
    card.querySelector('.selected-price strong').textContent = money(option.price);
    card.querySelector('.selected-price span').textContent = option.label || product.size;
    if (announce) card.querySelector('.selection-status').textContent = `${option.label}: ${money(option.price)}.`;
  }
  card.querySelectorAll('input').forEach(input => input.addEventListener('change', () => updateSelection(true)));
  link.addEventListener('click', event => {
    if (selected().alcohol) {
      event.preventDefault();
      openOrder(product, selected());
    }
  });
  updateSelection();
  document.querySelector(product.category === 'acai' ? '#acai-list' : '#product-list').append(card);
  watchPhoto(card.querySelector('.product-image'));
});

function openOrder(product, option) {
  selectedOrder = { product, option };
  document.querySelector('#dialog-title').textContent = product.flavor;
  document.querySelector('#dialog-info').textContent = `${product.name} · ${product.size} · ${option.label} · ${money(option.price)}`;
  document.querySelector('#age-label').hidden = !option.alcohol;
  ageConfirm.checked = false;
  const message = orderMessage(product, option);
  document.querySelector('#order-message').value = message;
  sendOrder.href = whatsappURL(message);
  status.textContent = 'Esta versão contém álcool. Confirme que você tem 18 anos ou mais para continuar.';
  dialog.showModal();
}
sendOrder.addEventListener('click', event => {
  if (selectedOrder?.option.alcohol && !ageConfirm.checked) {
    event.preventDefault();
    status.textContent = 'Confirme que você tem 18 anos ou mais para continuar.';
    ageConfirm.focus();
  }
});
document.querySelector('#copy-order').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(document.querySelector('#order-message').value);
    status.textContent = 'Mensagem copiada!';
  } catch {
    document.querySelector('#order-message').select();
    status.textContent = 'Selecione e copie a mensagem acima.';
  }
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  navigation.classList.remove('open');
  toggle.textContent = '☰';
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
  toggle.textContent = open ? '×' : '☰';
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});

const greeting = `Olá, Névie Gourmet! Gostaria de fazer um pedido. Poderiam informar a disponibilidade e as opções de entrega ou retirada?`;
document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappURL(greeting); });
document.querySelectorAll('[data-instagram]').forEach(link => { link.href = config.instagram; });
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('[data-service]').textContent = config.service;

// Recebe somente fotografias e logo reais fornecidas pela marca. Nenhuma imagem artificial é gerada.
if (config.logo) {
  document.querySelectorAll('.brand').forEach(brand => {
    const image = document.createElement('img');
    image.alt = config.name;
    image.src = config.logo;
    image.className = 'brand-logo';
    brand.prepend(image);
    image.addEventListener('load', () => brand.classList.add('has-logo'));
    image.addEventListener('error', () => image.remove());
  });
}
Object.entries(config.heroImages).forEach(([category, source]) => {
  if (!source) return;
  const photo = typeof source === 'string' ? { image: source, alt: `Produto da Névie Gourmet` } : source;
  const container = document.querySelector(`[data-hero-photo="${category}"]`);
  container.insertAdjacentHTML('beforeend', imageMarkup(photo, `hero-${category}`));
  watchPhoto(container);
});
