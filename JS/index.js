const menu = document.getElementById('menuPrincipal');

// Quitar fondo de inmediato al cerrar
menu.addEventListener('hidden.bs.collapse', () => {
  menu.classList.remove('menu-abierto');
});

// Sección de Bilbao (submenú)
document.getElementById('linkVisitanos').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '#';
});

document.getElementById('linkGastronomia').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '#';
});

document.getElementById('linkAlojamiento').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '#';
});

// Sección entradas (submenú)

document.getElementById('linkSoloCarrera').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './compra_entradas.html';
});

document.getElementById('linkSoloAcceso').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './solo_acceso.html';
});

document.getElementById('linkSorteo').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './sorteo.html';
});

document.getElementById('linkContacto').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './contacto.html';
});

// Redes sociales

document.getElementById("instagram").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://www.instagram.com/f1";
  });

  document.getElementById("tiktok").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://www.tiktok.com/@f1";
  });

  document.getElementById("youtube").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://www.youtube.com/user/Formula1";
  });

  document.getElementById("twitter").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://twitter.com/F1";
  });

  document.getElementById("facebook").addEventListener("click", function(e) {
    e.preventDefault();
    window.location.href = "https://www.facebook.com/Formula1";
  });

// Obtener todos los elementos con clase 'dropdown'
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
  // Mostrar el dropdown al pasar el cursor
  dropdown.addEventListener('mouseenter', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    dropdown.classList.add('show');
    menu.classList.add('show');
  });

  // Ocultar el dropdown al salir del área
  dropdown.addEventListener('mouseleave', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    dropdown.classList.remove('show');
    menu.classList.remove('show');
  });
});

function descargarReglamento() {
    // Crea un enlace invisible con atributo download
    const link = document.createElement("a");
    link.href = "./reglamento_f1/fia_2025_formula_1_sporting_regulations_-_issue_1_-_2024-07-31.pdf";
    link.download = "Reglamento_F1.pdf"; // nombre del archivo descargado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  window.addEventListener('DOMContentLoaded', () => {
    calcularSHA256DesdeURL('../reglamento_f1/fia_2025_formula_1_sporting_regulations_-_issue_1_-_2024-07-31.pdf');
  });
