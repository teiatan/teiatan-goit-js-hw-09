!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in o)return o[e].exports;if(e in n){var t=n[e];delete n[e];var r={id:e,exports:{}};return o[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,o){n[e]=o},e.parcelRequired7c6=t);var r=t("h6c0i"),i={form:document.querySelector(".form"),delay:document.querySelector('[name="delay"]'),step:document.querySelector('[name="step"]'),amount:document.querySelector('[name="amount"]')};function u(e,o){var n=Math.random()>.3;return new Promise((function(t,r){n?t({position:e,delay:o}):r({position:e,delay:o})}))}i.form.addEventListener("submit",(function(e){e.preventDefault();var o=Number(i.delay.value),n=Number(i.step.value),t=Number(i.amount.value);i.form.reset(),console.log(n);for(var a=1;a<=t;a+=1)u(a,o).then((function(e){var o=e.position,n=e.delay;setTimeout((function(){r.Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(n," ms"))}),n)})).catch((function(e){var o=e.position,n=e.delay;setTimeout((function(){r.Notify.failure("❌ Rejected promise ".concat(o," in ").concat(n," ms"))}),n)})),o+=n}))}();
//# sourceMappingURL=03-promises.aef375a7.js.map