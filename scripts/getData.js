const getData = async (url, key, category) => {
  try {
    let fullUrl = url + category;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": key,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export default getData;
