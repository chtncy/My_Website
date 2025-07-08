let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + " ] ")
          .classList.add("active");
      });
    }
  });
};
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const statusEl = document.getElementById("form-status");
    statusEl.textContent = "Sending…";

    const formData = new FormData(this);

    try {
      const res = await fetch("https://formspree.io/f/meokbeep", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        statusEl.textContent = "Message sent successfully!";
        this.reset();

        setTimeout(() => {
          statusEl.textContent = "";
        }, 5000);
      } else {
        const data = await res.json();
        statusEl.textContent = data.error || "Oops! There was a problem.";
      }
    } catch (err) {
      statusEl.textContent = "Connection error. Please try again.";
    }
  });
