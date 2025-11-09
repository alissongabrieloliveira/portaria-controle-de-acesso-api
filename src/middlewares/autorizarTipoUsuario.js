// Autoriza por tipo de usuário
function autorizarTipoUsuario(...tiposPermitidos) {
  return (req, res, next) => {
    const tipo = req.usuario?.tipo_usuario;

    if (!tipo || !tiposPermitidos.includes(tipo)) {
      return res
        .status(403)
        .json({ error: "Acesso negado: permissão insuficiente." });
    }

    next();
  };
}

module.exports = autorizarTipoUsuario;
