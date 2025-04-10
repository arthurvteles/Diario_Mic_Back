const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const dados = req.body;

    if (!dados?.id) {
        return res.status(400).json({ error: "ID do paciente não informado" });
    }

    try {
        const result = await db("cadastro_paciente")
            .select("id", "CPF", "Nome")
            .where("id", dados.id);

        if (result.length === 0) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }

        const { id, CPF, Nome } = result[0];
        return res.status(200).json({ Id: id, Nome, cpf: CPF, Status: 200 });
    } catch (error) {
        console.error("Erro no login automático do paciente:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
