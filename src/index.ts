import "dotenv/config";
import { Bot } from "grammy";
import process from "node:process";

const main = new Bot(process.env.TOKEN!)

main.catch((err) => console.error("terjadi kesalahan:", err.message));

main.on("message:text", (ctx) => {
    console.log("pesan:", ctx.message.text);
    ctx.reply(`pesanlu: ${ctx.message.text}`)
});

main.start({
    onStart: (me) => console.log("online sebagai: @" + me.username),
});