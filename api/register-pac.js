const db = require("../db/knex");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    const {
        nome,
        sexo,
        nascimento,
        cpf,
        senha,
        pai,
        mae,
        telefone,
        crm
    } = req.body;

    if (!nome || !cpf || !senha || !crm) {
        return res.status(400).json({ error: "Dados obrigatórios ausentes" });
    }

    try {
        await db("cadastro_paciente").insert({
            Nome: nome,
            Sexo: sexo,
            Nascimento: nascimento,
            CPF: cpf,
            Senha: senha,
            NomePai: pai,
            NomeMae: mae,
            Telefone: telefone,
            CRM_do_Medico: crm,
        });

        console.log("Paciente cadastrado com sucesso.");
        return res.status(200).send("Paciente cadastrado.");
    } catch (error) {
        console.error("Erro ao cadastrar paciente:", error);
        return res.status(500).json({ error: "Erro ao cadastrar paciente" });
    }
}
