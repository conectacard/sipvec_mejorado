/**
 * masventa CONTROL - Motor de Auditoría y Semáforo de Maduración
 * Cliente: Demo Agencia de Autos Genérica
 */

const CLAVE_GERENCIAL_ACCESO = "AUTO2026"; 
const ASESORES_AGENCIA = ["Asesor 1", "Asesor 2", "Asesor 3", "Asesor 4", "Asesor 5", "Asesor 6"];

// --- INICIALIZACIÓN Y SEGURIDAD DEL PANEL ---

document.addEventListener("DOMContentLoaded", () => {
    const idiomaGerenteActual = localStorage.getItem('sipv_lang_gerente') || 'es';
    const selectorSelect = document.getElementById('selector-idioma-gerente');
    if (selectorSelect) {
        selectorSelect.value = idiomaGerenteActual;
    }

    if (typeof DICTIONARY !== 'undefined' && DICTIONARY[idiomaGerenteActual]) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (DICTIONARY[idiomaGerenteActual][key]) {
                el.innerText = DICTIONARY[idiomaGerenteActual][key];
            }
        });
    }
});

function verificarAccesoGerente() {
    const inputClave = document.getElementById('pass-input').value;
    if (inputClave === CLAVE_GERENCIAL_ACCESO) {
        // Guardamos la sesión para que sobreviva al F5
        sessionStorage.setItem('gerencia_autenticada', 'true');
        
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('panel-gerente').style.display = 'block';
        cargarYProcesarAuditoria();
        cargarRécordAsesores(); 
        cargarReseñasGerencia(); 
    } else {
        alert("Clave gerencial incorrecta. Acceso denegado.");
    }
}

function cerrarSesionGerente() {
    // Borramos la sesión al salir manualmente
    sessionStorage.removeItem('gerencia_autenticada');
    
    document.getElementById('pass-input').value = '';
    document.getElementById('panel-gerente').style.display = 'none';
    document.getElementById('login-screen').style.display = 'flex';
}

// Autologin al presionar F5 o recargar si ya estaba autenticado
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('gerencia_autenticada') === 'true') {
        const loginScreen = document.getElementById('login-screen');
        const panelGerente = document.getElementById('panel-gerente');
        
        if (loginScreen) loginScreen.style.display = 'none';
        if (panelGerente) panelGerente.style.display = 'block';
        
        // Ejecutamos las funciones de carga de datos para que el panel no aparezca vacío
        if (typeof cargarYProcesarAuditoria === 'function') cargarYProcesarAuditoria();
        if (typeof cargarRécordAsesores === 'function') cargarRécordAsesores(); 
        if (typeof cargarReseñasGerencia === 'function') cargarReseñasGerencia(); 
    }
});

// --- LÓGICA DE AUDITORÍA Y KPIs CORREGIDA ---

function cargarYProcesarAuditoria() {
    const registros = JSON.parse(localStorage.getItem('db_prospectos_agencia')) || [];
    const tbody = document.getElementById('tabla-prospectos-body');
    if (!tbody) return;
    tbody.innerHTML = ''; 
    
    let total = registros.length;
    let verdes = 0; let amarillos = 0; let rojos = 0;
    
    if (total === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#555; padding: 20px;">No hay registros de prospectos todavía.</td></tr>`;
        actualizarIndicadoresKPI(0, 0, 0, 0);
        return;
    }
    
    registros.forEach((prospecto) => {
        let intentos = prospecto.intentos || 1;
        let tiempoCompra = prospecto.tiempo ? prospecto.tiempo.trim() : "";
        let claseBadge = ""; 
        let textoEstado = "";

        const lang = localStorage.getItem('sipv_lang_gerente') || 'es';
        const textoVeces = DICTIONARY[lang]?.gerente_texto_veces || "veces";

        let claveStatus = "status_red";
        if (tiempoCompra === "Esta semana" || tiempoCompra === "Este mes" || tiempoCompra.startsWith("Solicitó:")) {
            claseBadge = "badge-verde";
            claveStatus = "status_green";
            verdes++;
        } else if (tiempoCompra === "Dentro de 3 meses" || tiempoCompra === "Dentro de 6 meses") {
            claseBadge = "badge-amarillo";
            claveStatus = "status_yellow";
            amarillos++;
        } else {
            claseBadge = "badge-rojo";
            claveStatus = "status_red";
            rojos++;
        }

        const textoEstadoTraducido = DICTIONARY[lang]?.[claveStatus] || "Adelante con la venta";

        prospecto.estado = (tiempoCompra === "Esta semana" || tiempoCompra === "Este mes") ? "Verde" : 
                           (tiempoCompra === "Dentro de 3 meses" || tiempoCompra === "Dentro de 6 meses") ? "Amarillo" : "Rojo";
        
        let fecha = prospecto.primerContacto || "No registrada";
        let nombre = prospecto.nombre || "Sin nombre";
        let contacto = prospecto.contacto || "No reg.";
        let asesor = `Asesor ID: ${prospecto.asesor}` || "No asignado";
        
        let soloDigitos = contacto.replace(/\D/g, '');
        let htmlContacto = soloDigitos.length >= 7 ? 
            `<a href="https://wa.me/${soloDigitos}" target="_blank" style="color:#00c851; text-decoration:none;"><i class="fab fa-whatsapp"></i> ${contacto}</a>` : 
            `<span style="color:#fff;">${contacto}</span>`;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><span class="badge-semaforo ${claseBadge}">${textoEstadoTraducido}</span></td>
            <td style="font-weight:bold; color:#fff;">${nombre}</td>
            <td>${htmlContacto}</td>
            <td style="color:#00f0ff; font-weight:bold;">${asesor}</td>
            <td>${fecha}</td>
            <td style="text-align:center; font-weight:bold; color:#ffbb33; font-size: 16px;">${intentos} ${textoVeces}</td>
        `;
        tbody.appendChild(fila);
    });
    
    actualizarIndicadoresKPI(total, verdes, amarillos, rojos);
}

function cargarRécordAsesores() {
    const tbodyAsesores = document.getElementById('tabla-asesores-body');
    if (!tbodyAsesores) return;
    
    tbodyAsesores.innerHTML = '';
    const key = 'AUDITORIA_COMPARTIDOS_ASESORES';
    let datosAsesores = JSON.parse(localStorage.getItem(key)) || {};
    
    const lang = localStorage.getItem('sipv_lang_gerente') || 'es';
    const textoEnvios = DICTIONARY[lang]?.gerente_texto_envios || "envíos";
    
    ASESORES_AGENCIA.forEach((nombreAsesor, index) => {
        let idAsesorStr = String(index + 1);
        let total = 0;
        
        if (datosAsesores[nombreAsesor] && datosAsesores[nombreAsesor].totalCompartidos) {
            total = datosAsesores[nombreAsesor].totalCompartidos;
        }
        
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td style="font-weight:bold; color:#00f0ff;">${nombreAsesor} (ID: ${idAsesorStr})</td>
            <td><span style="font-size: 16px; font-weight: bold; color: #00c851;">${total} ${textoEnvios}</span></td>
        `;
        tbodyAsesores.appendChild(fila);
    });
}

function cargarReseñasGerencia() {
    const tbodyReseñas = document.getElementById('tabla-reseñas-gerencia-body');
    if (!tbodyReseñas) return;
    
    tbodyReseñas.innerHTML = '';
    const historial = JSON.parse(localStorage.getItem('historial_reseñas_cards')) || [];
    
    if (historial.length === 0) {
        tbodyReseñas.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#555; padding: 20px;">No hay evaluaciones de asesores registradas todavía.</td></tr>`;
        return;
    }
    
    historial.forEach((item) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.fecha}</td>
            <td style="font-weight:bold; color:#00f0ff;">${item.asesor}</td>
            <td style="color: #ffbb33; font-size: 16px;">${'⭐'.repeat(Number(item.calificacion))} (${item.calificacion}/5)</td>
            <td style="color: #ddd;">${item.comentario}</td>
        `;
        tbodyReseñas.appendChild(fila);
    });
}

function actualizarIndicadoresKPI(t, v, a, r) {
    document.getElementById('kpi-total').innerText = t;
    document.getElementById('kpi-verde').innerText = v;
    document.getElementById('kpi-amarillo').innerText = a;
    document.getElementById('kpi-rojo').innerText = r;
}

function exportarAExcel() {
    const lang = localStorage.getItem('sipv_lang_gerente') || 'es';
    const registros = JSON.parse(localStorage.getItem('db_prospectos_agencia')) || [];
    
    if (registros.length === 0) { 
        const mensajeVacio = DICTIONARY[lang]?.alerta_excel_vacio || "No hay datos para exportar.";
        alert(mensajeVacio); 
        return; 
    }
    
    const hCliente = DICTIONARY[lang]?.gerente_th_cliente || "Cliente";
    const hContacto = DICTIONARY[lang]?.gerente_th_contacto || "Contacto";
    const hAsesor = DICTIONARY[lang]?.gerente_th_asesor || "Asesor";
    const hFecha = DICTIONARY[lang]?.gerente_th_fecha || "Primer Contacto";
    const hIntentos = DICTIONARY[lang]?.gerente_th_intentos || "Intentos";
    const hEstado = DICTIONARY[lang]?.gerente_th_estado || "Estado";

    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; 
    csvContent += `"${hCliente}","${hContacto}","${hAsesor}","${hFecha}","${hIntentos}","${hEstado}"\n`;
    
    registros.forEach((p) => {
        csvContent += `"${p.nombre || ''}","${p.contacto || ''}","${p.asesor || ''}","${p.primerContacto || ''}","${p.intentos || 1}","${p.estado || ''}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Reporte_Seguimiento_Prospectos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function limpiarPanelGerencial() {
    const lang = localStorage.getItem('sipv_lang_gerente') || 'es';
    const mensaje = DICTIONARY[lang].alerta_vaciar_panel || "¿Estás seguro de vaciar el panel de auditoría por completo?";
    const mensajeExito = DICTIONARY[lang].alerta_panel_vaciado || "Panel vaciado correctamente.";
    
    if (confirm(mensaje)) {
        localStorage.removeItem('db_prospectos_agencia');
        localStorage.removeItem('AUDITORIA_COMPARTIDOS_ASESORES');
        localStorage.removeItem('historial_reseñas_cards');
        alert(mensajeExito);
        location.reload();
    }
}
