
/* ===================================
   PERSONAL SETTINGS
=================================== */

// বন্ধুর নাম এখানে পরিবর্তন করো।
const friend = {
  name: "My Brother"
};

// তোমার ছবির filename ও caption এখানে বদলাবে।



/* ===================================
   ELEMENTS
=================================== */

const opening = document.querySelector("#opening");
const openBtn = document.querySelector("#openBtn");
const mainContent = document.querySelector("#mainContent");

const letterBtn = document.querySelector("#letterBtn");
const letterContent = document.querySelector("#letterContent");

const wishBtn = document.querySelector("#wishBtn");
const wishMessage = document.querySelector("#wishMessage");
const flame = document.querySelector("#flame");

const confettiLayer = document.querySelector("#confettiLayer");

const passwordScreen = document.querySelector("#passwordScreen");
const passwordForm = document.querySelector("#passwordForm");
const passwordInput = document.querySelector("#passwordInput");
const passwordError = document.querySelector("#passwordError");

const togglePassword = document.querySelector("#togglePassword");

/* ===================================
   PERSONALIZE THE WEBSITE
=================================== */

document.querySelector("#friendName").textContent = friend.name;
document.querySelector("#finalName").textContent = friend.name;

document.title = `Happy Birthday, ${friend.name}! ❤️`;




/* ===================================
   OPENING SURPRISE
=================================== */

openBtn.addEventListener("click", () => {
  openBtn.disabled = true;
  opening.classList.add("is-closing");

  window.setTimeout(() => {
    opening.hidden = true;
    passwordScreen.hidden = false;

    passwordInput.focus();

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, 800);
});


/* ===================================
   PERSONAL LETTER
=================================== */

letterBtn.addEventListener("click", () => {
  const willOpen = letterContent.hidden;

  letterContent.hidden = !willOpen;

  letterBtn.innerHTML = willOpen
    ? 'Close My Letter <span>✕</span>'
    : 'Read My Letter <span>♥</span>';

  if (willOpen) {
    letterContent.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }
});


/* ===================================
   CANDLE & WISH
=================================== */

wishBtn.addEventListener("click", () => {
  if (flame.classList.contains("is-out")) {
    return;
  }

  flame.classList.add("is-out");

  wishMessage.textContent =
    "Ameen! 🤍 May Allah bless you with happiness, success and goodness in this life and the Hereafter.";

  wishBtn.textContent = "Wish Made! ❤️";
  wishBtn.disabled = true;

  wishBtn.style.opacity = "0.65";
  wishBtn.style.cursor = "default";

  createConfetti();
});


/* ===================================
   CONFETTI CELEBRATION
=================================== */

function createConfetti() {
  const colors = [
    "#a78bfa",
    "#f472b6",
    "#fbbf24",
    "#67e8f9",
    "#ffffff"
  ];

  const totalPieces = 100;

  for (let i = 0; i < totalPieces; i++) {
    const piece = document.createElement("span");

    piece.className = "confetti-piece";

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.setProperty(
      "--fall-duration",
      `${2.2 + Math.random() * 2.5}s`
    );

    piece.style.setProperty(
      "--drift",
      `${(Math.random() - 0.5) * 240}px`
    );

    piece.style.setProperty(
      "--rotation",
      `${Math.random() * 900}deg`
    );

    confettiLayer.appendChild(piece);

    piece.addEventListener("animationend", () => {
      piece.remove();
    }, { once: true });
  }
}


/* ===================================
   REPLAY
=================================== */

document.querySelector("#replayBtn").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });

  // Reload করে opening surprise আবার শুরু হবে।
  window.location.reload();
});


/* ===== Scroll-triggered Animations ===== */

const revealElements = document.querySelectorAll(
  ".birthday-note, .letter-card, .cake-section, .finale"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }

      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* ===== Password Verification ===== */

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredPassword = passwordInput.value;

  if (enteredPassword === "saad2005") {
    passwordError.hidden = true;
    passwordScreen.hidden = true;
    mainContent.hidden = false;

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  } else {
    passwordError.hidden = false;
    passwordInput.value = "";
    passwordInput.focus();
  }
});


/* ===== Show / Hide Password ===== */

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  passwordInput.type = isHidden ? "text" : "password";

  togglePassword.textContent = isHidden ? "🙈" : "👁";

  togglePassword.setAttribute(
    "aria-label",
    isHidden ? "Hide password" : "Show password"
  );
});



