import { Composer } from "grammy";

export const mulai = new Composer();

mulai.command("start", (ctx) => ctx.reply("200"));