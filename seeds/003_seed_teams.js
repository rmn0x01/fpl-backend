
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('fpl.teams').del()
      .then(function () {
        // Inserts seed entries
        return knex('fpl.teams').insert([
            {team_id: '1', team_nm: 'Arsenal'},
            {team_id: '2', team_nm: 'Aston Villa'},
            {team_id: '3', team_nm: 'Brentford'},
            {team_id: '4', team_nm: 'Brighton'},
            {team_id: '5', team_nm: 'Burnley'},
            {team_id: '6', team_nm: 'Chelsea'},
            {team_id: '7', team_nm: 'Crystal Palace'},
            {team_id: '8', team_nm: 'Everton'},
            {team_id: '9', team_nm: 'Leicester'},
            {team_id: '10', team_nm: 'Leeds'},
            {team_id: '11', team_nm: 'Liverpool'},
            {team_id: '12', team_nm: 'Man City'},
            {team_id: '13', team_nm: 'Man Utd'},
            {team_id: '14', team_nm: 'Newcastle'},
            {team_id: '15', team_nm: 'Norwich'},
            {team_id: '16', team_nm: 'Southampton'},
            {team_id: '17', team_nm: 'Spurs'},
            {team_id: '18', team_nm: 'Watford'},
            {team_id: '19', team_nm: 'West Ham'},
            {team_id: '20', team_nm: 'Wolves'},
        ]);
      });
  };
  