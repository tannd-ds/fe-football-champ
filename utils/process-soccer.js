export default async function (soccers) {
  const team_list = await $fetch('http://localhost:8000/api/team/get');

  const team_mapper = team_list.reduce((acc, team) => {
    acc[team.id] = team.name_team;
    return acc;
  }, {});

  for (const soccer of soccers) {
    soccer.category_text = (soccer.category === 0) 
        ? 'Trong Nước' 
        : 'Nước Ngoài';  

    soccer.badge = {
      value: soccer.category,
      text: soccer.category_text,
      color: (soccer.category === 0) ? 'green' : 'purple'
    };

    if (soccer.team_id === null) {
      soccer.team_name = 'Chưa Có Đội Bóng';
    } else { 
      soccer.team_name = team_mapper[soccer.team_id];
    }
  }
  return soccers;
}