const express = require("express");
const gerarRBXLX = require("./gerador");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/", (req, res) => {
    res.send("🚀 Servidor RBXLX online!");
});

app.post("/gerar", async (req, res) => {
    try {
        const { placeId } = req.body;

        if (!placeId) {
            return res.status(400).json({
                error: "placeId não informado"
            });
        }

        await gerarRBXLX(placeId);

        res.download("game.rbxlx", "game.rbxlx");
    } catch (error) {
        console.error("Erro:", error);

        res.status(500).json({
            error: "Erro ao gerar o arquivo",
            details: error.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Server rodando");
});
