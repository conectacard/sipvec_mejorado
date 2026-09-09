const CONFIG = {
    whatsapp: "5214491472336", 
    whatsappAdicional: "5214491472336",
    sitioWeb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    facebook: "https://www.facebook.com/?locale=es_LA",
    instagram: "https://www.instagram.com/my_sing_studio/",
    maps: "https://maps.app.goo.gl/MiznKcbPu7fBTdzS9", 
    youtubeUrl: "https://www.youtube.com/watch?v=-H6Htu3DAL4",
    textos: {
        cat1: { t: "QUIÉNES SOMOS", c: "ZENITH CAR redefine la movilidad premium en la región, ofreciendo vehículos de alta ingeniería, deportividad pura, seguridad de vanguardia y un diseño sofisticado que eleva la experiencia de conducción diaria al verdadero placer de conducir." },
        cat2: { t: "EXCELENCIA", c: "Explora nuestra gama de servicios automotrices premium: Venta de vehículos nuevos de la línea ZENITH CAR, planes de financiamiento corporativos y a tu medida, pruebas de manejo personalizadas, taller mecánico de alta especialización y venta de refacciones originales." },
        cat3: { t: "CLIENTES FELICES", c: "Nuestra prioridad es la excelencia en el servicio. Conductores y familias de Aguascalientes respaldan la calidad, el confort and el desempeño excepcional que solo la ingeniería avanzada y la deportividad de ZENITH CAR pueden ofrecer." }
    },
    sucursales: {
        suc1: { nombre: "Asesor 1", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en SUVs", img: "assets/brand/ASESOR1.jpg" },
        suc2: { nombre: "Asesor 2", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en Sedanes", img: "assets/brand/ASESOR2.jpg" },
        suc3: { nombre: "Asesor 3", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en Vehículos Eléctricos", img: "assets/brand/ASESOR3.jpg" },
        suc4: { nombre: "Asesor 4", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en Financiamiento", img: "assets/brand/ASESOR4.jpg" },
        suc5: { nombre: "Asesor 5", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en Vehículos Deportivos", img: "assets/brand/ASESOR5.jpg" },
        suc6: { nombre: "Asesor 6", wa: "5214491472336", maps: "https://maps.app.goo.gl/RCnMaFC6yBCkqHjv9", esp: "Especialista en Seminuevos Certificados", img: "assets/brand/ASESOR6.jpg" }
    }
};

let currentGallery = [];
let currentIndex = 0;
let isMuted = false;

function openYouTubeVideo() { 
    playClick(); 
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    let videoId = "4LLMlYBo54I"; 
    
    if(CONFIG.youtubeUrl.includes("shorts/")) { 
        videoId = CONFIG.youtubeUrl.split("shorts/")[1].split("?")[0]; 
    } else if(CONFIG.youtubeUrl.includes("v=")) { 
        videoId = CONFIG.youtubeUrl.split("v=")[1].split("&")[0]; 
    } else if(CONFIG.youtubeUrl.includes("youtu.be/")) {
        videoId = CONFIG.youtubeUrl.split("youtu.be/")[1].split("?")[0];
    }
    
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    overlay.style.display = 'flex';
}

function closeVideoLightbox() {
    playClick();
    const overlay = document.getElementById('video-lightbox-overlay');
    const iframe = document.getElementById('video-lightbox-frame');
    iframe.src = ""; 
    overlay.style.display = 'none';
}

function openProfileZoom() {
    playClick();
    const imgElement = document.getElementById('profile-pic-img');
    if(imgElement) { const src = imgElement.src; openLightbox(src, [src], true); }
}

function showAppContent(cat) {
    playClick();
    document.getElementById('dynamic-content-layer').style.display = 'flex';
    document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
    const pane = document.getElementById(`${cat}-pane`);
    if(pane) pane.style.display = 'flex';
    if(cat !== 'cat4') {
        renderGallery(cat);
    } else {
        injectExtraContactInfo();
    }
}

// INYECCIÓN DE TELÉFONO Y CORREO SIN PERDER LA ESTRUCTURA NI EL ESTILO VISUAL DE LA GALERÍA
function injectExtraContactInfo() {
    let contenedorExtra = document.getElementById('bloque-contacto-pyme');
    if (!contenedorExtra) {
        const socialStack = document.querySelector('.social-vertical-stack');
        if (socialStack) {
            contenedorExtra = document.createElement('div');
            contenedorExtra.id = 'bloque-contacto-pyme';
            contenedorExtra.className = 'bloque-adicional-contacto';
            contenedorExtra.innerHTML = `
                <span class="lbl-contacto-sub">Teléfono de atención</span>
                <a href="tel:4491472336" class="linea-contacto-directa" onclick="playClickSound()">
                    <i class="fas fa-phone-alt"></i> <span>449 147 2336</span>
                </a>
                <span class="lbl-contacto-sub" style="margin-top: 6px;">Correo electrónico</span>
                <a href="mailto:altpromex@gmail.com" class="linea-contacto-directa" onclick="playClickSound()">
                    <i class="fas fa-envelope"></i> <span>altpromex@gmail.com</span>
                </a>
            `;
            socialStack.parentNode.insertBefore(contenedorExtra, socialStack);
        }
    }
}

function renderGallery(cat) {
    const grid = document.getElementById(`grid-${cat}`);
    if(!grid) return; 
    grid.innerHTML = '';
    
    const titleHeader = document.createElement('h2');
    titleHeader.className = 'gallery-title-white';
    titleHeader.setAttribute('data-i18n', `${cat}_t`);
titleHeader.innerText = CONFIG.textos[cat].t;
    grid.appendChild(titleHeader);
    
    const imgCount = (cat === 'cat3') ? 4 : (cat === 'cat1' || cat === 'cat2') ? 6 : 4;
    const imgs = [];
    for(let i = 1; i <= imgCount; i++) { imgs.push(`assets/gallery/${cat}/${i}.jpg`); }
    
    const rowGrid = document.createElement('div');
    rowGrid.className = 'quad-row-grid';
    imgs.forEach((src, index) => {
        const posClass = (index % 2 === 0) ? 'pos-left' : 'pos-right';
        rowGrid.appendChild(createPol(src, posClass, imgs));
    });
    grid.appendChild(rowGrid);
    
    if (cat === 'cat3') {
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = "display: flex; gap: 10px; margin-top: 15px; justify-content: center; width: 100%; flex-wrap: wrap;";
        videoContainer.innerHTML = `
            <a href="https://www.youtube.com/shorts/pLPcbWtiy-Y" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Opinión de nuestros clientes</a>
            <a href="https://www.youtube.com/shorts/0WF5h9Dew5U" target="_blank" style="background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 800; font-size: 0.7rem; border: 1px solid var(--brand-accent);">Viviendo un BMW</a>
        `;
        grid.appendChild(videoContainer);
    }
    
    const btn = document.createElement('button');
    btn.className = 'btn-details-gold'; 
    btn.innerHTML = `<i class="fas fa-plus-circle"></i> VER DETALLES`;
    btn.onclick = (e) => { e.stopPropagation(); openTextZoom(cat); };
    grid.appendChild(btn);
}

function createPol(src, pos, arr) {
    const div = document.createElement('div');
    div.className = `polaroid-item ${pos}`;
    div.innerHTML = `<img src="${src}">`;
    div.onclick = (e) => { e.stopPropagation(); openLightbox(src, arr, false); };
    return div;
}

function openLightbox(src, arr, hideControls) {
    playClick();
    
    // MEJORA: Si arr no existe o viene vacío, creamos un array con la imagen actual para evitar errores
    currentGallery = (arr && arr.length > 0) ? arr : [src];
    currentIndex = currentGallery.indexOf(src);
    if (currentIndex === -1) currentIndex = 0;
    
    const lightboxEl = document.getElementById('lightbox');
    const imgEl = document.getElementById('lightbox-image');
    
    // Si hideControls es true (como con los asesores) OR si la galería real solo tiene 1 imagen, esconde las flechas.
    // Si viene de QUIENES SOMOS, EXCELENCIA o CLIENTES FELICES con su grupo de fotos, quita el bloqueo y activa las flechas.
    if (hideControls || currentGallery.length <= 1) { 
        lightboxEl.classList.add('hide-nav-arrows'); 
    } else { 
        lightboxEl.classList.remove('hide-nav-arrows'); 
    }
    
    imgEl.src = src;
    lightboxEl.style.display = 'flex';
}

function changeLightboxImage(dir) {
    if(currentGallery.length <= 1) return;
    playClick();
    currentIndex = (currentIndex + dir + currentGallery.length) % currentGallery.length;
    document.getElementById('lightbox-image').src = currentGallery[currentIndex];
}

function openTextZoom(cat) {
    playClick();
    const modalTitle = document.getElementById('text-zoom-title');
    const modalContent = document.getElementById('text-zoom-content');
    
    // Conectamos con el sistema de idiomas
    modalTitle.setAttribute('data-i18n', `${cat}_t`);
    modalContent.setAttribute('data-i18n', `${cat}_c`);
    
    modalTitle.innerText = CONFIG.textos[cat].t;
    modalContent.innerText = CONFIG.textos[cat].c;
    
    // Si tu sistema de idiomas tiene una función para refrescar, la llamamos aquí
    if (typeof applyLanguage === 'function') {
        applyLanguage();
    }
    
    document.getElementById('text-zoom-modal').style.display = 'flex';
}

function closeLightbox() { 
    playClick(); 
    document.getElementById('lightbox').style.display = 'none'; 
}
function closeAppContent() { document.getElementById('dynamic-content-layer').style.display = 'none'; }
function closeTextZoom() { document.getElementById('text-zoom-modal').style.display = 'none'; }
function openBrandModal(modalId) { playClick(); const modal = document.getElementById(modalId); if (modal) modal.style.display = 'flex'; }
function closeBrandModal(modalId) { const modal = document.getElementById(modalId); if (modal) modal.style.display = 'none'; }
function playClickSound() { playClick(); }

function toggleAudioGlobal() {
    isMuted = !isMuted;
    // Eliminamos por completo las líneas que buscaban 'spot-intro' y 'audio-icon'
}

function playClick() { const snd = document.getElementById('sndFxClick'); if(snd && !isMuted) { snd.currentTime = 0; snd.play().catch(()=>{}); } }
function openNetworkCard(url) { playClick(); window.open(url, '_blank'); }

function abrirMenu() {
    playClick();
    document.getElementById('miMenuContacto').style.display = 'flex';
}

function cerrarMenu() {
    document.getElementById('miMenuContacto').style.display = 'none';
    document.querySelectorAll('.sucursal-panel-content').forEach(panel => panel.style.display = 'none');
}

function toggleSucursalAcordeon(sucKey) {
    playClick();
    const panel = document.getElementById(`${sucKey}-panel`);
    const estaVisible = panel.style.display === 'flex';
    document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

// INYECCIÓN DINÁMICA MEJORADA CON MINIATURAS, ZOOM TIPO LIGHTBOX INDEPENDIENTE Y ESPECIALIDADES
function inicializarAcordeon() {
    const contenedor = document.getElementById('contenedor-sucursales');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    Object.keys(CONFIG.sucursales).forEach((key, index) => {
        const suc = CONFIG.sucursales[key];
        
        // Contenedor del botón estructurado
        const btn = document.createElement('button');
        btn.className = 'sucursal-accordion-btn';
        
        // Wrapper miniatura para aislar el evento click y permitir el Zoom Lightbox solicitado
        const wrapImg = document.createElement('div');
        wrapImg.className = 'wrapper-miniatura-asesor';
        wrapImg.innerHTML = `<img src="${suc.img}" alt="${suc.nombre}" class="img-miniatura-asesor">`;
        wrapImg.onclick = (e) => {
            e.stopPropagation(); // Detiene la apertura del acordeón
            playClick();
            openLightbox(suc.img, [suc.img], true); // Lanza visualizador Lightbox con flechas ocultas
        };
        
        // Contenedor de Texto del nombre del asesor
        const txtLabel = document.createElement('div');
        txtLabel.className = 'texto-accordion-asesor';
        txtLabel.innerText = `${index + 1}. ${suc.nombre.toUpperCase()}`;
        
        // Icono indicador de despliegue
        const arrowIcon = document.createElement('i');
        arrowIcon.className = 'fas fa-chevron-down icono-accordion-flecha';
        
        btn.appendChild(wrapImg);
        btn.appendChild(txtLabel);
        btn.appendChild(arrowIcon);
        
        btn.onclick = () => toggleSucursalAcordeon(key);
        
        // Crear Panel Oculto con Especialidades robustecidas y marca elegante
        const panel = document.createElement('div');
        panel.id = `${key}-panel`;
        panel.className = 'sucursal-panel-content';
        panel.innerHTML = `
            <div class="sucursal-info-block">
                <p class="suc-domicilio" style="font-weight: 700; color: #fff;"><i class="fas fa-certificate" style="color: var(--brand-secondary); margin-right: 4px;"></i> ${suc.esp}</p>
                <p class="suc-horario" style="margin-top: 3px;"><i class="far fa-clock"></i> 9:00 AM a 8:00 PM</p>
                <div class="marca-elegante-asesor">ZENITH CAR</div>
            </div>
            <a href="https://wa.me/${suc.wa}?text=Hola!%20Me%20interesa%20cotizar%20un%20veh%C3%ADculo%20BMW%20y%20agendar%20una%20prueba%20de%20manejo." target="_blank" class="btn-menu whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="${suc.maps}" target="_blank" class="btn-menu maps-btn"><i class="fas fa-location-arrow"></i> Cómo Llegar</a>
        `;
        
        contenedor.appendChild(btn);
        contenedor.appendChild(panel);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarAcordeon();
    window.addEventListener('click', () => {
        const spot = document.getElementById('spot-intro');
        if(spot && !isMuted) spot.play().catch(()=>{});
    }, {once: true});
});

async function shareExperienceRobust() {
    const idAsesor = new URLSearchParams(window.location.search).get('asesor');

    // Si es una visita pública normal (sin asesor), comparte directo sin pedir datos
    if (!idAsesor) {
        const textoPublico = `¡Compré en ZENITH CAR! ¡Excelente experiencia! Te la comparto: ` + window.location.href;
        if (navigator.share) {
            try { await navigator.share({ title: 'ZENITH CAR', text: '¡Excelente experiencia!', url: window.location.href }); return; } catch (e) {}
        }
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textoPublico)}`, "_blank");
        return;
    }

    // SI ES UN ASESOR: 1. Pide los datos obligatorios
    let nombreCliente = prompt("Escribe el NOMBRE del prospecto:");
    let contactoCliente = prompt("Escribe el TELÉFONO o CORREO del prospecto:");

    if (!nombreCliente || !contactoCliente) {
        alert("⚠️ Debes ingresar el nombre y contacto para registrar tu seguimiento.");
        return; // Se detiene aquí y NO cuenta nada si el asesor cancela la ventanita
    }

    // Limpieza y normalización del teléfono para evitar trampas por espacios o guiones
    let contactoLimpio = contactoCliente.trim();
    let telefonoSoloDigitos = contactoLimpio.replace(/\D/g, '');

    // 2. Procesa la base de datos local (Detecta si es nuevo o reintento)
    let baseDatosProspectos = JSON.parse(localStorage.getItem('db_prospectos_agencia')) || [];
    
    let prospectoExistente = baseDatosProspectos.find(p => {
        let pTelefono = (p.contacto || "").replace(/\D/g, '');
        if (telefonoSoloDigitos.length >= 7) {
            return pTelefono === telefonoSoloDigitos && p.asesor === idAsesor;
        }
        return p.contacto.toLowerCase() === contactoLimpio.toLowerCase() && p.asesor === idAsesor;
    });

    let fechaHoraActual = new Date().toLocaleString();

    if (prospectoExistente) {
        prospectoExistente.intentos += 1;
        prospectoExistente.ultimaModificacion = fechaHoraActual;
        prospectoExistente.nombre = nombreCliente; 
        alert("⚠️ Este cliente ya había sido contactado antes. Se registró como un REINTENTO.");
    } else {
        baseDatosProspectos.push({
            nombre: nombreCliente,
            contacto: contactoLimpio,
            asesor: idAsesor,
            primerContacto: fechaHoraActual,
            intentos: 1,
            estado: "Prospecto Nuevo"
        });
        alert("✅ ¡Prospecto registrado con éxito como NUEVO!");
    }

    localStorage.setItem('db_prospectos_agencia', JSON.stringify(baseDatosProspectos));

    // 3. Suma el punto en el récord de envíos del asesor
    const claveMemoria = 'AUDITORIA_COMPARTIDOS_ASESORES';
    let datosAsesores = JSON.parse(localStorage.getItem(claveMemoria)) || {};
    let nombreAsesorKey = `Asesor ${idAsesor}`;
    datosAsesores[nombreAsesorKey] = datosAsesores[nombreAsesorKey] || { totalCompartidos: 0 };
    datosAsesores[nombreAsesorKey].totalCompartidos++;
    localStorage.setItem(claveMemoria, JSON.stringify(datosAsesores));

    // 4. CIERRE AUTOMÁTICO DEL CICLO: Abre WhatsApp de forma automática con la tarjeta y el texto
    const textoMensaje = `¡Compré en ZENITH CAR! ¡Excelente experiencia! Te la comparto: ` + window.location.href;

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'ZENITH CAR',
                text: '¡Compré en ZENITH CAR! ¡Excelente experiencia!',
                url: window.location.href
            });
            return;
        } catch (e) {
            // Si el usuario cancela la ventana nativa, continúa con WhatsApp directo
        }
    }

    let urlWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoMensaje)}`;
    window.open(urlWhatsApp, "_blank");
}
/* ==========================================================================
   MÓDULO DE CUESTIONARIO INTELIGENTE (POTENCIA EXTERNA + CONTROL INTERNO)
   ========================================================================== */

// Objeto global en memoria para capturar las respuestas del prospecto actual
let DATA_PROSPECTO = {
    nombre: '',
    whatsapp: '',
    correo: '',
    contacto: '',
    modelo: '',
    tipo: '',
    uso: '',
    tiempo: '',
    metodo: '',
    presupuesto: '',
    promocion: '',
    origen: '',
    fecha_registro: ''
};

let pasoActualCuestionario = 1;
const TOTAL_PASOS_CUESTIONARIO = 10;

/**
 * Abre el asistente interactivo del cuestionario
 */
function abrirCuestionario() {
    // Inicializar el objeto de datos limpio
    DATA_PROSPECTO = {
        nombre: '', whatsapp: '', correo: '', contacto: '',
        modelo: '', tipo: '', uso: '', tiempo: '',
        metodo: '', presupuesto: '', promocion: '', origen: '',
        fecha_registro: ''
    };
    
    pasoActualCuestionario = 1;
    // --- AQUÍ INSERTAMOS LA LLAMADA AUTOMÁTICA ---
    capturarOrigenAutomatico();
    
    // Limpiar inputs visuales anteriores
    document.getElementById('q-nombre').value = '';
    document.getElementById('q-whatsapp').value = '';
    document.getElementById('q-correo').value = '';
    
    // Limpiar botones que hayan quedado activos de sesiones previas
    document.querySelectorAll('.btn-opcion-q').forEach(btn => {
        btn.classList.remove('active-q');
    });
    
    // Resetear visibilidad de pasos
    for (let i = 1; i <= TOTAL_PASOS_CUESTIONARIO; i++) {
        const pEl = document.getElementById(`paso-${i}`);
        if (pEl) pEl.style.display = (i === 1) ? 'block' : 'none';
    }
    
    // Configurar interfaz del footer inicial
    document.getElementById('btn-q-prev').style.visibility = 'hidden';
    const nextBtn = document.getElementById('btn-q-next');
    nextBtn.innerText = 'Siguiente';
    nextBtn.onclick = validarPaso1YComenzar;
    
    // Actualizar barra de progreso al 10% inicial
    document.getElementById('cuestionario-progress').style.width = '10%';
    
    // Mostrar el modal en pantalla
    document.getElementById('cuestionario-modal').style.display = 'flex';
    if (typeof playClick === 'function') playClick();
}

/**
 * Valida los datos obligatorios del Paso 1 antes de permitir avanzar
 * Versión robusta y blindada para asegurar la captura del prospecto
 */
function validarPaso1YComenzar() {
    const nom = document.getElementById('q-nombre').value.trim();
    const tel = document.getElementById('q-whatsapp').value.trim();
    const corr = document.getElementById('q-correo').value.trim();
    
    if (!nom || !tel) {
        alert("Por favor, introduce tu Nombre completo y WhatsApp para poder asignarte un especialista.");
        return;
    }
    
    // Guardar los datos de forma explícita en la variable global DATA_PROSPECTO
    DATA_PROSPECTO.nombre = nom;
    DATA_PROSPECTO.whatsapp = tel;
    DATA_PROSPECTO.correo = corr ? corr : 'No proporcionado';
    
    // Si no seleccionó preferencia de contacto explícita, por defecto dejamos WhatsApp
    if (!DATA_PROSPECTO.contacto) {
        DATA_PROSPECTO.contacto = 'WhatsApp';
    }

    // --- BLINDAJE EXTRA ---
    // Nos aseguramos de que el nombre y teléfono queden registrados en el objeto 
    // incluso si el usuario regresa al paso 1 después
    localStorage.setItem('TMP_PROSPECTO_DATA', JSON.stringify({ nombre: nom, whatsapp: tel }));
    
    // Cambiar el evento del botón Siguiente para los pasos automáticos posteriores
    const nextBtn = document.getElementById('btn-q-next');
    nextBtn.onclick = () => cambiarPasoCuestionario(1);
    
    // Avanzar al paso 2
    cambiarPasoCuestionario(1);
}

/**
 * Maneja el guardado de datos al hacer clic en las opciones (Pasos 2 al 9)
 */
function guardarDatoPaso(pasoNum, campoKey, valorSeleccionado) {
    if (typeof playClick === 'function') playClick();
    
    // Asegurarnos de guardar siempre el valor real en español sin importar el idioma visual
    if (typeof DATA_PROSPECTO !== 'undefined') {
        DATA_PROSPECTO[campoKey] = valorSeleccionado;
    }
    
    // Marcar visualmente el botón seleccionado de forma infalible usando el atributo data-val
    const contenedorPaso = document.getElementById(`paso-${pasoNum}`);
    if (contenedorPaso) {
        contenedorPaso.querySelectorAll('.btn-opcion-q').forEach(btn => {
            const valAttr = btn.getAttribute('data-val');
            if (valAttr && valAttr.toLowerCase() === valorSeleccionado.toLowerCase()) {
                btn.classList.add('active-q');
            } else {
                btn.classList.remove('active-q');
            }
        });
    }

    // Avanzar automáticamente o mostrar asesores si es el último paso
    if (typeof pasoActualCuestionario !== 'undefined' && typeof TOTAL_PASOS_CUESTIONARIO !== 'undefined') {
        if (pasoActualCuestionario < TOTAL_PASOS_CUESTIONARIO) {
            if (typeof cambiarPasoCuestionario === 'function') {
                cambiarPasoCuestionario(1);
            }
        } else {
            if (typeof finalizarCuestionarioYMostrarAsesores === 'function') {
                finalizarCuestionarioYMostrarAsesores();
            }
        }
    }
}


/**
 * Controla la navegación general (Adelante / Atrás) y actualiza la barra de progreso
 */
function cambiarPasoCuestionario(direccion) {
    if (typeof playClick === 'function') playClick();
    
    // Ocultar paso actual
    const pasoActualEl = document.getElementById(`paso-${pasoActualCuestionario}`);
    if (pasoActualEl) pasoActualEl.style.display = 'none';
    
    // Calcular nuevo paso
    pasoActualCuestionario += direccion;
    
    // Validar límites: asegurar que no sea menor a 1 ni mayor a 10
    if (pasoActualCuestionario < 1) pasoActualCuestionario = 1;
    if (pasoActualCuestionario > 10) pasoActualCuestionario = 10;
    
    // Mostrar nuevo paso
    const nuevoPasoEl = document.getElementById(`paso-${pasoActualCuestionario}`);
    if (nuevoPasoEl) nuevoPasoEl.style.display = 'block';
    
    // ASIGNACIÓN AUTOMÁTICA
    if (pasoActualCuestionario === 10) {
        let turno = parseInt(localStorage.getItem('turnoAsesor') || '1');
        let nombreAsesor = `ASESOR ${turno}`;
        
        // 1. Cambiamos el texto
        document.getElementById('texto-asesor-sugerido').innerText = nombreAsesor;
        
        // 2. CAMBIO CLAVE: Cambiamos también el valor del selector para que sepa qué asesor es
        document.getElementById('asesor-selector').value = nombreAsesor;
        
        localStorage.setItem('turnoAsesor', (turno >= 6 ? 1 : turno + 1));
    }
    
    // Controlar visibilidad del botón "Anterior"
    document.getElementById('btn-q-prev').style.visibility = (pasoActualCuestionario === 1) ? 'hidden' : 'visible';
    
    // Modificar texto del botón en el paso final
    const nextBtn = document.getElementById('btn-q-next');
    if (pasoActualCuestionario === 10) {
        nextBtn.innerText = 'Finalizar';
        nextBtn.onclick = finalizarCuestionarioYMostrarAsesores;
    } else {
        nextBtn.innerText = 'Siguiente';
        if (pasoActualCuestionario === 1) {
            nextBtn.onclick = validarPaso1YComenzar;
        } else {
            nextBtn.onclick = () => cambiarPasoCuestionario(1);
        }
    }
    
    // Actualizar barra de progreso
    const porcentaje = Math.round((pasoActualCuestionario / 10) * 100);
    document.getElementById('cuestionario-progress').style.width = `${porcentaje}%`;
}

/**
 * Cierre maestro: Actualiza los datos, guarda en LocalStorage y abre los asesores
 */
function finalizarCuestionarioYMostrarAsesores() {
    if (typeof playClick === 'function') playClick();
    
    DATA_PROSPECTO.fecha_registro = new Date().toLocaleString();
    
    // Aseguramos capturar todos los valores
    DATA_PROSPECTO.nombre = document.getElementById('q-nombre')?.value || DATA_PROSPECTO.nombre || "Sin nombre";
    DATA_PROSPECTO.whatsapp = document.getElementById('q-whatsapp')?.value || DATA_PROSPECTO.whatsapp || "No reg.";
    DATA_PROSPECTO.modelo = document.getElementById('modelo')?.value || DATA_PROSPECTO.modelo;
    DATA_PROSPECTO.uso = document.getElementById('uso')?.value || DATA_PROSPECTO.uso;
    
    // --- LÓGICA DE SEMÁFORO MEJORADA ---
    let t = (DATA_PROSPECTO.tiempo || "").toString().toLowerCase();
    
    if (t.includes("semana") || t.includes("mes")) {
        DATA_PROSPECTO.semaforo = "Verde";
    } else if (t.includes("3 meses") || t.includes("6 meses")) {
        DATA_PROSPECTO.semaforo = "Amarillo";
    } else {
        DATA_PROSPECTO.semaforo = "Rojo";
    }

    let asesorSelect = document.getElementById('asesor-selector');
    DATA_PROSPECTO.asesor = (asesorSelect && asesorSelect.value) ? asesorSelect.value : (DATA_PROSPECTO.asesor || "1");
    
    // --- GUARDADO CORREGIDO PARA EL GERENTE ---
    try {
        let registrosExistentes = JSON.parse(localStorage.getItem('db_prospectos_agencia')) || [];
        
        let prospectoParaGerente = {
            nombre: DATA_PROSPECTO.nombre,
            contacto: DATA_PROSPECTO.whatsapp,
            asesor: DATA_PROSPECTO.asesor.toString().replace(/\D/g, ''),
            primerContacto: DATA_PROSPECTO.fecha_registro,
            intentos: 1,
            estado: DATA_PROSPECTO.semaforo,
            tiempo: DATA_PROSPECTO.tiempo || "No especificado",
            origen: DATA_PROSPECTO.origen || "Directo / Desconocido"
        };

        registrosExistentes.push(prospectoParaGerente);
        localStorage.setItem('db_prospectos_agencia', JSON.stringify(registrosExistentes));
    } catch (e) {
        console.error("Error al guardar en el panel gerencial:", e);
    }
    
    let modalCuestionario = document.getElementById('cuestionario-modal');
    if(modalCuestionario) modalCuestionario.style.display = 'none';
    
    alert("¡Muchas gracias! Tus datos han sido procesados. Ahora puedes seleccionar a tu asesor.");
    
    if (typeof abrirMenu === 'function') {
        abrirMenu();
    }
}

// --- FUNCIONES COMPLETAS PARA ABRIR Y GESTIONAR LAS RESEÑAS ---

function abrirMenuReseñas() {
    if (typeof playClick === 'function') playClick();
    const menu = document.getElementById('miMenuReseñas');
    if(menu) {
        menu.style.display = 'flex';
        inicializarAcordeonReseñas();
    } else {
        console.error("No se encontró el elemento 'miMenuReseñas' en el HTML.");
    }
}

function cerrarMenuReseñas() {
    if (typeof playClick === 'function') playClick();
    const menu = document.getElementById('miMenuReseñas');
    if(menu) {
        menu.style.display = 'none';
    }
}

function inicializarAcordeonReseñas() {
    const contenedor = document.getElementById('contenedor-reseñas-asesores');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    // Verifica que CONFIG y sucursales existan
    if (typeof CONFIG === 'undefined' || !CONFIG.sucursales) return;

    Object.keys(CONFIG.sucursales).forEach((key, index) => {
        const numAsesor = index + 1;
        const imgAsesor = `assets/brand/ASESOR${numAsesor}.jpg`;
        
        const btn = document.createElement('button');
        btn.className = 'sucursal-accordion-btn';
        
        const wrapImg = document.createElement('div');
        wrapImg.className = 'wrapper-miniatura-asesor';
        wrapImg.innerHTML = `<img src="${imgAsesor}" alt="Asesor ${numAsesor}" class="img-miniatura-asesor" onerror="this.src='assets/brand/logo-mini.png'">`;
        wrapImg.onclick = (e) => {
            e.stopPropagation();
            if (typeof playClick === 'function') playClick();
            if (typeof openLightbox === 'function') openLightbox(imgAsesor, [imgAsesor], true);
        };
        
        const txtLabel = document.createElement('div');
        txtLabel.className = 'texto-accordion-asesor';
        txtLabel.innerText = `${numAsesor}. ASESOR ${numAsesor}`;
        
        const arrowIcon = document.createElement('i');
        arrowIcon.className = 'fas fa-chevron-down icono-accordion-flecha';
        
        btn.appendChild(wrapImg);
        btn.appendChild(txtLabel);
        btn.appendChild(arrowIcon);
        
        btn.onclick = () => toggleReseñaAcordeon(key);
        
        const panel = document.createElement('div');
        panel.id = `resena-${key}-panel`;
        panel.className = 'sucursal-panel-content';
        panel.style.display = 'none'; // Oculto por defecto
        
        panel.innerHTML = `
            <div class="sucursal-info-block" style="text-align: center;">
                <p class="suc-domicilio" style="font-weight: 700; color: #fff; font-size: 0.8rem;"><i class="fas fa-shield-alt" style="color: var(--brand-accent); margin-right: 4px;"></i> Evaluación Confidencial</p>
                <p class="suc-horario" style="font-size: 0.7rem; margin-top: 4px; color: rgba(255,255,255,0.8);">Tu asesor no verá esta calificación; va directa al panel gerencial.</p>
                
                <div style="margin: 10px 0; font-size: 1.3rem; letter-spacing: 4px;" id="estrellas-selector-${key}">
                    <span onclick="marcarEstrellas('${key}', 1)" style="cursor:pointer; opacity:1;">⭐</span>
                    <span onclick="marcarEstrellas('${key}', 2)" style="cursor:pointer; opacity:1;">⭐</span>
                    <span onclick="marcarEstrellas('${key}', 3)" style="cursor:pointer; opacity:1;">⭐</span>
                    <span onclick="marcarEstrellas('${key}', 4)" style="cursor:pointer; opacity:1;">⭐</span>
                    <span onclick="marcarEstrellas('${key}', 5)" style="cursor:pointer; opacity:1;">⭐</span>
                </div>
                <input type="hidden" id="val-estrellas-${key}" value="5">
                <textarea id="val-comentario-${key}" placeholder="Escribe tus comentarios aquí..." style="width: 100%; height: 60px; margin-top: 8px; padding: 6px; border-radius: 6px; border: none; font-size: 0.8rem; background: rgba(255,255,255,0.9); color: #000;"></textarea>
                
                <div class="marca-elegante-asesor" style="margin-top: 6px;">ZENITH CAR</div>
            </div>
            <button type="button" onclick="guardarReseñaEnPanel('${numAsesor}', '${key}')" class="btn-menu" style="background:#f80101; color:#fff; border:none; display:flex; align-items:center; justify-content:center; gap:8px; padding:12px; border-radius:8px; font-weight:bold; margin-top:8px; cursor:pointer;"><i class="fas fa-check-circle"></i> Guardar y Enviar al Panel</button>
        `;
        
        contenedor.appendChild(btn);
        contenedor.appendChild(panel);
    });
}

function toggleReseñaAcordeon(key) {
    const panel = document.getElementById(`resena-${key}-panel`);
    if (panel) {
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            // Cierra los demás paneles si quieres que solo uno esté abierto a la vez
            document.querySelectorAll('.sucursal-panel-content').forEach(p => p.style.display = 'none');
            panel.style.display = 'block';
        }
    }
}

function marcarEstrellas(key, valor) {
    let inputEstrellas = document.getElementById(`val-estrellas-${key}`);
    if(inputEstrellas) {
        inputEstrellas.value = valor;
    }
}

function guardarReseñaEnPanel(numAsesor, key) {
    if (typeof playClick === 'function') playClick();
    
    let calificacionInput = document.getElementById(`val-estrellas-${key}`);
    let comentarioInput = document.getElementById(`val-comentario-${key}`);
    
    let calificacion = calificacionInput ? calificacionInput.value : "5";
    let comentario = comentarioInput ? comentarioInput.value : "Sin comentario";
    let nombreAsesor = `Asesor ${numAsesor}`;

    try {
        let historial = JSON.parse(localStorage.getItem('historial_reseñas_cards')) || [];
        historial.push({
            fecha: new Date().toLocaleString(),
            asesor: nombreAsesor,
            calificacion: calificacion,
            comentario: comentario
        });
        localStorage.setItem('historial_reseñas_cards', JSON.stringify(historial));
        alert("¡Evaluación enviada con éxito al panel del gerente!");
        cerrarMenuReseñas();
    } catch (e) {
        console.error("Error al guardar la reseña:", e);
    }
}

// (Conserva tus funciones originales de abrirMenuReseñas, cerrarMenuReseñas e inicializarAcordeonReseñas intactas)

function toggleReseñaAcordeon(key) {
    playClick();
    const panel = document.getElementById(`resena-${key}-panel`);
    if(!panel) return;
    const estaVisible = panel.style.display === 'flex';
    
    document.querySelectorAll('#contenedor-reseñas-asesores .sucursal-panel-content').forEach(p => p.style.display = 'none');
    
    if (!estaVisible) {
        panel.style.display = 'flex';
    }
}

function marcarEstrellas(key, cantidad) {
    document.getElementById(`val-estrellas-${key}`).value = cantidad;
    const contenedorEstrellas = document.getElementById(`estrellas-selector-${key}`);
    const estrellas = contenedorEstrellas.querySelectorAll('span');
    estrellas.forEach((est, idx) => {
        if (idx < cantidad) {
            est.style.opacity = '1';
            est.style.filter = 'none';
        } else {
            est.style.opacity = '0.3';
            est.style.filter = 'grayscale(100%)';
        }
    });
}

function guardarReseñaEnPanel(numAsesor, key) {
    playClick();
    const estrellas = document.getElementById(`val-estrellas-${key}`).value;
    const comentario = document.getElementById(`val-comentario-${key}`).value.trim();
    
    let historial = JSON.parse(localStorage.getItem('historial_reseñas_cards')) || [];
    
    historial.push({
        fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        asesor: `ASESOR ${numAsesor}`,
        calificacion: estrellas,
        comentario: comentario || 'Sin comentarios'
    });
    
    localStorage.setItem('historial_reseñas_cards', JSON.stringify(historial));
    
    alert('¡Calificación guardada con éxito para el panel gerencial!');
    cerrarMenuReseñas();
}

// ==========================================
// CONVERSOR AUTOMÁTICO A USD (PASO 7)
// ==========================================
const CONFIG_MONEDA = {
    tasaCambioUSD: 18.5 // <--- CAMBIA ESTE NÚMERO SEGÚN EL PAÍS (Ej. México 18.5, Colombia 4000, etc.)
};

function calcularPresupuestoUSD() {
    const botones = document.querySelectorAll('#paso-7 .btn-opcion-q');
    
    botones.forEach(btn => {
        const tipo = btn.getAttribute('data-tipo');
        if (!tipo) return; // Salta el botón de "Prefiero no decirlo"
        
        let textoOriginal = btn.innerHTML.split('<span')[0].trim();

        if (tipo === 'menor') {
            const val = parseFloat(btn.getAttribute('data-valor'));
            const usd = Math.round(val / CONFIG_MONEDA.tasaCambioUSD);
            btn.innerHTML = `${textoOriginal} <span style="color: #D4AF37; font-size: 0.9em;">(aprox. $${usd.toLocaleString()} USD)</span>`;
        } 
        else if (tipo === 'rango') {
            const min = parseFloat(btn.getAttribute('data-valor-min'));
            const max = parseFloat(btn.getAttribute('data-valor-max'));
            const usdMin = Math.round(min / CONFIG_MONEDA.tasaCambioUSD);
            const usdMax = Math.round(max / CONFIG_MONEDA.tasaCambioUSD);
            btn.innerHTML = `${textoOriginal} <span style="color: #D4AF37; font-size: 0.9em;">(aprox. $${usdMin.toLocaleString()} - $${usdMax.toLocaleString()} USD)</span>`;
        }
        else if (tipo === 'mayor') {
            const val = parseFloat(btn.getAttribute('data-valor'));
            const usd = Math.round(val / CONFIG_MONEDA.tasaCambioUSD);
            btn.innerHTML = `${textoOriginal} <span style="color: #D4AF37; font-size: 0.9em;">(aprox. +$${usd.toLocaleString()} USD)</span>`;
        }
    });
}

// Se ejecuta solo en automático al cargar la página
window.addEventListener('load', () => {
    calcularPresupuestoUSD();
});

// ==========================================
// CONTROL DEL CATÁLOGO Y ASESORES SIPVEC (MULTILINGÜE)
// ==========================================

function abrirCatalogoMaestro() {
    const modal = document.getElementById('modal-catalogo-maestro');
    if (modal) {
        modal.style.display = 'flex';
        const visor = document.getElementById('visor-dinamico-catalogo');
        if (visor) visor.innerHTML = '';
    }
}

function cerrarCatalogoMaestro() {
    const modal = document.getElementById('modal-catalogo-maestro');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Bucle rotativo equitativo de asesores
function obtenerAsesorRotativoCatalogo() {
    const asesores = [
        { nombre: "Lic. Carlos Mendoza", tel: "5214491472336", id: "1" },
        { nombre: "Ing. Sofía Valdés", tel: "5214491472336", id: "2" },
        { nombre: "Lic. Alejandro Garza", tel: "5214491472336", id: "3" }
    ];
    
    let indiceActual = parseInt(sessionStorage.getItem('sipv_asesor_idx') || '0');
    const asesorAsignado = asesores[indiceActual];
    
    indiceActual = (indiceActual + 1) % asesores.length;
    sessionStorage.setItem('sipv_asesor_idx', indiceActual.toString());

    return asesorAsignado;
}

// Registro automático en el panel de gerencia y apertura de WhatsApp (Semáforo Verde y Asesor Visible)
function procesarInteresCatalogo(tipo, nombreItem) {
    const asesorEnTurno = obtenerAsesorRotativoCatalogo();
    const fechaHora = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

    try {
        let registrosExistentes = JSON.parse(localStorage.getItem('db_prospectos_agencia')) || [];
        
        let prospectoParaGerente = {
            nombre: `Prospecto Web (${tipo})`,
            contacto: "Vía WhatsApp Directo",
            asesor: asesorEnTurno.nombre,
            primerContacto: fechaHora,
            intentos: 1,
            estado: "Verde",
            tiempo: `Solicitó: ${nombreItem}`
        };

        registrosExistentes.push(prospectoParaGerente);
        localStorage.setItem('db_prospectos_agencia', JSON.stringify(registrosExistentes));
    } catch (e) {
        console.error("Error al registrar lead en gerencia:", e);
    }

    let mensaje = tipo === 'Auto' 
        ? `Hola ${asesorEnTurno.nombre}, me interesa el modelo *${nombreItem}* visto en la CARD. ¿Me podrías brindar más información y disponibilidad?`
        : `Hola ${asesorEnTurno.nombre}, me interesa solicitar presupuesto para el servicio: *${nombreItem}*. ¿Me podrías asesorar?`;

    const urlWa = `https://wa.me/${asesorEnTurno.tel}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWa, '_blank');
}

// Renderizado de las secciones con soporte multilingüe integrado
function cargarSeccionCatalogo(seccion) {
    const visor = document.getElementById('visor-dinamico-catalogo');
    if (!visor) return;
    
    visor.innerHTML = '';
    const tasa = (typeof CONFIG_MONEDA !== 'undefined' && CONFIG_MONEDA.tasaCambioUSD) ? CONFIG_MONEDA.tasaCambioUSD : 18.5;

    // Obtención del idioma activo para los textos dinámicos
    const lang = localStorage.getItem('sipv_lang') || 'es';
    const textosDinamicos = {
        es: { interes: "Me interesa", comentanos: "Coméntanos", descServ: "Atención personalizada y especializada." },
        en: { interes: "I'm interested", comentanos: "Contact us", descServ: "Personalized and specialized attention." },
        pt: { interes: "Tenho interesse", comentanos: "Fale conosco", descServ: "Atendimento personalizado e especializado." },
        fr: { interes: "Ça m'intéresse", comentanos: "Contactez-nous", descServ: "Attention personnalisée et spécialisée." },
        ko: { interes: "관심 있습니다", comentanos: "문의하기", descServ: "맞춤형 전문 상담." },
        ja: { interes: "興味があります", comentanos: "お問い合わせ", descServ: "パーソナライズされた専門的な対応。" },
        de: { interes: "Das interessiert mich", comentanos: "Kontaktieren Sie uns", descServ: "Persönliche und fachkundige Betreuung." },
        zh: { interes: "我感兴趣", comentanos: "联系我们", descServ: "个性化专业服务。" }
    };
    const t = textosDinamicos[lang] || textosDinamicos['es'];

    const grid = document.createElement('div');
    grid.className = 'carousel-zigzag-grid';
    
    if (seccion === 'autos') {
        grid.style.cssText = "display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 10px;";
        
        const autos = [
            { id: 1, nom: "Zenith Sport GT", precio: 450000 },
            { id: 2, nom: "Familiar Cross Plus", precio: 380000 },
            { id: 3, nom: "Ejecutivo Elite", precio: 520000 },
            { id: 4, nom: "Utilitario Cargo Pro", precio: 290000 },
            { id: 5, nom: "Premium Sportback", precio: 550000 },
            { id: 6, nom: "Edición Limitada 2026", precio: 495000 }
        ];

        autos.forEach(auto => {
            const usd = Math.round(auto.precio / tasa);
            const tarjeta = document.createElement('div');
            tarjeta.style = "background: rgba(0,0,0,0.4); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 10px; text-align: center; display: flex; flex-direction: column; justify-content: space-between;";
            tarjeta.innerHTML = `
                <div>
                    <div style="overflow: hidden; border-radius: 6px; margin-bottom: 8px; background: #000;">
                        <img src="assets/Productos/${auto.id}.jpg" style="width: 100%; height: 110px; object-fit: cover; cursor: pointer; transition: transform 0.3s;" onclick="abrirZoomCatalogo(this.src)" alt="${auto.nom}" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                    <h4 style="color: #fff; margin: 0 0 4px 0; font-size: 0.85rem; font-weight: 700;">${auto.nom}</h4>
                    <p style="color: #D4AF37; font-size: 0.95rem; font-weight: 800; margin: 0 0 2px 0;">$${auto.precio.toLocaleString()} MXN</p>
                    <p style="font-size: 0.7rem; color: #aaa; margin: 0 0 8px 0;">($${usd.toLocaleString()} USD)</p>
                </div>
                <button type="button" class="btn-network-link" onclick="procesarInteresCatalogo('Auto', '${auto.nom}')" style="padding: 6px; font-size: 0.75rem; justify-content: center; width: 100%;">
                    <span>${t.interes}</span>
                </button>
            `;
            grid.appendChild(tarjeta);
        });

    } else {
        grid.style.cssText = "display: flex; flex-direction: column; gap: 12px; margin-top: 10px;";
        
        const servicios = [
            { id: 7, nom: "Mantenimiento Preventivo y Mayor" },
            { id: 8, nom: "Diagnóstico y Electrónica Avanzada" },
            { id: 9, nom: "Estética y Detallado Automotriz" }
        ];

        servicios.forEach(serv => {
            const tarjeta = document.createElement('div');
            tarjeta.style = "background: rgba(0,0,0,0.4); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; padding: 12px; display: flex; align-items: center; gap: 12px;";
            tarjeta.innerHTML = `
                <div style="width: 90px; height: 75px; flex-shrink: 0; overflow: hidden; border-radius: 6px; background: #000;">
                    <img src="assets/Productos/${serv.id}.jpg" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="abrirZoomCatalogo(this.src)" alt="${serv.nom}">
                </div>
                <div style="flex-grow: 1; text-align: left;">
                    <h4 style="color: #fff; margin: 0 0 4px 0; font-size: 0.85rem; font-weight: 700;">${serv.nom}</h4>
                    <p style="font-size: 0.7rem; color: #ccc; margin: 0 0 8px 0; line-height: 1.2;">${t.descServ}</p>
                    <button type="button" class="btn-network-link" onclick="procesarInteresCatalogo('Servicio', '${serv.nom}')" style="padding: 5px 10px; font-size: 0.75rem; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border: none;">
                        <span><i class="fab fa-whatsapp"></i> ${t.comentanos}</span>
                    </button>
                </div>
            `;
            grid.appendChild(tarjeta);
        });
    }

    visor.appendChild(grid);
    grid.scrollIntoView({ behavior: 'smooth' });
}

// Zoom Fotográfico profesional equipado con tu botón de cierre circular elegante
function abrirZoomCatalogo(src) {
    const modal = document.createElement('div');
    modal.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.96); z-index:99999; display:flex; justify-content:center; align-items:center;";
    
    const contenido = document.createElement('div');
    contenido.style = "position: relative; max-width: 92%; max-height: 92%; display: flex; justify-content: center; align-items: center;";
    
    contenido.innerHTML = `
        <button class="btn-close-circular" onclick="this.closest('#modal-zoom-temp').remove()" style="position: absolute; top: -15px; right: -15px; z-index: 100000;">×</button>
        <img src="${src}" style="max-width: 100%; max-height: 85vh; border-radius: 10px; border: 2px solid #D4AF37; box-shadow: 0 0 30px rgba(212,175,55,0.4);">
    `;
    
    modal.id = 'modal-zoom-temp';
    modal.appendChild(contenido);
    
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
}
/**
 * Detecta automáticamente las etiquetas invisibles del enlace (origen, campaña, asesor)
 */
function capturarOrigenAutomatico() {
    const parametros = new URLSearchParams(window.location.search);
    
    const origenUrl = parametros.get('origen');
    if (origenUrl && typeof DATA_PROSPECTO !== 'undefined') {
        DATA_PROSPECTO.origen = origenUrl;
    }
    
    const campanaUrl = parametros.get('campana');
    if (campanaUrl && typeof DATA_PROSPECTO !== 'undefined') {
        DATA_PROSPECTO.campana = campanaUrl;
    }
}

// --- FORZAR APERTURA VISUAL DEL FORMULARIO POR ANUNCIOS ---
window.addEventListener("load", () => {
    capturarOrigenAutomatico();

    const parametros = new URLSearchParams(window.location.search);
    
    if (parametros.has('origen') || parametros.has('campana')) {
        // Intentamos cada 200 milisegundos hasta que la página despierte por completo y abra el formulario
        let intentos = 0;
        const abrirForzado = setInterval(() => {
            intentos++;
            
            // 1. Intentamos con la función original
            if (typeof abrirCuestionario === 'function') {
                abrirCuestionario();
                clearInterval(abrirForzado);
            } 
            // 2. Si la función falla, buscamos el botón principal de la portada y le damos clic a la fuerza
            else {
                const botonPrincipal = document.querySelector('button') || document.querySelector('.btn') || document.querySelector('[onclick]');
                if (botonPrincipal) {
                    botonPrincipal.click();
                    clearInterval(abrirForzado);
                }
            }

            // Si pasan 5 segundos y no lo logra, se detiene para no saturar
            if (intentos > 25) {
                clearInterval(abrirForzado);
            }
        }, 200);
    }
});