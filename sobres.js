// ─── Constantes y Configuración de la API ──────────────────────────────────────

const API_URL = 'https://sticker-album-server-proyect-production.up.railway.app/api';
const API_KEY = 'WC2026_GRP1_A205DCCA7C36B6F7';

// ─── Estado Global ───────────────────────────────────────────────────────────

let packsCount   = 0;   // Sobres disponibles (obtenidos del servidor)
let pendingCards = [];  // Barajitas del sobre recién abierto (retornadas por la API)

// ─── Referencias al DOM ───────────────────────────────────────────────────────

const phaseSelection      = document.getElementById('phase-selection');
const phaseOpening        = document.getElementById('phase-opening');
const phaseReveal         = document.getElementById('phase-reveal');

const headerPacksCount    = document.getElementById('header-packs-count');
const packsAvailableCount = document.getElementById('packs-available-count');
const packGrid            = document.getElementById('packs-grid');

const packEnvelope        = document.getElementById('pack-envelope');
const envelopeVisual      = document.getElementById('envelope-visual');
const openingHintText     = document.getElementById('opening-hint-text');

const revealedCardsGrid   = document.getElementById('revealed-cards-grid');
const revealSubtitleText  = document.getElementById('reveal-subtitle-text');
const revealSummaryPills  = document.getElementById('reveal-summary-pills');

const btnKeepOpening      = document.getElementById('btn-keep-opening');
const btnBackToSelection  = document.getElementById('btn-back-to-selection');

// ─── Inicialización ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', initSobres);

async function initSobres() {
    setupEventListeners();
    await fetchPacksCount();
    renderPackGrid();
}

// ─── Servicios de API Remota ──────────────────────────────────────────────────

/**
 * Consulta el perfil del grupo en la API para obtener la cantidad real de sobres no abiertos.
 */
async function fetchPacksCount() {
    try {
        const res = await fetch(`${API_URL}/groups/me`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.json();

        if (data.group && typeof data.group.unopenedPacks === 'number') {
            packsCount = data.group.unopenedPacks;
        } else {
            packsCount = 0;
        }
        updatePacksUI();
    } catch (err) {
        console.error('Error al consultar perfil de grupo:', err);
    }
}

/**
 * Realiza la petición POST/GET a la API para abrir 1 sobre.
 * El servidor descuenta el sobre e ingresa las barajitas a las repetidas del grupo.
 */
async function openPackFromAPI() {
    try {
        const res = await fetch(`${API_URL}/packs/open`, {
            headers: { 'x-api-key': API_KEY }
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw new Error(errData.message || `HTTP Error ${res.status}`);
        }

        const data = await res.json();

        if (typeof data.unopenedPacks === 'number') {
            packsCount = data.unopenedPacks;
            updatePacksUI();
        }

        return data.pack || [];
    } catch (err) {
        console.error('Error al abrir sobre vía API:', err);
        alert(err.message || 'No se pudo abrir el sobre. Inténtalo de nuevo.');
        return null;
    }
}

// ─── UI Helpers ──────────────────────────────────────────────────────────────

function updatePacksUI() {
    if (packsAvailableCount) packsAvailableCount.textContent = packsCount;
    if (headerPacksCount) headerPacksCount.textContent = packsCount;

    if (packsCount <= 0 && phaseSelection && phaseSelection.classList.contains('active')) {
        renderEmptyState();
    }
}

function bumpCounterAnimation() {
    const counterWidget = document.querySelector('.packs-count-widget');
    if (counterWidget) {
        counterWidget.style.transform = 'scale(1.1)';
        counterWidget.style.color = 'var(--accent-gold)';
        setTimeout(() => {
            counterWidget.style.transform = 'scale(1)';
            counterWidget.style.color = 'var(--text-main)';
        }, 200);
    }
}

// ─── Renderizado del Grid de Sobres ──────────────────────────────────────────

function renderPackGrid() {
    if (!packGrid) return;
    packGrid.innerHTML = '';

    if (packsCount <= 0) {
        renderEmptyState();
        return;
    }

    for (let i = 0; i < packsCount; i++) {
        packGrid.appendChild(buildPackCardElement());
    }
}

function renderEmptyState() {
    if (!packGrid) return;
    packGrid.innerHTML = `
        <div class="no-packs-state" style="grid-column: 1 / -1;">
            <div class="no-packs-icon">
                <svg viewBox="0 0 24 24" width="72" height="72" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            </div>
            <h3>No tienes sobres disponibles</h3>
            <p>Los nuevos sobres asignados a tu grupo aparecerán aquí automáticamente.</p>
        </div>
    `;
}

function buildPackCardElement() {
    const card = document.createElement('div');
    card.className = 'pack-card selectable';
    card.setAttribute('tabindex', '0');

    card.innerHTML = `
        <svg class="pack-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <span class="pack-label">Sobre Oficial</span>
        <span class="pack-sub-label">7 barajitas aleatorias</span>
    `;

    card.addEventListener('click', () => openPackFlow());
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPackFlow(); }
    });

    return card;
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

function setupEventListeners() {
    packEnvelope?.addEventListener('click', onEnvelopeClick);
    packEnvelope?.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEnvelopeClick(); }
    });

    btnKeepOpening?.addEventListener('click', () => {
        if (packsCount > 0) {
            showPhase('selection');
            renderPackGrid();
        } else {
            alert('¡Ya no te quedan sobres!');
            showPhase('selection');
            renderPackGrid();
        }
    });

    btnBackToSelection?.addEventListener('click', () => {
        showPhase('selection');
        renderPackGrid();
    });
}

// ─── Flujo de Apertura ───────────────────────────────────────────────────────

let envelopeReady = true;

function openPackFlow() {
    if (packsCount <= 0) return;
    showPhase('opening');
    resetEnvelopeState();
    envelopeReady = true;
    updateOpeningHint('Haz clic en el sobre para abrirlo');
}

async function onEnvelopeClick() {
    if (!envelopeReady) return;
    envelopeReady = false;

    // 1. Abrir la solapa y solicitar barajitas a la API
    envelopeVisual?.classList.add('flap-open');
    updateOpeningHint('¡Abriendo sobre en el servidor!');

    // Petición a la API central en paralelo con la animación
    const cardsPromise = openPackFromAPI();

    // 2. Animar explosión
    setTimeout(async () => {
        envelopeVisual?.classList.add('opening');
        spawnParticles();

        const cards = await cardsPromise;
        if (cards && cards.length > 0) {
            pendingCards = cards;
            setTimeout(() => {
                showRevealPhase();
            }, 350);
        } else {
            // En caso de error en la API, retornar a selección
            showPhase('selection');
            renderPackGrid();
        }
    }, 400);
}

function resetEnvelopeState() {
    if (envelopeVisual) {
        envelopeVisual.classList.remove('flap-open', 'opening');
    }
}

function updateOpeningHint(text) {
    if (openingHintText) openingHintText.textContent = text;
}

// ─── Fase Reveal ─────────────────────────────────────────────────────────────

function showRevealPhase() {
    showPhase('reveal');

    if (!revealedCardsGrid) return;
    revealedCardsGrid.innerHTML = '';

    let newCount = 0;
    let repeatedCount = 0;

    pendingCards.forEach((card, idx) => {
        const isNew = card.isNewInAlbum === true;
        if (isNew) newCount++; else repeatedCount++;

        const wrapper = document.createElement('div');
        wrapper.className = 'revealed-card-wrapper';
        wrapper.style.animationDelay = `${idx * 100}ms`;

        const badge = document.createElement('span');
        badge.className = `revealed-status-badge ${isNew ? 'is-new' : 'is-repeated'}`;
        badge.textContent = isNew ? '★ Nueva' : 'Repetida';

        const cardEl = buildCardElement(card);

        wrapper.appendChild(badge);
        wrapper.appendChild(cardEl);
        revealedCardsGrid.appendChild(wrapper);
    });

    if (revealSubtitleText) {
        revealSubtitleText.textContent = `¡Felicidades! Conseguiste ${pendingCards.length} barajitas del Mundial 2026.`;
    }

    if (revealSummaryPills) {
        revealSummaryPills.innerHTML = `
            <span class="pill pill-new">${newCount} Nuevas</span>
            <span class="pill pill-repeated">${repeatedCount} Repetidas</span>
        `;
    }
}

/**
 * Construye el HTML de una barajita devuelta por la API.
 * Busca la imagen en el diccionario PLAYER_PHOTOS de photos.js usando card.code.
 */
function buildCardElement(card) {
    const isEscudo  = card.role === 'Escudo';
    const roleClass = `tag-${(card.role || 'jugador').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`;
    const cardCode  = card.code || card.id || '';

    // Buscar imagen en el diccionario de photos.js
    const photoUrl = (typeof PLAYER_PHOTOS !== 'undefined' && PLAYER_PHOTOS[cardCode])
        ? PLAYER_PHOTOS[cardCode]
        : null;

    const el = document.createElement('article');
    el.className = `card-item ${card.isNewInAlbum ? 'status-missing' : 'status-stuck'} ${isEscudo ? 'role-escudo' : ''}`;

    // Imagen real o SVG de placeholder
    const imageContent = photoUrl
        ? `<img
               src="${photoUrl}"
               alt="${card.name || cardCode}"
               class="card-photo"
               loading="lazy"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
           />
           <span class="placeholder-fallback" style="display:none;">
               ${isEscudo
                   ? `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 6v6l4 2"/></svg>`
                   : `<svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
               }
           </span>`
        : `<svg class="placeholder-symbol" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
               ${isEscudo
                   ? `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 6v6l4 2"/>`
                   : `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`
               }
           </svg>`;

    el.innerHTML = `
        <div class="card-header-bar">
            <span class="card-code">${cardCode}</span>
            <span class="role-tag ${roleClass}">${card.role || 'Jugador'}</span>
        </div>

        <div class="card-image-box">
            ${imageContent}
        </div>

        <div class="card-info">
            <div class="player-name">${card.name || 'Barajita'}</div>
            <div class="player-sub">${card.country || ''}</div>
        </div>
    `;

    return el;
}

// ─── Animaciones Visuales ────────────────────────────────────────────────────

function spawnParticles() {
    const particleContainer = document.getElementById('particle-container');
    if (!particleContainer) return;
    particleContainer.innerHTML = '';

    const colors = ['#f59e0b', '#fbbf24', '#ffffff', '#ef4444', '#3b82f6'];
    const amount = 35;

    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        const tx = (Math.random() - 0.5) * 320;
        const ty = (Math.random() - 0.5) * 320;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dur = Math.random() * 0.6 + 0.4;
        const delay = Math.random() * 0.2;

        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.backgroundColor = color;
        p.style.width = `${Math.random() * 8 + 4}px`;
        p.style.height = p.style.width;
        p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        p.style.animation = `particle-burst ${dur}s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s forwards`;

        particleContainer.appendChild(p);
        setTimeout(() => p.remove(), (dur + delay + 0.1) * 1000);
    }
}

// ─── Phase Switcher ───────────────────────────────────────────────────────────

/**
 * Switcher de fases de la vista de sobres.
 * @param {'selection' | 'opening' | 'reveal'} phase
 */
function showPhase(phase) {
    const phases = {
        selection : phaseSelection,
        opening   : phaseOpening,
        reveal    : phaseReveal,
    };

    Object.entries(phases).forEach(([key, el]) => {
        if (!el) return;
        const isActive = key === phase;
        el.classList.toggle('active', isActive);
        el.setAttribute('aria-hidden', String(!isActive));
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
