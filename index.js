const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
dotenv.config();
const token = process.env.BOT_TOKEN;  // Replace with your actual bot token
console.log(token)

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
    if (!msg.text.startsWith("/joke")) {  
        bot.sendMessage(msg.chat.id, "Please write /joke to get a joke.");
    }
});
bot.onText(/\/joke(@\w+)?/, async (msg) => {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");

        if (!response.data.setup || !response.data.punchline) {
            throw new Error("Invalid joke received");
        }

        const joke = `${response.data.setup}\n${response.data.punchline}`;
        bot.sendMessage(msg.chat.id, joke);
    } catch (error) {
        console.error("Error fetching joke:", error.message);
        bot.sendMessage(msg.chat.id, "Oops! Couldn't fetch a joke. Try again later.");
    }
});



