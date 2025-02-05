const axios = require("axios");
const { JSDOM } = require("jsdom");

async function scrapeData() {
  const url = "https://www.trustradius.com/api/v1/complete?q=order";

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "es-ES,es;q=0.9",
      },
    });
    console.log(JSON.stringify(response.data))
  } catch (error) {
    console.error("Error al obtener los datos:", error.response?.status || error.message);
  }
}

scrapeData();
