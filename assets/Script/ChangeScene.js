cc.Class({
  extends: cc.Component,

  properties: {
    button: cc.Button,
    sceneName: {
      // ATTRIBUTES:
      default: 'book', // The default value will be used only when the component attaching
      // to a node for the first time
      type: cc.String, // optional, default is typeof default
    },
  },

  onLoad: function () {
    if (!this.button) {
      this.button = this.node.getComponent(cc.Button);
    }
    this.button.node.on('click', this.callback, this);
  },

  callback: function (button) {
    // do whatever you want with button
    // 另外，注意这种方式注册的事件，也无法传递 customEventData
    console.log('change scene --->>>', this.sceneName);

    cc.director.loadScene(this.sceneName);
  },

  // update (dt) {},
});
