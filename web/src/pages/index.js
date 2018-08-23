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

if (!browser.versions.mobile) {
  Vue.component('Head', {
    template: `
    <div class="head">
      <div class="left">
        <img src="/imgs/tele-logo.png" alt="">
      </div>
      <div class="mid">
        <p class="title">
        FIBOS开发
        </p>
        <p class="member-count">994members</p>
      </div>
      <div class="right">
        <img src="/imgs/tele-logo.png" alt="">
      </div>
    </div>
    `
  });

  Vue.component('Message', {
    template: `
    <div class="message">
      <p :class="['name', message.admin ? 'admin': '']">
        {{message.name}}
      </p>
      <div class="tele-message-content">
        {{message.content}}
      </div>
    </div>
    `,
    props: ['message']
  });

  Vue.component('App', {
    template: `
    <div id="tele" :class="collapse ? 'tele-collapse' : ''">
      <div class="collapse-btn" @click="toggleCollapse">
        <img src="/imgs/left-circle.png" alt="" v-if="collapse">
        <img src="/imgs/right-circle.png" alt="" v-else>
      </div>
      <Head></Head>
      <div class="wrap">
        <ul class="messages" ref="messages">
          <li class="message-container" v-for="(message, index) in messages" :key="index">
            <Message :message="message"></Message>
          </li>
        </ul>
      </div>
    </div>
    `,
    data() {
      return {
        collapse: true,
        messages: []
      };
    },
    created() {
      // this.initWebsocket();
      // setInterval(() => {
      //   this.pushMessage({ name: 1, content: `1111${this.messages.length}`, admin: false })
      // }, 3000)
    },
    methods: {
      toggleCollapse() {
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
        this.socket = new WebSocket();
        this.socket.onmessage = function(e) {
          console.log(e.data);
        };
      }
    }
  });

  new Vue({
    el: '#tele-app-wrapper',
    template: `<App />`
  });
}
