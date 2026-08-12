const fs = require("fs");
const path = require("path");

module.exports = async function gerarRBXLX(placeId) {
    if (!/^\d+$/.test(String(placeId))) {
        throw new Error("Invalid placeId");
    }

    const outputPath = path.join(__dirname, "game.rbxlx");

    const xml = `<?xml version="1.0" encoding="utf-8"?>
<roblox version="4">
    <Meta name="PlaceId">${placeId}</Meta>

    <External>null</External>

    <Item class="Workspace" referent="RBX0">
        <Properties>
            <string name="Name">Workspace</string>
        </Properties>
    </Item>

    <Item class="ServerScriptService" referent="RBX1">
        <Properties>
            <string name="Name">ServerScriptService</string>
        </Properties>
    </Item>

    <Item class="ReplicatedStorage" referent="RBX2">
        <Properties>
            <string name="Name">ReplicatedStorage</string>
        </Properties>
    </Item>

    <Item class="StarterGui" referent="RBX3">
        <Properties>
            <string name="Name">StarterGui</string>
        </Properties>
    </Item>
</roblox>`;

    await fs.promises.writeFile(outputPath, xml, "utf8");

    console.log(`Generated game.rbxlx for place ${placeId}`);

    return outputPath;
};
