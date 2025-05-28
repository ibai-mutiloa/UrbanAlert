document.querySelector("#iruzkinFormulario").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se envíe el formulario
    /*console.log("Formulario interceptado");
    // Restaurar los textos por defecto
    document.getElementById("herrialdearenLabela").textContent = "Herrialdea:";
    document.getElementById("hiriarenLabela").textContent = "Hiria/Herria:";
    document.getElementById("kalearenLabela").textContent = "Kalea:";
    document.getElementById("postaKodearenLabela").textContent = "Posta-kodea:";
    document.getElementById("motaDelituarenLabela").textContent = "Aukeratu delitu mota:";
    document.getElementById("datarenLabela").textContent = "Data:";
    document.getElementById("iruzkinLabela").textContent = "Idatzi hemen iruzkina:";
    document.getElementById("balorazioarenLabela").textContent = "Baloratu delitua (1-txikia, 5-grabe):";
    */

    const t = traducciones[idiomaActual]
    let herrialdea = document.getElementById("herrialdea").value.trim();
    let hiria = document.getElementById("hiria").value.trim();
    let kalea = document.getElementById("kalea").value.trim();
    let postaKodea = document.getElementById("postaKodea").value.trim();
    let data = document.getElementById("data").value.trim();
    let iruzkin = document.getElementById("iruzkin").value.trim();
    let hayError = false;
    let balorazioa = document.getElementById("balorazioa").value;
    let motaDelitua = document.getElementById("motaDelitua").value;


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
    if (data === "") {
        document.getElementById("datarenLabela").textContent = t.erroreaData;
        hayError = true;
    }


    if (motaDelitua === "") {
    document.getElementById("motaDelituarenLabela").textContent = t.erroreaMotaDelitua;
    hayError = true;
    }

    if (postaKodea.length != 5) {
        document.getElementById("postaKodearenLabela").textContent = t.erroreaPostaKodea;
        hayError = true;
    }

    if (iruzkin.length < 10) {
        document.getElementById("iruzkinLabela").textContent = t.erroreaIruzkina;
        hayError = true;
    }
    

    if (balorazioa === "") {
    document.getElementById("balorazioarenLabela").textContent = t.erroreaBalorazioa;
    hayError = true;
    }

    if (!hayError) {
        alert(t.alertaOndo);
        // this.submit(); // Si tuvieras un backend
    } else {
        alert(t.alertaGaizki);
    }
});