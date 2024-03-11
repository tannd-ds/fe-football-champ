import { u as useFetch, _ as __nuxt_component_0 } from './AppCard-b1bd43e4.mjs';
import { f as useRoute, b as useRouter, e as __nuxt_component_1 } from '../server.mjs';
import { _ as __nuxt_component_0$1 } from './TableBaseViewer-e8923ec1.mjs';
import { ref, withAsyncContext, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'tailwind-merge';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './uid-661a8ef2.mjs';
import '@vueuse/core';

const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    useRouter();
    const season_id = route.params.id;
    const season_name = "M\xF9a gi\u1EA3i " + season_id;
    let all_teams = ref({ "data": [] });
    all_teams.value = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/match/listteam/" + season_id, "$vxYfuTkeRo")), __temp = await __temp, __restore(), __temp);
    const filter_teams = computed(() => {
      return {
        data: all_teams.value.data.filter(
          (team) => team.season_id == season_id
        )
      };
    });
    let all_matches = ref({ "data": [] });
    all_matches.value = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/match/" + season_id, "$54pQw8kkS0")), __temp = await __temp, __restore(), __temp);
    let team_1_names = all_matches.value.data.team_1;
    let team_2_names = all_matches.value.data.team_2;
    all_matches.value.data = all_matches.value.data.schedule;
    const all_matches_filtered = computed(() => {
      let matches = { ...all_matches.value.data };
      for (let match_index in matches) {
        let match = matches[match_index];
        let match_date = new Date(match.date);
        let hour = match_date.getHours();
        let minute = match_date.getMinutes() ? match_date.getMinutes() : "00";
        match.time = hour + ":" + minute;
        let day = match_date.getDate();
        let month = match_date.getMonth() + 1;
        let year = match_date.getFullYear();
        match.date_only = day + "/" + month + "/" + year;
        matches[match_index] = match;
      }
      return matches;
    });
    const teams_columns = [
      { key: "name_team", label: "\u0110\u1ED9i" },
      { key: "win", label: "Th\u1EAFng" },
      { key: "draw", label: "H\xF2a" },
      { key: "lose", label: "Thua" },
      { key: "total", label: "\u0110i\u1EC3m" }
    ];
    function isMatchNotPassed(time) {
      let match_time = new Date(time);
      let current_time = /* @__PURE__ */ new Date();
      return match_time > current_time;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppCard = __nuxt_component_0;
      const _component_UIcon = __nuxt_component_1;
      const _component_TableBaseViewer = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full grid grid-cols-3 gap-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AppCard, { class: "col-span-2" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="text-3xl font-bold"${_scopeId}>L\u1ECBch Thi \u0110\u1EA5u</div><div${_scopeId}>${ssrInterpolate(season_name)}</div></div><div class="flex flex-col gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(all_matches_filtered), (match, match_index) => {
              _push2(`<div class="w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out"${_scopeId}><div class="w-full flex justify-between items-center"${_scopeId}><div class="ml-4 flex flex-col items-center"${_scopeId}><span class="font-bold text-xl"${_scopeId}>${ssrInterpolate(match.time)}</span><span class="text-zinc-400"${_scopeId}>${ssrInterpolate(match.date_only)}</span></div><div class="flex justify-between space-x-4"${_scopeId}><div class="font-bold font-mono text-xl"${_scopeId}>${ssrInterpolate(unref(team_1_names)[match_index].name_team)}</div><div${_scopeId}>VS</div><div class="font-bold font-mono text-xl"${_scopeId}>${ssrInterpolate(unref(team_2_names)[match_index].name_team)}</div></div><div class="tracking-[0.2em]"${_scopeId}>`);
              if (isMatchNotPassed(match.time)) {
                _push2(`<span${_scopeId}>S\u1EAFp Di\u1EC5n Ra</span>`);
              } else {
                _push2(`<span${_scopeId}>${ssrInterpolate(match.team1_score)}-${ssrInterpolate(match.team2_score)}</span>`);
              }
              _push2(`</div><div class="text-sm text-zinc-200 flex gap-2 items-center"${_scopeId}><span${_scopeId}>Chi Ti\u1EBFt</span>`);
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-chevron-right" }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--><div${_scopeId}>${ssrInterpolate(unref(all_matches).data.schedule)}</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "text-3xl font-bold" }, "L\u1ECBch Thi \u0110\u1EA5u"),
                createVNode("div", null, toDisplayString(season_name))
              ]),
              createVNode("div", { class: "flex flex-col gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(all_matches_filtered), (match, match_index) => {
                  return openBlock(), createBlock("div", { class: "w-full p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out" }, [
                    createVNode("div", { class: "w-full flex justify-between items-center" }, [
                      createVNode("div", { class: "ml-4 flex flex-col items-center" }, [
                        createVNode("span", { class: "font-bold text-xl" }, toDisplayString(match.time), 1),
                        createVNode("span", { class: "text-zinc-400" }, toDisplayString(match.date_only), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between space-x-4" }, [
                        createVNode("div", { class: "font-bold font-mono text-xl" }, toDisplayString(unref(team_1_names)[match_index].name_team), 1),
                        createVNode("div", null, "VS"),
                        createVNode("div", { class: "font-bold font-mono text-xl" }, toDisplayString(unref(team_2_names)[match_index].name_team), 1)
                      ]),
                      createVNode("div", { class: "tracking-[0.2em]" }, [
                        isMatchNotPassed(match.time) ? (openBlock(), createBlock("span", { key: 0 }, "S\u1EAFp Di\u1EC5n Ra")) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(match.team1_score) + "-" + toDisplayString(match.team2_score), 1))
                      ]),
                      createVNode("div", { class: "text-sm text-zinc-200 flex gap-2 items-center" }, [
                        createVNode("span", null, "Chi Ti\u1EBFt"),
                        createVNode(_component_UIcon, { name: "i-heroicons-chevron-right" })
                      ])
                    ])
                  ]);
                }), 256)),
                createVNode("div", null, toDisplayString(unref(all_matches).data.schedule), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_TableBaseViewer, {
        class: "",
        data: unref(filter_teams),
        columns: teams_columns
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>Danh S\xE1ch \u0110\u1ED9i B\xF3ng</div>`);
          } else {
            return [
              createVNode("div", null, "Danh S\xE1ch \u0110\u1ED9i B\xF3ng")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/season/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-2a243146.mjs.map
