const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auth.users').del()
    .then(async function () {
      // Inserts seed entries
      const encryptedPassword = await bcrypt.hash('12345qwert', 10)
      return knex('auth.users').insert([
        {user_id: 'superuser', user_nm: 'Superuser', email: 'superuser@gmail.com', password: encryptedPassword, role_id: 'superuser'},
        {user_id: 'admin', user_nm: 'Admin', email: 'admin@gmail.com', password: encryptedPassword, role_id: 'admin'},
        {user_id: 'player', user_nm: 'Player', email: 'player@gmail.com', password: encryptedPassword, role_id: 'player'},
      ]);
    });
};
