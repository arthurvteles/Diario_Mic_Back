const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const dados = req.body;

    if (!dados || !dados.idt) {
        return res.status(400).json({ error: "Dados incompletos ou CPF não informado" });
    }

    try {
        await db("dados_diario").insert({
            Data_Diario: dados.Data,
            Hora: dados.Hora,
            QntdXixi: dados.QntdXixi,
            Correu: dados.Correu,
            Molhou: dados.Molhou,
            FezForcaXixi: dados.FezForcaXixi,
            HoraIngestao: dados.HoraIngestao,
            LiquidoIngerido: dados.LiquidoIngerido,
            QntdLiqIngerido: dados.QntdLiqIng,
            CocoSangue: dados.CocoSangue,
            FezMtaForca: dados.FezMtaForca,
            EntopeVaso: dados.EntopeVaso,
            Info_Extra: JSON.stringify(dados.InfoExtra),
            CPF: dados.idt,
        });

        console.log("Data inserted");
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error("Error inserting data:", error);
        return res.status(500).json({ error: "Erro ao inserir dados no diário" });
    }
}

