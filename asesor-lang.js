/**
 * Motor de Traducción en Vivo - Panel de Asesores (TRAIL-MAQ)
 */

function cambiarIdiomaAsesor(lang) {
    if (typeof DICTIONARY === 'undefined' || !DICTIONARY[lang]) return;
    
    // 1. Guardar la preferencia específica para el asesor
    localStorage.setItem('sipv_lang_asesor', lang);
    
    // 2. Aplicar traducciones a todos los elementos con atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (DICTIONARY[lang][key]) {
            // Si el elemento es un input de tipo submit o button con value, traducimos el value
            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                el.value = DICTIONARY[lang][key];
            } else {
                el.innerText = DICTIONARY[lang][key];
            }
        }
    });

    // 3. Actualizar elementos con placeholder si aplica (ej. buscadores)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (DICTIONARY[lang][key]) {
            el.placeholder = DICTIONARY[lang][key];
        }
    });

    // 4. Si tu panel de asesor tiene alguna función de renderizado de datos o tablas que deban recargarse, colócala aquí:
    if (typeof inicializarDatosAsesor === 'function') {
        inicializarDatosAsesor();
    }
}

// Inicialización automática al cargar el DOM del panel de asesor
document.addEventListener("DOMContentLoaded", () => {
    const langGuardado = localStorage.getItem('sipv_lang_asesor') || 'es';
    cambiarIdiomaAsesor(langGuardado);
    
    // Opcional: Si el selector usa una función de cambio directa (como tu menú desplegable con chips)
    // Aseguramos que la función global changeLanguage también apunte o se conecte si es necesario.
});

// Función de compatibilidad global si tus botones llaman a changeLanguage('es'), etc.
function changeLanguage(lang) {
    cambiarIdiomaAsesor(lang);
}