class e{constructor(e){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t})),e&&this.resolve(e)}set svg(e){this.resolve(e)}}class t extends Event{constructor(e,i={}){super(e,{...t.defaultInit,...i}),this.detail=i.detail||{}}}t.defaultInit={composed:!0};class i extends t{}i.ICON_REQUEST="icon_request";class s extends EventTarget{constructor(){super(...arguments),this.icons={}}defineIcon(t,i){this.icons[t]&&(this.icons[t].svg=i),this.icons[t]=new e(i)}getIcon(t){if(this.icons[t])return this.icons[t].promise;{const s=new e;return this.icons[t]=s,this.dispatchEvent(new i(i.ICON_REQUEST,{detail:{iconName:t}})),s.promise}}}const o=new s;function r(e,t,i,s){var o,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(n=(r<3?o(n):r>3?o(t,i,n):o(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}const n=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function a(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):n(e,t)}function l(e){return a({...e,state:!0,attribute:!1})}const c=({finisher:e,descriptor:t})=>(i,s)=>{var o;if(void 0===s){const s=null!==(o=i.originalKey)&&void 0!==o?o:i.key,r=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:{...i,key:s};return null!=e&&(r.finisher=function(t){e(t,s)}),r}{const o=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(o,s)}};function u(e,t){return c({descriptor:i=>{const s={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i;return void 0===this[t]&&(this[t]=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e)),this[t]}}return s}})}const d=Element.prototype,h=d.msMatchesSelector||d.webkitMatchesSelector;const p=e=>{class t extends e{constructor(){super(...arguments),this.active=!1}}return r([a({type:Boolean,reflect:!0})],t.prototype,"active",void 0),t};var f,b,v,m;const g=globalThis.trustedTypes,y=g?g.createPolicy("lit-html",{createHTML:e=>e}):void 0,x=`lit$${(Math.random()+"").slice(9)}$`,w="?"+x,k=`<${w}>`,_=document,E=(e="")=>_.createComment(e),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$=/-->/g,O=/>/g,A=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,N=/"/g,T=/^(?:script|style|textarea)$/i,I=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),L=I(1),D=I(2),U=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),R=new WeakMap,M=_.createTreeWalker(_,129,null,!1),H=(e,t)=>{const i=e.length-1,s=[];let o,r=2===t?"<svg>":"",n=z;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,u=0;for(;u<i.length&&(n.lastIndex=u,l=n.exec(i),null!==l);)u=n.lastIndex,n===z?"!--"===l[1]?n=$:void 0!==l[1]?n=O:void 0!==l[2]?(T.test(l[2])&&(o=RegExp("</"+l[2],"g")),n=A):void 0!==l[3]&&(n=A):n===A?">"===l[0]?(n=null!=o?o:z,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?A:'"'===l[3]?N:P):n===N||n===P?n=A:n===$||n===O?n=z:(n=A,o=void 0);const d=n===A&&e[t+1].startsWith("/>")?" ":"";r+=n===z?i+k:c>=0?(s.push(a),i.slice(0,c)+"$lit$"+i.slice(c)+x+d):i+x+(-2===c?(s.push(void 0),t):d)}const a=r+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==y?y.createHTML(a):a,s]};class j{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0;const n=e.length-1,a=this.parts,[l,c]=H(e,t);if(this.el=j.createElement(l,i),M.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=M.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(x)){const i=c[r++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(x),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?G:"@"===t[1]?Y:F})}else a.push({type:6,index:o})}for(const t of e)s.removeAttribute(t)}if(T.test(s.tagName)){const e=s.textContent.split(x),t=e.length-1;if(t>0){s.textContent=g?g.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],E()),M.nextNode(),a.push({type:2,index:++o});s.append(e[t],E())}}}else if(8===s.nodeType)if(s.data===w)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(x,e+1));)a.push({type:7,index:o}),e+=x.length-1}o++}}static createElement(e,t){const i=_.createElement("template");return i.innerHTML=e,i}}function V(e,t,i=e,s){var o,r,n,a;if(t===U)return t;let l=void 0!==s?null===(o=i.Σi)||void 0===o?void 0:o[s]:i.Σo;const c=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l.O)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(e),l.T(e,i,s)),void 0!==s?(null!==(n=(a=i).Σi)&&void 0!==n?n:a.Σi=[])[s]=l:i.Σo=l),void 0!==l&&(t=V(e,l.S(e,t.values),l,s)),t}class q{constructor(e,t){this.l=[],this.N=void 0,this.D=e,this.M=t}u(e){var t;const{el:{content:i},parts:s}=this.D,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:_).importNode(i,!0);M.currentNode=o;let r=M.nextNode(),n=0,a=0,l=s[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new W(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new J(r,this,e)),this.l.push(t),l=s[++a]}n!==(null==l?void 0:l.index)&&(r=M.nextNode(),n++)}return o}v(e){let t=0;for(const i of this.l)void 0!==i&&(void 0!==i.strings?(i.I(e,i,t),t+=i.strings.length-2):i.I(e[t])),t++}}class W{constructor(e,t,i,s){this.type=2,this.N=void 0,this.A=e,this.B=t,this.M=i,this.options=s}setConnected(e){var t;null===(t=this.P)||void 0===t||t.call(this,e)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(e,t=this){e=V(this,e,t),S(e)?e===B||null==e||""===e?(this.H!==B&&this.R(),this.H=B):e!==this.H&&e!==U&&this.m(e):void 0!==e._$litType$?this._(e):void 0!==e.nodeType?this.$(e):(e=>{var t;return C(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.g(e):this.m(e)}k(e,t=this.B){return this.A.parentNode.insertBefore(e,t)}$(e){this.H!==e&&(this.R(),this.H=this.k(e))}m(e){const t=this.A.nextSibling;null!==t&&3===t.nodeType&&(null===this.B?null===t.nextSibling:t===this.B.previousSibling)?t.data=e:this.$(_.createTextNode(e)),this.H=e}_(e){var t;const{values:i,_$litType$:s}=e,o="number"==typeof s?this.C(e):(void 0===s.el&&(s.el=j.createElement(s.h,this.options)),s);if((null===(t=this.H)||void 0===t?void 0:t.D)===o)this.H.v(i);else{const e=new q(o,this),t=e.u(this.options);e.v(i),this.$(t),this.H=e}}C(e){let t=R.get(e.strings);return void 0===t&&R.set(e.strings,t=new j(e)),t}g(e){C(this.H)||(this.H=[],this.R());const t=this.H;let i,s=0;for(const o of e)s===t.length?t.push(i=new W(this.k(E()),this.k(E()),this,this.options)):i=t[s],i.I(o),s++;s<t.length&&(this.R(i&&i.B.nextSibling,s),t.length=s)}R(e=this.A.nextSibling,t){var i;for(null===(i=this.P)||void 0===i||i.call(this,!1,!0,t);e&&e!==this.B;){const t=e.nextSibling;e.remove(),e=t}}}class F{constructor(e,t,i,s,o){this.type=1,this.H=B,this.N=void 0,this.V=void 0,this.element=e,this.name=t,this.M=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this.H=Array(i.length-1).fill(B),this.strings=i):this.H=B}get tagName(){return this.element.tagName}I(e,t=this,i,s){const o=this.strings;let r=!1;if(void 0===o)e=V(this,e,t,0),r=!S(e)||e!==this.H&&e!==U,r&&(this.H=e);else{const s=e;let n,a;for(e=o[0],n=0;n<o.length-1;n++)a=V(this,s[i+n],t,n),a===U&&(a=this.H[n]),r||(r=!S(a)||a!==this.H[n]),a===B?e=B:e!==B&&(e+=(null!=a?a:"")+o[n+1]),this.H[n]=a}r&&!s&&this.W(e)}W(e){e===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends F{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===B?void 0:e}}class G extends F{constructor(){super(...arguments),this.type=4}W(e){e&&e!==B?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Y extends F{constructor(){super(...arguments),this.type=5}I(e,t=this){var i;if((e=null!==(i=V(this,e,t,0))&&void 0!==i?i:B)===U)return;const s=this.H,o=e===B&&s!==B||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==B&&(s===B||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this.H=e}handleEvent(e){var t,i;"function"==typeof this.H?this.H.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this.H.handleEvent(e)}}class J{constructor(e,t,i){this.element=e,this.type=6,this.N=void 0,this.V=void 0,this.M=t,this.options=i}I(e){V(this,e)}}null===(b=(f=globalThis).litHtmlPlatformSupport)||void 0===b||b.call(f,j,W),(null!==(v=(m=globalThis).litHtmlVersions)&&void 0!==v?v:m.litHtmlVersions=[]).push("2.0.0-rc.2");const X=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol();class Q{constructor(e,t){if(t!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return X&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const ee=e=>new Q(e+"",Z),te=new Map,ie=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof Q)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);let s=te.get(i);return void 0===s&&te.set(i,s=new Q(i,Z)),s},se=X?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ee(t)})(e):e;var oe,re,ne,ae;const le={toAttribute(e,t){switch(t){case Boolean:e=e?"":null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},ce=(e,t)=>t!==e&&(t==t||e==e),ue={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:ce};class de extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(e){var t;null!==(t=this.v)&&void 0!==t||(this.v=[]),this.v.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this.Πp(i,t);void 0!==s&&(this.Πm.set(s,i),e.push(s))})),e}static createProperty(e,t=ue){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ue}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(se(e))}else void 0!==e&&t.push(se(e));return t}static"Πp"(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this.Πg=new Promise((e=>this.enableUpdating=e)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(e=this.constructor.v)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this.ΠU)&&void 0!==t?t:this.ΠU=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this.ΠU)||void 0===t||t.splice(this.ΠU.indexOf(e)>>>0,1)}"Π_"(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this.Πi.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{X?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style");i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})),this.Πo=new Promise((e=>this.Πl=e))}attributeChangedCallback(e,t,i){this.K(e,i)}"Πj"(e,t,i=ue){var s,o;const r=this.constructor.Πp(e,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:le.toAttribute)(t,i.type);this.Πh=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null}}K(e,t){var i,s,o;const r=this.constructor,n=r.Πm.get(e);if(void 0!==n&&this.Πh!==n){const e=r.getPropertyOptions(n),a=e.converter,l=null!==(o=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==o?o:le.fromAttribute;this.Πh=n,this[n]=l(t,e.type),this.Πh=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ce)(this[e],t)?(this.L.has(e)||this.L.set(e,t),!0===i.reflect&&this.Πh!==e&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async"Πq"(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(e){Promise.reject(e)}const e=this.performUpdate();return null!=e&&await e,!this.isUpdatePending}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((e,t)=>this[t]=e)),this.Πi=void 0);let t=!1;const i=this.L;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this.Π$()}catch(e){throw t=!1,this.Π$(),e}t&&this.E(i)}willUpdate(e){}E(e){var t;null===(t=this.ΠU)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}"Π$"(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(e){return!0}update(e){void 0!==this.Πk&&(this.Πk.forEach(((e,t)=>this.Πj(t,this[t],e))),this.Πk=void 0),this.Π$()}updated(e){}firstUpdated(e){}}var he,pe,fe,be,ve,me;de.finalized=!0,de.shadowRootOptions={mode:"open"},null===(re=(oe=globalThis).reactiveElementPlatformSupport)||void 0===re||re.call(oe,{ReactiveElement:de}),(null!==(ne=(ae=globalThis).reactiveElementVersions)&&void 0!==ne?ne:ae.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(he=(me=globalThis).litElementVersions)&&void 0!==he?he:me.litElementVersions=[]).push("3.0.0-rc.1");class ge extends de{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();super.update(e),this.Φt=((e,t,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let n=r._$litPart$;if(void 0===n){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new W(t.insertBefore(E(),e),e,void 0,i)}return n.I(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!1)}render(){return U}}ge.finalized=!0,ge._$litElement$=!0,null===(fe=(pe=globalThis).litElementHydrateSupport)||void 0===fe||fe.call(pe,{LitElement:ge}),null===(ve=(be=globalThis).litElementPlatformSupport)||void 0===ve||ve.call(be,{LitElement:ge});let ye,xe=e=>e;const we=(e,t)=>{class i extends t{constructor(){super(...arguments),this.labelSlotHasContent=!1}connectedCallback(){super.connectedCallback(),this.label||console.warn(this.tagName+" needs a `label`")}labelSlotChanged(e){this.labelSlotHasContent=e.target.assignedElements({flatten:!0}).length>0}renderLabel(){return L(ye||(ye=xe`
        ${0}
        <slot
          name=${0}
          @slotchange=${0}
        ></slot>
      `),!1===this.labelSlotHasContent?this.label:"",e||"",this.labelSlotChanged)}}return r([a({type:String})],i.prototype,"label",void 0),r([l()],i.prototype,"labelSlotHasContent",void 0),i},ke=e=>{class t extends e{constructor(){super(...arguments),this._selectable=!1,this.selected=!1}get selectable(){return this._selectable}set selectable(e){const t=this._selectable;this._selectable=e,this.setAttribute("tabindex",""+(e?"0":"-1")),this.requestUpdate("selected",t)}}return r([a({type:Boolean,reflect:!0})],t.prototype,"selectable",null),r([a({type:Boolean,reflect:!0})],t.prototype,"selected",void 0),t};let _e,Ee,Se=e=>e;class Ce extends ge{render(){return L(_e||(_e=Se` <slot></slot> `))}}Ce.styles=[ie(Ee||(Ee=Se`
      ::slotted(uui-button) {
        --uui-button-border-radius: 0;
      }
      ::slotted(uui-button:not(:first-child)) {
        --uui-button-merge-border-left: 1;
      }
      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: var(--uui-size-border-radius, 3px) 0 0
          var(--uui-size-border-radius, 3px);
      }
      ::slotted(uui-button:last-child) {
        --uui-button-border-radius: 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px) 0;
      }

      ::slotted(uui-dropdown) {
        --uui-dropdown-toggle-slot-button-border-radius: 0;
      }
      ::slotted(uui-dropdown:not(:first-child)) {
        --uui-dropdown-toggle-slot-button-merge-border-left: 1;
      }
      ::slotted(uui-dropdown:first-child) {
        --uui-dropdown-toggle-slot-button-border-radius: var(
            --uui-size-border-radius,
            3px
          )
          0 0 var(--uui-size-border-radius, 3px);
      }
      ::slotted(uui-dropdown:last-child) {
        --uui-dropdown-toggle-slot-button-border-radius: 0
          var(--uui-size-border-radius, 3px) var(--uui-size-border-radius, 3px)
          0;
      }

      ::slotted(*:hover) {
        z-index: 1;
      }
    `))];let ze;class $e extends Ce{}$e.styles=[...Ce.styles,ie(ze||(ze=(e=>e)`
      ::slotted(*) {
        --uui-button-slot-padding-r-factor: 0.333;
        --uui-button-slot-padding-l-factor: 0.333;
      }

      ::slotted(uui-button:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-slot-padding-l-factor: 1.666;
      }
      ::slotted(uui-button:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-slot-padding-r-factor: 1.666;
      }
      ::slotted(uui-button:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }

      ::slotted([look='outline']),
      ::slotted([look='placeholder']) {
        --uui-button-slot-padding-r-factor: 0.666;
        --uui-button-slot-padding-l-factor: 0.666;
      }

      ::slotted(uui-button[look='outline']:first-child),
      ::slotted(uui-button[look='placeholder']:first-child) {
        --uui-button-border-radius: 50px 0 0 50px;
        --uui-button-slot-padding-l-factor: 0.8;
      }
      ::slotted(uui-button[look='outline']:last-child),
      ::slotted(uui-button[look='placeholder']:last-child) {
        --uui-button-border-radius: 0 50px 50px 0;
        --uui-button-slot-padding-r-factor: 0.8;
      }
      ::slotted(uui-button[look='outline']:first-child:last-child),
      ::slotted(uui-button[look='placeholder']:first-child:last-child) {
        --uui-button-border-radius: 50px 50px 50px 50px;
        --uui-button-slot-padding-l-factor: 0.8;
        --uui-button-slot-padding-r-factor: 0.8;
      }
    `))],customElements.define("uui-action-bar",$e);let Oe,Ae,Pe,Ne=e=>e;class Te extends ge{constructor(){super(...arguments),this.size="",this.imgSrc="",this.imgSrcset="",this._title="",this.initials=""}get title(){return this._title}set title(e){const t=this._title;this._title=e;let i="";const s=this._title.split(" ");i=s[0].substring(0,1),s.length>1&&(i+=s[s.length-1].substring(0,1)),this.initials=i.toUpperCase(),this.requestUpdate("name",t)}render(){return L(Oe||(Oe=Ne`
      ${0}
      ${0}
      <slot></slot>
    `),this.imgSrc?L(Ae||(Ae=Ne`<img
            src="${0}"
            srcset="${0}"
            alt="${0}"
            title="${0}"
          />`),this.imgSrc,this.imgSrcset,this.initials,this.title):"",this.imgSrc?"":this.initials)}}Te.styles=[ie(Pe||(Pe=Ne`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border-radius: 50%;
        font-weight: bold;
        width: 2em;
        height: 2em;
        user-select: none;

        background-color: var(--uui-color-spanish-pink);
        color: var(--uui-color-space-cadet);
      }

      :host([size='xxs']) {
        font-size: 12px;
      }

      :host([size='xs']) {
        font-size: 14px;
      }

      :host([size='s']) {
        font-size: 18px;
      }

      :host([size='m']) {
        font-size: 23px;
      }

      :host([size='l']) {
        font-size: 32px;
      }

      :host([size='xl']) {
        font-size: 46px;
      }

      :host([size='xxl']) {
        font-size: 70px;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    `))],r([a({type:String,reflect:!0})],Te.prototype,"size",void 0),r([a({type:String,attribute:"img-src"})],Te.prototype,"imgSrc",void 0),r([a({type:String,attribute:"img-srcset"})],Te.prototype,"imgSrcset",void 0),r([a({type:String})],Te.prototype,"title",null),r([l()],Te.prototype,"initials",void 0),customElements.define("uui-avatar",Te);let Ie,Le,De,Ue=e=>e;class Be extends ge{constructor(){super(...arguments),this.limit=0,this.size="",this.avatars=[]}queryAvatars(){this.avatars=this.avatarsSlot.assignedElements({flatten:!0}).filter((e=>e instanceof Te)),this.toggleAvatarVisibility()}toggleAvatarVisibility(){this.avatars.forEach(((e,t)=>{const i=t+1;e.style.display=i<=this.limit||0===this.limit?"":"none"}))}updated(){this.toggleAvatarVisibility()}render(){return L(Ie||(Ie=Ue`
      <slot @slotchange=${0}></slot>
      ${0}
    `),this.queryAvatars,0!==this.limit&&this.avatars.length>this.limit?L(Le||(Le=Ue`<small id="overflow-indication"
            >+${0}</small
          >`),this.avatars.length-this.limit):"")}}Be.styles=[ie(De||(De=Ue`
      :host {
        display: inline-flex;
        align-items: center;
        padding-left: 3px;
        padding-right: 3px;
      }

      ::slotted(uui-avatar),
      uui-avatar {
        margin-left: -3px;
        margin-right: -3px;
      }

      #overflow-indication {
        margin-left: 6px;
      }
    `))],r([a({type:Number,attribute:!0})],Be.prototype,"limit",void 0),r([a({type:String,attribute:!0})],Be.prototype,"size",void 0),r([l()],Be.prototype,"avatars",void 0),r([u("slot")],Be.prototype,"avatarsSlot",void 0),customElements.define("uui-avatar-group",Be);let Re,Me,He=e=>e;class je extends ge{constructor(){super(...arguments),this.limit=3,this.avatars=[{name:"Gaufrid Milko"},{name:"Dorita Angelita"},{name:"Mikhael Khshayarsha"},{name:"John Domino"}]}increaseLimit(){this.limit=this.limit+1}decreaseLimit(){0!==this.limit&&(this.limit=this.limit-1)}addAvatar(){this.avatars=[...this.avatars,{name:"First Last"}]}get totalAvatars(){return this.avatars.length}render(){return L(Re||(Re=He`
      <uui-avatar-group .limit="${0}">
        ${0}
      </uui-avatar-group>
      <br />
      <br />
      <div>Limit: ${0}</div>
      <div>Avatars in total: ${0}</div>
      <button type="button" @click="${0}">Add avatar</button>
      <button type="button" @click="${0}">
        Increase limit
      </button>
      <button type="button" @click="${0}">
        Decrease limit
      </button>
    `),this.limit,this.avatars.map((e=>L(Me||(Me=He` <uui-avatar title="${0}"> </uui-avatar> `),e.name))),this.limit,this.totalAvatars,this.addAvatar,this.increaseLimit,this.decreaseLimit)}}r([l()],je.prototype,"limit",void 0),r([l()],je.prototype,"avatars",void 0),customElements.define("uui-avatar-group-example-page",je);const Ve=["primary","secondary","outline","placeholder","positive","warning","danger"];function qe(e){return Ve.map((t=>e(ee(t))))}let We,Fe,Ke,Ge=e=>e;class Ye extends ge{constructor(){super(...arguments),this.look="danger"}render(){return L(We||(We=Ge` <slot></slot> `))}}Ye.styles=[ie(Fe||(Fe=Ge`
      :host {
        position: absolute;

        /* top: -8px;
        right: -8px; */
        padding: 3px 5px;
        --uui-badge-inset: -8px -8px auto auto;
        /* 4 different ones */
        inset: var(--uui-badge-inset);

        text-align: center;
        font-size: 12px;
        line-height: 16px;
        font-weight: 900;

        margin-right: 0 !important;

        min-width: var(--uui-size-small);
        min-height: var(--uui-size-small);

        border-radius: var(--uui-size-small);
        background-color: var(
          --uui-badge-background-color,
          var(--uui-interface-surface)
        );
        color: var(--uui-badge-contrast, var(--uui-interface-contrast));
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `)),qe((e=>ie(Ke||(Ke=Ge`
          :host([look='${0}']) {
            background-color: var(--uui-look-${0}-surface);
            color: var(--uui-look-${0}-contrast);
          }
        `),e,e,e)))],r([a({reflect:!0})],Ye.prototype,"look",void 0),customElements.define("uui-badge",Ye);let Je;const Xe=ie(Je||(Je=(e=>e)`
  @keyframes uui-horizontal-shake {
    10%,
    90% {
      transform: translateX(-1px);
    }

    20%,
    80% {
      transform: translateX(1px);
    }

    30%,
    50%,
    70% {
      transform: translateX(-2px);
    }

    40%,
    60% {
      transform: translateX(2px);
    }
  }
`)),Ze=ee("uui-horizontal-shake 600ms ease backwards");let Qe,et,tt,it=e=>e;class st extends(we("",ge)){constructor(){super(),this.disabled=!1,this.look="",this.compact=!1,this.addEventListener("click",this.onHostClick)}onHostClick(e){this.disabled&&(e.preventDefault(),e.stopImmediatePropagation())}render(){return L(Qe||(Qe=it`
      <button ?disabled=${0} aria-label="${0}">
        ${0}
      </button>
    `),this.disabled,this.label,this.renderLabel())}}st.styles=[Xe,ie(et||(et=it`
      :host {
        position: relative;
        display: inline-block;
        margin-left: calc(var(--uui-button-merge-border-left, 0) * -1px);
        --uui-button-slot-padding-l-factor: 3;
        --uui-button-slot-padding-r-factor: 3;
      }

      :host([compact]) {
        --uui-button-slot-padding-l-factor: 1;
        --uui-button-slot-padding-r-factor: 1;
      }

      button {
        height: 100%;
        min-height: var(
          --uui-button-height,
          calc(var(--uui-button-base-unit, var(--uui-size-base-unit)) * 6)
        );
        width: 100%;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        box-shadow: none;
        border-width: var(--uui-button-border-width, 1px);
        border-style: solid;
        border-color: var(
          --uui-button-border-color,
          var(--uui-interface-surface)
        );
        border-radius: var(
          --uui-button-border-radius,
          var(--uui-size-border-radius)
        );
        cursor: pointer;
        font-weight: var(
          --uui-button-font-weight,
          var(--uui-interface-font-weight)
        );
        font-size: inherit;
        font-family: inherit;

        background-color: var(
          --uui-button-background-color,
          var(--uui-interface-surface)
        );
        color: var(--uui-button-contrast, var(--uui-interface-contrast));

        transition: background-color 80ms, border-color 80ms, color 80ms;
      }
      button:hover {
        background-color: var(
          --uui-button-background-color-hover,
          var(--uui-interface-surface-hover)
        );
        border-color: var(
          --uui-button-border-color-hover,
          var(--uui-interface-surface-hover)
        );
        color: var(
          --uui-button-contrast-hover,
          var(--uui-interface-contrast-hover)
        );
      }

      button[disabled] {
        background-color: var(
          --uui-button-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        color: var(
          --uui-button-contrast-disabled,
          var(--uui-interface-contrast-disabled)
        );
        cursor: default;
      }
      button[disabled]:active {
        animation: ${0};
      }

      button > slot {
        display: block;
        padding: 0
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-r-factor)
            )
          )
          0
          calc(
            (
              var(--uui-button-base-unit, var(--uui-size-base-unit)) *
                var(--uui-button-slot-padding-l-factor)
            )
          );
      }
    `),Ze),qe((e=>ie(tt||(tt=it`
          :host([look='${0}']) button {
            background-color: var(--uui-look-${0}-surface);
            color: var(--uui-look-${0}-contrast);
            border-style: var(
              --uui-button-border-style,
              var(--uui-look-${0}-border-style, solid)
            );
            border-radius: var(
              --uui-button-border-radius,
              var(
                --uui-look-${0}-border-radius,
                var(--uui-size-border-radius)
              )
            );
            border-color: var(--uui-look-${0}-border);
            font-weight: var(--uui-look-${0}-font-weight);
          }
          :host([look='${0}']) button:hover {
            background-color: var(--uui-look-${0}-surface-hover);
            color: var(--uui-look-${0}-contrast-hover);
            border-color: var(--uui-look-${0}-border-hover);
          }
          :host([look='${0}']) button[disabled] {
            background-color: var(--uui-look-${0}-surface-disabled);
            color: var(--uui-look-${0}-contrast-disabled);
            border-color: var(--uui-look-${0}-border-disabled);
          }
        `),e,e,e,e,e,e,e,e,e,e,e,e,e,e,e)))],r([a({type:Boolean,reflect:!0})],st.prototype,"disabled",void 0),r([a({reflect:!0})],st.prototype,"look",void 0),r([a({type:Boolean,reflect:!0})],st.prototype,"compact",void 0),customElements.define("uui-button",st),customElements.define("uui-button-group",Ce);let ot,rt,nt=e=>e;class at extends ge{constructor(){super(...arguments),this.type=null}render(){return L(ot||(ot=nt`<slot></slot>`))}}at.styles=[ie(rt||(rt=nt`
      :host {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: var(--uui-size-medium, 24px);
        place-items: strech;
      }

      :host([type='node']),
      :host([type='user']) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    `))],r([a({reflect:!0})],at.prototype,"type",void 0),customElements.define("uui-card-grid",at);let lt,ct,ut=e=>e;class dt extends ge{constructor(){super(...arguments),this.open=!1}render(){return L(lt||(lt=ut`<svg viewBox="0 0 512 512">
      <path d="M255.125 361.35L88.193 149.765h333.862z"></path>
    </svg>`))}}dt.styles=[ie(ct||(ct=ut`
      :host {
        display: inline-block;
        width: 12px;
        vertical-align: middle;
      }

      svg {
        fill: currentColor;
        transition: transform 320ms cubic-bezier(0.17, -0.88, 0.82, 1.84); /* Julia's beloved easing */
      }

      :host([open]) svg {
        transform: rotate(180deg);
      }
    `))],r([a({type:Boolean,reflect:!0})],dt.prototype,"open",void 0),customElements.define("uui-caret",dt);let ht;const pt=D(ht||(ht=(e=>e)`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/>
</svg>`));class ft extends t{}ft.CHANGE="change";let bt,vt,mt=e=>e;class gt extends(we("",ge)){constructor(e="checkbox"){super(),this.form=null,this._value="on",this.name="",this.labelPosition="right",this.hideLabel=!1,this._checked=!1,this.disabled=!1,this.inputRole=e,this._internals=this.attachInternals()}get value(){return this._value}set value(e){const t=this._value;this._value=e,this._internals.setFormValue(this._checked?this._value:null),this.requestUpdate("value",t)}get checked(){return this._checked}set checked(e){const t=this._checked;this._checked=e,this._internals.setFormValue(this._checked?this._value:null),this.requestUpdate("checked",t)}_onInputChange(){this.dispatchEvent(new ft(ft.CHANGE)),this.checked=this._input.checked}render(){return L(bt||(bt=mt`
      <label>
        <input
          type="checkbox"
          id="input"
          ?disabled="${0}"
          @change="${0}"
          .checked="${0}"
          aria-checked="${0}"
          aria-label=${0}
          role="${0}"
        />
        ${0}
        <div id="label-display" aria-hidden="true">
          ${0}
        </div>
      </label>
    `),this.disabled,this._onInputChange,this.checked,this.checked?"true":"false",this.label,this.inputRole,this.renderCheckbox(),!1===this.hideLabel?this.renderLabel():"")}}gt.styles=[ie(vt||(vt=mt`
      :host {
        display: inline-block;
      }

      label {
        cursor: pointer;
        user-select: none;

        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-items: center;
        gap: var(--uui-size-xsmall);
      }

      input {
        position: absolute;
        height: 0px;
        width: 0px;
      }

      :host([label-position='left']) label {
        flex-direction: row-reverse;
      }

      :host([label-position='top']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column-reverse;
      }

      :host([label-position='bottom']) label {
        gap: var(--uui-size-half-base-unit);
        flex-direction: column;
      }

      :host([disabled]) #label-display {
        opacity: 0.5;
      }
    `))],gt.formAssociated=!0,r([a({type:String})],gt.prototype,"form",void 0),r([u("#input")],gt.prototype,"_input",void 0),r([a({reflect:!0})],gt.prototype,"value",null),r([a({type:String})],gt.prototype,"name",void 0),r([a({type:String,attribute:"label-position",reflect:!0})],gt.prototype,"labelPosition",void 0),r([a({type:Boolean,attribute:"hide-label",reflect:!0})],gt.prototype,"hideLabel",void 0),r([a({type:Boolean,reflect:!0})],gt.prototype,"checked",null),r([a({type:Boolean,reflect:!0})],gt.prototype,"disabled",void 0);let yt,xt,wt=e=>e;class kt extends gt{renderCheckbox(){return L(yt||(yt=wt`
      <div id="ticker">
        <div id="icon-check">${0}</div>
      </div>
    `),pt)}}kt.styles=[...gt.styles,Xe,ie(xt||(xt=wt`
      :host {
        --uui-checkbox-size: 18px;
        /*
        --uui-toggle-focus-outline: 0 0 1px 1.5px var(--uui-color-violet-blue);
        */
      }

      #ticker {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;
        justify-content: center;

        box-sizing: border-box;
        width: var(--uui-checkbox-size);
        height: var(--uui-checkbox-size);
        border-radius: var(
          --uui-checkbox-border-radius,
          var(--uui-size-border-radius)
        );

        color: var(--uui-toggle-color, var(--uui-interface-chosen-contrast));
        background-color: var(
          --uui-toggle-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-checkbox-border-color, var(--uui-interface-border));
        font-size: calc(var(--uui-checkbox-size) * 0.7);
      }
      label:hover input:not([disabled]) + #ticker {
        border-color: var(
          --uui-checkbox-border-color-hover,
          var(--uui-interface-border-hover)
        );
        background-color: var(
          --uui-checkbox-background-color-hover,
          var(--uui-interface-surface-hover)
        );
      }
      label:focus #ticker {
        border-color: var(
          --uui-checkbox-border-color-focus,
          var(--uui-interface-border-focus)
        );
        background-color: var(
          --uui-checkbox-background-color-focus,
          var(--uui-interface-surface-alt-focus)
        );
      }
      input:checked + #ticker {
        border-color: var(--uui-interface-chosen);
      }
      label:hover input:checked:not([disabled]) + #ticker {
        border-color: var(--uui-interface-chosen-hover);
      }
      label:focus input:checked + #ticker {
        border-color: var(--uui-interface-chosen-focus);
      }

      #icon-check {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms, opacity 120ms;
        fill: var(--uui-interface-chosen-contrast);
        opacity: 0;
      }

      /** before? */

      #ticker:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: calc(
          var(--uui-checkbox-border-radius, var(--uui-size-border-radius)) * 0.5
        );
        background-color: var(--uui-interface-chosen);
        transition: transform 120ms ease, opacity 120ms, background-color 120ms;
        transform: scale(0);
        opacity: 0;
      }
      label:hover input:checked:not([disabled]) + #ticker:before {
        background-color: var(--uui-interface-chosen-hover);
      }

      input:checked + #ticker:before {
        transform: scale(1);
        opacity: 1;
      }
      input:checked + #ticker #icon-check {
        opacity: 1;
      }
      label:focus input:checked + #ticker {
        background-color: var(--uui-interface-chosen-focus);
      }

      :host(:not([disabled])) label:active input:checked + #ticker:before {
        /** Stretch when mouse down */
        transform: scale(0.9);
      }

      :host([disabled]) #ticker {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) input:checked + #ticker {
        background-color: var(--uui-interface-chosen-disabled);
      }
      :host([disabled]) #ticker:after {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #ticker #icon-check {
        fill: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) label:active #ticker {
        animation: ${0};
      }
      :host([disabled]) input:checked + #ticker #icon-check {
        fill: var(--uui-interface-chosen-contrast-disabled);
      }

      /*
      input:focus + #slider,
      input:not([disabled]) + label:active #slider {
        box-shadow: var(--uui-toggle-focus-outline);
      }
      */
    `),Ze)],kt.formAssociated=!0,customElements.define("uui-checkbox",kt);class _t extends t{}_t.SUBMIT="submit",_t.CANCEL="cancel";let Et,St=e=>e;class Ct extends ge{constructor(){super(...arguments),this.submitLabel="Confirm",this.cancelLabel="Cancel",this.look=""}render(){return L(Et||(Et=St`
      <uui-dialog>
        <h3>${0}</h3>
        <slot></slot>
        <uui-button
          slot="actions"
          @click=${0}
        >
          ${0}
        </uui-button>
        <uui-button
          slot="actions"
          .look=${0}
          @click=${0}
        >
          ${0}
        </uui-button>
      </uui-dialog>
    `),this.title,(()=>this.dispatchEvent(new _t(_t.CANCEL,this))),this.cancelLabel,this.look,(()=>this.dispatchEvent(new _t(_t.SUBMIT,this))),this.submitLabel)}}r([a({type:String})],Ct.prototype,"title",void 0),r([a({type:String})],Ct.prototype,"submitLabel",void 0),r([a({type:String})],Ct.prototype,"cancelLabel",void 0),r([a({reflect:!0})],Ct.prototype,"look",void 0),customElements.define("uui-confirm-dialog",Ct);class zt extends t{}zt.OPEN="open",zt.SELECTED="selected";let $t;class Ot extends(ke(ge)){constructor(){super(),this.error=!1,this.addEventListener("click",this.toggleSelect),this.addEventListener("keydown",this.handleSelectKeydown)}toggleSelect(){this.selectable&&(this.selected=!this.selected),this.selected&&this.dispatchEvent(new zt(zt.SELECTED))}select(){this.selected=!0}deselect(){this.selected=!1}handleSelectKeydown(e){" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),this.toggleSelect())}handleOpenClick(e){e.stopPropagation(),this.dispatchEvent(new zt(zt.OPEN))}handleOpenKeydown(e){" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new zt(zt.OPEN)))}}Ot.styles=[ie($t||($t=(e=>e)`
      :host {
        position: relative;
        display: flex;
        width: 100%;
        justify-content: center;
        box-sizing: border-box;
        box-shadow: 0 1px 1px 0 var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius, 3px);
        min-height: var(--uui-layout-medium);
        background-color: var(--uui-interface-surface, white);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host(:focus) {
        /** TODO: implement focus outline. */
        outline-color: #6ab4f0;
      }

      :host([error]) {
        border: 2px solid var(--uui-look-danger-border, #d42054);
        box-shadow: 0 0 4px 0 var(--uui-look-danger-border, #d42054),
          inset 0 0 2px 0 var(--uui-look-danger-border, #d42054);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-interface-select, #1b264f);
        border-radius: calc(var(--uui-size-border-radius, 3px) + 2px);
        box-shadow: 0 0 4px 0 var(--uui-interface-select, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-select, #1b264f);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }
    `))],r([a({type:Boolean,reflect:!0})],Ot.prototype,"error",void 0);let At,Pt,Nt=e=>e;class Tt extends Ot{constructor(){super(...arguments),this.name="",this.icon=""}render(){return L(At||(At=Nt`
      <slot name="tag"></slot>
      <div
        id="open-part"
        tabindex="0"
        @click=${0}
        @keydown=${0}
      >
        <uui-icon id="icon" name=${0}></uui-icon>
        <span> ${0} </span>
      </div>
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot></slot>
    `),this.handleOpenClick,this.handleOpenKeydown,this.icon,this.name)}}Tt.styles=[...Ot.styles,ie(Pt||(Pt=Nt`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--uui-size-space-3, 12px);
      }

      slot[name='tag'] {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      #icon {
        font-size: 1.2em;
      }

      #open-part {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      #open-part > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
    `))],r([a({type:String})],Tt.prototype,"name",void 0),r([a({type:String})],Tt.prototype,"icon",void 0),customElements.define("uui-content-node-card",Tt);class It extends t{}It.OPEN="open",It.SELECTED="selected";let Lt;class Dt extends(ke(ge)){constructor(){super(),this.error=!1,this.addEventListener("click",this.toggleSelect),this.addEventListener("keydown",this.handleSelectKeydown)}toggleSelect(){this.selectable&&(this.selected=!this.selected),this.selected&&this.dispatchEvent(new It(It.SELECTED))}select(){this.selected=!0}deselect(){this.selected=!1}handleSelectKeydown(e){" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),this.toggleSelect())}handleOpenClick(e){e.stopPropagation(),this.dispatchEvent(new It(It.OPEN))}handleOpenKeydown(e){" "!==e.key&&"Enter"!==e.key||(e.preventDefault(),e.stopPropagation(),this.dispatchEvent(new It(It.OPEN)))}}Dt.styles=[ie(Lt||(Lt=(e=>e)`
      :host {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius, 3px);
        background-color: var(--uui-interface-surface, white);
        --uui-card-before-opacity: 0;
        transition: --uui-card-before-opacity 120ms;
      }

      :host(:focus) {
        /** TODO: implement focus outline. */
        outline-color: #6ab4f0;
      }

      :host([error]) {
        border: 2px solid var(--uui-look-danger-border, #d42054);
        box-shadow: 0 0 4px 0 var(--uui-look-danger-border, #d42054),
          inset 0 0 2px 0 var(--uui-look-danger-border, #d42054);
      }

      :host([selectable]) {
        cursor: pointer;
      }
      :host([selectable]) #select-border {
        position: absolute;
        z-index: 2;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 120ms;
      }
      :host([selectable]) #select-border::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid var(--uui-interface-select, #1b264f);
        border-radius: calc(var(--uui-size-border-radius, 3px) + 2px);
        box-shadow: 0 0 4px 0 var(--uui-interface-select, #1b264f),
          inset 0 0 2px 0 var(--uui-interface-select, #1b264f);
      }
      :host([selected]) #select-border {
        opacity: 1;
      }
      :host([selectable]:not([selected]):hover) #select-border {
        opacity: 0.33;
      }
      :host([selectable][selected]:hover) #select-border {
        opacity: 0.8;
      }

      :host([selectable]:not([selected])) #open-part:hover + #select-border {
        opacity: 0;
      }
      :host([selectable][selected]) #open-part:hover + #select-border {
        opacity: 1;
      }

      :host([selectable]:not([selected]):hover) #select-border::after {
        animation: not-selected--hover 1.2s infinite;
      }
      @keyframes not-selected--hover {
        0%,
        100% {
          opacity: 0.66;
        }
        50% {
          opacity: 1;
        }
      }

      :host([selectable][selected]:hover) #select-border::after {
        animation: selected--hover 1.4s infinite;
      }
      @keyframes selected--hover {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.66;
        }
      }
      :host([selectable]) #open-part:hover + #select-border::after {
        animation: none;
      }

      button {
        font-size: inherit;
        font-family: inherit;
        border: 0;
        padding: 0;
        background-color: transparent;
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-base-unit) * 4);
        margin-right: var(--uui-size-base-unit);
      }
      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
      }
      :host(:hover) #actions-container {
        opacity: 1;
      }

      /*
      slot[name='tag'] {

      }
      */
    `))],r([a({type:Boolean,reflect:!0})],Dt.prototype,"error",void 0);let Ut,Bt,Rt=e=>e;class Mt extends Dt{constructor(){super(...arguments),this.name="",this.url="",this.icon=""}render(){return L(Ut||(Ut=Rt`
      <button
        type="button"
        id="open-part"
        tabindex="0"
        @click=${0}
        @keydown=${0}
      >
        <uui-icon id="icon" name=${0}></uui-icon>
        <div id="info">
          <div id="name">${0}</div>
          <small id="url">${0}</small>
        </div>
      </button>
      <!-- Select border must be right after #open-part -->
      <div id="select-border"></div>

      <slot name="tag"></slot>
      <slot id="actions-container" name="actions"></slot>
    `),this.handleOpenClick,this.handleOpenKeydown,this.icon,this.name,this.url)}}Mt.styles=[...Dt.styles,ie(Bt||(Bt=Rt`
      :host {
        min-width: 250px;
        width: 100%;
        padding: var(--uui-size-space-2);
      }

      #icon {
        font-size: 1.2em;
        margin-left: var(--uui-size-space-2);
      }

      #open-part {
        align-self: stretch;

        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      #info {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        padding-left: var(--uui-size-space-2);
      }

      #name {
        font-weight: 700;
      }

      #open-part:hover #icon {
        color: var(--uui-interface-contrast-hover);
      }
      #open-part:hover #name {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
      #open-part:hover #url {
        color: var(--uui-interface-contrast-hover);
      }

      slot[name='tag'] {
        flex-grow: 1;

        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    `))],r([a({type:String})],Mt.prototype,"name",void 0),r([a({type:String})],Mt.prototype,"url",void 0),r([a({type:String})],Mt.prototype,"icon",void 0),customElements.define("uui-content-node-list-item",Mt);let Ht,jt,Vt=e=>e;class qt extends ge{render(){return L(Ht||(Ht=Vt`
      <slot></slot>
      <div class="actions"><slot name="actions"></slot></div>
    `))}}qt.styles=[ie(jt||(jt=Vt`
      :host {
        position: relative;
        display: block;
        max-width: 400px;

        padding: var(--uui-size-large) var(--uui-size-xlarge);

        background-color: var(
          --uui-dialog-background-color,
          var(--uui-interface-surface)
        );
        box-shadow: var(--uui-dialog-box-shadow, var(--uui-shadow-depth-5));
        border-radius: var(
          --uui-dialog-border-radius,
          calc(var(--uui-size-border-radius) * 2)
        );
      }

      .actions {
        margin-top: var(--uui-size-medium);
        display: flex;
        justify-content: flex-end;
      }
      ::slotted([slot='actions']) {
        margin-left: var(--uui-size-small);
      }
    `))],customElements.define("uui-dialog",qt);const Wt="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,Ft=(e,t,i=null)=>{for(;t!==i;){const i=t.nextSibling;e.removeChild(t),t=i}},Kt=`{{lit-${String(Math.random()).slice(2)}}}`,Gt=`\x3c!--${Kt}--\x3e`,Yt=new RegExp(`${Kt}|${Gt}`);class Jt{constructor(e,t){this.parts=[],this.element=t;const i=[],s=[],o=document.createTreeWalker(t.content,133,null,!1);let r=0,n=-1,a=0;const{strings:l,values:{length:c}}=e;for(;a<c;){const e=o.nextNode();if(null!==e){if(n++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:i}=t;let s=0;for(let e=0;e<i;e++)Xt(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=l[a],i=ei.exec(t)[2],s=i.toLowerCase()+"$lit$",o=e.getAttribute(s);e.removeAttribute(s);const r=o.split(Yt);this.parts.push({type:"attribute",index:n,name:i,strings:r}),a+=r.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(Kt)>=0){const s=e.parentNode,o=t.split(Yt),r=o.length-1;for(let t=0;t<r;t++){let i,r=o[t];if(""===r)i=Qt();else{const e=ei.exec(r);null!==e&&Xt(e[2],"$lit$")&&(r=r.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(r)}s.insertBefore(i,e),this.parts.push({type:"node",index:++n})}""===o[r]?(s.insertBefore(Qt(),e),i.push(e)):e.data=o[r],a+=r}}else if(8===e.nodeType)if(e.data===Kt){const t=e.parentNode;null!==e.previousSibling&&n!==r||(n++,t.insertBefore(Qt(),e)),r=n,this.parts.push({type:"node",index:n}),null===e.nextSibling?e.data="":(i.push(e),n--),a++}else{let t=-1;for(;-1!==(t=e.data.indexOf(Kt,t+1));)this.parts.push({type:"node",index:-1}),a++}}else o.currentNode=s.pop()}for(const e of i)e.parentNode.removeChild(e)}}const Xt=(e,t)=>{const i=e.length-t.length;return i>=0&&e.slice(i)===t},Zt=e=>-1!==e.index,Qt=()=>document.createComment(""),ei=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function ti(e,t){const{element:{content:i},parts:s}=e,o=document.createTreeWalker(i,133,null,!1);let r=si(s),n=s[r],a=-1,l=0;const c=[];let u=null;for(;o.nextNode();){a++;const e=o.currentNode;for(e.previousSibling===u&&(u=null),t.has(e)&&(c.push(e),null===u&&(u=e)),null!==u&&l++;void 0!==n&&n.index===a;)n.index=null!==u?-1:n.index-l,r=si(s,r),n=s[r]}c.forEach((e=>e.parentNode.removeChild(e)))}const ii=e=>{let t=11===e.nodeType?0:1;const i=document.createTreeWalker(e,133,null,!1);for(;i.nextNode();)t++;return t},si=(e,t=-1)=>{for(let i=t+1;i<e.length;i++){const t=e[i];if(Zt(t))return i}return-1};const oi=new WeakMap,ri=e=>"function"==typeof e&&oi.has(e),ni={},ai={};class li{constructor(e,t,i){this.__parts=[],this.template=e,this.processor=t,this.options=i}update(e){let t=0;for(const i of this.__parts)void 0!==i&&i.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=Wt?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],i=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let o,r=0,n=0,a=s.nextNode();for(;r<i.length;)if(o=i[r],Zt(o)){for(;n<o.index;)n++,"TEMPLATE"===a.nodeName&&(t.push(a),s.currentNode=a.content),null===(a=s.nextNode())&&(s.currentNode=t.pop(),a=s.nextNode());if("node"===o.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(a.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,o.name,o.strings,this.options));r++}else this.__parts.push(void 0),r++;return Wt&&(document.adoptNode(e),customElements.upgrade(e)),e}}const ci=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),ui=` ${Kt} `;class di{constructor(e,t,i,s){this.strings=e,this.values=t,this.type=i,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",i=!1;for(let s=0;s<e;s++){const e=this.strings[s],o=e.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===e.indexOf("--\x3e",o+1);const r=ei.exec(e);t+=null===r?e+(i?ui:Gt):e.substr(0,r.index)+r[1]+r[2]+"$lit$"+r[3]+Kt}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==ci&&(t=ci.createHTML(t)),e.innerHTML=t,e}}const hi=e=>null===e||!("object"==typeof e||"function"==typeof e),pi=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class fi{constructor(e,t,i){this.dirty=!0,this.element=e,this.name=t,this.strings=i,this.parts=[];for(let e=0;e<i.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new bi(this)}_getValue(){const e=this.strings,t=e.length-1,i=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=i[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!pi(e))return e}let s="";for(let o=0;o<t;o++){s+=e[o];const t=i[o];if(void 0!==t){const e=t.value;if(hi(e)||!pi(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class bi{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===ni||hi(e)&&e===this.value||(this.value=e,ri(e)||(this.committer.dirty=!0))}commit(){for(;ri(this.value);){const e=this.value;this.value=ni,e(this)}this.value!==ni&&this.committer.commit()}}class vi{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(Qt()),this.endNode=e.appendChild(Qt())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=Qt()),e.__insert(this.endNode=Qt())}insertAfterPart(e){e.__insert(this.startNode=Qt()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;ri(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=ni,e(this)}const e=this.__pendingValue;e!==ni&&(hi(e)?e!==this.value&&this.__commitText(e):e instanceof di?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):pi(e)?this.__commitIterable(e):e===ai?(this.value=ai,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,i="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=i:this.__commitNode(document.createTextNode(i)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof li&&this.value.template===t)this.value.update(e.values);else{const i=new li(t,e.processor,this.options),s=i._clone();i.update(e.values),this.__commitNode(s),this.value=i}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let i,s=0;for(const o of e)i=t[s],void 0===i&&(i=new vi(this.options),t.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(t[s-1])),i.setValue(o),i.commit(),s++;s<t.length&&(t.length=s,this.clear(i&&i.endNode))}clear(e=this.startNode){Ft(this.startNode.parentNode,e.nextSibling,this.endNode)}}class mi{constructor(e,t,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=i}setValue(e){this.__pendingValue=e}commit(){for(;ri(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=ni,e(this)}if(this.__pendingValue===ni)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=ni}}class gi extends fi{constructor(e,t,i){super(e,t,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new yi(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class yi extends bi{}let xi=!1;(()=>{try{const e={get capture(){return xi=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class wi{constructor(e,t,i){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=i,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;ri(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=ni,e(this)}if(this.__pendingValue===ni)return;const e=this.__pendingValue,t=this.value,i=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=ki(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=ni}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const ki=e=>e&&(xi?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);function _i(e){let t=Ei.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},Ei.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const s=e.strings.join(Kt);return i=t.keyString.get(s),void 0===i&&(i=new Jt(e,e.getTemplateElement()),t.keyString.set(s,i)),t.stringsArray.set(e.strings,i),i}const Ei=new Map,Si=new WeakMap;const Ci=new class{handleAttributeExpressions(e,t,i,s){const o=t[0];if("."===o){return new gi(e,t.slice(1),i).parts}if("@"===o)return[new wi(e,t.slice(1),s.eventContext)];if("?"===o)return[new mi(e,t.slice(1),i)];return new fi(e,t,i).parts}handleTextExpression(e){return new vi(e)}};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const zi=(e,...t)=>new di(e,t,"html",Ci),$i=(e,t)=>`${e}--${t}`;let Oi=!0;void 0===window.ShadyCSS?Oi=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),Oi=!1);const Ai=e=>t=>{const i=$i(t.type,e);let s=Ei.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},Ei.set(i,s));let o=s.stringsArray.get(t.strings);if(void 0!==o)return o;const r=t.strings.join(Kt);if(o=s.keyString.get(r),void 0===o){const i=t.getTemplateElement();Oi&&window.ShadyCSS.prepareTemplateDom(i,e),o=new Jt(t,i),s.keyString.set(r,o)}return s.stringsArray.set(t.strings,o),o},Pi=["html","svg"],Ni=new Set,Ti=(e,t,i)=>{Ni.add(e);const s=i?i.element:document.createElement("template"),o=t.querySelectorAll("style"),{length:r}=o;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(s,e);const n=document.createElement("style");for(let e=0;e<r;e++){const t=o[e];t.parentNode.removeChild(t),n.textContent+=t.textContent}(e=>{Pi.forEach((t=>{const i=Ei.get($i(t,e));void 0!==i&&i.keyString.forEach((e=>{const{element:{content:t}}=e,i=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{i.add(e)})),ti(e,i)}))}))})(e);const a=s.content;i?function(e,t,i=null){const{element:{content:s},parts:o}=e;if(null==i)return void s.appendChild(t);const r=document.createTreeWalker(s,133,null,!1);let n=si(o),a=0,l=-1;for(;r.nextNode();)for(l++,r.currentNode===i&&(a=ii(t),i.parentNode.insertBefore(t,i));-1!==n&&o[n].index===l;){if(a>0){for(;-1!==n;)o[n].index+=a,n=si(o,n);return}n=si(o,n)}}(i,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const l=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==l)t.insertBefore(l.cloneNode(!0),t.firstChild);else if(i){a.insertBefore(n,a.firstChild);const e=new Set;e.add(n),ti(i,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const Ii={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},Li=(e,t)=>t!==e&&(t==t||e==e),Di={attribute:!0,type:String,converter:Ii,reflect:!1,hasChanged:Li};class Ui extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,i)=>{const s=this._attributeNameForProperty(i,t);void 0!==s&&(this._attributeToPropertyMap.set(s,i),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=Di){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const i="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const o=this[e];this[t]=s,this.requestUpdateInternal(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||Di}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const i of t)this.createProperty(i,e[i])}}static _attributeNameForProperty(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,i=Li){return i(e,t)}static _propertyValueFromAttribute(e,t){const i=t.type,s=t.converter||Ii,o="function"==typeof s?s:s.fromAttribute;return o?o(e,i):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const i=t.type,s=t.converter;return(s&&s.toAttribute||Ii.toAttribute)(e,i)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,i){t!==i&&this._attributeToProperty(e,i)}_propertyToAttribute(e,t,i=Di){const s=this.constructor,o=s._attributeNameForProperty(e,i);if(void 0!==o){const e=s._propertyValueToAttribute(t,i);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(o):this.setAttribute(o,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(e);if(void 0!==s){const e=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,i){let s=!0;if(void 0!==e){const o=this.constructor;i=i||o.getPropertyOptions(e),o._valueHasChanged(this[e],t,i.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}Ui.finalized=!0;const Bi=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Ri(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):Bi(e,t)}const Mi=(e,t,i)=>{Object.defineProperty(t,i,e)},Hi=(e,t)=>({kind:"method",placement:"prototype",key:t.key,descriptor:e}),ji=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Vi=Symbol();class qi{constructor(e,t){if(t!==Vi)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(ji?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Wi=e=>new qi(String(e),Vi),Fi=(e,...t)=>{const i=t.reduce(((t,i,s)=>t+(e=>{if(e instanceof qi)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+e[s+1]),e[0]);return new qi(i,Vi)};(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const Ki={};class Gi extends Ui{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,i)=>e.reduceRight(((e,i)=>Array.isArray(i)?t(i,e):(e.add(i),e)),i),i=t(e,new Set),s=[];i.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!ji){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return Wi(t)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?ji?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==Ki&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return Ki}}Gi.finalized=!0,Gi.render=(e,t,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,o=Si.has(t),r=Oi&&11===t.nodeType&&!!t.host,n=r&&!Ni.has(s),a=n?document.createDocumentFragment():t;if(((e,t,i)=>{let s=Si.get(t);void 0===s&&(Ft(t,t.firstChild),Si.set(t,s=new vi(Object.assign({templateFactory:_i},i))),s.appendInto(t)),s.setValue(e),s.commit()})(e,a,Object.assign({templateFactory:Ai(s)},i)),n){const e=Si.get(a);Si.delete(a);const i=e.value instanceof li?e.value.template:void 0;Ti(s,a,i),Ft(t,t.firstChild),t.appendChild(a),Si.set(t,e)}!o&&r&&window.ShadyCSS.styleElement(t.host)};let Yi,Ji,Xi=e=>e;class Zi extends Gi{render(){return zi(Yi||(Yi=Xi` <uui-dialog> <uui-button slot="actions">Cancel</uui-button> <uui-button slot="actions" button-style="positive">Do this</uui-button> </uui-dialog>`))}}Zi.styles=[Fi(Ji||(Ji=Xi`uui-dialog{--uui-interface-ordinary-background-color:red}`))],customElements.define("uui-dialog-example",Zi);class Qi extends t{}Qi.OPEN="open",Qi.CLOSE="close";var es={left:"right",right:"left",bottom:"top",top:"bottom"};function ts(e){return e.replace(/left|right|bottom|top/g,(function(e){return es[e]}))}var is="top",ss="bottom",os="right",rs="left",ns=[is,ss,os,rs],as=ns.reduce((function(e,t){return e.concat([t+"-start",t+"-end"])}),[]),ls=[].concat(ns,["auto"]).reduce((function(e,t){return e.concat([t,t+"-start",t+"-end"])}),[]),cs=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function us(e){return e.split("-")[0]}var ds={start:"end",end:"start"};function hs(e){return e.replace(/start|end/g,(function(e){return ds[e]}))}function ps(e){var t=e.getBoundingClientRect();return{width:t.width,height:t.height,top:t.top,right:t.right,bottom:t.bottom,left:t.left,x:t.left,y:t.top}}function fs(e){if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function bs(e){return e instanceof fs(e).Element||e instanceof Element}function vs(e){return e instanceof fs(e).HTMLElement||e instanceof HTMLElement}function ms(e){return"undefined"!=typeof ShadowRoot&&(e instanceof fs(e).ShadowRoot||e instanceof ShadowRoot)}function gs(e){return((bs(e)?e.ownerDocument:e.document)||window.document).documentElement}function ys(e){var t=fs(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function xs(e){return ps(gs(e)).left+ys(e).scrollLeft}function ws(e){return fs(e).getComputedStyle(e)}var ks=Math.max,_s=Math.min,Es=Math.round;function Ss(e){return e?(e.nodeName||"").toLowerCase():null}function Cs(e){return"html"===Ss(e)?e:e.assignedSlot||e.parentNode||(ms(e)?e.host:null)||gs(e)}function zs(e){var t=ws(e),i=t.overflow,s=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(i+o+s)}function $s(e){return["html","body","#document"].indexOf(Ss(e))>=0?e.ownerDocument.body:vs(e)&&zs(e)?e:$s(Cs(e))}function Os(e,t){var i;void 0===t&&(t=[]);var s=$s(e),o=s===(null==(i=e.ownerDocument)?void 0:i.body),r=fs(s),n=o?[r].concat(r.visualViewport||[],zs(s)?s:[]):s,a=t.concat(n);return o?a:a.concat(Os(Cs(n)))}function As(e){return["table","td","th"].indexOf(Ss(e))>=0}function Ps(e){return vs(e)&&"fixed"!==ws(e).position?e.offsetParent:null}function Ns(e){for(var t=fs(e),i=Ps(e);i&&As(i)&&"static"===ws(i).position;)i=Ps(i);return i&&("html"===Ss(i)||"body"===Ss(i)&&"static"===ws(i).position)?t:i||function(e){for(var t=navigator.userAgent.toLowerCase().includes("firefox"),i=Cs(e);vs(i)&&["html","body"].indexOf(Ss(i))<0;){var s=ws(i);if("none"!==s.transform||"none"!==s.perspective||"paint"===s.contain||["transform","perspective"].includes(s.willChange)||t&&"filter"===s.willChange||t&&s.filter&&"none"!==s.filter)return i;i=i.parentNode}return null}(e)||t}function Ts(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Is(e,t){return"viewport"===t?Ts(function(e){var t=fs(e),i=gs(e),s=t.visualViewport,o=i.clientWidth,r=i.clientHeight,n=0,a=0;return s&&(o=s.width,r=s.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(n=s.offsetLeft,a=s.offsetTop)),{width:o,height:r,x:n+xs(e),y:a}}(e)):vs(t)?function(e){var t=ps(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(t):Ts(function(e){var t,i=gs(e),s=ys(e),o=null==(t=e.ownerDocument)?void 0:t.body,r=ks(i.scrollWidth,i.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),n=ks(i.scrollHeight,i.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),a=-s.scrollLeft+xs(e),l=-s.scrollTop;return"rtl"===ws(o||i).direction&&(a+=ks(i.clientWidth,o?o.clientWidth:0)-r),{width:r,height:n,x:a,y:l}}(gs(e)))}function Ls(e){var t=Os(Cs(e)),i=["absolute","fixed"].indexOf(ws(e).position)>=0&&vs(e)?Ns(e):e;return bs(i)?t.filter((function(e){return bs(e)&&function(e,t){var i=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(i&&ms(i)){var s=t;do{if(s&&e.isSameNode(s))return!0;s=s.parentNode||s.host}while(s)}return!1}(e,i)&&"body"!==Ss(e)})):[]}function Ds(e){return e.split("-")[1]}function Us(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Bs(e){var t,i=e.reference,s=e.element,o=e.placement,r=o?us(o):null,n=o?Ds(o):null,a=i.x+i.width/2-s.width/2,l=i.y+i.height/2-s.height/2;switch(r){case is:t={x:a,y:i.y-s.height};break;case ss:t={x:a,y:i.y+i.height};break;case os:t={x:i.x+i.width,y:l};break;case rs:t={x:i.x-s.width,y:l};break;default:t={x:i.x,y:i.y}}var c=r?Us(r):null;if(null!=c){var u="y"===c?"height":"width";switch(n){case"start":t[c]=t[c]-(i[u]/2-s[u]/2);break;case"end":t[c]=t[c]+(i[u]/2-s[u]/2)}}return t}function Rs(e,t){void 0===t&&(t={});var i=t,s=i.placement,o=void 0===s?e.placement:s,r=i.boundary,n=void 0===r?"clippingParents":r,a=i.rootBoundary,l=void 0===a?"viewport":a,c=i.elementContext,u=void 0===c?"popper":c,d=i.altBoundary,h=void 0!==d&&d,p=i.padding,f=void 0===p?0:p,b=function(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}("number"!=typeof f?f:function(e,t){return t.reduce((function(t,i){return t[i]=e,t}),{})}(f,ns)),v="popper"===u?"reference":"popper",m=e.elements.reference,g=e.rects.popper,y=e.elements[h?v:u],x=function(e,t,i){var s="clippingParents"===t?Ls(e):[].concat(t),o=[].concat(s,[i]),r=o[0],n=o.reduce((function(t,i){var s=Is(e,i);return t.top=ks(s.top,t.top),t.right=_s(s.right,t.right),t.bottom=_s(s.bottom,t.bottom),t.left=ks(s.left,t.left),t}),Is(e,r));return n.width=n.right-n.left,n.height=n.bottom-n.top,n.x=n.left,n.y=n.top,n}(bs(y)?y:y.contextElement||gs(e.elements.popper),n,l),w=ps(m),k=Bs({reference:w,element:g,strategy:"absolute",placement:o}),_=Ts(Object.assign({},g,k)),E="popper"===u?_:w,S={top:x.top-E.top+b.top,bottom:E.bottom-x.bottom+b.bottom,left:x.left-E.left+b.left,right:E.right-x.right+b.right},C=e.modifiersData.offset;if("popper"===u&&C){var z=C[o];Object.keys(S).forEach((function(e){var t=[os,ss].indexOf(e)>=0?1:-1,i=[is,ss].indexOf(e)>=0?"y":"x";S[e]+=z[i]*t}))}return S}function Ms(e,t){void 0===t&&(t={});var i=t,s=i.placement,o=i.boundary,r=i.rootBoundary,n=i.padding,a=i.flipVariations,l=i.allowedAutoPlacements,c=void 0===l?ls:l,u=Ds(s),d=u?a?as:as.filter((function(e){return Ds(e)===u})):ns,h=d.filter((function(e){return c.indexOf(e)>=0}));0===h.length&&(h=d);var p=h.reduce((function(t,i){return t[i]=Rs(e,{placement:i,boundary:o,rootBoundary:r,padding:n})[us(i)],t}),{});return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}function Hs(e,t,i){return ks(e,_s(t,i))}function js(e){return{x:e.offsetLeft,y:e.offsetTop,width:e.offsetWidth,height:e.offsetHeight}}function Vs(e,t,i){void 0===i&&(i=!1);var s,o,r=gs(t),n=ps(e),a=vs(t),l={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(a||!a&&!i)&&(("body"!==Ss(t)||zs(r))&&(l=(s=t)!==fs(s)&&vs(s)?{scrollLeft:(o=s).scrollLeft,scrollTop:o.scrollTop}:ys(s)),vs(t)?((c=ps(t)).x+=t.clientLeft,c.y+=t.clientTop):r&&(c.x=xs(r))),{x:n.left+l.scrollLeft-c.x,y:n.top+l.scrollTop-c.y,width:n.width,height:n.height}}function qs(e){var t=new Map,i=new Set,s=[];function o(e){i.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!i.has(e)){var s=t.get(e);s&&o(s)}})),s.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){i.has(e.name)||o(e)})),s}var Ws={placement:"bottom",modifiers:[],strategy:"absolute"};function Fs(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}var Ks={passive:!0};var Gs={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Ys(e){var t,i=e.popper,s=e.popperRect,o=e.placement,r=e.offsets,n=e.position,a=e.gpuAcceleration,l=e.adaptive,c=e.roundOffsets,u=!0===c?function(e){var t=e.x,i=e.y,s=window.devicePixelRatio||1;return{x:Es(Es(t*s)/s)||0,y:Es(Es(i*s)/s)||0}}(r):"function"==typeof c?c(r):r,d=u.x,h=void 0===d?0:d,p=u.y,f=void 0===p?0:p,b=r.hasOwnProperty("x"),v=r.hasOwnProperty("y"),m=rs,g=is,y=window;if(l){var x=Ns(i),w="clientHeight",k="clientWidth";x===fs(i)&&"static"!==ws(x=gs(i)).position&&(w="scrollHeight",k="scrollWidth"),o===is&&(g=ss,f-=x[w]-s.height,f*=a?1:-1),o===rs&&(m=os,h-=x[k]-s.width,h*=a?1:-1)}var _,E=Object.assign({position:n},l&&Gs);return a?Object.assign({},E,((_={})[g]=v?"0":"",_[m]=b?"0":"",_.transform=(y.devicePixelRatio||1)<2?"translate("+h+"px, "+f+"px)":"translate3d("+h+"px, "+f+"px, 0)",_)):Object.assign({},E,((t={})[g]=v?f+"px":"",t[m]=b?h+"px":"",t.transform="",t))}const Js=function(e){void 0===e&&(e={});var t=e,i=t.defaultModifiers,s=void 0===i?[]:i,o=t.defaultOptions,r=void 0===o?Ws:o;return function(e,t,i){void 0===i&&(i=r);var o,n,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},Ws,r),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},l=[],c=!1,u={state:a,setOptions:function(i){d(),a.options=Object.assign({},r,a.options,i),a.scrollParents={reference:bs(e)?Os(e):e.contextElement?Os(e.contextElement):[],popper:Os(t)};var o,n,c=function(e){var t=qs(e);return cs.reduce((function(e,i){return e.concat(t.filter((function(e){return e.phase===i})))}),[])}((o=[].concat(s,a.options.modifiers),n=o.reduce((function(e,t){var i=e[t.name];return e[t.name]=i?Object.assign({},i,t,{options:Object.assign({},i.options,t.options),data:Object.assign({},i.data,t.data)}):t,e}),{}),Object.keys(n).map((function(e){return n[e]}))));return a.orderedModifiers=c.filter((function(e){return e.enabled})),a.orderedModifiers.forEach((function(e){var t=e.name,i=e.options,s=void 0===i?{}:i,o=e.effect;if("function"==typeof o){var r=o({state:a,name:t,instance:u,options:s}),n=function(){};l.push(r||n)}})),u.update()},forceUpdate:function(){if(!c){var e=a.elements,t=e.reference,i=e.popper;if(Fs(t,i)){a.rects={reference:Vs(t,Ns(i),"fixed"===a.options.strategy),popper:js(i)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(e){return a.modifiersData[e.name]=Object.assign({},e.data)}));for(var s=0;s<a.orderedModifiers.length;s++)if(!0!==a.reset){var o=a.orderedModifiers[s],r=o.fn,n=o.options,l=void 0===n?{}:n,d=o.name;"function"==typeof r&&(a=r({state:a,options:l,name:d,instance:u})||a)}else a.reset=!1,s=-1}}},update:(o=function(){return new Promise((function(e){u.forceUpdate(),e(a)}))},function(){return n||(n=new Promise((function(e){Promise.resolve().then((function(){n=void 0,e(o())}))}))),n}),destroy:function(){d(),c=!0}};if(!Fs(e,t))return u;function d(){l.forEach((function(e){return e()})),l=[]}return u.setOptions(i).then((function(e){!c&&i.onFirstUpdate&&i.onFirstUpdate(e)})),u}}({defaultModifiers:[...[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,i=e.instance,s=e.options,o=s.scroll,r=void 0===o||o,n=s.resize,a=void 0===n||n,l=fs(t.elements.popper),c=[].concat(t.scrollParents.reference,t.scrollParents.popper);return r&&c.forEach((function(e){e.addEventListener("scroll",i.update,Ks)})),a&&l.addEventListener("resize",i.update,Ks),function(){r&&c.forEach((function(e){e.removeEventListener("scroll",i.update,Ks)})),a&&l.removeEventListener("resize",i.update,Ks)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,i=e.name;t.modifiersData[i]=Bs({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,i=e.options,s=i.gpuAcceleration,o=void 0===s||s,r=i.adaptive,n=void 0===r||r,a=i.roundOffsets,l=void 0===a||a,c={placement:us(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,Ys(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:n,roundOffsets:l})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,Ys(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var i=t.styles[e]||{},s=t.attributes[e]||{},o=t.elements[e];vs(o)&&Ss(o)&&(Object.assign(o.style,i),Object.keys(s).forEach((function(e){var t=s[e];!1===t?o.removeAttribute(e):o.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,i={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,i.popper),t.styles=i,t.elements.arrow&&Object.assign(t.elements.arrow.style,i.arrow),function(){Object.keys(t.elements).forEach((function(e){var s=t.elements[e],o=t.attributes[e]||{},r=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:i[e]).reduce((function(e,t){return e[t]="",e}),{});vs(s)&&Ss(s)&&(Object.assign(s.style,r),Object.keys(o).forEach((function(e){s.removeAttribute(e)})))}))}},requires:["computeStyles"]}],{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,i=e.options,s=e.name;if(!t.modifiersData[s]._skip){for(var o=i.mainAxis,r=void 0===o||o,n=i.altAxis,a=void 0===n||n,l=i.fallbackPlacements,c=i.padding,u=i.boundary,d=i.rootBoundary,h=i.altBoundary,p=i.flipVariations,f=void 0===p||p,b=i.allowedAutoPlacements,v=t.options.placement,m=us(v),g=l||(m===v||!f?[ts(v)]:function(e){if("auto"===us(e))return[];var t=ts(e);return[hs(e),t,hs(t)]}(v)),y=[v].concat(g).reduce((function(e,i){return e.concat("auto"===us(i)?Ms(t,{placement:i,boundary:u,rootBoundary:d,padding:c,flipVariations:f,allowedAutoPlacements:b}):i)}),[]),x=t.rects.reference,w=t.rects.popper,k=new Map,_=!0,E=y[0],S=0;S<y.length;S++){var C=y[S],z=us(C),$="start"===Ds(C),O=[is,ss].indexOf(z)>=0,A=O?"width":"height",P=Rs(t,{placement:C,boundary:u,rootBoundary:d,altBoundary:h,padding:c}),N=O?$?os:rs:$?ss:is;x[A]>w[A]&&(N=ts(N));var T=ts(N),I=[];if(r&&I.push(P[z]<=0),a&&I.push(P[N]<=0,P[T]<=0),I.every((function(e){return e}))){E=C,_=!1;break}k.set(C,I)}if(_)for(var L=function(e){var t=y.find((function(t){var i=k.get(t);if(i)return i.slice(0,e).every((function(e){return e}))}));if(t)return E=t,"break"},D=f?3:1;D>0;D--){if("break"===L(D))break}t.placement!==E&&(t.modifiersData[s]._skip=!0,t.placement=E,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},{name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,i=e.options,s=e.name,o=i.mainAxis,r=void 0===o||o,n=i.altAxis,a=void 0!==n&&n,l=i.boundary,c=i.rootBoundary,u=i.altBoundary,d=i.padding,h=i.tether,p=void 0===h||h,f=i.tetherOffset,b=void 0===f?0:f,v=Rs(t,{boundary:l,rootBoundary:c,padding:d,altBoundary:u}),m=us(t.placement),g=Ds(t.placement),y=!g,x=Us(m),w="x"===x?"y":"x",k=t.modifiersData.popperOffsets,_=t.rects.reference,E=t.rects.popper,S="function"==typeof b?b(Object.assign({},t.rects,{placement:t.placement})):b,C={x:0,y:0};if(k){if(r||a){var z="y"===x?is:rs,$="y"===x?ss:os,O="y"===x?"height":"width",A=k[x],P=k[x]+v[z],N=k[x]-v[$],T=p?-E[O]/2:0,I="start"===g?_[O]:E[O],L="start"===g?-E[O]:-_[O],D=t.elements.arrow,U=p&&D?js(D):{width:0,height:0},B=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},R=B[z],M=B[$],H=Hs(0,_[O],U[O]),j=y?_[O]/2-T-H-R-S:I-H-R-S,V=y?-_[O]/2+T+H+M+S:L+H+M+S,q=t.elements.arrow&&Ns(t.elements.arrow),W=q?"y"===x?q.clientTop||0:q.clientLeft||0:0,F=t.modifiersData.offset?t.modifiersData.offset[t.placement][x]:0,K=k[x]+j-F-W,G=k[x]+V-F;if(r){var Y=Hs(p?_s(P,K):P,A,p?ks(N,G):N);k[x]=Y,C[x]=Y-A}if(a){var J="x"===x?is:rs,X="x"===x?ss:os,Z=k[w],Q=Z+v[J],ee=Z-v[X],te=Hs(p?_s(Q,K):Q,Z,p?ks(ee,G):ee);k[w]=te,C[w]=te-Z}}t.modifiersData[s]=C}},requiresIfExists:["offset"]},{name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,i=e.options,s=e.name,o=i.offset,r=void 0===o?[0,0]:o,n=ls.reduce((function(e,i){return e[i]=function(e,t,i){var s=us(e),o=[rs,is].indexOf(s)>=0?-1:1,r="function"==typeof i?i(Object.assign({},t,{placement:e})):i,n=r[0],a=r[1];return n=n||0,a=(a||0)*o,[rs,os].indexOf(s)>=0?{x:a,y:n}:{x:n,y:a}}(i,t.rects,r),e}),{}),a=n[t.placement],l=a.x,c=a.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=l,t.modifiersData.popperOffsets.y+=c),t.modifiersData[s]=n}}]});let Xs,Zs,Qs=e=>e;class eo extends ge{constructor(){super(...arguments),this.position="bottom",this.auto=!1,this.sameWidth=!1,this.disableOutsideClick=!1,this._keyframes=[{transform:"scaleY(0)",opacity:0},{opacity:0,offset:.5},{opacity:1,offset:.9},{transform:"scaleY(1)"}],this._options={duration:300,fill:"both",easing:""+(this._reducedMotion()?"steps(1)":"cubic-bezier(.69,.67,.59,1.15)")},this.popperOwner=void 0,this._isOpen=!1,this.closeDropdownOnOutsideClick=e=>{if(!0!==this.disableOutsideClick){e.stopPropagation(),e.preventDefault();if(e.composedPath().includes(this))return;this.isOpen&&(this.isOpen=!1)}}}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.closeDropdownOnOutsideClick)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.closeDropdownOnOutsideClick),this._popper&&this._popper.destroy()}_reducedMotion(){const e=window.matchMedia("(prefers-reduced-motion: reduce)");return!e||e.matches}firstUpdated(){this._animation=this._dropdownContainer.animate(this._keyframes,this._options),this._animation.pause(),this._animation.currentTime=0,this.createPopperInstance()}createPopperInstance(){const e={name:"sameWidth",enabled:this.sameWidth,phase:"beforeWrite",requires:["computeStyles"],fn:({state:e})=>{e.styles.popper.width=`${e.rects.reference.width}px`},effect:({state:e})=>{const t=e.elements.reference;e.elements.popper.style.width=`${t.offsetWidth}px`}},t=this.popperOwner?this.popperOwner:this;this._popper=Js(t,this._popperWrapper,{placement:this.position,modifiers:[{name:"offset",options:{offset:[0,6]}},{name:"flip",enabled:this.auto},e]})}get isOpen(){return this._isOpen}set isOpen(e){const t=this._isOpen;e!==this._isOpen&&(this._isOpen=e,e?(this._popper.update(),this.dispatchEvent(new Qi(Qi.OPEN))):this.dispatchEvent(new Qi(Qi.CLOSE)),this.toggleOpen(e),this.requestUpdate("isOpen",t))}toggleOpen(e){this._animation.play(),this._animation.finished.then((()=>{this._animation.pause(),this._animation.playbackRate=e?-1:1}))}render(){return L(Xs||(Xs=Qs`
      <slot name="input"></slot>
      <slot name="toggle" @click="${0}"></slot>

      <div id="popper">
        <div id="data-container" part="data-container">
          <slot></slot>
        </div>
      </div>
    `),(()=>this.isOpen=!this.isOpen))}}eo.styles=[ie(Zs||(Zs=Qs`
      :host {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
      }

      #data-container {
        box-sizing: border-box;
        border-radius: var(--uui-size-border-radius);
        box-shadow: 0 5px 20px rgb(0 0 0 / 30%);
      }

      #popper[data-popper-placement='bottom'] #data-container {
        transform-origin: top center;
      }

      #popper[data-popper-placement='top'] #data-container {
        transform-origin: bottom center;
      }

      #popper[data-popper-placement='left'] #data-container {
        transform-origin: center right;
      }

      #popper[data-popper-placement='right'] #data-container {
        transform-origin: center left;
      }

      slot[name='toggle']::slotted(uui-button) {
        --uui-button-border-radius: var(
          --uui-dropdown-toggle-slot-button-border-radius
        );
        --uui-button-merge-border-left: var(
          --uui-dropdown-toggle-slot-button-merge-border-left
        );
      }

      @media (prefers-color-scheme: dark) {
        #data-container {
          border: 1px solid var(--uui-interface-border);
        }
      }
    `))],r([a({type:String})],eo.prototype,"position",void 0),r([a({type:Boolean})],eo.prototype,"auto",void 0),r([a({type:Boolean,attribute:"same-width"})],eo.prototype,"sameWidth",void 0),r([a({type:Boolean,attribute:"disable-outside-click"})],eo.prototype,"disableOutsideClick",void 0),r([u("#data-container")],eo.prototype,"_dropdownContainer",void 0),r([u("#popper")],eo.prototype,"_popperWrapper",void 0),r([a({attribute:!1})],eo.prototype,"popperOwner",void 0),r([a({type:Boolean,reflect:!0,attribute:"open"})],eo.prototype,"isOpen",null),customElements.define("uui-dropdown",eo);class to extends t{}to.FILE_DROP="file-drop";let io,so,oo,ro,no=e=>e;class ao extends ge{constructor(){super(),this.active=!1,this.error=!1,this.directory=!1,this.files=[],this.multiple=!1,this.label="",this.addEventListener("dragenter",this.onDragEnter,!1),this.addEventListener("dragleave",this.onDragLeave,!1),this.addEventListener("dragover",this.onDragOver,!1),this.addEventListener("drop",this.onDrop,!1),this.addEventListener("click",this.handleClick)}checkIsItDirectory(e){return!e.type&&e.webkitGetAsEntry().isDirectory}onDrop(e){this.preventDefaults(e);const t=e.dataTransfer;if(null==t?void 0:t.files){if(!this.multiple&&t.files.length>1)return void(this.error=!1);let e=[];if(this.directory)e=Array.from(t.files),console.log("directory upload is not yet implemented");else for(let i=0;i<t.items.length;i++)this.checkIsItDirectory(t.items[i])||t.items[i].getAsFile()&&e.push(t.items[i].getAsFile());this.files=e,this.dispatchEvent(new to(to.FILE_DROP))}}onDragOver(e){this.active=!0,this.preventDefaults(e)}onDragEnter(e){this.active=!0,this.preventDefaults(e);const t=e.dataTransfer;(null==t?void 0:t.items)&&!this.multiple&&t.items.length>1&&(this.error=!0)}onDragLeave(e){this.active=!1,this.error=!1,this.preventDefaults(e)}preventDefaults(e){e.preventDefault(),e.stopPropagation()}_onFileInputChange(){this.files=this.input.files?Array.from(this.input.files):[],this.dispatchEvent(new to(to.FILE_DROP))}handleClick(e){e.stopPropagation(),this.input.click()}render(){return L(io||(io=no`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        id="upload-icon"
      >
        <path
          d=${0}
        />
      </svg>
      ${0}

      <input
        id="input"
        type="file"
        ?multiple=${0}
        @change=${0}
      /><label id="label" for="input">${0}</label>`),this.error?"M254.501 38.16c-120.308 0-217.838 97.53-217.838 217.838 0 120.31 97.53 217.838 217.838 217.838 120.31 0 217.838-97.528 217.838-217.838 0-120.308-97.528-217.838-217.838-217.838zm151.667 217.838c0 29.861-8.711 57.708-23.671 81.209L173.293 128.002c23.499-14.961 51.345-23.67 81.208-23.67 83.629.001 151.667 68.037 151.667 151.666zm-303.332 0c0-29.859 8.71-57.707 23.67-81.204l209.201 209.201c-23.498 14.96-51.346 23.671-81.206 23.671-83.632 0-151.665-68.04-151.665-151.668z":"M206.491 364.184h99.013V223.676h92.922L255.997 51.111 113.575 223.676h92.916zM85.043 398.311h341.912v62.578H85.043z",this.error?L(oo||(oo=no`<span>Only one file is allowed</span>`)):L(so||(so=no`<uui-button
            @click=${0}
            aria-controls="input"
            id="input-button"
            >Click or drag & drop ${0}
            here</uui-button
          >`),this.handleClick,this.multiple?"files":"file"),this.multiple,this._onFileInputChange,this.label)}}ao.styles=[ie(ro||(ro=no`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        align-items: center;
        justify-content: center;
        padding: var(--uui-size-medium, 24px);
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border);
      }

      :host(:focus-within) {
        outline: 1px solid #6ab4f0;

        box-shadow: inset 0px 0px 2px 0px #6ab4f0;
      }

      :host([active]) {
        border: 1px var(--uui-look-placeholder-border-style)
          var(--uui-interface-border-hover);
      }

      #upload-icon {
        width: 15%;
        fill: var(--uui-interface-border);
        opacity: 0.5;
        transition: opacity 0.3s ease;
      }

      :host([active]) #upload-icon {
        opacity: 1;
      }

      :host([error]) #upload-icon {
        fill: var(--uui-color-maroon-flush, #d42054);
      }

      #input,
      #label {
        position: absolute;
        width: 0px;
        height: 0px;
        opacity: 0;
        display: none;
      }

      #input-button:focus {
        outline: none;
      }
    `))],r([a({type:Boolean,reflect:!0})],ao.prototype,"active",void 0),r([a({type:Boolean,reflect:!0})],ao.prototype,"error",void 0),r([a({type:Boolean})],ao.prototype,"directory",void 0),r([u("#input")],ao.prototype,"input",void 0),r([a({attribute:!1})],ao.prototype,"files",void 0),r([a({type:Boolean,reflect:!0})],ao.prototype,"multiple",void 0),r([a({})],ao.prototype,"label",void 0),customElements.define("uui-file-dropzone",ao);let lo,co,uo,ho,po,fo=e=>e;class bo extends ge{constructor(){super(...arguments),this.filesArray=[],this.files=[],this.multiple=!1,this.label=""}handleFiles(){this.files=this.uploader.files,this.files?this.filesArray=Array.from(this.files):this.filesArray=[]}removeFiles(){this.files=[],this.filesArray=[]}render(){return L(lo||(lo=fo`
      ${0}
    `),0===this.files.length?L(co||(co=fo`<uui-file-dropzone
            id="uploader"
            @file-drop=${0}
            .multiple=${0}
            .label=${0}
          ></uui-file-dropzone>`),this.handleFiles,this.multiple,this.label):L(uo||(uo=fo` <div id="files">
              ${0}
            </div>
            <uui-button @click=${0} look="outline"
              ><uui-icon id="button-icon" name="delete"></uui-icon>
              Remove
              ${0}
            </uui-button>`),this.filesArray.map((e=>L(ho||(ho=fo`<uui-file-preview
                    .file=${0}
                    .name=${0}
                  ></uui-file-preview>`),e,e.name))),this.removeFiles,null!==this.files&&this.files.length>1?"files":"file"))}}bo.styles=[ie(po||(po=fo`
      :host {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
        /* min-height: 240px;
        min-width: 600px; */
      }

      #button-icon {
        margin: 0;
        color: var(--uui-color-maroon-flush, #d42054);
      }

      #files {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        place-items: stretch;
        grid-gap: var(--uui-size-layout-0);
      }
    `))],r([l()],bo.prototype,"filesArray",void 0),r([a({attribute:!1})],bo.prototype,"files",void 0),r([u("#files")],bo.prototype,"fileContainer",void 0),r([u("#uploader")],bo.prototype,"uploader",void 0),r([function(e){return c({descriptor:t=>({get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelectorAll(e)},enumerable:!0,configurable:!0})})}("uui-file-preview")],bo.prototype,"previews",void 0),r([a({type:Boolean,reflect:!0})],bo.prototype,"multiple",void 0),r([a({})],bo.prototype,"label",void 0),customElements.define("uui-file-input",bo);let vo,mo,go,yo,xo,wo,ko=e=>e;class _o extends ge{constructor(){super(...arguments),this.source="",this.sourceFileExt="",this.name="",this.type="",this.isDirectory=!1,this._file=null}get file(){return this._file}set file(e){const t=this._file;this._file=e,e&&(this._readFile(e),this.name=e.name),this.requestUpdate("file",t)}_readFile(e){this.type=e.type;const t=new FileReader;t.readAsDataURL(e),t.onloadend=()=>{t.result&&(this.source=t.result,this.sourceFileExt=this.source.slice(this.source.indexOf("/")+1,this.source.indexOf(";"))),t.error&&"NotFoundError"===t.error.name&&(this.isDirectory=!0)}}fileTypeTemplate(e){return e.startsWith("image")?L(vo||(vo=ko`<uui-image-file-symbol
        .type=${0}
        .source=${0}
      ></uui-image-file-symbol>`),this.sourceFileExt,this.source):this.isDirectory?L(mo||(mo=ko`<uui-folder-symbol></uui-folder-symbol>`)):L(go||(go=ko`<uui-file-symbol
      .type=${0}
    ></uui-file-symbol>`),this.sourceFileExt)}render(){var e,t;return L(yo||(yo=ko`
      ${0}
      <span id="file-name">
        ${0}
        ${0}
      </span>
    `),this.fileTypeTemplate(this.type),this.name,(null===(e=this.file)||void 0===e?void 0:e.size)&&!this.isDirectory?L(xo||(xo=ko`<br />
              ${0}`),class{static humanFileSize(e,t=!1,i=1){const s=t?1e3:1024;if(Math.abs(e)<s)return e+" B";const o=t?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let r=-1;const n=10**i;do{e/=s,++r}while(Math.round(Math.abs(e)*n)/n>=s&&r<o.length-1);return e.toFixed(i)+" "+o[r]}}.humanFileSize(null===(t=this.file)||void 0===t?void 0:t.size,!0)):"")}}_o.styles=[ie(wo||(wo=ko`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 12px;
        text-align: center;
      }
    `))],r([a({attribute:!1})],_o.prototype,"source",void 0),r([a({attribute:!1})],_o.prototype,"sourceFileExt",void 0),r([a({attribute:!1})],_o.prototype,"name",void 0),r([a({attribute:!1})],_o.prototype,"type",void 0),r([l({})],_o.prototype,"isDirectory",void 0),r([a({attribute:!1})],_o.prototype,"file",null),customElements.define("uui-file-preview",_o);let Eo,So,Co,zo=e=>e;class $o extends ge{constructor(){super(...arguments),this.type=""}render(){return L(Eo||(Eo=zo`<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="100%"
        id="icon"
      >
        <path
          d="M396.441 138.878l-83.997-83.993-7.331-7.333H105.702v416.701h298.071V146.214l-7.332-7.336zM130.74 439.217V72.591h141.613c37.201 0 19.274 88.18 19.274 88.18s86-20.901 87.104 18.534v259.912H130.74z"
        />
      </svg>
      ${0} `),this.type?L(So||(So=zo`<span id="file-type">${0}</span>`),this.type.toUpperCase()):"")}}$o.styles=[ie(Co||(Co=zo`
      :host {
        position: relative;
        display: block;
      }

      #file-type {
        position: absolute;
        bottom: 24%;
        left: 25.5%;
        margin-left: calc(var(--uui-size-space-3) * -1);
        padding: 0px var(--uui-size-space-3);
        font-weight: 700;
        color: var(--uui-color-gunmetal, #162335);
        background-color: var(--uui-color-spanish-pink, #f5c1bc);
      }

      #icon {
        fill: var(--uui-interface-border, lightgray);
      }
    `))],r([a({type:String})],$o.prototype,"type",void 0),customElements.define("uui-file-symbol",$o);let Oo,Ao,Po=e=>e;class No extends ge{render(){return L(Oo||(Oo=Po`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="100%"
      id="icon"
    >
      <path
        d="M450.962 169.833v-19.248c0-23.398-19.035-42.436-42.434-42.436H257.306c-5.885-16.926-21.99-29.1-40.885-29.1h-89.758c-20.545 0-37.795 14.391-42.191 33.623-13.891 7.016-23.486 21.45-23.486 37.912V169.897c-7.148 7.774-11.443 18.122-11.443 29.287v.956l.062.953c.045.704 4.639 70.713 5.469 95.492l3.137 93.62c.033 6.024.682 14.788 5.271 23.301 6.564 12.175 19.002 19.442 33.273 19.442h318.49c14.273 0 26.713-7.268 33.275-19.445 4.588-8.512 5.236-17.275 5.271-23.298l3.135-93.62c.832-24.782 5.424-94.788 5.471-95.492l.061-.953v-.956c0-11.203-4.314-21.574-11.496-29.351zM90.093 150.585c0-7.281 5.84-13.189 13.09-13.318h-.125c5.324 0 9.441-9.694 9.441-13.382l-.006-1.562c0-7.824 6.344-14.168 14.17-14.168h89.758c7.826 0 14.166 6.344 14.166 14.168v1.562c0 3.663 4.062 13.239 9.332 13.37h168.609c7.363 0 13.328 5.969 13.328 13.33v9.201H90.093v-9.201zm337.744 145.028c-.854 25.538-3.15 94.062-3.15 94.062 0 7.825-1.617 14.171-9.441 14.171H96.755c-7.822 0-9.439-6.346-9.439-14.171l-3.152-94.062c-.855-25.538-5.516-96.428-5.516-96.428 0-6.893 4.926-12.631 11.445-13.9l331.764-.009c6.547 1.251 11.494 6.998 11.494 13.909 0 .001-4.657 70.89-5.514 96.428z"
      />
    </svg> `))}}No.styles=[ie(Ao||(Ao=Po`
      :host {
        display: block;
        box-sizing: border-box;
        position: relative;
        max-width: 100px;
      }

      #icon {
        fill: var(--uui-interface-border, lightgray);
      }
    `))],customElements.define("uui-folder-symbol",No);let To;class Io extends ge{constructor(){super(...arguments),this._name=null}get name(){return this._name}set name(e){this._name=e,""!==this._name&&null!==this._name&&o.getIcon(this._name).then((e=>{this.shadowRoot&&(this.shadowRoot.innerHTML=e)}))}}Io.styles=[ie(To||(To=(e=>e)`
      :host {
        display: inline-block;
        vertical-align: bottom;
        width: 1.15em;
        height: 1.15em;
      }

      :host svg {
        fill: currentColor;
      }
    `))],r([a()],Io.prototype,"name",null),customElements.define("uui-icon",Io);let Lo,Do,Uo=e=>e;class Bo extends ge{constructor(){super(...arguments),this.source="",this.type=""}render(){return L(Lo||(Lo=Uo`
      <!-- TODO: figure out how we use other components, so we dont use their custom element tag name. -->
      <uui-file-symbol .type=${0}></uui-file-symbol>
      <div id="image-wrapper">
        <img .src=${0} />
      </div>
    `),this.type,this.source)}}Bo.styles=[ie(Do||(Do=Uo`
      :host {
        position: relative;
        display: block;
      }

      #image-wrapper {
        position: absolute;
        top: 13%;
        bottom: 16%;
        left: 25%;
        right: 26%;
        z-index: -1;
        clip-path: polygon(60% 0, 100% 25%, 100% 100%, 0 100%, 0 0);
      }

      #image-wrapper > img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    `))],r([a({attribute:!1})],Bo.prototype,"source",void 0),r([a({attribute:!1})],Bo.prototype,"type",void 0),customElements.define("uui-image-file-symbol",Bo);const Ro=new WeakMap,Mo=(e=>(...t)=>{const i=e(...t);return oi.set(i,!0),i})((e=>t=>{if(!(t instanceof bi)||t instanceof yi||"style"!==t.committer.name||t.committer.parts.length>1)throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");const{committer:i}=t,{style:s}=i.element;let o=Ro.get(t);void 0===o&&(s.cssText=i.strings.join(" "),Ro.set(t,o=new Set)),o.forEach((t=>{t in e||(o.delete(t),-1===t.indexOf("-")?s[t]=null:s.removeProperty(t))}));for(const t in e)o.add(t),-1===t.indexOf("-")?s[t]=e[t]:s.setProperty(t,e[t])}));let Ho;const jo=Fi(Ho||(Ho=(e=>e)`@-webkit-keyframes uui-blink{0%{opacity:1}50%{opacity:.5}100%{opacity:1}}@keyframes uui-blink{0%{opacity:1}50%{opacity:.5}100%{opacity:1}}`)),Vo=Wi("uui-blink 0.9s infinite both");class qo extends t{}qo.CLICK="click";let Wo,Fo,Ko=e=>e;class Go extends Gi{constructor(){super(...arguments),this.position=0,this.vertical=!1}_onMouseMove(e){this.position=this.vertical?e.offsetY:e.offsetX}_handleClick(){console.log("button clicked"),this.dispatchEvent(new qo(qo.CLICK))}render(){return zi(Wo||(Wo=Ko` <button id="button-wrapper" @mousemove="${0}" @click="${0}"> <div id="plus" style="${0}"> <svg id="plus-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z"/> </svg> </div> </button> `),this._onMouseMove,this._handleClick,Mo({left:this.vertical?"":this.position+"px",top:this.vertical?this.position+"px":""}))}}var Yo;Go.styles=[jo,Fi(Fo||(Fo=Ko`:host{display:inline-block;width:100%;position:relative}:host([vertical]){height:100%}#button-wrapper{position:absolute;z-index:1;outline:0;height:12px;margin-top:-9px;padding-top:6px;margin-bottom:-6px;transition:opacity .24s;display:inline-flex;width:100%;border:none;text-decoration:none;background:0 0;color:currentColor;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;opacity:0}:host(:focus) #button-wrapper,:host(:focus-within) #button-wrapper,:host(:hover) #button-wrapper{opacity:1}:host([vertical]) #button-wrapper{height:100%;width:auto;margin-left:-12px;padding-left:6px;margin-right:-6px}#button-wrapper:before{content:'';position:absolute;top:5px;right:0;left:0;height:2px;background-color:var(--uui-interface-select,#2152a3);border-top:1px solid var(--uui-interface-surface,#fff);border-bottom:1px solid var(--uui-interface-surface,#fff);border-radius:2px;pointer-events:none;-webkit-animation:${0};animation:${0}}:host([vertical]) #button-wrapper:before{height:100%;width:2px;background:linear-gradient(180deg,rgba(33,82,163,0) 0,#2152a3 30%,#2152a3 70%,rgba(33,82,163,0) 100%)}#plus{position:absolute;top:9px;left:14px;display:flex;justify-content:center;align-items:center;pointer-events:none;box-sizing:border-box;width:28px;height:28px;margin-left:-24px;margin-top:-16px;border-radius:3em;font-size:14px;border:2px solid var(--uui-interface-selected,#2152a3);color:var(--uui-interface-selected,#2152a3);background-color:var(--uui-interface-surface,#fff);box-shadow:0 0 0 2px var(--uui-interface-surface,#fff);opacity:0;transform:scale(0);transition:transform 240ms ease-in,opacity 240ms}:host(:focus) #plus,:host(:focus-within) #plus,:host(:hover) #plus{opacity:1;transform:scale(1);transition:transform 240ms cubic-bezier(.175,.885,.32,1.275),opacity 80ms}:host([vertical]) #plus{left:12px}#button-wrapper:focus #plus{border:2px solid #6ab4f0}#plus-icon{width:50%;fill:currentColor}#button-wrapper:active #plus{transform:scale(1.1)}`),Vo,Vo)],r([Ri({attribute:!1,hasChanged:null==Yo?void 0:Yo.hasChanged})],Go.prototype,"position",void 0),r([Ri({type:Boolean,reflect:!0})],Go.prototype,"vertical",void 0),customElements.define("uui-inline-create-button",Go);let Jo,Xo,Zo=e=>e;class Qo extends ge{render(){return L(Jo||(Jo=Zo`
      <div></div>
      <div></div>
      <div></div>
    `))}}Qo.styles=[ie(Xo||(Xo=Zo`
      div {
        display: inline-block;
        width: var(--uui-size-base-unit);
        height: var(--uui-size-base-unit);
        border: 2px solid currentColor;
        border-radius: 100%;
        animation: loaderAnimation 1.4s infinite;
      }

      div:nth-child(1n) {
        animation-delay: 0s;
      }

      div:nth-child(2n) {
        animation-delay: 0.15s;
      }

      div:nth-child(3n) {
        animation-delay: 0.3s;
      }

      @keyframes loaderAnimation {
        0% {
          transform: scale(0.5);
          background-color: currentColor;
        }
        50% {
          transform: scale(1);
          background-color: transparent;
        }
        100% {
          transform: scale(0.5);
          background-color: currentColor;
        }
      }
    `))],customElements.define("uui-loader",Qo);let er,tr,ir,sr,or=e=>e;class rr extends Ot{constructor(){super(...arguments),this.name="",this.fileExt="",this.hasPreview=!1}queryPreviews(e){this.hasPreview=e.path[0].assignedElements({flatten:!0}).length>0}renderMedia(){if(!1===this.hasPreview){if(""===this.fileExt)return L(er||(er=or`<uui-folder-symbol id="folder-symbol"></uui-folder-symbol>`));if(""!==this.fileExt)return L(tr||(tr=or`<uui-file-symbol
          id="file-symbol"
          type="txt"
        ></uui-file-symbol>`))}}render(){return L(ir||(ir=or` ${0}
      <slot @slotchange=${0}></slot>
      <button
        id="open-part"
        tabindex="0"
        @click=${0}
        @keydown=${0}
      >
        <uui-icon
          id="info-icon"
          name="info"
          style="color: currentColor"
        ></uui-icon
        ><span> ${0} </span>
      </button>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>`),this.renderMedia(),this.queryPreviews,this.handleOpenClick,this.handleOpenKeydown,this.name)}}rr.styles=[...Ot.styles,ie(sr||(sr=or`
      #file-symbol,
      #folder-symbol {
        align-self: center;
        margin: var(--uui-size-xlarge);
        width: 80%;
      }

      /* TODO: slot for tag */

      slot:not([name])::slotted(*) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      #open-part {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        border: none;
        cursor: pointer;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-family: inherit;
        font-size: var(--uui-size-small, 12px);
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
      }

      #open-part:hover,
      #open-part:focus {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 0.5s 0.5s;
        opacity: 0;
      }

      :host([image]:not([image='']):hover, [image]:not([image='']):focus, [image]:not([image='']):focus-within, [selected][image]:not([image='']), [error][image]:not([image='']))
        #open-part {
        opacity: 1;
        transition-duration: 120ms;
        transition-delay: 0s;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }
    `))],r([a({type:String})],rr.prototype,"name",void 0),r([a({type:String,attribute:"file-ext"})],rr.prototype,"fileExt",void 0),r([l()],rr.prototype,"hasPreview",void 0),customElements.define("uui-media-card",rr);class nr extends t{}nr.SHOW_CHILDREN="show-children",nr.HIDE_CHILDREN="hide-children",nr.CLICK_LABEL="click-label";let ar,lr,cr,ur,dr=e=>e;class hr extends(ke(p(we("label",ge)))){constructor(){super(...arguments),this.disabled=!1,this.showChildren=!1,this.hasChildren=!1}onCaretClicked(){this.showChildren=!this.showChildren;const e=this.showChildren?nr.SHOW_CHILDREN:nr.HIDE_CHILDREN,t=new nr(e);this.dispatchEvent(t)}onLabelClicked(){const e=new nr(nr.CLICK_LABEL);this.dispatchEvent(e)}render(){return L(ar||(ar=dr`
      <div id="menu-item">
        ${0}
        <button
          id="label-button"
          @click=${0}
          ?disabled=${0}
          aria-label="${0}"
        >
          ${0}
        </button>
        <div id="label-button-background"></div>
        <slot id="actions-container" name="actions"></slot>
      </div>
      ${0}
    `),this.hasChildren?L(lr||(lr=dr`<button id="caret-button" @click=${0}>
              <uui-caret ?open=${0}></uui-caret>
            </button>`),this.onCaretClicked,this.showChildren):"",this.onLabelClicked,this.disabled,this.label,this.renderLabel(),this.showChildren?L(cr||(cr=dr`<slot></slot>`)):"")}}hr.styles=[ie(ur||(ur=dr`
      :host {
        display: block;
        background-color: var(--uui-interface-surface);
        /** consider transparent. */
        --uui-menu-item-child-indent: calc(var(--uui-menu-item-indent, 0) + 1);
      }

      #menu-item {
        position: relative;
        display: flex;
        align-items: stretch;
        padding-left: calc(
          var(--uui-menu-item-indent, 0) * var(--uui-size-layout-0, 24px)
        );
      }

      button {
        display: block;
        padding: 0;
        text-align: left;
        box-shadow: none;
        border: none;
        color: inherit;
        background-color: transparent;
        cursor: pointer;
        z-index: 1;
        padding: 0 var(--uui-size-base-unit) 0 var(--uui-size-base-unit);
        min-height: calc(var(--uui-size-base-unit) * 6);
      }
      button:hover {
        color: var(--uui-interface-contrast-hover);
      }

      #label-button {
        flex-grow: 1;
      }
      #caret-button + #label-button {
        padding-left: 0;
      }
      #label-button-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
      #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-hover);
      }

      :host([disabled]) #label-button {
        color: var(--uui-interface-surface-contrast-disabled);
      }
      :host([disabled]) #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-surface-disabled);
      }

      :host([active]) button {
        color: var(--uui-interface-active-contrast);
      }
      :host([active]) button:hover {
        color: var(--uui-interface-active-contrast-hover);
      }
      :host([active]) #label-button-background {
        background-color: var(--uui-interface-active);
      }
      :host([active]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-active-hover);
      }
      :host([active][disabled]) #label-button {
        color: var(--uui-interface-active-contrast-disabled);
        background-color: var(--uui-interface-active-disabled);
      }

      :host([selected]) button {
        color: var(--uui-interface-select-contrast);
      }
      :host([selected]) button:hover {
        color: var(--uui-interface-select-contrast-hover);
      }
      :host([selected]) #label-button-background {
        background-color: var(--uui-interface-select);
      }
      :host([selected]) #label-button:hover + #label-button-background {
        background-color: var(--uui-interface-select-hover);
      }
      :host([selected][disabled]) #label-button {
        color: var(--uui-interface-select-contrast-disabled);
        background-color: var(--uui-interface-select-disabled);
      }
      /*
      slot:not([name]):focus-within {
        TODO: implement proper focus outline
      }
      */

      slot:not([name]) {
        position: relative;
        display: block;
        width: 100%;
      }
      slot:not([name]) {
        --uui-menu-item-indent: var(--uui-menu-item-child-indent);
      }

      slot[name='actions'] {
        display: flex;
        align-items: center;
        --uui-button-height: calc(var(--uui-size-base-unit) * 4);
        margin-right: var(--uui-size-base-unit);
      }
      #actions-container {
        opacity: 0;
        transition: opacity 120ms;
      }
      #menu-item:hover #actions-container {
        opacity: 1;
      }
    `))],r([a({type:Boolean,reflect:!0})],hr.prototype,"disabled",void 0),r([a({type:Boolean,reflect:!0,attribute:"show-children"})],hr.prototype,"showChildren",void 0),r([a({type:Boolean,attribute:"has-children"})],hr.prototype,"hasChildren",void 0),customElements.define("uui-menu-item",hr);let pr,fr,br=e=>e;class vr extends Gi{constructor(){super(),this.listElements=[],this.nonInteractive=!1,this.addEventListener("click",this._handleSelect)}getListElements(){return this.slotElement?this.slotElement.assignedElements({flatten:!0}).filter((e=>e instanceof hr)):[]}_handleSlotChange(){this.listElements=this.getListElements(),console.log(this.listElements)}_handleSelect(e){if(this.nonInteractive)return;let t;this.listElements.forEach((i=>{i===e.target&&(t=i)}));this.listElements.filter((e=>e!==t)).forEach((e=>{e.active=!1}))}render(){return zi(pr||(pr=br` <slot @slotchange="${0}"></slot> `),this._handleSlotChange)}}var mr,gr;vr.styles=[Fi(fr||(fr=br`:host{display:block;font-family:inherit}:host([non-interactive]) ::slotted(*){pointer-events:none}`))],r([(mr="slot",(e,t)=>{const i={get(){return this.renderRoot.querySelector(mr)},enumerable:!0,configurable:!0};if(gr){const e="symbol"==typeof t?Symbol():`__${t}`;i.get=function(){return void 0===this[e]&&(this[e]=this.renderRoot.querySelector(mr)),this[e]}}return void 0!==t?Mi(i,e,t):Hi(i,e)})],vr.prototype,"slotElement",void 0),r([Ri({type:Boolean,reflect:!0,attribute:"non-interactive"})],vr.prototype,"nonInteractive",void 0),customElements.define("uui-menu-list",vr);let yr,xr,wr=e=>e;class kr extends ge{constructor(){super(...arguments),this.type=""}render(){return L(yr||(yr=wr`•••`))}}kr.styles=[ie(xr||(xr=wr`
      :host {
        display: inline-block;
        font-size: 0.8em;
        vertical-align: top;
        margin-top: 0.27em;
        line-height: 1em;
      }
      :host[size='small'] {
        font-size: 9px;
      }
    `))],r([a({type:String})],kr.prototype,"type",void 0),customElements.define("uui-more-symbol",kr);let _r,Er,Sr=e=>e;class Cr extends ge{render(){return L(_r||(_r=Sr`<slot></slot>`))}}Cr.styles=[ie(Er||(Er=Sr`
      :host {
        --uui-overflow-container-height: 180px;
      }

      :host {
        display: block;
        scrollbar-width: thin;
        scrollbar-color: var(--uui-interface-contrast-disabled)
          var(--uui-interface-background-alt);
        overflow-y: scroll;
        max-height: var(--uui-overflow-container-height);
      }

      :host::-webkit-scrollbar {
        width: 5px;
      }

      :host::-webkit-scrollbar-track {
        background: var(--uui-interface-background-alt);
        border-radius: 12px;
      }
      :host::-webkit-scrollbar-thumb {
        background-color: var(--uui-interface-contrast-disabled);
        border-radius: 12px;
      }
    `))],customElements.define("uui-overflow-container",Cr);let zr,$r,Or=e=>e;class Ar extends Ot{constructor(){super(...arguments),this.name=""}render(){return L(zr||(zr=Or`TO BE DONE`))}}Ar.styles=[...Ot.styles,ie($r||($r=Or`
      :host {
        min-width: 250px;
      }
      /*

      :host([type='node']),


      slot[name='asset']::slotted(img) {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      :host([type='user'], [type='node'])
        ::slotted(:not(uui-avatar, uui-tag, uui-badge)) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      :host([type='user']) ::slotted(*) {
        text-align: center;
      }

      slot[name='asset']::slotted(uui-icon) {
        align-self: center;
        font-size: var(--uui-size-xlarge);
        // change this color to something more suitable
        color: var(--uui-interface-contrast-disabled);
        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='asset']::slotted(uui-file-icon) {
        align-self: center;
        margin: var(--uui-size-xlarge);
        width: 80%;

        transform: translateY(
          calc(
            -1 * var(--uui-size-medium, 24px) + var(--uui-size-base-unit, 6px) *
              2
          )
        );
      }

      slot[name='tag']::slotted(uui-tag) {
        position: absolute;
        top: 6px;
        right: 6px;
      }

      slot[name='avatar']::slotted(uui-avatar) {
        margin-bottom: 12px;
      }

      #card-content {
        width: 100%;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: space-between;
      }

      :host([type='node']) #card-content,
      :host([type='user']) #card-content {
        padding: var(--uui-size-space-3, 12px);
      }

      :host([type='user']) #card-content {
        align-items: center;
      }

      #title-area {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
      }

      slot[name='icon']::slotted(uui-icon) {
        font-size: 1.2em;
      }

      :host([type='user']) #title-area {
        margin: 0 0 3px 0;
      }

      #title-area > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #title-area:hover,
      #title-area:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }

      #details {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        opacity: 0;
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--uui-size-small, 12px);
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
        transition: opacity 120ms;
      }

      :host([type='file']) #details {
        opacity: 0.9;
        border-top: 1px solid rgba(0, 0, 0, 0.04);
      }

      :host(:hover) #details,
      :host(:focus, :focus-within) #details {
        opacity: 0.9;
      }

      :host([selected]) #details {
        opacity: 0.9;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }

      #details:hover,
      #details:focus {
        text-decoration: underline;
        outline-color: #6ab4f0;
      }
      */
    `))],r([a({type:String})],Ar.prototype,"name",void 0),customElements.define("uui-package-card",Ar);class Pr extends t{}Pr.CHANGE="change";let Nr,Tr,Ir,Lr,Dr=e=>e;class Ur extends ge{constructor(){super(...arguments),this.name="",this.value="",this.label="",this.checked=!1,this._disabled=!1}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=e,e&&(this.setAttribute("aria-hidden","true"),this.setAttribute("tabindex","-1")),this.requestUpdate("disabled",t)}_onChange(){this.inputElement.checked?this.check():this.uncheck()}uncheck(){this.checked=!1,this.setAttribute("tabindex","-1"),this.setAttribute("aria-checked","false")}check(){this.checked=!0,this.dispatchEvent(new Pr(Pr.CHANGE)),this.disabled||(this.setAttribute("tabindex","0"),this.setAttribute("aria-checked","true"),this.focus())}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","radio"),this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),this.hasAttribute("aria-checked")||this.setAttribute("aria-checked","false")}render(){return L(Nr||(Nr=Dr` <label id="radio-label">
      <input
        id="input"
        aria-labelledby="radio-label"
        type="radio"
        name=${0}
        value=${0}
        .checked=${0}
        .disabled=${0}
        @change=${0}
      />
      <div id="button"></div>
      <div id="label">
        ${0}
      </div>
    </label>`),this.name,this.value,this.checked,this.disabled,this._onChange,this.label?L(Tr||(Tr=Dr`<span>${0}</span>`),this.label):L(Ir||(Ir=Dr`<slot></slot>`)))}}Ur.styles=[Xe,ie(Lr||(Lr=Dr`
      :host {
        display: block;
        box-sizing: border-box;
        font-family: inherit;
        color: currentColor;
        --uui-radio-button-size: calc(var(--uui-size-base-unit) * 3);
        margin: var(--uui-size-base-unit) 0;
      }

      label {
        display: block;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 18px;
      }

      #input {
        width: 0;
        height: 0;
        opacity: 0;
        margin: 0;
      }

      #label {
        margin-top: 2px;
      }

      #button {
        box-sizing: border-box;
        display: inline-block;
        width: var(--uui-radio-button-size, 18px);
        height: var(--uui-radio-button-size, 18px);
        background-color: var(--uui-interface-surface, white);
        border: 1px solid var(--uui-interface-border, #d8d7d9);
        border-radius: 100%;
        margin-right: calc(var(--uui-size-base-unit) * 2);
        position: relative;
      }

      #button::after {
        content: '';
        width: calc(var(--uui-radio-button-size) / 2);
        height: calc(var(--uui-radio-button-size) / 2);
        background-color: var(--uui-interface-chosen, #1b264f);
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        transition: all 0.15s ease-in-out;
      }

      input:checked ~ #button::after {
        transform: translate(-50%, -50%) scale(1);
      }

      :host(:hover) #button {
        border: 1px solid var(--uui-interface-border-hover, #c4c4c4);
      }

      input:checked ~ #button {
        border: 1px solid var(--uui-interface-chosen, #1b264f);
      }

      input:checked:hover ~ #button {
        border: 1px solid var(--uui-interface-chosen-hover, #2152a3);
      }

      input:checked:hover ~ #button::after {
        background-color: var(--uui-interface-chosen-hover, #2152a3);
      }

      :host([disabled]) label {
        cursor: default;
      }
      :host([disabled]) #label {
        color: var(--uui-interface-contrast-disabled);
      }

      :host([disabled]) input ~ #button {
        border: 1px solid var(--uui-interface-border-disabled);
      }

      :host([disabled]) input:checked ~ #button {
        border: 1px solid var(--uui-interface-chosen-disabled);
      }

      :host([disabled]) input:checked ~ #button::after {
        background-color: var(--uui-interface-chosen-disabled);
      }

      :host([disabled]:active) #button {
        animation: ${0};
      }

      @media (prefers-reduced-motion) {
        :host([disabled]:active) #button {
          animation: none;
        }

        #button::after {
          transition: none;
        }
      }
    `),Ze)],r([u("#input")],Ur.prototype,"inputElement",void 0),r([a({type:String})],Ur.prototype,"name",void 0),r([a({type:String})],Ur.prototype,"value",void 0),r([a({type:String})],Ur.prototype,"label",void 0),r([a({type:Boolean,reflect:!0})],Ur.prototype,"checked",void 0),r([a({type:Boolean,reflect:!0})],Ur.prototype,"disabled",null),customElements.define("uui-radio",Ur);class Br extends t{}Br.CHANGE="change";let Rr,Mr=e=>e;class Hr extends ge{constructor(){super(),this._disabled=!1,this._value="",this._name="",this._selected=null,this._lastSelectedIndex=0,this._handleSelectOnClick=e=>{this._setSelected(this.radioElements.indexOf(e.target)),this._fireChangeEvent()},this._internals=this.attachInternals(),this.addEventListener("keydown",this._onKeydown)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","radiogroup")}getRadioElements(){return this.slotElement?this.slotElement.assignedElements({flatten:!0}).filter((e=>e instanceof Ur)):[]}_addNameToRadios(e,t){t.forEach((t=>t.name=e))}_toggleDisableOnChildren(e){this.radioElements.forEach((t=>t.disabled=e))}_handleSlotChange(){this.radioElements&&this.radioElements.forEach((e=>{e.removeEventListener(Pr.CHANGE,this._handleSelectOnClick)})),this.radioElements=this.getRadioElements(),console.log("update",this.radioElements),this.radioElements.forEach((e=>{e.addEventListener(Pr.CHANGE,this._handleSelectOnClick)}));const e=this.radioElements.filter((e=>!0===e.checked));if(e.length>1)throw this.radioElements.forEach((e=>{e.checked=!1})),new Error("There can only be one checked element among the <uui-radio-group> children");1===e.length&&(this._selected=this.radioElements.indexOf(e[0]),this.value=e[0].value),this.radioElements.length>0&&this.radioElements[this.enabledElementsIndexes[0]].setAttribute("tabindex","0"),this._addNameToRadios(this.name,this.radioElements),this.disabled&&this._toggleDisableOnChildren(!0)}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=e,this.requestUpdate("disabled",t),this._toggleDisableOnChildren(e)}get value(){return this._value}set value(e){const t=this._value;this._value=e,this._internals.setFormValue(this._value),this.requestUpdate("value",t)}get name(){return this._name}set name(e){const t=this._name;this._name=e,this.radioElements&&this._addNameToRadios(this._name,this.radioElements),this.requestUpdate("name",t)}get selected(){return this._selected}set selected(e){const t=this._selected;this._setSelected(e),null!==this._selected&&this.radioElements[this._selected].check(),this.requestUpdate("selected",t)}_setSelected(e){this._selected=e,this._lastSelectedIndex=this.enabledElementsIndexes.findIndex((e=>e===this._selected)),null===e&&this.radioElements[0].setAttribute("tabindex","0");this.radioElements.filter((e=>this.radioElements.indexOf(e)!==this._selected)).forEach((e=>e.uncheck())),this.value=null!==e?this.radioElements[e].value:""}get enabledElementsIndexes(){const e=[];return this.radioElements.forEach((t=>{!1===t.disabled&&e.push(this.radioElements.indexOf(t))})),e}_selectPreviousElement(){null===this.selected||this.selected===this.enabledElementsIndexes[0]?(this.selected=this.enabledElementsIndexes[this.enabledElementsIndexes.length-1],this._lastSelectedIndex=this.enabledElementsIndexes.length-1):(this._lastSelectedIndex--,this.selected=this.enabledElementsIndexes[this._lastSelectedIndex]),this._fireChangeEvent()}_selectNextElement(){null===this.selected||this.selected===this.enabledElementsIndexes[this.enabledElementsIndexes.length-1]?(this.selected=this.enabledElementsIndexes[0],this._lastSelectedIndex=0):(this._lastSelectedIndex++,this.selected=this.enabledElementsIndexes[this._lastSelectedIndex]),this._fireChangeEvent()}_onKeydown(e){switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),this._selectPreviousElement();break;case"ArrowRight":case"ArrowDown":e.preventDefault(),this._selectNextElement();break;case" ":null===this.selected&&(this.selected=this.enabledElementsIndexes[0])}}_fireChangeEvent(){this.dispatchEvent(new Br(Br.CHANGE))}render(){return L(Rr||(Rr=Mr` <slot @slotchange=${0}> </slot> `),this._handleSlotChange)}}Hr.formAssociated=!0,r([u("slot")],Hr.prototype,"slotElement",void 0),r([a({type:Boolean,reflect:!0})],Hr.prototype,"disabled",null),r([l()],Hr.prototype,"value",null),r([a({type:String})],Hr.prototype,"name",null),r([a({type:Number})],Hr.prototype,"selected",null),customElements.define("uui-radio-group",Hr);class jr extends t{}jr.CHANGE="change";let Vr,qr,Wr=e=>e;class Fr extends ge{constructor(){super(),this.id="uui-select-"+Fr.UniqueIdCounter++,this.value="",this._disabled=!1,this.selected=!1,this.focused=!1,this.addEventListener("click",this.handleClick)}get disabled(){return this._disabled}set disabled(e){const t=this._disabled;this._disabled=e,e&&this.setAttribute("aria-hidden","true"),this.requestUpdate("disabled",t)}firstUpdated(){this._slot[0].textContent&&(this.value=this._slot[0].textContent)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","option"),this.hasAttribute("aria-selected")||this.setAttribute("aria-selected","false")}updated(){this.focused&&this.listItem.focus()}handleClick(e){e.stopPropagation(),this.select()}select(){this.selected=!0,this.disabled||(this.setAttribute("aria-selected","true"),this.focus()),this.dispatchEvent(new jr(jr.CHANGE))}deselect(){this.selected=!1,this.setAttribute("aria-selected","false")}render(){return L(Vr||(Vr=Wr`
      <div id="list-item">
        <slot name="left"></slot>
        <span><slot></slot></span>
      </div>
      <slot name="right"></slot>
    `))}}Fr.styles=[ie(qr||(qr=Wr`
      :host {
        display: block;
        color: var(--uui-interface-contrast);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1rem;
        font-family: inherit;
        cursor: pointer;
        padding: 0.5em;
        background-color: var(--uui-interface-surface);
      }

      :host(:hover) {
        background-color: var(--uui-interface-surface-hover);
      }

      :host([selected]) {
        background-color: var(--uui-interface-select);
        color: var(--uui-interface-select-contrast);
      }

      #list-item {
        display: flex;
        align-items: center;
      }
    `))],Fr.UniqueIdCounter=1,r([a({reflect:!0})],Fr.prototype,"id",void 0),r([function(e="",t=!1,i=""){return c({descriptor:s=>({get(){var s,o;const r="slot"+(e?`[name=${e}]`:":not([name])");let n=null===(o=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(r))||void 0===o?void 0:o.assignedNodes({flatten:t});return n&&i&&(n=n.filter((e=>e.nodeType===Node.ELEMENT_NODE&&(e.matches?e.matches(i):h.call(e,i))))),n},enumerable:!0,configurable:!0})})}("",!0)],Fr.prototype,"_slot",void 0),r([a({type:String})],Fr.prototype,"value",void 0),r([a({type:Boolean,reflect:!0})],Fr.prototype,"disabled",null),r([a({type:Boolean,reflect:!0})],Fr.prototype,"selected",void 0),r([a({type:Boolean,reflect:!0})],Fr.prototype,"focused",void 0),r([u("#list-item")],Fr.prototype,"listItem",void 0);class Kr extends t{}Kr.CHANGE="change",Kr.SPACE="space";class Gr extends ge{constructor(){super(...arguments),this._value="",this._selected=null,this.selectedID="",this._lastSelectedIndex=0}getlistElements(){return this.slotElement?this.slotElement.assignedElements({flatten:!0}).filter((e=>e instanceof Fr)):[]}onSlotChange(){this.slottedChildren=this.getlistElements(),this.slottedChildren.forEach((e=>{this.overflow.appendChild(e)}));const e=Array.from(this.overflow.childNodes);this.listElements=e.filter((e=>e instanceof Fr))}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t)}get selected(){return this._selected}set selected(e){const t=this._selected;this._selected=e,this._setSelected(e),this.requestUpdate("selected",t)}_setSelected(e){this._selected=e,this._lastSelectedIndex=this.enabledElementsIndexes.findIndex((e=>e===this._selected));this.listElements.filter((e=>this.listElements.indexOf(e)!==this._selected)).forEach((e=>e.deselect())),this.value=null!==e?this.listElements[e].value:"",this.selectedID=null!==e?this.listElements[e].id:""}_handleSelectOnClick(e){e.stopPropagation(),this._setSelected(this.listElements.indexOf(e.target)),this._fireChangeEvent()}_fireChangeEvent(){this.dispatchEvent(new Kr(Kr.CHANGE))}get enabledElementsIndexes(){const e=[];return this.listElements.forEach((t=>{!1===t.disabled&&e.push(this.listElements.indexOf(t))})),e}_selectPreviousElement(){null===this.selected||this.selected===this.enabledElementsIndexes[0]?(this.selected=this.enabledElementsIndexes[this.enabledElementsIndexes.length-1],this._lastSelectedIndex=this.enabledElementsIndexes.length-1,null!==this.selected&&this.listElements[this.selected].select()):(this._lastSelectedIndex--,this.selected=this.enabledElementsIndexes[this._lastSelectedIndex],this.listElements[this.selected].select()),this.listElements[this.selected].scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"}),this._fireChangeEvent()}_selectNextElement(){null===this.selected||this.selected===this.enabledElementsIndexes[this.enabledElementsIndexes.length-1]?(this.selected=this.enabledElementsIndexes[0],this._lastSelectedIndex=0,null!==this.selected&&this.listElements[this.selected].select()):(this._lastSelectedIndex++,this.selected=this.enabledElementsIndexes[this._lastSelectedIndex],this.listElements[this.selected].select()),this.listElements[this.selected].scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"}),this._fireChangeEvent()}}r([u("slot")],Gr.prototype,"slotElement",void 0),r([u("uui-overflow-container")],Gr.prototype,"overflow",void 0),r([a()],Gr.prototype,"value",null),r([a({type:Number})],Gr.prototype,"selected",null),r([l()],Gr.prototype,"selectedID",void 0);const Yr="ArrowUp",Jr="ArrowDown",Xr=" ",Zr="Enter",Qr="Escape",en="Tab",tn="Home",sn="End";let on,rn,nn,an,ln,cn,un=e=>e;class dn extends Gr{constructor(){super(),this._isOpen=!1,this.autocomplete=!1,this.label="",this.title="",this.placeholder="",this.addEventListener("keydown",this._onKeydown)}get isOpen(){return this._isOpen}set isOpen(e){const t=this._isOpen;this._isOpen=e,this.overflow&&this.dropdown&&(e?this.overflow.focus():this.dropdown.focus()),this.requestUpdate("isOpen",t)}_onKeydown(e){switch(e.key){case Yr:e.preventDefault(),this.isOpen||(this.isOpen=!0),this._selectPreviousElement();break;case Jr:e.preventDefault(),this.isOpen||(this.isOpen=!0),this._selectNextElement();break;case Xr:case Zr:e.preventDefault(),this.isOpen=!this.isOpen;break;case Qr:e.preventDefault(),this.isOpen&&(this.isOpen=!1);break;case en:this.isOpen&&(this.isOpen=!1);break;case tn:this.isOpen&&(this.selected=this.enabledElementsIndexes[0],this.listElements[this.selected].select());break;case sn:this.isOpen&&(this.selected=this.enabledElementsIndexes[this.enabledElementsIndexes.length-1],this.listElements[this.selected].select())}}render(){return L(on||(on=un`
      <uui-dropdown
        ?open=${0}
        @close="${0}"
        @open="${0}"
        same-widht
        position="bottom"
        .title="${0}"
        tabindex="0"
        role="combobox"
        aria-haspopup="true"
        aria-controls="list"
        aria-autocomplete="none"
        aria-expanded="${0}"
      >
        ${0}

        <uui-overflow-container
          role="listbox"
          id="list"
          tabindex="${0}"
          .title="${0}"
          aria-label="${0}"
          aria-activedescendant="${0}"
          @change=${0}
        >
          <slot @slotchange=${0}></slot>
        </uui-overflow-container>
      </uui-dropdown>
    `),this.isOpen,(()=>this.isOpen=!1),(()=>this.isOpen=!0),this.title,this.isOpen,this.autocomplete?L(rn||(rn=un`<input
                type="text"
                slot="input"
                .value=${0}
                aria-label="${0}"
              /><uui-carret slot="toggle" ?open=${0}></uui-carret>`),this.value,this.label,this.isOpen):L(nn||(nn=un`
              <div
                id="combo"
                type="text"
                aria-label="${0}"
                slot="toggle"
                .title="${0}"
              >
                ${0}
              </div>
              <uui-carret slot="toggle" ?open=${0}></uui-carret>
            `),this.label,this.title,this.value?L(an||(an=un`<span>${0}</span>`),this.value):L(ln||(ln=un`<span id="placeholder">${0}</span>`),this.placeholder),this.isOpen),this.isOpen?"0":"-1",this.title,this.label,this.selectedID,this._handleSelectOnClick,this.onSlotChange)}}dn.styles=[ie(cn||(cn=un`
      :host {
        font-family: inherit;
        --uui-select-widht: 200px;
        width: var(--uui-select-widht);
        display: inline-block;
        border: 1px solid var(--uui-interface-border);
        border-radius: var(--uui-size-border-radius);
      }

      :host(:focus-within) {
        box-shadow: 0 0 2px 1px var(--uui-interface-border-focus);
      }

      uui-dropdown {
        display: flex;
        width: 100%;
        height: 100%;
      }

      uui-dropdown:focus {
        outline: none;
      }

      uui-overflow-container {
        min-width: var(--uui-select-widht);
        outline: none;
      }

      uui-carret {
        display: inline-block;
        padding: var(--uui-size-base-unit);
        padding-right: 1em;
      }

      #selected-value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: inherit;
        font-size: 1rem;
        padding-left: 1em;
      }

      input,
      #combo {
        display: flex;
        align-items: center;
        border: none;
        width: 100%;
        height: calc(var(--uui-size-base-unit) * 6);
        /* padding: 0.5em; */
        box-sizing: border-box;
        font-family: inherit;
        background-color: var(--uui-interface-surface);
        font-size: 1rem;
        padding-left: 1em;
        outline: none;
        cursor: default;
      }

      #placeholder {
        font-style: italic;
        color: var(--uui-interface-contrast-disabled);
      }
    `))],dn.formAssociated=!0,r([u("uui-dropdown")],dn.prototype,"dropdown",void 0),r([a({type:Boolean,reflect:!0,attribute:"open"})],dn.prototype,"isOpen",null),r([a({type:Boolean})],dn.prototype,"autocomplete",void 0),r([a({type:String})],dn.prototype,"label",void 0),r([a({type:String})],dn.prototype,"title",void 0),r([a()],dn.prototype,"placeholder",void 0),customElements.define("uui-select",dn),customElements.define("uui-select-option",Fr);const hn=1;const pn=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends class{constructor(e){}T(e,t,i){this.Σdt=e,this.M=t,this.Σct=i}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){var t;if(super(e),e.type!==hn||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,i)=>{const s=e[i];return null==s?t:t+`${i=i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.St){this.St=new Set;for(const e in t)this.St.add(e);return this.render(t)}this.St.forEach((e=>{null==t[e]&&(this.St.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")}));for(const e in t){const s=t[e];null!=s&&(this.St.add(e),e.includes("-")?i.setProperty(e,s):i[e]=s)}return U}});let fn;const bn=ie(fn||(fn=(e=>e)`
  input[type='range'] {
    left: 0;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2;

    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
    border: none;
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: none;
    background: transparent;
    color: transparent;
    overflow: visible;
    order: none;
  }

  input[type='range']:focus::-webkit-slider-runnable-track {
    background: transparent;
    border: none;
  }

  input[type='range']::-moz-range-track {
    width: 100%;
    height: 100%;
    -moz-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
  }

  input[type='range']::-ms-track {
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    margin: 0px;
    padding: 0px;
    border: 0 none;
    background: transparent;
    color: transparent;
    overflow: visible;
  }
  input[type='range']::-ms-fill-lower,
  input[type='range']::-ms-fill-upper {
    background: transparent;
    border: 0 none;
  }

  input[type='range']::-ms-tooltip {
    display: none;
  }

  input[type='range']::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
  }

  input[type='range']::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
  }

  input[type='range']::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 12px;
    border: 0 none;
    background: transparent;
    cursor: pointer;
  }

  input[type='range']:focus::-ms-fill-lower {
    background: transparent;
  }
  input[type='range']:focus::-ms-fill-upper {
    background: transparent;
  }
`));let vn;const mn=ie(vn||(vn=(e=>e)`
  @-webkit-keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(0.2);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.9;
    }
    80% {
      -webkit-transform: translate(-50%, -50%) scale(1.2);
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, -50%) scale(2.2);
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
  @keyframes pulse {
    0% {
      -webkit-transform: translate(-50%, -50%) scale(0.2);
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0.9;
    }
    80% {
      -webkit-transform: translate(-50%, -50%) scale(1.2);
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
    }
    100% {
      -webkit-transform: translate(-50%, -50%) scale(2.2);
      transform: translate(-50%, -50%) scale(2.2);
      opacity: 0;
    }
  }
`)),gn=ee("pulse 0.8s ease-in-out infinite both");class yn extends t{}yn.INPUT="input";let xn,wn,kn,_n,En,Sn,Cn=e=>e;class zn extends ge{constructor(){super(),this.label="",this.showStepValues=!0,this.min=0,this.max=100,this.step="any",this._value="",this.stepWidht=0,this.onWindowResize=()=>{this.stepWidht=this.calculateStepWidth()},this.steps=[],this.sliderPosition="50%",this.fillScale="0.5",this.range=(e,t,i)=>Array.from({length:(t-e)/i+1},((t,s)=>e+s*i)),this._internals=this.attachInternals()}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.calculateSliderPosition(e),this._internals.setFormValue(this._value),this.requestUpdate("value",t)}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onWindowResize)}disconnectedCallback(){window.removeEventListener("resize",this.onWindowResize),super.disconnectedCallback()}firstUpdated(){this.steps=this.range(this.min,this.max-1,parseFloat(this.step)),this.stepWidht=this.calculateStepWidth()}calculateStepWidth(){return this.track.getBoundingClientRect().width/this.steps.length}calculateSliderPosition(e){const t=(parseFloat(e)-this.min)/(this.max-this.min);this.fillScale=`${t}`,this.sliderPosition=`${Math.floor(100*t)}%`}thumbDynamicStyles(){return{left:this.sliderPosition}}onInput(){this.value=this.input.value,this.dispatchEvent(new yn(yn.INPUT))}render(){return L(En||(En=Cn` <input
        type="range"
        min="${0}"
        max="${0}"
        .value="${0}"
        id="input1"
        aria-label="${0}"
        step="${0}"
        @input=${0}
      />
      <div id="track" aria-hidden="true">
        <div id="stepper">
          <svg height="100%" width="100%" class="uui-slider-step">
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="black"
              id="slider-line"
            />
            ${0}
          </svg>
        </div>

        <div id="thumb" style=${0}>
          <div id="value">${0}</div>
        </div>
      </div>
      ${0}
      <label for="input1"><slot></slot></label>`),this.min,this.max,this.value,this.label,+this.step,this.onInput,"any"!==this.step?(e=this.steps,t=this.stepWidht,D(xn||(xn=Cn`
  ${0}
`),e.map((i=>{if(t/6>=5)return D(wn||(wn=Cn`<circle class="uui-slider-circle" cx="${0}" cy="50%" r="4.2" />`),t*e.indexOf(i))})))):B,pn(this.thumbDynamicStyles()),this.value,"any"!==this.step?((e,t,i)=>{if(i)return L(kn||(kn=Cn`<div id="steps-values">
      ${0}
    </div>`),e.map((i=>L(_n||(_n=Cn` <span class="uui-slider-step">
            ${0}
          </span>`),e.length<=20&&t/6>=5?i.toFixed(0):B))))})(this.steps,this.stepWidht,this.showStepValues):B);var e,t}}zn.styles=[mn,bn,ie(Sn||(Sn=Cn`
      input[type='range'] {
        box-sizing: border-box;
      }

      :host {
        display: inline-block;
        width: 100%;
        position: relative;
        margin: 12px 0;
        min-height: 30px;
        border: none;
        user-select: none;
      }

      #track {
        position: relative;
        top: 50%;
        height: 18px;
        width: 100%;
        display: flex;
      }
      /*
      #fill {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        transform-origin: center left;
        background-color: blue;
        border-radius: 3px;
        opacity: 0.3;
      } */

      #thumb {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        border: 1px solid var(--uui-interface-select);
        margin-left: -9px;
        transition: 0.1s left ease;
      }

      #thumb:after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 9px;
        width: 9px;
        background-color: var(--uui-interface-select);
        border-radius: 50%;
      }

      #thumb:before {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform-origin: center center;
        transform: translate(-50%, -50%);
        height: 24px;
        width: 24px;
        background-color: transparent;
        border: 1px solid var(--uui-interface-select);
        border-radius: 50%;
        opacity: 0;
      }

      input:hover ~ #track #thumb:before {
        animation: ${0};
      }

      input:hover ~ #track #thumb:after {
        background-color: var(--uui-interface-select-hover);
      }

      input:hover ~ #track #thumb {
        border: 1px solid var(--uui-interface-select-hover);
      }

      #value {
        position: relative;
        box-sizing: border-box;
        font-weight: 600;
        bottom: 150%;
        width: 100%;
        text-align: center;
        opacity: 0;
        color: var(--uui-interface-select);
        transition: 0.2s opacity ease;
      }

      input:hover ~ #track #value {
        opacity: 1;
      }

      #track svg {
        opacity: 0.5;
        transition: 0.2s opacity ease;
      }

      input:focus ~ #track svg {
        opacity: 1;
      }

      #stepper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      }

      #steps-values {
        display: flex;
        align-items: flex-end;
        box-sizing: border-box;
      }

      #steps-values > span {
        flex-basis: 0;
        flex-grow: 1;
        transform: translateX(-50%);
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: var(--uui-interface-contrast-disabled);
      }

      #steps-values :first-child {
        opacity: 0;
      }

      svg > circle:first-of-type {
        fill: none;
      }

      #stepper {
        width: 100%;
      }

      #slider-line {
        stroke: var(--uui-interface-contrast-disabled);
        stroke-width: 1px;
      }

      .uui-slider-circle {
        fill: var(--uui-interface-contrast-disabled);
      }

      label {
        display: inline-block;
        margin-top: 6px;
        position: relative;

        font-weight: 2100;
      }

      /* label:before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2px;
        transform-origin: top center;
        transform: scaleY(0);
        border-radius: 6px;
        background-color: var(--uui-interface-active);
        transition: 0.3s all ease;
      }

      input:focus ~ label:before {
        transform: scaleY(1);
      } */

      @media (prefers-reduced-motion) {
        input:focus ~ #track #thumb:before {
          /* opacity: 1;
        transform: translate(-50%, -50%) scale(1); */
          animation: none;
        }

        label:before {
          transition: none;
        }
      }
    `),gn)],zn.formAssociated=!0,r([u("input")],zn.prototype,"input",void 0),r([u("#track")],zn.prototype,"track",void 0),r([a({})],zn.prototype,"label",void 0),r([a({type:Boolean,attribute:"show-step-values"})],zn.prototype,"showStepValues",void 0),r([a({type:Number})],zn.prototype,"min",void 0),r([a({type:Number})],zn.prototype,"max",void 0),r([a({type:String})],zn.prototype,"step",void 0),r([a({type:String})],zn.prototype,"value",null),r([l()],zn.prototype,"stepWidht",void 0),r([l()],zn.prototype,"steps",void 0),r([l()],zn.prototype,"sliderPosition",void 0),r([l()],zn.prototype,"fillScale",void 0),customElements.define("uui-slider",zn);class $n extends t{}let On,An,Pn=e=>e,Nn=0;class Tn extends ge{constructor(){super(...arguments),this.active=!1,this.key=null}firstUpdated(e){super.firstUpdated(e),this.setAttribute("role","tab"),this.key=this.key||"uui-tab-"+Nn++}activate(){this.setActive(!0)}deactivate(){this.setActive(!1)}toggle(){!0!==this.active?this.activate():this.deactivate()}async setActive(e){this.active=e;const t=new $n(e?"activate":"deactivate");this.dispatchEvent(t)}render(){return L(On||(On=Pn`
      <button type="button" @click=${0}>
        <slot></slot>
      </button>
    `),this.activate)}}Tn.styles=[ie(An||(An=Pn`
      button {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4px 20px 0 20px;
        border: none;
        box-sizing: border-box;
        height: 75px;
        min-width: 75px;
        background-color: var(--uui-interface-surface);
        color: var(--uui-interface-contrast);
        cursor: pointer;

        transition: background-color 80ms;
      }

      button:hover {
        background-color: var(--uui-interface-surface-hover);
        color: var(--uui-interface-contrast-hover);
      }

      button:active {
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.05);
      }

      button::before {
        content: '';
        position: absolute;
        height: 0px;
        max-width: 50px;
        width: calc(100% - 16px);
        left: auto;
        right: auto;
        background-color: var(--uui-interface-active);
        bottom: 0;
        border-radius: 3px 3px 0 0;
        opacity: 0;
        transition: all 0.2s linear;
      }
      button:hover::before {
        background-color: var(--uui-interface-active-hover);
      }

      :host([active]) button {
        color: var(--uui-interface-contrast-active);
        cursor: default;
      }
      :host([active]) button::before {
        opacity: 1;
        height: 4px;
      }
    `))],r([a({type:Boolean,attribute:"active",reflect:!0})],Tn.prototype,"active",void 0),r([a({type:String})],Tn.prototype,"key",void 0),customElements.define("uui-tab",Tn);class In extends t{}let Ln,Dn,Un=e=>e;class Bn extends ge{constructor(){super(...arguments),this.tabs=null,this._active=null}get active(){return this._active}set active(e){this._active!==e&&(this._active=e,this.reflectActive())}queryTabs(){const e=null===this.tabs;this.tabs=this.tabsSlot.assignedElements({flatten:!0}).filter((e=>e instanceof Tn)),e&&this.reflectActive()}reflectActive(){null!==this._active&&this.activateTab(this._active),this.reflectInactive()}activateTab(e){var t;const i=null===(t=this.tabs)||void 0===t?void 0:t.find((t=>t.key===e));i&&(i.active=!0)}reflectInactive(){var e;null===(e=this.tabs)||void 0===e||e.forEach((e=>{e.key!==this._active&&(e.active=!1)}))}onTabActivate(e){e.stopPropagation(),this.changeActive(e.target.key)}onTabDeactivate(e){e.stopPropagation(),this.changeActive(null)}changeActive(e){this._active=e,this.reflectInactive();const t=new In("change");this.dispatchEvent(t)}render(){return L(Ln||(Ln=Un`
      <slot
        @activate=${0}
        @deactivate=${0}
        @slotchange=${0}
      ></slot>
    `),this.onTabActivate,this.onTabDeactivate,this.queryTabs)}}Bn.styles=[ie(Dn||(Dn=Un`
      :host {
        display: flex;
        flex-wrap: wrap;
      }

      ::slotted(*:not(:last-of-type)) {
        border-right: 1px solid var(--uui-interface-border);
      }
    `))],r([u("slot")],Bn.prototype,"tabsSlot",void 0),r([a()],Bn.prototype,"active",null),customElements.define("uui-tab-group",Bn);let Rn,Mn=e=>e;class Hn extends ge{constructor(){super(...arguments),this.activeKey="A"}changeActive(e){this.activeKey=e}onChange(e){this.activeKey=e.target.active}render(){return L(Rn||(Rn=Mn`
      <uui-tab-group .active=${0} @change=${0}>
        <uui-tab .key=${0}> Tab A </uui-tab>
        <uui-tab .key=${0}> Tab B </uui-tab>
        <uui-tab .key=${0}> Tab C </uui-tab>
      </uui-tab-group>
      <button type="button" @click=${0}>
        open A
      </button>
      <button type="button" @click=${0}>
        open B
      </button>
      <button type="button" @click=${0}>
        open C
      </button>
      <button type="button" @click=${0}>
        Reset active
      </button>
      <div>Currently active: ${0}</div>
    `),this.activeKey,this.onChange,"A","B","C",(()=>this.changeActive("A")),(()=>this.changeActive("B")),(()=>this.changeActive("C")),(()=>this.changeActive(null)),this.activeKey)}}r([a()],Hn.prototype,"activeKey",void 0),customElements.define("uui-tabs-example-page",Hn);let jn,Vn,qn,Wn=e=>e;class Fn extends ge{constructor(){super(...arguments),this.size="m",this.look=""}render(){return L(jn||(jn=Wn` <slot></slot> `))}}Fn.styles=[ie(Vn||(Vn=Wn`
      :host {
        display: inline-block;
        font-family: inherit;
        line-height: 1;
        font-size: var(--uui-tag-font-size, 0.9em);
        margin: var(--uui-tag-margin, var(--uui-size-base-unit));
        padding: var(--uui-tag-size-unit, var(--uui-size-base-unit))
          calc(var(--uui-tag-size-unit, var(--uui-size-base-unit)) * 3);
        border-radius: calc(
          var(--uui-tag-size-unit, var(--uui-size-base-unit)) * 2
        );
        background-color: var(--uui-interface-surface-alt);
        color: var(--uui-interface-contrast);
        user-select: none;

        transition: background-color 120ms, color 120ms;
      }

      :host([size='xs']) {
        --uui-tag-size-unit: 4px;
        --uui-tag-font-size: 10px;
      }
      :host([size='s']) {
        --uui-tag-size-unit: 4px;
        --uui-tag-font-size: 11px;
      }
      :host([size='m']) {
        --uui-tag-size-unit: 5px;
        --uui-tag-font-size: 14px;
      }
      :host([size='l']) {
        --uui-tag-size-unit: 6px;
      }
      :host([size='xl']) {
        --uui-tag-size-unit: 8px;
      }
    `)),qe((e=>ie(qn||(qn=Wn`
          :host([look='${0}']) {
            background-color: var(--uui-look-${0}-surface);
            color: var(--uui-look-${0}-contrast);
          }
        `),e,e,e)))],r([a({attribute:!0})],Fn.prototype,"size",void 0),r([a({attribute:!0})],Fn.prototype,"look",void 0),customElements.define("uui-tag",Fn);class Kn extends t{}Kn.INPUT="input",Kn.CHANGE="change",Kn.KEYUP="keyup";let Gn,Yn,Jn=e=>e;class Xn extends ge{constructor(){super(),this.label="",this.placeholder="",this.disabled=!1,this._value="",this.type="text",this.valid=!0,this._internals=this.attachInternals()}firstUpdated(){this.label||console.warn(this.tagName+" needs a `label`")}get value(){return this._value}set value(e){this._value=e,this._internals.setFormValue(this._value)}onInput(e){this.value=e.target.value,this.dispatchEvent(new Kn(Kn.INPUT))}onChange(){this.dispatchEvent(new Kn(Kn.CHANGE))}onKeyup(){this.dispatchEvent(new Kn(Kn.KEYUP))}render(){return L(Gn||(Gn=Jn`
      <input
        type="${0}"
        value=${0}
        placeholder=${0}
        aria-label=${0}
        ?disabled=${0}
        @input=${0}
        @change=${0}
        @keyup=${0}
      />
    `),this.type,this.value,this.placeholder,this.label,this.disabled,this.onInput,this.onChange,this.onKeyup)}}Xn.styles=[ie(Yn||(Yn=Jn`
      :host {
        display: inline-block;
      }
      input {
        display: inline-block;
        height: 30px;
        padding: 3px 6px 1px 6px;
        font-family: inherit;
        font-size: 15px;
        color: inherit;
        border-radius: 0;
        box-sizing: border-box;
        background-color: var(
          --uui-text-field-background-color,
          var(--uui-interface-surface)
        );
        border: 1px solid
          var(--uui-text-field-border-color, var(--uui-interface-border));
        width: 100%;
        outline: none;
      }
      input:hover {
        border-color: var(
          --uui-text-field-border-color-hover,
          var(--uui-interface-border-hover)
        );
      }
      input:focus {
        border-color: var(
          --uui-text-field-border-color-focus,
          var(--uui-interface-border-focus)
        );
      }
      :host([invalid]) {
        border-color: var(--uui-color-danger-background);
      }

      input[type='color'] {
        width: 30px;
        padding: 0;
        border: none;
      }

      input[disabled] {
        background-color: var(
          --uui-text-field-background-color-disabled,
          var(--uui-interface-surface-disabled)
        );
        border: 1px solid
          var(
            --uui-text-field-border-color-disabled,
            var(--uui-interface-border-disable)
          );

        color: var(--uui-interface-contrast-disabled);
      }
    `))],Xn.formAssociated=!0,r([a()],Xn.prototype,"label",void 0),r([a({})],Xn.prototype,"placeholder",void 0),r([a({type:Boolean})],Xn.prototype,"disabled",void 0),r([l()],Xn.prototype,"_value",void 0),r([a()],Xn.prototype,"value",null),r([a({type:String})],Xn.prototype,"type",void 0),r([a({type:Boolean,reflect:!0})],Xn.prototype,"valid",void 0),customElements.define("uui-textfield",Xn);let Zn,Qn,ea=e=>e;const ta=D(Zn||(Zn=ea`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M461.884 68.14c-132.601 81.297-228.817 183.87-272.048 235.345l-105.874-82.95-46.751 37.691 182.941 186.049c31.485-80.646 131.198-238.264 252.956-350.252L461.884 68.14z"/>
</svg>`)),ia=D(Qn||(Qn=ea`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M422.952 371.305L307.064 255.418l115.884-115.887-51.722-51.723L255.34 203.693 139.457 87.812l-51.726 51.719 115.885 115.885L87.731 371.305l51.726 51.721L255.344 307.14l115.884 115.882z"/>
</svg>`));let sa,oa,ra=e=>e;class na extends gt{constructor(){super("switch")}renderCheckbox(){return L(sa||(sa=ra`
      <div id="slider">
        <div id="icon-check">${0}</div>
        <div id="icon-wrong">${0}</div>
      </div>
    `),ta,ia)}}na.styles=[...gt.styles,Xe,ie(oa||(oa=ra`
      :host {
        --uui-toggle-size: 18px;
        --uui-toggle-switch-width: calc(2 * var(--uui-toggle-size));
        /*
        --uui-toggle-focus-outline: 0 0 1px 1.5px var(--uui-color-violet-blue);
        */
      }

      #slider {
        position: relative;
        grid-area: 'input';
        display: flex;
        align-items: center;

        width: var(--uui-toggle-switch-width);
        height: var(--uui-toggle-size);
        border-radius: 100px;

        background-color: var(
          --uui-toggle-background-color,
          var(--uui-interface-surface-alt)
        );
        border: 1px solid
          var(--uui-toggle-border-color, var(--uui-interface-border));
        font-size: calc(var(--uui-toggle-size) * 0.6);
      }
      label:hover input:not([disabled]) + #slider {
        border-color: var(
          --uui-toggle-border-color-hover,
          var(--uui-interface-border-hover)
        );
        background-color: var(
          --uui-toggle-background-color-hover,
          var(--uui-interface-surface-alt-hover)
        );
      }
      label:focus #slider {
        border-color: var(
          --uui-toggle-border-color-focus,
          var(--uui-interface-border-focus)
        );
        background-color: var(
          --uui-toggle-background-color-focus,
          var(--uui-interface-surface-alt-focus)
        );
      }
      input:checked + #slider {
        background-color: var(--uui-interface-select);
      }
      label:hover input:checked:not([disabled]) + #slider {
        background-color: var(--uui-interface-select-hover);
      }
      label:focus input:checked + #slider {
        background-color: var(--uui-interface-select-focus);
      }

      #icon-check,
      #icon-wrong {
        position: absolute;
        vertical-align: middle;
        width: 1em;
        height: 1em;
        line-height: 0;
        transition: fill 120ms;
      }

      #icon-check {
        margin-left: -0.5em;
        left: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-contrast);
      }

      #icon-wrong {
        margin-right: -0.5em;
        right: calc(var(--uui-toggle-size) * 0.5);
        fill: var(--uui-interface-contrast);
      }
      input:checked + #slider #icon-check {
        fill: var(--uui-interface-select-contrast);
      }

      #slider:after {
        content: '';
        position: absolute;
        top: 2px;
        left: 2px;
        width: calc(var(--uui-toggle-size) - 4px);
        height: calc(var(--uui-toggle-size) - 4px);
        border-radius: 100px;
        background-color: var(--uui-interface-select-contrast);
        transition: width 120ms ease, left 120ms ease, transform 120ms ease,
          background-color 120ms;
      }

      input:checked + #slider:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
      }

      :host(:not([disabled])) label:active #slider:after {
        /** Stretch when mouse down */
        width: calc(1.06 * var(--uui-toggle-size));
      }

      :host([disabled]) #slider {
        background-color: var(--uui-interface-surface-alt-disabled);
      }
      :host([disabled]) input:checked + #slider {
        background-color: var(--uui-interface-select-disabled);
      }
      :host([disabled]) #slider:after {
        background-color: var(--uui-interface-surface-disabled);
      }
      :host([disabled]) #slider #icon-wrong {
        fill: var(--uui-interface-contrast-disabled);
      }
      :host([disabled]) label:active #slider {
        animation: ${0};
      }
      :host([disabled]) input:checked + #slider #icon-check {
        fill: var(--uui-interface-select-contrast-disabled);
      }

      /*
      input:focus + #slider,
      input:not([disabled]) + label:active #slider {
        box-shadow: var(--uui-toggle-focus-outline);
      }
      */
    `),Ze)],na.formAssociated=!0,customElements.define("uui-toggle",na);let aa,la,ca=e=>e;class ua extends Ot{constructor(){super(...arguments),this.name=""}render(){return L(aa||(aa=ca`
      <slot name="tag"></slot>
      <uui-avatar id="avatar" .text="${0}" size="m"></uui-avatar>
      <div
        id="open-part"
        tabindex="0"
        @click=${0}
        @keydown=${0}
      >
        <span> ${0} </span>
      </div>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>

      <slot></slot>
    `),this.name,this.handleOpenClick,this.handleOpenKeydown,this.name)}}ua.styles=[...Ot.styles,ie(la||(la=ca`
      :host {
        min-width: 250px;
        flex-direction: column;
        justify-content: space-between;
        padding: var(--uui-size-space-3, 12px);
        align-items: center;
      }

      slot:not([name])::slotted(*) {
        font-size: var(--uui-size-small, 12px);
        line-height: calc(2 * var(--uui-size-xsmall, 9px));
      }

      ::slotted(*) {
        text-align: center;
      }

      slot[name='tag'] {
        position: absolute;
        top: 6px;
        right: 6px;
        display: flex;
        justify-content: right;
      }

      #avatar {
        margin: var(--uui-size-space-3, 12px);
      }

      slot[name='icon']::slotted(*) {
        font-size: 1.2em;
      }

      #open-part {
        display: flex;
        position: relative;
        font-weight: 700;
        align-items: center;
        cursor: pointer;
        margin: 0 0 3px 0;
      }

      #open-part > span {
        vertical-align: center;
        margin-left: 0.5em;
        margin-top: 3px;
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }
    `))],r([a({type:String})],ua.prototype,"name",void 0),customElements.define("uui-user-card",ua);
