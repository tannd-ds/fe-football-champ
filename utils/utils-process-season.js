export default async function (seasons) {

  let season_badge_mapper = {
    "Chưa diễn ra": 'green',
    "Đang diễn ra": 'purple',
    "Đã kết thúc": 'red',
  }

  for (const season of seasons) {
    season.badge = {
      text: season.status,
      color: season_badge_mapper[season.status]
    }
  }
  return seasons;
}