import 'common';
import 'js/icons';

var browser = {
  versions: (function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == ' qq' //是否QQ
    };
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

Vue.component('Message', {
  template: `
    <div class="message">
      <p :class="['name']">
        {{message.from.name}}
      </p>
      <div class="tele-message-content-wrapper">
        <div class="tele-message-content">
          {{message.text}}
        </div>
        <div class="tele-message-time">
          <span>{{message.date}}</span>
        </div>
      </div>
    </div>
    `,
  props: ['message']
});

Vue.component('App', {
  template: `
      <div id="tele" :class="collapse ? 'tele-collapse' : ''">
        <div class="bg">
          <div class="wrap">
            <ul class="messages" ref="messages">
              <li class="message-container" v-for="message in messages" :key="message.id">
                <Message :message="message"></Message>
              </li>
            </ul>
          </div>
        </div>
        <img :src="imgSrc" alt="" class="toggle-btn" @click="toggleCollapseOrLink" />
      </div>
    `,
  data() {
    return {
      collapse: browser.versions.mobile,
      messages: []
    };
  },
  created() {
    if (!browser.versions.mobile) {
      this.initWebsocket();
    }
  },
  methods: {
    toggleCollapseOrLink() {
      if (browser.versions.mobile) {
        window.open('https://t.me/FIBOSIO');
        return;
      }
      this.collapse = !this.collapse;
    },
    pushMessage(message) {
      this.messages.push(message);
      let e = this.$refs.messages;
      scroll = e.scrollHeight - e.scrollTop;
      if (scroll >= 450 && scroll <= 600) {
        this.$nextTick(function() {
          e.scrollTop = e.scrollHeight;
        });
      }
    },
    initWebsocket() {
      this.socket = new WebSocket('ws://localhost:8080/1.0/push');
      // this.socket = new WebSocket('ws://192.168.1.102:8080/1.0/push');
      this.socket.onmessage = e => {
        var d = JSON.parse(e.data);
        this.pushMessage(d.data.message);
      };
    }
  },
  computed: {
    imgSrc() {
      return this.collapse
        ? '/imgs/toggle-collapse.png'
        : '/imgs/toggle-open.png';
    }
  }
});

new Vue({
  el: '#tele-app-wrapper',
  template: `<App />`
});
