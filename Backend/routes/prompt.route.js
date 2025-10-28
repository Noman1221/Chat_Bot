import express from 'express';
import { deletePrompt, generateResponse, getUserPrompts, updatePrompt } from '../controller/prompt.controller.js';
import { CheckIsAuthenticate } from '../middleware/isAuthenticate.js';

const promptRouter = express.Router();

// Example route for handling prompts
promptRouter.post("/prompt", CheckIsAuthenticate, generateResponse);
promptRouter.get("/prompts", CheckIsAuthenticate, getUserPrompts);
promptRouter.put("/prompt/:promptId", CheckIsAuthenticate, updatePrompt);
promptRouter.delete("/prompt/:promptId", CheckIsAuthenticate, deletePrompt);
export default promptRouter;