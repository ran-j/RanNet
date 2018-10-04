function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
      //não mostra a pagina ao clicar no botão voltar do broswer     
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      // var token = res.headers['X-Access-Token'];
      // if (!token) {
      //   console.log(token);
      // }
      return next();
    } else {
      console.log(req.session.userId);
      res.render('ErroView/page-error-403');  
    }
}

module.exports = requiresLogin;