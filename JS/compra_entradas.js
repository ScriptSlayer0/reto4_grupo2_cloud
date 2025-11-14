// Referencias a elementos del DOM
const formulario = document.getElementById('formulario');
const comprarBtn = document.getElementById('comprar');
const aceptarCheckbox = document.getElementById('acepto');
const modalCompra = document.getElementById('modalCompra');
const modalBody = modalCompra.querySelector('.modal-body');
const confirmarCompraBtn = document.getElementById('confirmarCompra');
const confirmarCancelacionBtn = document.getElementById('confirmarCancelacion'); // botón "Sí, cancelar"

// Precios según el tipo de entrada
const preciosPorTipo = {
  infantil: 30,
  adulto_zona1: 80,
  adulto_zona2: 60,
};

let errorActivo = false; // Controla si hay errores activos

// Al cargar la página, se reinicia el formulario y se desactiva el botón de compra
window.addEventListener('load', () => {
  formulario.reset();
  document.getElementById('precio').value = '';
  document.getElementById('edad').disabled = false;
  comprarBtn.disabled = true;
});

// Habilita o deshabilita el botón de compra según el checkbox de aceptación
aceptarCheckbox.addEventListener('change', () => {
  comprarBtn.disabled = !aceptarCheckbox.checked;
});

// Habilita el campo de edad al seleccionar tipo de entrada
document.getElementById('tipo').addEventListener('change', () => {
  document.getElementById('edad').disabled = false;
});

// Obtiene instancia del modal de Bootstrap
function getModalInstance() {
  return bootstrap.Modal.getOrCreateInstance(modalCompra);
}

// Muestra errores en el modal
function mostrarError(mensajeHtml) {
  modalBody.innerHTML = mensajeHtml;
  errorActivo = true;
  confirmarCompraBtn.style.display = 'none';
  confirmarCompraBtn.disabled = true;
  getModalInstance().show();

  // Al cerrar el modal, se reinicia el estado de error
  modalCompra.addEventListener('hidden.bs.modal', () => {
    errorActivo = false;
  }, { once: true });
}

// Calcula el precio según el tipo de entrada
function calcularPrecio() {
  const tipo = document.getElementById('tipo').value;
  if (!tipo) {
    const mensaje = `
      <div class="alert alert-danger" role="alert">
        <strong>❌ Error:</strong> Por favor, selecciona una zona válida antes de calcular el precio.
      </div>`;
    mostrarError(mensaje);
    return;
  }
  errorActivo = false;
  const precio = preciosPorTipo[tipo] || 0;
  document.getElementById('precio').value = precio + ' €';
}

// Validación y lógica al hacer clic en "Comprar"
comprarBtn.addEventListener('click', () => {
  const faltanDatos = [];

  // Verifica campos obligatorios
  if (!document.getElementById('dni').value.trim()) faltanDatos.push('DNI');
  if (!document.getElementById('nombre').value.trim()) faltanDatos.push('Nombre');
  if (!document.getElementById('apellidos').value.trim()) faltanDatos.push('Apellidos');
  if (!document.getElementById('email').value.trim()) faltanDatos.push('Email');
  if (!document.getElementById('edad').value.trim()) faltanDatos.push('Edad');
  if (!document.getElementById('precio').value.trim()) faltanDatos.push('Precio');

  const tipoSelect = document.getElementById('tipo');
  const tipo = tipoSelect.value;
  if (!tipo || tipoSelect.selectedIndex === 0) {
    faltanDatos.push('Tipo de Entrada');
  }

  // Validaciones específicas de formato y lógica
  const erroresDatos = [];
  const dni = document.getElementById('dni').value.trim();
  const email = document.getElementById('email').value.trim();
  const edadInput = document.getElementById('edad').value.trim();
  const dniRegex = /^\d{8}[A-Z]$/;
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (dni && !dniRegex.test(dni))
    erroresDatos.push('El DNI no es válido. Debe tener 8 números y una letra mayúscula (ej: 12345678A).');
  if (email && !emailRegex.test(email))
    erroresDatos.push('El email no tiene un formato válido.');
  if (edadInput && isNaN(parseInt(edadInput)))
    erroresDatos.push('La edad debe ser un número válido.');

  // Validación de edad según tipo de entrada
  const edad = parseInt(edadInput);
  if (tipo && !isNaN(edad)) {
    if (tipo === 'infantil' && edad >= 18)
      erroresDatos.push('La entrada infantil solo es válida para menores de 18 años.');
    if ((tipo === 'adulto_zona1' || tipo === 'adulto_zona2') && edad < 18)
      erroresDatos.push('Las entradas de adulto son solo para mayores de edad.');
  }

  // Validación del precio ingresado
  const precioInput = document.getElementById('precio').value.trim();
  const precioIngresado = parseFloat(precioInput.replace(/[^\d.]/g, ''));
  const precioCorrecto = preciosPorTipo[tipo];

  if (tipo && precioCorrecto !== undefined && precioIngresado !== precioCorrecto) {
    erroresDatos.push(`El precio no coincide con el tipo de entrada seleccionado (debe ser ${precioCorrecto} €).`);
  }

  // Si hay errores o faltan datos, se muestra el modal con los mensajes
  if (faltanDatos.length || erroresDatos.length) {
    let mensajeHtml = '';
    if (faltanDatos.length) {
      mensajeHtml += `
        <div class="alert alert-warning" role="alert">
          <strong>⚠️ Faltan datos obligatorios:</strong>
          <ul>${faltanDatos.map(campo => `<li>${campo}</li>`).join('')}</ul>
        </div>`;
    }
    if (erroresDatos.length) {
      mensajeHtml += `
        <div class="alert alert-danger" role="alert">
          <strong>❌ Se han detectado errores en los datos ingresados:</strong>
          <ul>${erroresDatos.map(e => `<li>${e}</li>`).join('')}</ul>
        </div>`;
    }
    mensajeHtml += `<p>Por favor, corrige los errores antes de confirmar la compra.</p>`;
    mostrarError(mensajeHtml);
    return;
  }

  // Si todo está correcto, se muestra el modal de confirmación
  modalBody.innerHTML = '¿Deseas confirmar la compra de las entradas?';
  confirmarCompraBtn.style.display = 'inline-block';
  confirmarCompraBtn.disabled = false;
  errorActivo = false;
  getModalInstance().show();
});

// Confirmación final de compra
confirmarCompraBtn.addEventListener('click', () => {
  if (errorActivo) {
    return; // No confirma si hay error
  }
  modalBody.innerHTML = `
    <div class="alert alert-success" role="alert">
      <strong>✅ Compra confirmada con éxito.</strong>
      <p>Gracias por tu compra. Recibirás un correo con los detalles de tu entrada.</p>
    </div>
  `;
  confirmarCompraBtn.style.display = 'none';
  confirmarCompraBtn.disabled = true;

  // Cierra el modal y envía el formulario tras 3 segundos
  setTimeout(() => {
    const modal = getModalInstance();
    modal.hide();
    formulario.submit();
  }, 3000);
});

// Cancelación: redirige al inicio
confirmarCancelacionBtn.addEventListener('click', () => {
  window.location.href = "index.html";
});

// Estilo visual al enfocar campos de texto
document.querySelectorAll('input:not([type="checkbox"]), textarea').forEach(el => {
  el.addEventListener('focus', () => el.classList.add('focus-rosa'));
  el.addEventListener('blur', () => el.classList.remove('focus-rosa'));
});
