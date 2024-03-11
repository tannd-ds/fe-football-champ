import { _ as __nuxt_component_0 } from './AppForm-caca175e.mjs';
import { _ as __nuxt_component_1$1, a as __nuxt_component_2 } from './Input-7d695d6b.mjs';
import { f as useRoute, b as useRouter, g as useToast, u as useHead, d as __nuxt_component_3 } from '../server.mjs';
import { ref, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './AppCard-b1bd43e4.mjs';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '@vueuse/core';
import './uid-661a8ef2.mjs';
import 'tailwind-merge';
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
  __name: "update",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const toasts = useToast();
    let PAGE_TITLE = "Th\xEAm \u0110\u1ED9i B\xF3ng M\u1EDBi";
    let fetch_api = "http://localhost:8000/api/team/add";
    const state = ref({
      name_team: "",
      established_date: "",
      home_court: ""
    });
    if (route.query.team_id) {
      PAGE_TITLE = "Ch\u1EC9nh S\u1EEDa \u0110\u1ED9i B\xF3ng";
      fetch_api = "http://localhost:8000/api/team/update/" + route.query.team_id;
      const res = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/team/edit/" + route.query.team_id, "$yv7g5eaRyW")), __temp = await __temp, __restore(), __temp);
      for (const key in state.value) {
        state.value[key] = res.data.value[0][key];
      }
    }
    useHead({
      title: PAGE_TITLE,
      meta: [
        {
          name: "description",
          content: PAGE_TITLE
        }
      ]
    });
    async function handleSubmit() {
      try {
        const response = await $fetch(fetch_api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(state.value)
        });
        if (response === "Team update successfully" || response === "Team added successfully") {
          router.push("/team");
          toasts.add({
            title: "Success",
            description: response
          });
        }
      } catch (error) {
        toasts.add({
          title: "Error",
          description: error
        });
      }
    }
    const validate = (state2) => {
      const errors = [];
      if (state2.name_team === "") {
        errors.push({
          "path": "name_team",
          "message": "T\xEAn \u0111\u1ED9i kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (state2.established_date === "") {
        errors.push({
          "path": "established_date",
          "message": "Ng\xE0y th\xE0nh l\u1EADp kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (state2.home_court === "") {
        errors.push({
          "path": "home_court",
          "message": "S\xE2n nh\xE0 kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      return errors;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppForm = __nuxt_component_0;
      const _component_UForm = __nuxt_component_1$1;
      const _component_CInput = __nuxt_component_2;
      const _component_UButton = __nuxt_component_3;
      _push(ssrRenderComponent(_component_AppForm, mergeProps({ class: "w-[768px] h-[4/5vh]" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(PAGE_TITLE))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(PAGE_TITLE)), 1)
            ];
          }
        }),
        main: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UForm, {
              class: "flex flex-col gap-3",
              state: unref(state),
              validate,
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CInput, {
                    modelValue: unref(state).name_team,
                    "onUpdate:modelValue": ($event) => unref(state).name_team = $event,
                    label: "T\xEAn \u0110\u1ED9i",
                    name: "name_team",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CInput, {
                    class: "grow",
                    "input-type": "date",
                    modelValue: unref(state).established_date,
                    "onUpdate:modelValue": ($event) => unref(state).established_date = $event,
                    label: "Ng\xE0y Th\xE0nh L\u1EADp",
                    name: "established_date",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CInput, {
                    modelValue: unref(state).home_court,
                    "onUpdate:modelValue": ($event) => unref(state).home_court = $event,
                    label: "S\xE2n Nh\xE0",
                    name: "home_court",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    size: "xl",
                    type: "submit"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Submit`);
                      } else {
                        return [
                          createTextVNode("Submit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_CInput, {
                      modelValue: unref(state).name_team,
                      "onUpdate:modelValue": ($event) => unref(state).name_team = $event,
                      label: "T\xEAn \u0110\u1ED9i",
                      name: "name_team",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CInput, {
                      class: "grow",
                      "input-type": "date",
                      modelValue: unref(state).established_date,
                      "onUpdate:modelValue": ($event) => unref(state).established_date = $event,
                      label: "Ng\xE0y Th\xE0nh L\u1EADp",
                      name: "established_date",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CInput, {
                      modelValue: unref(state).home_court,
                      "onUpdate:modelValue": ($event) => unref(state).home_court = $event,
                      label: "S\xE2n Nh\xE0",
                      name: "home_court",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", null, [
                      createVNode(_component_UButton, {
                        size: "xl",
                        type: "submit"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Submit")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UForm, {
                class: "flex flex-col gap-3",
                state: unref(state),
                validate,
                onSubmit: handleSubmit
              }, {
                default: withCtx(() => [
                  createVNode(_component_CInput, {
                    modelValue: unref(state).name_team,
                    "onUpdate:modelValue": ($event) => unref(state).name_team = $event,
                    label: "T\xEAn \u0110\u1ED9i",
                    name: "name_team",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_CInput, {
                    class: "grow",
                    "input-type": "date",
                    modelValue: unref(state).established_date,
                    "onUpdate:modelValue": ($event) => unref(state).established_date = $event,
                    label: "Ng\xE0y Th\xE0nh L\u1EADp",
                    name: "established_date",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_CInput, {
                    modelValue: unref(state).home_court,
                    "onUpdate:modelValue": ($event) => unref(state).home_court = $event,
                    label: "S\xE2n Nh\xE0",
                    name: "home_court",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", null, [
                    createVNode(_component_UButton, {
                      size: "xl",
                      type: "submit"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Submit")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["state"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/match/update.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=update-ca0f260c.mjs.map
