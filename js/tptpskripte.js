// Registracija Service Workera
if ('serviceWorker' in navigator) { // Proveravamo da li browser podržava Service Workere
  window.addEventListener('load', () => {// Registrujemo Service Worker nakon što se stranica učita
    navigator.serviceWorker.register('./sw.js') 
      .then(reg => {
        console.log('Service Worker registrovan!', reg);
        // Proveravamo da li postoji update
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('Novi Service Worker je dostupan!');
            }
          });
        });
      })
      .catch(err => {
        console.error('Greška pri registraciji SW:', err);
        console.error('Detalji greške:', err.message, err.stack);
      });
  });
} else {
  console.warn('Service Worker nije podržan u ovom browser-u');
}

// Tamni mod toggle
const buttons = document.querySelectorAll('#dark-mode-toggle');
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

// Primjena teme prilikom učitavanja stranice
const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

// Ažuriraj sve toggle dugmiće (u slučaju da je header prisutan više puta)
function updateToggleButtons(theme) {
    buttons.forEach(b => {
        if (theme === 'dark') {
            b.textContent = 'Svijetli mod';
            b.setAttribute('aria-pressed', 'true');
        } else {
            b.textContent = 'Tamni mod';
            b.setAttribute('aria-pressed', 'false');
        }
    });
}

buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isDark = document.body.classList.toggle('dark-mode');
        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateToggleButtons(theme);
    });
});

// Postavi inicijalnu oznaku na dugmićima
updateToggleButtons(savedTheme);

// Slušamo promjene u localStorage da bismo sinhronizovali temu između različitih tabova
window.addEventListener("storage", (e) => {
    if (e.key === "theme") {
        applyTheme(e.newValue || "light");
        updateToggleButtons(e.newValue || 'light');
    }
});

//Kod za filtriranje proizvoda
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

const brojac = document.getElementById("product-count");
if(brojac) {
brojac.textContent = productCards.length; // Postavljamo broj proizvoda u element sa id "product-count" na broj kartica proizvoda
}
function azurirajBrojac() {
    let brojVidljivih = 0;
    productCards.forEach(card => {
        if (card.style.display !== "none") {
            brojVidljivih++;
        }
        if(brojac) {
            brojac.textContent = brojVidljivih; // Ažuriramo broj vidljivih proizvoda
        } 
    });
}
azurirajBrojac(); // Pozivamo funkciju da postavi početni broj proizvoda


filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filterValue = button.getAttribute("data-filter");
        productCards.forEach(card => {
            if (filterValue === "all" || filterValue=== card.getAttribute("data-category")) {
                card.style.display = "block"; // Prikazujemo karticu ako se poklapa ili ako je filter "all"
            } 
            else {
                card.style.display = "none"; // Sakrivamo karticu ako se ne poklapa
            }
        });
        azurirajBrojac(); // Ažuriramo broj vidljivih proizvoda nakon filtriranja
    });
});
// Kod za čuvanje korisničkog imena u localStorage
const spasiDugme =document.getElementById("spasiDugme");
const unosIme = document.getElementById("korisnickoIme");
spasiDugme.addEventListener("click", () => {
    const ime = unosIme.value;
    localStorage.setItem("korisnik", ime);
    alert("Korisničko ime sačuvano: " + ime);

});

window.onload = () => {
    const sacuvanoIme = localStorage.getItem("korisnik");
    if (sacuvanoIme) {
        alert("Dobrodošli nazad, " + sacuvanoIme + "!");
    }
};

const kontaktForma = document.getElementById("kontaktForma");
if(kontaktForma) { // Proveravamo da li forma postoji na stranici
    kontaktForma.addEventListener("submit", function(e) { // Dodajemo event listener za submit događaj na formu
        e.preventDefault();
        let validno=true;
        //Provjera imena
        const ime = document.getElementById("ime").value;
        const imeGreska = document.getElementById("imeGreska");
        if(ime.length <2) {
            imeGreska.textContent = "Ime mora biti barem 2 karaktera.";
            validno=false;
        } else {
            imeGreska.textContent = "";
        }

        //Provjera prezimena
        const prezime=document.getElementById("prezime").value;
        const prezimeGreska=document.getElementById("prezimeGreska");
        if(prezime.length <2) {
            prezimeGreska.textContent = "Prezime mora biti barem 2 karaktera.";
            validno=false;
        } else {
            prezimeGreska.textContent = "";
        }

        //Provjera emaila
        const email=document.getElementById("email").value;
        const emailGreska=document.getElementById("emailGreska");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex za validaciju emaila urađen pomoću copilota
        if(!emailRegex.test(email)) {
            emailGreska.textContent = "Unesite validnu email adresu.";
            validno=false;
        } else {
            emailGreska.textContent = "";
        }

        //Provjera telefona
        const telefon=document.getElementById("telefon").value;
        const telefonGreska=document.getElementById("telefon-greska");
        const telefonRegex =/^(?:\+?\d{1,3})?[-.\s]?(?:\d{2,3}|\(\d{2,3}\))[-.\s]?\d{3}[-.\s]?\d{3,4}$/; // Regex za validaciju telefona napravljen pomoćšu copilota, podržava različite formate telefona
        if(!telefonRegex.test(telefon)) {
            telefonGreska.textContent = "Unesite validan broj telefona.";
            validno=false;
        } else {
            telefonGreska.textContent = "";
        }
        //Provjera teme
        const tema=document.getElementById("tema").value;
        const temaGreska=document.getElementById("temaGreska");
        if(tema === "") {
            temaGreska.textContent = "Molimo odaberite temu.";
            validno=false;
        } else{
            temaGreska.textContent = "";
        }

        //Ako je sve validno
        if(validno){
            const uspjehOkvir=document.getElementById("uspjehOkvir");
            uspjehOkvir.textContent = "Hvala vam "+ime+". Vaša poruka je uspješno poslana!";
            uspjehOkvir.style.display = "block";
            kontaktForma.reset(); // Resetujemo formu nakon uspješnog slanja
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
