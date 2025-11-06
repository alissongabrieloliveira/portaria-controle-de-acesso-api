const healthCheck = (req, res) => {
  res.status(200).json({ status: "ok", message: "API está rodando!" });
};

module.exports = { healthCheck };
