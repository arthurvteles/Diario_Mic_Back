const db = require("../db/knex");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await db.raw("SELECT CURDATE() as currentDate");
      console.log("Connection to MySQL server successful");
      res.status(200).send("<h1>Diariomic</h1>");
    } catch (error) {
      console.error("Error connecting to MySQL server:", error);
      res.status(500).send("Erro de conexão com o banco.");
    }
  } else {
    res.status(405).send("Método não permitido");
  }
}
