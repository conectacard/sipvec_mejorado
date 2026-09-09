/**
 * Core de Interacción y Seguimiento - Asesor SIPVEC Elite (ZENITH CAR)
 * Versión Directa con Guía Visual y Soporte i18n Integrado en Alertas y Mensajes.
 */

document.addEventListener("DOMContentLoaded", () => {
    inicializarIdioma();
    inicializarAsesorDirecto();
});

/**
 * Sistema i18n: Inicializa y traduce la interfaz al cargar
 */
function inicializarIdioma() {
    const idiomaGuardado = localStorage.getItem('sipv_lang') || 'es';
    aplicarTraducciones(idiomaGuardado);
}

/**
 * Cambia el idioma en tiempo real y lo guarda en localStorage
 */
function cambiarIdioma(lang) {
    if (window.translations && translations[lang]) {
        localStorage.setItem('sipv_lang', lang);
        aplicarTraducciones(lang);
    }
}

/**
 * Obtiene el texto traducido según el idioma actual (para alertas y mensajes dinámicos)
 */
function obtenerTextoIdioma(key, replacements = {}) {
    // Usar la misma llave de almacenamiento que usa tu asesor-lang.js
    const lang = localStorage.getItem('sipv_lang_asesor') || localStorage.getItem('sipv_lang') || 'es';
    
    let text = key;
    
    // Buscar directamente en el DICTIONARY que maneja tu asesor-lang.js
    if (typeof DICTIONARY !== 'undefined') {
        if (DICTIONARY[lang] && DICTIONARY[lang][key]) {
            text = DICTIONARY[lang][key];
        } else if (DICTIONARY['es'] && DICTIONARY['es'][key]) {
            // Respaldo en español si no existe en el idioma elegido
            text = DICTIONARY['es'][key];
        }
    }
    
    // Reemplazar variables dinámicas si las hay (ej: {etiqueta}, {asesorId})
    Object.keys(replacements).forEach(placeholder => {
        text = text.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
    });
    
    return text;
}

/**
 * Recorre el DOM buscando elementos con data-i18n y actualiza su texto o placeholders
 */
function aplicarTraducciones(lang) {
    if (!window.translations) return;
    const dict = translations[lang];
    if (!dict) return;

    // Traducir título de la página
    if (dict.page_title) {
        document.title = dict.page_title;
    }

    // Traducir elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elemento => {
        const key = elemento.getAttribute('data-i18n');
        if (dict[key]) {
            if (elemento.tagName === 'INPUT' || elemento.tagName === 'TEXTAREA') {
                elemento.placeholder = dict[key];
            } else {
                elemento.innerHTML = dict[key];
            }
        }
    });

    // Actualizar selectores visuales de idioma si existen en tu HTML
    const lblIdioma = document.getElementById('lbl-idioma-activo');
    if (lblIdioma && dict.lbl_idioma) {
        lblIdioma.textContent = dict.lbl_idioma;
    }
}

/**
 * Lee el asesor de la URL y valida si es necesario mostrar una alerta visual
 */
function inicializarAsesorDirecto() {
    const urlParams = new URLSearchParams(window.location.search);
    let asesorId = urlParams.get('asesor') || 'general';
    asesorId = asesorId.toLowerCase().trim();

    // Actualizar visualmente la insignia del header
    const badgeAsesor = document.getElementById('badge-nombre-asesor');
    if (badgeAsesor) {
        badgeAsesor.textContent = asesorId.toUpperCase();
        if(asesorId === 'general') {
            badgeAsesor.style.color = '#ff9800'; // Naranja de alerta si está genérico
        }
    }

    // Actualizar enlace principal de la tarjeta matriz
    const tarjetaMatrizBtn = document.querySelector('.hero-card .sipv-btn');
    if (tarjetaMatrizBtn) {
        tarjetaMatrizBtn.href = `https://demo-autos.pideya.contact/?asesor=${asesorId}&fuente=matriz_directa`;
    }
}

/**
 * Control del Panel de Juegos
 */
function togglePanelJuegos() {
    const panelJuegos = document.getElementById('panel-juegos-desplegable');
    const panelSaludos = document.getElementById('panel-saludos-desplegable');
    const panelGuiones = document.getElementById('panel-guiones-desplegable');
    
    if (panelSaludos) panelSaludos.style.display = 'none';
    if (panelGuiones) panelGuiones.style.display = 'none';

    if (panelJuegos) {
        panelJuegos.style.display = (panelJuegos.style.display === 'none' || panelJuegos.style.display === '') ? 'block' : 'none';
        if (panelJuegos.style.display === 'block') panelJuegos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Control del Panel de Saludos y Multimedia
 */
function togglePanelSaludos() {
    const panelSaludos = document.getElementById('panel-saludos-desplegable');
    const panelJuegos = document.getElementById('panel-juegos-desplegable');
    const panelGuiones = document.getElementById('panel-guiones-desplegable');
    
    if (panelJuegos) panelJuegos.style.display = 'none';
    if (panelGuiones) panelGuiones.style.display = 'none';

    if (panelSaludos) {
        panelSaludos.style.display = (panelSaludos.style.display === 'none' || panelSaludos.style.display === '') ? 'block' : 'none';
        if (panelSaludos.style.display === 'block') panelSaludos.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Control del Panel de Guiones Ejecutivos
 */
function togglePanelGuiones() {
    const panelGuiones = document.getElementById('panel-guiones-desplegable');
    const panelSaludos = document.getElementById('panel-saludos-desplegable');
    const panelJuegos = document.getElementById('panel-juegos-desplegable');
    
    if (panelSaludos) panelSaludos.style.display = 'none';
    if (panelJuegos) panelJuegos.style.display = 'none';

    if (panelGuiones) {
        panelGuiones.style.display = (panelGuiones.style.display === 'none' || panelGuiones.style.display === '') ? 'block' : 'none';
        if (panelGuiones.style.display === 'block') panelGuiones.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Obtener el asesor actual desde la URL
 */
function obtenerAsesorActual() {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.get('asesor') || 'general').toLowerCase().trim();
}

/**
 * Probar Minijuegos
 */
function probarJuego(juego) {
    const urlsJuegos = {
        'solitario': 'https://autos-solitario.pideya.contact/',
        'memorama': 'https://auto-memorama.pideya.contact/',
        'calendario': 'https://auto-calendario.pideya.contact/',
        'gato': 'https://auto-gato.pideya.contact/'
    };
    if (urlsJuegos[juego]) window.open(urlsJuegos[juego], '_blank');
}

/**
 * Compartir Minijuegos
 */
function compartirJuego(juego) {
    const asesorId = obtenerAsesorActual();
    
    if (asesorId === 'general') {
        alert(obtenerTextoIdioma('alerta_generico_juego'));
    }

    const dominiosJuegos = {
        'solitario': 'https://autos-solitario.pideya.contact/',
        'memorama': 'https://auto-memorama.pideya.contact/',
        'calendario': 'https://auto-calendario.pideya.contact/',
        'gato': 'https://auto-gato.pideya.contact/'
    };
    const baseUrl = dominiosJuegos[juego];
    if (!baseUrl) return;

    const urlFinal = `${baseUrl}?asesor=${asesorId}`;
    const nombres = {
        'solitario': 'Solitario VIP',
        'memorama': 'Memorama Automotriz',
        'calendario': 'Calendario de Ofertas',
        'gato': 'Tres en Raya (Gato)'
    };

    const mensaje = `¡Hola! Te comparto este divertido minijuego de ${nombres[juego]} en ZENITH CAR. Juega aquí: ${urlFinal}`;
    copiarYNotificar(mensaje, asesorId, nombres[juego]);
}

/**
 * Probar Videos
 */
function probarMultimedia(tipo) {
    const recursos = {
        'video-short': 'https://www.youtube.com/shorts/6Nvnk9q6ecw',
        'panaderos': 'https://www.youtube.com/shorts/gbWSFe0uzWA',  
        'dentistas': 'https://www.youtube.com/shorts/JN4T8NUR7lI',    
        'psicologos': 'https://www.youtube.com/shorts/kQXqXTFrDDY'   
    };
    if (recursos[tipo]) window.open(recursos[tipo], '_blank');
}

/**
 * Compartir Multimedia
 */
function compartirMultimedia(tipo) {
    const asesorId = obtenerAsesorActual();
    
    if (asesorId === 'general') {
        alert(obtenerTextoIdioma('alerta_generico_multimedia'));
    }

    const baseLanding = 'https://demo-autos.pideya.contact/';
    let mensaje = "";
    let etiqueta = "";

    switch(tipo) {
        case 'video-short':
            etiqueta = "Video Short";
            mensaje = `¡Hola! Te comparto este video especial de ZENITH CAR: https://www.youtube.com/shorts/6Nvnk9q6ecw?asesor=${asesorId}`;
            break;
        case 'panaderos':
            etiqueta = "Panaderos";
            mensaje = `¡Hola! Conoce los planes especiales que ZENITH CAR tiene para ti: ${baseLanding}?asesor=${asesorId}&sector=panaderos`;
            break;
        case 'dentistas':
            etiqueta = "Dentistas";
            mensaje = `¡Hola! Potencia tu movilidad con los beneficios de ZENITH CAR: ${baseLanding}?asesor=${asesorId}&sector=dentistas`;
            break;
        case 'psicologos':
            etiqueta = "Psicólogos";
            mensaje = `¡Hola! Conoce los beneficios exclusivos que ZENITH CAR tiene para ti: ${baseLanding}?asesor=${asesorId}&sector=psicologos`;
            break;
    }

    copiarYNotificar(mensaje, asesorId, etiqueta);
}

/**
 * Copiar portapapeles
 */
function copiarYNotificar(texto, asesorId, etiqueta) {
    navigator.clipboard.writeText(texto).then(() => {
        const mensajeAlerta = obtenerTextoIdioma('msg_enlace_copiado', { 
            etiqueta: etiqueta, 
            asesorId: asesorId.toUpperCase() 
        });
        alert(mensajeAlerta);
    }).catch(err => {
        prompt(obtenerTextoIdioma('prompt_copiar_manual'), texto);
    });
}

/**
 * Lanzar Recursos / QR
 */
function lanzarRecurso(tipoRecurso) {
    const asesorId = obtenerAsesorActual();
    
    if (asesorId === 'general') {
        alert(obtenerTextoIdioma('alerta_generico_qr'));
    }

    if (tipoRecurso === 'qr-dinamico') {
        abrirQRModal(asesorId);
    } else {
        const urlDestino = `https://demo-autos.pideya.contact/?asesor=${asesorId}&fuente=recurso_general`;
        copiarYNotificar(`Conoce nuestra oferta comercial digital en ZENITH CAR: ${urlDestino}`, asesorId, "Recurso Comercial");
    }
}

/**
 * Generador QR Automático en Pantalla
 */
function abrirQRModal(asesorId) {
    const urlPersonal = `https://demo-autos.pideya.contact/?asesor=${asesorId}&fuente=qr_presencial`;
    
    const modal = document.getElementById('sipv-qr-modal');
    const container = document.getElementById('sipv-qrcode-render');
    const urlText = document.getElementById('sipv-qr-url-text');
    const subtitle = document.getElementById('sipv-qr-subtitle');

    if (!modal || !container) return;

    container.innerHTML = "";
    
    new QRCode(container, {
        text: urlPersonal,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    if (urlText) urlText.textContent = urlPersonal;
    if (subtitle) {
        if(asesorId === 'general') {
            subtitle.innerHTML = `⚠️ <span style="color:#ff9800;">Asesor Genérico (Modifica la URL con tu nombre)</span>`;
        } else {
            subtitle.textContent = `Asesor Vinculado: ${asesorId.toUpperCase()}`;
        }
    }

    modal.style.display = 'flex';
}

function cerrarQRModal() {
    const modal = document.getElementById('sipv-qr-modal');
    if (modal) modal.style.display = 'none';
}

function copiarEnlaceQR() {
    const urlText = document.getElementById('sipv-qr-url-text');
    if (urlText) {
        navigator.clipboard.writeText(urlText.textContent).then(() => {
            alert(obtenerTextoIdioma('msg_qr_copiado'));
        });
    }
}

/**
 * Copiar Guiones
 */
function copiarGuion(tipo) {
    const textosGuiones = {
        'rompehielos': "¡Hola! Te saludo de parte de la familia ZENITH CAR. Te comparto mi tarjeta digital oficial: ",
        'seguimiento': "¡Hola! Estuve pensando en nuestra charla anterior. ¿Pudiste revisar la información? Avísame si te agendo una cita rápida.",
        'precio': "Entiendo el punto sobre la inversión. Lo importante aquí es el respaldo y valor real que te llevas. ¿Lo revisamos con calma?"
    };

    const textoA_Copiar = textosGuiones[tipo];
    
    if (textoA_Copiar) {
        const asesorId = obtenerAsesorActual();
        const linkAsesor = `https://demo-autos.pideya.contact/?asesor=${asesorId}`;
        
        let mensajeFinal = textoA_Copiar;
        if (tipo === 'rompehielos') {
            mensajeFinal += linkAsesor;
        }

        navigator.clipboard.writeText(mensajeFinal).then(() => {
            alert(obtenerTextoIdioma('msg_guion_copiado'));
        });
    }
}