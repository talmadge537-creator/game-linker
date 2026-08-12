const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, "game.rbxlx");
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();

        if (ext !== ".rbxlx" && ext !== ".rbxl") {
            return cb(new Error("Only .rbxlx or .rbxl files are allowed."));
        }

        cb(null, true);
    }
});

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

app.get("/", (req, res) => {
    res.send("🚀 Roblox place server online!");
});

app.post("/upload", upload.single("place"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No Roblox place file uploaded."
            });
        }

        res.json({
            success: true,
            message: "Place uploaded successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.get("/download", (req, res) => {
    const file = path.join(uploadDir, "game.rbxlx");

    if (!fs.existsSync(file)) {
        return res.status(404).send("No place has been uploaded yet.");
    }

    res.download(file, "game.rbxlx");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
