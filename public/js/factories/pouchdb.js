module.exports = function () {
  // PouchDB.debug.enable('*');
  var localDB = new PouchDB('pouchdb');
  var remoteDB = new PouchDB('http://127.0.0.1:5984/pouchdb');
  localDB.sync(remoteDB);
  return localDB;
};
