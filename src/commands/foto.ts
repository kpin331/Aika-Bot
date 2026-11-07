import { Composer, InputFile } from "grammy";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export const foto = new Composer();

foto.command("foto", async (ctx) => {
    const imageDir = "./image";
    const files = await readdir(imageDir);
    const gambar = files.filter(file => /\.(jpg|png|jpeg|webp)$/i.test(file));

    if (gambar.length == 0) {
        return ctx.reply("gambar kosong");
    }

    for (const file of gambar) {
        await ctx.replyWithPhoto(
            new InputFile(join(imageDir, file))
        );
    }

    await ctx.reply(`gambar terkirim ${gambar.length}`);
});