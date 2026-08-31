const state = { routes: [], selected: null };
const routeList = document.querySelector('#route-list');
const status = document.querySelector('#connection-status');
const countInput = document.querySelector('#ticket-count');
const summaryRoute = document.querySelector('#summary-route');
const summaryPrice = document.querySelector('#summary-price');
const summaryTotal = document.querySelector('#summary-total');
const buyButton = document.querySelector('#buy-button');
const formMessage = document.querySelector('#form-message');

const money = value => `$${Number(value).toFixed(2)}`;

function renderRoutes() {
  routeList.innerHTML = state.routes.map((route, index) => `
    <button class="route-card ${state.selected?.id_ruta === route.id_ruta ? 'selected' : ''}" data-route-id="${route.id_ruta}" type="button">
      <span class="route-number">0${index + 1}</span>
      <h3>${route.origen} <span aria-hidden="true">→</span> ${route.destino}</h3>
      <p>${route.duracion || 'Viaje directo'}</p>
      <span class="price">${money(route.precio)} / boleto</span>
    </button>`).join('');
  document.querySelectorAll('[data-route-id]').forEach(card => card.addEventListener('click', () => {
    state.selected = state.routes.find(route => route.id_ruta === Number(card.dataset.routeId));
    renderRoutes();
    updateSummary();
  }));
}

function updateSummary() {
  const quantity = Math.max(1, Number(countInput.value) || 1);
  countInput.value = quantity;
  const price = state.selected ? Number(state.selected.precio) : 0;
  summaryRoute.textContent = state.selected ? `${state.selected.origen} → ${state.selected.destino}` : 'Selecciona una ruta';
  summaryPrice.textContent = money(price);
  summaryTotal.textContent = money(price * quantity);
  buyButton.disabled = !state.selected;
}

async function loadRoutes() {
  try {
    const response = await fetch('/rutas');
    if (!response.ok) throw new Error('No se pudieron cargar las rutas.');
    const data = await response.json();
    state.routes = data.rutas_disponibles;
    status.textContent = 'Servidor conectado';
    status.classList.add('ready');
    renderRoutes();
  } catch (error) {
    status.textContent = 'Base de datos no disponible';
    routeList.innerHTML = '<div class="error">No se pudieron cargar las rutas. Verifica que MySQL esté activo y que exista la tabla <strong>rutas</strong>.</div>';
  }
}

document.querySelector('#minus').addEventListener('click', () => { countInput.value = Math.max(1, Number(countInput.value) - 1); updateSummary(); });
document.querySelector('#plus').addEventListener('click', () => { countInput.value = Math.min(10, Number(countInput.value) + 1); updateSummary(); });
countInput.addEventListener('input', updateSummary);

document.querySelector('#booking-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (!state.selected) return;
  buyButton.disabled = true;
  buyButton.firstChild.textContent = 'Procesando... ';
  formMessage.textContent = '';
  try {
    const response = await fetch('/comprar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id_ruta: state.selected.id_ruta, cantidad_boletos: Number(countInput.value) }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || 'No se pudo completar la compra.');
    const ticket = data.ticket;
    document.querySelector('#ticket-message').textContent = data.mensaje;
    document.querySelector('#ticket-folio').textContent = ticket.folio;
    document.querySelector('#ticket-route').textContent = `${ticket.origen} → ${ticket.destino}`;
    document.querySelector('#ticket-count-result').textContent = ticket.cantidad_boletos;
    document.querySelector('#ticket-total').textContent = money(ticket.total_pagado);
    document.querySelector('#ticket').hidden = false;
    document.querySelector('#ticket').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (error) {
    formMessage.textContent = error.message;
  } finally {
    buyButton.disabled = false;
    buyButton.firstChild.textContent = 'Comprar boletos ';
  }
});

loadRoutes();
updateSummary();
