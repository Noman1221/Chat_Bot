import { getResponse } from "../middleware/GenPrompt.js";
import Prompt from "../model/promt.model.js";

export const generateResponse = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    try {
        // Get response from the AI model
        const apiResponse = await getResponse(prompt);

        // Save the prompt and response to the database
        const newPrompt = new Prompt({
            prompt: prompt,
            ApiAns: apiResponse,
            userId: userId,
        });
        console.log(newPrompt);

        await newPrompt.save();

        res.status(200).json({ success: true, data: apiResponse });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};