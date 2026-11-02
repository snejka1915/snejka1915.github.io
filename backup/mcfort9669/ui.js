(function () {
  'use strict';
  var $=function(id){return document.getElementById(id);};
  var demo=/(?:\?|&)demo=1(?:&|$)/.test(location.search), cache=window.applicationCache;
  var ua=navigator.userAgent.match(/PlayStation 4[ /]([\d.]+)/i), firmware=ua?ua[1]:null;
  var compatible=firmware==='13.02', ready=false, started=false, finished=false, frame=null;
  var startTime=0, timer=null, warningTimer=null, received=0, logs=[], lastMessage='', payloadSeen=false, activeStep=0, reused=false;

  var statsKey='alizhon.ps4.1302.stats.v1',stats={success:0,failure:0,interrupted:0,pending:null},storageOK=true,runId=null,counted=false;
  function number(v){return typeof v==='number'&&isFinite(v)&&v>=0?Math.min(999999,Math.floor(v)):0;}
  function showStats(){ $('successCount').textContent=String(stats.success);$('failureCount').textContent=String(stats.failure);$('interruptedCount').textContent=String(stats.interrupted);$('statsHint').textContent=demo?'Демо не меняет статистику':storageOK?'На этой PS4':'Сохранение недоступно'; }
  function saveStats(){try{window.localStorage.setItem(statsKey,JSON.stringify(stats));}catch(e){storageOK=false;}showStats();}
  function readStats(){try{var saved=JSON.parse(window.localStorage.getItem(statsKey)||'null');if(saved&&typeof saved==='object')stats={success:number(saved.success),failure:number(saved.failure),interrupted:number(saved.interrupted),pending:saved.pending&&typeof saved.pending.id==='string'?saved.pending:null};}catch(e){storageOK=false;}if(!demo&&compatible&&stats.pending){stats.interrupted=number(stats.interrupted+1);stats.pending=null;saveStats();}showStats();}
  function beginAttempt(){if(demo)return;runId=String(Date.now())+'-'+Math.random().toString(16).slice(2);counted=false;stats.pending={id:runId,at:Date.now()};saveStats();}
  function finishStats(result){if(demo||counted||!runId)return;counted=true;if(reused){if(stats.pending&&stats.pending.id===runId)stats.pending=null;saveStats();return;}if(result==='success')stats.success=number(stats.success+1);else stats.failure=number(stats.failure+1);if(stats.pending&&stats.pending.id===runId)stats.pending=null;saveStats();}
  function journal(open){if(open)window.hostPanels.close(false);$('journal').hidden=!open;window.hostJournal.render(logs,received);$('journalToggle').setAttribute('aria-expanded',open?'true':'false');if(open)$('journalClose').focus();else $('journalToggle').focus();}
  function status(title,description){$('statusTitle').textContent=title;$('statusDescription').textContent=description;}
  function notice(text,kind){$('notice').textContent=text;$('notice').className='notice show'+(kind?' '+kind:'');}
  function log(text,kind){if(!text||text===lastMessage)return;lastMessage=text;logs.push({text:text,kind:kind||''});if(logs.length>70)logs.shift();received++;window.hostJournal.render(logs,received);$('logCount').textContent=String(received);}
  function step(n,state){var el=$('step'+n);if(!el)return;el.className=state||'';el.querySelector('em').textContent=state==='done'?'Готово':state==='active'?'В работе':state==='failed'?'Ошибка':'Ожидание';if(state==='active')activeStep=n;}
  function progress(percent,text){$('cacheFill').style.width=Math.max(0,Math.min(100,percent))+'%';$('cachePercent').textContent=Math.round(percent)+'%';if(text)$('cacheText').textContent=text;}
  function stopAnimation(){document.body.classList.remove('running');clearInterval(timer);clearTimeout(warningTimer);}
  function fail(title,description){if(finished)return;finished=true;finishStats('failure');stopAnimation();document.body.classList.add('error-state');$('launch').textContent='Запуск\nне завершён';status('Запуск не завершён','Откройте журнал для подробностей.');step(activeStep||3,'failed');$('buttonHint').textContent='Повторный запуск заблокирован';notice('Перед новой попыткой перезапустите PS4.','error');log(description,'bad');}
  function cacheReady(reason){ready=true;progress(100,'Файлы готовы');$('cacheProgress').hidden=true;step(2,'done');if(started)return;if(!compatible&&!demo)return;status('Готово к запуску','Нажмите кнопку «ВЗЛОМ».');$('launch').disabled=false;$('buttonHint').textContent='Нажмите кнопку один раз';if(reason)log(reason,'good');$('launch').focus();}
  function complete(){if(finished)return;finished=true;finishStats('success');stopAnimation();document.body.classList.add('done-state');$('launch').textContent=reused?'Взлом\nактивен':'Взлом\nактивирован';step(3,'done');step(4,'done');step(5,'done');status(reused?'Взлом уже активирован':'Запуск завершён',reused?'Повторное обращение не меняет статистику.':'GoldHEN — запуск подтверждён загрузчиком.');$('buttonHint').textContent='Готово';notice(demo?'Демонстрация. Реальный запуск не выполнялся.':'');log(demo?'[DEMO] Демонстрация завершена.':'[HOST] Получено итоговое подтверждение загрузчика.','good');}
  function processLine(text){
    if(finished||!started||typeof text!=='string')return;
    if(text.length>400)text=text.slice(0,400);
    var bad=/^(THREW|KPATCH-FETCH-THREW|PAYLOAD-FETCH-THREW)\b/.test(text);
    var interesting=/^(BUILD|FW |FW-STATUS|PRIMITIVE-OK|JB-ALREADY|JB-RELAUNCH|KPATCH-BLOB|PAYLOAD-BLOB|PAYLOAD-RUN|EG-VERDICT|PROOF-SUMMARY-FINAL|THREW|KPATCH-FETCH-THREW|PAYLOAD-FETCH-THREW)\b/.test(text)||/^PROOF-(?:OK|FAIL)\s+(?:PAYLOAD-RUNNING|eg-krw-ok|kernel-table-present|kpatch-table-present|payload-table-present|.*kpatch.*|.*jailbreak.*)/i.test(text);
    if(interesting)log(text,bad?'bad':/^PROOF-OK|PRIMITIVE-OK/.test(text)?'good':'');
    if(/^JB-ALREADY\b/.test(text)||/^EG-VERDICT\b.*(?:kpatched=already|reused=1)\b/.test(text)){reused=true;document.body.classList.add('reused-state');$('launch').textContent='Взлом\nактивен';finishStats('reused');log('[HOST] Система уже взломана. Повторное обращение не учитывается в статистике.','warn');}
    if(/^PRIMITIVE-OK\b/.test(text)){step(3,'done');step(4,'active');status('Выполняется системный этап','WebKit пройден. Подготавливаем систему.');}
    if(/^PAYLOAD-BLOB\b/.test(text)){status('Подготовка GoldHEN','Файл GoldHEN прочитан. Ожидаем запуска.');}
    if(/^PAYLOAD-RUN\b/.test(text)){step(4,'done');step(5,'active');status('Запускается GoldHEN','Ожидаем итоговое сообщение загрузчика.');}
    if(/^PROOF-OK\s+PAYLOAD-RUNNING\b/.test(text)||/^EG-VERDICT\b.*payload_running=1\b/.test(text))payloadSeen=true;
    if(bad){fail('Загрузчик сообщил об ошибке',text);return;}
    if(/^PROOF-SUMMARY-FINAL\b/.test(text)){
      if(payloadSeen){if(/\bfail=[1-9]/.test(text))log('В журнале есть предупреждения: проверьте результат на консоли.','warn');complete();}
      else fail('Запуск не подтверждён','Загрузчик закончил работу без подтверждённого запуска GoldHEN. Смотрите журнал.');
    }
  }
  function updateClock(){var seconds=Math.floor((Date.now()-startTime)/1000);$('elapsed').textContent=('0'+Math.floor(seconds/60)).slice(-2)+':'+('0'+seconds%60).slice(-2);}
  function startDemo(){var events=[['PRIMITIVE-OK',1500],['PROOF-OK eg-krw-ok',3000],['PAYLOAD-BLOB file=goldhen.bin bytes=293120',4200],['PAYLOAD-RUN pthread_create=0',5600],['PROOF-OK PAYLOAD-RUNNING rc=0',6500],['EG-VERDICT payload_running=1',6800],['PROOF-SUMMARY-FINAL pass=54 fail=0',7500]];for(var i=0;i<events.length;i++)(function(e){setTimeout(function(){processLine(e[0]);},e[1]);})(events[i]);}
  function launch(){
    if(started)return;
    if(!demo&&!compatible){notice('Запуск разрешён только в браузере PlayStation 4 с прошивкой 13.02-13.52. Для просмотра оформления на компьютере откройте адрес с ?demo=1.','warn');return;}
    if(!ready){notice('Дождитесь полного сохранения кэша.','warn');return;}
    window.hostPanels.close(false);window.hostJournal.close();started=true;beginAttempt();startTime=Date.now();$('launch').disabled=true;document.body.classList.add('running');$('launch').textContent='Взлом\nв процессе…';$('buttonHint').textContent='Не нажимайте повторно';status('Выполняется ВЗЛОМ','Выполняется WebKit. Пожалуйста, подождите.');step(3,'active');log(demo?'[DEMO] Только анимация и тестовые статусы.':'[HOST] Запуск цепочки для PS4 13.02.');timer=setInterval(updateClock,1000);
    warningTimer=setTimeout(function(){if(!finished)notice('Запуск длится дольше обычного. Не запускайте вторую копию.','warn');},120000);
    if(demo){startDemo();return;}
    frame=document.createElement('iframe');frame.className='engine-frame';frame.title='PS4 13.02 engine';frame.src='engine/launch.html?log=1';$('engineMount').appendChild(frame);
  }
  window.addEventListener('message',function(e){
    if(!frame||e.source!==frame.contentWindow||e.origin!==location.origin||!e.data||e.data.type!=='personal-host-status')return;
    if(e.data.error){fail('Ошибка модуля',String(e.data.error));return;}
    if(e.data.line)processLine(e.data.line);
  });
  $('launch').addEventListener('click',launch);
  $('journalToggle').addEventListener('click',function(){journal($('journal').hidden);});
  $('journalClose').addEventListener('click',function(){journal(false);});
  window.addEventListener('keydown',function(e){if((e.key==='Escape'||e.keyCode===27)&&!$('journal').hidden)journal(false);});
  function init(){
    readStats();step(1,'active');
    if(demo){$('demoBanner').hidden=false;step(1,'done');cacheReady('[DEMO] Кэш и прошивка имитируются. Нажмите «ВЗЛОМ».');return;}
    if(!ua){step(1,'failed');status('Откройте хост на PS4','Для PlayStation 4 с прошивкой 13.02-13.52.');$('buttonHint').textContent='';$('launch').disabled=false;log('[HOST] Браузер PS4 не обнаружен. Запуск отключён.','warn');return;}
    $('fwBadge').textContent='FW 13.02-13.52';
    if(!compatible){step(1,'failed');status('Нужна прошивка 13.02','Обнаружена '+firmware+'. Этот комплект подготовлен только для PS4 13.02.');notice('Не запускайте файлы от другой прошивки.','error');return;}
    step(1,'done');step(2,'active');log('[HOST] Обнаружена PS4 с прошивкой 13.02.','good');
    if(!cache){status('Офлайн-кэш недоступен','Браузер не предоставил AppCache. Установка офлайн-хоста не подтверждена.');notice('Откройте страницу в штатном браузере PS4. Если AppCache недоступен, этот комплект нельзя считать сохранённым офлайн.','error');step(2,'failed');return;}
    var available=cache.status===1||cache.status===4;
    if(available)cacheReady('[CACHE] Найден сохранённый офлайн-хост.');else{$('cacheProgress').hidden=false;status('Загрузка файлов','Дождитесь окончания загрузки. Интернет пока нужен.');}
    cache.addEventListener('checking',function(){if(!started&&ready)log('[CACHE] Проверка обновлений.');});
    cache.addEventListener('downloading',function(){if(started){log('[CACHE] Обновление скачивается; примените его после перезапуска браузера.','warn');return;}ready=false;$('launch').disabled=true;$('cacheProgress').hidden=false;step(2,'active');status('Загрузка файлов','Сохраняем файлы для автономной работы. Не закрывайте страницу.');});
    cache.addEventListener('progress',function(e){if(started)return;if(e.lengthComputable&&e.total)progress(Math.min(99,e.loaded/e.total*100),'СОХРАНЕНИЕ ФАЙЛОВ');else{$('cachePercent').textContent='…';}});
    cache.addEventListener('cached',function(){cacheReady('[CACHE] Все файлы сохранены.');notice('Файлы готовы. Закройте браузер и откройте хост без интернета.');});
    cache.addEventListener('noupdate',function(){cacheReady('[CACHE] Сохранённая версия актуальна.');});
    cache.addEventListener('updateready',function(){if(started){log('[CACHE] Новая версия готова. Примените после завершения и перезапуска браузера.','warn');return;}ready=false;$('launch').disabled=true;status('Обновление кэша готово','Закройте и снова откройте браузер.');notice('Новая версия загружена. Перезапустите браузер.');try{cache.swapCache();}catch(e){log('[CACHE] '+e.message,'warn');}});
    cache.addEventListener('error',function(){if(started){log('[CACHE] Проверка обновления недоступна; текущий запуск продолжается.','warn');return;}if(cache.status===1||ready){cacheReady('[CACHE] Обновление недоступно. Используется сохранённая версия.');}else{status('Не удалось сохранить кэш','Проверьте интернет и комплект файлов хоста.');step(2,'failed');notice('Проверьте размещение файлов. Подробности — в инструкции.','error');}});
    cache.addEventListener('obsolete',function(){if(!started){ready=false;$('launch').disabled=true;step(2,'failed');status('Кэш хоста удалён','Манифест больше недоступен на сервере. Восстановите комплект файлов и установите кэш заново.');}});
  }
  init();
})();
