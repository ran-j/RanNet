const ElizaBot = require("../../libs/elizaBot");

/**
 * Conversation with bot
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const say = (req, res, next) => {
    let eliz = new ElizaBot()

    if(!req.body.input) return res.end (eliz.getInitial())

    res.end(eliz.transform(req.body.input))
}
 
module.exports = {
    say
}