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
    let PAGE_TITLE = "Th\xEAm M\xF9a Gi\u1EA3i M\u1EDBi";
    let fetch_api = "http://localhost:8000/api/season/add";
    const state = ref({
      name_season: "",
      start_date: "",
      end_date: "",
      quantity_team: ""
    });
    if (route.query.season_id) {
      PAGE_TITLE = "Ch\u1EC9nh S\u1EEDa M\xF9a Gi\u1EA3i";
      fetch_api = "http://localhost:8000/api/season/update/" + route.query.season_id;
      const res = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/season/edit/" + route.query.season_id, "$VKXb1ni4Fj")), __temp = await __temp, __restore(), __temp);
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
        if (response === "Season update successfully" || response === "Season added successfully") {
          router.push("/season");
          toasts.add({
            title: "Success",
            description: response
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    const validate = (state2) => {
      const errors = [];
      if (!state2.name_season) {
        errors.push({
          path: "name_season",
          message: "T\xEAn m\xF9a gi\u1EA3i kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (!state2.start_date) {
        errors.push({
          path: "start_date",
          message: "Ng\xE0y b\u1EAFt \u0111\u1EA7u kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (!state2.end_date) {
        errors.push({
          path: "end_date",
          message: "Ng\xE0y k\u1EBFt th\xFAc kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (!state2.quantity_team) {
        errors.push({
          path: "quantity_team",
          message: "S\u1ED1 l\u01B0\u1EE3ng \u0111\u1ED9i kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
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
                    modelValue: unref(state).name_season,
                    "onUpdate:modelValue": ($event) => unref(state).name_season = $event,
                    label: "T\xEAn M\xF9a Gi\u1EA3i",
                    name: "name_season",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="w-full flex gap-4 items-stretch"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_CInput, {
                    class: "grow",
                    modelValue: unref(state).start_date,
                    "onUpdate:modelValue": ($event) => unref(state).start_date = $event,
                    label: "Ng\xE0y B\u1EAFt \u0110\u1EA7u",
                    name: "start_date",
                    "input-type": "date",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CInput, {
                    class: "grow",
                    modelValue: unref(state).end_date,
                    "onUpdate:modelValue": ($event) => unref(state).end_date = $event,
                    label: "Ng\xE0y K\u1EBFt Th\xFAc",
                    name: "end_date",
                    "input-type": "date",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_CInput, {
                    modelValue: unref(state).quantity_team,
                    "onUpdate:modelValue": ($event) => unref(state).quantity_team = $event,
                    label: "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1ED9i",
                    name: "quantity_team",
                    "input-type": "number",
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
                      modelValue: unref(state).name_season,
                      "onUpdate:modelValue": ($event) => unref(state).name_season = $event,
                      label: "T\xEAn M\xF9a Gi\u1EA3i",
                      name: "name_season",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "w-full flex gap-4 items-stretch" }, [
                      createVNode(_component_CInput, {
                        class: "grow",
                        modelValue: unref(state).start_date,
                        "onUpdate:modelValue": ($event) => unref(state).start_date = $event,
                        label: "Ng\xE0y B\u1EAFt \u0110\u1EA7u",
                        name: "start_date",
                        "input-type": "date",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_CInput, {
                        class: "grow",
                        modelValue: unref(state).end_date,
                        "onUpdate:modelValue": ($event) => unref(state).end_date = $event,
                        label: "Ng\xE0y K\u1EBFt Th\xFAc",
                        name: "end_date",
                        "input-type": "date",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_CInput, {
                      modelValue: unref(state).quantity_team,
                      "onUpdate:modelValue": ($event) => unref(state).quantity_team = $event,
                      label: "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1ED9i",
                      name: "quantity_team",
                      "input-type": "number",
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
                    modelValue: unref(state).name_season,
                    "onUpdate:modelValue": ($event) => unref(state).name_season = $event,
                    label: "T\xEAn M\xF9a Gi\u1EA3i",
                    name: "name_season",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "w-full flex gap-4 items-stretch" }, [
                    createVNode(_component_CInput, {
                      class: "grow",
                      modelValue: unref(state).start_date,
                      "onUpdate:modelValue": ($event) => unref(state).start_date = $event,
                      label: "Ng\xE0y B\u1EAFt \u0110\u1EA7u",
                      name: "start_date",
                      "input-type": "date",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CInput, {
                      class: "grow",
                      modelValue: unref(state).end_date,
                      "onUpdate:modelValue": ($event) => unref(state).end_date = $event,
                      label: "Ng\xE0y K\u1EBFt Th\xFAc",
                      name: "end_date",
                      "input-type": "date",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_component_CInput, {
                    modelValue: unref(state).quantity_team,
                    "onUpdate:modelValue": ($event) => unref(state).quantity_team = $event,
                    label: "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1ED9i",
                    name: "quantity_team",
                    "input-type": "number",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/season/update.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=update-87b1c7e1.mjs.map
