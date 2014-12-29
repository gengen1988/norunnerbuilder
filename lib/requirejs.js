module.exports = function (req, res) {
  res.sendFile(require.resolve('requirejs/require.js'));
};
