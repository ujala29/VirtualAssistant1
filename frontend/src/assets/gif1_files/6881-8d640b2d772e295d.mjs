"use strict";(self.modernJsonp=self.modernJsonp||[]).push([[6881],{25690:(e,t,n)=>{n.d(t,{default:()=>r});var i=n(718222);let a=`pulsing {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}`,r={css:(0,i.Ll)([a]),animation:"pulsing 2s infinite"}},718222:(e,t,n)=>{n.d(t,{CC:()=>a,Ll:()=>o,XF:()=>r});let i=(e,t,n)=>({x:Math.floor(e*Math.cos(n)),y:Math.floor(t*Math.sin(n))}),a=(e,t)=>i(t/2,e/2,2*Math.random()*Math.PI),r=(e,t)=>Math.floor(Math.random()*(t-e+1))+e,o=e=>["@-webkit-keyframes","@keyframes"].map(t=>e.map(e=>t+" "+e).join(`
`)).join(`
`)},633569:(e,t,n)=>{n.r(t),n.d(t,{default:()=>S});var i=n(667294),a=n(20256),r=n(569681),o=n(19963),l=n(756064);function s(e,t,n){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,t||"default");if("object"!=typeof i)return i;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(t,"string"))?i:i+"")in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}let u={},m=e=>{let t=e.__id||e.id;return"string"==typeof t&&t||null};class p{constructor(){s(this,"idMap",new Map),s(this,"objMap",new WeakMap)}get(e){let t=m(e);return this.objMap.get(e)??(t?this.idMap.get(t):void 0)}has(e){let t=m(e);return this.objMap.has(e)??(!!t&&this.idMap.has(t))}set(e,t){let n=m(e);n&&this.idMap.set(n,t),this.objMap.set(e,t)}reset(){this.idMap=new Map,this.objMap=new WeakMap}}function d(e,t){return"number"==typeof e?e:"lg1"===t?e[t]??e.lg??1:e[t]??1}var c=n(399083),h=n(824834),f=n(830811),g=n(25690),y=n(970601),x=n(785893);let{css:b,animation:_}=g.default,v={backgroundColor:f._VP,animation:_,borderRadius:f.Ev2};function w({data:e}){let{height:t}=e;return(0,x.jsxs)(i.Fragment,{children:[(0,x.jsx)(y.Z,{unsafeCSS:b}),(0,x.jsx)(a.xu,{dangerouslySetInlineStyle:{__style:v},"data-test-id":"skeleton-pin",children:(0,x.jsx)(a.xu,{height:t})})]})}var M=n(56063),C=n(967312),$=n(174646),k=n(538645),j=n(992114),R=n(438596);function S(e){let{align:t,cacheKey:n,id:s,isFetching:m,isGridCentered:f=!0,items:g,layout:b,loadItems:_,masonryRef:v,optOutFluidGridExperiment:S=!1,renderItem:W,scrollContainerRef:I,virtualize:E=!0,getColumnSpanConfig:A,_getResponsiveModuleConfigForSecondItem:F,isLoadingStateEnabled:P,initialLoadingStatePinCount:z,isLoadingAccessibilityLabel:G,isLoadedAccessibilityLabel:O}=e,N=(0,k.ZP)(),{isAuthenticated:X,isRTL:Z}=(0,$.B)(),{logContextEvent:T}=(0,o.v)(),B=(0,C.F)(),Q="desktop"===N,H=(0,R.MM)(),J=((0,i.useRef)(g.map(()=>({fetchTimestamp:Date.now(),measureTimestamp:Date.now(),hasRendered:!1,pageCount:0}))),Q&&!S),{experimentalColumnWidth:V,experimentalGutter:q}=(0,c.Z)(J),D=e.serverRender??!!Q,L="flexible"===b||"uniformRowFlexible"===b||"desktop"!==N||J,K=(L&&b?.startsWith("uniformRow")?"uniformRowFlexible":void 0)??(D?"serverRenderedFlexible":"flexible"),U=e.columnWidth??V??M.yF;L&&(U=Math.floor(U));let Y=e.gutterWidth??q??(Q?M.oX:1),ee=e.minCols??M.yc,et=(0,i.useRef)(0),en=U+Y,ei=function(e){if(null==e)return;let t=function(e){let t=u[e];return t&&t.screenWidth===window.innerWidth||(u[e]={screenWidth:window.innerWidth}),u[e]}(e);return t.measurementCache||(t.measurementCache=new p),t.measurementCache}(n),ea=(0,i.useCallback)(()=>I?.current||window,[I]),er=(0,i.useRef)(!0),{anyEnabled:eo}=B.checkExperiment("web_masonry_pin_overlap_calculation_and_logging"),{anyEnabled:el}=B.checkExperiment("web_masonry_fluid_reflow"),es=f&&er.current?"centered":"",{className:eu,styles:em}=function(e){let t=`m_${Object.keys(e).sort().reduce((t,n)=>{let i=e[n];return null==i||"object"==typeof i||"function"==typeof i?t:"boolean"==typeof i?t+(i?"t":"f"):t+i},"").replace(/\:/g,"\\:")}`,{flexible:n,gutterWidth:i,isRTL:a,itemWidth:r,maxColumns:o,minColumns:l,items:s,getColumnSpanConfig:u,_getResponsiveModuleConfigForSecondItem:m}=e,p=u?s.map((e,t)=>({index:t,columnSpanConfig:u(e)??1})).filter(e=>1!==e.columnSpanConfig):[],c=r+i,h=Array.from({length:o+1-l},(e,t)=>t+l).map(e=>{let h,f,g=e===l?0:e*c,y=e===o?null:(e+1)*c-.01;u&&m&&s.length>1&&(h=u(s[0]),f=m(s[1]));let{styles:x,numberOfVisibleItems:b}=p.reduce((a,o)=>{let{columnSpanConfig:l}=o,u=Math.min(function({columnCount:e,columnSpanConfig:t,firstItemColumnSpanConfig:n,isFlexibleWidthItem:i,secondItemResponsiveModuleConfig:a}){let r=e<=2?"sm":e<=4?"md":e<=6?"lg1":e<=8?"lg":"xl",o=d(t,r);if(i){let t=d(n,r);o="number"==typeof a?a:a?Math.max(a.min,Math.min(a.max,e-t)):1}return o}({columnCount:e,columnSpanConfig:l,isFlexibleWidthItem:!!f&&o===s[1],firstItemColumnSpanConfig:h??1,secondItemResponsiveModuleConfig:f??1}),e),m=null!=o.index&&a.numberOfVisibleItems>=u+o.index,p=n?100/e*u:r*u+i*(u-1),{numberOfVisibleItems:c}=a;return m?c-=u-1:o.index<c&&(c+=1),{styles:a.styles.concat(function({className:e,index:t,columnSpanConfig:n,visible:i,width:a,flexible:r}){let o="number"==typeof n?n:btoa(JSON.stringify(n));return r?`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}% !important;
      }`:`
      .${e} .static[data-column-span="${o}"]:nth-child(${t+1}) {
        visibility: ${i?"visible":"hidden"} !important;
        position: ${i?"inherit":"absolute"} !important;
        width: ${a}px !important;
      }`}({className:t,index:o.index,columnSpanConfig:l,visible:m,width:p,flexible:n})),numberOfVisibleItems:c}},{styles:"",numberOfVisibleItems:e}),_=n?`
      .${t} .static {
        box-sizing: border-box;
        width: calc(100% / ${e}) !important;
      }
    `:`
      .${t} {
        max-width: ${e*c}px;
      }

      .${t} .static {
        width: ${r}px !important;
      }
    `;return{minWidth:g,maxWidth:y,styles:`
      .${t} .static:nth-child(-n+${b}) {
        position: static !important;
        visibility: visible !important;
        float: ${a?"right":"left"};
        display: block;
      }

      .${t} .static {
        padding: 0 ${i/2}px;
      }

      ${_}

      ${x}
    `}}),f=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @container (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),g=h.map(({minWidth:e,maxWidth:t,styles:n})=>`
    @media (min-width: ${e}px) ${t?`and (max-width: ${t}px)`:""} {
      ${n}
    }
  `),y=`
    ${f.join("")}
    @supports not (container-type: inline-size) {
      ${g.join("")}
    }
  `;return{className:t,styles:`
    .masonryContainer:has(.${t}) {
      container-type: inline-size;
    }

    .masonryContainer > .centered {
      margin-left: auto;
      margin-right: auto;
    }

    .${t} .static {
      position: absolute !important;
      visibility: hidden !important;
    }

    ${y}
  `}}({gutterWidth:Y,flexible:L,items:g,isRTL:Z,itemWidth:U,maxColumns:e.maxColumns??Math.max(g.length,M.g5),minColumns:ee,getColumnSpanConfig:A,_getResponsiveModuleConfigForSecondItem:F}),ep=`${es} ${eu}`.trim(),{anyEnabled:ed,expName:ec,group:eh,isMeasureAllEnabled:ef}=(0,h.Z)(),eg=((0,i.useRef)(void 0),(0,i.useRef)(g.length)),ey=(0,i.useRef)(0),ex=(0,i.useRef)(null);(0,i.useEffect)(()=>{eg.current=g.length,ey.current+=1},[g]),(0,i.useEffect)(()=>{er.current&&(er.current=!1)},[]),(0,i.useEffect)(()=>()=>{},[]);let eb=(0,i.useCallback)(e=>{let t=e.reduce((e,t)=>e+t),n=t/e.length;(0,j.S0)("webapp.masonry.multiColumnWhitespace.average",n,{sampleRate:1,tags:{experimentalMasonryGroup:eh||"unknown",handlerId:H,isAuthenticated:X,multiColumnItemSpan:e.length}}),(0,j.S0)("webapp.masonry.twoColWhitespace",n,{sampleRate:1,tags:{columnWidth:U,minCols:ee}}),T({event_type:15878,component:14468,aux_data:{total_whitespace_px:t}}),T({event_type:16062,component:14468,aux_data:{average_whitespace_px:n}}),T({event_type:16063,component:14468,aux_data:{max_whitespace_px:Math.max(...e)}}),e.forEach(t=>{t>=50&&((0,j.nP)("webapp.masonry.multiColumnWhitespace.over50",{sampleRate:1,tags:{experimentalMasonryGroup:eh||"unknown",handlerId:H,isAuthenticated:X,multiColumnItemSpan:e.length}}),T({event_type:16261,component:14468})),t>=100&&((0,j.nP)("webapp.masonry.multiColumnWhitespace.over100",{sampleRate:1,tags:{experimentalMasonryGroup:eh||"unknown",handlerId:H,isAuthenticated:X,multiColumnItemSpan:e.length}}),T({event_type:16262,component:14468}))}),(0,j.nP)("webapp.masonry.multiColumnWhitespace.count",{sampleRate:1,tags:{experimentalMasonryGroup:eh||"unknown",handlerId:H,isAuthenticated:X,multiColumnItemSpan:e.length}})},[U,T,ee,X,H,eh]),{_items:e_,_renderItem:ev}=function({initialLoadingStatePinCount:e=50,infiniteScrollPinCount:t=10,isFetching:n,items:a=[],renderItem:r,isLoadingStateEnabled:o}){let l=+(a.filter(e=>"object"==typeof e&&null!==e&&"type"in e&&"closeup_module"===e.type).length>0),s=o&&n,u=(0,i.useMemo)(()=>Array.from({length:a.length>l?t:e}).reduce((e,t,n)=>[...e,{height:n%2==0?356:236,key:`skeleton-pin-${n}`,isSkeleton:!0}],[]),[a.length,l,t,e]);return{_items:(0,i.useMemo)(()=>s?[...a,...u]:a,[s,a,u]),_renderItem:(0,i.useMemo)(()=>o?e=>{let{itemIdx:t,data:n}=e;return t>=a.length&&n&&"object"==typeof n&&"key"in n&&"height"in n?(0,x.jsx)(w,{data:n},n.key):r(e)}:r,[o,r,a.length])}}({isLoadingStateEnabled:P,items:g,renderItem:(0,i.useCallback)(e=>(0,x.jsx)(l.Z,{name:"MasonryItem",children:W(e)}),[W]),isFetching:m,initialLoadingStatePinCount:z}),ew=P&&m,eM=(0,i.useRef)(new Set);(0,i.useEffect)(()=>{if(!eo)return;let e=setTimeout(()=>{requestAnimationFrame(()=>{let e=Array.from(ex.current?.querySelectorAll("[data-grid-item-idx]")??[]);if(0===e.length)return;let t=e.map(e=>{let t=e.getAttribute("data-grid-item-idx");return{rect:e.getBoundingClientRect(),itemIdx:t}}),n=0,i=0,a=0,r=0,o=0,l=0;for(let e=0;e<t.length;e+=1){let s=t[e]?.rect,u=t[e]?.itemIdx;for(let m=e+1;m<t.length;m+=1){let e=t[m]?.rect,p=t[m]?.itemIdx;if(s&&e&&u&&p){let t=[u,p].sort().join("|");if(!eM.current.has(t)&&s.right>=e.left&&s.left<=e.right&&s.bottom>=e.top&&s.top<=e.bottom&&s.height>0&&e.height>0){eM.current.add(t),n+=1;let u=Math.max(0,Math.min(s.right,e.right)-Math.max(s.left,e.left))*Math.max(0,Math.min(s.bottom,e.bottom)-Math.max(s.top,e.top));u>8e4?l+=1:u>4e4?o+=1:u>1e4?r+=1:u>5e3?a+=1:u>2500&&(i+=1)}}}}n>0&&(0,j.QX)("webapp.masonry.pinOverlapHits",n,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}}),i>0&&(0,j.QX)("webapp.masonry.pinOverlap.AreaPx.over2500",i,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}}),a>0&&(0,j.QX)("webapp.masonry.pinOverlap.AreaPx.over5000",a,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}}),r>0&&(0,j.QX)("webapp.masonry.pinOverlap.AreaPx.over10000",r,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}}),o>0&&(0,j.QX)("webapp.masonry.pinOverlap.AreaPx.over40000",o,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}}),l>0&&(0,j.QX)("webapp.masonry.pinOverlap.AreaPx.over80000",l,{tags:{isAuthenticated:X,isDesktop:Q,handlerId:H,experimentalMasonryGroup:eh||"unknown",fluidResizeExperiment:el?"true":"false"}})})},1e3);return()=>{clearTimeout(e)}},[U,eh,el,X,Q,eo,g,H]);let eC=(0,r.Z)(),e$=(0,i.useCallback)(e=>{v&&(v.current=e)},[v]);return(0,x.jsxs)(i.Fragment,{children:[P&&!er.current&&(0,x.jsx)(a.xu,{"aria-live":"polite",display:"visuallyHidden",children:ew?G:O}),(0,x.jsx)("div",{ref:ex,"aria-busy":P?!!ew:void 0,className:"masonryContainer","data-test-id":"masonry-container",id:s,style:J?{padding:`0 ${Y/2}px`}:void 0,children:(0,x.jsxs)("div",{className:ep,children:[D&&er.current?(0,x.jsx)(y.Z,{"data-test-id":"masonry-ssr-styles",unsafeCSS:em}):null,(0,x.jsx)(a.xu,{"data-test-id":"max-width-container",marginBottom:0,marginEnd:"auto",marginStart:"auto",marginTop:0,maxWidth:e.maxColumns?en*e.maxColumns:void 0,children:ed?(0,x.jsx)(a.GX,{ref:eC?e$:e=>{v&&(v.current=e)},_dynamicHeights:!0,_getResponsiveModuleConfigForSecondItem:F,_logTwoColWhitespace:eb,_measureAll:ef,align:t,columnWidth:U,getColumnSpanConfig:A,gutterWidth:Y,items:e_,layout:L?K:b??"basic",loadItems:_,measurementStore:ei,minCols:ee,renderItem:ev,scrollContainer:ea,virtualBufferFactor:.3,virtualize:E}):(0,x.jsx)(a.Rk,{ref:eC?e$:e=>{v&&(v.current=e)},_dynamicHeights:!0,_fluidResize:el,_getResponsiveModuleConfigForSecondItem:F,_logTwoColWhitespace:eb,align:t,columnWidth:U,getColumnSpanConfig:A,gutterWidth:Y,items:e_,layout:L?K:b??"basic",loadItems:_,measurementStore:ei,minCols:ee,renderItem:ev,scrollContainer:ea,virtualBufferFactor:.3,virtualize:E})})]})})]})}},399083:(e,t,n)=>{n.d(t,{Z:()=>i});function i(e=!0){let t=e?16:void 0,n=t?Math.floor(t/4):void 0;return{experimentalColumnWidth:e?221:void 0,experimentalGutter:t,experimentalGutterBoints:n}}},824834:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(967312),a=n(174646),r=n(438596);function o(e){let{isAuthenticated:t}=(0,a.B)(),{expName:n,anyEnabled:o,group:l}=function({experimentsClient:e,handlerId:t,isAuthenticated:n,skipActivation:i}){let{checkExperiment:a}=e,r=a(n?"web_masonry_v2_auth":"web_masonry_v2_unauth",{dangerouslySkipActivation:i});return r.group?{expName:n?"web_masonry_v2_auth":"web_masonry_v2_unauth",...r}:"www/[username]/[slug].js"!==t||n?"www/pin/[id].js"!==t||n?{expName:"",anyEnabled:!1,group:""}:{expName:"web_masonry_v2_unauth_pin",...a("web_masonry_v2_unauth_pin",{dangerouslySkipActivation:i})}:{expName:"web_masonry_v2_unauth_board",...a("web_masonry_v2_unauth_board",{dangerouslySkipActivation:i})}}({experimentsClient:(0,i.F)(),handlerId:(0,r.MM)(),isAuthenticated:t,skipActivation:e?.skipActivation??!1});return{expName:n,anyEnabled:o,group:l,isMeasureAllEnabled:"enabled_measure_all"===l||"enabled_measure_all_impression_fix"===l,isImpressionFixEnabled:"control_impression_fix"===l||"enabled_impression_fix"===l||"enabled_measure_all_impression_fix"===l}}}}]);
//# sourceMappingURL=https://sm.pinimg.com/webapp/6881-8d640b2d772e295d.mjs.map