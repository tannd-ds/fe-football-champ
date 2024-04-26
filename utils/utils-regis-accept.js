export default async function (regis) {
  if (!confirm('Bạn có chắc chắn muốn xóa mùa giải này không?'))
    return;
  console.log(regis);
  const res = await useFetch(`http://localhost:8000/api/register/accept/${regis.listteam_id}`);

  if (res.status === 200) {
    alert('Xác nhận đăng ký thành công');
  }

  if (res.status === 400) {
    alert('Xác nhận đăng ký thất bại');
  }
}