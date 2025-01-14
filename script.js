const generateButton = document.getElementById('generate-button');
const mintButton = document.getElementById('mint-button');
const catCanvas = document.getElementById('cat-canvas');
const mintStatus = document.getElementById('mint-status');
const connectWalletButton = document.getElementById('connect-wallet');

const ctx = catCanvas.getContext('2d');

// Simulate wallet connection status
let isWalletConnected = false;

// Simulate wallet connection
connectWalletButton.addEventListener('click', async () => {
    if (isWalletConnected) {
        alert("Wallet already connected!");
        return;
    }

    // Simulate a wallet connection
    isWalletConnected = true;
    connectWalletButton.textContent = "Wallet Connected";
    connectWalletButton.style.backgroundColor = "#6c757d"; // Disable further connection
});

// Function to generate a dynamic and detailed pixel art cat
function generateRandomCat() {
    const faceColors = ['#FFD700', '#FF6347', '#7FFFD4', '#FF1493', '#8A2BE2', '#D2691E', '#F0E68C', '#FA8072'];
    const furPattern = ['#FFB6C1', '#98FB98', '#B0C4DE', '#FF4500']; // More fur colors for variation
    const eyeColors = ['#00FF00', '#FFD700', '#4682B4', '#FF6347'];
    const mouthColors = ['#FF69B4', '#FF1493', '#B22222'];

    const color = faceColors[Math.floor(Math.random() * faceColors.length)];
    const furColor = furPattern[Math.floor(Math.random() * furPattern.length)];
    const eyeColor = eyeColors[Math.floor(Math.random() * eyeColors.length)];
    const mouthColor = mouthColors[Math.floor(Math.random() * mouthColors.length)];

    // Canvas size
    catCanvas.width = 150;
    catCanvas.height = 150;

    ctx.clearRect(0, 0, catCanvas.width, catCanvas.height); // Clear previous image

    // Face: Base round face with gradient fill
    const gradient = ctx.createRadialGradient(75, 75, 20, 75, 75, 50);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#f7c58f');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2);
    ctx.fill();

    // Fur details (random patches on the face for more realism)
    ctx.fillStyle = furColor;
    for (let i = 0; i < 6; i++) {
        const x = Math.random() * 40 + 50;
        const y = Math.random() * 40 + 50;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 10 + 5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(55, 65, 12, 0, Math.PI * 2); // Left eye
    ctx.arc(95, 65, 12, 0, Math.PI * 2); // Right eye
    ctx.fill();

    // Eye Pupils: Randomly color pupils
    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(55, 65, 6, 0, Math.PI * 2); // Left pupil
    ctx.arc(95, 65, 6, 0, Math.PI * 2); // Right pupil
    ctx.fill();

    // Nose (Pink Triangle)
    ctx.fillStyle = '#FF69B4';
    ctx.beginPath();
    ctx.moveTo(75, 85);
    ctx.lineTo(65, 100);
    ctx.lineTo(85, 100);
    ctx.closePath();
    ctx.fill();

    // Mouth (Random Color)
    ctx.strokeStyle = mouthColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(75, 100);
    ctx.lineTo(75, 110); // Straight mouth
    ctx.stroke();

    // Whiskers (Different patterns for a more dynamic look)
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 75);
    ctx.lineTo(5, 75); // Left whisker left
    ctx.moveTo(30, 85);
    ctx.lineTo(5, 95); // Left whisker down
    ctx.moveTo(30, 65);
    ctx.lineTo(5, 55); // Left whisker up

    ctx.moveTo(120, 75);
    ctx.lineTo(145, 75); // Right whisker right
    ctx.moveTo(120, 85);
    ctx.lineTo(145, 95); // Right whisker down
    ctx.moveTo(120, 65);
    ctx.lineTo(145, 55); // Right whisker up
    ctx.stroke();

    // Ears (With color details)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(50, 10); // Left ear
    ctx.lineTo(70, 40);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(120, 40);
    ctx.lineTo(100, 10); // Right ear
    ctx.lineTo(80, 40);
    ctx.closePath();
    ctx.fill();

    // Add Fur Tufts in the ears for more detail
    ctx.fillStyle = furColor;
    ctx.beginPath();
    ctx.moveTo(50, 30);
    ctx.lineTo(55, 20); // Left ear fur tuft
    ctx.lineTo(60, 30);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(100, 30);
    ctx.lineTo(95, 20); // Right ear fur tuft
    ctx.lineTo(90, 30);
    ctx.closePath();
    ctx.fill();

    // Randomly add an accessory (like a collar or a hat)
    const accessoryType = Math.floor(Math.random() * 2);
    if (accessoryType === 0) {
        // Add a collar
        ctx.fillStyle = 'gold';
        ctx.beginPath();
        ctx.arc(75, 125, 15, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // Add a simple cat hat
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(100, 50);
        ctx.lineTo(85, 30);
        ctx.lineTo(65, 30);
        ctx.closePath();
        ctx.fill();
    }

    mintButton.disabled = false; // Enable the minting button
}

// Generate cat when button is clicked
generateButton.addEventListener('click', () => {
    generateRandomCat();
});

// Mint button logic (simulate minting)
mintButton.addEventListener('click', async () => {
    if (!isWalletConnected) {
        alert("Please connect your wallet first.");
        return;
    }

    const imageData = catCanvas.toDataURL();
    try {
        const response = await fetch('http://localhost:3000/mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageData }),
        });
        const result = await response.json();
        if (response.ok) {
            mintStatus.textContent = `Minted successfully! Transaction hash: ${result.txnHash}`;
        } else {
            mintStatus.textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        mintStatus.textContent = `Error: ${error.message}`;
    }
});
