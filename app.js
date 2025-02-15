const express = require("express");
const app = express();
const reviewRouter = require("./js/review"); // Importă review.js

// Middleware pentru a parsa corpul cererii JSON
app.use(express.json());

// Utilizarea router-ului pentru recenzii
app.use("/api/reviews", reviewRouter);

// Portul pe care serverul va asculta
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
});
