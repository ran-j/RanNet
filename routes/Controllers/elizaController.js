const ElizaBot = require("../../libs/elizaBot");

var ElizaList = []
var IdentFyList = []

/**
 * Conversation with bot
 * @param {Object} req Requisição do usuário
 * @param {Object} res resposta do servidor
 * @param {Object} next Função next
 * @returns HTML
 */
const say = (req, res, next) => {
    let eliz = new ElizaBot()

    if(IdentFyList.indexOf(req.session.userId) > -1) {
        console.log("Using existing one")
        if(!ElizaList[IdentFyList.indexOf(req.session.userId)]) {
            ElizaList[IdentFyList.indexOf(req.session.userId)].push(eliz)
        }
        res.end(ElizaList[IdentFyList.indexOf(req.session.userId)].transform(req.body.input))
    } else {
        console.log("Intance a new eliza")
        ElizaList.push(eliz)
        let index = (IdentFyList.push(req.session.userId)) - 1;
        res.end(ElizaList[index].transform(req.body.input))
    }

}
 
module.exports = {
    say
}