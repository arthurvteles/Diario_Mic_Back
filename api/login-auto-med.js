const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const dados = req.body;

    if (!dados?.id) {
        return res.status(400).json({ error: "ID do médico não informado" });
    }

    try {
        const result = await db("cadastro_medico")
            .select("id", "CRM")
            .where("id", dados.id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Médico não encontrado" });
        }

        const { id, CRM } = result[0];
        return res.status(200).json({ Id: id, crm: CRM, Status: 200 });
    } catch (error) {
        console.error("Erro ao realizar login automático:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
