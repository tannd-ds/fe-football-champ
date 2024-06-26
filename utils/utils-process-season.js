export default function (seasons) {
  let season_badge_mapper = {
    '0': {
      text: 'Chưa bắt đầu',
      color: 'gray',
    },
    '1': {
      text: 'Đang diễn ra',
      color: 'green',
    },
    '2': {
      text: 'Đã kết thúc',
      color: 'red',
    }
  }

  for (const season of seasons) {
    season.badge = season_badge_mapper[season.status];
  }
  return seasons;
}