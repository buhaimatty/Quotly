const LIMIT_OF_ACTIVE = 1;
const buttons = document.querySelectorAll("[data-category-btn]");
const generateButton = document.querySelector("[data-generate-by-category]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // if the clicked button is already active
    if (button.classList.contains("category-active")) {
      button.classList.remove("category-active");
      buttons.forEach((btn) => (btn.disabled = false));
      generateButton.disabled = true;
    } else {
      // deactivate all other buttons and activate the clicked one
      buttons.forEach((btn) => {
        btn.classList.remove("category-active");
        btn.disabled = false;
      });

      button.classList.add("category-active");

      // disable other buttons
      buttons.forEach((btn) => (btn.disabled = btn !== button));

      generateButton.disabled = false;
    }
  });
});

// "refresh"-eventListener
generateButton.addEventListener("click", () => {
  generateButton.disabled = true;
  buttons.forEach((btn) => {
    btn.classList.remove("category-active");
    btn.disabled = false;
  });
});
