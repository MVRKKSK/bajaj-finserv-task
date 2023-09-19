const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
    const requestData = req.body.data;

    if (!requestData || !Array.isArray(requestData)) {
        return res.status(400).json({ is_success: false, error: "Invalid data format" });
    }

    const userResponse = {
        is_success: true,
        user_id: "miryala_kautilya_01032003",
        email: "miryala.kautilya2020@vitbhopal.ac.in",
        roll_number: "20BCE10503",
        numbers: requestData.filter(item => !isNaN(item)),
        alphabets: requestData.filter(item => isNaN(item)),
        highest_alphabet: [requestData.filter(item => isNaN(item)).sort()[requestData.filter(item => isNaN(item)).length - 1]]
    };

    res.json(userResponse);
});

app.get("/bfhl", (req, res) => {
    const responseData = {
        "operation_code": 1
    };

    res.status(200).json(responseData);
});

app.get("/", (req, res) => {
    res.send("welcome to the bajaj task");
})


const port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server is running on port ${port}`);
});


// 1. Status
// 2. User ID
// 3. College Email ID
// 4. College Roll Number
// 5. Array for numbers
// 6. Array for alphabets
// 7. Highest Alphabet in the input array of alphabets [Refer to note in Annexure for more info]