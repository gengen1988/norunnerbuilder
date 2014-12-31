// @ngInject
module.exports = function ($q, db) {

  this.getAllDocs = function () {
    var deferred = $q.defer();

    db.allDocs({
      include_docs: true
    }).then(function (result) {
      var docs = result.rows.map(function (row) {
        return {
          id: row.doc._id,
          rev: row.doc._rev,
          title: row.doc.title,
          markdown: row.doc.markdown,
          timestamp: row.doc.timestamp
        };
      });
      deferred.resolve(docs);
    });

    return deferred.promise;
  };

  this.removeDoc = function (id, rev) {
    var deferred = $q.defer();
    db.remove(id, rev).then(deferred.resolve);
    return deferred.promise;
  };

  this.upsertDoc = function (id, rev, markdown, title) {
    var deferred = $q.defer();
    var item = {
      markdown: markdown,
      title: title,
      timestamp: Date.now()
    };

    db.put(item, id, rev).then(function (doc) {
      return doc;

    }).catch(function (err) {
      if (err.status == 412) return db.post(item);
      throw err;

    }).then(deferred.resolve).catch(deferred.reject);
    return deferred.promise;
  };

  this.getDoc = function (id) {
    if (!id || id === '') return {};

    var deferred = $q.defer();
    db.get(id).then(function (doc) {
      deferred.resolve({
        id: doc._id,
        rev: doc._rev,
        title: doc.title,
        markdown: doc.markdown
      });
    });

    return deferred.promise;
  };

  this.compact = function () {
    db.compact();
  };

};
