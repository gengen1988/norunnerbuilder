var renderer = module.exports = new marked.Renderer();

renderer.table = function (header, body) {
  return [
    '<table class="table">\n',
    '<thead>\n',
    header,
    '</thead>\n',
    '<tbody>\n',
    body,
    '</tbody>\n',
    '</table>\n'
  ].join('');
};

renderer.image = function(href, title, text) {
  var out = '<img class="img-responsive" src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};
