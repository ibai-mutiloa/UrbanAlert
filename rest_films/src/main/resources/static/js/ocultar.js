document.addEventListener("DOMContentLoaded", function () {
  const tipoUsuario = localStorage.getItem("usuarioTipo");
  const grafikakLink = document.getElementById("grafikakLink");

  if (tipoUsuario === "herritar" || tipoUsuario === "turista") {
    if (grafikakLink) {
      grafikakLink.style.display = "none";
    }
  } else {
    if (grafikakLink) {
      grafikakLink.style.display = ""; // o "block", según tu diseño
    }
  }
});
