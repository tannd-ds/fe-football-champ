import { _ as __nuxt_component_0$1 } from './AppCard-b1bd43e4.mjs';
import { withCtx, createVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppCard = __nuxt_component_0$1;
  _push(ssrRenderComponent(_component_AppCard, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="mb-4"${_scopeId}><div class="font-black text-3xl"${_scopeId}>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div>`);
        ssrRenderSlot(_ctx.$slots, "subheader", {}, null, _push2, _parent2, _scopeId);
        _push2(`</div>`);
        ssrRenderSlot(_ctx.$slots, "main", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          createVNode("div", { class: "mb-4" }, [
            createVNode("div", { class: "font-black text-3xl" }, [
              renderSlot(_ctx.$slots, "header")
            ]),
            renderSlot(_ctx.$slots, "subheader")
          ]),
          renderSlot(_ctx.$slots, "main")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AppForm-caca175e.mjs.map
