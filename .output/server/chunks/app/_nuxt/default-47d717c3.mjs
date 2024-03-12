import { _ as _export_sfc, f as useRoute, b as useRouter, e as __nuxt_component_1 } from '../server.mjs';
import { useSSRContext, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
import 'tailwind-merge';

const _sfc_main$2 = {
  __name: "DirectButton",
  __ssrInlineRender: true,
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {
      }
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["p-4 min-w-[64px] rounded-md flex flex-col justify-center items-center gap-2 cursor-pointer", {
          "bg-zinc-700 text-zinc-100 hover:bg-zinc-600": __props.isActive,
          "bg-zinc-900 text-zinc-100 hover:bg-zinc-800": !__props.isActive
        }]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-calendar-20-solid",
          class: "text-2xl"
        }, null, _parent));
      }, _push, _parent);
      _push(`<div class="font-bold text-center">`);
      ssrRenderSlot(_ctx.$slots, "text", {}, () => {
        _push(` Item X `);
      }, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/DirectButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = _sfc_main$2;
const _sfc_main$1 = {
  __name: "Container",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const direct_btns = [
      {
        name: "M\xF9a Gi\u1EA3i",
        icon: "i-heroicons-globe-alt-20-solid",
        path: "/season"
      },
      {
        name: "\u0110\u1ED9i B\xF3ng",
        icon: "i-heroicons-user-group-20-solid",
        path: "/team"
      },
      {
        name: "C\u1EA7u Th\u1EE7",
        icon: "i-heroicons-user-20-solid",
        path: "/soccer"
      },
      {
        name: "Tr\u1EADn \u0110\u1EA5u",
        icon: "i-heroicons-calendar-20-solid",
        path: "/"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SidebarDirectButton = __nuxt_component_0$1;
      const _component_UIcon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 w-[400px] h-screen bg-[#0A0A0A] flex flex-col gap-8" }, _attrs))}><div class="text-zinc-100 flex gap-4 items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-10 h-10 text-primary" viewBox="0 0 256 256"><path d="M116.588 105.225c5.441-7.808 16.893-7.94 22.537-.397l.287.397l58.699 84.24a.102.102 0 0 0 .079.044l.045-.008l.038-.028a.106.106 0 0 1 .082-.034l.044.012l.035.03l19.023 25.94c1.009 1.375.875 3.285-.351 4.472C194.062 242.242 162.639 256 128 256c-34.637 0-66.062-13.758-89.106-36.107c-1.153-1.12-1.34-2.875-.517-4.225l.166-.249l19.023-25.939a.103.103 0 0 1 .079-.042l.045.008l.037.027a.107.107 0 0 0 .084.036l.044-.013l.035-.031zM128 0c70.693 0 128 57.308 128 128c0 23.828-6.51 46.135-17.85 65.24c-1.181 1.99-3.92 2.173-5.428.482l-.175-.212l-18.616-24.407a3.558 3.558 0 0 1-.408-3.589c5.043-11.48 7.843-24.17 7.843-37.514c0-51.564-41.801-93.365-93.366-93.365c-51.564 0-93.365 41.801-93.365 93.365c0 13.343 2.8 26.032 7.842 37.513a3.569 3.569 0 0 1-.238 3.347l-.17.243l-18.615 24.407c-1.46 1.915-4.375 1.8-5.604-.27C6.51 174.134 0 151.827 0 128C0 57.308 57.308 0 128 0"></path></svg><div class="flex flex-col"><span class="font-black text-2xl text-primary">FOOTBALL</span><span class="font-black text-xl">SE103</span></div></div><div class="grid grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(direct_btns, (btn) => {
        _push(ssrRenderComponent(_component_SidebarDirectButton, {
          key: btn.name,
          "is-active": "/" + String(unref(route).name) == btn.path,
          "on-click": () => {
            unref(router).push(btn.path);
          }
        }, {
          icon: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: btn.icon,
                class: "text-3xl"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: btn.icon,
                  class: "text-3xl"
                }, null, 8, ["name"])
              ];
            }
          }),
          text: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(btn.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(btn.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/Container.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = _sfc_main$1;
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_SidebarContainer = __nuxt_component_0;
  _push(`<!--[--><div class="flex items-center gap-4">`);
  _push(ssrRenderComponent(_component_SidebarContainer, null, null, _parent));
  _push(`<div class="w-screen h-screen flex flex-row items-center justify-center">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div><div class="w-screen h-screen -z-1 absolute top-0 left-0 -z-[1]"><div class="bg-img w-screen h-screen absolute top-0 left-0"></div><div class="bg-overlay w-full h-full absolute top-0 left-0"></div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-47d717c3.mjs.map
