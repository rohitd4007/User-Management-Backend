module.exports = {
  async up(db, client) {

    return db.collection('users').updateOne({ firstname: 'Keely' }, { $set: { lastname: "Showw" } });
  },

  async down(db, client) {

    return db.collection('users').updateOne({ firstname: 'Suresh' }, { $set: { lastname: "Shetty" } });
  }
};
