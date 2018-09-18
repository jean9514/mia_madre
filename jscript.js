// global variable af Array retter. samt variablen kategoriFilter
let modal = document.querySelector("#modal");
let retter = [];
let kategoriFilter = "alle";

// hele sidens content loades ved start
document.addEventListener("DOMContentLoaded", start);

// functionen start henter json filen
function start() {

    hentJson();
    forberedFiltrering();
}

function forberedFiltrering() {
    document.querySelectorAll("nav button").forEach(knap => {
        knap.addEventListener("click", () => {

            //filtrerings variablen. her filtreres efter hvilken data-kategori der er valgt ved CLICK.
            kategoriFilter = knap.getAttribute("data-genre");
            visRetter();
        });
    });

}


//definer functionen hentJson
async function hentJson() {

    // her skal vi hente Json filen ind ved at kalde på den.
    let myJsonData = await fetch("menu.json");

    //laver filen om til en json fil
    retter = await myJsonData.json();
    visRetter();
}


function visRetter() {

    // globale variabeler
    let display = document.querySelector(".menu-container");
    let temp = document.querySelector(".ret-template");

    display.textContent = "";

    //løb arry af retter igennem og overholdes betingelserne vises valgte variable.
    retter.forEach(ret => {

        if (ret.genre == kategoriFilter || kategoriFilter == "alle") {

            console.log(ret.genre, kategoriFilter);

            //  dest.textContent = "";

            // laver klon af indholdet i <article>
            let klon = temp.cloneNode(true).content;


            // Indsætter værdier i klon( navn, billede osv)
            klon.querySelector("h2").textContent = ret.navn;
            klon.querySelector(".ret-billede").src = "pics/" + ret.billede + ".png";

            //kalder funktionen visModal når der klikkes på knap.
            klon.querySelector(".ret-billede").addEventListener("click", () => {
                visModal(ret);
            })
            klon.querySelector(".ret-billede").alt = "billede af" + ret.billede;
            klon.querySelector(".ret-pris").textContent = ret.pris;
            klon.querySelector(".ret-genre").textContent = ret.genre;


            //VISER klon i html, altså klon bliver sat over i modtager dest, dest(ination) er her "menu-conteiner".
            display.appendChild(klon);
        }

    });
}

function visModal(retten) {

    //ved klik på billedet vises modal vindu med indhold.
    modal.classList.add("vis");
    modal.querySelector(".modal-navn").textContent = retten.navn;
    modal.querySelector(".modal-billede").src = "pics/" + retten.billede + ".png";
    modal.querySelector(".modal-beskrivelse").textContent = retten.beskrivelse;
    modal.querySelector(".modal-pris").textContent = retten.pris;


    //ved klik fjernes modal vindu med indholdet.
    modal.querySelector("button").addEventListener("click", skjulModal);
}

function skjulModal() {
    modal.classList.remove("vis");
}
