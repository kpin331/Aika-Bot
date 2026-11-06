import "dotenv/config";
import { Bot, InlineKeyboard } from "grammy";
import process from "node:process";

// buat bot
const main = new Bot(process.env.TOKEN!)
const menu = new InlineKeyboard()
    .text("tes", "test1")
    .text("tes2", "test2");

// nangkep error
main.catch((err) => console.error("terjadi kesalahan:", err.message));

// command: /start dan /help
main.command("start", (ctx) => {
    ctx.reply("200 OK");
});

main.command("help", (ctx) => {
    ctx.reply("kirim pesan apa aja bre,ntar ku ulangi");
});

main.command("menu", (ctx) => {
    ctx.reply("choose one baby:", { reply_markup: menu });
});

main.callbackQuery("test1", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("200");
});

main.callbackQuery("test2", async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply("200 juga");
});

// nangkep pesan dari user dan ulangi
main.on("message:text", (ctx) => {
    console.log("pesan:", ctx.message.text);
    ctx.reply(`pesanlu: ${ctx.message.text}`)
});

// mulai bot dan print di terminal
main.start({
    onStart: (me) => console.log("@" + me.username + " online"),
});