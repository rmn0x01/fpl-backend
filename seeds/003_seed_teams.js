
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('fpl.teams').del()
      .then(function () {
        // Inserts seed entries
        return knex('fpl.teams').insert([
            {team_id: 'T001', team_nm: 'Arsenal', team_img: 'T001.png', is_on_pl: '1'},
            {team_id: 'T002', team_nm: 'Aston Villa', team_img: 'T002.png', is_on_pl: '1'},
            {team_id: 'T003', team_nm: 'Brentford', team_img: 'T003.png', is_on_pl: '1'},
            {team_id: 'T004', team_nm: 'Brighton and Hove Albion', team_img: 'T004.png', is_on_pl: '1'},
            {team_id: 'T005', team_nm: 'Burnley', team_img: 'T005.png', is_on_pl: '1'},
            {team_id: 'T006', team_nm: 'Chelsea', team_img: 'T006.png', is_on_pl: '1'},
            {team_id: 'T007', team_nm: 'Crystal Palace', team_img: 'T007.png', is_on_pl: '1'},
            {team_id: 'T008', team_nm: 'Everton', team_img: 'T008.png', is_on_pl: '1'},
            {team_id: 'T009', team_nm: 'Leeds United', team_img: 'T009.png', is_on_pl: '1'},
            {team_id: 'T010', team_nm: 'Leicester City', team_img: 'T010.png', is_on_pl: '1'},
            {team_id: 'T011', team_nm: 'Liverpool', team_img: 'T011.png', is_on_pl: '1'},
            {team_id: 'T012', team_nm: 'Manchester City', team_img: 'T012.png', is_on_pl: '1'},
            {team_id: 'T013', team_nm: 'Manchester United', team_img: 'T013.png', is_on_pl: '1'},
            {team_id: 'T014', team_nm: 'Newcastle United', team_img: 'T014.png', is_on_pl: '1'},
            {team_id: 'T015', team_nm: 'Norwich City', team_img: 'T015.png', is_on_pl: '1'},
            {team_id: 'T016', team_nm: 'Southampton', team_img: 'T016.png', is_on_pl: '1'},
            {team_id: 'T017', team_nm: 'Tottenham Hotspur', team_img: 'T017.png', is_on_pl: '1'},
            {team_id: 'T018', team_nm: 'Watford', team_img: 'T018.png', is_on_pl: '1'},
            {team_id: 'T019', team_nm: 'West Ham United', team_img: 'T019.png', is_on_pl: '1'},
            {team_id: 'T020', team_nm: 'Wolverhampton Wanderers', team_img: 'T020.png', is_on_pl: '1'},
        ]);
      });
  };
  