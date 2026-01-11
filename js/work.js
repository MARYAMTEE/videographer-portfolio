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
          <a href="${file.src}" target="_blank" class="video__link">
            <div class="video__wrapper">
              <img src="${file.poster}" alt="${client.title}" class="work__media">
              <div class="play__overlay">
                <i class="fa-solid fa-play play__overlay-content"></i>
              </div>
            </div>
          </a>
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
