// --- CONSTANTES Y CONFIGURACIÓN DE LA API ---
const API_URL = 'https://sticker-album-server-proyect-production.up.railway.app/api';
const API_KEY = 'WC2026_GRP1_A205DCCA7C36B6F7';

// --- SELECCIÓN DE ELEMENTOS DEL DOM (AL INICIO DEL PROGRAMA) ---
const paisSelect = document.getElementById('pais-filtro');
const tabButtons = document.querySelectorAll('.tab-btn');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const navTitulo = document.getElementById('nav-titulo');
const navSubtitulo = document.getElementById('nav-subtitulo');
const albumContainer = document.getElementById('album-container');

// Elementos del Encabezado (Perfil & Sobres)
const groupName = document.getElementById('group-name');
const albumProgressText = document.getElementById('album-progress-text');
const btnOpenPack = document.getElementById('btn-open-pack');
const packsCount = document.getElementById('packs-count');

// Elementos del Modal de Inspección de Barajita
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

// --- ESTADO GLOBAL DE LA APLICACIÓN ---
let allCountries = [];
let groupProfile = null;
let albumStats = null;
let selectedCountry = 'Todas';
let selectedFilter = 'Todas';
let currentPage = 1;
let activeCardId = null;

// --- INICIALIZACIÓN DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    loadAppData();
});

// Cargar datos sincronizados desde el servidor remoto
async function loadAppData() {
    try {
        await Promise.all([
            fetchGroupProfile(),
            fetchAlbumData()
        ]);
        populateCountrySelect();
        renderAlbum();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
}

// Obtener perfil del grupo autenticado (GET /api/groups/me)
async function fetchGroupProfile() {
    try {
        const res = await fetch(`${API_URL}/groups/me`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.json();
        groupProfile = data.group;

        if (groupName && groupProfile) {
            groupName.textContent = groupProfile.name || 'Mi Grupo';
        }
        if (packsCount && groupProfile) {
            packsCount.textContent = groupProfile.unopenedPacks ?? 0;
        }
    } catch (err) {
        console.error('Error al obtener perfil del grupo:', err);
    }
}

// Obtener páginas y estadísticas reales del álbum (GET /api/album)
async function fetchAlbumData() {
    try {
        const res = await fetch(`${API_URL}/album`, {
            headers: { 'x-api-key': API_KEY }
        });
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.json();

        allCountries = data.pages || [];
        albumStats = data.stats || {};

        if (albumProgressText && albumStats) {
            albumProgressText.textContent = albumStats.completionPercentage || '0%';
        }
    } catch (err) {
        console.error('Error al obtener datos del álbum:', err);
        if (albumContainer) {
            albumContainer.innerHTML = `
                <div class="empty-results">
                    <h3>Error de Conexión</h3>
                    <p>No se pudo conectar con la API central del álbum.</p>
                </div>
            `;
        }
    }
}

// Poblar el selector de países con los datos de la API
function populateCountrySelect() {
    if (!paisSelect) return;
    paisSelect.innerHTML = '<option value="Todas">Todas las Selecciones</option>';

    allCountries.forEach(c => {
        const option = document.createElement('option');
        option.value = c.country;
        option.textContent = `${c.country} (${c.countryCode})`;
        paisSelect.appendChild(option);
    });
}

// Inicializar todos los Event Listeners con las constantes del DOM
function initEventListeners() {
    // Selector de País
    if (paisSelect) {
        paisSelect.addEventListener('change', (e) => {
            selectedCountry = e.target.value;
            currentPage = 1;
            renderAlbum();
        });
    }

    // Tabs de Filtros por Estado (Todas, Pegadas, Faltantes, Repetidas)
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            selectedFilter = btn.getAttribute('data-filter') || 'Todas';
            currentPage = 1;
            renderAlbum();
        });
    });

    // Paginación anterior / siguiente
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderAlbum();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            const filtered = getFilteredCountries();
            if (currentPage < filtered.length) {
                currentPage++;
                renderAlbum();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // Navegación con teclado (Flechas izquierda / derecha)
    document.addEventListener('keydown', (e) => {
        if (cardModal && cardModal.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') {
            if (btnPrev && !btnPrev.disabled) btnPrev.click();
        } else if (e.key === 'ArrowRight') {
            if (btnNext && !btnNext.disabled) btnNext.click();
        }
    });

    // Modal de Carta (Cierre)
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCardModal);
    if (cardModal) {
        cardModal.addEventListener('click', (e) => {
            if (e.target === cardModal) closeCardModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCardModal();
    });

    // Redirección a la pantalla de sobres al presionar "Abrir Sobre"
    if (btnOpenPack) {
        btnOpenPack.addEventListener('click', () => {
            window.location.href = 'sobres.html';
        });
    }

    // Petición a la API para pegar barajita (POST /api/album/stick)
    if (btnToggleStuck) {
        btnToggleStuck.addEventListener('click', handleStickCard);
    }
}

// Pegar barajita en el álbum central (POST /api/album/stick)
async function handleStickCard() {
    if (!activeCardId) return;
    const card = findCardById(activeCardId);
    if (!card) return;

    try {
        const res = await fetch(`${API_URL}/album/stick`, {
            method: 'POST',
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardCode: card.code })
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            alert(data.message || 'No se pudo pegar la barajita en el álbum.');
            return;
        }

        // Recargar datos desde el servidor y refrescar la vista
        await fetchAlbumData();
        updateModalUI(activeCardId);
        renderAlbum();
    } catch (err) {
        console.error('Error al pegar barajita:', err);
        alert('Error al conectar con la API para pegar la barajita.');
    }
}

// Filtrar países y estampas según la selección de país y tab de estado activa
function getFilteredCountries() {
    return allCountries.filter(c => {
        if (selectedCountry !== 'Todas' && c.country !== selectedCountry) {
            return false;
        }

        if (selectedFilter === 'Todas') return true;

        const stickers = c.stickers || [];
        return stickers.some(s => {
            if (selectedFilter === 'Pegadas') return s.isStuck === true;
            if (selectedFilter === 'Faltantes') return s.isStuck === false;
            if (selectedFilter === 'Repetidas') return s.duplicatesCount > 0;
            return true;
        });
    });
}

// Renderizado principal del álbum
function renderAlbum() {
    if (!albumContainer) return;
    const filteredCountries = getFilteredCountries();
    const totalPages = filteredCountries.length;

    if (totalPages === 0) {
        albumContainer.innerHTML = `
            <div class="empty-results">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 15s1.5-2 4-2 4 2 4 2M9 9h.01M15 9h.01"></path>
                </svg>
                <h3>No se encontraron barajitas</h3>
                <p>No hay barajitas que coincidan con el filtro seleccionado.</p>
            </div>
        `;
        if (navTitulo) navTitulo.textContent = 'Sin resultados';
        if (navSubtitulo) navSubtitulo.textContent = 'Página 0 de 0';
        updateNavButtons(0);
        return;
    }

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const currentCountry = filteredCountries[currentPage - 1];
    const stickers = currentCountry.stickers || [];
    const totalCount = stickers.length;
    const stuckCount = stickers.filter(s => s.isStuck).length;

    // Filtrar barajitas visibles según la pestaña seleccionada
    const renderList = stickers.filter(s => {
        if (selectedFilter === 'Pegadas') return s.isStuck === true;
        if (selectedFilter === 'Faltantes') return s.isStuck === false;
        if (selectedFilter === 'Repetidas') return s.duplicatesCount > 0;
        return true;
    });

    let html = `
        <section class="country-page">
            <div class="country-header">
                <div class="country-meta">
                    <div class="country-badge-flag">${escapeHTML(currentCountry.countryCode)}</div>
                    <h2 class="country-name">${escapeHTML(currentCountry.country)}</h2>
                    <span class="wc-group-tag">${escapeHTML(currentCountry.wcGroup)}</span>
                </div>
                <div class="country-progress-badge">
                    <strong>${stuckCount}</strong> / ${totalCount} Pegadas
                </div>
            </div>

            <div class="cards-grid">
    `;

    renderList.forEach(s => {
        html += renderCardHTML(s);
    });

    html += `
            </div>
        </section>
    `;

    albumContainer.innerHTML = html;

    // Abrir modal al presionar cualquier barajita
    const grid = albumContainer.querySelector('.cards-grid');
    if (grid) {
        grid.addEventListener('click', (e) => {
            const cardItem = e.target.closest('.card-item');
            if (cardItem) {
                const cardId = cardItem.getAttribute('data-id');
                if (cardId) openCardModal(cardId);
            }
        });
    }

    if (navTitulo) navTitulo.textContent = `${currentCountry.country} (${currentCountry.wcGroup})`;
    if (navSubtitulo) navSubtitulo.textContent = `País ${currentPage} de ${totalPages}`;
    updateNavButtons(totalPages);
}

// Generar marcado HTML para cada barajita
function renderCardHTML(s) {
    const roleLower = (s.role || '').toLowerCase();
    const isEscudo = roleLower.includes('escudo');
    const isMissing = !s.isStuck;

    let cardClasses = ['card-item'];
    if (isEscudo) cardClasses.push('role-escudo');
    if (isMissing) cardClasses.push('status-missing');

    const roleTagClass = getRoleTagClass(s.role);
    const roleSVG = getRoleSVG(s.role);

    return `
        <div class="${cardClasses.join(' ')}" data-id="${escapeHTML(s.id)}" tabindex="0" role="button" aria-label="${escapeHTML(s.name)}">
            ${s.duplicatesCount > 0 ? `<div class="repeated-badge">+${s.duplicatesCount}</div>` : ''}
            
            <div class="card-header-bar">
                <span class="card-code">${escapeHTML(s.code)}</span>
                <span class="role-tag ${roleTagClass}">${escapeHTML(s.role)}</span>
            </div>

            <div class="card-image-box">
                ${roleSVG}
                <span class="placeholder-label">#${s.number}</span>
            </div>

            <div class="card-info">
                <div class="player-name">${escapeHTML(s.name)}</div>
                <div class="player-sub">${escapeHTML(s.country)}</div>
                ${isMissing ? `<div class="status-text-missing">Faltante</div>` : ''}
            </div>
        </div>
    `;
}

// Actualizar deshabilitado de los botones de navegación
function updateNavButtons(totalPages) {
    if (btnPrev) btnPrev.disabled = (currentPage <= 1 || totalPages === 0);
    if (btnNext) btnNext.disabled = (currentPage >= totalPages || totalPages === 0);
}

// Abrir modal de detalles
function openCardModal(cardId) {
    activeCardId = cardId;
    updateModalUI(cardId);
    if (cardModal) {
        cardModal.classList.add('active');
        cardModal.setAttribute('aria-hidden', 'false');
    }
}

// Cerrar modal de detalles
function closeCardModal() {
    activeCardId = null;
    if (cardModal) {
        cardModal.classList.remove('active');
        cardModal.setAttribute('aria-hidden', 'true');
    }
}

// Actualizar información mostrada en el modal de inspección
function updateModalUI(cardId) {
    const card = findCardById(cardId);
    if (!card) return;

    if (modalCardPreview) modalCardPreview.innerHTML = renderCardHTML(card);
    if (modalWcGroup) modalWcGroup.textContent = card.wcGroup || '';
    if (modalCardCode) modalCardCode.textContent = card.code || '';
    if (modalCardName) modalCardName.textContent = card.name || '';
    if (modalCountryName) modalCountryName.textContent = card.country || '';
    if (modalCardRole) modalCardRole.textContent = card.role || '';
    if (modalCardNumber) modalCardNumber.textContent = `#${card.number}`;

    if (modalCardStatus) {
        modalCardStatus.textContent = card.isStuck ? 'Pegada' : 'Faltante';
        modalCardStatus.style.color = card.isStuck ? 'var(--accent-emerald)' : 'var(--text-muted)';
    }

    if (modalCardCopies) {
        if (card.isStuck && card.duplicatesCount > 0) {
            modalCardCopies.textContent = `1 pegada + ${card.duplicatesCount} repetida(s)`;
        } else if (card.isStuck && card.duplicatesCount === 0) {
            modalCardCopies.textContent = `1 pegada (0 repetidas)`;
        } else if (!card.isStuck && card.duplicatesCount > 0) {
            modalCardCopies.textContent = `0 pegadas (${card.duplicatesCount} repetida(s))`;
        } else {
            modalCardCopies.textContent = `0 unidades`;
        }
    }

    // Configurar estado del botón Pegar en Álbum (POST /api/album/stick)
    if (btnToggleStuckText) {
        btnToggleStuckText.textContent = card.isStuck ? 'En Álbum' : 'Pegar en Álbum';
    }

    if (btnToggleStuck) {
        const canStick = !card.isStuck && card.duplicatesCount > 0;
        btnToggleStuck.disabled = !canStick && !card.isStuck;
        btnToggleStuck.style.opacity = (card.isStuck || canStick) ? '1' : '0.5';
        btnToggleStuck.style.cursor = (card.isStuck || canStick) ? 'pointer' : 'not-allowed';
    }
}

// Buscar barajita por su ID en el catálogo cargado
function findCardById(cardId) {
    for (const c of allCountries) {
        const stickers = c.stickers || [];
        const found = stickers.find(s => s.id === cardId);
        if (found) return found;
    }
    return null;
}

// Obtener icono SVG para el rol
function getRoleSVG(role) {
    const r = (role || '').toLowerCase();
    if (r.includes('escudo')) {
        return `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" class="placeholder-symbol"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V7l-9-5z"></path></svg>`;
    } else if (r.includes('arquero') || r.includes('portero')) {
        return `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" class="placeholder-symbol"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6M10 10V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7M6 12v-2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6c0 5 4 9 9 9h1a9 9 0 0 0 9-9v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2"></path></svg>`;
    } else if (r.includes('defensa')) {
        return `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" class="placeholder-symbol"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    } else if (r.includes('medio')) {
        return `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" class="placeholder-symbol"><circle cx="12" cy="12" r="9"></circle><path d="M12 3v18M3 12h18"></path></svg>`;
    } else {
        return `<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.8" class="placeholder-symbol"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg>`;
    }
}

// Obtener clase CSS para el tag de rol
function getRoleTagClass(role) {
    const r = (role || '').toLowerCase();
    if (r.includes('escudo')) return 'tag-escudo';
    if (r.includes('arquero') || r.includes('portero')) return 'tag-arquero';
    if (r.includes('defensa')) return 'tag-defensa';
    if (r.includes('medio')) return 'tag-mediocampista';
    if (r.includes('delantero')) return 'tag-delantero';
    return '';
}

// Escapar HTML por seguridad
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
