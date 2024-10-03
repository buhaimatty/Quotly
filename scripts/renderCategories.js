import getCategory from "./categories.js";

const categories = getCategory();
const colorTheme = [
  "coloured-red",
  "coloured-green",
  "coloured-violet",
  "coloured-mint",
  "coloured-blue",
];

let index = 0;

const renderCategories = (arr) => {
  let htmlField = document.querySelector("[data-category-placeholder]");
  let wrapper = document.createElement("div");
  wrapper.classList.add("category-wrapper");

  arr.forEach((item) => {
    if (index == colorTheme.length) index = 0;

    wrapper.innerHTML += `
      <button 
        class="category-quote-section__category-btn
          category-btn popup ${colorTheme[index]}"
        data-category-btn
      >
        ${item}
      </button>
    `;

    index++;
  });

  htmlField.appendChild(wrapper);
};

renderCategories(categories);
