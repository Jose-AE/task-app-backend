const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model("Task", TaskSchema)