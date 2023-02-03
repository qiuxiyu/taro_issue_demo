/*
 * @Author: sun_ping
 * @Date: 2022-07-22 16:57:45
 * @LastEditors: sun_ping
 * @LastEditTime: 2022-07-22 17:56:55
 * @Description: 
 */
Component({
  properties: {
    // 这里定义了 innerText 属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      console.log(">>>>>>>>> attached")
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
      console.log(">>>>>>>>> detached")
    },
  },
});