(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-sex-sex"],{"0e7c":function(n,e,t){"use strict";t.r(e);var a=t("fe9c"),i=t.n(a);for(var s in a)"default"!==s&&function(n){t.d(e,n,function(){return a[n]})}(s);e["default"]=i.a},2995:function(n,e,t){"use strict";var a=t("deee"),i=t.n(a);i.a},"79e1":function(n,e,t){e=n.exports=t("2350")(!1),e.push([n.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.content[data-v-eaa62148]{position:absolute;left:0;right:0;bottom:0;top:0;background:#f8f8f8}.content .btn[data-v-eaa62148]{padding:%?40?% %?20?%}.content .radio[data-v-eaa62148]{background:#fff;padding:%?20?% %?30?%}',""])},a34a:function(n,e,t){"use strict";t.r(e);var a=t("b303"),i=t("0e7c");for(var s in i)"default"!==s&&function(n){t.d(e,n,function(){return i[n]})}(s);t("2995");var c,o=t("f0c5"),r=Object(o["a"])(i["default"],a["b"],a["c"],!1,null,"eaa62148",null,!1,a["a"],c);e["default"]=r.exports},b303:function(n,e,t){"use strict";var a,i=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("v-uni-view",{staticClass:"content"},[t("v-uni-radio-group",{staticClass:"radio",on:{change:function(e){arguments[0]=e=n.$handleEvent(e),n.radioChange.apply(void 0,arguments)}}},[t("v-uni-label",{staticClass:"radio"},[t("v-uni-radio",{attrs:{value:"1",checked:n.checkmale}}),n._v("男")],1),t("v-uni-label",{staticClass:"radio"},[t("v-uni-radio",{attrs:{value:"2",checked:n.checkfemale}}),n._v("女")],1)],1),t("v-uni-view",{staticClass:"btn"},[t("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=n.$handleEvent(e),n.onSubmit.apply(void 0,arguments)}}},[n._v("提交")])],1)],1)},s=[];t.d(e,"b",function(){return i}),t.d(e,"c",function(){return s}),t.d(e,"a",function(){return a})},deee:function(n,e,t){var a=t("79e1");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var i=t("4f06").default;i("1ac4e566",a,!0,{sourceMap:!1,shadowMode:!1})},fe9c:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,t("c5f6");var a={data:function(){return{user:{},sex:0,checkmale:!1,checkfemale:!1}},onLoad:function(n){this.sex=n.sex,1===Number(this.sex)?this.checkmale=!0:2===Number(this.sex)&&(this.checkfemale=!0),this.user=this.getUserInfo("userToken")},methods:{radioChange:function(n){this.sex=1*n.detail.value},onSubmit:function(){console.log(this.user),uni.setStorageSync("newSex",this.sex),uni.showToast({title:"提交成功"}),uni.navigateBack({delta:1})}}};e.default=a}}]);