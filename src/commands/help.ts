import { Composer } from "grammy";
import { daftar } from "./list.ts";

export const help = new Composer();

help.command("help", (ctx) => {
    const teks = daftar
    .map(c => `/${c.nama} - ${c.deskripsi}`)
    .join("\n")
    return ctx.reply(teks);
});