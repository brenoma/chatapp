/*
  Catch Errors Handler
*/

exports.catchErrors = (fn) => {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => {
        // Validação de erros
        if (typeof err === "string") {
          res.status(400).json({
            message: err,
          });
        } else {
          next(err);
        }
      });
    };
  };
  
  /*
    MongoDB Validation Error Handler
      Detecção de erros nas validações do MongoDB
  */
  
  exports.mongoseErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key) => (message += err.errors[key].message + ", "));
  
    message = message.substr(0, message.length - 2);
  
    res.status(400).json({
      message,
    });
  };
  
  /*
    Development Error Handler
      No desenvolvimento, mostramos boas mensagens de erro, portanto, se encontrarmos um erro de sintaxe ou qualquer outro erro não tratado anteriormente, podemos mostrar boas informações sobre o que aconteceu

  */

  exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
      message: err.message,
      status: err.status,
      stack: err.stack,
    };
  
    res.status(err.status || 500).json(errorDetails);
  };
  
  /*
    Production Error Handler
      Tratamento para não vazarem relatórios dos quadros de pilhas e detalhes dos erros para o usuário
  */
 
  exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
      error: "Internal Server Error",
    });
  };
  
  /*
  404 Page Error
  */
  
  exports.notFound = (req, res, next) => {
    res.status(404).json({
      message: "Route not found",
    });
  };