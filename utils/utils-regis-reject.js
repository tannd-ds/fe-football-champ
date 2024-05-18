
export default async function (regis) {
  if (!confirm('Bạn có chắc chắn muốn từ chối đăng ký này không?'))
    return;

  const { data: res } = await useFetch(`http://localhost:8000/api/register/refuse/${regis.listteam_id}`);
  return res;
}