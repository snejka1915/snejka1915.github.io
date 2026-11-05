(function () {
  'use strict';
  var activeKey='mcfort9669.error.active.v1';
  var lastKey='mcfort9669.error.last.v1';
  var ua=navigator.userAgent.match(/PlayStation 4[ \/]([0-9.]+)/i);
  var fw=ua?ua[1]:'не определена';
  var path=location.pathname;
  var module=path.indexOf('/rawgame4/')!==-1?'RawGame4 '+(path.indexOf('poops')!==-1?'Poops':'Lapse'):
    path.indexOf('/webkitty/')!==-1?'WebKitty':
    path.indexOf('/afterglow/')!==-1?'Afterglow':'MCFORT9669';
  var current=null, ended=false, latestLine='', panel=null, content=null, scheduled=false;
  function save(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch(e){}}
  function read(key){try{return JSON.parse(localStorage.getItem(key)||'null');}catch(e){return null;}}
  function remove(key){try{localStorage.removeItem(key);}catch(e){}}
  function clean(value){return String(value==null?'':value).replace(/[\x00-\x1f\x7f]/g,' ').slice(0,320);}
  function makePanel(){
    if(panel)return;
    var css=document.createElement('style');
    css.textContent='#hostErrorBackdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:2147483647;background:rgba(3,6,12,.94);display:flex;align-items:center;justify-content:center;padding:14px;box-sizing:border-box;color:#eef4ff;font:18px/1.4 Arial,sans-serif}#hostErrorBackdrop[hidden]{display:none!important}#hostErrorCard{width:100%;max-width:720px;max-height:94vh;overflow:auto;box-sizing:border-box;background:#111923;border:2px solid #ff9c83;border-radius:16px;padding:22px;box-shadow:0 0 36px rgba(255,96,81,.22)}#hostErrorCard h2{font-size:27px;color:#ffc1ad;margin:0 0 14px}#hostErrorCard .her-row{border-top:1px solid #36485b;padding:8px 0;overflow-wrap:break-word}#hostErrorCard b{color:#89dcff}#hostErrorCard .her-detail{white-space:pre-wrap;background:#1d2936;padding:12px;border-radius:8px;overflow-wrap:break-word}#hostErrorCard p{font-size:15px;color:#c3d0df}#hostErrorCard button{font:inherit;background:#29465b;color:white;border:1px solid #93dfff;border-radius:9px;padding:9px 18px;margin-top:5px}';
    document.head.appendChild(css);
    panel=document.createElement('div');panel.id='hostErrorBackdrop';panel.hidden=true;
    var card=document.createElement('div');card.id='hostErrorCard';card.setAttribute('role','alertdialog');card.setAttribute('aria-modal','true');card.setAttribute('aria-label','Отчёт об ошибке запуска');
    var title=document.createElement('h2');title.id='herTitle';card.appendChild(title);
    content=document.createElement('div');card.appendChild(content);
    var hint=document.createElement('p');hint.textContent='Сфотографируйте этот экран и отправьте автору хоста. Если консоль выключилась сама, отчёт показывает только последний сохранённый этап.';card.appendChild(hint);
    var close=document.createElement('button');close.type='button';close.textContent='Закрыть';close.addEventListener('click',function(){panel.hidden=true;var saved=read(lastKey);if(saved){saved.seen=true;save(lastKey,saved);}});card.appendChild(close);
    panel.appendChild(card);document.body.appendChild(panel);
  }
  function row(label,value,detail){
    var node=document.createElement('div');node.className='her-row';
    var b=document.createElement('b');b.textContent=label+': ';node.appendChild(b);
    var span=document.createElement(detail?'div':'span');span.textContent=clean(value)||'—';
    if(detail)span.className='her-detail';node.appendChild(span);content.appendChild(node);
  }
  function show(data,interrupted){
    if(!document.body)return;
    makePanel();content.textContent='';
    document.getElementById('herTitle').textContent=interrupted?'Предыдущий запуск прервался':'Ошибка запуска';
    row('Прошивка PS4',data.fw||fw);
    row('Модуль',data.module||module);
    row('Последний этап',data.stage||'Не определён');
    row('Сообщение',interrupted?'Консоль или браузер закрылись до подтверждения результата. Точная причина неизвестна.':data.message||'Ошибка без подробностей',true);
    if(data.detail&&data.detail!==data.message)row('Строка журнала',data.detail,true);
    row('Время',data.time||'—');
    panel.hidden=false;
  }
  function writeActive(){if(current)save(activeKey,current);}
  function start(name){
    ended=false;
    var previous=read(lastKey);if(previous&&previous.seen===false){previous.seen=true;save(lastKey,previous);}
    current={fw:fw,module:name||module,stage:'Запуск модуля',message:'',detail:'',time:new Date().toLocaleString('ru-RU')};
    latestLine='';writeActive();
  }
  function stage(value){
    if(!current||!value)return;
    value=clean(value);
    if(current.stage===value)return;
    current.stage=value;writeActive();
  }
  function onLog(value,color){
    var line=clean(value);if(!line)return;
    latestLine=line;
    if(current && /^(?:stage|step)\b/i.test(line))stage(line);
    if(current&&(color==='red'||/^(?:Error:|FAILED\b|THREW\b)/i.test(line)))fail(line);
  }
  function fail(message,detail){
    if(ended)return;
    if(!current)start(module);
    current.message=clean(message)||'Ошибка без подробностей';
    current.detail=clean(detail||latestLine);
    current.time=new Date().toLocaleString('ru-RU');
    current.seen=false;save(lastKey,current);remove(activeKey);show(current,false);
    current=null;ended=true;
  }
  function success(){current=null;ended=true;remove(activeKey);}
  function restore(){
    var saved=read(activeKey);
    if(saved&&saved.fw&&saved.module){
      remove(activeKey);
      saved.seen=false;save(lastKey,saved);
      show(saved,true);
    }else{var last=read(lastKey);if(last&&last.seen===false)show(last,false);}
  }
  function scan(){
    scheduled=false;
    if(!current)return;
    var state=document.getElementById('state');
    var msg=document.getElementById('msg');
    var out=document.getElementById('out')||document.getElementById('console');
    var value=state&&clean(state.textContent);
    if(value)stage(value);
    if(out){
      var line=out.lastElementChild;
      if(line&&line!==panel){
        latestLine=clean(line.textContent);
        if(module==='WebKitty'&&line.style&&line.style.color==='red'){fail(latestLine);return;}
      }
    }
    if(module.indexOf('RawGame4')===0&&value==='ALL DONE'){success();return;}
    if(module.indexOf('RawGame4')===0&&
       (/(?:REBOOT NEEDED|ROOT .* NO REBOOT|REPAIRED --)/i.test(value))){fail('GoldHEN не запущен: '+value,latestLine);return;}
    if(state&&/\b(?:bad|fail)\b/i.test(state.className||'')){fail(value||'Сбой модуля',latestLine);return;}
    if(document.body&&/\bfail\b/.test(document.body.className||'')&&module==='Afterglow'){
      fail(msg&&msg.textContent||value||'Ошибка Afterglow',latestLine);
    }
  }
  function schedule(){if(scheduled)return;scheduled=true;setTimeout(scan,120);}
  function watch(){
    if(!document.body||!window.MutationObserver)return;
    var observer=new MutationObserver(schedule);
    ['state','msg','out','console'].forEach(function(id){
      var el=document.getElementById(id);
      if(el)observer.observe(el,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class']});
    });
    if(module==='Afterglow')observer.observe(document.body,{attributes:true,attributeFilter:['class']});
  }
  window.hostErrorReport={start:start,stage:stage,onLog:onLog,fail:fail,success:success,restore:restore};
  window.addEventListener('error',function(e){if(current)fail(e.message||'Ошибка JavaScript');});
  window.addEventListener('unhandledrejection',function(e){if(current)fail(e.reason&&e.reason.message||e.reason||'Необработанная ошибка');});
  function boot(){
    makePanel();watch();
    if(module==='RawGame4 Lapse'||module==='RawGame4 Poops'){
      var once='';try{once=sessionStorage.getItem('mcfort9669.route.once')||'';}catch(e){}
      if(once==='rawgame4/'+path.split('/').pop())start(module);
      else restore();
    }
    else if(module==='Afterglow'&&/afterglow=run/.test(location.search)&&document.referrer)start(module);
    else if(module==='WebKitty'){
      if(path.indexOf('/exploit.html')!==-1)start(module);
      else {restore();['ps-logo-container','exploitRun'].forEach(function(id){
        var el=document.getElementById(id);
        if(el)el.addEventListener('click',function(){start(module);});
      });}
    }
  }
  if(document.body)boot();
  else document.addEventListener('DOMContentLoaded',boot);
})();
