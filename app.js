let screen = "splash";
let theme = "light";
let language = "fr";
let selectedService = null;
let selectedModel = null;

const services = [
  { id: "logo", name: "Création de logo", icon: "🎨" },
  { id: "card", name: "Carte de visite", icon: "💼" },
  { id: "wedding", name: "Carte de mariage", icon: "💑" },
  { id: "poster", name: "Affiche", icon: "📋" },
  { id: "label", name: "Étiquette", icon: "🏷️" },
  { id: "video", name: "Montage vidéo", icon: "🎬" },
  { id: "web", name: "Création web", icon: "🌐" },
  { id: "ad", name: "Publicité IA", icon: "🤖" }
];

const models = ["⭐ Modèle 1","✨ Modèle 2","🌟 Modèle 3","💎 Modèle 4","🎯 Modèle 5"];

function render() {
  document.body.className = theme;
  const app = document.getElementById("app");

  if (screen === "splash") {
    app.innerHTML = `
      <div class="container">
        <div class="card">
          <div class="title">MEDPRO SERVICE</div>
          <button class="primary" onclick="goPassword()">Commencer</button>
        </div>
      </div>
    `;
  }

  if (screen === "password") {
    app.innerHTML = `
      <div class="container">
        <div class="card">
          <div class="title">Créer mot de passe</div>
          <input id="pass1" type="password" placeholder="Mot de passe">
          <input id="pass2" type="password" placeholder="Confirmer">
          <button class="primary" onclick="savePassword()">Créer</button>
        </div>
      </div>
    `;
  }

  if (screen === "main") {
    app.innerHTML = `
      <div class="header">
        <strong>MEDPRO</strong>
        <button onclick="toggleTheme()">🌗</button>
      </div>

      <div class="grid">
        ${services.map(s => `
          <div class="service" onclick="openService('${s.id}')">
            <div style="font-size:32px">${s.icon}</div>
            ${s.name}
          </div>
        `).join("")}
      </div>
    `;
  }

  if (selectedModel) {
    app.innerHTML += `
      <div class="popup">
        <div class="popup-box">
          <h3>Voulez-vous ce modèle ?</h3>
          <p style="font-size:40px;text-align:center">${selectedModel}</p>
          <button class="primary" onclick="contact()">Oui</button>
          <button onclick="closePopup()">Non</button>
        </div>
      </div>
    `;
  }
}

function goPassword() {
  const saved = localStorage.getItem("medpro_pass");
  screen = saved ? "main" : "password";
  render();
}

function savePassword() {
  const p1 = document.getElementById("pass1").value;
  const p2 = document.getElementById("pass2").value;
  if (p1 !== p2 || p1.length < 4) {
    alert("Mot de passe invalide");
    return;
  }
  localStorage.setItem("medpro_pass", p1);
  screen = "main";
  render();
}

function openService(id) {
  selectedService = services.find(s => s.id === id);
  selectedModel = models[0];
  render();
}

function closePopup() {
  selectedModel = null;
  render();
}

function contact() {
  const msg = `Bonjour je veux ${selectedService.name}`;
  window.open(`https://wa.me/22785720680?text=${encodeURIComponent(msg)}`);
  closePopup();
}

function toggleTheme() {
  theme = theme === "light" ? "dark" : "light";
  render();
}

render();