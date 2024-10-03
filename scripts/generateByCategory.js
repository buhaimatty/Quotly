import getData from "./getData.js";
import displayData from "./displayData.js";
import preloaderActive from "./preloaderActive.js";
import API_URL from "./getUrl.js";
import API_KEY from "../getKey.js";

const generateButton = document.querySelector("[data-generate-by-category]");
const categoriesButtons = document.querySelectorAll("[data-category-btn]");
const htmlField = document.querySelector("[data-generate-placeholder]");
let categoryString;

// to get category
categoriesButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("category-active")) {
      categoryString = button.textContent.trim();
    }
  });
});

// _ _ _ _ _ REAL USAGE _ _ _ _ _
let preloader = document.querySelector("[data-preloader-category]");
generateButton.addEventListener("click", async () => {
  htmlField.innerHTML = "";
  preloaderActive(preloader, true);
  let data;

  try {
    data = await getData(API_URL, API_KEY, categoryString);
  } catch (e) {
    console.error("Error while fetching the data:", e);
  } finally {
    preloaderActive(preloader, false);
    if (data) displayData(data, htmlField);
  }
});

// - - - - - TESTING - - - - -
// let data1 = [
//   {
//     quote:
//       "Once in his life, every man is entitled to fall madly in love with a gorgeous redhead.",
//     author: "Lucille Ball",
//     category: "life",
//   },
// ];
// const getData1 = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const data = [
//         {
//           quote:
//             "Once in his life, every man is entitled to fall madly in love with a gorgeous redhead.",
//           author: "Lucille Ball",
//           category: "life",
//         },
//       ];
//       resolve(data);
//     }, 1000); // 1-second delay to simulate loading time
//   });
// }

// let preloader = document.querySelector("[data-preloader-category]");
// generateButton.addEventListener("click", async () => {
//   htmlField.innerHTML = "";
//   preloaderActive(preloader, true);
//   let data;

//   try {
//     data = await getData1();
//   } catch (e) {
//     console.error("Error while fetching data:", e);
//   } finally {
//     preloaderActive(preloader, false);
//     if (data) {
//       displayData(data, htmlField);
//     } else {
//       console.error("No data to display.");
//     }
//   }
// });
