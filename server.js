const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// store metrics in memory
let logs = [];

/**
 * Test API endpoint
 * body: { url: "https://example.com/api" }
 */
app.post("/check-api", async (req, res) => {
    const { url } = req.body;

    if (!url) return res.status(400).json({ error: "URL required" });

    const start = Date.now();

    try {
        const response = await axios.get(url);
        const timeTaken = Date.now() - start;

        const log = {
            url,
            status: response.status,
            time: timeTaken,
            timestamp: new Date().toISOString()
        };

        logs.push(log);

        res.json(log);

    } catch (err) {
        const timeTaken = Date.now() - start;

        const log = {
            url,
            status: err.response ? err.response.status : 500,
            time: timeTaken,
            timestamp: new Date().toISOString(),
            error: true
        };

        logs.push(log);

        res.json(log);
    }
});

// get logs
app.get("/logs", (req, res) => {
    res.json(logs);
});

app.listen(PORT, () => {
    console.log(`API Monitor running on http://localhost:${PORT}`);
});