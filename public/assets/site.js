(function(){
  var d=document; d.documentElement.classList.add('js');

  // Tabs (WAI-ARIA: click + arrow keys)
  var tabs=[].slice.call(d.querySelectorAll('[role=tab]'));
  function select(t,focus){
    tabs.forEach(function(x){
      var on=x===t; x.setAttribute('aria-selected',on); x.tabIndex=on?0:-1;
      d.getElementById(x.getAttribute('aria-controls')).hidden=!on;
    });
    if(focus)t.focus();
    try{localStorage.setItem('track',t.id)}catch(e){}
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t)});
    t.addEventListener('keydown',function(e){
      var k=e.key,n=null;
      if(k==='ArrowRight')n=tabs[(i+1)%tabs.length];
      else if(k==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];
      else if(k==='Home')n=tabs[0]; else if(k==='End')n=tabs[tabs.length-1];
      if(n){e.preventDefault();select(n,true)}
    });
  });
  try{var s=d.getElementById(localStorage.getItem('track')||'');if(s&&tabs.indexOf(s)>-1)select(s)}catch(e){}

  // Router: one page, one view per roadmap path. Shared modules move into the active view's slots.
  // Standalone pages (no .view) skip routing and keep only the shared behaviour below.
  var views=[].slice.call(d.querySelectorAll('.view')),progLinks=[].slice.call(d.querySelectorAll('[data-view]'));
  if(views.length){
  var skip=d.querySelector('.skip'),metaDesc=d.querySelector('meta[name=description]'),pick=d.getElementById('dk-lo-trinh');
  function norm(p){return p.replace(/\/index\.html$/,'/').replace(/\/+$/,'')||'/'}
  function byPath(p){p=norm(p);for(var i=0;i<views.length;i++)if(views[i].getAttribute('data-path')===p)return views[i];return views[0]}
  function viewOf(el){while(el&&!(el.classList&&el.classList.contains('view')))el=el.parentNode;return el}
  var current=null;
  function show(v){
    current=v;
    views.forEach(function(x){x.hidden=x!==v});
    [].forEach.call(v.querySelectorAll('[data-slot]'),function(slot){
      var m=d.getElementById(slot.getAttribute('data-slot')); if(!m)return;
      slot.appendChild(m);
      var w=m.querySelector('.mod-when'); if(w)w.textContent=slot.getAttribute('data-when')||'';
    });
    progLinks.forEach(function(a){if(a.closest('.prog')){if(a.getAttribute('data-view')===v.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')}});
    d.title=v.getAttribute('data-title'); metaDesc.setAttribute('content',v.getAttribute('data-desc'));
    skip.setAttribute('href','#'+v.getAttribute('data-main'));
    // the sign-up form suggests the route being viewed until the visitor picks one
    if(pick&&!pick.hasAttribute('data-touched'))pick.value=v.getAttribute('data-route')||'';
  }
  function toHash(){var t=location.hash&&d.getElementById(decodeURIComponent(location.hash.slice(1)));if(t)t.scrollIntoView()}
  // A hash that only exists inside another view (e.g. "#chang-1" on "/2-thang") wins over the path,
  // and the URL is corrected so later back/forward resolves to the same view.
  function resolve(){
    var v=byPath(location.pathname),t=location.hash&&d.getElementById(decodeURIComponent(location.hash.slice(1)));
    var tv=t&&viewOf(t);
    if(tv&&tv!==v){v=tv;try{history.replaceState(null,'',v.getAttribute('data-path')+location.hash)}catch(err){}}
    return v;
  }
  show(resolve()); toHash();
  progLinks.forEach(function(a){
    a.addEventListener('click',function(e){
      if(e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
      var v=d.getElementById(a.getAttribute('data-view')); if(!v)return;
      e.preventDefault();
      try{history.pushState(null,'',v.getAttribute('data-path'))}catch(err){}
      show(v); window.scrollTo(0,0);
    });
  });
  // In-page anchors also fire popstate; only act when the URL points at another view.
  window.addEventListener('popstate',function(){
    var v=resolve(); if(v===current)return;
    show(v); if(location.hash)toHash(); else window.scrollTo(0,0);
  });
  }

  // Sign-up form: posts to the Google Apps Script web app in its action. The reply is opaque (no-cors), so the page
  // can only confirm the request was sent; the script validates every field again. Without fetch, the form posts natively.
  var reg=d.getElementById('dang-ky-form');
  if(reg&&window.fetch&&window.URLSearchParams&&window.FormData){
    reg.noValidate=true;
    var regStatus=d.getElementById('dk-status'),regBtn=reg.querySelector('[type=submit]'),regLabel=regBtn.textContent;
    var SENT='Đã nhận thông tin của bạn. UpNext sẽ liên hệ qua số điện thoại bạn vừa để lại.',
        FAILED='Chưa gửi được, có thể do mạng không ổn định. Bạn thử gửi lại sau ít phút nhé.';
    var rules={
      ten:function(v){return v.trim().length>=2||'Nhập họ tên của bạn.'},
      sdt:function(v){return /^(0|\+?84)[35789]\d{8}$/.test(v.replace(/[\s.()-]/g,''))||'Số điện thoại chưa đúng, ví dụ 0912 345 678.'},
      email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())||'Email chưa đúng, ví dụ ten@gmail.com.'}
    };
    var fields=Object.keys(rules).map(function(n){return reg.elements[n]});
    function check(f){
      var r=rules[f.name](f.value);
      d.getElementById(f.id+'-err').textContent=r===true?'':r;
      if(r===true)f.removeAttribute('aria-invalid');else f.setAttribute('aria-invalid','true');
      return r===true;
    }
    function say(msg,failed){regStatus.textContent=msg;regStatus.classList.toggle('err',!!failed)}
    function sent(){fields.forEach(function(f){f.value=''});say(SENT)}
    fields.forEach(function(f){f.addEventListener('input',function(){if(f.hasAttribute('aria-invalid'))check(f)})});
    reg.elements.lo_trinh.addEventListener('change',function(){this.setAttribute('data-touched','')});
    reg.addEventListener('submit',function(e){
      e.preventDefault();
      if(regBtn.disabled)return;
      var bad=fields.filter(function(f){return !check(f)});
      if(bad.length){say('');bad[0].focus();return}
      if(reg.elements.website.value){sent();return} // only bots fill the hidden field: drop it, look normal
      var url=reg.getAttribute('action');
      if(!url){console.warn('dang-ky-form: action is empty, paste the Apps Script web app URL');say(FAILED,true);return}
      reg.elements.trang.value=location.pathname;
      regBtn.disabled=true;regBtn.textContent='Đang gửi…';say('');
      fetch(url,{method:'POST',mode:'no-cors',body:new URLSearchParams(new FormData(reg))})
        .then(sent,function(){say(FAILED,true)})
        .then(function(){regBtn.disabled=false;regBtn.textContent=regLabel});
    });
  }

  if(!('IntersectionObserver' in window)){[].forEach.call(d.querySelectorAll('.reveal'),function(el){el.classList.add('in')});return}

  // Reveal on scroll
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  [].forEach.call(d.querySelectorAll('.reveal'),function(el){ro.observe(el)});

  // Scrollspy for each view's sticky menu: the active link is the last target, in menu order, whose top has
  // passed 40% of the viewport. Works when targets nest (a block inside a section) or are shorter than the screen.
  var spies=[].map.call(d.querySelectorAll('.nav-scroll'),function(nav){
    var items=[].map.call(nav.querySelectorAll('a'),function(a){return {a:a,el:d.getElementById(a.hash.slice(1))}}).filter(function(i){return i.el});
    var active;
    return function(){
      if(!nav.offsetParent)return; // menu of a hidden view
      var line=window.innerHeight*.4,a=null;
      items.forEach(function(i){if(i.el.getClientRects().length&&i.el.getBoundingClientRect().top<=line)a=i.a});
      if(a===active)return;
      active=a;
      items.forEach(function(i){i.a.removeAttribute('aria-current')});
      if(!a)return;
      a.setAttribute('aria-current','true');
      nav.scrollTo({left:a.offsetLeft-nav.clientWidth/2+a.clientWidth/2,behavior:'smooth'});
    };
  });
  var spyQueued=false;
  function spy(){if(spyQueued)return;spyQueued=true;requestAnimationFrame(function(){spyQueued=false;spies.forEach(function(f){f()})})}
  window.addEventListener('scroll',spy,{passive:true}); window.addEventListener('resize',spy); spy();
})();
