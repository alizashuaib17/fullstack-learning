require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline-sync");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Choose system prompt style
function getSystemPrompt(mode) {
    if (mode === "1") {
        return "You are a concise technical assistant. Answer briefly.";
    }

    if (mode === "2") {
        return "You are a step-by-step tutor. Explain everything clearly in steps.";
    }

    if (mode === "3") {
        return `You are a strict JSON generator.
Always respond ONLY in valid JSON format like:
{ "summary": "...", "sentiment": "positive|negative|neutral" }`;
    }

    return "You are a helpful assistant.";
}

// 2. Few-shot examples
function getFewShotExamples() {
    return `
Example 1:
User: I feel happy today
Assistant: { "summary": "User feels happy", "sentiment": "positive" }

Example 2:
User: I am tired and sad
Assistant: { "summary": "User feels tired and sad", "sentiment": "negative" }
`;
}

// 3. Call model
async function callModel(prompt) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
}

// MAIN FUNCTION
async function askAI() {
    try {
        const question = readline.question("Ask AI: ");

        console.log("\nChoose Prompt Mode:");
        console.log("1. Concise Assistant");
        console.log("2. Step-by-step Tutor");
        console.log("3. JSON Only Mode");

        const mode = readline.question("Select (1/2/3): ");

        const systemPrompt = getSystemPrompt(mode);

        // -------------------------
        // ZERO SHOT
        // -------------------------
        const zeroShotPrompt = `
${systemPrompt}

User Question:
${question}
`;

        const zeroShotResult = await callModel(zeroShotPrompt);

        // -------------------------
        // FEW SHOT
        // -------------------------
        const fewShotPrompt = `
${systemPrompt}

${getFewShotExamples()}

User Question:
${question}
`;

        const fewShotResult = await callModel(fewShotPrompt);

        // -------------------------
        // OUTPUT
        // -------------------------
        console.log("\n==============================");
        console.log("ZERO SHOT OUTPUT:");
        console.log("==============================\n");
        console.log(zeroShotResult);

        console.log("\n==============================");
        console.log("FEW SHOT OUTPUT:");
        console.log("==============================\n");
        console.log(fewShotResult);

        // -------------------------
        // JSON PARSE TEST (ONLY IF MODE 3)
        // -------------------------
        if (mode === "3") {
            try {
                const parsed = JSON.parse(fewShotResult);
                console.log("\nParsed JSON Object:");
                console.log(parsed);
            } catch (err) {
                console.log("\nJSON Parse Error:", err.message);
            }
        }

    } catch (error) {
        console.log("Error:", error.message);
    }
}

askAI();