const preloaderActive = (loader, status) => {
  if (status == true) {
    loader.style.display = "inline-block";
  } else {
    loader.style.display = "none";
  }
};
export default preloaderActive;
