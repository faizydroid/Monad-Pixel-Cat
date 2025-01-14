const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simple POST endpoint to handle minting request
app.post('/mint', async (req, res) => {
    const { imageData } = req.body;

    if (!imageData) {
        return res.status(400).json({ message: 'No image data provided.' });
    }

    try {
        // Simulate interaction with Monad Devnet API for minting (replace with actual Monad SDK calls)
        const response = await axios.post('https://api.monad.devnet', {
            action: 'mintNFT',
            imageData,
        });

        // Simulate a successful minting response
        const txnHash = response.data.txnHash || '0x123abc'; // Replace with real txn hash

        res.json({ txnHash });
    } catch (error) {
        res.status(500).json({ message: `Minting failed: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
