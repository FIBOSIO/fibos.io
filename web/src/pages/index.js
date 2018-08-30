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



Vue.component('Message', {
  template: `
    <div class="message">
      <p :class="['name']">
        {{message.from.name}}
      </p>
      <div class="tele-message-content-wrapper">
        <div class="tele-message-content" >
        <div v-for="content in message.messagelist" :class="!content ? 'textdiv' : ''">
        {{content}}
        </div>
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
      <div :class="isMobile ? 'hide' : 'bg'">
      <div class="top">
      <div class = "top-title">
      FIBOS 开发 电报群
      </div>
      <div class="top-member">{{members}} members</div>
      <img src="/imgs/blacklogo.png"/>
      </div>
          <div class="wrap">
            <ul class="messages" ref="messages">
              <li class="message-container" v-for="message in messages" :key="message.id">
                <Message :message="message"></Message>
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="bottom-title">
           <a @click="toTed">
          加入电报群和大神一起聊技术
            </a>
            </div>
            <img src="/imgs/toggle-collapse.png" class="bottom-img" @click="toTed"/>
          </div>

        </div>

        <img :src="imgSrc" alt="" class="toggle-btn" @click="toggleCollapseOrLink" />
      </div>
    `,
  data() {
    return {
      collapse: browser.versions.mobile,
      messages: [],
      isMobile: browser.versions.mobile,
      members: 0
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
    toTed(){
      window.open('/t.html');
    },
    pushMessage(messages, isHistory) {
      // let latestMassage = this.messages.concat(messages)
      // this.messages = latestMassage.map(function (ele) {
      //   if (ele.text) {

      //     var messagelist = ele.text.split('↵');

      //     // ele.messagelist = messagelist;
      //     alert("messagelist:"+messagelist.length)
      //     return ele
      //   }
      // });
      let latestMassage;
      if (isHistory) {
        latestMassage = messages.concat(this.messages);
      } else {
        latestMassage = this.messages.concat(messages)
      }
      this.messages = latestMassage.map(function (ele) {
        if (ele.text) {
          var escapetext = escape(ele.text)
          var escapetextlist = escapetext.split("%0A")
          var messagelist = escapetextlist.map(function (ele) {
            return unescape(ele);
          })
          ele.messagelist = messagelist;
          return ele
        }
      });

      let e = this.$refs.messages;
      scroll = e.scrollHeight - e.scrollTop;
      if (isHistory) {
        this.$nextTick(function () {
          e.scrollTop = e.scrollHeight;
        });
      }
      if (scroll >= 300 && scroll <= 600) {
        this.$nextTick(function () {
          e.scrollTop = e.scrollHeight;
        });
      }

    },
    pushMembers(data) {
      this.members = data;
    },
    initWebsocket() {

      var protocol = window.location.protocol
      var host = window.location.host

      // var message = [{
      //   text:"sadasd↵↵1111",
      //   id:1,
      //   name
      // }]
      // this.pushMessage(message);

      this.socket = new WebSocket(`${protocol.indexOf('https') >= 0 ? 'wss' : 'ws'}://${host}/1.0/push`)
      //this.socket = new WebSocket('ws://115.47.142.152:9090/1.0/push');
      //this.socket = new WebSocket('ws://fibos.io/1.0/push');

      this.socket.onmessage = e => {
        var d = JSON.parse(e.data);
        if (d.data && d.data.messages) {
          this.pushMessage(d.data.messages, d.data.isHistory);
          // if ($('ul.messages')[0].scrollHeight = $('ul.messages').scrollTop() + $(".wrap").height()) {
          //   $('ul.messages').scrollTop($('ul.messages')[0].scrollHeight)
          // }
        }
        if (d.data && d.data.members) {
          this.pushMembers(d.data.members);
        }
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

function getPrice() {
  // var protocol = window.location.protocol
  // var port = window.location.port;
  // var hostname = window.location.hostname;
  // var url = protocol + "//" + hostname + port + "/getExchangeInfo";
  $.ajax({
    type: "GET",
    data: {},
    url: '/getExchangeInfo',
    success: function (data) {
      $('#myTargetElement').text(data.price)
    },
    error: function () {
      console.log("")
    }
  })
}


$(function () {
  getPrice();
  setInterval(getPrice, 20000);
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
        $('#News').html($.i18n.prop('News'));
        $('#Download').html($.i18n.prop('Download'));
        $('#Total').html($.i18n.prop('Total'));
        $('#Rate').html($.i18n.prop('Rate'));
        var FastHeight = window.document.getElementById('Fast').scrollHeight;
        var StableHeight = window.document.getElementById('Stable').scrollHeight;
        if (language === 'zh') {
          $("#QuickDevDesc").css("font-size", "1.2rem")
          $("#GetStart").css("font-size", "1.2rem")
          $("#QuickDev").css("font-size", "2rem")
          $("#StartLearn").css("font-size", "1.3rem")
        } else {
          $("#QuickDevDesc").css("font-size", "1.1rem")
          $("#QuickDev").css("font-size", "1.6rem")
          $("#GetStart").css("font-size", "1rem")
          $("#StartLearn").css("font-size", "1rem")
        }
        $("#LessRes").css("height", FastHeight)
        $("#Security").css("height", FastHeight)
        $("#Auditable").css("height", StableHeight)
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