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

        const alphabets = singleCharAlphabets;
        const helper = [...alphabets];
        const highest_alphabet = helper.length > 0 ? [helper.sort()[helper.length - 1]] : [];

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
    res.status(200).send("Hello, this is your root URL!");
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});