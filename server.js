const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
    try {
        const requestData = req.body.data;

        if (!requestData || !Array.isArray(requestData)) {
            throw new Error("Invalid data format");
        }

        const numbers = requestData.filter(item => !isNaN(item));
        const singleCharAlphabets = requestData.filter(item => typeof item === 'string' && item.length === 1 && isNaN(item));

        if (requestData.some(item => typeof item === 'string' && item.length !== 1 && isNaN(item))) {
            throw new Error("Invalid input format");
        }

        const alphabets = singleCharAlphabets.sort();
        const highest_alphabet = alphabets.length > 0 ? [alphabets[alphabets.length - 1]] : [];

        const userResponse = {
            is_success: true,
            user_id: "miryala_kautilya_01032003",
            email: "miryala.kautilya2020@vitbhopal.ac.in",
            roll_number: "20BCE10503",
            numbers,
            alphabets: singleCharAlphabets,
            highest_alphabet,
        };

        res.json(userResponse);
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

app.get("/bfhl", (req, res) => {
    const responseData = {
        "operation_code": 1
    };

    res.status(200).json(responseData);
});

app.get("/", (req, res) => {
    const htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Bajaj Task API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    margin: 20px;
                    padding: 20px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #555;
                }
                pre {
                    background-color: #eee;
                    padding: 10px;
                }
                ul {
                    list-style-type: disc;
                    padding-left: 20px;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to the Bajaj Task API - by Miryala Kautilya 20BCE10503</h1>
            <p>This API allows you to process data and find the highest alphabet from a list of characters.</p>
            <h2>How to Use:</h2>
            <ol>
                <li>Make a POST request to the endpoint <strong>/bfhl</strong> with JSON data in the following format:</li>
            </ol>
            <pre>{"data": ["M", "1", "334", "4", "B"]}</pre>
            <p>The API will process the data and return a JSON response with the following information:</p>
            <ul>
                <li>User ID</li>
                <li>Email</li>
                <li>Roll Number</li>
                <li>Numbers (extracted from the input)</li>
                <li>Alphabets (extracted from the input)</li>
                <li>Highest Alphabet (case-insensitive)</li>
            </ul>
            <h2>Example Response:</h2>
            <pre>
{
    "is_success": true,
    "user_id": "miryala_kautilya_01032003",
    "email": "miryala.kautilya2020@vitbhopal.ac.in",
    "roll_number": "20BCE10503",
    "numbers": ["1", "334", "4"],
    "alphabets": ["M", "B"],
    "highest_alphabet": ["M"]
}
            </pre>
        </body>
        </html>
    `;

    res.status(200).send(htmlResponse);
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});