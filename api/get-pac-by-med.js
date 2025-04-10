// api/Pacientes.js
const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const dados = req.body;

    if (!dados?.medico) {
        return res.status(400).json({ error: "CRM do médico não fornecido" });
    }

    try {
        const pacientes = await db("cadastro_paciente")
            .select("Nome")
            .where("CRM_do_Medico", dados.medico);

        return res.status(200).json(pacientes);
    } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
