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
        <div :class="isMobile ? 'hide' : 'bg'">
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
      messages: [],
      isMobile: browser.versions.mobile
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
      if (scroll >= 440 && scroll <= 600) {
        this.$nextTick(function() {
          e.scrollTop = e.scrollHeight;
        });
      }
    },
    initWebsocket() {
      // this.socket = new WebSocket('ws://115.47.142.152:8080/1.0/push');
      this.socket = new WebSocket(
        `ws://${window.location.hostname}:8080/1.0/push`
      );
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

$(document).ready(() => {
  function hack() {
    Object.assign(Eos.modules.json.schema, {
      retire: {
        base: '',
        action: {
          name: 'retire',
          account: 'eosio.token'
        },
        fields: {
          quantity: 'asset',
          memo: 'string'
        }
      },
      close: {
        base: '',
        action: {
          name: 'close',
          account: 'eosio.token'
        },
        fields: {
          owner: 'account_name',
          symbol: 'symbol'
        }
      },
      excreate: {
        base: '',
        action: {
          name: 'excreate',
          account: 'eosio.token'
        },
        fields: {
          issuer: 'account_name',
          maximum_supply: 'asset',
          maximum_exchange: 'asset',
          connector_weight: 'float64',
          reserve_supply: 'asset',
          reserve_balances: 'asset',
          buy_fee_rate: 'float64',
          sell_fee_rate: 'float64',
          can_issue: 'bool'
        }
      },
      exissue: {
        base: '',
        action: {
          name: 'exissue',
          account: 'eosio.token'
        },
        fields: {
          to: 'account_name',
          quantity: 'extended_asset',
          memo: 'string'
        }
      },
      extransfer: {
        base: '',
        action: {
          name: 'extransfer',
          account: 'eosio.token'
        },
        fields: {
          from: 'account_name',
          to: 'account_name',
          quantity: 'extended_asset',
          memo: 'string'
        }
      },
      exretire: {
        base: '',
        action: {
          name: 'exretire',
          account: 'eosio.token'
        },
        fields: {
          quantity: 'extended_asset',
          memo: 'string'
        }
      },
      exclose: {
        base: '',
        action: {
          name: 'exclose',
          account: 'eosio.token'
        },
        fields: {
          owner: 'account_name',
          symbol: 'extended_symbol'
        }
      },
      exdestroy: {
        base: '',
        action: {
          name: 'exdestroy',
          account: 'eosio.token'
        },
        fields: {
          owner: 'account_name',
          symbol: 'extended_symbol'
        }
      },
      exchange: {
        base: '',
        action: {
          name: 'exchange',
          account: 'eosio.token'
        },
        fields: {
          owner: 'account_name',
          quantity: 'extended_asset',
          to: 'extended_asset',
          memo: 'string'
        }
      }
    });
  }

  hack();

  const eosHttpEndPoint = 'http://193.93.219.219:8888';
  const eosChainId =
    '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca';

  const EosClient = privitekey =>
    Eos({
      chainId: eosChainId,
      httpEndpoint: eosHttpEndPoint,
      keyProvider: privitekey,
      expireInSeconds: 60,
      broadcast: true,
      verbose: false,
      sign: true,
      logger: {
        log: null,
        error: null
      }
    });

  var easingFn = function(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc * ts + -5 * ts * ts + 10 * tc + -10 * ts + 5 * t);
  };
  var options = {
    useEasing: true,
    easingFn: easingFn,
    useGrouping: true,
    separator: ',',
    decimal: '.'
  };

  var myCountUp = new CountUp('myTargetElement', 0, 0, 4, 2.5, options);

  if (!myCountUp.error) {
    myCountUp.start();
  } else {
    console.error(myCountUp.error);
  }

  eosjs_ecc.randomKey().then(pr => {
    const pb = eosjs_ecc.privateToPublic(pr);

    EosClient(pr)
      .getTableRows(true, 'eosio.token', 'gulou', 'stat')
      .then(data => {
        const row = [
          {
            supply: '0.0000 FO',
            max_supply: '100000000000.0000 FO',
            issuer: 'eosio',
            max_exchange: '10000000000.0000 FO',
            connector_weight: '0.14999999999999999',
            connector_balances: '90000.0000 EOS',
            reserve_supply: '30000.0000 FO',
            reserve_balances: '90000.0000 EOS',
            buy_fee_rate: '0.00000000000000000',
            sell_fee_rate: '0.00000000000000000',
            can_issue: 1
          }
        ];

        row.forEach((item, index) => {
          if (!!item && item.supply && item.supply.indexOf('FO') >= 0) {
            const {
              connector_weight,
              connector_balances,
              reserve_supply,
              supply
            } = item;
            const supply_numStr = supply.split(' FO')[0];
            let supply_numPre = 0;
            if (!!supply_numStr && supply_numStr.split('.').length >= 2) {
              supply_numPre = supply_numStr.split('.')[1].length;
            }
            const b_supply = new BigNumber(supply_numStr);
            const b_reserve_supply = new BigNumber(
              reserve_supply.split(' FO')[0]
            );
            const b_cw = new BigNumber(connector_weight);
            const b_balances = new BigNumber(
              connector_balances.split(' EOS')[0]
            );

            const price = b_balances
              .div(b_cw.times(b_reserve_supply.plus(b_supply)))
              .toFixed(supply_numPre, 4);
            console.log('price', price);

            myCountUp.update(price);
          }
        });
        console.log('data', data);
      })
      .catch(error => {
        console.log('error', error);
      });
  });
});
