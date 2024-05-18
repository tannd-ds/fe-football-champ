export default async function (regis) {
  if (!confirm('Bạn có chắc chắn muốn chấp nhận đăng ký này không?'))
    return;

  const { data: res } = await useFetch(`http://localhost:8000/api/register/accept/${regis.listteam_id}`);
  return res;
}