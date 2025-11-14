// --- Función de validación ---
  function consultarEntradas() {
    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const errorDiv = document.getElementById("error");

    // Ocultamos posibles mensajes previos
    errorDiv.classList.add("d-none");

    // Validación simple
    if (usuario === "alumno" && contrasena === "sanluis") {
      alert("✅ Todo correcto. Accediendo...");
      window.location.href = "#";
    } else {
      errorDiv.textContent = "❌ Usuario o contraseña incorrectos";
      errorDiv.classList.remove("d-none");
    }
  }

  // --- Listeners globales (se ejecutan una sola vez) ---
  // Botón para volver a index.html
  document.getElementById("btnIndex").addEventListener("click", function() {
    window.location.href = "index.html";
  });

  // Mostrar/Ocultar contraseña
  const toggleBtn = document.getElementById("toggleContrasena");
  const passwordInput = document.getElementById("contrasena");

  toggleBtn.addEventListener("click", function() {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleBtn.textContent = "👁️ visible";
    } else {
      passwordInput.type = "password";
      toggleBtn.textContent = "🙈 oculto";
    }
  });