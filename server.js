const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Використовуємо папку public для статичних файлів
app.use(express.static("public"));

// Роут для отримання курсів валют
app.get("/api/exchange-rates", async (req, res) => {
  try {
    const response = await axios.get(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching exchange rates");
  }
});

const server = app.listen(port, () => {
  console.log(`Сервер запущено на http://localhost:${port}/`);
});

function shutdown() {
  server.close(() => {
    console.log("Сервер закрито");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
