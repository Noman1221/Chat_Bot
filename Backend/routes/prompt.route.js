import express from 'express';
import { generateResponse } from '../controller/prompt.controller.js';
import { CheckIsAuthenticate } from '../middleware/isAuthenticate.js';

const promptRouter = express.Router();

// Example route for handling prompts
promptRouter.post("/prompt", CheckIsAuthenticate, generateResponse);
export default promptRouter;