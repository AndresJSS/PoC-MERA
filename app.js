// ==============================================================================
// 1. DICCIONARIO DE DATOS METODOLÓGICOS EXTENDIDO
// ==============================================================================
const informacionCapitales = {
    humano: {
        titulo: "Capital Humano",
        interpretacion: "Evalúa la contribución del capital humano —habilidades, educación, salud y experiencia— en la adaptación y la innovación.",
        deficits: "• Falta de educación y formación técnica.<br>• Escaso acceso a información climática y de mercados.<br>• Salud precaria que limita la productividad.<br>• Débil adopción de nuevas tecnologías.",
        ejemplos: "• Productores que no saben usar prácticas de conservación de agua.<br>• Poca capacitación en diversificación de cultivos.<br>• Limitada comprensión de seguros o instrumentos financieros.",
        indicadores: "• Nivel de educación de los adultos en el hogar.<br>• Salud y capacidad para trabajar de los miembros.<br>• Acceso a formación técnica o extensión agropecuaria.<br>• Días sin suficiente alimento en el hogar (seguridad alimentaria).<br>• Estrategias de preparación individual (almacenamiento de agua, semillas, medidas preventivas).<br>• Adopción de nuevas tecnologías o prácticas agrícolas/ganaderas."
    },
    sociopolitico: {
        titulo: "Capital Sociopolítico",
        interpretacion: "Mide la importancia de la gobernanza, la articulación interinstitucional y la cohesión social en la resiliencia colectiva.",
        deficits: "• Baja organización comunitaria y gremial.<br>• Débil gobernanza e instituciones poco confiables.<br>• Escaso acceso a redes de apoyo (safety nets).<br>• Limitada participación en decisiones colectivas.",
        ejemplos: "• Falta de articulación entre asociaciones campesinas y entes municipales.<br>• Escasa representación de mujeres y jóvenes en consejos agropecuarios.<br>• Productores sin redes de apoyo en caso de pérdidas.",
        indicadores: "• Participación en estructuras de decisión (consejos, asociaciones, comités).<br>• Membresía en grupos o redes comunitarias.<br>• Confianza en instituciones y percepción de transparencia.<br>• Acceso a redes de seguridad formales e informales (safety nets).<br>• Percepción de seguridad en la comunidad."
    },
    natural: {
        titulo: "Capital Natural",
        interpretacion: "Permite identificar si la resiliencia del sistema depende principalmente de los recursos naturales y servicios ecosistémicos.",
        deficits: "• Deterioro de suelos y recursos hídricos.<br>• Baja diversidad genética de semillas/razas.<br>• Débil adopción de prácticas de conservación.<br>• Pérdida de servicios ecosistémicos.",
        ejemplos: "• Sobreuso de agua en arroz y caña.<br>• Suelos degradados por monocultivos intensivos.<br>• Pérdida de variedades criollas resistentes a sequía.",
        indicadores: "• Acceso y calidad de recursos hídricos.<br>• Fertilidad del suelo.<br>• Prácticas de conservación de suelos (barreras, terrazas, coberturas).<br>• Biodiversidad (variedades de semillas, razas animales).<br>• Medidas de conservación de agua (riego por goteo, cosecha de agua).<br>• Prácticas de manejo de nutrientes (compostaje, reciclaje de materia orgánica).<br>• Uso de fertilizantes (eficiencia y riesgo de contaminación).<br>• Uso de pesticidas (natural/sintético).<br>• Prácticas de manejo integrado de plagas (IPM).<br>• Cobertura vegetal y cambios en el uso de suelo (deforestación, restauración)."
    },
    fisico: {
        titulo: "Capital Físico",
        interpretacion: "Indica la importancia del capital físico en la absorción de choques y la recuperación rápida tras eventos disruptivos.",
        deficits: "• Deficiencia de infraestructura básica (agua potable, electricidad, caminos).<br>• Limitado acceso a almacenamiento y transporte.<br>• Escasez de activos productivos y maquinaria.",
        ejemplos: "• Productores aislados por falta de vías terciarias.<br>• Postcosecha con pérdidas por ausencia de centros de acopio.<br>• Equipos de riego o secado insuficientes.",
        indicadores: "• Acceso a agua potable segura.<br>• Acceso a electricidad.<br>• Acceso a infraestructura vial y transporte.<br>• Disponibilidad de infraestructura de almacenamiento y procesamiento.<br>• Acceso a servicios básicos (educación, salud).<br>• Acceso a tecnologías de comunicación (ej. telefonía móvil, internet).<br>• Activos productivos: maquinaria, equipos agrícolas, ganado, hectáreas cultivadas."
    },
    financiero: {
        titulo: "Capital Financiero",
        interpretacion: "Permite estimar el papel del capital financiero en la capacidad de absorción y recuperación económica.",
        deficits: "• Escasa diversificación de ingresos.<br>• Poco acceso a crédito formal.<br>• Ausencia de ahorro o seguros.<br>• Alta vulnerabilidad a choques económicos.",
        ejemplos: "• Familias que dependen solo de un cultivo de mercado.<br>• Baja inclusión financiera rural.<br>• Productores sin seguro agropecuario que pierden todo tras una sequía.",
        indicadores: "• Ingreso total del hogar.<br>• Diversificación de fuentes de ingreso (cultivos, ganadería, negocios).<br>• Acceso a crédito (préstamos de mediano plazo, formales o informales).<br>• Existencia de ahorros.<br>• Remesas recibidas.<br>• Pensiones o transferencias sociales.<br>• Acceso a seguros (agropecuario, salud)."
    }
    
};

// ==============================================================================
// 2. LÓGICA DE INTERFAZ: MEDIOS DE VIDA (PASO 0)
// ==============================================================================

// Variable para recordar qué capital está abierto
let capitalActivo = null;

function toggleGuia(capital) {
    // 1. Seleccionar el panel vacío y todos los botones/paneles
    const panelVacio = document.getElementById('panelAyudaVacio');
    const todosLosBotones = document.querySelectorAll('.btn-guia-dinamico');
    const todosLosPaneles = document.querySelectorAll('.panel-guia');

    // 2. Apagar TODOS los botones y ocultar TODOS los paneles de ayuda
    todosLosBotones.forEach(btn => btn.classList.remove('activo'));
    todosLosPaneles.forEach(panel => panel.classList.remove('visible'));

    // 3. Si el usuario hizo clic en el MISMO botón que ya estaba activo, se apaga todo y vuelve al panel vacío
    if (capitalActivo === capital) {
        capitalActivo = null;
        panelVacio.classList.remove('d-none');
        return;
    }

    // 4. Activar el nuevo capital seleccionado
    capitalActivo = capital;
    const panelDestino = document.getElementById('panelAyuda_' + capital);
    const datosMetodologicos = informacionCapitales[capital];

    // Motor de inyección dinámica de textos (Sustituye los "...")
    if (panelDestino && datosMetodologicos) {
        // Captura los 4 contenedores de texto internos del acordeón por orden de aparición
        const cuerposAcordeon = panelDestino.querySelectorAll('.accordion-body');
        if (cuerposAcordeon.length >= 4) {
            cuerposAcordeon[0].innerHTML = datosMetodologicos.interpretacion;
            cuerposAcordeon[1].innerHTML = datosMetodologicos.deficits;
            cuerposAcordeon[2].innerHTML = datosMetodologicos.ejemplos;
            cuerposAcordeon[3].innerHTML = datosMetodologicos.indicadores;
        }
    }
    
    // 5. Mostrar los elementos en la interfaz con las clases de Bootstrap
    document.getElementById('btn_guia_' + capital).classList.add('activo');
    panelDestino.classList.add('visible');
    panelVacio.classList.add('d-none');
}

// Variable para controlar qué capitales han sido respondidos
const respuestasMedios = {
    humano: null,
    sociopolitico: null,
    natural: null,
    fisico: null,
    financiero: null
};

// Registrar selección y actualizar estado visual
function registrarRespuesta(capitalKey) {
    // 1. Obtener el valor de la opción seleccionada (1, 3 o 5)
    const seleccion = document.querySelector(`input[name="cap_${capitalKey}"]:checked`);

    if (seleccion) {
        const valor = parseInt(seleccion.value, 10);
        
        // Guardamos la respuesta (puedes almacenar el valor numérico directamente)
        respuestasMedios[capitalKey] = valor;

        // 2. Feedback visual de la tarjeta (fondo verde suave y badge de completado)
        const tarjeta = document.getElementById(`tarjeta_${capitalKey}`);
        const check = document.getElementById(`check_${capitalKey}`);
        
        if (tarjeta) {
            tarjeta.classList.remove('bg-light');
            tarjeta.style.backgroundColor = '#e8f5e9'; // Verde suave institucional
            tarjeta.style.borderColor = '#2e7d32';     // Borde verde fuerte
        }
        if (check) {
            check.classList.remove('d-none');
        }

        // 3. Actualizar el cuadro de Prioridad en la columna derecha
        const panelPrioridad = document.getElementById(`resultado_prioridad_${capitalKey}`);
        if (panelPrioridad) {
            // Reiniciamos las clases base
            panelPrioridad.className = "p-2 rounded-3 small fw-bold shadow-sm";

            // Asignamos el texto y color según la configuración definida
            if (valor === 1) {
                panelPrioridad.innerHTML = "Alta";
                panelPrioridad.classList.add('bg-iica-verde', 'text-white'); // Verde
            } else if (valor === 3) {
                panelPrioridad.innerHTML = "Media";
                panelPrioridad.classList.add('bg-warning', 'text-white');      // Amarillo
            } else if (valor === 5) {
                panelPrioridad.innerHTML = "Baja";
                panelPrioridad.classList.add('bg-danger', 'text-white');     // Rojo
            }
        }
    }

    // 4. Calculamos el nuevo porcentaje de progreso
    actualizarProgreso();
}

// Calcular y actualizar la barra de progreso de la sección
function actualizarProgreso() {
    const totalCapitales = Object.keys(respuestasMedios).length;  // 5
    let respondidos = 0;
    // Evaluamos si el capital ya no es null ni false
    for (const key in respuestasMedios) {
        if (respuestasMedios[key] !== null && respuestasMedios[key] !== false) {
            respondidos++;
        }
    }
    const porcentaje = Math.round((respondidos / totalCapitales) * 100);
    
    // Actualizamos la barra de progreso
    const barra = document.getElementById('barraProgresoMedios');
    if (barra) {
        barra.style.width = `${porcentaje}%`;
        barra.innerText = `${porcentaje}%`;
        // Si se completa al 100%, le damos un efecto visual extra
        if (porcentaje === 100) {
            barra.classList.remove('bg-success');
            barra.style.backgroundColor = '#1b5e20'; // Verde oscuro de éxito total
        }
    }
}

// ==============================================================================
// 3. LÓGICA DE INTERFAZ: PERTURBACIONES (PASO 1)
// ==============================================================================

// Diccionario dinámico con las 27 variables mapeadas de tu HTML
const estadoPerturbaciones = {
    sismo: { prob: false, imp: false },
    remocion: { prob: false, imp: false },
    geologico: { prob: false, imp: false },
    hundimiento: { prob: false, imp: false },
    sequia: { prob: false, imp: false },
    inundacion: { prob: false, imp: false },
    heladas: { prob: false, imp: false },
    incendio: { prob: false, imp: false },
    degradacion: { prob: false, imp: false },
    mar: { prob: false, imp: false },
    desertificacion: { prob: false, imp: false },
    glaciares: { prob: false, imp: false },
    enfermedad: { prob: false, imp: false },
    muerte: { prob: false, imp: false },
    enfermCultivos: { prob: false, imp: false },
    enfermAnimales: { prob: false, imp: false },
    contraccion: { prob: false, imp: false },
    choque: { prob: false, imp: false },
    caida: { prob: false, imp: false },
    volatilidad: { prob: false, imp: false },
    cambiosPoliticas: { prob: false, imp: false },
    bloqueos: { prob: false, imp: false },
    restricciones: { prob: false, imp: false },
    corrupcion: { prob: false, imp: false },
    crisis: { prob: false, imp: false },
    pobreza: { prob: false, imp: false },
    conflicto: { prob: false, imp: false },
    perdCobertura: { prob: false, imp: false }
};

function registrarRespuestaPerturbacion(perturbacion, tipo) {
    // 1. Actualizar diccionario interno
    if (estadoPerturbaciones[perturbacion]) {
        estadoPerturbaciones[perturbacion][tipo] = true;
    }

    // 2. Obtener los elementos seleccionados de Probabilidad e Impacto
    const probSeleccionada = document.querySelector(`input[name="prob_${perturbacion}"]:checked`);
    const impSeleccionado = document.querySelector(`input[name="imp_${perturbacion}"]:checked`);

    // 3. Cuando AMBOS están seleccionados, realizar el cálculo
    if (probSeleccionada && impSeleccionado) {
        const probVal = parseInt(probSeleccionada.value, 10);
        const impVal = parseInt(impSeleccionado.value, 10);

        // FÓRMULA IRP: (Probabilidad * Impacto) / 9
        const irp = (probVal * impVal) / 9;
        const irpFormateado = irp.toFixed(2); // Redondeo a 2 decimales para mostrar

        // Determinar Nivel de Riesgo y Clase CSS de Color
        let nivelTexto = "";
        let claseColor = "";

        // Evaluación de rangos
        if (irp <= 0.22) {
            nivelTexto = "Muy Bajo";
            claseColor = "bg-riesgo-muy-bajo";
        } else if (irp <= 0.44) {
            nivelTexto = "Bajo";
            claseColor = "bg-riesgo-bajo";
        } else if (irp <= 0.67) { 
            // 6/9 es 0.6666... (0.67 al redondear), correspondiente a Riesgo Medio
            nivelTexto = "Medio";
            claseColor = "bg-riesgo-medio";
        } else if (irp <= 0.88) {
            nivelTexto = "Alto";
            claseColor = "bg-riesgo-alto";
        } else {
            nivelTexto = "Muy Alto";
            claseColor = "bg-riesgo-muy-alto";
        }

        // Mostrar valores en el HTML
        const contenedorResultado = document.getElementById(`resultado_irp_${perturbacion}`);
        const spanValor = document.getElementById(`valor_irp_${perturbacion}`);
        const badgeNivel = document.getElementById(`badge_riesgo_${perturbacion}`);
        const tarjeta = document.getElementById(`tarjeta_${perturbacion}`);
        const check = document.getElementById(`check_${perturbacion}`);

        if (spanValor) spanValor.innerText = irpFormateado;
        if (badgeNivel) {
            badgeNivel.innerText = nivelTexto;
            // Limpiar clases anteriores e inyectar la nueva
            badgeNivel.className = `badge rounded-pill px-2 py-1 fw-bold ${claseColor}`;
        }

        if (contenedorResultado) contenedorResultado.classList.remove('d-none');
        if (tarjeta) tarjeta.classList.add('tarjeta-completada');
        if (check) check.classList.remove('d-none');
    }

    // 4. Recalcular la barra de progreso general del Paso 1
    actualizarProgresoPerturbaciones();
}

function actualizarProgresoPerturbaciones() {
    const totalRiesgos = Object.keys(estadoPerturbaciones).length; // 28 en total
    let riesgosCompletados = 0;

    // Solo suma 1 si el usuario respondió la Probabilidad (prob) Y el Impacto (imp)
    for (const key in estadoPerturbaciones) {
        if (estadoPerturbaciones[key].prob === true && estadoPerturbaciones[key].imp === true) {
            riesgosCompletados++;
        }
    }
    
    // Calcular el porcentaje
    const porcentaje = Math.round((riesgosCompletados / totalRiesgos) * 100);
    
    // Actualizar la barra visualmente
    const barra = document.getElementById('barraProgresoPerturbacion');
    if (barra) {
        barra.style.width = `${porcentaje}%`;
        barra.innerText = `${porcentaje}%`;
        // Nota: El color verde IICA ya está aplicado en el HTML (bg-iica-verde), 
        // por lo que no hace falta inyectarlo desde el JavaScript.
    }
}

// ==============================================================================
// 4. LÓGICA DE INTERFAZ: CAPACIDADES (PASO 2)
// ==============================================================================

// Diccionario para registrar qué indicadores del Paso 2 ya se respondieron
// (Deberás agregar a esta lista los IDs de todos los indicadores de tu Excel, ej: abs02, ada01, tra01...)
const estadoCapacidades = {
    // 1. Capacidad de Absorción (12 indicadores)
    abs01: false, abs02: false, abs03: false, abs04: false,
    abs05: false, abs06: false, abs07: false, abs08: false,
    abs09: false, abs10: false, abs11: false, abs12: false,

    // 2. Capacidad de Adaptación (12 indicadores)
    adap01: false, adap02: false, adap03: false, adap04: false,
    adap05: false, adap06: false, adap07: false, adap08: false,
    adap09: false, adap10: false, adap11: false, adap12: false,

    // 3. Capacidad de Transformación (12 indicadores)
    tra01: false, tra02: false, tra03: false, tra04: false,
    tra05: false, tra06: false, tra07: false, tra08: false,
    tra09: false, tra10: false, tra11: false, tra12: false
};

function registrarRespuestaCapacidad(indicador) {
    // 1. Cambiar el estado en el diccionario
    if (estadoCapacidades[indicador] !== undefined) {
        estadoCapacidades[indicador] = true;
    }

    // 2. Capturar el valor seleccionado (1 al 5)
    const seleccion = document.querySelector(`input[name="cap_${indicador}"]:checked`);

    if (seleccion) {
        const valor = parseInt(seleccion.value, 10);

        // 3. CÁLCULOS METODOLÓGICOS (Fórmulas Excel)
        // Índice de Capacidad = Valor / 5 (Redondeado a 2 decimales)
        const indice = (valor / 5).toFixed(2);

        let textoCapacidad = "";
        let claseColor = "";
        let claseTexto = "text-white"; // Texto blanco por defecto para fondos oscuros

        // Evaluar la Capacidad Observada según la escala 1-5
        if (valor === 1) {
            textoCapacidad = "Capacidad inexistente o no funcional";
            claseColor = "bg-danger";
        } else if (valor === 2) {
            textoCapacidad = "Capacidad incipiente, cobertura limitada.";
            claseColor = "bg-naranja";
        } else if (valor === 3) {
            textoCapacidad = "Capacidad moderada, requiere fortalecimiento";
            claseColor = "bg-warning";
            claseTexto = "text-white"; // Texto oscuro para mejorar contraste sobre amarillo
        } else if (valor === 4) {
            textoCapacidad = "Capacidad consolidada, respuesta efectiva";
            claseColor = "bg-verde-claro";
        } else if (valor === 5) {
            textoCapacidad = "Capacidad óptima y sostenida en el tiempo.";
            claseColor = "bg-iica-verde";
        }

        // 4. Feedback visual de la tarjeta y la insignia de completado
        const tarjeta = document.getElementById(`tarjeta_cap_${indicador}`);
        const check = document.getElementById(`check_cap_${indicador}`);

        if (tarjeta) tarjeta.classList.add('tarjeta-completada');
        if (check) check.classList.remove('d-none');

        // 5. Inyección del resultado en la Columna Derecha
        const panelResultado = document.getElementById(`resultado_cap_${indicador}`);
        const spanIndice = document.getElementById(`indice_cap_${indicador}`);
        const divTexto = document.getElementById(`texto_cap_${indicador}`);

        if (panelResultado) {
            // Actualiza las clases de color y estilo manteniendo el diseño base
            panelResultado.className = `p-3 rounded-3 shadow-sm d-flex flex-column justify-content-center transition-fade ${claseColor} ${claseTexto}`;
        }
        if (spanIndice) spanIndice.innerText = indice;
        if (divTexto) divTexto.innerText = textoCapacidad;
    }

    // 6. Recalcular barra de progreso general de la sección
    actualizarProgresoCapacidades();
}

function actualizarProgresoCapacidades() {
    const totalCapacidades = Object.keys(estadoCapacidades).length;
    let completadas = 0;

    for (const key in estadoCapacidades) {
        if (estadoCapacidades[key] === true) {
            completadas++;
        }
    }
    
    // Calcular porcentaje
    const porcentaje = Math.round((completadas / totalCapacidades) * 100);
    
    // Actualizar barra
    const barra = document.getElementById('barraProgresoCapacidades');
    if (barra) {
        barra.style.width = `${porcentaje}%`;
        barra.innerText = `${porcentaje}%`;
    }
}

// ==============================================================================
// 5. MOTOR DE RECOLECCIÓN DE DATOS (JSON PAYLOAD)
// ==============================================================================
function recolectarDatos() {
    // A. Recolectar Contexto Inicial
    const contexto = {
        territorio: document.getElementById('territorio').value,
        cadena_sistema: document.getElementById('cadena_sistema').value,
        horizonte_intervencion: document.getElementById('horizonte_intervencion').value
    };

    // B. Recolectar Medios de Vida (Paso 0)
    // El selector busca el radio button que esté 'checked' dentro de cada grupo
    const mediosVida = {
        humano: document.querySelector('input[name="cap_humano"]:checked')?.value || null,
        sociopolitico: document.querySelector('input[name="cap_sociopolitico"]:checked')?.value || null,
        natural: document.querySelector('input[name="cap_natural"]:checked')?.value || null,
        fisico: document.querySelector('input[name="cap_fisico"]:checked')?.value || null,
        financiero: document.querySelector('input[name="cap_financiero"]:checked')?.value || null
    };

    // C. Recolectar Perturbaciones (Paso 1)
    const perturbaciones = {};
    
    // Iteramos sobre las llaves que tenemos en estadoPerturbaciones
    const llavesPerturbaciones = [
        "sismo", "remocion", "geologico", "hundimiento", "sequia", "inundacion",
        "heladas", "incendio", "degradacion", "mar", "desertificacion", "glaciares",
        "enfermedad", "muerte", "enfermCultivos", "enfermAnimales", "contraccion",
        "choque", "caida", "volatilidad", "cambiosPoliticas", "bloqueos", "restricciones",
        "corrupcion", "crisis", "pobreza", "conflicto", "perdCobertura"
    ];

    llavesPerturbaciones.forEach(riesgo => {
        const prob = document.querySelector(`input[name="prob_${riesgo}"]:checked`)?.value || null;
        const imp = document.querySelector(`input[name="imp_${riesgo}"]:checked`)?.value || null;

        // Solo lo agregamos al JSON si el usuario evaluó al menos una de las dos métricas
        if (prob !== null || imp !== null) {
            perturbaciones[riesgo] = {
                probabilidad: prob,
                impacto: imp
            };
        }
    });

    // D. Armar el Payload Final
    const payload = {
        fecha_evaluacion: new Date().toISOString(), // Sello de tiempo automático
        datos_contexto: contexto,
        paso0_capitales: mediosVida,
        paso1_riesgos: perturbaciones
    };

    return payload;
}

// ==============================================================================
// 6. CONEXIÓN CON EL SERVIDOR (n8n WEBHOOK)
// ==============================================================================
async function enviarDatosAn8n(payload) {
    // ⚠️ ATENCIÓN: Reemplaza esta URL con el Webhook de Producción o Test de tu n8n
    const webhookUrl = "http://localhost:5678/webhook-test/resiliencia-mera"; 

    const btnCalcular = document.getElementById('btnCalcular');
    const textoOriginal = btnCalcular.innerText;

    try {
        // 1. Feedback visual de carga
        btnCalcular.innerText = "Procesando y enviando datos...";
        btnCalcular.disabled = true;
        btnCalcular.classList.replace('btn-success', 'btn-warning');

        // 2. Petición HTTP POST
        const respuesta = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // 3. Manejo de la respuesta del servidor
        if (respuesta.ok) {
            alert("¡Evaluación de resiliencia guardada exitosamente en la base de datos!");
            // Opcional: document.getElementById('formularioMera').reset();
        } else {
            alert(`Error del servidor: ${respuesta.status}. Verifique la conexión con n8n.`);
        }

    } catch (error) {
        console.error("Error crítico de conexión:", error);
        alert("No se pudo conectar con n8n. Revisa tu conexión a internet o la URL del Webhook.");
    } finally {
        // 4. Restaurar el botón a su estado original
        btnCalcular.innerText = textoOriginal;
        btnCalcular.disabled = false;
        btnCalcular.classList.replace('btn-warning', 'btn-success');
    }
}

// ==============================================================================
// 7. EVENT LISTENER DEL BOTÓN PRINCIPAL
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const btnCalcular = document.getElementById('btnCalcular');
    
    if (btnCalcular) {
        btnCalcular.addEventListener('click', (evento) => {
            evento.preventDefault(); 
            
            // 1. Recolectar
            const datosJSON = recolectarDatos();
            
            // 2. Imprimir en consola (Para que lo muestres en tu demo a los stakeholders)
            console.log("📦 JSON Payload Listo para n8n:");
            console.log(JSON.stringify(datosJSON, null, 2));

            // 3. Procesar y pintar el Dashboard en la pantalla
            calcularYMostrarDashboard(datosJSON);
            
            // 4. Enviar a n8n
            enviarDatosAn8n(datosJSON);
        });
    }
});

// ==============================================================================
// 8. LÓGICA DE FILTROS ANIDADOS, TABLA Y DASHBOARD DINÁMICO
// ==============================================================================

// Diccionario de mapeo estético para la tabla de Perturbaciones
const DICCIONARIO_TIPOLOGIAS = {
    "sismo": "Eventos Geológicos", "remocion": "Eventos Geológicos", "geologico": "Eventos Geológicos", "hundimiento": "Eventos Geológicos",
    "sequia": "Eventos Climáticos", "inundacion": "Eventos Climáticos", "heladas": "Eventos Climáticos", "incendio": "Eventos Climáticos",
    "degradacion": "Aparición Lenta", "mar": "Aparición Lenta", "desertificacion": "Aparición Lenta", "glaciares": "Aparición Lenta",
    "enfermedad": "Eventos Biológicos", "muerte": "Eventos Biológicos", "enfermCultivos": "Eventos Biológicos", "enfermAnimales": "Eventos Biológicos",
    "contraccion": "Económicos", "choque": "Económicos", "caida": "Económicos", "volatilidad": "Económicos",
    "cambiosPoliticas": "Político-Gobernanza", "bloqueos": "Político-Gobernanza", "restricciones": "Político-Gobernanza", "corrupcion": "Político-Gobernanza",
    "crisis": "Crisis Prolongadas", "pobreza": "Crisis Prolongadas", "conflicto": "Crisis Prolongadas", "perdCobertura": "Crisis Prolongadas"
};

// Diccionarios de datos para los selectores anidados (Filtros de Brecha)
const ESTRUCTURA_FILTROS = {
    riesgos: {
        "Geofísicos": { "sismo": "Sismos", "remocion": "Remoción en masa", "geologico": "Riesgo geológico", "hundimiento": "Hundimiento de suelos" },
        "Eventos Climáticos": { "inundacion": "Inundación", "heladas": "Heladas", "sequia": "Sequía", "incendio": "Incendios forestales" },
        "Aparición Lenta": { "degradacion": "Degradación de suelos", "mar": "Aumento nivel del mar", "desertificacion": "Desertificación", "glaciares": "Pérdida de glaciares" },
        "Biológicos": { "enfermedad": "Enfermedades por vectores", "muerte": "Muertes por vectores", "enfermCultivos": "Enfermedades a cultivos", "enfermAnimales": "Enfermedades en animales" },
        "Económicos": { "contraccion": "Contracción del crédito agropecuario", "choque": "Choque de ingresos y pérdida de poder adquisitivo", "caida": "Caída de ingresos del hogar", "volatilidad": "Volatilidad de precios de alimentos básicos" },
        "Político-Gobernanza": { "cambiosPoliticas": "Cambios en políticas", "bloqueos": "Bloqueos logísticos", "restricciones": "Restricciones comerciales", "corrupcion": "Corrupción institucional" },
        "Crisis Prolongadas": { "crisis": "Crisis alimentarias", "pobreza": "Pobreza monetaria", "conflicto": "Conflicto armado", "perdCobertura": "Pérdida de servicios" }
    },
    capacidades: {
        "absorcion": { 
            "abs01": "Acceso a recursos agrícolas", "abs02": "Acceso a servicios financieros diversificados", "abs03": "Medidas de alerta temprana",
            "abs04": "Instalaciones de almacenamiento de cultivos", "abs05": "Infraestructura de riego", "abs06": "Infraestructura de cadenas de suministro",
            "abs07": "Calidad del agua agrícola", "abs08": "Pérdida de alimentos", "abs09": "Volatilidad de precios de alimentos",
            "abs10": "Suficiencia del suministro de alimentos", "abs11": "Disponibilidad de micronutrientes", "abs12": "Calidad de proteínas en oferta alimentaria local"
        },
        "adaptacion": { 
            "adap01": "Adaptación de tecnologías innovadoras", "adap02": "Gastos en I+D agrícola", "adap03": "Extensión agropecuaria como vehículo de adaptación",
            "adap04": "Empoderamiento de la mujer en agricultura", "adap05": "Diversidad productiva", "adap06": "Igualdad de género",
            "adap07": "Tasa de participación laboral", "adap08": "Tasa de alfabetización", "adap09": "Programas de redes de seguridad alimentaria",
            "adap10": "Compromiso de política de seguridad alimentaria", "adap11": "Organizaciones comunitarias", "adap12": "Medidas de gestión de riesgos de desastres"
        },
        "transformacion": { 
            "tra01": "Volatilidad de la producción agrícola", "tra02": "Comercio agrícola", "tra03": "Servicios ecosistémicos",
            "tra04": "Biodiversidad y hábitat", "tra05": "Cambio forestal", "tra06": "Contenido de carbono orgánico en suelos",
            "tra07": "Degradación de tierras", "tra08": "Corrupción", "tra09": "Riesgos de estabilidad política",
            "tra10": "Marco de política sectorial pro-resiliencia", "tra11": "Agricultura sostenible", "tra12": "Telecomunicaciones"
        }
    }
};

// ==============================================================================
// DICCIONARIO DE INDICADORES DE CAPACIDAD (Para la Tabla 2)
// ==============================================================================
const NOMBRES_INDICADORES = {
    // Absorción
    "abs01": "Acceso a recursos agrícolas", "abs02": "Acceso a servicios financieros diversificados", "abs03": "Medidas de alerta temprana",
    "abs04": "Instalaciones de almacenamiento de cultivos", "abs05": "Infraestructura de riego", "abs06": "Infraestructura de cadenas de suministro",
    "abs07": "Calidad del agua agrícola", "abs08": "Pérdida de alimentos", "abs09": "Volatilidad de precios de alimentos",
    "abs10": "Suficiencia del suministro de alimentos", "abs11": "Disponibilidad de micronutrientes", "abs12": "Calidad de proteínas en oferta alimentaria local",
    // Adaptación
    "adap01": "Adaptación de tecnologías innovadoras", "adap02": "Gastos en I+D agrícola", "adap03": "Extensión agropecuaria como vehículo de adaptación",
    "adap04": "Empoderamiento de la mujer en agricultura", "adap05": "Diversidad productiva", "adap06": "Igualdad de género",
    "adap07": "Tasa de participación laboral", "adap08": "Tasa de alfabetización", "adap09": "Programas de redes de seguridad alimentaria",
    "adap10": "Compromiso de política de seguridad alimentaria", "adap11": "Organizaciones comunitarias", "adap12": "Medidas de gestión de riesgos de desastres",
    // Transformación
    "tra01": "Volatilidad de la producción agrícola", "tra02": "Comercio agrícola", "tra03": "Servicios ecosistémicos",
    "tra04": "Biodiversidad y hábitat", "tra05": "Cambio forestal", "tra06": "Contenido de carbono orgánico en suelos",
    "tra07": "Degradación de tierras", "tra08": "Corrupción", "tra09": "Riesgos de estabilidad política",
    "tra10": "Marco de política sectorial pro-resiliencia", "tra11": "Agricultura sostenible", "tra12": "Telecomunicaciones"
};

// Variable global para guardar los datos temporalmente
let payloadActual = null;

// ==============================================================================
// FUNCIONES AUXILIARES (TRADUCCIÓN EXCEL)
// ==============================================================================

function calcularNivelRiesgoExcel(irp) {
    if (irp <= 0.22) return { texto: "Muy Bajo", clase: "bg-riesgo-muy-bajo" };
    if (irp <= 0.44) return { texto: "Bajo", clase: "bg-riesgo-bajo" };
    if (irp <= 0.67) return { texto: "Medio", clase: "bg-riesgo-medio" };
    if (irp <= 0.88) return { texto: "Alto", clase: "bg-riesgo-alto" };
    return { texto: "Muy Alto", clase: "bg-riesgo-muy-alto" };
}

function obtenerNombreCapacidadGeneral(key) {
    if (key.includes('abs')) return "Absorción";
    if (key.includes('adap')) return "Adaptación";
    if (key.includes('tra')) return "Transformación";
    return "Capacidad General";
}

function obtenerDetalleCapacidadExcel(valor) {
    if (valor === 1) return { texto: "Capacidad inexistente o no funcional", clase: "bg-danger text-white" };
    if (valor === 2) return { texto: "Capacidad incipiente, cobertura limitada.", clase: "bg-rojo-claro text-white" }; 
    if (valor === 3) return { texto: "Capacidad moderada, requiere fortalecimiento", clase: "bg-warning text-dark" };
    if (valor === 4) return { texto: "Capacidad consolidada, respuesta efectiva", clase: "bg-verde-claro text-white" };
    if (valor === 5) return { texto: "Capacidad óptima y sostenida en el tiempo.", clase: "bg-iica-verde text-white" };
    return { texto: "Sin evaluar", clase: "bg-light text-dark" };
}

// ==============================================================================
// INICIALIZACIÓN DE FILTROS DE BRECHA
// ==============================================================================

function inicializarFiltros() {
    const fTipologia = document.getElementById('filtroTipologia');
    const fPerturbacion = document.getElementById('filtroPerturbacion');
    const fCapacidad = document.getElementById('filtroCapacidad');
    const fIndicador = document.getElementById('filtroIndicador');

    fTipologia.innerHTML = '<option value="" selected disabled>A. Tipología...</option>';
    fCapacidad.innerHTML = '<option value="" selected disabled>A. Capacidad...</option>';

    for (let tipo in ESTRUCTURA_FILTROS.riesgos) {
        fTipologia.add(new Option(tipo, tipo));
    }
    
    for (let cap in ESTRUCTURA_FILTROS.capacidades) {
        let nombreCapacidad = "Capacidad " + cap.charAt(0).toUpperCase() + cap.slice(1);
        fCapacidad.add(new Option(nombreCapacidad, cap));
    }

    fTipologia.addEventListener('change', () => {
        fPerturbacion.innerHTML = '<option value="" selected disabled>B. Perturbación...</option>';
        fPerturbacion.disabled = false;
        let opciones = ESTRUCTURA_FILTROS.riesgos[fTipologia.value];
        for (let key in opciones) fPerturbacion.add(new Option(opciones[key], key));
        actualizarBrechaDinamica();
    });

    fCapacidad.addEventListener('change', () => {
        fIndicador.innerHTML = '<option value="" selected disabled>B. Indicador...</option>';
        fIndicador.disabled = false;
        let opciones = ESTRUCTURA_FILTROS.capacidades[fCapacidad.value];
        for (let key in opciones) fIndicador.add(new Option(opciones[key], key));
        actualizarBrechaDinamica();
    });

    fPerturbacion.addEventListener('change', actualizarBrechaDinamica);
    fIndicador.addEventListener('change', actualizarBrechaDinamica);
}

function actualizarBrechaDinamica() {
    const keyRiesgo = document.getElementById('filtroPerturbacion').value;
    const keyIndicador = document.getElementById('filtroIndicador').value; 

    if (!keyRiesgo || !keyIndicador || !payloadActual) return; 

    // 1. Cálculos de IRP e ICE (Corregido para leer del Paso 2)
    let prob = Number(payloadActual.paso1_riesgos[keyRiesgo]?.probabilidad || 0);
    let imp = Number(payloadActual.paso1_riesgos[keyRiesgo]?.impacto || 0);
    let irpVal = (prob * imp) / 9.0;
    
    // Obtenemos el valor (1 a 5) de la capacidad y lo dividimos entre 5
    let valorCapacidad = Number(payloadActual.paso2_capacidades[keyIndicador] || 0);
    let iceVal = valorCapacidad / 5.0;
    
    let brecha = Math.max(0, irpVal - iceVal);

    // 2. Nivel de Brecha
    let nivelBrechaStr = "";
    let claseTarjeta = "";

    if (brecha >= 0.6) { 
        nivelBrechaStr = "Muy Alta";
        claseTarjeta = "card-brecha-muy-alta";
    } else if (brecha >= 0.4) { 
        nivelBrechaStr = "Alta";
        claseTarjeta = "card-brecha-alta";
    } else if (brecha >= 0.2) { 
        nivelBrechaStr = "Media";
        claseTarjeta = "card-brecha-media";
    } else if (brecha > 0) { 
        nivelBrechaStr = "Baja";
        claseTarjeta = "card-brecha-baja";
    } else { 
        nivelBrechaStr = "Nula";
        claseTarjeta = "card-brecha-nula";
    }

    // Actualización visual de IRP, ICE y Brecha
    document.getElementById('txtMeraIRP').innerText = irpVal.toFixed(2);
    document.getElementById('txtMeraICE').innerText = iceVal.toFixed(2);
    document.getElementById('txtMeraBrecha').innerText = brecha.toFixed(2);
    
    // Tarjeta 1: Nivel de Brecha (Fondo claro + Texto oscuro correspondiente)
    const boxNivel = document.getElementById('boxNivelBrecha');
    const txtNivel = document.getElementById('txtMeraNivelBrecha');

    txtNivel.innerText = nivelBrechaStr.toUpperCase();
    boxNivel.className = `p-3 rounded-3 text-center transition-all ${claseTarjeta}`;

    // Tarjeta 2: Prioridad de Intervención (Misma paleta)
    const boxPrioridad = document.getElementById('boxPrioridadDecision');
    const txtPrioridad = document.getElementById('txtMeraPrioridad');
    const lblContexto = document.getElementById('lblMeraContexto');

    boxPrioridad.className = `card h-100 shadow-sm text-center p-4 transition-all ${claseTarjeta}`;

    // Mapeo de Textos de Prioridad y Tipo de Intervención
    const txtTipo = document.getElementById('txtMeraTipo');
    const txtTipoDesc = document.getElementById('txtMeraTipoDesc');

    txtTipo.className = "display-6 fw-bold my-1 text-iica-azul";
    txtTipoDesc.className = "mb-0 text-iica-azul";

    if (nivelBrechaStr === "Muy Alta") {
        txtPrioridad.innerText = "CRÍTICA";
        lblContexto.innerText = "Riesgo alto y capacidad insuficiente, requiere acción inmediata.";
        txtTipo.innerText = "ABSORCIÓN";
        txtTipoDesc.innerText = "Respuesta y contención."; 
    } else if (nivelBrechaStr === "Alta") {
        txtPrioridad.innerText = "ALTA";
        lblContexto.innerText = "Brecha importante, necesita fortalecimiento.";
        txtTipo.innerText = "ADAPTACIÓN";
        txtTipoDesc.innerText = "Ajustes y fortalecimiento.";
    } else if (nivelBrechaStr === "Media") {
        txtPrioridad.innerText = "MEDIA";
        lblContexto.innerText = "Riesgo moderado con capacidad parcial, requiere mejoras graduales.";
        txtTipo.innerText = "ADAPTACIÓN";
        txtTipoDesc.innerText = "Mejoras graduales.";
    } else if (nivelBrechaStr === "Baja") {
        txtPrioridad.innerText = "BAJA";
        lblContexto.innerText = "Capacidad relativamente adecuada, monitorear.";
        txtTipo.innerText = "TRANSFORMACIÓN/MANTENIMIENTO";
        txtTipoDesc.innerText = "Ajustes menores, preparación para cambio estructural."; 
    } else { // Nula
        txtPrioridad.innerText = "SIN PRIORIDAD";
        lblContexto.innerText = "Sin prioridad, capacidad suficiente o superior al riesgo.";
        txtTipo.innerText = "MANTENIMIENTO";
        txtTipoDesc.innerText = "Sin prioridad/consolidar lo que funciona.";
    }

    // Mostrar sección y feedback
    document.getElementById('seccionDecision').classList.remove('d-none');
}

// ==============================================================================
// FUNCIÓN MAESTRA QUE CONSTRUYE EL DASHBOARD (TABLAS FILTRADAS Y ORDENADAS)
// ==============================================================================
function calcularYMostrarDashboard(payload) {
    // 1. Guardar en variable global y encender filtros
    payloadActual = payload;
    inicializarFiltros();

    // ==========================================
    // TABLA 1: PERTURBACIONES (Solo IRP > 0.88 y orden descendente)
    // ==========================================
    const cuerpoTablaRiesgos = document.getElementById('tablaPerturbacionesCuerpo');
    cuerpoTablaRiesgos.innerHTML = ""; 
    const riesgos = payload.paso1_riesgos || {};
    let listaRiesgos = [];

    // Recolectar y calcular datos filtrados
    for (const key in riesgos) {
        const prob = Number(riesgos[key].probabilidad);
        const imp = Number(riesgos[key].impacto);
        
        if (prob > 0 && imp > 0) { 
            const irpNormalizado = (prob * imp) / 9.0;
            
            // FILTRO 1: Solo registrar si es "Muy Alto" (IRP > 0.88)
            if (irpNormalizado > 0.88) {
                const nivelRiesgo = calcularNivelRiesgoExcel(irpNormalizado);
                const tipologiaTexto = DICCIONARIO_TIPOLOGIAS[key] || "General";
                const nombreFormateado = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

                listaRiesgos.push({
                    tipologia: tipologiaTexto,
                    nombre: nombreFormateado,
                    prob: prob,
                    imp: imp,
                    irp: irpNormalizado,
                    nivel: nivelRiesgo
                });
            }
        }
    }

    // Ordenar de mayor a menor IRP
    listaRiesgos.sort((a, b) => b.irp - a.irp);

    // Inyectar HTML o mensaje de vacío
    if (listaRiesgos.length > 0) {
        listaRiesgos.forEach(r => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="text-start ps-3 fw-bold text-secondary">${r.tipologia}</td>
                <td class="text-start">${r.nombre}</td>
                <td><span class="badge bg-light text-dark border">${r.prob}</span></td>
                <td><span class="badge bg-light text-dark border">${r.imp}</span></td>
                <td class="fw-bold text-danger">${r.irp.toFixed(2)}</td>
                <td class="pe-3"><span class="badge px-3 py-1 ${r.nivel.clase}">${r.nivel.texto}</span></td>
            `;
            cuerpoTablaRiesgos.appendChild(fila);
        });
    } else {
        cuerpoTablaRiesgos.innerHTML = `<tr><td colspan="6" class="py-3 text-success fw-bold">✔️ No se detectaron perturbaciones críticas (IRP > 0.88).</td></tr>`;
    }

    // ==========================================
    // TABLA 2: CAPACIDADES (Solo ICE <= 0.40 y orden ascendente)
    // ==========================================
    const cuerpoTablaCapacidades = document.getElementById('tablaCapacidadesCuerpo');
    cuerpoTablaCapacidades.innerHTML = "";
    
    const capacidades = payload.paso2_capacidades || {}; 
    let listaCapacidades = [];

    for (const key in capacidades) {
        const valor = Number(capacidades[key]);
        
        if (valor > 0) {
            const ice = valor / 5.0; 
            
            // FILTRO 2: Solo registrar si el Índice es <= 0.40 (Valores 1 y 2 del formulario)
            if (ice <= 0.40) {
                const tipoCapacidad = obtenerNombreCapacidadGeneral(key);
                const evaluacion = obtenerDetalleCapacidadExcel(valor);
                const nombreRealIndicador = NOMBRES_INDICADORES[key] || key.toUpperCase();

                listaCapacidades.push({
                    tipo: tipoCapacidad,
                    nombre: nombreRealIndicador,
                    valor: valor,
                    evaluacion: evaluacion,
                    ice: ice
                });
            }
        }
    }

    // ORDENAMIENTO ASCENDENTE (Menor ICE primero - Vulnerabilidades críticas primero)
    listaCapacidades.sort((a, b) => a.ice - b.ice);

    if (listaCapacidades.length > 0) {
        listaCapacidades.forEach(c => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="text-start ps-3 fw-bold text-secondary">${c.tipo}</td>
                <td class="text-start fw-bold">${c.nombre}</td>
                <td><span class="badge bg-light text-dark border">${c.valor}</span></td>
                <td><span class="badge px-3 py-1 ${c.evaluacion.clase} w-100">${c.evaluacion.texto}</span></td>
                <td class="fw-bold text-danger pe-3">${c.ice.toFixed(2)}</td>
            `;
            cuerpoTablaCapacidades.appendChild(fila);
        });
    } else {
        cuerpoTablaCapacidades.innerHTML = `<tr><td colspan="5" class="py-3 text-success fw-bold">✔️ No se detectaron capacidades en nivel crítico (ICE <= 0.40).</td></tr>`;
    }

    // Mostrar sección
    const dashboard = document.getElementById('seccionDashboard');
    dashboard.classList.remove('d-none');
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==============================================================================
// FUNCIÓN RECOLECTORA DE DATOS (El puente hacia el Dashboard)
// ==============================================================================
function generarDashboardResultados() {
    // 1. Recolectar Paso 0: Medios de Vida
    const capitalesKeys = ['humano', 'sociopolitico', 'natural', 'fisico', 'financiero'];
    let datosPaso0 = {};
    
    capitalesKeys.forEach(cap => {
        const seleccion = document.querySelector(`input[name="cap_${cap}"]:checked`);
        datosPaso0[cap] = seleccion ? parseInt(seleccion.value, 10) : 0;
    });

    // 2. Recolectar Paso 1: Perturbaciones
    // Usamos el diccionario de tipologías para saber qué perturbaciones buscar
    const perturbacionesKeys = Object.keys(DICCIONARIO_TIPOLOGIAS);
    let datosPaso1 = {};
    
    perturbacionesKeys.forEach(pert => {
        const prob = document.querySelector(`input[name="prob_${pert}"]:checked`);
        const imp = document.querySelector(`input[name="imp_${pert}"]:checked`);
        
        // Solo guardar si ambas fueron respondidas
        if (prob && imp) {
            datosPaso1[pert] = {
                probabilidad: parseInt(prob.value, 10),
                impacto: parseInt(imp.value, 10)
            };
        }
    });

    // 3. Recolectar Paso 2: Capacidades (36 indicadores: abs, adap, tra)
    let datosPaso2 = {};
    const prefijos = ['abs', 'adap', 'tra'];
    
    prefijos.forEach(pref => {
        for(let i = 1; i <= 12; i++) {
            // Formatear el número (01, 02... 12)
            let num = i < 10 ? '0' + i : i; 
            let idIndicador = pref + num;
            
            const seleccion = document.querySelector(`input[name="cap_${idIndicador}"]:checked`);
            if (seleccion) {
                datosPaso2[idIndicador] = parseInt(seleccion.value, 10);
            }
        }
    });

    // 4. Empaquetar todo en el "Payload"
    const payloadCompleto = {
        paso0_capitales: datosPaso0,
        paso1_riesgos: datosPaso1,
        paso2_capacidades: datosPaso2
    };

    // 5. Enviar los datos empaquetados a la función que dibuja el Dashboard
    calcularYMostrarDashboard(payloadCompleto);
}