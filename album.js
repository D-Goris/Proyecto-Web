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
    const cardMediaHTML = getCardImageHTML(s);

    return `
        <div class="${cardClasses.join(' ')}" data-id="${escapeHTML(s.id)}" tabindex="0" role="button" aria-label="${escapeHTML(s.name)}">
            ${s.duplicatesCount > 0 ? `<div class="repeated-badge">+${s.duplicatesCount}</div>` : ''}
            
            <div class="card-header-bar">
                <span class="card-code">${escapeHTML(s.code)}</span>
                <span class="role-tag ${roleTagClass}">${escapeHTML(s.role)}</span>
            </div>

            <div class="card-image-box">
                ${cardMediaHTML}
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

// Obtener URL de la foto del jugador para cartas pegadas
function getPlayerPhotoUrl(s) {
    if (s.imageUrl && s.imageUrl.trim() !== '') return s.imageUrl;
    if (s.image && s.image.trim() !== '') return s.image;
    if (s.photo && s.photo.trim() !== '') return s.photo;

    // Buscar en el diccionario PLAYER_PHOTOS por código de carta (ej: "MEX-1"), nombre o ID
    const dictPhoto = (PLAYER_PHOTOS[s.code] || PLAYER_PHOTOS[s.name] || PLAYER_PHOTOS[s.id] || '').trim();
    if (dictPhoto !== '') {
        return dictPhoto;
    }

    // Imagen de respaldo por defecto si la URL en el diccionario está vacía ("")
    return 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80';
}

// Obtener contenido visual para la carta (foto si está pegada, icono de cruz '+' si está faltante)
function getCardImageHTML(s) {
    if (s.isStuck) {
        const photoUrl = getPlayerPhotoUrl(s);
        return `<img src="${photoUrl}" alt="${escapeHTML(s.name)}" class="card-player-img" loading="lazy" />`;
    } else {
        return `
            <div class="cross-icon-wrapper">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.5" class="placeholder-symbol missing-cross-icon">
                    <path d="M12 5v14M5 12h14" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        `;
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

// =============================================================================
// DICCIONARIO DE FOTOS DE JUGADORES (CÓDIGO DE BARAJITA -> URL DE LA FOTO)
// Puedes añadir la URL correspondiente entre las comillas para cada jugador.
// =============================================================================
const PLAYER_PHOTOS = {
    // --- México (MEX) ---
    "MEX-1": "", // Escudo FMF
    "MEX-2": "https://upload.wikimedia.org/wikipedia/commons/b/b3/Ger-Mex_%285_cropped%29.jpg", // Guillermo Ochoa
    "MEX-3": "https://upload.wikimedia.org/wikipedia/commons/3/30/Jorge_S%C3%A1nchez.png", // Jorge Sánchez
    "MEX-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHGE09niap76cgDr5pdplNigttHn-RplA908k8PBRBog&s=10", // César Montes
    "MEX-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5uegscEg-qydL3v_aLWGuCz0xj6HSuvyOPKx2HlPSVA&s=10", // Johan Vásquez
    "MEX-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawl2d7RtbzCsktw9QC5P8rRyScEZkGC6YUR2FIuIrUA&s=10", // Gerardo Arteaga
    "MEX-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs9M7rCWTvOmxmOCcNAqwRXJzmdivMjar3PR4GDme_2w&s", // Edson Álvarez
    "MEX-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6t8f1vRIdOaVSpIsCZPWoG1S0YfEuir-Wn-2-POMuw&s=10", // Luis Chávez
    "MEX-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-yOuiyqF99j9wLTvD1GCIUuIVmbWVV9JcZVaZDKf4SQ&s=10", // Erick Sánchez
    "MEX-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIt6g8vr8m_lB6INRKoifJLaIvpXVXPS4DUOBvvCjEkQ&s", // Santiago Giménez
    "MEX-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt5aIKWKh7K5VjkXR6EcudF3Bw2LdLRztIunPANHhOGQ&s=10", // Hirving Lozano
    "MEX-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdKlet83_sfjRzO5rL2uIjkzXxje2B5pEaNTY83H3uzw&s=10", // Uriel Antuna

    // --- Sudáfrica (RSA) ---
    "RSA-1": "", // Escudo SAFA
    "RSA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxpD7qzPZFEgQegGJ-qfRn46C-t4z7wSDjqPBaScvNw&s=10", // Ronwen Williams
    "RSA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtFaCDE6PqQ8YxPliTurvKpWr2Z5Y260luFq2uWPHvA&s", // Khuliso Mudau
    "RSA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTur05cFEl-rXXzFW5NJMLuebWWZxj6LoUJ_QECocPj2g&s=10", // Siyanda Xulu
    "RSA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8GoSCmVqR9vnTv7cT5U82cSPExFukrXuKh2QuR7RYw&s=10", // Mothobi Mvala
    "RSA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfiA6p7n9g3aJZvQaLagITPVtterhjE_Ql0qF3yiad1w&s=10", // Aubrey Modiba
    "RSA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKH4Feh5xWN41fpweJgpqMKcEcnNRGTKb4WdMhzLic5w&s", // Teboho Mokoena
    "RSA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVKmWZxB0nQ7pqfVX-CM2bOaf16x7hfZLsXALJx9IgBA&s=10", // Sphephelo Sithole
    "RSA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBqSD1vdbdUxYD5O5bPb6jhjsS1lI6BM8-2zZfeyKbEA&s=10", // Thapelo Morena
    "RSA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCZlZKQvNDngOO79www1ZSRCIe4PoYY1g7YgmUTMNvBQ&s=10", // Percy Tau
    "RSA-11": "https://www.footballdatabase.eu/images/photos/players/a_151/151323.jpg", // Themba Zwane
    "RSA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTor8EILEqkdki39OcQgZphrBEPAqEi1qg4SnDAlHaoVA&s", // Evidence Makgopa

    // --- Corea del Sur (KOR) ---
    "KOR-1": "", // Escudo KFA
    "KOR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS--ZbfBtHjAQNUhvYgWXYQB4z66s-3tXFJltYMRXbGVA&s=10", // Jo Hyeon-woo
    "KOR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4GhMBOfuLIol4_ryfasnaQmFhBN5u_Z-qqkS7GSA-Ow&s=10", // Seol Young-woo
    "KOR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVFUhyhOGZUf525EypYFt6BNsvEUApeZU77PvaA9MSTA&s=10", // Kim Min-jae
    "KOR-5": "https://upload.wikimedia.org/wikipedia/commons/9/91/220528_FC_%EC%84%9C%EC%9A%B8_vs_%EA%B9%80%EC%B2%9C_%EC%83%81%EB%AC%B4_FC_%28%EC%A0%95%EC%8A%B9%ED%98%84%29.jpg", // Jung Seung-hyun
    "KOR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBslvLNFt_8V-FRNoOS6u1Tf8ET_mzAmPrpR6ahjcTsw&s=10", // Kim Jin-su
    "KOR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyuCtGJwGCpY2e8o05zCwoSTg5HgZsjsmwLt97gEYRQ&s=10", // Hwang In-beom
    "KOR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaQAdxPmJcqMIEBW4gxT-OTXYepGjCYJBYD79jDIJzvw&s=10", // Lee Jae-sung
    "KOR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtfV5P4VGAMZmMRuLiy3tZepF28oh-mSbz485OUsRmWA&s", // Lee Kang-in
    "KOR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuFlFQuLA-FQ0gOfvRlhHM_V39BGXroyFsp7QjFeYg2w&s", // Son Heung-min
    "KOR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0SpMICAuBFwN2cKJd5s1DTxXKjeqJZ0kRKWdQ1KKTBQ&s=10", // Hwang Hee-chan
    "KOR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEjrYoWj_ra0D3k15jMkhGwxvauCiZT1VBMDaiP_rFsA&s=10", // Cho Gue-sung

    // --- Chequia (CZE) ---
    "CZE-1": "", // Escudo FAČR
    "CZE-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2JOoNsVoX9i8jOCTHx-ezzt4IcgskxhFbXAMwCt_pQA&s=10", // Jindřich Staněk
    "CZE-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlOtHrIkUTssBbSQqC4f0a9iYPR63fo5C294-FMzDxw&s=10", // Vladimir Coufal
    "CZE-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZge7zGsjm4soGs9OUdLHtiR9Q3VL8sW5lGxP-O3bKCg&s=10", // Robin Hranáč
    "CZE-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpFSc04rKJ6_hHSzYqo0rkMysmN4cXzgsQR8PG2H7TLQ&s=10", // Ladislav Krejčí
    "CZE-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpv50lYia6xxsteMdlyeIQbH2RdFLob1d7J-nT5DgHpQ&s=10", // David Jurásek
    "CZE-7": "https://es.wikipedia.org/wiki/Tom%C3%A1%C5%A1_Sou%C4%8Dek", // Tomáš Souček
    "CZE-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7LXrKkRECqCSWoMaq1YttO5KjYABzP3J_FX73WmxgYA&s=10", // Lukáš Provod
    "CZE-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaNa7uP1a13pyJkKmGedqWd_TX62ZGbyW300gtt6Z6Dg&s", // Antonín Barák
    "CZE-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfGq4u2u6xdL3lgVvkCaVb80hAgJRcxnNvMHOzoNun7Q&s=10", // Patrik Schick
    "CZE-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgUgAn7KruyEQuxpynPiZO-3LqNmID_wAvcU9NJzashg&s=10", // Jan Kuchta
    "CZE-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz6rM2OqA5qL4pPCcW5MroskIgqnro6KiQVgIWxLeJGQ&s=10", // Adam Hložek

    // --- Canadá (CAN) ---
    "CAN-1": "", // Escudo Canada Soccer
    "CAN-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIyIxgxtBgRP6aw4hup3kesROo9CJMOgnzkGOTQzV8Q&s", // Maxime Crépeau
    "CAN-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQi-fvsfEp603XNXvmBYMu7NGLlRq85oefAvKtOO0WtA&s", // Alistair Johnston
    "CAN-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNHSQym1umnHkey_9pJI0S6SzxTdgusnX9YnckmGldsg&s", // Moïse Bombito
    "CAN-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ9HB_RbeDXhlYihvIPe1VZ_3t1bf_Gn0tATJ-HgeHoA&s=10", // Derek Cornelius
    "CAN-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7ubKlRsFGbt_qzjV88vtpvmZZXj9755Fc__icuMMrg&s", // Alphonso Davies
    "CAN-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFc3-gNqquFNJEaE4J4Ui9ViU4ToGoEsYuhF8KhgacFg&s", // Stephen Eustaquio
    "CAN-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_6BwibGHzttEsNuuxkgDluMV8q-LcmZMldUz47rk5TA&s", // Ismaël Koné
    "CAN-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0LwIQOHXaityLbQnTCM6FsZ82gQeN6nQOUs5RbeklLQ&s", // Jonathan Osorio
    "CAN-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOht92_0wQesUAgW2JvPbrTbFbyHGYKItzP1G4ZBBjsw&s=10", // Jonathan David
    "CAN-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRei2ldcyGmVHA3sfEQtl7IuCMZAT764EagWwhu0Ty4-w&s", // Cyle Larin
    "CAN-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsTF8tBliJSzgex9x4Pzqvx0RdhKIpJCIFQKe0lOrM6w&s", // Tajon Buchanan

    // --- Bosnia y Herzegovina (BIH) ---
    "BIH-1": "", // Escudo N/FSBiH
    "BIH-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlkWlEQPGj74ZhVY9_76YOGboJ1zfk0D2NRCrUTYPSeA&s=10", // Ibrahim Šehić
    "BIH-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm2FNu26b-Pd2gwX9C6a63ZvLryz1Bg-gZGNIzdUhTSg&s=10", // Jusuf Gazibegović
    "BIH-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUau1yMxvmonlfL_Z1Hi5h-aOqowlS_RjRXHnxaJ9r-g&s=10", // Anel Ahmedhodžić
    "BIH-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXsZledZYq68y6qGSyIp99jG0c7ndGZ66gXHHu0VD2A&s=10", // Dennis Hadžikadunić
    "BIH-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkFxogIzChNY4LH91I8jSTibd1xQEnAp2gYzUG6kLMA&s=10", // Sead Kolašinac
    "BIH-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYM5zQPEsUMkQCEdO6LH7dg7c_bRhkSqhM7Gp2YJsKEA&s=10", // Rade Krunić
    "BIH-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReewranWNtcnSkg3geWgkXLne-eNeT-MaXfWH25Uvcyw&s=10", // Amir Hadžiahmetović
    "BIH-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKY4YyV3I_beZWlVcfTcGPeMVB82pu9-QHjio1Q5xEpg&s=10", // Benjamin Tahirović
    "BIH-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnfYIyK-fjTekLq6SVMB7HVXjf_rv37yka_nruzIjQw&s", // Edin Džeko
    "BIH-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQazeXR4N54pKDQ6WewT0VlscMVdpbw42b1X03JinDTYg&s=10", // Ermedin Demirović
    "BIH-12": "https://assets.bundesliga.com/player/dfl-obj-j0117m-dfl-clu-000004-dfl-sea-0001ka.png", // Haris Tabaković

    // --- Catar (QAT) ---
    "QAT-1": "", // Escudo QFA
    "QAT-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYnjTRt5dZX8AdIrufsuDlfB6FoKJaiaC19lx3zt8AA&s", // Meshaal Barsham
    "QAT-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSsAUmH3Tb17-obslvkAp2cBKZsXi7nUU9upTOOWZMfA&s=10", // Pedro Miguel
    "QAT-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvp_nAn1I2prAgPZPZIsnYfZWGg50PRLoq6ucuNoR_tA&s", // Lucas Mendes
    "QAT-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoILtjtGuGx3y50mXCaTEn8dFryhTSigJMWRBaZqFw4g&s=10", // Boualem Khoukhi
    "QAT-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGUboPFtx9xI9ZOlt2jikUksu0iv9FE2klLM4nTm2Qg&s=10", // Homam Ahmed
    "QAT-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Bb9ckMsmlQkLxP2k5BKc37aqoBpTEg6wKULPkIpRmw&s=10", // Hassan Al-Haydos
    "QAT-8": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Ahmed_Fathy.jpg", // Ahmed Fathy
    "QAT-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9D0yr-3UI7AX8cIJoT8vMExhyYTYfiGhGUBeSGyNa3w&s", // Jassem Gaber
    "QAT-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbJtkSjDQGqNcGYsXOoj11H4I_ENpUP1dXganKaC-pPA&s", // Akram Afif
    "QAT-11": "https://es.wikipedia.org/wiki/Almoez_Ali", // Almoez Ali
    "QAT-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5QRdo_iAszq5SQ587IOWmZYI47kwe-8twCpYZa3vfQ&s", // Yusuf Abdurisag

    // --- Suiza (SUI) ---
    "SUI-1": "", // Escudo SFV
    "SUI-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbT-TXWsmkrXj0M-qhtuywr7p_dukvf-wla5Q7Xuxvw&s=10", // Yann Sommer
    "SUI-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkXhBMYcHTOr8vo8ONwjdl9ZFXdVQQTLj5GI9Q22tc0Q&s=10", // Silvan Widmer
    "SUI-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyPrkyiREJ5Kf2HydyoqfTKCHgpzigw5xwIPYo0bXnkA&s=10", // Manuel Akanji
    "SUI-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPQiZLrlIHSFnWWHG_lef1gu1y-xhtta4RbJtESk_Zw&s=10", // Fabian Schär
    "SUI-6": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Ricardo_Rodr%C3%ADguez_2018.jpg", // Ricardo Rodríguez
    "SUI-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRATOCzmlBK2l6KALgh1kHBxTN7rrwt5BxTrli55liScA&s", // Granit Xhaka
    "SUI-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2Xj5mgEgYKPzZdBDwhn4PChdC1I_hvSIrvrySHBzyGw&s=10", // Remo Freuler
    "SUI-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Pwa4MiYaEud2sfEe6-EuqkOBXMpy3h3sSmbJFi-A9w&s=10", // Denis Zakaria
    "SUI-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUTKetUPxA8Nn6nD20oufsD7RJ0-Se-x9btBoETFAkQ&s", // Xherdan Shaqiri
    "SUI-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH3PMLStdAloH7Oi426ehCKlOrjF-flMOWeWzfLkenqg&s=10", // Dan Ndoye
    "SUI-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRmizeazYTCwqr1w8TzDnanalKb5Vmor-luCULC-QLbg&s=10", // Breel Embolo

    // --- Brasil (BRA) ---
    "BRA-1": "", // Escudo CBF
    "BRA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbgsHC5uhSOvYTGnadXs8jvfA0mnJQqrUCvVf1_lWoqQ&s", // Alisson Becker
    "BRA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgsmoeS0_dS5DlJrXXhMxBghCISPUObkPd6mM-QLKJew&s=10", // Danilo
    "BRA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNvGEhZIUX4BwxCyvQI3k6sJDsTcDTW55aPIWthv9gXA&s", // Marquinhos
    "BRA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHdkmd4F_UCkOBU5S_0HkdyS-v4j3pPj3WrqppGDIm2Q&s=10", // Gabriel Magalhães
    "BRA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSULcqQh6jGVatTROl4HD4XOtQxuSbWhIQHr4OF1ScMyw&s=10", // Wendell
    "BRA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOS3YNJN-439LsOUTErG65zvepzaRBggW2MiguH0hofg&s", // Casemiro
    "BRA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5c_kypEMLx3NwQCHv-Ujvup0lA9d_iQIF4vwTkbidPQ&s", // Bruno Guimarães
    "BRA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKJpLbs3KzwsTO5mgT0N5RPtEwwiHm6zjq-AG0N0ENA&s=10", // Lucas Paquetá
    "BRA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNaz5nrtMsBvNOuqG3EO5aG0CBY7AhA--qHpzAatxlZQ&s=10", // Vinícius Júnior
    "BRA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLwTPYQGHhBxhPseE8ltRDQV7bVNA_bLhzIU61_Fxcg&s", // Rodrygo Goes
    "BRA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQjQaUXG2dnZyqPVYTNY4A8lKKJoiVZTaIT5M5emgQA&s", // Endrick

    // --- Marruecos (MAR) ---
    "MAR-1": "", // Escudo FRMF
    "MAR-2": "https://upload.wikimedia.org/wikipedia/commons/5/53/Yassine_Bono_%28cropped%29.jpg", // Yassine Bounou
    "MAR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKdb6kD6yWQmAxXCgLq1DhhtFoI5jp2uDzowOfGZXxw&s", // Achraf Hakimi
    "MAR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71egKaC4Q_7Is4crQhKMGhjNwVO528-cO_PrhbA2wrg&s=10", // Nayef Aguerd
    "MAR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJL6OIfKfKdye_vwOB4nPggumL_MxZ1QuUBbm08_TKYw&s=10", // Romain Saïss
    "MAR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LGnnz8fywP7BQTjprpTZael-ADiJ1gv6YL-JQ3DYkA&s=10", // Noussair Mazraoui
    "MAR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzONjv0_Zj6vji08R1xYmcEoUaUOcCcNlVozkp5aHzw&s=10", // Sofyan Amrabat
    "MAR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxxpfL7ui5YhKrdVCj4xHkXkfizbr2ACJ2cb4CjvS2g&s", // Azzedine Ounahi
    "MAR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYFzSLJmLrEHxTGA_1eA7a5HMRc3GGW_X1I9FVgztiGA&s", // Brahim Díaz
    "MAR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXlnp73zmgttoUSCYLhUzlvZjhqKRc4_InQcTyEMhGQ&s=10", // Hakim Ziyech
    "MAR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0ZVKxanpTO3GJrvOLxY2eJUWudwdSp4gajimgNLWjw&s=10", // Youssef En-Nesyri
    "MAR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS90l8afB0lPj7sNLP6T0egg12jKSH-sDjgYUcw4ZJxTg&s=10", // Amine Adli

    // --- Haití (HAI) ---
    "HAI-1": "", // Escudo FHF
    "HAI-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbOQZd2W00tCoFZIqhlng33b4MX-LOxyH4j7HzwqnnMQ&s=10", // Johny Placide
    "HAI-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVBAutLtnw824PKKrTXqy1JWGIXhzV_lSom8ZV94FkUQ&s=10", // Carlens Arcus
    "HAI-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdsKQsQuNbNGUvV5ZMUhx0RJ_lC5sntRHupQ7FeXvEfg&s=10", // Ricardo Adé
    "HAI-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9iZ59EG9gkHhv3rNG4aMAy6KbS0ZHo0jVEfBDQq_&s=10", // Alex Christian
    "HAI-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_b1SkxEjpxxgnFVbfpso0tLsue4Yq-btM4RujzYAxg&s=10", // Stephane Lambese
    "HAI-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhV4WaGjcztXw7urHAzXrRNVarFPNS2vL9Ns8jLvRPsg&s", // Bryan Alceus
    "HAI-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZbJgNVWxRjbepktxAV9lMiGHNYSwUfWE3SkP4mYdRg&s=10", // Leverton Pierre
    "HAI-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsFU2vLFnEiZfx5rn67xlxkiD9aNIV4-sQ5eDluT5b6w&s=10", // Danley Jean Jacques
    "HAI-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNa2PoeJ2c665vcRnWO6ymDcnNPtVbethLNi4Nz0krYw&s=10", // Duckens Nazon
    "HAI-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqHiSZ3aNsovCPwd0UBKpXig0nzrSrQ1VzjULKcXYRGA&s=10", // Frantzdy Pierrot
    "HAI-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcaAMMfoskxujCsE3NGdvjNeWe3ROSB3XMwGnrYEhhEQ&s=10", // Derrick Etienne Jr.

    // --- Escocia (SCO) ---
    "SCO-1": "", // Escudo SFA
    "SCO-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn_VUsWYP4uTJDbqBstrbVWLDNKsFvwpeMMvUhVV8hzw&s", // Angus Gunn
    "SCO-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQObOAxsjtAF7NVFjGiF7b571eCO89CIrqFaYPW5oaF6g&s", // Anthony Ralston
    "SCO-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2CXSOoPrrfSR7erKB-pMKRiz4_mtwUBdjpmFJ4WElmA&s", // Grant Hanley
    "SCO-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUTkV1vZlDwHTSMKllc8mSdAaOJ9tc7Pt3aUDt6JHnw&s", // Jack Hendry
    "SCO-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5IV74bQUKRU3au5WQRY2pC3F8za7Uw-wEW2v90OeWhA&s", // Andrew Robertson
    "SCO-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3fY8-WeBZktu72x6RVgsXWkO8T-0Zvz-zMf8y2FhpNw&s=10", // Scott McTominay
    "SCO-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq-ixedRaV1d_tw0NNyxAvSUVDZ-C-AqHgoNtved-CJw&s=10", // Callum McGregor
    "SCO-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcPWpPl9LagM2vMmHBdUgynI-cbiUKNOAlHQ97-YoWPA&s=10", // John McGinn
    "SCO-10": "https://upload.wikimedia.org/wikipedia/commons/6/67/Che_Adams_Scotland_v_Bolivia_6_June_2026-37_%28cropped%29.jpg", // Che Adams
    "SCO-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVdbP2AcZ3WFicyhGjAyJyF8EaM6_1evlTINkYjDdQHg&s", // Lawrence Shankland

    // --- Estados Unidos (USA) ---
    "USA-1": "", // Escudo US Soccer
    "USA-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStmqJevfhOZ1wFLUPqOH_ta320a2HNUVIqI5J5GW-70w&s", // Matt Turner
    "USA-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtD_v6LIwzBZ7kQ5Q-WKzES45xRIkn2WMCE2OQpwjHdA&s", // Sergiño Dest
    "USA-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrPlV3RnZLxDk82sWB0unL_jHiSlvTRerXyVRru5p5Zg&s=10", // Chris Richards
    "USA-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ226eNLUirQQPbGdz5aQghNvL_6dKVj01lEkRp9TEIpw&s", // Tim Ream
    "USA-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScilxr5fPlJYQwS9NvrXnSDKLxeJQFXZyikjk30VJy0w&s=10", // Antonee Robinson
    "USA-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnZj0xJc0CB6UmhrpdyNWHAWfqIO1xtAlQ-XTTyyqnjw&s", // Tyler Adams
    "USA-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTRq-_VNc1g-dnSrQrWqQTraLVPfQV2rH2YRhTv3oczA&s=10", // Weston McKennie
    "USA-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgM1WlPlCEw1yvpIlarmZomv8DZlBsaWRd-4rWDUR6UA&s=10", // Yunus Musah
    "USA-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtVPqjpM-InVqRSXIPUykHd3M1Zg4XSnjTHmVbszQ3FA&s=10", // Christian Pulisic
    "USA-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI6C3qDAKhRIreH6LgriWCaaiYXt8mN64Mp0hPJbO6Sw&s", // Timothy Weah
    "USA-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAva00qOLHgeM1Aapt4R99B654MHjaVs_oFChPTS4xWg&s=10", // Folarin Balogun

    // --- Paraguay (PAR) ---
    "PAR-1": "", // Escudo APF
    "PAR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrdWKL0iShuqZAeq7BhGNU5LpWNIepkVvmnvlpcRUbwA&s=10", // Carlos Coronel
    "PAR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Dk7sYY4XeeWpelp0JRnqnNx4Od5vczLe6jMGqJw7ag&s=10", // Gustavo Velázquez
    "PAR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwR4rPWacmzvJ96t3n4dZhvJOoAekVpa3EU_N8oOgLuw&s=10", // Gustavo Gómez
    "PAR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5sYmB8-Lc8ljCEqfyLvfmLrWYrIOWaJb9CAZVzISb4A&s=10", // Omar Alderete
    "PAR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHP6M3T4Qv9cGbFe7uVkuoQHlVFilcbLFFkoKN3n83zg&s=10", // Junior Alonso
    "PAR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBjESEKH9PZ5nIWhJu-DJbNGZqSo41V5yB2oCBVuyWiw&s=10", // Mathías Villasanti
    "PAR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRon85jIUhHm4lnl3ZbX76LAD89DfO_nRyu3Bv_PNffKQ&s=10", // Andrés Cubas
    "PAR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFitHP1ZZYhqgmRy3-nP2OpHTx0l3Mg7FIE3QhR3GDzg&s=10", // Julio Enciso
    "PAR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRybpAM3qSMDIIIKF7luxdMIXj4lFlCiygeMfM8s8EhaA&s", // Miguel Almirón
    "PAR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjyYAQhuVK6GRHQBKltPeWELuEuH7Dp7puLFTHxG1Xzg&s", // Ramon Sosa
    "PAR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHRJsvGj7prRLYOQk2nal1SK8RJYgQas9L7sZLRGeD0g&s=10", // Antonio Sanabria

    // --- Australia (AUS) ---
    "AUS-1": "", // Escudo Football Australia
    "AUS-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtpWLySTt5zFARy5cc8HHqsFvelaBrZ2Yzztxn3V13UQ&s=10", // Mathew Ryan
    "AUS-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMAUu5_bfkguE2YndacxSEAs-0xxNqNVmfVnVjOwc7-w&s=10", // Lewis Miller
    "AUS-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxgw27nZwevYy1O7xHHDWM6smhumbDmjulRBxzmZp_Mg&s", // Harry Souttar
    "AUS-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj6dAtrCnqiYZ1cfttM8Ia5qgNe6Z2RkRNHQuRZd2ChA&s=10", // Kye Rowles
    "AUS-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGldgHStiLWS4GaXs2DG83rfy_-dZgqWoSpPxKFZLBmw&s", // Aziz Behich
    "AUS-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3HRQZWVZisO2oliie9DZ-i0_7aDEx6KKE9Mlqhyyug&s", // Jackson Irvine
    "AUS-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX3Ceu2yn3ECkD5Chsp4bUHLlolFFa_p9vHPY_CiowOw&s=10", // Keanu Baccus
    "AUS-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeLw7xJfzIy62wt-Pwf0bZplNce_OHby05KIS92OGGIg&s", // Ajdin Hrustic
    "AUS-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_1Jsyw25RuhhIL29AtKyKRP3CEiZ4jLMuM4OI5cEsvg&s=10", // Craig Goodwin
    "AUS-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLx_TmX6__NF3SZSO4qVGrVi4YXRHtKlUW86uL84MLg&s=10", // Martin Boyle
    "AUS-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0dqclbeyQEKjQj4SiohGOz4RHACjRFrlc6SZH8yyiKg&s=10", // Mitch Duke

    // --- Turquía (TUR) ---
    "TUR-1": "", // Escudo TFF
    "TUR-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAF6E34R9uR8YKU-AVLhuOAlW5QMHGyZh1iyOBgYj7fQ&s=10", // Mert Günok
    "TUR-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2CcjlMsfT4NvESj_DGhaA5jpBHM_x-qNUV4l7RoXb8g&s=10", // Mert Müldür
    "TUR-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz3oxyiEm74ipVGrrkrpgyH2YQEwQaW5SIW5C4tIxmrg&s=10", // Samet Akaydin
    "TUR-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-msQqZNu5JIOU5wVUcZR5stJlSXTnRICEuIHqSQYFjw&s", // Abdülkerim Bardakcı
    "TUR-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnupjBgUXJVus1ICH6Rxpt5Wu2t2QCCa_ir7Dqo87DvQ&s=10", // Ferdi Kadıoğlu
    "TUR-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwQO8qcoN-4rSBal8nFX0xQNYeztDadonvXYLv4p-aQ&s=10", // Hakan Çalhanoğlu
    "TUR-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiPJKIJShIUuy0IaGYlTjVSA9ctA8I4B8P8Hdp7ies-w&s=10", // Kaan Ayhan
    "TUR-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfDiZ3WmPvL7Rbr1mxGKkBPVyvMtv9s7Hg67JJGui9qg&s", // Arda Güler
    "TUR-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpKQ3koHkmbSMpLvLy_XgyNQ8r7o6k9exPqL14gvWS4Q&s=10", // Kenan Yıldız
    "TUR-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4oq-UHUxcaELohXyuDrv4NnJzaKsTrK9Lpnqq33xxA&s", // Barış Alper Yılmaz
    "TUR-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP81L7nx_UEXfddKdET6rKLMxCcjvdCsozOUvh-ahn3A&s=10", // Cenk Tosun

    // --- Alemania (GER) ---
    "GER-1": "", // Escudo DFB
    "GER-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeCCGON7DbpgvjQn4UrkSwB4zrdJuq6dnENAe0qc_OHg&s", // Manuel Neuer
    "GER-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYY9sKjaAa-zS06c_o4vyGPhHf0S4Xi4jehcN7ThmRYQ&s", // Joshua Kimmich
    "GER-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2fp8_NgvZRX6yF2W3tze98LcqUGxmFIO_NVxsvI1Rw&s", // Antonio Rüdiger
    "GER-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuVb_jUKIkH8vCRx4_sOojgbmqhNcJZesABZpBaUPbZA&s", // Jonathan Tah
    "GER-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fmPBWJrtAgNwUuonvtmighHSo0Db4-IG-jrDKwI0rQ&s=10", // David Raum
    "GER-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTChwqk3SD28wFr2HgZqbD7J4GDKjJhop8No0x0ti9bw&s", // Toni Kroos
    "GER-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR220yMqmq9-6nUmsf-N2BBAu8RrXz2WmBGiVi6ovr1xw&s=10", // Ilkay Gündogan
    "GER-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQk4BhEeUQ92WvbWBrFZS8I28AC0FbG85IVAh9N2ohEA&s", // Jamal Musiala
    "GER-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6drAbDCYJNR7UUAqKajEVqP1LpVJTYBFR87tBJfc8Zg&s", // Florian Wirtz
    "GER-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWw0OdhesSS1Kk4DuPB8vQfqDbKMYWMP5W3lKHB0wYTw&s=10", // Leroy Sané
    "GER-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-wRIybXkrhkSjXxzP7NI7oOiJ5KrlGppqIF1itHk4aA&s=10", // Kai Havertz

    // --- Curazao (CUW) ---
    "CUW-1": "", // Escudo FFK
    "CUW-2": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ74mkLeWo5H_No-6S2qdfk-2ZDQmiQlGl3q5FSB_RmHA&s=10", // Eloy Room
    "CUW-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO4Yh5KJn-OrETxME47bNo2rluyae39_nYMQejVXeFXQ&s=10", // Cuco Martina
    "CUW-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaezkmBUZY0rFBua6t5epoPEahKAsJjlSGg51-VeAEA&s", // Roshon van Eijma
    "CUW-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQuL8Ml9wAnd8M4OXgZjPv0iHY3YXJWjetNB8L_EG3w&s=10", // Justin Ogenia
    "CUW-6": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Sherel_Floranus_at_Antalyaspor_vs_Fatih_Karag%C3%BCmr%C3%BCk_SK_20220213.jpg", // Sherel Floranus
    "CUW-7": "https://upload.wikimedia.org/wikipedia/commons/8/85/Leandro_Bacuna.jpg", // Leandro Bacuna
    "CUW-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6XinJ-hzK2Te0MIUgB7VxKe6GTOB6i8Oa1evp83MBvw&s=10", // Juninho Bacuna
    "CUW-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ47fehnu3NJWpKOLyAdtXouHHr3uR2SBZVp3Z27hMUgQ&s=10", // Vurnon Anita
    "CUW-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZnPvVsCm-eJu81yYOo2Lz6RJgW4HLolTIFyKfTvuNWQ&s=10", // Rangelo Janga
    "CUW-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5juELGLNPQ2FHBrYe3zSdNvjOzuRl-ezAkdAT8GdcvQ&s=10", // Kenji Gorré
    "CUW-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5qMg8m7TXgfbm-2UR3ARktUdpwQY2z6JyoVNlbrS3HQ&s=10", // Jarchinio Antonia

    // --- Costa de Marfil (CIV) ---
    "CIV-1": "", // Escudo FIF
    "CIV-2": "https://es.wikipedia.org/wiki/Yahia_Fofana", // Yahia Fofana
    "CIV-3": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeclYY-YsgOyLN2Ap9C6L8yQCb7AlkA_a8l_wBmkFiQA&s", // Wilfried Singo
    "CIV-4": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0P7-r_IEJwQLOyqGk0gBxSHplkOTdi88Cwl9lQR50EA&s", // Odilon Kossounou
    "CIV-5": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpGDranYg1w8LLsA04ncOoWMDcCBYtS-Dyxzk-ugqfNg&s=10", // Evan Ndicka
    "CIV-6": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqI2Llxud742iY0_QshVxhbRY42hDjvpdrJEIQRNYZGg&s", // Ghislain Konan
    "CIV-7": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeWvXS6boaCJAT7wNl1CuljLrQAQPlY34c4UFgc-FJAg&s", // Franck Kessié
    "CIV-8": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUnG-EncgkA8Vogw8zyGUP9__5Pk4rz_twGc7oYO2Zqg&s", // Ibrahim Sangaré
    "CIV-9": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqufW95SC2a7TIGB7puDhmscQwuh-PSxkRwLEM78c6aA&s", // Seko Fofana
    "CIV-10": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLNSf-5Gg4OH_Yv5YI8uiGtDu9DrxW73gjUoIHGM3mA&s", // Simon Adingra
    "CIV-11": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdFU1DM3LD8534LRE6qEwqIaaNR0RpZseWP0uGroKNmg&s=10", // Sébastien Haller
    "CIV-12": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoSgYzXiz_K44EgbovSTo5Is8M3qwjXFDJ-NGrdsyrQ&s", // Nicolas Pépé

    // --- Ecuador (ECU) ---
    "ECU-1": "", // Escudo FEF
    "ECU-2": "", // Hernán Galíndez
    "ECU-3": "", // Angelo Preciado
    "ECU-4": "", // Félix Torres
    "ECU-5": "", // Willian Pacho
    "ECU-6": "", // Piero Hincapié
    "ECU-7": "", // Moisés Caicedo
    "ECU-8": "", // Alan Franco
    "ECU-9": "", // Kendry Páez
    "ECU-10": "", // Enner Valencia
    "ECU-11": "", // Jeremy Sarmiento
    "ECU-12": "", // Kevin Rodríguez

    // --- Países Bajos (NED) ---
    "NED-1": "", // Escudo KNVB
    "NED-2": "", // Bart Verbruggen
    "NED-3": "", // Denzel Dumfries
    "NED-4": "", // Virgil van Dijk
    "NED-5": "", // Nathan Aké
    "NED-6": "", // Micky van de Ven
    "NED-7": "", // Tijjani Reijnders
    "NED-8": "", // Jerdy Schouten
    "NED-9": "", // Xavi Simons
    "NED-10": "", // Cody Gakpo
    "NED-11": "", // Memphis Depay
    "NED-12": "", // Donyell Malen

    // --- Japón (JPN) ---
    "JPN-1": "", // Escudo JFA
    "JPN-2": "", // Zion Suzuki
    "JPN-3": "", // Yukinari Sugawara
    "JPN-4": "", // Ko Itakura
    "JPN-5": "", // Takehiro Tomiyasu
    "JPN-6": "", // Yuto Nagatomo
    "JPN-7": "", // Wataru Endo
    "JPN-8": "", // Hidemasa Morita
    "JPN-9": "", // Takefusa Kubo
    "JPN-10": "", // Kaoru Mitoma
    "JPN-11": "", // Takumi Minamino
    "JPN-12": "", // Ayase Ueda

    // --- Suecia (SWE) ---
    "SWE-1": "", // Escudo SvFF
    "SWE-2": "", // Robin Olsen
    "SWE-3": "", // Emil Holm
    "SWE-4": "", // Victor Lindelöf
    "SWE-5": "", // Isak Hien
    "SWE-6": "", // Ludwig Augustinsson
    "SWE-7": "", // Jens Cajuste
    "SWE-8": "", // Hugo Larsson
    "SWE-9": "", // Dejan Kulusevski
    "SWE-10": "", // Alexander Isak
    "SWE-11": "", // Viktor Gyökeres
    "SWE-12": "", // Anthony Elanga

    // --- Túnez (TUN) ---
    "TUN-1": "", // Escudo FTF
    "TUN-2": "", // Bechir Ben Saïd
    "TUN-3": "", // Yan Valery
    "TUN-4": "", // Yassine Meriah
    "TUN-5": "", // Montassar Talbi
    "TUN-6": "", // Ali Abdi
    "TUN-7": "", // Ellyes Skhiri
    "TUN-8": "", // Aïssa Laïdouni
    "TUN-9": "", // Mohamed Ali Ben Romdhane
    "TUN-10": "", // Youssef Msakni
    "TUN-11": "", // Elias Achouri
    "TUN-12": "", // Seifeddine Jaziri

    // --- Bélgica (BEL) ---
    "BEL-1": "", // Escudo RBFA
    "BEL-2": "", // Koen Casteels
    "BEL-3": "", // Timothy Castagne
    "BEL-4": "", // Wout Faes
    "BEL-5": "", // Jan Vertonghen
    "BEL-6": "", // Arthur Theate
    "BEL-7": "", // Kevin De Bruyne
    "BEL-8": "", // Amadou Onana
    "BEL-9": "", // Youri Tielemans
    "BEL-10": "", // Romelu Lukaku
    "BEL-11": "", // Jérémy Doku
    "BEL-12": "", // Leandro Trossard

    // --- Egipto (EGY) ---
    "EGY-1": "", // Escudo EFA
    "EGY-2": "", // Mohamed El Shenawy
    "EGY-3": "", // Mohamed Hany
    "EGY-4": "", // Ahmed Hegazi
    "EGY-5": "", // Mohamed Abdelmonem
    "EGY-6": "", // Mohamed Hamdy
    "EGY-7": "", // Hamdy Fathy
    "EGY-8": "", // Elneny
    "EGY-9": "", // Zizo
    "EGY-10": "", // Mohamed Salah
    "EGY-11": "", // Mostafa Mohamed
    "EGY-12": "", // Omar Marmoush

    // --- Irán (IRN) ---
    "IRN-1": "", // Escudo FFIRI
    "IRN-2": "", // Alireza Beiranvand
    "IRN-3": "", // Ramin Rezaeian
    "IRN-4": "", // Hossein Kanaani
    "IRN-5": "", // Shojae Khalilzadeh
    "IRN-6": "", // Ehsan Hajsafi
    "IRN-7": "", // Saeid Ezatolahi
    "IRN-8": "", // Saman Ghoddos
    "IRN-9": "", // Alireza Jahanbakhsh
    "IRN-10": "", // Mehdi Taremi
    "IRN-11": "", // Sardar Azmoun
    "IRN-12": "", // Ali Gholizadeh

    // --- Nueva Zelanda (NZL) ---
    "NZL-1": "", // Escudo NZF
    "NZL-2": "", // Max Crocombe
    "NZL-3": "", // Tim Payne
    "NZL-4": "", // Michael Boxall
    "NZL-5": "", // Tyler Bindon
    "NZL-6": "", // Liberato Cacace
    "NZL-7": "", // Joe Bell
    "NZL-8": "", // Mark Marko Stamenic
    "NZL-9": "", // Sarpreet Singh
    "NZL-10": "", // Chris Wood
    "NZL-11": "", // Kosta Barbarouses
    "NZL-12": "", // Ben Waine

    // --- España (ESP) ---
    "ESP-1": "", // Escudo RFEF
    "ESP-2": "", // Unai Simón
    "ESP-3": "", // Dani Carvajal
    "ESP-4": "", // Robin Le Normand
    "ESP-5": "", // Aymeric Laporte
    "ESP-6": "", // Marc Cucurella
    "ESP-7": "", // Rodri Hernández
    "ESP-8": "", // Pedri González
    "ESP-9": "", // Gavi
    "ESP-10": "", // Lamine Yamal
    "ESP-11": "", // Nico Williams
    "ESP-12": "", // Álvaro Morata

    // --- Cabo Verde (CPV) ---
    "CPV-1": "", // Escudo FCF
    "CPV-2": "", // Vozinha
    "CPV-3": "", // Steven Moreira
    "CPV-4": "", // Logan Costa
    "CPV-5": "", // Roberto Lopes
    "CPV-6": "", // Joao Paulo Fernandes
    "CPV-7": "", // Jamiro Monteiro
    "CPV-8": "", // Kevin Pina
    "CPV-9": "", // Deroy Duarte
    "CPV-10": "", // Ryan Mendes
    "CPV-11": "", // Bebé
    "CPV-12": "", // Garry Rodrigues

    // --- Arabia Saudí (KSA) ---
    "KSA-1": "", // Escudo SAFF
    "KSA-2": "", // Mohammed Al-Owais
    "KSA-3": "", // Sultan Al-Ghannam
    "KSA-4": "", // Ali Al-Bulaihi
    "KSA-5": "", // Hassan Tambakti
    "KSA-6": "", // Yasser Al-Shahrani
    "KSA-7": "", // Mohamed Kanno
    "KSA-8": "", // Abdulelah Al-Malki
    "KSA-9": "", // Salem Al-Dawsari
    "KSA-10": "", // Firas Al-Buraikan
    "KSA-11": "", // Saleh Al-Shehri
    "KSA-12": "", // Abdulrahman Ghareeb

    // --- Uruguay (URU) ---
    "URU-1": "", // Escudo AUF
    "URU-2": "", // Sergio Rochet
    "URU-3": "", // Nahitan Nández
    "URU-4": "", // Ronald Araújo
    "URU-5": "", // José María Giménez
    "URU-6": "", // Mathías Olivera
    "URU-7": "", // Federico Valverde
    "URU-8": "", // Manuel Ugarte
    "URU-9": "", // Nicolas de la Cruz
    "URU-10": "", // Darwin Núñez
    "URU-11": "", // Facundo Pellistri
    "URU-12": "", // Maximilliano Araújo

    // --- Francia (FRA) ---
    "FRA-1": "", // Escudo FFF
    "FRA-2": "", // Mike Maignan
    "FRA-3": "", // Jules Koundé
    "FRA-4": "", // William Saliba
    "FRA-5": "", // Dayot Upamecano
    "FRA-6": "", // Theo Hernández
    "FRA-7": "", // Aurelien Tchouaméni
    "FRA-8": "", // Eduardo Camavinga
    "FRA-9": "", // Antoine Griezmann
    "FRA-10": "", // Kylian Mbappé
    "FRA-11": "", // Ousmane Dembélé
    "FRA-12": "", // Marcus Thuram

    // --- Noruega (NOR) ---
    "NOR-1": "", // Escudo NFF
    "NOR-2": "", // Ørjan Nyland
    "NOR-3": "", // Julian Ryerson
    "NOR-4": "", // Leo Østigård
    "NOR-5": "", // Kristoffer Ajer
    "NOR-6": "", // David Møller Wolfe
    "NOR-7": "", // Martin Ødegaard
    "NOR-8": "", // Sander Berge
    "NOR-9": "", // Oscar Bobb
    "NOR-10": "", // Erling Haaland
    "NOR-11": "", // Alexander Sørloth
    "NOR-12": "", // Jørgen Strand Larsen

    // --- Senegal (SEN) ---
    "SEN-1": "", // Escudo FSF
    "SEN-2": "", // Édouard Mendy
    "SEN-3": "", // Formose Mendy
    "SEN-4": "", // Kalidou Koulibaly
    "SEN-5": "", // Moussa Niakhaté
    "SEN-6": "", // Ismail Jakobs
    "SEN-7": "", // Idrissa Gueye
    "SEN-8": "", // Pape Matar Sarr
    "SEN-9": "", // Lamine Camara
    "SEN-10": "", // Sadio Mané
    "SEN-11": "", // Ismaïla Sarr
    "SEN-12": "", // Nicolas Jackson

    // --- Irak (IRQ) ---
    "IRQ-1": "", // Escudo IFA
    "IRQ-2": "", // Jalal Hassan
    "IRQ-3": "", // Hussein Ali
    "IRQ-4": "", // Saad Natiq
    "IRQ-5": "", // Rebin Sulaka
    "IRQ-6": "", // Merchas Doski
    "IRQ-7": "", // Amir Al-Ammari
    "IRQ-8": "", // Ibrahim Bayesh
    "IRQ-9": "", // Zidane Iqbal
    "IRQ-10": "", // Aymen Hussein
    "IRQ-11": "", // Ali Jasim
    "IRQ-12": "", // Mohanad Ali

    // --- Argentina (ARG) ---
    "ARG-1": "", // Escudo AFA
    "ARG-2": "", // Emiliano Martínez
    "ARG-3": "", // Nahuel Molina
    "ARG-4": "", // Cristian Romero
    "ARG-5": "", // Nicolas Otamendi
    "ARG-6": "", // Nicolas Tagliafico
    "ARG-7": "", // Rodrigo De Paul
    "ARG-8": "", // Alexis Mac Allister
    "ARG-9": "", // Enzo Fernández
    "ARG-10": "", // Lionel Messi
    "ARG-11": "", // Julian Álvarez
    "ARG-12": "", // Lautaro Martínez

    // --- Austria (AUT) ---
    "AUT-1": "", // Escudo ÖFB
    "AUT-2": "", // Patrick Pentz
    "AUT-3": "", // Stefan Posch
    "AUT-4": "", // Kevin Danso
    "AUT-5": "", // Maximilian Wöber
    "AUT-6": "", // Phillipp Mwene
    "AUT-7": "", // Nicolas Seiwald
    "AUT-8": "", // Marcel Sabitzer
    "AUT-9": "", // Conrad Laimer
    "AUT-10": "", // Christoph Baumgartner
    "AUT-11": "", // Marko Arnautović
    "AUT-12": "", // Michael Gregoritsch

    // --- Argelia (ALG) ---
    "ALG-1": "", // Escudo FAF
    "ALG-2": "", // Anthony Mandrea
    "ALG-3": "", // Youssef Atal
    "ALG-4": "", // Aïssa Mandi
    "ALG-5": "", // Ramy Bensebaini
    "ALG-6": "", // Rayan Aït-Nouri
    "ALG-7": "", // Ismaël Bennacer
    "ALG-8": "", // Ramiz Zerrouki
    "ALG-9": "", // Houssem Aouar
    "ALG-10": "", // Riyad Mahrez
    "ALG-11": "", // Amine Gouiri
    "ALG-12": "", // Baghdad Bounedjah

    // --- Jordania (JOR) ---
    "JOR-1": "", // Escudo JFA
    "JOR-2": "", // Yazid Abu Layla
    "JOR-3": "", // Ehsan Haddad
    "JOR-4": "", // Yazan Al-Arab
    "JOR-5": "", // Abdallah Nasib
    "JOR-6": "", // Salem Al-Ajalin
    "JOR-7": "", // Nizar Al-Rashdan
    "JOR-8": "", // Noor Al-Rawabdeh
    "JOR-9": "", // Ali Olwan
    "JOR-10": "", // Musa Al-Taamari
    "JOR-11": "", // Yazan Al-Naimat
    "JOR-12": "", // Mahmoud Al-Mardi

    // --- Portugal (POR) ---
    "POR-1": "", // Escudo FPF
    "POR-2": "", // Diogo Costa
    "POR-3": "", // Joao Cancelo
    "POR-4": "", // Ruben Dias
    "POR-5": "", // Pepe
    "POR-6": "", // Nuno Mendes
    "POR-7": "", // Bruno Fernandes
    "POR-8": "", // Bernardo Silva
    "POR-9": "", // Vitinha
    "POR-10": "", // Cristiano Ronaldo
    "POR-11": "", // Rafael Leao
    "POR-12": "", // Joao Félix

    // --- República Democrática del Congo (COD) ---
    "COD-1": "", // Escudo FECOFA
    "COD-2": "", // Lionel Mpasi
    "COD-3": "", // Gédéon Kalulu
    "COD-4": "", // Chancel Mbemba
    "COD-5": "", // Henoc Inonga Baka
    "COD-6": "", // Arthur Masuaku
    "COD-7": "", // Samuel Moutoussamy
    "COD-8": "", // Charles Pickel
    "COD-9": "", // Gaël Kakuta
    "COD-10": "", // Cédric Bakambu
    "COD-11": "", // Yoane Wissa
    "COD-12": "", // Meschak Elia

    // --- Uzbekistán (UZB) ---
    "UZB-1": "", // Escudo UFA
    "UZB-2": "", // Utkir Yusupov
    "UZB-3": "", // Khojiakbar Alijonov
    "UZB-4": "", // Husniddin Aliqulov
    "UZB-5": "", // Abdukodir Khusanov
    "UZB-6": "", // Farrukh Sayfiev
    "UZB-7": "", // Otabek Shukurov
    "UZB-8": "", // Odiljon Hamrobekov
    "UZB-9": "", // Abbosbek Fayzullaev
    "UZB-10": "", // Eldor Shomurodov
    "UZB-11": "", // Jaloliddin Masharipov
    "UZB-12": "", // Oston Urunov

    // --- Colombia (COL) ---
    "COL-1": "", // Escudo FCF
    "COL-2": "", // Camilo Vargas
    "COL-3": "", // Daniel Muñoz
    "COL-4": "", // Davinson Sánchez
    "COL-5": "", // Carlos Cuesta
    "COL-6": "", // Johan Mojica
    "COL-7": "", // Jefferson Lerma
    "COL-8": "", // Richard Ríos
    "COL-9": "", // James Rodríguez
    "COL-10": "", // Luis Díaz
    "COL-11": "", // Jhon Arias
    "COL-12": "", // Jhon Córdoba

    // --- Inglaterra (ENG) ---
    "ENG-1": "", // Escudo FA
    "ENG-2": "", // Jordan Pickford
    "ENG-3": "", // Kyle Walker
    "ENG-4": "", // John Stones
    "ENG-5": "", // Marc Guéhi
    "ENG-6": "", // Kieran Trippier
    "ENG-7": "", // Declan Rice
    "ENG-8": "", // Jude Bellingham
    "ENG-9": "", // Phil Foden
    "ENG-10": "", // Harry Kane
    "ENG-11": "", // Bukayo Saka
    "ENG-12": "", // Cole Palmer

    // --- Croacia (CRO) ---
    "CRO-1": "", // Escudo HNS
    "CRO-2": "", // Dominik Livaković
    "CRO-3": "", // Josip Juranović
    "CRO-4": "", // Josip Šutalo
    "CRO-5": "", // Joško Gvardiol
    "CRO-6": "", // Borna Sosa
    "CRO-7": "", // Luka Modrić
    "CRO-8": "", // Mateo Kovačić
    "CRO-9": "", // Mario Pašalić
    "CRO-10": "", // Andrej Kramarić
    "CRO-11": "", // Ante Budimir
    "CRO-12": "", // Ivan Perišić

    // --- Ghana (GHA) ---
    "GHA-1": "", // Escudo GFA
    "GHA-2": "", // Lawrence Ati-Zigi
    "GHA-3": "", // Tariq Lamptey
    "GHA-4": "", // Daniel Amartey
    "GHA-5": "", // Alexander Djiku
    "GHA-6": "", // Gideon Mensah
    "GHA-7": "", // Thomas Partey
    "GHA-8": "", // Mohammed Kudus
    "GHA-9": "", // Salis Abdul Samed
    "GHA-10": "", // Jordan Ayew
    "GHA-11": "", // Inaki Williams
    "GHA-12": "", // Antoine Semenyo

    // --- Panamá (PAN) ---
    "PAN-1": "", // Escudo FEPAFUT
    "PAN-2": "", // Orlando Mosquera
    "PAN-3": "", // Michael Murillo
    "PAN-4": "", // José Córdoba
    "PAN-5": "", // Edgardo Fariña
    "PAN-6": "", // Roderick Miller
    "PAN-7": "", // Adalberto Carrasquilla
    "PAN-8": "", // Cristian Martínez
    "PAN-9": "", // Yoel Bárcenas
    "PAN-10": "", // Ismael Díaz
    "PAN-11": "", // José Fajardo
    "PAN-12": "" // Eduardo Guerrero
};
