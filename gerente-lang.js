/**
 * Motor de Traducción en Vivo - Panel Gerencial (SIPV)
 */

function cambiarIdiomaGerente(lang) {
    if (typeof DICTIONARY === 'undefined' || !DICTIONARY[lang]) return;
    
    // 1. Guardar la preferencia
    localStorage.setItem('sipv_lang_gerente', lang);
    
    // 2. Aplicar traducciones a elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (DICTIONARY[lang][key]) {
            el.innerText = DICTIONARY[lang][key];
        }
    });

    // 3. Recalcular texto dinámico (Tablas y KPIs)
    // Esto asegura que las tablas no se queden con el idioma anterior
    if (typeof cargarYProcesarAuditoria === 'function') {
        cargarYProcesarAuditoria();
        cargarRécordAsesores();
        cargarReseñasGerencia();
    }
}