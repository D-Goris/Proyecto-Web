// ─── Constantes ─────────────────────────────────────────────────────────────

const API_URL      = 'https://sticker-album-server-proyect-production.up.railway.app/api/cards';
const STORAGE_KEY  = 'mundial2026_album_state_v1';
const PACKS_KEY    = 'mundial2026_packs_v1';
const CARDS_PER_PACK = 5;

// ─── Estado Global ───────────────────────────────────────────────────────────

let allCards      = [];      // Lista plana de todas las barajitas (de la API)
let userInventory = {};      // { cardId: { count, stuck } } — compartido con album.js
let packsCount    = 0;       // Sobres disponibles
let pendingCards  = [];      // Barajitas del sobre recién abierto

// ─── DOM ─────────────────────────────────────────────────────────────────────

const phaseSelection      = document.getElementById('phase-selection');
const phaseOpening        = document.getElementById('phase-opening');
const phaseReveal         = document.getElementById('phase-reveal');

const packsAvailableCount = document.getElementById('packs-available-count');
const packGrid            = document.getElementById('pack-grid');

const packEnvelope        = document.getElementById('pack-envelope');
const envelopeVisual      = document.getElementById('envelope-visual');
const openingHintText     = document.getElementById('opening-hint-text');

const revealedCardsGrid   = document.getElementById('revealed-cards-grid');
const revealSubtitleText  = document.getElementById('reveal-subtitle-text');
const revealSummaryPills  = document.getElementById('reveal-summary-pills');

const btnKeepOpening    = document.getElementById('btn-keep-opening');
const btnBackToSelection = document.getElementById('btn-back-to-selection');

// ─── Init ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', initSobres);

async function initSobres() {
    loadState();
    setupEventListeners();
    updatePacksUI();
    await fetchCards();
    renderPackGrid();
}

// ─── Persistencia ─────────────────────────────────────────────────────────────

function loadState() {
    // Inventario compartido con album.js
    const savedInv = localStorage.getItem(STORAGE_KEY);
    if (savedInv) {
        try { userInventory = JSON.parse(savedInv); }
        catch { userInventory = {}; }
    }

    // Contador de sobres (exclusivo de esta pantalla)
    const savedPacks = localStorage.getItem(PACKS_KEY);
    packsCount = savedPacks ? parseInt(savedPacks, 10) : 0;
    if (isNaN(packsCount) || packsCount < 0) packsCount = 0;
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInventory));
    localStorage.setItem(PACKS_KEY, String(packsCount));
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function fetchCards() {
    try {
        const res  = await fetch(API_URL);
        const data = await res.json();
        allCards = flattenCards(data);
    } catch (err) {
        console.error('Error cargando barajitas:', err);
    }
}

/**
 * Convierte la respuesta de la API (arreglo de países o plana) en
 * una lista plana de barajitas.
 */
function flattenCards(data) {
    if (!Array.isArray(data)) return [];

    // Formato: [{ country, cards: [...] }]
    if (data.length > 0 && Array.isArray(data[0]?.cards)) {
        return data.flatMap(c => c.cards);
    }

    // Formato plano: [{ id, country, ... }]
    return data;
}

// ─── UI Helpers ──────────────────────────────────────────────────────────────

function updatePacksUI() {
    if (packsAvailableCount) packsAvailableCount.textContent = packsCount;
    
    // Si no hay sobres, mostrar estado vacío en el grid
    if (packsCount <= 0 && phaseSelection.classList.contains('active')) {
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

// ─── Grid de Sobres ──────────────────────────────────────────────────────────

function renderPackGrid() {
    if (!packGrid) return;
    packGrid.innerHTML = '';

    if (packsCount <= 0) {
        renderEmptyState();
        return;
    }

    // Mostrar un "pack card" por cada sobre disponible
    for (let i = 0; i < packsCount; i++) {
        packGrid.appendChild(buildPackCardElement());
    }
}

function renderEmptyState() {
    if (!packGrid) return;
    packGrid.innerHTML = `
        <div class="empty-state">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <p>No tienes sobres disponibles por abrir.</p>
        </div>
    `;
}

function buildPackCardElement() {
    const card = document.createElement('div');
    card.className = 'pack-card selectable';
    card.setAttribute('tabindex', '0'); // Accesibilidad
    
    card.innerHTML = `
        <svg class="pack-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <span class="pack-label">Sobre Oficial</span>
        <span class="pack-sub-label">5 barajitas aleatorias</span>
    `;

    card.addEventListener('click', () => openPackFlow());
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPackFlow(); }
    });

    return card;
}

// ─── Event Listeners ─────────────────────────────────────────────────────────

function setupEventListeners() {
    // Apertura: clic en el sobre animado
    packEnvelope?.addEventListener('click', onEnvelopeClick);
    packEnvelope?.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEnvelopeClick(); }
    });

    // Navegación final
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

let envelopeReady = true; // Evita doble-click durante animación

function openPackFlow() {
    if (packsCount <= 0) return;
    showPhase('opening');
    resetEnvelopeState();
    envelopeReady = true;
    updateOpeningHint('Haz clic en el sobre para abrirlo');
}

function onEnvelopeClick() {
    if (!envelopeReady) return;
    envelopeReady = false;

    // 1. Abrir la solapa
    envelopeVisual?.classList.add('flap-open');
    updateOpeningHint('¡Revelando tus barajitas!');

    // 2. Animar explosión después de 400ms
    setTimeout(() => {
        envelopeVisual?.classList.add('opening');
        spawnParticles();

        // 3. Generar y mostrar barajitas
        setTimeout(() => {
            pendingCards = drawCards();
            consumePack();
            showRevealPhase();
        }, 650);
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

// ─── Generación de Cartas ────────────────────────────────────────────────────

/**
 * Selecciona CARDS_PER_PACK barajitas aleatorias de allCards.
 * Prioriza barajitas que el usuario aún no tiene para mejorar la experiencia.
 */
function drawCards() {
    if (allCards.length === 0) return [];

    const missing = allCards.filter(c => {
        const inv = userInventory[c.id];
        return !inv || inv.count === 0;
    });

    const pool = missing.length >= CARDS_PER_PACK ? missing : allCards;
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, CARDS_PER_PACK);
}

/**
 * Consume un sobre y actualiza el inventario con las cartas obtenidas.
 */
function consumePack() {
    packsCount = Math.max(0, packsCount - 1);

    pendingCards.forEach(card => {
        if (!userInventory[card.id]) {
            userInventory[card.id] = { count: 0, stuck: false };
        }
        userInventory[card.id].count += 1;
    });

    saveState();
    updatePacksUI();
}

// ─── Fase Reveal ─────────────────────────────────────────────────────────────

function showRevealPhase() {
    showPhase('reveal');

    if (!revealedCardsGrid) return;
    revealedCardsGrid.innerHTML = '';

    let newCount = 0;
    let repeatedCount = 0;

    pendingCards.forEach((card, idx) => {
        const inv    = userInventory[card.id] || { count: 0, stuck: false };
        // "Nueva" = solo tiene 1 copia (la que acabamos de añadir); "Repetida" = ya tenía más
        const isNew  = inv.count === 1;
        if (isNew) newCount++; else repeatedCount++;

        const wrapper = document.createElement('div');
        wrapper.className = 'revealed-card-wrapper';
        wrapper.style.animationDelay = `${idx * 120}ms`;

        const badge = document.createElement('span');
        badge.className = `revealed-status-badge ${isNew ? 'is-new' : 'is-repeated'}`;
        badge.textContent = isNew ? '★ Nueva' : `×${inv.count} Repetida`;

        const cardEl = buildCardElement(card, inv);

        wrapper.appendChild(badge);
        wrapper.appendChild(cardEl);
        revealedCardsGrid.appendChild(wrapper);
    });

    if (revealSubtitleText) {
        revealSubtitleText.textContent = '¡Felicidades! Has conseguido estas barajitas.';
    }

    if (revealSummaryPills) {
        revealSummaryPills.innerHTML = `
            <span class="pill pill-new">${newCount} Nuevas</span>
            <span class="pill pill-repeated">${repeatedCount} Repetidas</span>
        `;
    }
}

/**
 * Construye el HTML de una barajita (mini card), reutilizando las
 * clases de styles.css exactamente igual que album.js.
 */
function buildCardElement(card, inv) {
    const isStuck   = inv?.stuck ?? false;
    const isEscudo  = card.role === 'Escudo';
    const roleClass = `tag-${(card.role || 'jugador').toLowerCase()}`;

    const el = document.createElement('article');
    el.className = `card-item ${isStuck ? 'status-stuck' : 'status-missing'} ${isEscudo ? 'role-escudo' : ''}`;

    el.innerHTML = `
        <div class="card-header-bar">
            <span class="card-code">${card.code}</span>
            <span class="role-tag ${roleClass}">${card.role}</span>
        </div>
        
        <div class="card-image-box">
            ${isEscudo ? `
                <svg class="placeholder-symbol" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
            ` : `
                <svg class="placeholder-symbol" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `}
        </div>

        <div class="card-info">
            <div class="player-name">${card.name}</div>
            <div class="player-sub">${card.country}</div>
        </div>
    `;

    return el;
}

// ─── Animaciones Visuales ────────────────────────────────────────────────────

function spawnParticles() {
    const particleContainer = document.getElementById('opening-particles');
    if (!particleContainer) return;
    particleContainer.innerHTML = '';

    const colors = ['#f59e0b', '#fbbf24', '#ffffff', '#ef4444', '#3b82f6'];
    const amount = 30;

    for (let i = 0; i < amount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        // Random properties
        const tx = (Math.random() - 0.5) * 300;
        const ty = (Math.random() - 0.5) * 300;
        const scale = Math.random() * 1.5 + 0.5;
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

    // Scroll to top on phase change
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
