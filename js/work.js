const gallery = document.querySelector("#workGallery");

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const clients = data.clients;

    Object.values(clients).forEach(client => {
      client.files.forEach(file => {
        const card = document.createElement("div");
        card.className = "work__card";

        if (file.type === "video") {
          card.innerHTML = `
            <video class="work__media" src="${file.src}" controls preload="metadata" playsinline></video>
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

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function animateWorkCards() {
  const cards = document.querySelectorAll(".work__card");

  cards.forEach((card, index) => {
    // Alternate direction
    card.classList.add(
      index % 2 === 0 ? "from-left" : "from-right"
    );

    observer.observe(card);
  });
}
animateWorkCards();
