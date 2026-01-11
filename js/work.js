const gallery = document.querySelector("#workGallery");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const clients = data.clients;

    Object.values(clients).forEach(client => {
      client.files.forEach((file, index) => {
        const card = document.createElement("div");
        card.className = "work__card";

        if (index % 2 === 0) {
          card.classList.add("animate-left")
        } else {
          card.classList.add("animate-right")
        }

        card.style.animationDelay = `${index * 0.12}s`;
        
        if (file.type === "video") {
          card.innerHTML = `
            <video class="work__media" poster="${file.poster}" controls preload="none" playsinline muted>
            <source src="${file.src}" type="video/mp4">
            </video>
            <div class="work__caption">${client.title}</div>
          `;
        }

        if (file.type === "image") {
          card.innerHTML = `
            <img class="work__media" src="${file.src}" alt="${client.title}" loading="lazy"/>
            <div class="work__caption">${client.title}</div>
          `;
        }

        gallery.appendChild(card);
      });
    });
  })
  .catch(err => {
    gallery.innerHTML = "<p>Unable to load work.</p>";
    console.error(err);
  });
