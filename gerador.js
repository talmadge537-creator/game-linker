const express = require("express");
const gerarRBXLX = require("./gerador");

const app = express();

app.use(express.json());

// LIBERA FRONTEND (IMPORTANTE)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post("/gerar", async (req, res) => {
    const { placeId } = req.body;

    await gerarRBXLX(placeId);

    res.download("game.rbxlx");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Server rodando");
    app.get("/", (req, res) => {
    res.send("🔥 Roblox Uncopylocked API ONLINE");
});

