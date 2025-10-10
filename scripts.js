// photos page
function filterPhotos(category) {
  const items = document.querySelectorAll(".photos-gallery-item");
  items.forEach(item => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// study abroad page
let currentIndex = 0;
const carousel = document.querySelector(".carousel");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;
const itemWidth = items[0]?.clientWidth + 20;

items.forEach((item) => {
  const clone = item.cloneNode(true);
  carousel.appendChild(clone);
});

const totalClones = carousel?.children.length ?? 0;

if (carousel){
  carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function moveCarousel(direction) {
  currentIndex += direction;

  if (currentIndex >= totalItems) {
    currentIndex = 0;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(0px)`;
    setTimeout(() => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      moveCarousel(direction);
    }, 0);
  } else if (currentIndex < 0) {
    currentIndex = totalItems - 1;
    carousel.style.transition = "none";
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    setTimeout(() => {
      carousel.style.transition = "transform 0.5s ease-in-out";
      moveCarousel(direction);
    }, 0);
  } else {
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }
}

// used for both study abroad and photos page

function showDescription(title, description) {
  document.getElementById("image-title").textContent = title;
  document.getElementById("image-description").textContent = description;
}

// light and dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  function initializeToggle() {
    const toggleSwitch = document.getElementById("modeToggle");
    const cordString = document.querySelector('.cord-string');
    if (!toggleSwitch) {
      console.error("Toggle switch not found.");
      return;
    }

    const currentMode = localStorage.getItem("theme");
    if (currentMode) {
      document.body.classList.add(currentMode);
      toggleSwitch.checked = currentMode === "dark-mode";
    }

    toggleSwitch.addEventListener("change", () => {
      // Cord pull animation
      if (cordString) {
        cordString.classList.remove('pulling');
        // Force reflow for restart animation
        void cordString.offsetWidth;
        cordString.classList.add('pulling');
      }

      if (toggleSwitch.checked) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark-mode");
      } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
      }
    });
  } 

function loadHTML(elementId, url) {
  return fetch(url)
    .then(response => response.text())
    .then(html => {
      document.querySelector(elementId).innerHTML = html;
    });
}

// mute functionality on photos page
const allvideos = Array.from(document.querySelectorAll(".hover-video"));
console.log(allvideos);
allvideos.forEach((vid) => {
  vid.addEventListener("mouseover", (event) => {
    allvideos
      .filter((v) => v != vid)
      .forEach((v) => {
        const video = v.querySelector("video");
        video.muted = true;
      });
    const video = vid.querySelector("video");
    video.muted = false;
  });
});

// Mute all videos and pause all audio when any video is clicked
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', () => {
      // Toggle mute for the clicked video
      video.muted = !video.muted;

      // Optionally, pause all audio when video is clicked
      document.querySelectorAll('audio').forEach(a => a.pause());
    });
  });

// Load header and footer HTML
Promise.all([                                                                                                                                                                                                                                                                                                                                                                                                             
  loadHTML("header", "header.html"),
  loadHTML("footer", "footer.html")
]).then(() => {
  initializeToggle();
  if (typeof initializeWaffleMenu === "function") initializeWaffleMenu();
  initializePageFeatures();

  // Attach Snake modal triggers here!
  const openBtn = document.getElementById('openSnakeBtn');
  const logoTrigger = document.getElementById('snakeLogoTrigger');
  const headerLogo = document.getElementById('headerLogoSnake');
  const modal = document.getElementById('snakeModal');
  const closeBtn = document.getElementById('closeSnakeBtn');

  function openSnakeModal() {
    if (modal) {
      modal.classList.add('active');
      const playAgainBtn = document.getElementById('snakePlayAgainBtn');
      if (playAgainBtn) playAgainBtn.style.display = 'none';
      startSnakeGame();
    }
  }

  if (openBtn) openBtn.addEventListener('click', openSnakeModal);
  if (logoTrigger) logoTrigger.addEventListener('click', openSnakeModal);
  if (headerLogo) headerLogo.addEventListener('click', openSnakeModal);
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});

  function initializePageFeatures() {
    // Typing effect for homepage
    const typingPhrases = [
      "Hello! My name is Gianna Fernandez. I am studying Computer Engineering.",
      "¡Hola! Me llamo Gianna Fernández. Estoy estudiando ingeniería informática.",
      "¡Γειά σας! Mε λένε Γίαννα Φερνανδεζ. Σπουδάζω μηχανικός ιπολογιστών."
    ];
    const typingText = document.getElementById("typing-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    if (typingText) {
      typingText.innerHTML = "";
      const textNode = document.createTextNode("");
      const cursorSpan = document.createElement("span");
      cursorSpan.className = "typing-cursor";
      cursorSpan.textContent = "|";
      typingText.appendChild(textNode);
      typingText.appendChild(cursorSpan);

      function type() {
        if (!typingText) return;
        if (typing) {
          if (charIndex < typingPhrases[phraseIndex].length) {
            textNode.textContent += typingPhrases[phraseIndex][charIndex];
            charIndex++;
            setTimeout(type, 40);
          } else {
            typing = false;
            setTimeout(type, 1200);
          }
        } else {
          if (charIndex > 0) {
            textNode.textContent = typingPhrases[phraseIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 40);
          } else {
            typing = true;
            phraseIndex = (phraseIndex + 1) % typingPhrases.length;
            setTimeout(type, 400);
          }
        }
      }

      type();
      setInterval(() => {
        cursorSpan.style.opacity = cursorSpan.style.opacity === "0" ? "1" : "0";
      }, 500);
    }

    // Chatbot initialization
    if (typeof initializeChatbot === "function") {
      initializeChatbot();
    }
  }

  initializePageFeatures();

  function initializeChatbot() {
    const chatbotBtn = document.getElementById("chatbot-btn");
    const chatbotPopup = document.getElementById("chatbot-popup");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    if (chatbotBtn && chatbotPopup && chatbotClose && chatbotForm && chatbotInput && chatbotMessages) {
      chatbotBtn.addEventListener("click", () => {
        chatbotPopup.classList.add("active");
        chatbotInput.focus();
      });
      chatbotClose.addEventListener("click", () => {
        chatbotPopup.classList.remove("active");
      });

      chatbotForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userMsg = chatbotInput.value.trim();
        if (!userMsg) return;
        appendMessage("user", userMsg);
        chatbotInput.value = "";
        setTimeout(() => {
          appendMessage("bot", getBotResponse(userMsg));
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 600);
      });

      function appendMessage(sender, text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = `chatbot-message ${sender}`;
        msgDiv.textContent = text;
        chatbotMessages.appendChild(msgDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Save to localStorage
        saveChatHistory();
      }

      function saveChatHistory() {
        const messages = [];
        chatbotMessages.querySelectorAll('.chatbot-message').forEach(msg => {
          messages.push({
            sender: msg.classList.contains('user') ? 'user' : 'bot',
            text: msg.textContent
          });
        });
        localStorage.setItem('chatbotHistory', JSON.stringify(messages));
      }

      // Restore chat history
      const saved = localStorage.getItem('chatbotHistory');
      if (saved) {
        JSON.parse(saved).forEach(msg => {
          const msgDiv = document.createElement("div");
          msgDiv.className = `chatbot-message ${msg.sender}`;
          msgDiv.textContent = msg.text;
          chatbotMessages.appendChild(msgDiv);
        });
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }

//review before push

      function getBotResponse(input) {
        input = input.toLowerCase();
        // about me
        if (input.includes("name") || input.includes("about")) return "I'm Gianna Fernandez, a Computer Engineering student at UF!";
        if (input.includes("about me") || input.includes("who are you")) return "I'm Gianna Fernandez, a Computer Engineering student at the University of Florida with a passion for coding, dance, and cultural exploration!";
        if (input.includes("hometown") || input.includes("from")) return "I'm originally from Miami, Florida, but moved to Melbourne, Florida in middle school. Feel free to read more about my background on the About Me page!";
        if (input.includes("age") || input.includes("old")) return "I'm 20 years old.";
        if (input.includes("family") || input.includes("background")) return "I come from a multicultural background with Cuban and Greek heritage, which has greatly influenced my interests and activities.";
        // academics
        if (input.includes("major") || input.includes("study")) return "I'm majoring in Computer Engineering and minoring in Sales Engineering at the University of Florida.";
        if (input.includes("minor")) return "I'm pursuing a minor in Sales Engineering to complement my Computer Engineering major.";
        if (input.includes("why computer engineering") || input.includes("why ce") || input.includes("why cpe")) return "I chose Computer Engineering because I love problem-solving and creating technology that can make a difference in people's lives.";
        if (input.includes("uf") || input.includes("university of florida")) return "I'm studying at the University of Florida, where I'm majoring in Computer Engineering and minoring in Sales Engineering. I am also getting a certificate in Artificial Intelligence.";
        if (input.includes("graduation") || input.includes("graduate")) return "I plan to graduate in Spring 2027 with a degree in Computer Engineering and a minor in Sales Engineering.";
        if (input.includes("ai ") || input.includes("artificial intelligence") || input.includes("certificate")) return "I'm interested in AI, and am pursuing UF’s Artificial Intelligence Certificate!";
        // extracurriculars and clubs
        if (input.includes("extracurricular") || input.includes("activities")) return "I'm involved in several extracurricular activities including cultural clubs, dance, and coding projects.";
        if (input.includes("clubs") ||input.includes("club") || input.includes("involvement")) return "I'm involved in several clubs including the Greek American Student Association and the Cuban American Student Association.";
        if (input.includes("gasa") || input.includes("greek american student association")) return "I'm an active member of the Greek American Student Association (GASA) at UF, where I participate in cultural events and community service.";
        if (input.includes("casa") || input.includes("cuban american student association")) return "I'm involved in the Cuban American Student Association (CASA) at UF, where I enjoy celebrating Cuban culture and traditions.";
        if (input.includes("osc" || input.includes("open source club"))) return "I'm a member of the Open Source Club (OSC) at UF, where we focus on creating personal projects, and play intramural soccer.";
        if (input.includes("dance team") || input.includes("dance")) return "I am part of a couple cultural dance teams, including afieroma for greek dancing and Gator Salsa for casino salsa performing dances at various events.";
        // study abroad and travel
        if (input.includes("greece") || (input.includes("abroad")) && (input.includes("study")) && (input.includes("class") || input.includes("course"))) return "While studying abroad in Greece, I took courses in International Business and Social Media Marketing.";
        if (input.includes("abroad") || input.includes("greece")) return "I studied abroad at the American College of Greece in 2024. Ask me about my favorite experiences!";
        if (input.includes("travel") || input.includes("trip")) return "I've traveled to Greece, Spain, and many more countries! Ask me about my favorite trip!";
        if (input.includes("favorite place") || input.includes("place")) return "One of my favorite places is Greece, especially the beautiful islands like Milos and Santorini.";
        if (input.includes("food") && (input.includes("greece") || input.includes("abroad"))) return "I loved trying all the delicious Greek food while studying abroad! Gyros and Souvlaki were some of my favorites.";
        // professional experience and projects
        if (input.includes("project")) return "Check out my projects page for details on my coding and club projects!";
        if (input.includes("contact")) return "You can reach me at giannaef27@gmail.com or via LinkedIn!";
        if (input.includes("linkedin")) return 'You can find my LinkedIn profile at https://www.linkedin.com/in/gef5027/';
        if (input.includes("email")) return "Feel free to email me at giannaef27@gmail.com.";
        if (input.includes("resume") || input.includes("cv")) return "You can view and download my resume from the Resume page.";
        if (input.includes("language") && input.includes("speak")) return "I speak English, Spanish, and Greek. I love learning new languages!";
        if (input.includes("language") && ((input.includes("programming") || input.includes("code")))) return "I code in Python, JavaScript, C++, MATLAB, and SQL. I'm also learning more languages.";
        if (input.includes("language")) return "I am trilingual and speak English, Spanish and Greek. I enjoy coding in Python and JavaScript, and have experience with C++, MATLAB, React, and SQL.";
        if (input.includes("future") || input.includes("career")) return "I aspire to work in tech, focusing on AI and software development, while also leveraging my sales engineering skills.";
        if (input.includes("work experience") || input.includes("work")) return "I have experience in coding projects, cultural clubs, and sales engineering through my minor. I currently work as a sdudent assistaint at UFIT. Feel free to check out my resume page for my professional experience!";
        if (input.includes("job") || input.includes("internship") || input.includes("work")) return "I'm looking for internships and job opportunities in software development and AI. Feel free to reach out if you know of any!";
        if (input.includes("goals") || input.includes("aspirations")) return "My goals include graduating with honors, gaining experience in AI, and making a positive impact through technology.";
        if (input.includes("skills") || input.includes("strengths")) return "My strengths include problem-solving, coding in different languages, and effective communication.";
        // call to other places on the site
        if (input.includes("website") || input.includes("site")) return "This is my personal website where you can learn more about me, my projects, and my experiences!";
        if (input.includes("photos") || input.includes("gallery")) return "Check out my photos page to see my travels and experiences!";
        if (input.includes("projects") || input.includes("portfolio")) return "Visit my projects page to see my coding work and club projects!";
        // personal interests and fun
        if (input.includes("music") || input.includes("song")) return "I enjoy a variety of music, especially Latin and Greek music. Some of my favorite artists are Bad Bunny, Konstantinos Argiros, and Despina Vandi.";
        if (input.includes("dance")) return "I love cultural dancing! I perform both Greek and Cuban dances.";
        if (input.includes("favorite") || input.includes("like") || input.includes("hobbies") || input.includes("interests")) return "I love coding, dancing, and learning about different cultures!";
        if (input.includes("favorite food") || input.includes("food")) return "I love Greek and Cuban cuisine! Moussaka and Ropa Vieja are two of my favorites.";
        if (input.includes("hobby") || input.includes("hobbies")) return "My hobbies include coding, dancing, exploring new cultures, and traveling.";
        // other
        if (input.includes("hello") || input.includes("hi") || input.includes("hey")) return "Hello! How can I help you learn more about me?";
        return "I'm happy to answer questions about my background, experiences, or time abroad. Try asking about my studies, clubs, or travels!";
      }
    }
  }

// Snake Game
  function startSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const box = 30;
    let snake = [{ x: 9 * box, y: 12 * box }];
    let curDirection = 'RIGHT';
    let newDirection = curDirection;
    let score = 0;
    let gameOver = false;

    // High score from localStorage
    let highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;

    // Use logo or flag emoji as fruit
    const fruitImages = [
      "content/Images/BoL.png",
      "content/Images/logo.png",
      "content/Images/osc.png",
      "content/Images/Just_Stop.png",
      "content/Images/t_logo.png",
      "content/Images/mythos_logo.png",
      "content/Images/cq_logo.png",
      "content/Images/fg_logo.png",
      "content/Images/gl-logo.png",
      // "🇺🇸",
      // "🇨🇺",
      // "🇬🇷",
      // "🇪🇸",
    ];
    shuffleArray(fruitImages); // Randomize fruit order

    let fruitType = 0;
    let fruit = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    // Play Again button
    const playAgainBtn = document.getElementById('snakePlayAgainBtn');
    if (playAgainBtn) playAgainBtn.style.display = 'none';

    document.addEventListener('keydown', function(e) {
      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", "w", "s", "a", "d"].includes(e.key)) {
        e.preventDefault();
        if (gameOver) return;
        if ((e.key === 'ArrowLeft' || e.key === 'a') && curDirection !== 'RIGHT') newDirection = 'LEFT';
        if ((e.key === 'ArrowUp' || e.key === 'w') && curDirection !== 'DOWN') newDirection = 'UP';
        if ((e.key === 'ArrowRight' || e.key === 'd') && curDirection !== 'LEFT') newDirection = 'RIGHT';
        if ((e.key === 'ArrowDown' || e.key === 's') && curDirection !== 'UP') newDirection = 'DOWN';
      }
    });

    // Expose setter for mobile controls
    window.setSnakeDirection = function(dir) {
      if (dir === 'LEFT' && curDirection !== 'RIGHT') newDirection = 'LEFT';
      if (dir === 'RIGHT' && curDirection !== 'LEFT') newDirection = 'RIGHT';
      if (dir === 'UP' && curDirection !== 'DOWN') newDirection = 'UP';
      if (dir === 'DOWN' && curDirection !== 'UP') newDirection = 'DOWN';
    };

    function draw() {
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--switch-bg') || '#f5f5f6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0
          ? getComputedStyle(document.body).getPropertyValue('--body')
          : getComputedStyle(document.body).getPropertyValue('--title');
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--back');
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      // Draw fruit (logo or emoji)
      if (fruitImages[fruitType].startsWith("content/Images/")) {
        let img = new Image();
        img.src = fruitImages[fruitType];
        img.onload = function() {
          ctx.drawImage(img, fruit.x, fruit.y, box, box);
        };
      } else {
        ctx.font = `${box}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(fruitImages[fruitType], fruit.x + box / 2, fruit.y + box / 2);
      }

      // Draw score and high score
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text');
      ctx.font = "20px Arial";
      ctx.fillText("Score: " + score, 60, 30);
      ctx.fillText("High Score: " + highScore, 200, 30);

      // Move snake
      let head = { x: snake[0].x, y: snake[0].y };
      curDirection = newDirection;
      if (curDirection === 'LEFT') head.x -= box;
      if (curDirection === 'RIGHT') head.x += box;
      if (curDirection === 'UP') head.y -= box;
      if (curDirection === 'DOWN') head.y += box;

      // Game over conditions
      if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        clearInterval(game);
        gameOver = true;
        if (score > highScore) {
          highScore = score;
          localStorage.setItem('snakeHighScore', highScore);
        }
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--title');
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);
        if (playAgainBtn) playAgainBtn.style.display = 'inline-block';
        return;
      }

      // Eat fruit
      if (head.x === fruit.x && head.y === fruit.y) {
        score += 10;
        fruitType = (fruitType + 1) % fruitImages.length;
        fruit = {
          x: Math.floor(Math.random() * (canvas.width / box)) * box,
          y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
      } else {
        snake.pop();
      }

      snake.unshift(head);
    }

    let game = setInterval(draw, 100);

    // Play Again button handler
    if (playAgainBtn) {
      playAgainBtn.onclick = function() {
        playAgainBtn.style.display = 'none';
        // Reset game state
        snake = [{ x: 9 * box, y: 12 * box }];
        curDirection = 'RIGHT';
        newDirection = curDirection;
        score = 0;
        gameOver = false;
        fruitType = 0;
        fruit = {
          x: Math.floor(Math.random() * (canvas.width / box)) * box,
          y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
        game = setInterval(draw, 100);
      };
    }
  }

  // Start the game when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('snakeCanvas')) {
      startSnakeGame();
    }
  });

  const openBtn = document.getElementById('openSnakeBtn');
  const logoTrigger = document.getElementById('snakeLogoTrigger');
  const modal = document.getElementById('snakeModal');
  const closeBtn = document.getElementById('closeSnakeBtn');

  function openSnakeModal() {
    modal.classList.add('active');
    if (document.getElementById('snakePlayAgainBtn')) {
      document.getElementById('snakePlayAgainBtn').style.display = 'none';
    }
    startSnakeGame();
  }

  if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', openSnakeModal);
    if (logoTrigger) logoTrigger.addEventListener('click', openSnakeModal);
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const headerLogo = document.getElementById('headerLogoSnake');
    const modal = document.getElementById('snakeModal');
    const closeBtn = document.getElementById('closeSnakeBtn');

    function openSnakeModal() {
      if (modal) {
        modal.classList.add('active');
        if (document.getElementById('snakePlayAgainBtn')) {
          document.getElementById('snakePlayAgainBtn').style.display = 'none';
        }
        startSnakeGame();
      }
    }

    if (headerLogo) {
      headerLogo.addEventListener('click', openSnakeModal);
    }
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function initializeWaffleMenu() {
    const waffleBtn = document.getElementById("waffleMenuBtn");
    const wafflePopup = document.getElementById("wafflePopup");
    const closeWaffle = document.getElementById("closeWaffle");

    if (waffleBtn && wafflePopup) {
      waffleBtn.addEventListener("click", function() {
        wafflePopup.classList.add("active");
        waffleBtn.style.display = "none"; // Hide waffle button when menu is open
      });
    }
    if (closeWaffle && wafflePopup && waffleBtn) {
      closeWaffle.addEventListener("click", function() {
        wafflePopup.classList.remove("active");
        waffleBtn.style.display = "flex"; // Show waffle button when menu is closed
      });
      // Close when clicking outside the menu
      wafflePopup.addEventListener("click", function(e) {
        if (e.target === wafflePopup) {
          wafflePopup.classList.remove("active");
          waffleBtn.style.display = "flex"; // Show waffle button when menu is closed
        }
      });
    }
  }
});

// Add this function globally
window.setMobileDirection = function(dir) {
  // Only allow valid direction changes
  if (typeof window.setSnakeDirection === "function") {
    window.setSnakeDirection(dir);
  } else if (window._setSnakeDirection) {
    window._setSnakeDirection(dir);
  }
};
