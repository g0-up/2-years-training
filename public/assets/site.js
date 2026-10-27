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
  var skip=d.querySelector('.skip'),metaDesc=d.querySelector('meta[name=description]');
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

  if(!('IntersectionObserver' in window)){[].forEach.call(d.querySelectorAll('.reveal'),function(el){el.classList.add('in')});return}

  // Reveal on scroll
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  [].forEach.call(d.querySelectorAll('.reveal'),function(el){ro.observe(el)});

  // Scrollspy for each view's sticky menu
  [].forEach.call(d.querySelectorAll('.nav-scroll'),function(nav){
    var links={};
    [].forEach.call(nav.querySelectorAll('a'),function(a){links[a.hash.slice(1)]=a});
    var so=new IntersectionObserver(function(es){es.forEach(function(e){
      if(!e.isIntersecting)return;
      var a=links[e.target.id]; if(!a)return;
      for(var k in links)links[k].removeAttribute('aria-current');
      a.setAttribute('aria-current','true');
      if(nav.offsetParent)nav.scrollTo({left:a.offsetLeft-nav.clientWidth/2+a.clientWidth/2,behavior:'smooth'});
    })},{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(links).forEach(function(id){var el=d.getElementById(id);if(el)so.observe(el)});
  });
})();
