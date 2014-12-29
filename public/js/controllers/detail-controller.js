// @ngInject
module.exports = function (db, doc) {
  var vm = this;

  vm.data = doc.markdown;
  vm.title = doc.title;

  vm.aceOptions = {
    useWrapMode: true,
    mode: 'markdown',
    theme: 'twilight',
    onLoad: onLoad
  };

  vm.save = function () {
    var item = {
      markdown: vm.data,
      title: vm.title
    };

    if (!doc.id) {
      db.post(item);
      return;
    }

    db.put(item, doc.id, doc.rev);
  };

  vm.cancel = function () {
    window.history.back();
  };

  function onLoad(editor) {
    editor.getSession().setTabSize(2);
    editor.setFontSize(16);
    editor.commands.addCommand({
      name: 'save',
      bindKey: {
        win: 'Ctrl-S',
        mac: 'Command-S'
      },
      exec: vm.save
    });
  }

};
