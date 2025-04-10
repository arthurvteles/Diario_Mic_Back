const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ error: "Credenciais incompletas" });
    }

    try {
        const result = await db("cadastro_medico")
            .select("id", "CRM", "Senha")
            .where("CRM", login);

        if (result.length === 0) {
            return res.status(401).json({ error: "Médico não encontrado" });
        }

        const medico = result[0];

        if (medico.Senha === senha) {
            return res.status(200).json({ Id: medico.id, Status: 200 });
        } else {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error("Erro no login do médico:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
