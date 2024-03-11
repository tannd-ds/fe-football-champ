import{i as y,r as k,g as x,h as B,w as s,j as n,o as w,a as r,b as i,k as S,l as T}from"./entry.05f95d07.js";import{_ as g}from"./Tooltip.8ced569f.js";import{_ as v}from"./TableBaseViewer.81dde405.js";import{u as c}from"./AppCard.f52cb022.js";import"./uid.5704820d.js";const C={class:"flex justify-between"},M=r("div",null,"Danh Sách Mùa Giải",-1),A={__name:"index",async setup(N){let t,l;const a=y();let o=k({data:[]});o.value=([t,l]=x(()=>c("http://localhost:8000/api/season","$PpWHSdb34T")),t=await t,l(),t);const p=[{key:"name_season",label:"Tên Mùa Giải",sortable:!0},{key:"start_date",label:"Ngày Bắt Đầu",sortable:!0},{key:"end_date",label:"Ngày Kết Thúc",sortable:!0},{key:"quantity_team",label:"SL Đội"},{key:"actions"}],u=e=>[[{label:"Chỉnh Sửa",icon:"i-heroicons-pencil-square-20-solid",click:()=>{a.push("season/update?season_id="+e.id)}},{label:"Xóa",icon:"i-heroicons-trash-20-solid",click:async()=>{confirm("Bạn có chắc chắn muốn xóa mùa giải này không?")&&(await c("http://localhost:8000/api/season/delete/"+e.id,"$BOeeK5giT4"),o.value=await c("http://localhost:8000/api/season","$qzMA0t6Qyf"))}}]];let m=e=>{a.push("season/detail/"+e.id)};return(e,_)=>{const d=S,h=T,f=g,b=v;return w(),B(b,{data:n(o),columns:p,items:u,onSelect:n(m)},{header:s(()=>[r("div",C,[M,i(f,{text:"Thêm Mùa Giải",popper:{placement:"bottom-end"}},{default:s(()=>[i(h,{onClick:_[0]||(_[0]=$=>n(a).push("season/update"))},{default:s(()=>[i(d,{name:"i-heroicons-plus-20-solid"})]),_:1})]),_:1})])]),_:1},8,["data","onSelect"])}}};export{A as default};
