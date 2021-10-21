
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auth.roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('auth.roles').insert([
        {role_id: 'superuser', role_nm: 'Superuser'},
        {role_id: 'admin', role_nm: 'Admin'},
        {role_id: 'player', role_nm: 'Player'}
      ]);
    });
};
