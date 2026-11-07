import "dotenv/config";
import { Bot, InlineKeyboard, InputFile } from "grammy";
import process from "node:process";
import { mulai } from "./commands/start.ts";
import { foto } from "./commands/foto.ts";
import { help } from "./commands/help.ts"
 
// buat bot atau buat sesuatu disini
const main = new Bot(process.env.TOKEN!)

main.catch((err) => console.error("terjadi kesalahan:", err));

main.use(mulai);
main.use(foto);
main.use(help);

// nangkep pesan dari user dan ulangi
main.on("message:text", (ctx) => {
    console.log("pesan:", ctx.message.text);
    ctx.reply(`pesanlu: ${ctx.message.text}`)
});

// mulai bot dan print di terminal
main.start({
    onStart: (me) => console.log("@" + me.username + " online"),
});