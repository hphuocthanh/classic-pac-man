window.addEventListener("DOMContentLoaded", () => {
  const score_element = document.getElementById("score");
  const grid_element = document.querySelector(".grid");
  const width = 28;

  let score = 0;
  let squares = [];

  // 1 - wall
  // 0 - pac-dot
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty
  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ];

  function createBoard() {
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement("div");

      if (layout[i] === 1) {
        square.classList.add("wall");
      }
      if (layout[i] === 0) {
        square.classList.add("pac-dot");
      }
      if (layout[i] === 2) {
        square.classList.add("ghost-lair");
      }
      if (layout[i] === 3) {
        square.classList.add("power-pellet");
      }

      grid_element.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();
  let currentPacmanIndex = 489;
  squares[currentPacmanIndex].classList.add("pac-man");

  function movePacman(e) {
    squares[currentPacmanIndex].classList.remove("pac-man");
    switch (e.key) {
      case "ArrowUp":
        if (
          !squares[currentPacmanIndex - width].classList.contains("wall") &&
          !squares[currentPacmanIndex - width].classList.contains(
            "ghost-lair"
          ) &&
          currentPacmanIndex - width >= 0
        ) {
          currentPacmanIndex -= width;
        }
        break;
      case "ArrowDown":
        if (
          !squares[currentPacmanIndex + width].classList.contains("wall") &&
          !squares[currentPacmanIndex + width].classList.contains(
            "ghost-lair"
          ) &&
          currentPacmanIndex + width < width * width
        ) {
          currentPacmanIndex += width;
        }
        break;
      case "ArrowLeft":
        if (
          !squares[currentPacmanIndex - 1].classList.contains("wall") &&
          !squares[currentPacmanIndex - 1].classList.contains("ghost-lair") &&
          currentPacmanIndex % width !== 0
        ) {
          currentPacmanIndex--;
        }
        if (currentPacmanIndex === 364) currentPacmanIndex = 391;
        break;
      case "ArrowRight":
        if (
          !squares[currentPacmanIndex + 1].classList.contains("wall") &&
          !squares[currentPacmanIndex + 1].classList.contains("ghost-lair") &&
          currentPacmanIndex % width < width - 1
        ) {
          currentPacmanIndex++;
        }
        if (currentPacmanIndex === 391) currentPacmanIndex = 364;
        break;
    }
    squares[currentPacmanIndex].classList.add("pac-man");

    eatPacDot();
    eatPowerPellet();
    checkGameOver();
    checkGameWin();
  }
  document.addEventListener("keyup", movePacman);

  function eatPacDot() {
    if (squares[currentPacmanIndex].classList.contains("pac-dot")) {
      increaseScore(1);
      squares[currentPacmanIndex].classList.remove("pac-dot");
    }
  }

  function eatPowerPellet() {
    if (squares[currentPacmanIndex].classList.contains("power-pellet")) {
      increaseScore(10);
      squares[currentPacmanIndex].classList.remove("power-pellet");
      scareGhost();
    }
  }

  function increaseScore(num) {
    score += num;
    score_element.textContent = score;
    score_element.style.color = generateColor();
  }

  function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  class Ghost {
    constructor(className, startIndex, speed) {
      this.startIndex = startIndex;
      this.className = className;
      this.speed = speed;
      this.currentIndex = startIndex;
      this.timerId = NaN;
      this.isScared = false;
    }
  }

  const ghosts = [
    new Ghost("andy", 379, 200),
    new Ghost("cheese", 376, 250),
    new Ghost("chan", 348, 150),
    new Ghost("fore", 352, 300),
  ];

  ghosts.forEach((ghost) =>
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost")
  );

  ghosts.forEach((ghost) => moveGhost(ghost));

  function moveGhost(ghost) {
    ghost.timerId = setInterval(function () {
      let newDirection = generateDirection();

      if (
        !squares[ghost.currentIndex + newDirection].classList.contains(
          "ghost"
        ) &&
        !squares[ghost.currentIndex + newDirection].classList.contains("wall")
      ) {
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        ghost.currentIndex += newDirection;
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add("scared-ghost");
      }

      if (
        squares[ghost.currentIndex].classList.contains("pac-man") &&
        ghost.isScared
      ) {
        increaseScore(100);
        squares[ghost.currentIndex].classList.remove(
          ghost.className,
          "ghost",
          "scared-ghost"
        );
        revertGhost(ghost);
        squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      }
      checkGameOver();
    }, ghost.speed);
  }

  function scareGhost() {
    ghosts.forEach((ghost) => (ghost.isScared = true));
    setTimeout(unScareGhost, 10000);
  }

  function unScareGhost() {
    ghosts.forEach((ghost) => (ghost.isScared = false));
  }

  function revertGhost(ghost) {
    ghost.currentIndex = ghost.startIndex;
    ghost.isScared = false;
  }

  function generateDirection() {
    const directions = [-1, 1, -width, width];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    return direction;
  }

  function checkGameOver() {
    if (
      squares[currentPacmanIndex].classList.contains("ghost") &&
      !squares[currentPacmanIndex].classList.contains("scared-ghost")
    ) {
      score_element.textContent = "You lose! Best Score: " + score;
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
    }
  }

  function checkGameWin() {
    if (score >= 273) {
      score_element.textContent = "You win. Congrats!";
      ghosts.forEach((ghost) => clearInterval(ghost.timerId));
      document.removeEventListener("keyup", movePacman);
    }
  }

  function resetGame() {
    grid_element.innerHTML = "";
    squares = [];
    createBoard();
    ghosts.forEach((ghost) => {
      squares[ghost.currentIndex].classList.remove(
        ghost.className,
        "ghost",
        "scared-ghost"
      );
      unScareGhost()
      ghost.currentIndex = ghost.startIndex;
      squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
      moveGhost(ghost)
    });
    squares[currentPacmanIndex].classList.remove("pac-man");
    currentPacmanIndex = 489;
    squares[currentPacmanIndex].classList.add("pac-man");
    score = 0;
    score_element.textContent = score;
    document.addEventListener("keyup", movePacman);
  }

  document.getElementById("replay").addEventListener("click", resetGame);
});
