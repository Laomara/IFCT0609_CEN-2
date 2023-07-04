const { notas } = require("./nota");
exports.getNotas = (req, res, next) => {
    return res.json(nota);
}