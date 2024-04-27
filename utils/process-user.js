export default async function (users) {
  const team_list = await $fetch('http://localhost:8000/api/team/get');

  const team_mapper = team_list.reduce((acc, team) => {
    acc[team.id] = team.name_team;
    return acc;
  }, {});

  const user_role_mapper = {
    1: {
      text: 'Admin',
      color: 'purple',
    }, 
    0: {
      text: 'Quản Lý Đội',
      color: 'green',
    },
  };

  for (const user of users) {
    user.badge = user_role_mapper[user.role];
    user.name_team = team_mapper[user.team_id] || '_';
  }

  return users;
}