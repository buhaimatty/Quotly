// - - - - - CURSOR CIRCLE - - - - -
const cursorCircle = document.querySelector(".cursor-circle");

const mouse = { x: 0, y: 0 };
const circle = { x: 0, y: 0 };
const previousMouse = { x: 0, y: 0 };

let currentScale = 0;
let currentAngle = 0;

// [0 = smoother (slower), 1 = instant]
const speed = 0.15;
const deformationFactor = 125;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

const cursorAnimation = () => {
  // MOVE
  circle.x += (mouse.x - circle.x) * speed;
  circle.y += (mouse.y - circle.y) * speed;
  const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

  // SQUEEZE EFFECT
  // Calculate the change in mouse position (deltaMouse)
  const deltaMouseX = mouse.x - previousMouse.x;
  const deltaMouseY = mouse.y - previousMouse.y;

  previousMouse.x = mouse.x;
  previousMouse.y = mouse.y;

  const mouseVelocity = Math.min(
    Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
    deformationFactor
  );

  // Convert mouse velocity to a value in the range [0, 0.5]
  const scaleValue = (mouseVelocity / deformationFactor) * 0.5;
  currentScale += (scaleValue - currentScale) * speed;
  const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

  // ROTATE
  // Calculate the angle using the atan2 function
  const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

  // Check for a threshold to reduce shakiness at low mouse velocity
  if (mouseVelocity > 20) currentAngle = angle;

  // Create a transformation string for rotation
  const rotateTransform = `rotate(${currentAngle}deg)`;

  // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
  cursorCircle.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

  // Request the next frame to continue the animation
  window.requestAnimationFrame(cursorAnimation);
};

cursorAnimation();

// - - - - - CURSOR DOT - - - - -
const cursorDot = document.querySelector(".cursor-dot");
const coordsDot = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  const offset = 2;

  coordsDot.x = e.clientX;
  coordsDot.y = e.clientY;

  cursorDot.style.left = coordsDot.x - offset + "px";
  cursorDot.style.top = coordsDot.y - offset + "px";
});

// - - - - - CURSOR COLOR-CHANGE - - - - -
const changeColors = (color) => {
  cursorDot.style.backgroundColor = color;
  cursorCircle.style.borderColor = color;
};

const hoverElements = document.querySelectorAll(`h1, p, a, button`);

// for static elements:
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    changeColors(hoverColor);
  });

  element.addEventListener("mouseleave", () => {
    changeColors(basicColor);
  });
});

// for dynamicly added elements:
const basicColor = `var(--orange)`;
const hoverColor = `var(--grey)`;

document.addEventListener("mouseover", (e) => {
  const target = e.target;
  const targetClassStr = target.classList.value;

  if (targetClassStr.includes("popup")) {
    changeColors(hoverColor);
  }
});

document.addEventListener("mouseout", (e) => {
  const target = e.target;
  const targetClassStr = target.classList.value;

  if (targetClassStr.includes("popup")) {
    changeColors(basicColor);
  }
});

// to fix colors when deleting quote => return to basic colors
export { changeColors, basicColor };
