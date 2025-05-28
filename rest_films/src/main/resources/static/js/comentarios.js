document.querySelector("#iruzkinFormulario").addEventListener("submit", function(e) {
    e.preventDefault(); // Evita que se envíe el formulario
  console.log("Formulario interceptado");
    // Restaurar los textos por defecto
    document.getElementById("izenarenLabela").textContent = "Izena:";
    document.getElementById("altitudearenLabela").textContent = "Altitudea:";
    document.getElementById("longitudearenLabela").textContent = "Longitudea:";
    document.getElementById("iruzkinLabela").textContent = "Idatzi hemen iruzkina:";

    let izena = document.getElementById("izena").value.trim();
    let altitudea = document.getElementById("altitudea").value.trim();
    let longitudea = document.getElementById("longitudea").value.trim();
    let iruzkin = document.getElementById("iruzkin").value.trim();
    let hayError = false;

    if (izena === "") {
      document.getElementById("izenarenLabela").textContent = "Izena: Izena sartu behar da";
      hayError = true;
    }

    if (!altitudea.includes(".")) {
      document.getElementById("altitudearenLabela").textContent = "Altitudea: Altitudea sartu behar da. Datu honek '.' izan behar du";
      hayError = true;
    }

    if (!longitudea.includes(".")) {
      document.getElementById("longitudearenLabela").textContent = "Longitudea: Longitudea sartu behar da. Datu honek '.' izan behar du";
      hayError = true;
    }

    if (iruzkin.length < 10) {
      document.getElementById("iruzkinLabela").textContent = "Iruzkinak: Iruzkinak gutxienez 10 karaktere izan behar ditu";
      hayError = true;
    }

    if (!hayError) {
      console.log("Ez Errorea dago");
      alert("Formulario enviado correctamente");
      // this.submit(); // Si tuvieras un backend
    } else {
      console.log("Errorea dago");
      alert("Zerbait gaizki dago. Jarraitu bete beharreko laukietako jarraibideak.");
    }
  });