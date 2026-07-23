// ==========================================================================
//  Intercambio.js — Trading Logic & Socket.IO Real-Time
//  API Central del Álbum Mundial 2026
// ==========================================================================

// --- CONSTANTES Y CONFIGURACIÓN ---
const API_URL = 'https://sticker-album-server-proyect-production.up.railway.app/api';
const API_KEY = 'WC2026_GRP1_A205DCCA7C36B6F7';
const SOCKET_URL = 'https://sticker-album-server-proyect-production.up.railway.app';

// --- ESTADO GLOBAL ---
let myProfile = null;       // Grupo autenticado { _id, groupNumber, name, ... }
let allGroups = [];          // Lista de todos los grupos
let myDuplicates = [];       // Mis barajitas repetidas
let targetDuplicates = [];   // Repetidas del grupo seleccionado
let allTrades = [];          // Todos los intercambios del mercado

// Selecciones del formulario de propuesta
let selectedOfferedCard = null;    // Código de la barajita que ofrezco
let selectedRequestedCard = null;  // Código de la barajita que pido
let selectedTargetGroupId = null;  // ID del grupo destino

// Socket.IO instance
let socket = null;

// --- REFERENCIAS AL DOM ---
const headerPendingCount   = document.getElementById('header-pending-count');

// Tab navigation
const tabButtons           = document.querySelectorAll('.intercambio-tab');

// Panels
const panelMercado         = document.getElementById('panel-mercado');
const panelProponer        = document.getElementById('panel-proponer');
const panelMisIntercambios = document.getElementById('panel-mis-intercambios');
const panels = { mercado: panelMercado, proponer: panelProponer, 'mis-intercambios': panelMisIntercambios };

// Market
const marketGrid           = document.getElementById('market-grid');
const btnRefreshMarket     = document.getElementById('btn-refresh-market');

// Propose form
const targetGroupSelect    = document.getElementById('target-group-select');
const myDuplicatesGrid     = document.getElementById('my-duplicates-grid');
const theirDuplicatesGrid  = document.getElementById('their-duplicates-grid');
const proposalSummary      = document.getElementById('proposal-summary');
const summaryOfferedCode   = document.getElementById('summary-offered-code');
const summaryOfferedName   = document.getElementById('summary-offered-name');
const summaryRequestedCode = document.getElementById('summary-requested-code');
const summaryRequestedName = document.getElementById('summary-requested-name');
const btnSubmitTrade       = document.getElementById('btn-submit-trade');

// My Trades - Sub-tabs
const subTabButtons        = document.querySelectorAll('.sub-tab');
const subtabRecibidas      = document.getElementById('subtab-recibidas');
const subtabEnviadas       = document.getElementById('subtab-enviadas');
const receivedTradesGrid   = document.getElementById('received-trades-grid');
const sentTradesGrid       = document.getElementById('sent-trades-grid');
const receivedCount        = document.getElementById('received-count');
const sentCount            = document.getElementById('sent-count');

// Toast container
const toastContainer       = document.getElementById('toast-container');

// ==========================================================================
//  INICIALIZACIÓN
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initApp();
});

async function initApp() {
    try {
        await fetchMyProfile();
        await Promise.all([
            fetchAllGroups(),
            fetchMyDuplicates(),
            fetchAllTrades()
        ]);
        populateGroupSelect();
        renderMarket();
        renderMyTrades();
        initSocketIO();
    } catch (err) {
        console.error('Error inicializando la aplicación de intercambios:', err);
    }
}

// ==========================================================================
//  EVENT LISTENERS
// ==========================================================================

function initEventListeners() {
    // Main tab navigation
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });

    // Sub-tab navigation (Recibidas / Enviadas)
    subTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const subtab = btn.getAttribute('data-subtab');
            switchSubTab(subtab);
        });
    });

    // Refresh market
    if (btnRefreshMarket) {
        btnRefreshMarket.addEventListener('click', async () => {
            btnRefreshMarket.classList.add('spinning');
            await fetchAllTrades();
            renderMarket();
            renderMyTrades();
            setTimeout(() => btnRefreshMarket.classList.remove('spinning'), 600);
        });
    }

    // Target group select change
    if (targetGroupSelect) {
        targetGroupSelect.addEventListener('change', async (e) => {
            selectedTargetGroupId = e.target.value || null;
            selectedRequestedCard = null;
            updateProposalSummary();

            if (selectedTargetGroupId) {
                await fetchTargetGroupDuplicates(selectedTargetGroupId);
                renderTheirDuplicates();
            } else {
                targetDuplicates = [];
                renderTheirDuplicates();
            }
        });
    }

    // Submit trade proposal
    if (btnSubmitTrade) {
        btnSubmitTrade.addEventListener('click', handleSubmitTrade);
    }
}

// Tab switching
function switchTab(tabName) {
    tabButtons.forEach(btn => {
        const isActive = btn.getAttribute('data-tab') === tabName;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    Object.entries(panels).forEach(([name, panel]) => {
        if (panel) panel.classList.toggle('active', name === tabName);
    });

    // Refresh data when switching to certain tabs
    if (tabName === 'mercado') {
        fetchAllTrades().then(() => renderMarket());
    } else if (tabName === 'mis-intercambios') {
        fetchAllTrades().then(() => renderMyTrades());
    } else if (tabName === 'proponer') {
        fetchMyDuplicates().then(() => renderMyDuplicates());
    }
}

function switchSubTab(subtabName) {
    subTabButtons.forEach(btn => {
        const isActive = btn.getAttribute('data-subtab') === subtabName;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (subtabRecibidas) subtabRecibidas.classList.toggle('active', subtabName === 'recibidas');
    if (subtabEnviadas) subtabEnviadas.classList.toggle('active', subtabName === 'enviadas');
}

// ==========================================================================
//  API FUNCTIONS
// ==========================================================================

async function fetchMyProfile() {
    try {
        const res = await fetch(`${API_URL}/groups/me`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        myProfile = data.group;
    } catch (err) {
        console.error('Error obteniendo perfil:', err);
    }
}

async function fetchAllGroups() {
    try {
        const res = await fetch(`${API_URL}/groups`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allGroups = data.groups || [];
    } catch (err) {
        console.error('Error obteniendo grupos:', err);
    }
}

async function fetchMyDuplicates() {
    try {
        const res = await fetch(`${API_URL}/inventory/duplicates`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        myDuplicates = data.duplicates || [];
    } catch (err) {
        console.error('Error obteniendo repetidas propias:', err);
    }
}

async function fetchTargetGroupDuplicates(groupId) {
    try {
        const res = await fetch(`${API_URL}/groups/${encodeURIComponent(groupId)}/duplicates`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        targetDuplicates = data.duplicates || [];
    } catch (err) {
        console.error('Error obteniendo repetidas del grupo:', err);
        targetDuplicates = [];
    }
}

async function fetchAllTrades(status) {
    try {
        let url = `${API_URL}/trades`;
        if (status) url += `?status=${encodeURIComponent(status)}`;
        const res = await fetch(url, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allTrades = data.trades || data || [];
        if (!Array.isArray(allTrades)) allTrades = [];
        updatePendingCount();
    } catch (err) {
        console.error('Error obteniendo intercambios:', err);
    }
}

async function proposeTrade(targetGroupId, offeredCardCode, requestedCardCode) {
    const res = await fetch(`${API_URL}/trades`, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ targetGroupId, offeredCardCode, requestedCardCode })
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${res.status}`);
    }
    return res.json();
}

async function acceptTrade(tradeId) {
    const res = await fetch(`${API_URL}/trades/${encodeURIComponent(tradeId)}/accept`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY }
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${res.status}`);
    }
    return res.json();
}

async function rejectTrade(tradeId) {
    const res = await fetch(`${API_URL}/trades/${encodeURIComponent(tradeId)}/reject`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY }
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${res.status}`);
    }
    return res.json();
}

async function cancelTrade(tradeId) {
    const res = await fetch(`${API_URL}/trades/${encodeURIComponent(tradeId)}/cancel`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY }
    });
    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${res.status}`);
    }
    return res.json();
}

// ==========================================================================
//  SOCKET.IO — Real-Time Events
// ==========================================================================

function initSocketIO() {
    if (typeof io === 'undefined') {
        console.warn('Socket.IO no disponible — funcionalidad en tiempo real desactivada.');
        return;
    }

    socket = io(SOCKET_URL, {
        auth: { apiKey: API_KEY }
    });

    socket.on('connect', () => {
        console.log('Socket.IO conectado:', socket.id);
    });

    socket.on('connect_error', (err) => {
        console.error('Socket.IO error de conexión:', err.message);
    });

    // --- Trade Events ---

    // New proposal received (I'm the target)
    socket.on('trade:proposed', (data) => {
        showToast('proposed', '📩 Nueva Propuesta',
            `${escapeHTML(data.proposerGroup?.name || 'Un grupo')} quiere intercambiar contigo.`);
        fetchAllTrades().then(() => {
            renderMarket();
            renderMyTrades();
        });
    });

    // My proposal was accepted
    socket.on('trade:accepted', (data) => {
        showToast('accepted', '✅ Intercambio Aceptado',
            data.message || '¡Tu propuesta de intercambio fue aceptada!');
        fetchAllTrades().then(() => {
            renderMarket();
            renderMyTrades();
        });
        // Refresh duplicates since inventory changed
        fetchMyDuplicates().then(() => renderMyDuplicates());
    });

    // My proposal was rejected
    socket.on('trade:rejected', (data) => {
        showToast('rejected', '❌ Intercambio Rechazado',
            data.message || 'Tu propuesta de intercambio fue rechazada.');
        fetchAllTrades().then(() => {
            renderMarket();
            renderMyTrades();
        });
    });

    // Proposal I received was cancelled by the proposer
    socket.on('trade:cancelled', (data) => {
        showToast('cancelled', '🚫 Propuesta Cancelada',
            data.message || 'La propuesta de intercambio fue cancelada por el proponente.');
        fetchAllTrades().then(() => {
            renderMarket();
            renderMyTrades();
        });
    });

    // New offer posted in the global market
    socket.on('market:new_offer', (data) => {
        showToast('market', '📢 Nueva Oferta en el Mercado',
            'Se publicó una nueva propuesta de intercambio en el mercado.');
        fetchAllTrades().then(() => renderMarket());
    });
}

// ==========================================================================
//  RENDERING — Market
// ==========================================================================

function renderMarket() {
    if (!marketGrid) return;

    const pendingTrades = allTrades.filter(t => t.status === 'PENDING');

    if (pendingTrades.length === 0) {
        marketGrid.innerHTML = renderEmptyState(
            'No hay ofertas en el mercado',
            'Cuando alguien publique una propuesta de intercambio, aparecerá aquí.'
        );
        return;
    }

    marketGrid.innerHTML = pendingTrades.map((trade, i) => {
        const isMyProposal = trade.proposerGroup?._id === myProfile?._id;
        const isTargetedAtMe = trade.targetGroup?._id === myProfile?._id;

        let actionsHTML = '';
        if (isTargetedAtMe) {
            actionsHTML = `
                <div class="trade-card-actions">
                    <button class="btn btn-primary" onclick="handleAcceptTrade('${escapeAttr(trade._id)}')">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        Aceptar
                    </button>
                    <button class="btn btn-danger" onclick="handleRejectTrade('${escapeAttr(trade._id)}')">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Rechazar
                    </button>
                </div>`;
        } else if (isMyProposal) {
            actionsHTML = `
                <div class="trade-card-actions">
                    <button class="btn btn-secondary" onclick="handleCancelTrade('${escapeAttr(trade._id)}')">
                        Cancelar Propuesta
                    </button>
                </div>`;
        }

        return renderTradeCard(trade, actionsHTML, i);
    }).join('');
}

// ==========================================================================
//  RENDERING — My Trades (Received & Sent)
// ==========================================================================

function renderMyTrades() {
    if (!myProfile) return;

    // Received: trades where I am the target group
    const received = allTrades.filter(t => t.targetGroup?._id === myProfile._id);
    const receivedPending = received.filter(t => t.status === 'PENDING');

    // Sent: trades where I am the proposer
    const sent = allTrades.filter(t => t.proposerGroup?._id === myProfile._id);
    const sentPending = sent.filter(t => t.status === 'PENDING');

    // Update counters
    if (receivedCount) receivedCount.textContent = receivedPending.length;
    if (sentCount) sentCount.textContent = sentPending.length;
    updatePendingCount();

    // Render received trades
    if (receivedTradesGrid) {
        if (received.length === 0) {
            receivedTradesGrid.innerHTML = renderEmptyState(
                'No has recibido propuestas',
                'Cuando otro grupo te proponga un intercambio, aparecerá aquí.'
            );
        } else {
            receivedTradesGrid.innerHTML = received.map((trade, i) => {
                let actionsHTML = '';
                if (trade.status === 'PENDING') {
                    actionsHTML = `
                        <div class="trade-card-actions">
                            <button class="btn btn-primary" onclick="handleAcceptTrade('${escapeAttr(trade._id)}')">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                Aceptar
                            </button>
                            <button class="btn btn-danger" onclick="handleRejectTrade('${escapeAttr(trade._id)}')">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                Rechazar
                            </button>
                        </div>`;
                }
                return renderTradeCard(trade, actionsHTML, i);
            }).join('');
        }
    }

    // Render sent trades
    if (sentTradesGrid) {
        if (sent.length === 0) {
            sentTradesGrid.innerHTML = renderEmptyState(
                'No has enviado propuestas',
                'Usa la pestaña "Proponer" para enviar intercambios a otros grupos.'
            );
        } else {
            sentTradesGrid.innerHTML = sent.map((trade, i) => {
                let actionsHTML = '';
                if (trade.status === 'PENDING') {
                    actionsHTML = `
                        <div class="trade-card-actions">
                            <button class="btn btn-danger" onclick="handleCancelTrade('${escapeAttr(trade._id)}')">
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                                Cancelar
                            </button>
                        </div>`;
                }
                return renderTradeCard(trade, actionsHTML, i);
            }).join('');
        }
    }
}

// ==========================================================================
//  RENDERING — Trade Card (Shared component)
// ==========================================================================

function renderTradeCard(trade, actionsHTML, index) {
    const proposer = trade.proposerGroup?.name || 'Desconocido';
    const target = trade.targetGroup?.name || 'Desconocido';
    const statusClass = `status-${(trade.status || 'pending').toLowerCase()}`;
    const statusLabel = formatStatus(trade.status);
    const timeAgo = trade.createdAt ? formatTimeAgo(trade.createdAt) : '';

    // Card info — use the code fields from the trade
    const offeredCode = trade.offeredCardCode || trade.offeredCard?.code || '???';
    const requestedCode = trade.requestedCardCode || trade.requestedCard?.code || '???';
    const offeredName = trade.offeredCard?.name || offeredCode;
    const requestedName = trade.requestedCard?.name || requestedCode;
    const offeredCountry = trade.offeredCard?.country || '';
    const requestedCountry = trade.requestedCard?.country || '';

    return `
        <div class="trade-card" style="animation-delay: ${index * 0.06}s">
            <div class="trade-card-header">
                <div class="trade-groups-info">
                    <span class="trade-group-name" title="${escapeAttr(proposer)}">${escapeHTML(proposer)}</span>
                    <span class="trade-arrow">→</span>
                    <span class="trade-group-name" title="${escapeAttr(target)}">${escapeHTML(target)}</span>
                </div>
                <span class="trade-status-badge ${statusClass}">${statusLabel}</span>
            </div>
            <div class="trade-card-body">
                <div class="trade-card-slot">
                    <span class="trade-slot-label label-ofrece">Ofrece</span>
                    <span class="trade-slot-code">${escapeHTML(offeredCode)}</span>
                    <span class="trade-slot-name" title="${escapeAttr(offeredName)}">${escapeHTML(offeredName)}</span>
                    ${offeredCountry ? `<span class="trade-slot-country">${escapeHTML(offeredCountry)}</span>` : ''}
                </div>
                <div class="trade-exchange-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="17 1 21 5 17 9"></polyline>
                        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                        <polyline points="7 23 3 19 7 15"></polyline>
                        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                    </svg>
                </div>
                <div class="trade-card-slot">
                    <span class="trade-slot-label label-pide">Pide</span>
                    <span class="trade-slot-code">${escapeHTML(requestedCode)}</span>
                    <span class="trade-slot-name" title="${escapeAttr(requestedName)}">${escapeHTML(requestedName)}</span>
                    ${requestedCountry ? `<span class="trade-slot-country">${escapeHTML(requestedCountry)}</span>` : ''}
                </div>
            </div>
            ${timeAgo ? `<div class="trade-time">${escapeHTML(timeAgo)}</div>` : ''}
            ${actionsHTML}
        </div>`;
}

// ==========================================================================
//  RENDERING — Proposal Form
// ==========================================================================

function populateGroupSelect() {
    if (!targetGroupSelect || !myProfile) return;

    targetGroupSelect.innerHTML = '<option value="">— Selecciona un grupo —</option>';
    allGroups
        .filter(g => g._id !== myProfile._id) // Exclude my own group
        .forEach(g => {
            const option = document.createElement('option');
            option.value = g._id;
            option.textContent = `${g.name || 'Grupo ' + g.groupNumber}`;
            targetGroupSelect.appendChild(option);
        });

    // Also render initial state of my duplicates
    renderMyDuplicates();
}

function renderMyDuplicates() {
    if (!myDuplicatesGrid) return;

    if (myDuplicates.length === 0) {
        myDuplicatesGrid.innerHTML = `
            <div class="duplicates-empty-state">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                </svg>
                <p>No tienes barajitas repetidas disponibles para ofrecer.</p>
            </div>`;
        return;
    }

    myDuplicatesGrid.innerHTML = myDuplicates.map(dup => {
        const isSelected = selectedOfferedCard === dup.code;
        return `
            <div class="dup-card ${isSelected ? 'selected' : ''}"
                 onclick="selectOfferedCard('${escapeAttr(dup.code)}', '${escapeAttr(dup.name)}')"
                 title="${escapeAttr(dup.name)} (${escapeAttr(dup.country)})">
                <div class="dup-card-code">${escapeHTML(dup.code)}</div>
                <div class="dup-card-name">${escapeHTML(dup.name)}</div>
                <div class="dup-card-country">${escapeHTML(dup.country || '')}</div>
                <div class="dup-card-count">×${dup.duplicatesAvailable || 1}</div>
            </div>`;
    }).join('');
}

function renderTheirDuplicates() {
    if (!theirDuplicatesGrid) return;

    if (!selectedTargetGroupId) {
        theirDuplicatesGrid.innerHTML = `
            <div class="duplicates-empty-state">
                <p>Selecciona un grupo para ver sus repetidas</p>
            </div>`;
        return;
    }

    if (targetDuplicates.length === 0) {
        theirDuplicatesGrid.innerHTML = `
            <div class="duplicates-empty-state">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>Este grupo no tiene barajitas repetidas disponibles.</p>
            </div>`;
        return;
    }

    theirDuplicatesGrid.innerHTML = targetDuplicates.map(dup => {
        const isSelected = selectedRequestedCard === dup.code;
        return `
            <div class="dup-card ${isSelected ? 'selected' : ''}"
                 onclick="selectRequestedCard('${escapeAttr(dup.code)}', '${escapeAttr(dup.name)}')"
                 title="${escapeAttr(dup.name)} (${escapeAttr(dup.country)})">
                <div class="dup-card-code">${escapeHTML(dup.code)}</div>
                <div class="dup-card-name">${escapeHTML(dup.name)}</div>
                <div class="dup-card-country">${escapeHTML(dup.country || '')}</div>
                <div class="dup-card-count">×${dup.duplicatesAvailable || 1}</div>
            </div>`;
    }).join('');
}

// ==========================================================================
//  CARD SELECTION HANDLERS
// ==========================================================================

function selectOfferedCard(code, name) {
    selectedOfferedCard = selectedOfferedCard === code ? null : code;
    renderMyDuplicates();
    updateProposalSummary();
}

function selectRequestedCard(code, name) {
    selectedRequestedCard = selectedRequestedCard === code ? null : code;
    renderTheirDuplicates();
    updateProposalSummary();
}

function updateProposalSummary() {
    if (!proposalSummary) return;

    const hasOffer = !!selectedOfferedCard;
    const hasRequest = !!selectedRequestedCard;
    const hasTarget = !!selectedTargetGroupId;

    if (hasOffer || hasRequest) {
        proposalSummary.style.display = 'block';

        // Find card details
        const offeredDup = myDuplicates.find(d => d.code === selectedOfferedCard);
        const requestedDup = targetDuplicates.find(d => d.code === selectedRequestedCard);

        if (summaryOfferedCode) summaryOfferedCode.textContent = selectedOfferedCard || '—';
        if (summaryOfferedName) summaryOfferedName.textContent = offeredDup?.name || '—';
        if (summaryRequestedCode) summaryRequestedCode.textContent = selectedRequestedCard || '—';
        if (summaryRequestedName) summaryRequestedName.textContent = requestedDup?.name || '—';

        if (btnSubmitTrade) {
            btnSubmitTrade.disabled = !(hasOffer && hasRequest && hasTarget);
        }
    } else {
        proposalSummary.style.display = 'none';
    }
}

// ==========================================================================
//  ACTION HANDLERS
// ==========================================================================

async function handleSubmitTrade() {
    if (!selectedTargetGroupId || !selectedOfferedCard || !selectedRequestedCard) return;

    btnSubmitTrade.disabled = true;
    btnSubmitTrade.querySelector('span').textContent = 'Enviando...';

    try {
        await proposeTrade(selectedTargetGroupId, selectedOfferedCard, selectedRequestedCard);
        showToast('accepted', '✅ Propuesta Enviada', 'Tu propuesta de intercambio ha sido enviada exitosamente.');

        // Reset form
        selectedOfferedCard = null;
        selectedRequestedCard = null;
        updateProposalSummary();
        renderMyDuplicates();
        renderTheirDuplicates();

        // Refresh data
        await Promise.all([fetchAllTrades(), fetchMyDuplicates()]);
        renderMarket();
        renderMyTrades();
        renderMyDuplicates();
    } catch (err) {
        showToast('rejected', '❌ Error', err.message || 'No se pudo enviar la propuesta.');
    } finally {
        btnSubmitTrade.disabled = false;
        btnSubmitTrade.querySelector('span').textContent = 'Enviar Propuesta';
    }
}

async function handleAcceptTrade(tradeId) {
    try {
        await acceptTrade(tradeId);
        showToast('accepted', '✅ Intercambio Completado', '¡Las barajitas han sido intercambiadas exitosamente!');
        await Promise.all([fetchAllTrades(), fetchMyDuplicates()]);
        renderMarket();
        renderMyTrades();
        renderMyDuplicates();
    } catch (err) {
        showToast('rejected', '❌ Error', err.message || 'No se pudo aceptar el intercambio.');
    }
}

async function handleRejectTrade(tradeId) {
    try {
        await rejectTrade(tradeId);
        showToast('cancelled', '🚫 Propuesta Rechazada', 'Has rechazado la propuesta de intercambio.');
        await fetchAllTrades();
        renderMarket();
        renderMyTrades();
    } catch (err) {
        showToast('rejected', '❌ Error', err.message || 'No se pudo rechazar el intercambio.');
    }
}

async function handleCancelTrade(tradeId) {
    try {
        await cancelTrade(tradeId);
        showToast('cancelled', '🚫 Propuesta Cancelada', 'Tu propuesta ha sido cancelada.');
        await fetchAllTrades();
        renderMarket();
        renderMyTrades();
    } catch (err) {
        showToast('rejected', '❌ Error', err.message || 'No se pudo cancelar la propuesta.');
    }
}

// ==========================================================================
//  TOAST NOTIFICATION SYSTEM
// ==========================================================================

function showToast(type, title, message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const iconMap = {
        proposed: '📩',
        accepted: '✅',
        rejected: '❌',
        cancelled: '🚫',
        market: '📢'
    };

    toast.innerHTML = `
        <span class="toast-icon">${iconMap[type] || '📢'}</span>
        <div class="toast-body">
            <div class="toast-title">${escapeHTML(title)}</div>
            <div class="toast-message">${escapeHTML(message)}</div>
        </div>
        <button class="toast-close" aria-label="Cerrar">&times;</button>
    `;

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

    toastContainer.appendChild(toast);

    // Auto-dismiss after 6 seconds
    setTimeout(() => dismissToast(toast), 6000);
}

function dismissToast(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 350);
}

// ==========================================================================
//  UTILITY FUNCTIONS
// ==========================================================================

function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}

function escapeAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function formatStatus(status) {
    const map = {
        'PENDING': 'Pendiente',
        'ACCEPTED': 'Aceptado',
        'REJECTED': 'Rechazado',
        'CANCELLED': 'Cancelado'
    };
    return map[status] || status || 'Desconocido';
}

function formatTimeAgo(dateStr) {
    try {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now - date;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMin < 1) return 'Hace un momento';
        if (diffMin < 60) return `Hace ${diffMin} min`;
        if (diffHrs < 24) return `Hace ${diffHrs}h`;
        if (diffDays < 7) return `Hace ${diffDays}d`;
        return date.toLocaleDateString('es', { day: 'numeric', month: 'short' });
    } catch {
        return '';
    }
}

function updatePendingCount() {
    if (!headerPendingCount || !myProfile) return;

    const pendingForMe = allTrades.filter(
        t => t.status === 'PENDING' && t.targetGroup?._id === myProfile._id
    ).length;

    headerPendingCount.textContent = pendingForMe;
}

function renderEmptyState(title, message) {
    return `
        <div class="trades-empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <h3>${escapeHTML(title)}</h3>
            <p>${escapeHTML(message)}</p>
        </div>`;
}
