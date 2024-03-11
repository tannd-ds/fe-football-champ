import { _ as __nuxt_component_0 } from './AppForm-caca175e.mjs';
import { _ as __nuxt_component_1$1$1, a as __nuxt_component_2, b as __nuxt_component_0$1 } from './Input-7d695d6b.mjs';
import { m as mergeConfig, s as select, h as appConfig, f as useRoute, b as useRouter, g as useToast, u as useHead, e as __nuxt_component_1$1, i as useUI, d as __nuxt_component_3$1, j as get, _ as _export_sfc } from '../server.mjs';
import { useSSRContext, ref, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, defineComponent, toRef, computed } from 'vue';
import { twMerge, twJoin } from 'tailwind-merge';
import { u as useFormGroup } from './uid-661a8ef2.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { u as useFetch } from './AppCard-b1bd43e4.mjs';
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

const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.select, select);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  components: {
    UIcon: __nuxt_component_1$1
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: ""
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: () => config.default.trailingIcon
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...appConfig.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [
          ...Object.keys(config.variant),
          ...Object.values(config.color).flatMap((value2) => Object.keys(value2))
        ].includes(value);
      }
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: "value"
    },
    selectClass: {
      type: String,
      default: null
    },
    class: {
      type: [String, Object, Array],
      default: void 0
    },
    ui: {
      type: Object,
      default: void 0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { emitFormChange, inputId, color, size, name } = useFormGroup(props, config);
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    const onChange = (event) => {
      emitFormChange();
      emit("change", event);
    };
    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, get(option, props.optionAttribute));
    };
    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, get(option, props.valueAttribute));
    };
    const normalizeOption = (option) => {
      if (["string", "number", "boolean"].includes(typeof option)) {
        return {
          [props.valueAttribute]: option,
          [props.optionAttribute]: option
        };
      }
      return {
        ...option,
        [props.valueAttribute]: guessOptionValue(option),
        [props.optionAttribute]: guessOptionText(option)
      };
    };
    const normalizedOptions = computed(() => {
      return props.options.map((option) => normalizeOption(option));
    });
    const normalizedOptionsWithPlaceholder = computed(() => {
      if (!props.placeholder) {
        return normalizedOptions.value;
      }
      return [
        {
          [props.valueAttribute]: "",
          [props.optionAttribute]: props.placeholder,
          disabled: true
        },
        ...normalizedOptions.value
      ];
    });
    const normalizedValue = computed(() => {
      const normalizeModelValue = normalizeOption(props.modelValue);
      const foundOption = normalizedOptionsWithPlaceholder.value.find((option) => option[props.valueAttribute] === normalizeModelValue[props.valueAttribute]);
      if (!foundOption) {
        return "";
      }
      return foundOption[props.valueAttribute];
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.size[size.value],
        props.padded ? ui.value.padding[size.value] : "p-0",
        variant == null ? void 0 : variant.replaceAll("{color}", color.value),
        (isLeading.value || slots.leading) && ui.value.leading.padding[size.value],
        (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]
      ), props.selectClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) {
        return props.loadingIcon;
      }
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) {
        return props.loadingIcon;
      }
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.leading.wrapper,
        ui.value.icon.leading.pointer,
        ui.value.icon.leading.padding[size.value]
      );
    });
    const leadingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && "animate-spin"
      );
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(
        ui.value.icon.trailing.wrapper,
        ui.value.icon.trailing.pointer,
        ui.value.icon.trailing.padding[size.value]
      );
    });
    const trailingIconClass = computed(() => {
      return twJoin(
        ui.value.icon.base,
        appConfig.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value),
        ui.value.icon.size[size.value],
        props.loading && !isLeading.value && "animate-spin"
      );
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      name,
      inputId,
      normalizedOptionsWithPlaceholder,
      normalizedValue,
      isLeading,
      isTrailing,
      // eslint-disable-next-line vue/no-dupe-keys
      selectClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      onInput,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = __nuxt_component_1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: _ctx.ui.wrapper
  }, _attrs))}><select${ssrRenderAttrs(mergeProps({
    id: _ctx.inputId,
    name: _ctx.name,
    value: _ctx.modelValue,
    required: _ctx.required,
    disabled: _ctx.disabled || _ctx.loading,
    class: ["form-select", _ctx.selectClass]
  }, _ctx.attrs))}><!--[-->`);
  ssrRenderList(_ctx.normalizedOptionsWithPlaceholder, (option, index) => {
    _push(`<!--[-->`);
    if (option.children) {
      _push(`<optgroup${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrRenderAttr("label", option[_ctx.optionAttribute])}><!--[-->`);
      ssrRenderList(option.children, (childOption, index2) => {
        _push(`<option${ssrRenderAttr("value", childOption[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(childOption[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(childOption.disabled) ? " disabled" : ""}>${ssrInterpolate(childOption[_ctx.optionAttribute])}</option>`);
      });
      _push(`<!--]--></optgroup>`);
    } else {
      _push(`<option${ssrRenderAttr("value", option[_ctx.valueAttribute])}${ssrIncludeBooleanAttr(option[_ctx.valueAttribute] === _ctx.normalizedValue) ? " selected" : ""}${ssrIncludeBooleanAttr(option.disabled) ? " disabled" : ""}>${ssrInterpolate(option[_ctx.optionAttribute])}</option>`);
    }
    _push(`<!--]-->`);
  });
  _push(`<!--]--></select>`);
  if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
    _push(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "leading", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.leadingIconName,
        class: _ctx.leadingIconClass
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
    _push(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}">`);
    ssrRenderSlot(_ctx.$slots, "trailing", {
      disabled: _ctx.disabled,
      loading: _ctx.loading
    }, () => {
      _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.trailingIconName,
        class: _ctx.trailingIconClass,
        "aria-hidden": "true"
      }, null, _parent));
    }, _push, _parent);
    _push(`</span>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Select.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = {
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormGroup = __nuxt_component_0$1;
      const _component_USelect = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UFormGroup, mergeProps({
        required: props.isRequired,
        size: "xl",
        label: props.label,
        name: props.name
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelect, {
              value: props.modelValue,
              onChange: ($event) => _ctx.$emit("update:modelValue", $event.target.value),
              options: props.options,
              "option-attribute": "name"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelect, {
                value: props.modelValue,
                onChange: ($event) => _ctx.$emit("update:modelValue", $event.target.value),
                options: props.options,
                "option-attribute": "name"
              }, null, 8, ["value", "onChange", "options"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/C/Select.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = _sfc_main$1;
const _sfc_main = {
  __name: "update",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const toasts = useToast();
    let PAGE_TITLE = "Th\xEAm C\u1EA7u Th\u1EE7 M\u1EDBi";
    let fetch_api = "http://localhost:8000/api/soccer/add";
    const state = ref({
      name_soccer: "",
      birthday: "",
      category: "",
      team_id: ""
    });
    if (route.query.soccer_id) {
      PAGE_TITLE = "Ch\u1EC9nh S\u1EEDa C\u1EA7u Th\u1EE7";
      fetch_api = "http://localhost:8000/api/soccer/update/" + route.query.soccer_id;
      const res = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/soccer/edit/" + route.query.soccer_id, "$IGIPKL0ACs")), __temp = await __temp, __restore(), __temp);
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
    const category_options = [
      { name: "Trong N\u01B0\u1EDBc", value: 0 },
      { name: "N\u01B0\u1EDBc Ngo\xE0i", value: 1 }
    ];
    const team_list = ([__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/team", "$4PFT4vEYXG")), __temp = await __temp, __restore(), __temp);
    const team_options = team_list.data.value.map((team) => {
      return {
        name: team.name_team,
        value: team.id
      };
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
        if (response === "Soccer update successfully" || response === "Soccer added successfully")
          router.push("/soccer");
        toasts.add({
          title: "Success",
          description: response
        });
      } catch (error) {
        console.error(error);
      }
    }
    const validate = (state2) => {
      const errors = [];
      if (state2.name_soccer === "") {
        errors.push({
          path: "name_soccer",
          message: "T\xEAn C\u1EA7u Th\u1EE7 kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (state2.birthday === "") {
        errors.push({
          path: "birthday",
          message: "Sinh Nh\u1EADt kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      } else {
        const birthday = new Date(state2.birthday).getFullYear();
        const today = (/* @__PURE__ */ new Date()).getFullYear();
        if (today - birthday < 18) {
          errors.push({
            "path": "birthday",
            "message": "C\u1EA7u Th\u1EE7 ph\u1EA3i t\u1EEB 18 tu\u1ED5i tr\u1EDF l\xEAn"
          });
        } else if (today - birthday > 40) {
          errors.push({
            path: "birthday",
            message: "C\u1EA7u Th\u1EE7 kh\xF4ng \u0111\u01B0\u1EE3c qu\xE1 40 tu\u1ED5i"
          });
        }
      }
      if (state2.category === "") {
        errors.push({
          path: "category",
          message: "Lo\u1EA1i C\u1EA7u Th\u1EE7 kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      if (state2.team_id === "") {
        errors.push({
          path: "team_id",
          message: "\u0110\u1ED9i B\xF3ng kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng"
        });
      }
      return errors;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppForm = __nuxt_component_0;
      const _component_UForm = __nuxt_component_1$1$1;
      const _component_CInput = __nuxt_component_2;
      const _component_CSelect = __nuxt_component_3;
      const _component_UButton = __nuxt_component_3$1;
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
                    modelValue: unref(state).name_soccer,
                    "onUpdate:modelValue": ($event) => unref(state).name_soccer = $event,
                    label: "T\xEAn C\u1EA7u Th\u1EE7",
                    name: "name_soccer",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CSelect, {
                    modelValue: unref(state).team_id,
                    "onUpdate:modelValue": ($event) => unref(state).team_id = $event,
                    options: unref(team_options),
                    label: "\u0110\u1ED9i B\xF3ng",
                    name: "team_id",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="w-full flex gap-4 items-stretch"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_CInput, {
                    class: "grow",
                    "input-type": "date",
                    modelValue: unref(state).birthday,
                    "onUpdate:modelValue": ($event) => unref(state).birthday = $event,
                    label: "Sinh Nh\u1EADt",
                    name: "birthday",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CSelect, {
                    class: "grow",
                    modelValue: unref(state).category,
                    "onUpdate:modelValue": ($event) => unref(state).category = $event,
                    options: category_options,
                    label: "Lo\u1EA1i C\u1EA7u Th\u1EE7",
                    name: "category",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, { type: "submit" }, {
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
                      modelValue: unref(state).name_soccer,
                      "onUpdate:modelValue": ($event) => unref(state).name_soccer = $event,
                      label: "T\xEAn C\u1EA7u Th\u1EE7",
                      name: "name_soccer",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CSelect, {
                      modelValue: unref(state).team_id,
                      "onUpdate:modelValue": ($event) => unref(state).team_id = $event,
                      options: unref(team_options),
                      label: "\u0110\u1ED9i B\xF3ng",
                      name: "team_id",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                    createVNode("div", { class: "w-full flex gap-4 items-stretch" }, [
                      createVNode(_component_CInput, {
                        class: "grow",
                        "input-type": "date",
                        modelValue: unref(state).birthday,
                        "onUpdate:modelValue": ($event) => unref(state).birthday = $event,
                        label: "Sinh Nh\u1EADt",
                        name: "birthday",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_CSelect, {
                        class: "grow",
                        modelValue: unref(state).category,
                        "onUpdate:modelValue": ($event) => unref(state).category = $event,
                        options: category_options,
                        label: "Lo\u1EA1i C\u1EA7u Th\u1EE7",
                        name: "category",
                        required: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode(_component_UButton, { type: "submit" }, {
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
                    modelValue: unref(state).name_soccer,
                    "onUpdate:modelValue": ($event) => unref(state).name_soccer = $event,
                    label: "T\xEAn C\u1EA7u Th\u1EE7",
                    name: "name_soccer",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_CSelect, {
                    modelValue: unref(state).team_id,
                    "onUpdate:modelValue": ($event) => unref(state).team_id = $event,
                    options: unref(team_options),
                    label: "\u0110\u1ED9i B\xF3ng",
                    name: "team_id",
                    required: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                  createVNode("div", { class: "w-full flex gap-4 items-stretch" }, [
                    createVNode(_component_CInput, {
                      class: "grow",
                      "input-type": "date",
                      modelValue: unref(state).birthday,
                      "onUpdate:modelValue": ($event) => unref(state).birthday = $event,
                      label: "Sinh Nh\u1EADt",
                      name: "birthday",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CSelect, {
                      class: "grow",
                      modelValue: unref(state).category,
                      "onUpdate:modelValue": ($event) => unref(state).category = $event,
                      options: category_options,
                      label: "Lo\u1EA1i C\u1EA7u Th\u1EE7",
                      name: "category",
                      required: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", null, [
                    createVNode(_component_UButton, { type: "submit" }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/soccer/update.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=update-cf7edf4a.mjs.map
