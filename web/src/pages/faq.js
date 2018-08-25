import 'common';
import '../js/jquery.i18n.properties'

$(function () {
    var localLanguage = localStorage.getItem("fibosLanguage")
    if (localLanguage) {
      changeLanguage(JSON.parse(localLanguage))
    } else {
      changeLanguage('zh');
    }
    
    function changeLanguage(language) {
      localStorage.setItem('fibosLanguage', JSON.stringify(language))
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
        }
      });
    }
  
  
    $('#language-zh').click(function () {
      changeLanguage('zh');
    })
  
    $('#language-en').click(function () {
      changeLanguage('en');
    })
  })
  