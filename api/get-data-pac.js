// api/dados_paciente.js
const db = require("./../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const dados = req.body;

    if (!dados?.paciente) {
        return res.status(400).json({ error: "Nome do paciente não fornecido" });
    }

    try {
        // Buscar CPF do paciente
        const resultadoPaciente = await db("cadastro_paciente")
            .select("CPF")
            .where("Nome", dados.paciente)
            .first();

        if (!resultadoPaciente) {
            return res.status(404).json({ error: "Paciente não encontrado" });
        }

        const cpf = resultadoPaciente.CPF;

        // Buscar dados do diário
        const dadosDiario = await db("dados_diario").where("CPF", cpf);

        return res.status(200).json(dadosDiario);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
