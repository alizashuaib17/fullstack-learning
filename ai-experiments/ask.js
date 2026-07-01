// Load the .env file
require("dotenv").config();

// Import the Gemini SDK
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Create Gemini client using your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Import readline-sync to take user input
const readline = require("readline-sync");

// Function to ask AI
async function askAI() {

    try {

        // Take question from user
        const question = readline.question("Ask AI: ");

        // Select the model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        // System prompt + user question
        const prompt = `
You are a concise technical assistant.

User Question:
${question}
`;

        // Send prompt to Gemini
        const result = await model.generateContent(prompt);

        // Print response
        console.log("\nAI Response:\n");
        console.log(result.response.text());

    }

    catch (error) {

        console.log("Error:", error.message);

    }

}

// Run the function
askAI();