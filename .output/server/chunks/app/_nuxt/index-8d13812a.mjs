import { _ as __nuxt_component_0 } from './AppForm-caca175e.mjs';
import { withAsyncContext, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { u as useFetch } from './AppCard-b1bd43e4.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import '../server.mjs';
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

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    [__temp, __restore] = withAsyncContext(() => useFetch("http://localhost:8000/api/season", "$PslAyef5YX")), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppForm = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AppForm, mergeProps({ class: "w-[768px]" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hello world `);
          } else {
            return [
              createTextVNode(" Hello world ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-8d13812a.mjs.map
