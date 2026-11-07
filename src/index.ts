import "dotenv/config";
import { Bot, InlineKeyboard, InputFile, Composer } from "grammy";
import process from "node:process";
import { mulai } from "./commands/start.ts";
import { foto } from "./commands/foto.ts";
import { help } from "./commands/help.ts";
import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino"; 

// buat bot atau buat sesuatu disini
// sekalian env disini
const main = new Bot(process.env.TOKEN!)

main.catch((err) => console.error("terjadi kesalahan:", err));

main.use(mulai);
main.use(foto);
main.use(help);

async function start() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");
    const sock = makeWASocket({ auth: state, logger: pino({ level: "info" }) });
    sock.ev.on("creds.update", saveCreds);
}

// nangkep pesan dari user dan ulangi
main.on("message:text", (ctx) => {
    console.log("pesan:", ctx.message.text);
    ctx.reply(`pesanlu: ${ctx.message.text}`)
});

// mulai bot dan print di terminal
main.start({
    onStart: (me) => console.log("@" + me.username + " online"),
});