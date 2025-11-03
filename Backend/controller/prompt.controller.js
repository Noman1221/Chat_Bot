import { getResponse } from "../middleware/GenPrompt.js";
import Prompt from "../model/promt.model.js";

export const generateResponse = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user?.id; // Assuming user ID is available in req.user

    if (!prompt) {
        return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    try {
        // Get response from the AI model
        const apiResponse = await getResponse(prompt);

        if (!userId) {
            return res.status(200).json({ success: true, data: apiResponse });
        }
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

export const getUserPrompts = async (req, res) => {
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const prompts = await Prompt.find({ userId: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: prompts });
    } catch (error) {
        console.error("Error fetching user prompts:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updatePrompt = async (req, res) => {
    const { promptId } = req.params;
    const { prompt } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        const existingPrompt = await Prompt.findOne({ _id: promptId, userId: userId });
        if (!existingPrompt) {
            return res.status(404).json({ success: false, message: "Prompt not found" });
        }

        // Get new response from the AI model
        const apiResponse = await getResponse(prompt);
        existingPrompt.prompt = prompt;
        existingPrompt.ApiAns = apiResponse;

        await existingPrompt.save();

        res.status(200).json({ success: true, data: existingPrompt });
    } catch (error) {
        console.error("Error updating prompt:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const deletePrompt = async (req, res) => {
    const { promptId } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        const existingPrompt = await Prompt.findOneAndDelete({ _id: promptId, userId: userId });
        if (!existingPrompt) {
            return res.status(404).json({ success: false, message: "Prompt not found" });
        }

        res.status(200).json({ success: true, message: "Prompt deleted successfully" });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};