(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-settings-settings"],{"7c39":function(n,i,t){i=n.exports=t("2350")(!1),i.push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 页面铺满屏幕 */.page-fill[data-v-a514b22c]{width:100%;height:100%;position:absolute}.info-list[data-v-a514b22c]{\n\t/* margin-top: 20upx; */padding:%?0?% %?30?%}.info-words[data-v-a514b22c]{color:#333;font-size:16px;width:25%;line-height:%?80?%\n\t/* font-weight: bold; */}.face[data-v-a514b22c]{width:%?80?%;height:%?80?%;border-radius:50%}.arrow-block[data-v-a514b22c]{margin-left:%?10?%;line-height:%?86?%}.arrow-ico[data-v-a514b22c]{width:%?30?%;height:%?30?%}.item-wapper[data-v-a514b22c]{display:-webkit-box;display:-webkit-flex;display:flex;\n\t/* margin-top: 20upx; */-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start}.face-line-upbottom[data-v-a514b22c]{\n\t/* margin-bottom: 20upx; */padding-top:%?20?%}.line-top[data-v-a514b22c]{padding:%?20?%}.right-wapper[data-v-a514b22c]{width:80%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end}.gray-fields[data-v-a514b22c]{font-size:14px;color:#a9a9a9;line-height:%?80?%}\n/* 底部操作 start */.footer-wapper[data-v-a514b22c]{position:fixed;bottom:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;width:100%}.footer-words[data-v-a514b22c]{text-align:center;background-color:#fff;padding:%?20?%;color:#333;font-size:16px}\n/* 底部操作 end */",""])},"89aa":function(n,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={data:function(){return{globalUser:{},newSex:{}}},onShow:function(){this.globalUser=uni.getStorageSync("userToken"),this.newSex=uni.getStorageSync("newSex"),console.log(this.globalUser)},methods:{operator:function(){var n=this;uni.showActionSheet({itemList:["查看我的头像","从相册选择上传"],success:function(i){var t=i.tapIndex,a=[];a.push(n.globalUser.faceImage||n.globalUser.avatarUrl),0==t?uni.previewImage({urls:a,current:a[0]}):uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album"],success:function(n){var i=n.tempFilePaths[0];uni.navigateTo({url:"../operator/operator?imgSrc="+i})}})}})},modifySex:function(){uni.navigateTo({url:"../sex/sex?sex="+this.globalUser.sex})},modifyBirthday:function(){uni.navigateTo({url:"../meBirthday/meBirthday?birthday="+this.globalUser.birthday})},modifyNickname:function(){uni.navigateTo({url:"../meNickname/meNickname?nickname=".concat(this.globalUser.nickName||this.globalUser.nickname)})},cleanStorage:function(){uni.clearStorageSync(),uni.showToast({title:"清理缓存成功",mask:!1,duration:1500})},logout:function(){uni.request({url:"".concat(this.$api,"/user/logout?userId=").concat(this.globalUser.id,"&qq=122212489"),method:"POST",success:function(n){200==n.data.status&&(uni.removeStorageSync("userToken"),uni.switchTab({url:"../me/me"}))}})}}};i.default=a},"9a14":function(n,i,t){"use strict";t.r(i);var a=t("89aa"),e=t.n(a);for(var s in a)"default"!==s&&function(n){t.d(i,n,function(){return a[n]})}(s);i["default"]=e.a},a62f:function(n,i,t){"use strict";var a,e=function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("v-uni-view",{staticClass:"page page-fill"},[t("v-uni-view",{staticClass:"page_block info-list"},[t("v-uni-view",{staticClass:"item-wapper face-line-upbottom",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.operator.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"info-words"},[n._v("头像")]),t("v-uni-view",{staticClass:"right-wapper"},[t("v-uni-image",{staticClass:"face",attrs:{src:n.globalUser.faceImage||n.globalUser.avatarUrl}}),t("v-uni-view",{staticClass:"arrow-block"},[t("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1),t("v-uni-view",{staticClass:"line-top"},[t("v-uni-view",{staticClass:"line"})],1),t("v-uni-view",{staticClass:"item-wapper",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.modifyNickname.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"info-words"},[n._v("昵称")]),t("v-uni-view",{staticClass:"right-wapper"},[n.globalUser.nickname?t("v-uni-view",{staticClass:"gray-fields"},[n._v(n._s(n.globalUser.nickname))]):t("v-uni-view",{staticClass:"gray-fields"},[n._v(n._s(n.globalUser.nickName))]),t("v-uni-view",{staticClass:"arrow-block"},[t("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1),t("v-uni-view",{staticClass:"line-top"},[t("v-uni-view",{staticClass:"line"})],1),n.globalUser.birthday?t("v-uni-view",{staticClass:"item-wapper",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.modifyBirthday.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"info-words"},[n._v("生日")]),t("v-uni-view",{staticClass:"right-wapper"},[t("v-uni-view",{staticClass:"gray-fields"},[n._v(n._s(n.globalUser.birthday))]),t("v-uni-view",{staticClass:"arrow-block"},[t("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1):n._e(),n.globalUser.birthday?t("v-uni-view",{staticClass:"line-top"},[t("v-uni-view",{staticClass:"line"})],1):n._e(),t("v-uni-view",{staticClass:"item-wapper",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.modifySex.apply(void 0,arguments)}}},[t("v-uni-view",{staticClass:"info-words"},[n._v("性别")]),t("v-uni-view",{staticClass:"right-wapper"},[t("v-uni-view",{staticClass:"gray-fields"},[1==n.newSex||1==n.globalUser.sex||1==n.globalUser.gender?t("v-uni-view",[n._v("男")]):2==n.newSex||0==n.globalUser.sex||2==n.globalUser.gender?t("v-uni-view",[n._v("女")]):t("v-uni-view",[n._v("未选择")])],1),t("v-uni-view",{staticClass:"arrow-block"},[t("v-uni-image",{staticClass:"arrow-ico",attrs:{src:"../../static/icos/left-gray-arrow.png"}})],1)],1)],1)],1),t("v-uni-view",{staticClass:"footer-wapper"},[t("v-uni-view",{staticClass:"footer-words",on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.cleanStorage.apply(void 0,arguments)}}},[n._v("清理缓存")]),t("v-uni-view",{staticClass:"footer-words",staticStyle:{"margin-top":"10upx"},on:{click:function(i){arguments[0]=i=n.$handleEvent(i),n.logout.apply(void 0,arguments)}}},[n._v("退出登录")])],1)],1)},s=[];t.d(i,"b",function(){return e}),t.d(i,"c",function(){return s}),t.d(i,"a",function(){return a})},e0ff:function(n,i,t){"use strict";t.r(i);var a=t("a62f"),e=t("9a14");for(var s in e)"default"!==s&&function(n){t.d(i,n,function(){return e[n]})}(s);t("ed7f");var o,r=t("f0c5"),l=Object(r["a"])(e["default"],a["b"],a["c"],!1,null,"a514b22c",null,!1,a["a"],o);i["default"]=l.exports},ed7f:function(n,i,t){"use strict";var a=t("f0c6"),e=t.n(a);e.a},f0c6:function(n,i,t){var a=t("7c39");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var e=t("4f06").default;e("5fd0f7c3",a,!0,{sourceMap:!1,shadowMode:!1})}}]);