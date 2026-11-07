import { Composer } from "grammy";

export const ping = new Composer();

ping.command("ping", async (ctx) => {
    const start = Date.now();
    const msg = await ctx.reply("yapping ke server...");
    const rps = Date.now() - start;
    await ctx.api.editMessageText(
        ctx.chat.id,
        msg.message_id,
        `time: ${rps}`
    );
});