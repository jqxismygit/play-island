// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    index: {
      default: 0,
      type: cc.Number,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.content = this.node.children.find(function (n) {
      return n.name === 'content';
    });

    this.pageSize = this.content.children.length;

    const option = this.node.children.find(function (n) {
      return n.name === 'option';
    });
    this.prev = option.children.find(function (n) {
      return n.name === 'prev';
    });
    this.next = option.children.find(function (n) {
      return n.name === 'next';
    });

    this.prev.getComponent(cc.Button).node.on('click', this.prevPage, this);

    this.next.getComponent(cc.Button).node.on('click', this.nextPage, this);

    if (this.content && this.content.children.length - 1 >= this.index) {
      this.content.children[this.index].active = true;
    }

    this.syncTurnStatus();
  },

  syncTurnStatus() {
    if (this.index === 0) {
      this.prev.active = false;
      this.next.active = true;
    } else if (this.index === this.pageSize - 1) {
      this.prev.active = true;
      this.next.active = false;
    } else {
      this.prev.active = true;
      this.next.active = true;
    }
  },

  showCurrentPage() {
    this.content.children.forEach(
      function (n, idx) {
        n.active = this.index === idx;
      }.bind(this),
    );
  },

  nextPage() {
    console.log('下一页-->>');
    this.index++;
    this.showCurrentPage();
    this.syncTurnStatus();
  },

  prevPage() {
    console.log('上一页-->>');
    this.index--;
    this.showCurrentPage();
    this.syncTurnStatus();
  },

  start() {},

  // update (dt) {},
});
