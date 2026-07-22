/**
 * Álbum de Barajitas - Mundial 2026
 * Lógica principal de consumo de API, gestión de estado del álbum y manipulación del DOM.
 */

// Global State
const API_URL = 'https://sticker-album-server-proyect-production.up.railway.app/api/cards';
const STORAGE_KEY = 'mundial2026_album_state_v1';

let rawAlbumData = []; // Raw data from API
let normalizedCountries = []; // Formatted country & card structure
let userInventory = {}; // User state: { cardId: { count: number, stuck: boolean } }

// Active Filter State
let currentGroupFilter = 'ALL';
let currentCountryFilter = 'ALL';
let currentStatusFilter = 'ALL';
let currentSearchQuery = '';
let currentCountryPageIndex = 0; // Index in normalizedCountries

// DOM Elements
const albumContainer = document.getElementById('album-container');
const loadingSpinner = document.getElementById('loading-spinner');
const groupFilterSelect = document.getElementById('group-filter');
const countryFilterSelect = document.getElementById('country-filter');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.tab-btn');

// Progress & Stats DOM
const albumProgressText = document.getElementById('album-progress-text');
const albumProgressFill = document.getElementById('album-progress-fill');
const statStuckCount = document.getElementById('stat-stuck-count');
const statMissingCount = document.getElementById('stat-missing-count');
const statRepeatedCount = document.getElementById('stat-repeated-count');

// Pager DOM
const btnPrevPage = document.getElementById('btn-prev-page');
const btnNextPage = document.getElementById('btn-next-page');
const pageCurrentTitle = document.getElementById('page-current-title');
const pageCountSubtitle = document.getElementById('page-count-subtitle');

// Modal DOM
const cardModal = document.getElementById('card-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCardPreview = document.getElementById('modal-card-preview');
const modalWcGroup = document.getElementById('modal-wc-group');
const modalCardCode = document.getElementById('modal-card-code');
const modalCardName = document.getElementById('modal-card-name');
const modalCountryName = document.getElementById('modal-country-name');
const modalCardRole = document.getElementById('modal-card-role');
const modalCardNumber = document.getElementById('modal-card-number');
const modalCardStatus = document.getElementById('modal-card-status');
const modalCardCopies = document.getElementById('modal-card-copies');
const btnToggleStuck = document.getElementById('btn-toggle-stuck');
const btnToggleStuckText = document.getElementById('btn-toggle-stuck-text');
const btnAddDuplicate = document.getElementById('btn-add-duplicate');
const btnRemoveDuplicate = document.getElementById('btn-remove-duplicate');

let activeModalCard = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    loadUserInventory();
    setupEventListeners();
    await fetchAlbumData();
}

/**
 * Carga o inicializa el inventario del usuario desde localStorage
 */
function loadUserInventory() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            userInventory = JSON.parse(saved);
        } catch (e) {
            console.error('Error al cargar inventario local:', e);
            userInventory = {};
        }
    }
}

/**
 * Guarda el estado actual en localStorage
 */
function saveUserInventory() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userInventory));
    updateGlobalStats();
}

/**
 * Consume los datos del servidor central
 */
async function fetchAlbumData() {
    try {
        if (loadingSpinner) loadingSpinner.style.display = 'flex';

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor HTTP: ${response.status}`);
        }

        const data = await response.json();
        rawAlbumData = data;
        normalizeData(data);
        initializeInventoryIfEmpty();
        populateSelectors();
        updateGlobalStats();
        renderAlbumView();

    } catch (error) {
        console.error('Error al cargar el álbum:', error);
        if (albumContainer) {
            albumContainer.innerHTML = `
                <div class="empty-results">
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <h3>Error al conectar con la API del Álbum</h3>
                    <p>${error.message}</p>
                    <p style="margin-top: 0.5rem; font-size: 0.8rem;">Verifica la URL o conexión a internet.</p>
                </div>
            `;
        }
    } finally {
        if (loadingSpinner) loadingSpinner.style.display = 'none';
    }
}

/**
 * Normaliza las respuestas estructuradas o listas planas de la API
 */
function normalizeData(data) {
    normalizedCountries = [];

    if (Array.isArray(data)) {
        // Caso 1: API retorna arreglo de países [{ country, wcGroup, cards: [...] }]
        if (data.length > 0 && data[0].cards && Array.isArray(data[0].cards)) {
            normalizedCountries = data;
        } 
        // Caso 2: API retorna lista plana de barajitas [{ id, country, ... }]
        else {
            const countryMap = new Map();
            data.forEach(card => {
                const cName = card.country || 'Desconocido';
                if (!countryMap.has(cName)) {
                    countryMap.set(cName, {
                        country: cName,
                        countryCode: card.countryCode || cName.substring(0, 3).toUpperCase(),
                        wcGroup: card.wcGroup || 'Grupo General',
                        cards: []
                    });
                }
                countryMap.get(cName).cards.push(card);
            });

            // Ordenar las cartas por número dentro de cada país
            countryMap.forEach(country => {
                country.cards.sort((a, b) => a.number - b.number);
                normalizedCountries.push(country);
            });
        }
    }
}

/**
 * Inicializa inventario de demostración si el usuario inicia por primera vez
 */
function initializeInventoryIfEmpty() {
    let allCards = getAllCards();
    let hasEntries = Object.keys(userInventory).length > 0;

    if (!hasEntries && allCards.length > 0) {
        // Simular que el usuario ha obtenido algunas barajitas iniciales
        allCards.forEach((card, index) => {
            // Dar pegadas al ~35% de las cartas y algunas repetidas para demostración
            const isStuck = index % 3 === 0;
            const hasDuplicate = isStuck && index % 6 === 0;

            userInventory[card.id] = {
                count: hasDuplicate ? 2 : (isStuck ? 1 : 0),
                stuck: isStuck
            };
        });
        saveUserInventory();
    } else {
        // Asegurar que todas las cartas conocidas tengan entrada en el mapa de inventario
        allCards.forEach(card => {
            if (!userInventory[card.id]) {
                userInventory[card.id] = { count: 0, stuck: false };
            }
        });
    }
}

/**
 * Obtiene la lista completa de barajitas de todas las selecciones
 */
function getAllCards() {
    const list = [];
    normalizedCountries.forEach(c => {
        if (c.cards) {
            c.cards.forEach(card => list.push(card));
        }
    });
    return list;
}

/**
 * Pobla los selectores de filtro de Grupos y Países
 */
function populateSelectors() {
    if (!groupFilterSelect || !countryFilterSelect) return;

    // Extraer grupos únicos
    const groups = new Set();
    const countries = [];

    normalizedCountries.forEach(c => {
        if (c.wcGroup) groups.add(c.wcGroup);
        countries.push({ name: c.country, code: c.countryCode });
    });

    // Grupos
    groupFilterSelect.innerHTML = '<option value="ALL">Todos los Grupos</option>';
    Array.from(groups).sort().forEach(grp => {
        const opt = document.createElement('option');
        opt.value = grp;
        opt.textContent = grp;
        groupFilterSelect.appendChild(opt);
    });

    // Países
    countryFilterSelect.innerHTML = '<option value="ALL">Todas las Selecciones</option>';
    countries.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.name;
        opt.textContent = `${c.name} (${c.code})`;
        countryFilterSelect.appendChild(opt);
    });
}

/**
 * Calcula y actualiza las estadísticas globales del álbum
 */
function updateGlobalStats() {
    const allCards = getAllCards();
    const totalCards = allCards.length;
    let stuckCount = 0;
    let missingCount = 0;
    let repeatedCount = 0;

    allCards.forEach(card => {
        const inv = userInventory[card.id] || { count: 0, stuck: false };
        if (inv.stuck) {
            stuckCount++;
        } else {
            missingCount++;
        }
        if (inv.count > 1) {
            repeatedCount += (inv.count - (inv.stuck ? 1 : 0));
        }
    });

    const percentage = totalCards > 0 ? Math.round((stuckCount / totalCards) * 100) : 0;

    if (albumProgressText) albumProgressText.textContent = `${stuckCount} / ${totalCards} (${percentage}%)`;
    if (albumProgressFill) albumProgressFill.style.width = `${percentage}%`;
    if (statStuckCount) statStuckCount.textContent = stuckCount;
    if (statMissingCount) statMissingCount.textContent = missingCount;
    if (statRepeatedCount) statRepeatedCount.textContent = repeatedCount;
}

/**
 * Configura los event listeners para controles, filtros y modales
 */
function setupEventListeners() {
    // Filtros de Grupo y País
    groupFilterSelect.addEventListener('change', (e) => {
        currentGroupFilter = e.target.value;
        currentCountryPageIndex = 0;
        renderAlbumView();
    });

    countryFilterSelect.addEventListener('change', (e) => {
        currentCountryFilter = e.target.value;
        if (currentCountryFilter !== 'ALL') {
            const foundIdx = normalizedCountries.findIndex(c => c.country === currentCountryFilter);
            if (foundIdx !== -1) currentCountryPageIndex = foundIdx;
        } else {
            currentCountryPageIndex = 0;
        }
        renderAlbumView();
    });

    // Filtros por Estado (Todas, Pegadas, Faltantes, Repetidas)
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            currentStatusFilter = tab.getAttribute('data-filter');
            renderAlbumView();
        });
    });

    // Buscador
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value.toLowerCase().trim();
        renderAlbumView();
    });

    // Navegación Pager (Página anterior / siguiente)
    btnPrevPage.addEventListener('click', () => {
        const filteredList = getFilteredCountriesList();
        if (currentCountryPageIndex > 0) {
            currentCountryPageIndex--;
            renderAlbumView();
        }
    });

    btnNextPage.addEventListener('click', () => {
        const filteredList = getFilteredCountriesList();
        if (currentCountryPageIndex < filteredList.length - 1) {
            currentCountryPageIndex++;
            renderAlbumView();
        }
    });

    // Modal
    modalCloseBtn.addEventListener('click', closeModal);
    cardModal.addEventListener('click', (e) => {
        if (e.target === cardModal) closeModal();
    });

    // Acciones del modal
    btnToggleStuck.addEventListener('click', () => {
        if (!activeModalCard) return;
        const inv = userInventory[activeModalCard.id] || { count: 0, stuck: false };
        
        if (inv.stuck) {
            inv.stuck = false;
        } else {
            inv.stuck = true;
            if (inv.count < 1) inv.count = 1;
        }
        userInventory[activeModalCard.id] = inv;
        saveUserInventory();
        updateModalCardView(activeModalCard);
        renderAlbumView();
    });

    btnAddDuplicate.addEventListener('click', () => {
        if (!activeModalCard) return;
        const inv = userInventory[activeModalCard.id] || { count: 0, stuck: false };
        inv.count += 1;
        userInventory[activeModalCard.id] = inv;
        saveUserInventory();
        updateModalCardView(activeModalCard);
        renderAlbumView();
    });

    btnRemoveDuplicate.addEventListener('click', () => {
        if (!activeModalCard) return;
        const inv = userInventory[activeModalCard.id] || { count: 0, stuck: false };
        if (inv.count > 0) {
            inv.count -= 1;
            if (inv.count === 0) inv.stuck = false;
            userInventory[activeModalCard.id] = inv;
            saveUserInventory();
            updateModalCardView(activeModalCard);
            renderAlbumView();
        }
    });
}

/**
 * Retorna la lista de países filtrados según los controles de Grupo y Búsqueda
 */
function getFilteredCountriesList() {
    return normalizedCountries.filter(countryObj => {
        // Filtro de Grupo
        if (currentGroupFilter !== 'ALL' && countryObj.wcGroup !== currentGroupFilter) {
            return false;
        }
        // Filtro de País específico
        if (currentCountryFilter !== 'ALL' && countryObj.country !== currentCountryFilter) {
            return false;
        }
        // Filtro de Búsqueda
        if (currentSearchQuery) {
            const hasMatchInCountry = countryObj.country.toLowerCase().includes(currentSearchQuery);
            const hasMatchInCards = countryObj.cards.some(c => 
                c.name.toLowerCase().includes(currentSearchQuery) || 
                c.code.toLowerCase().includes(currentSearchQuery)
            );
            return hasMatchInCountry || hasMatchInCards;
        }
        return true;
    });
}

/**
 * Renderiza la vista principal del Álbum (Páginas por País)
 */
function renderAlbumView() {
    if (!albumContainer) return;
    albumContainer.innerHTML = '';

    const filteredCountries = getFilteredCountriesList();

    if (filteredCountries.length === 0) {
        albumContainer.innerHTML = `
            <div class="empty-results">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <h3>No se encontraron barajitas</h3>
                <p>Intenta cambiar los filtros de búsqueda o seleccionar otra categoría.</p>
            </div>
        `;
        updatePagerState(0, 0, 'Sin resultados');
        return;
    }

    // Asegurar que el índice de página esté dentro de los límites
    if (currentCountryPageIndex >= filteredCountries.length) {
        currentCountryPageIndex = filteredCountries.length - 1;
    }
    if (currentCountryPageIndex < 0) {
        currentCountryPageIndex = 0;
    }

    const targetCountry = filteredCountries[currentCountryPageIndex];
    updatePagerState(currentCountryPageIndex + 1, filteredCountries.length, `${targetCountry.country} (${targetCountry.countryCode})`);

    // Renderizar la página de la selección actual
    const pageElement = createCountryPageHTML(targetCountry);
    albumContainer.appendChild(pageElement);
}

/**
 * Actualiza el indicador del Pager de Navegación
 */
function updatePagerState(current, total, title) {
    if (pageCurrentTitle) pageCurrentTitle.textContent = title;
    if (pageCountSubtitle) pageCountSubtitle.textContent = `Página ${current} de ${total}`;
    
    if (btnPrevPage) btnPrevPage.disabled = (current <= 1);
    if (btnNextPage) btnNextPage.disabled = (current >= total);
}

/**
 * Crea el elemento DOM para la página de un país (con sus 12 barajitas)
 */
function createCountryPageHTML(countryObj) {
    const section = document.createElement('section');
    section.className = 'country-page';

    // Calcular estadísticas del país
    let countryStuckCount = 0;
    countryObj.cards.forEach(c => {
        const inv = userInventory[c.id];
        if (inv && inv.stuck) countryStuckCount++;
    });

    // Header del País
    const header = document.createElement('div');
    header.className = 'country-header';
    header.innerHTML = `
        <div class="country-meta">
            <div class="country-badge-flag">${countryObj.countryCode}</div>
            <div>
                <h2 class="country-name">${countryObj.country}</h2>
                <span class="wc-group-tag">${countryObj.wcGroup || 'Mundial 2026'}</span>
            </div>
        </div>
        <div class="country-progress-badge">
            Completado: <strong>${countryStuckCount} / ${countryObj.cards.length}</strong>
        </div>
    `;
    section.appendChild(header);

    // Grid de 12 barajitas
    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    // Filtrar cartas según pestaña de estado (Pegadas, Faltantes, Repetidas)
    const cardsToRender = countryObj.cards.filter(card => {
        const inv = userInventory[card.id] || { count: 0, stuck: false };
        if (currentStatusFilter === 'STUCK') return inv.stuck;
        if (currentStatusFilter === 'MISSING') return !inv.stuck;
        if (currentStatusFilter === 'REPEATED') return (inv.count > 1);
        return true;
    });

    if (cardsToRender.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'empty-results';
        emptyMsg.style.gridColumn = '1 / -1';
        emptyMsg.innerHTML = `<p>No hay barajitas en la categoría <strong>${getFilterNameLabel(currentStatusFilter)}</strong> para ${countryObj.country}.</p>`;
        grid.appendChild(emptyMsg);
    } else {
        cardsToRender.forEach(card => {
            const cardEl = createCardElement(card);
            grid.appendChild(cardEl);
        });
    }

    section.appendChild(grid);
    return section;
}

function getFilterNameLabel(filter) {
    if (filter === 'STUCK') return 'Pegadas';
    if (filter === 'MISSING') return 'Faltantes';
    if (filter === 'REPEATED') return 'Repetidas';
    return 'Todas';
}

/**
 * Crea la representación visual HTML de una Barajita (Card Item)
 */
function createCardElement(card) {
    const inv = userInventory[card.id] || { count: 0, stuck: false };
    const isStuck = inv.stuck;
    const isEscudo = card.role === 'Escudo';
    const isRepeated = inv.count > 1;
    const extraCopies = inv.count - (isStuck ? 1 : 0);

    const cardDiv = document.createElement('article');
    cardDiv.className = `card-item ${isStuck ? 'status-stuck' : 'status-missing'} ${isEscudo ? 'role-escudo' : ''}`;
    cardDiv.setAttribute('data-card-id', card.id);

    // Badge de Repetidas (Top Right)
    let repeatedBadgeHTML = '';
    if (isRepeated && extraCopies > 0) {
        repeatedBadgeHTML = `<div class="repeated-badge" title="${extraCopies} repetida(s)">x${extraCopies + 1}</div>`;
    }

    // Role Tag Formatting
    const roleClass = `tag-${(card.role || 'jugador').toLowerCase()}`;

    // Card Content HTML (Clean Placeholder Frame for Card Images)
    cardDiv.innerHTML = `
        ${repeatedBadgeHTML}
        <div class="card-header-bar">
            <span class="card-code">${card.code}</span>
            <span class="role-tag ${roleClass}">${card.role}</span>
        </div>
        
        <!-- Clean Image Placeholder Container -->
        <div class="card-image-box">
            ${isEscudo ? `
                <svg class="placeholder-symbol" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                <span class="placeholder-label">Escudo Oficial</span>
            ` : `
                <svg class="placeholder-symbol" viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="placeholder-label">${isStuck ? 'Barajita Pegada' : 'Espacio Vacío'}</span>
            `}
        </div>

        <div class="card-info">
            <div class="player-name">${isStuck ? card.name : '???'}</div>
            <div class="player-sub">${isStuck ? `#${card.number} - ${card.country}` : `<span class="status-text-missing">No Conseguida</span>`}</div>
        </div>
    `;

    // Click trigger to inspect
    cardDiv.addEventListener('click', () => openModal(card));

    return cardDiv;
}

/**
 * Abre el Modal de Inspección y Detalle de la Barajita
 */
function openModal(card) {
    activeModalCard = card;
    updateModalCardView(card);
    cardModal.classList.add('active');
    cardModal.setAttribute('aria-hidden', 'false');
}

/**
 * Actualiza la información del modal
 */
function updateModalCardView(card) {
    const inv = userInventory[card.id] || { count: 0, stuck: false };
    
    // Render preview inside modal
    if (modalCardPreview) {
        modalCardPreview.innerHTML = '';
        const previewCard = createCardElement(card);
        modalCardPreview.appendChild(previewCard);
    }

    if (modalWcGroup) modalWcGroup.textContent = card.wcGroup || 'Mundial 2026';
    if (modalCardCode) modalCardCode.textContent = card.code;
    if (modalCardName) modalCardName.textContent = card.name;
    if (modalCountryName) modalCountryName.textContent = card.country;
    if (modalCardRole) modalCardRole.textContent = card.role;
    if (modalCardNumber) modalCardNumber.textContent = `#${card.number}`;

    if (modalCardStatus) {
        modalCardStatus.textContent = inv.stuck ? 'Pegada en Álbum' : 'Faltante';
        modalCardStatus.style.color = inv.stuck ? 'var(--accent-emerald)' : 'var(--text-muted)';
    }

    if (modalCardCopies) {
        modalCardCopies.textContent = `${inv.count} disponible(s)`;
    }

    // Primary Button Text
    if (btnToggleStuckText) {
        btnToggleStuckText.textContent = inv.stuck ? 'Despegar del Álbum' : 'Pegar en Álbum';
    }
}

/**
 * Cierra el Modal
 */
function closeModal() {
    cardModal.classList.remove('active');
    cardModal.setAttribute('aria-hidden', 'true');
    activeModalCard = null;
}
