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
        const result = await db("cadastro_paciente")
            .select("id", "CPF", "Senha", "Nome")
            .where("CPF", login);

        if (result.length === 0) {
            return res.status(401).json({ error: "Paciente não encontrado" });
        }

        const paciente = result[0];

        if (paciente.Senha === senha) {
            return res.status(200).json({
                Id: paciente.id,
                Nome: paciente.Nome,
                cpf: paciente.CPF,
                Status: 200,
            });
        } else {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }
    } catch (error) {
        console.error("Erro no login do paciente:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
