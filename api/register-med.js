const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const { nome, crm, email, senha } = req.body;

    if (!nome || !crm || !email || !senha) {
        return res.status(400).json({ error: "Dados incompletos" });
    }

    try {
        await db("cadastro_medico").insert({
            Nome: nome,
            CRM: crm,
            Email: email,
            Senha: senha,
        });

        console.log("Médico cadastrado com sucesso.");
        return res.status(200).send("Medico cadastrado.");
    } catch (error) {
        console.error("Erro ao cadastrar médico:", error);
        return res.status(500).json({ error: "Erro ao cadastrar médico" });
    }
}
