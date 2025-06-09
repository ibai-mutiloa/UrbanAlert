document.querySelector("#alertaFormulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const t = traducciones[idiomaActual];

  console.log("Formulario enviado");

  // Limpiar errores anteriores
  const camposError = [
    "herrialdearenLabela",
    "hiriarenLabela",
    "kalearenLabela",
    "postaKodearenLabela"
  ];
  camposError.forEach(id => {
    document.getElementById(id).textContent = "";
  });

  let herrialdea = document.getElementById("herrialdea").value.trim();
  let hiria = document.getElementById("hiria").value.trim();
  let kalea = document.getElementById("kalea").value.trim();
  let postaKodea = document.getElementById("postaKodea").value.trim();

  let hayError = false;

  if (herrialdea === "") {
    document.getElementById("herrialdearenLabela").textContent = t.erroreaHerrialdea;
    hayError = true;
  }
  if (hiria === "") {
    document.getElementById("hiriarenLabela").textContent = t.erroreaHiria;
    hayError = true;
  }
  if (kalea === "") {
    document.getElementById("kalearenLabela").textContent = t.erroreaKalea;
    hayError = true;
  }

  const codigoPostalRegex = /^[A-Za-z0-9\s]{3,10}$/;
  if (!codigoPostalRegex.test(postaKodea)) {
    document.getElementById("postaKodearenLabela").textContent = t.erroreaPostaKodea;
    hayError = true;
  }

  if (!hayError) {
    alert(t.alertaOndo2); // ✅ Mostrar alerta de éxito
    document.getElementById("alertaFormulario").reset(); // ✅ Vaciar formulario
  } else {
    alert(t.alertaGaizki); // ⚠️ Mostrar alerta de error
  }
});
