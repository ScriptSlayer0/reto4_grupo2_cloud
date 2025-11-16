// Configuración de datos
const CONFIG = {
  pilotos: [
    "Max Verstappen", "Liam Lawson", "Charles Leclerc", "Carlos Sainz",
    "Lewis Hamilton", "George Russell", "Lando Norris", "Oscar Piastri",
    "Fernando Alonso", "Lance Stroll", "Franco Colapinto", "Pierre Gasly",
    "Yuki Tsunoda", "Isack Hadjar", "Gabriel Bortoleto", "Nico Hulkenberg",
    "Alexander Albon", "Logan Sargeant", "Esteban Ocon", "Oliver Bearman"
  ],
  
  podioFinal: ["Max Verstappen", "Lando Norris", "Charles Leclerc"],
  
  imagenes: {
    "Max Verstappen": "./images/pilotos/max__verstappen.webp",
    "Liam Lawson": "./images/pilotos/liam_lawson.webp",
    "Charles Leclerc": "./images/pilotos/charles_lecrerc.webp",
    "Carlos Sainz": "./images/pilotos/carlos_sainz.webp",
    "Lewis Hamilton": "./images/pilotos/lewis_hamilton.jpg",
    "George Russell": "./images/pilotos/george_russell.jpg",
    "Lando Norris": "./images/pilotos/lando_norris.webp",
    "Oscar Piastri": "./images/pilotos/oscar_piastri.webp",
    "Fernando Alonso": "./images/pilotos/fernando_alonso.jpg",
    "Lance Stroll": "./images/pilotos/lance_stroll.jpg",
    "Esteban Ocon": "./images/pilotos/esteban_ocon.jpg",
    "Pierre Gasly": "./images/pilotos/Pierre_Gasly.jpg",
    "Yuki Tsunoda": "./images/pilotos/yuki_tsunoda.jpg",
    "Isack Hadjar": "./images/pilotos/isack_hadjar.jpg",
    "Alexander Albon": "./images/pilotos/alexander_albon.jpg",
    "Logan Sargeant": "./images/pilotos/logan_sargeant.png",
    "Nico Hulkenberg": "./images/pilotos/nico_hulkenberg.jpg",
    "Franco Colapinto": "./images/pilotos/franco_colapinto.png",
    "Gabriel Bortoleto": "./images/pilotos/gabriel_bortoleto.jpg",
    "Oliver Bearman": "./images/pilotos/oliver_bearman.jpg"
  },
  
  selectIds: ["puesto1", "puesto2", "puesto3"],
  imagenDefault: "./images/pilotos/default.jpg"
};

// Utilidades
const Utils = {
  getElement: (id) => document.getElementById(id),
  
  getPilotoImagen: (piloto) => CONFIG.imagenes[piloto] || CONFIG.imagenDefault,
  
  validarSeleccion: (seleccion) => {
    if (seleccion.includes("")) {
      return { valida: false, mensaje: "Por favor, selecciona un piloto para cada posición." };
    }
    if (new Set(seleccion).size < 3) {
      return { valida: false, mensaje: "No puedes repetir pilotos en tu selección." };
    }
    return { valida: true };
  }
};

// Gestión de selects
const SelectManager = {
  rellenar: (idSelect) => {
    const select = Utils.getElement(idSelect);
    if (!select) return;
    
    select.innerHTML = '';
    
    // Opción por defecto
    const defaultOption = document.createElement("option");
    Object.assign(defaultOption, {
      value: "",
      textContent: "-- Elige un piloto --",
      disabled: true,
      selected: true
    });
    select.appendChild(defaultOption);
    
    // Opciones de pilotos
    CONFIG.pilotos.forEach(piloto => {
      const option = document.createElement("option");
      option.value = piloto;
      option.textContent = piloto;
      select.appendChild(option);
    });
  },
  
  inicializar: () => {
    CONFIG.selectIds.forEach(SelectManager.rellenar);
  },
  
  obtenerSeleccion: () => {
    return CONFIG.selectIds.map(id => Utils.getElement(id)?.value || "");
  }
};

// Lógica de aciertos
const AciertosManager = {
  calcular: (seleccion, podio) => {
    let exactos = 0;
    let parciales = 0;
    let erroneos = 0;
    
    seleccion.forEach((piloto, idx) => {
      if (piloto === podio[idx]) {
        exactos++;
      } else if (podio.includes(piloto)) {
        parciales++;
      } else {
        erroneos++;
      }
    });
    
    return { exactos, parciales, erroneos };
  },
  
  generarMensaje: ({ exactos, parciales, erroneos }) => {
    if (exactos === 3) {
      return "🏆 ¡PERFECTO! Has acertado el podio completo en el orden exacto! 🎉";
    }
    
    let mensaje = [];
    
    if (exactos > 0) {
      mensaje.push(`✅ Aciertos en posición exacta: ${exactos}`);
    }
    
    if (parciales > 0) {
      mensaje.push(`⚠️ Pilotos correctos en posición incorrecta: ${parciales}`);
    }
    
    if (erroneos > 0) {
      mensaje.push(`❌ Pilotos erróneos (no están en el podio): ${erroneos}`);
    }
    
    if (mensaje.length === 0) {
      return "❌ No has acertado ningún piloto del podio 😢";
    }
    
    return mensaje.join('<br>');
  }
};

// Generación de UI
const UIBuilder = {
  crearTarjetaPiloto: (piloto, posicion, podio, esApuesta = false) => {
    let badge = '';
    
    if (esApuesta) {
      if (piloto === podio[posicion]) {
        badge = '<span class="badge bg-success mt-2">✓ Acertado</span>';
      } else if (podio.includes(piloto)) {
        const posicionReal = podio.indexOf(piloto) + 1;
        badge = `<span class="badge bg-warning text-dark mt-2">Está en el ${posicionReal}º</span>`;
      }
    }
    
    return `
      <div class="col-12 col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <p class="fw-bold">${posicion + 1}º Puesto</p>
            <img 
              src="${Utils.getPilotoImagen(piloto)}" 
              alt="${piloto}" 
              class="piloto-img mb-2" 
              style="height: 180px; width: 220px; object-fit: contain;"
            >
            <p class="mb-0">${piloto}</p>
            ${badge}
          </div>
        </div>
      </div>
    `;
  },
  
  crearSeccionPodio: (pilotos, podio, titulo, esApuesta = false) => {
    const tarjetas = pilotos
      .map((piloto, idx) => UIBuilder.crearTarjetaPiloto(piloto, idx, podio, esApuesta))
      .join("");
    
    return `
      <section class="mb-5">
        <h4 class="text-center mb-4">${titulo}</h4>
        <div class="row justify-content-center g-4">
          ${tarjetas}
        </div>
      </section>
    `;
  },
  
  mostrarResultados: (seleccion, podio, aciertos) => {
    const mensaje = AciertosManager.generarMensaje(aciertos);
    const resultado = Utils.getElement("resultado");
    
    if (!resultado) return;
    
    resultado.innerHTML = `
      ${UIBuilder.crearSeccionPodio(podio, podio, "🏁 Podio Real")}
      ${UIBuilder.crearSeccionPodio(seleccion, podio, "🎯 Tu Apuesta", true)}
      <div class="alert alert-info text-center">${mensaje}</div>
    `;
  }
};

// Manejadores de eventos
const EventHandlers = {
  sortear: () => {
    const seleccion = SelectManager.obtenerSeleccion();
    const validacion = Utils.validarSeleccion(seleccion);
    
    if (!validacion.valida) {
      alert(validacion.mensaje);
      return;
    }
    
    const aciertos = AciertosManager.calcular(seleccion, CONFIG.podioFinal);
    UIBuilder.mostrarResultados(seleccion, CONFIG.podioFinal, aciertos);
  },
  
  volverInicio: (event) => {
    event.preventDefault();
    
    const resultado = Utils.getElement("resultado");
    if (resultado) resultado.innerHTML = "";
    
    window.location.href = "index.html";
  }
};

// Inicialización
const App = {
  init: () => {
    // Inicializar selects
    SelectManager.inicializar();
    
    // Asignar eventos - buscar por id o por función sortear global
    const btnSortear = Utils.getElement("btnSortear");
    const btnIndex = Utils.getElement("btnIndex");
    
    if (btnSortear) {
      btnSortear.addEventListener("click", EventHandlers.sortear);
    }
    
    if (btnIndex) {
      btnIndex.addEventListener("click", EventHandlers.volverInicio);
    }
    
    // Exponer sortear globalmente por si se llama desde HTML
    window.sortear = EventHandlers.sortear;
  }
};

// Ejecutar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", App.init);
} else {
  App.init();
}