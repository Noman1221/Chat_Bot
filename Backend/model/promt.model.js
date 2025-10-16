import mongoose from "mongoose";
const promptSchema = new mongoose.Schema({
    prompt: { // prompt is given by user
        type: String,
        required: true,
    },
    ApiAns: {  // get answer from api like openai or gemini
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth",
        required: true,
    },
},
    { timestamps: true }
);

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;