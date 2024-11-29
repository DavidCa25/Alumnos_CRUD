const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.redirect("/login/login.html");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
