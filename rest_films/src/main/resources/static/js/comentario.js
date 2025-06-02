document.querySelector("#iruzkinFormulario").addEventListener("submit", function (e) {
    e.preventDefault();
    const t = traducciones[idiomaActual];

    console.log("Formulario enviado");

    // Limpia mensajes de error antes de validar
    const camposError = [
        "herrialdearenLabela",
        "hiriarenLabela",
        "kalearenLabela",
        "postaKodearenLabela",
        "datarenLabela",
        "motaDelituarenLabela",
        "iruzkinLabela",
        "balorazioarenLabela"
    ];
    camposError.forEach(id => {
        document.getElementById(id).textContent = "";
    });

    let herrialdea = document.getElementById("herrialdea").value.trim();
    let hiria = document.getElementById("hiria").value.trim();
    let kalea = document.getElementById("kalea").value.trim();
    let postaKodea = document.getElementById("postaKodea").value.trim();
    let data = document.getElementById("data").value.trim();
    let iruzkin = document.getElementById("iruzkin").value.trim();
    let balorazioa = document.getElementById("balorazioa").value;
    let motaDelitua = document.getElementById("motaDelitua").value;

    console.log("Datos recogidos:");
    console.log({ herrialdea, hiria, kalea, postaKodea, data, iruzkin, balorazioa, motaDelitua });

    let hayError = false;

    if (herrialdea === "") {
        console.warn("Error: herrialdea vacío");
        document.getElementById("herrialdearenLabela").textContent = t.erroreaHerrialdea;
        hayError = true;
    }
    if (hiria === "") {
        console.warn("Error: hiria vacío");
        document.getElementById("hiriarenLabela").textContent = t.erroreaHiria;
        hayError = true;
    }
    if (kalea === "") {
        console.warn("Error: kalea vacío");
        document.getElementById("kalearenLabela").textContent = t.erroreaKalea;
        hayError = true;
    }
    if (data === "") {
        console.warn("Error: data vacío");
        document.getElementById("datarenLabela").textContent = t.erroreaData;
        hayError = true;
    }
    if (motaDelitua === "") {
        console.warn("Error: motaDelitua vacío");
        document.getElementById("motaDelituarenLabela").textContent = t.erroreaMotaDelitua;
        hayError = true;
    }
    // Validación de código postal
    const codigoPostalRegex = /^[A-Za-z0-9\s]{3,10}$/;
    if (!codigoPostalRegex.test(postaKodea)) {
        console.warn("Error: postaKodea no válido");
        document.getElementById("postaKodearenLabela").textContent = t.erroreaPostaKodea;
        hayError = true;
    }

    if (iruzkin.length < 10) {
        console.warn("Error: iruzkin demasiado corto");
        document.getElementById("iruzkinLabela").textContent = t.erroreaIruzkina;
        hayError = true;
    }
    if (balorazioa === "") {
        console.warn("Error: balorazioa vacío");
        document.getElementById("balorazioarenLabela").textContent = t.erroreaBalorazioa;
        hayError = true;
    }

    if (!hayError) {
        const comentario = {
            country: herrialdea,
            city: hiria,
            street: kalea,
            postalCode: postaKodea,
            crimeType: motaDelitua,
            date: data,
            text: iruzkin,
            rating: Number(balorazioa)
        };

        console.log("Enviando comentario al backend:", comentario);

        fetch("http://localhost:8080/api/comments", {  // Asegúrate de esto
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comentario)
        })
        .then(response => {
            console.log("Respuesta del servidor:", response.status);
            if (response.ok) {
                alert(t.alertaOndo);
                document.getElementById("iruzkinFormulario").reset();
            } else {
                alert(t.alertaGaizki);
            }
        })
        .catch(error => {
            console.error("Error en fetch:", error);
            alert(t.alertaGaizki);
        });
    } else {
        console.warn("Formulario con errores, no se envía");
        alert(t.alertaGaizki);
    }
});
