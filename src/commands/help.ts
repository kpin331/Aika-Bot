import { Composer } from "grammy";

export const help = new Composer();

help.command("help", (ctx) => {
    type Command = {
    nama: string;
    deskripsi: string;
    run: (args: string[]) => string;
};

    const command: Command[] = [
        { nama: "foto", deskripsi: "tampilkan foto", run: () => "berhasil" }
];

    command.push({
        nama: "help",
        deskripsi: "tampilkan semua command",
        run: () => 
            command
                .map(c => `${c.nama} ${c.deskripsi}`)
                .join("\n")
    });
});
