import "dotenv/config";
import { Bot, InlineKeyboard, InputFile } from "grammy";
import process from "node:process";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

// buat bot atau buat sesuatu disini
const main = new Bot(process.env.TOKEN!)
const menu = new InlineKeyboard()
    .text("tes", "test1")
    .text("tes2", "test2");
const hitung = new Map<number, number>();

// nangkep error
main.catch((err) => console.error("terjadi kesalahan:", err));

// command disini
main.command("start", (ctx) => {
    ctx.reply("200 OK");
});

main.command("help", (ctx) => {
    ctx.reply("kirim pesan apa aja bre,ntar ku ulangi");
});

// munculin tombol dibawah pesan saat /menu dipanggil
main.command("tombol", (ctx) => {
    ctx.reply("choose one baby:", { reply_markup: menu });
});

main.command("hitung", (ctx) => {
    const id = ctx.from!.id;
    const f = (hitung.get(id) ?? 0) + 1;
    ctx.reply(`n= ${f}`);
});

//kirim foto
main.command("foto", async (ctx) => {
    //path
    const imageDir = "./image";
    
    // ambil semua foto dari path
    const files = await readdir(imageDir);
    
    //filter foto
    const gambar = files.filter(file => 
        /\.(jpeg|jpg|png|webp)$/i.test(file)
    );

    //return kalo ga ada gambar
    if (gambar.length == 0) {
        return ctx.reply("ga ada gambar");
    }

    //kalo ada,kirim
    for (const file of gambar) {
        await ctx.replyWithPhoto(new InputFile(join(imageDir, file)));
    }
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