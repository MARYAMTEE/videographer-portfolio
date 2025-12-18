let CLIENTS = {};

async function loadClients() {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    CLIENTS = data.clients;
  } catch (e) {
    alert("Failed to load client data");
    console.error(e);
  }
}

loadClients();

  /* SIMPLE CLIENT PAGE SYSTEM */
  const params = new URLSearchParams(window.location.search);
  const clientKey = params.get("client");
  let currentClient = null;

  function openLogin() {
    document.getElementById("landing").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  function login() {
  if (!CLIENTS[clientKey]) {
    alert("Invalid client link");
    return;
  }

  const client = CLIENTS[clientKey];

  // EXPIRY CHECK
  const now = new Date();
  const expiry = new Date(client.expiresAt);

  if (now > expiry) {
    alert("This gallery has expired. Please contact the creator.");
    return;
  }

  const input = document.getElementById("password").value;

  if (input === client.password) {
    currentClient = client;
    document.getElementById("login").style.display = "none";
    renderGallery(client);
  } else {
    alert("Incorrect password");
    document.getElementById("password").value = "";
    document.getElementById("password").focus();
  }
}

  /* GALLERY RENDERER */
  function renderGallery(client) {
    const gallery = document.getElementById("gallery");
    const grid = gallery.querySelector(".grid");

    gallery.querySelector("h2").textContent = client.title;
    grid.innerHTML = "";

    client.files.forEach(file => {
      const wrapper = document.createElement("div");

      if (file.type === "video") {
        wrapper.innerHTML = `
          <video controls preload="metadata">
            <source src="${file.src}" />
          </video>
          <a href="${file.src}" download class="download">Download original</a>
        `;
      } else {
        wrapper.innerHTML = `
          <img src="${file.src}" alt="Client file" />
          <a href="${file.src}" download class="download">Download original</a>
        `;
      }

      grid.appendChild(wrapper);
    });

    gallery.style.display = "block";
  }