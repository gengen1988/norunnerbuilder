// @ngInject
module.exports = function ($state, db, doc) {
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
      title: vm.title,
      timestamp: Date.now()
    };

    if (!doc.id) return db.post(item).then(function (post) {
      $state.go('detail', {
        id: post.id
      });
    });

    db.put(item, doc.id, doc.rev).catch(function (err) {
      if (err.status == 409) {
        console.log(item, doc.id, doc.rev);
        db.get(doc.id).then(function (doc) {
          alert(JSON.stringify({
            message: '检查到冲突',
            current: item.markdown,
            remote: doc.markdown
          }, null, 2));
        });
      }
    });
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
