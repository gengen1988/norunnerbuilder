// @ngInject
module.exports = function ($state, DocService, doc) {
  var vm = this;

  vm.data = doc.markdown;
  vm.title = doc.title;

  vm.aceOptions = {
    useWrapMode: true,
    mode: 'markdown',
    theme: 'twilight',
    onLoad: aceOnLoad
  };

  vm.save = function () {
    DocService.upsertDoc(doc.id, doc.rev, vm.data, vm.title).then(function (meta) {
      doc.rev = meta.rev;
      $state.go('detail', {id: meta.id}, {location: 'replace'});
    }).catch(function (err) {
      if (err.status === 409) {
        alert('冲突');
      }

    });
  };

  vm.cancel = function () {
    window.history.back();
  };

  function aceOnLoad(editor) {
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
