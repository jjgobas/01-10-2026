gsap.registerPlugin(CustomEase, SplitText);

CustomEase.create("hop", "0.85, 0, 0.15, 1");

const counterProgress = document.querySelector(".counter h1");
const counter = { value: 0 };

document.addEventListener("DOMContentLoaded", () => {
  let split = SplitText.create(".hero-header h1", {
    type: "words",
    mask: "words",
    wordsClass: "word",
  });

  const counterT1 = gsap.timeline({ delay: 0.5 });
  const overlayTextT1 = gsap.timeline({ delay: 0.75 });
  const revealT1 = gsap.timeline({ delay: 0.5 });

  counterT1.to(counter, {
    value: 100,
    duration: 5,
    ease: "power2.out",
    onUpdate: () => {
      counterProgress.textContent = Math.floor(counter.value);
    },
  });

  overlayTextT1
    .to(".overlay-text", {
      y: "0",
      duration: 0.75,
      ease: "hop",
    })
    .to(".overlay-text", {
      y: "-2rem",
      duration: 0.75,
      ease: "hop",
      delay: 0.75,
    })
    .to(".overlay-text", {
      y: "-4rem",
      duration: 0.75,
      ease: "hop",
      delay: 0.75,
    });

  revealT1
    .to(".img", {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      duration: 1,
      ease: "hop",
    })
    .to(".hero-images", {
      gap: "0.75vw",
      duration: 1,
      delay: 0.5,
      ease: "hop",
    })
    .to(
      ".img",
      {
        scale: 1,
        duration: 1,
        ease: "hop",
      },
      "<"
    )
    .to(".img:not(.hero-img)", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1,
      ease: "hop",
    })
    .to(".hero-img", {
      scale: 2,
      duration: 1,
      ease: "hop",
    })
    .to(".hero-overlay", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "hop",
    })
    .to(
      ".hero-header h1 .word",
      {
        y: "0",
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );

  revealT1.eventCallback("onComplete", () => {
    launchConfetti();
  });
});

const heroImg = document.querySelector(".hero-img");
const messageContainer = document.querySelector(".message-container");

heroImg.addEventListener("click", () => {
  if (!messageContainer.classList.contains("show")) {
    // Show the modal
    messageContainer.classList.add("show");
    gsap.fromTo(
      messageContainer,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
  }
});

// Close when clicking anywhere on the container (overlay)
messageContainer.addEventListener("click", (e) => {
  // Only close if clicking outside the message box
  if (e.target === messageContainer) {
    gsap.to(messageContainer, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => messageContainer.classList.remove("show"),
    });
  }
});

function launchConfetti() {
  const defaults = {
    spread: 350,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 50,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };

  confetti({ ...defaults, particleCount: 75, scalar: 2 });
  confetti({ ...defaults, particleCount: 40, scalar: 3 });
  confetti({ ...defaults, particleCount: 10, scalar: 4 });
}
