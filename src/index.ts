import "dotenv/config";
import { Bot } from "grammy";
import process from "node:process";

const main = new Bot(process.env.TOKEN!)

main.command("start", (ctx) => 
    ctx.reply("200 OK")
);

main.on("message:text", (ctx) => 
    ctx.reply(`iya bg. ${ctx.message.text}`)
);

main.start();