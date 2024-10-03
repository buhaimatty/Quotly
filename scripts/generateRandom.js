import getCategory from "./categories.js";
import getData from "./getData.js";
import displayData from "./displayData.js";
import preloaderActive from "./preloaderActive.js";
import API_URL from "./getUrl.js";
import API_KEY from "../getKey.js";

const randomCategoryNumber = (n) => Math.floor(Math.random() * n) + 1;

// _ _ _ _ _ REAL USAGE _ _ _ _ _
let htmlField = document.querySelector(".quote-section__placeholder");
const button = document.querySelector(".quote-section__get-btn");
let preloader = document.querySelector("[data-preloader-random]");
button.addEventListener("click", async () => {
  htmlField.innerHTML = "";
  preloaderActive(preloader, true);
  let data;

  try {
    let categories = getCategory();
    let len = categories.length;
    let randomCategory = categories[randomCategoryNumber(len) - 1];

    data = await getData(API_URL, API_KEY, randomCategory);
  } catch (e) {
    console.error("Error while fetching the data:", e);
  } finally {
    preloaderActive(preloader, false);
    if (data) displayData(data, htmlField);
  }
});

// - - - - - TESTING - - - - -
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
//     }, 1000);
//   });
// }
// let htmlField = document.querySelector(".quote-section__placeholder");
// const button = document.querySelector(".quote-section__get-btn");
// let preloader = document.querySelector("[data-preloader-random]");
// button.addEventListener("click", async () => {
//   htmlField.innerHTML = "";
//   preloaderActive(preloader, true);
//   let data;

//   try {
//     data = await await getData1();
//   } catch (e) {
//     console.error("Error while fetching data:", e);
//   } finally {
//     preloaderActive(preloader, false);
//     if (data) displayData(data, htmlField);
//   }
// });
