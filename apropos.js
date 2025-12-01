// Création du rideau
const curtain = document.createElement("div");
document.body.appendChild(curtain);
Object.assign(curtain.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "#111",
  zIndex: "9999"
});

// Contenu de la page
const content = document.querySelector("#content");
Object.assign(content.style, {
  opacity: "0",
  transform: "scale(0.95)",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  transformOrigin: "top center"
});

// Animation d'ouverture (au chargement de la page)
window.addEventListener("load", () => {
  curtain.style.height = "100%";
  curtain.style.transition = "height 0s"; // instant initial
  requestAnimationFrame(() => {
    curtain.style.transition = "height 0.3s ease-out";
    curtain.style.height = "0%";
    setTimeout(() => {
      content.style.opacity = "1";
      content.style.transform = "scale(1)";
      document.body.style.overflow = "auto";
    }, 300);
  });
});

// Animation au clic sur lien de navigation
const links = document.querySelectorAll(".nav-link");
links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.href;

    curtain.style.display = "block";
    curtain.style.transition = "height 0.3s ease-in";
    curtain.style.height = "0%";

    let height = 0;
    let scale = 1;
    let opacity = 1;

    function animate() {
      height += 5;
      scale -= 0.02;
      opacity -= 0.05;

      curtain.style.height = height + "%";
      content.style.transform = `scale(${scale})`;
      content.style.opacity = opacity;

      if (height >= 100) {
        window.location.href = url;
      } else {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  });
});
