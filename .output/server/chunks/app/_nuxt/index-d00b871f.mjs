import { _ as __nuxt_component_0 } from './TableBaseViewer-e8923ec1.mjs';
import { _ as __nuxt_component_1 } from './Tooltip-79a1cfec.mjs';
import { b as useRouter, d as __nuxt_component_3, e as __nuxt_component_1$1 } from '../server.mjs';
import { ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './AppCard-b1bd43e4.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import 'tailwind-merge';
import './uid-661a8ef2.mjs';
import '@vueuse/core';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const router = useRouter();
    let seasons = ref({ "data": [] });
    seasons.value = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/team", "$B1120AdAGh")), __temp = await __temp, __restore(), __temp);
    const columns = [
      { key: "name_team", label: "T\xEAn \u0110\u1ED9i", sortable: true },
      { key: "quantity_soccer", label: "SL C\u1EA7u Th\u1EE7", sortable: true },
      { key: "established_date", label: "Ng\xE0y Th\xE0nh L\u1EADp" },
      { key: "home_court", label: "S\xE2n Nh\xE0" },
      { key: "actions" }
    ];
    const items = (row) => [
      [{
        label: "Ch\u1EC9nh S\u1EEDa",
        icon: "i-heroicons-pencil-square-20-solid",
        click: () => {
          router.push("team/update/?team_id=" + row.id);
        }
      }, {
        label: "X\xF3a",
        icon: "i-heroicons-trash-20-solid",
        click: async () => {
          if (confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a \u0111\u1ED9i b\xF3ng n\xE0y kh\xF4ng?")) {
            await useFetch("http://localhost:8000/api/team/delete/" + row.id, "$o5yHmiUO82");
            seasons.value = await useFetch("http://localhost:8000/api/team", "$qmewxjVnca");
          }
        }
      }]
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TableBaseViewer = __nuxt_component_0;
      const _component_UTooltip = __nuxt_component_1;
      const _component_UButton = __nuxt_component_3;
      const _component_UIcon = __nuxt_component_1$1;
      _push(ssrRenderComponent(_component_TableBaseViewer, mergeProps({
        data: unref(seasons),
        columns,
        items
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-between"${_scopeId}><div${_scopeId}>Danh S\xE1ch \u0110\u1ED9i B\xF3ng</div>`);
            _push2(ssrRenderComponent(_component_UTooltip, {
              text: "Th\xEAm \u0110\u1ED9i B\xF3ng",
              popper: { placement: "bottom-end" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => unref(router).push("team/update")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-plus-20-solid" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UIcon, { name: "i-heroicons-plus-20-solid" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      onClick: ($event) => unref(router).push("team/update")
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, { name: "i-heroicons-plus-20-solid" })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-between" }, [
                createVNode("div", null, "Danh S\xE1ch \u0110\u1ED9i B\xF3ng"),
                createVNode(_component_UTooltip, {
                  text: "Th\xEAm \u0110\u1ED9i B\xF3ng",
                  popper: { placement: "bottom-end" }
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      onClick: ($event) => unref(router).push("team/update")
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, { name: "i-heroicons-plus-20-solid" })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/team/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-d00b871f.mjs.map
