import{_ as T,a as V}from"./Form.abd1d821.js";import{m as S,i as v,n as q,r as w,g as N,u as k,h as B,w as u,o as C,d as c,t as U,j as o,b as n,a as A,l as E}from"./entry.05f95d07.js";import{_ as F}from"./AppForm.cb4da8ab.js";import{u as j}from"./AppCard.f52cb022.js";import"./uid.5704820d.js";const R={__name:"update",async setup(z){let l,i;const r=S(),h=v(),p=q();let m="Thêm Đội Bóng Mới",_="http://localhost:8000/api/team/add";const a=w({name_team:"",established_date:"",home_court:""});if(r.query.team_id){m="Chỉnh Sửa Đội Bóng",_="http://localhost:8000/api/team/update/"+r.query.team_id;const t=([l,i]=N(()=>j("http://localhost:8000/api/team/edit/"+r.query.team_id,"$zd2J23qpWn")),l=await l,i(),l);for(const e in a.value)a.value[e]=t.data.value[0][e]}k({title:m,meta:[{name:"description",content:m}]});async function f(){try{const t=await $fetch(_,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.value)});(t==="Team update successfully"||t==="Team added successfully")&&(h.push("/team"),p.add({title:"Success",description:t}))}catch(t){p.add({title:"Error",description:t})}}const g=t=>{const e=[];return t.name_team===""&&e.push({path:"name_team",message:"Tên đội không được để trống"}),t.established_date===""&&e.push({path:"established_date",message:"Ngày thành lập không được để trống"}),t.home_court===""&&e.push({path:"home_court",message:"Sân nhà không được để trống"}),e};return(t,e)=>{const d=T,y=E,b=V,x=F;return C(),B(x,{class:"w-[768px] h-[4/5vh]"},{header:u(()=>[c(U(o(m)),1)]),main:u(()=>[n(b,{class:"flex flex-col gap-3",state:o(a),validate:g,onSubmit:f},{default:u(()=>[n(d,{modelValue:o(a).name_team,"onUpdate:modelValue":e[0]||(e[0]=s=>o(a).name_team=s),label:"Tên Đội",name:"name_team",required:""},null,8,["modelValue"]),n(d,{class:"grow","input-type":"date",modelValue:o(a).established_date,"onUpdate:modelValue":e[1]||(e[1]=s=>o(a).established_date=s),label:"Ngày Thành Lập",name:"established_date",required:""},null,8,["modelValue"]),n(d,{modelValue:o(a).home_court,"onUpdate:modelValue":e[2]||(e[2]=s=>o(a).home_court=s),label:"Sân Nhà",name:"home_court",required:""},null,8,["modelValue"]),A("div",null,[n(y,{size:"xl",type:"submit"},{default:u(()=>[c("Submit")]),_:1})])]),_:1},8,["state"])]),_:1})}}};export{R as default};