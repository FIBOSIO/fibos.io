import 'common';
import 'js/icons';
import 'jquery-ui';
import 'jquery.tocify';
import '../js/jquery.i18n.properties'
import buyfo from '../imgs/buyfo.png'
import buyfo_en from '../imgs/buyfo-en.png'

var browser = {
  versions: (function () {
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
          this.$nextTick(function () {
            e.scrollTop = e.scrollHeight;
          });
        }
      },
      initWebsocket() {
        this.socket = new WebSocket();
        this.socket.onmessage = function (e) {
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

$(function () {
  var localLanguage = localStorage.getItem("fibosLanguage")
  if (localLanguage) {
    changeLanguage(JSON.parse(localLanguage))
  } else {
    changeLanguage('zh');
  }

  function changeLanguage(language) {
    localStorage.setItem('fibosLanguage', JSON.stringify(language))
    setCookie(language);
    jQuery.i18n.properties({
      name: 'strings', //资源文件名称
      path: '../i18n/', //资源文件路径
      mode: 'map', //用Map的方式使用资源文件中的值
      language: `${language === 'zh' ? 'zh' : 'en'} `,
      callback: function () {//加载成功后设置显示内容
        $('#Home').html($.i18n.prop('Home'));
        $('#Roadmap').html($.i18n.prop('Roadmap'));
        $('#DEV_Community').html($.i18n.prop('DEV_Community'));
        $('#Documentation').html($.i18n.prop('Documentation'));
        $('#DEV_Guides').html($.i18n.prop('DEV_Guides'));
        $('#Basic_Modules').html($.i18n.prop('Basic_Modules'));
        $('#Built_in_Objects').html($.i18n.prop('Built_in_Objects'));
        $('#Language').html($.i18n.prop('Language'));
        $('#slogan').html($.i18n.prop('slogan'));
        $('#desc').html($.i18n.prop('desc'));
        $('#joinin').html($.i18n.prop('joinin'));
        $('#ExchangeFo').html($.i18n.prop('ExchangeFo'));
        $('#QuickDev').html($.i18n.prop('QuickDev'));
        $('#QuickDevDesc').html($.i18n.prop('QuickDevDesc'));
        $('#StartLearn').html($.i18n.prop('StartLearn'));
        $('#Characteristic').html($.i18n.prop('Characteristic'));
        $('#Fast').html($.i18n.prop('Fast'));
        $('#LowLearn').html($.i18n.prop('LowLearn'));
        $('#LessRes').html($.i18n.prop('LessRes'));
        $('#LessRam').html($.i18n.prop('LessRam'));
        $('#Security').html($.i18n.prop('Security'));
        $('#Sandbox').html($.i18n.prop('Sandbox'));
        $('#Auditable').html($.i18n.prop('Auditable'));
        $('#JavaScriptDev').html($.i18n.prop('JavaScriptDev'));
        $('#Stable').html($.i18n.prop('Stable'));
        $('#Bancor').html($.i18n.prop('Bancor'));
        $('#Onestep').html($.i18n.prop('Onestep'));
        $('#FIBOSDev').html($.i18n.prop('FIBOSDev'));
        $('#btn-bancor-download').html($.i18n.prop('btn-bancor-download'));
        $('#FIBOSRoadmap').html($.i18n.prop('FIBOSRoadmap'));
        $('#TestNet').html($.i18n.prop('TestNet'));
        $('#MainNet').html($.i18n.prop('MainNet'));
        $('#SmartWallet').html($.i18n.prop('SmartWallet'));
        $('#Release').html($.i18n.prop('Release'));
        $('#Partners').html($.i18n.prop('Partners'));
        $('#FOSmartWallet').html($.i18n.prop('FOSmartWallet'));
        $('#Supports').html($.i18n.prop('Supports'));
        $('#VacantSeat').html($.i18n.prop('VacantSeat'));
        $('#Doc').html($.i18n.prop('Doc'));
        $('#ContactUs').html($.i18n.prop('ContactUs'));
        $('#Will').html($.i18n.prop('Will'));
        $('#DEV_Guides1').html($.i18n.prop('DEV_Guides1'));
        $('#Basic_Modules1').html($.i18n.prop('Basic_Modules1'));
        $('#Built_in_Objects1').html($.i18n.prop('Built_in_Objects1'));
        $('#VacantSeat1').html($.i18n.prop('VacantSeat1'));
        $('#VacantSeat2').html($.i18n.prop('VacantSeat2'));
        $('#StrategicPartners').html($.i18n.prop('StrategicPartners'));
        $('#Buy').html($.i18n.prop('Buy'));
        $('#Pass').html($.i18n.prop('Pass'));
      }
    });
  }

  function setCookie(language) {
    window.document.cookie = ("lang" + "=" + language + ";");
   
  }

  $('#language-zh').click(function () {
    changeLanguage('zh');
  })

  $('#language-en').click(function () {
    changeLanguage('en');
  })
})
