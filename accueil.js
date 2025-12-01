const container = document.getElementById("para");
const elements = container.children;

for (let el of elements) {
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = "translateY(-20px) scale(0.8)";
  el.style.opacity = "0.7";

  el.addEventListener("mouseenter", () => {
    el.style.transform = "translateY(0) scale(1)";
    el.style.opacity = "1";
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translateY(-20px) scale(0.8)";
    el.style.opacity = "0.7";
  });
}
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
const content = document.querySelector("#content");
Object.assign(content.style, {
  opacity: "0",
  transform: "scale(0.95)",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  transformOrigin: "top center"
});
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
