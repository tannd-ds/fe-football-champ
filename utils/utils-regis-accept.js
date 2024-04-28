export default async function (regis) {
  if (!confirm('Bạn có chắc chắn muốn xóa mùa giải này không?'))
    return;
  const { data: res } = await useFetch(`http://localhost:8000/api/register/accept/${regis.listteam_id}`);

  return res;
}