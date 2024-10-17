const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');

// Define background colors for each festival
const backgrounds = {
    diwali: '#FF5733',    // Diwali - Orange
    christmas: '#2ECC71', // Christmas - Green
    eid: '#3498DB',       // Eid - Blue
    newyear: '#9B59B6'    // New Year - Purple
};

let selectedBackground = 'diwali'; // Default background
let uploadedImage = null; // Placeholder for uploaded image

// Translations for English and Hindi
const translations = {
    en: {
        title: "Create Your Festival Greeting Card",
        festivalLabel: "Choose a Festival:",
        uploadLabel: "Or Upload Your Own Background:",
        nameLabel: "Enter Your Name:",
        messageLabel: "Enter Your Message:",
        downloadBtn: "Download Card",
    },
    hi: {
        title: "अपने त्योहार के शुभकामना कार्ड बनाएं",
        festivalLabel: "एक त्योहार चुनें:",
        uploadLabel: "या अपना खुद का बैकग्राउंड अपलोड करें:",
        nameLabel: "अपना नाम दर्ज करें:",
        messageLabel: "अपना संदेश दर्ज करें:",
        downloadBtn: "कार्ड डाउनलोड करें",
    }
};

// Function to update the UI based on the selected language
function updateLanguage(lang) {
    document.getElementById('title').textContent = translations[lang].title;
    document.getElementById('festival-label').textContent = translations[lang].festivalLabel;
    document.getElementById('upload-label').textContent = translations[lang].uploadLabel;
    document.getElementById('name-label').textContent = translations[lang].nameLabel;
    document.getElementById('message-label').textContent = translations[lang].messageLabel;
    document.getElementById('download-btn').textContent = translations[lang].downloadBtn;
}

// Update the canvas with the selected background, name, and message
function updateCard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (uploadedImage) {
        const image = new Image();
        image.src = uploadedImage;
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            drawText();
        };
    } else {
        ctx.fillStyle = backgrounds[selectedBackground];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawText();
    }
}

// Function to draw the name and message on the card
function drawText() {
    const name = document.getElementById('name-input').value;
    const message = document.getElementById('message-input').value;

    const nameColor = document.getElementById('name-color').value;
    const messageColor = document.getElementById('message-color').value;

    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = nameColor; // Use selected name color
    ctx.textAlign = 'left';
    ctx.fillText(name, 20, 50);

    ctx.font = '20px Arial';
    ctx.fillStyle = messageColor; // Use selected message color
    const lines = message.split('\n');
    let y = 100;
    lines.forEach(line => {
        ctx.fillText(line, 20, y);
        y += 30;
    });
}

// Event listener for festival selection
document.getElementById('festival-select').addEventListener('change', function() {
    selectedBackground = this.value;
    uploadedImage = null;
    updateCard();
});

// Event listener for image upload
document.getElementById('image-upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            updateCard();
        };
        reader.readAsDataURL(file);
    }
});

// Event listeners for input fields (name and message)
document.getElementById('name-input').addEventListener('input', updateCard);
document.getElementById('message-input').addEventListener('input', updateCard);

// Download the card as an image
document.getElementById('download-btn').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'greeting-card.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Event listener for language selection
document.getElementById('language-select').addEventListener('change', function() {
    updateLanguage(this.value);
});

// Initialize the card with default settings
updateCard();
updateLanguage('en'); // Set default language to English
