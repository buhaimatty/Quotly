import { changeColors, basicColor } from "./cursor.js";

const isActive = (tag) => (tag.classList.contains("active") ? true : false);

const clearPlaceholder = (field) => {
  field.classList.remove("active");
  field.innerHTML = "";
};

const displayData = (data, field) => {
  if (isActive(field)) clearPlaceholder(field);

  const { quote, author, category } = data[0];

  let quoteHTML = `
      <div class="quote-section__quote-wrapper">
        <p class="quote-section__quote popup">${quote}</p>
        <div class="quote-section__quote-info">
          <p class="quote-section__author popup">${author}</p>
          <p class="quote-section__category popup">${category}</p>
        </div>
        <button class="quote-section__close-btn popup">X</button>
      </div>
    `;

  field.classList.add("active");
  field.innerHTML += quoteHTML;

  let btnClose = field.querySelector(".quote-section__close-btn");
  btnClose.addEventListener("click", () => {
    clearPlaceholder(field);
    changeColors(basicColor); // --> to fix color of cursor
  });
};

export default displayData;
