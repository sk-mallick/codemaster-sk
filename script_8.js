(()=>{
const host=document.getElementById('alt'),sr=host.attachShadow({mode:'open'});
sr.innerHTML='<style>'+"\n:host{display:block}\n:host([hidden]){display:none}\n*{box-sizing:border-box}\na{color:inherit;text-decoration:none}\nh1,h2,h3,p,ul,pre{margin:0}ul{padding:0;list-style:none}\nimg{display:block}\n[id]{scroll-margin-top:0}\n.rv{opacity:0}\n.rv.in{opacity:1;animation:rvin .75s cubic-bezier(.16,1,.3,1) var(--d,0s) both}\n@keyframes rvin{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}\n.acts{display:flex;gap:10px;flex-wrap:wrap}\n/* ===== recruiter: profile / CV ===== */\n.rec{--bg:#f2f4f8;--ink:#0f1c2e;--mut:#55647a;--ln:#d9e0ea;--ac:#2f6fed;--acd:#1b4bb0;background:var(--bg) repeating-linear-gradient(0deg,transparent 0 31px,#0f1c2e08 31px 32px);color:var(--ink);font:16px/1.65 Inter,system-ui,-apple-system,\"Segoe UI\",sans-serif;min-height:100vh}\n.rec .wr{width:min(1120px,calc(100% - 36px));margin:auto}\n.rec .bar{position:fixed;top:0;left:0;height:3px;width:0;background:var(--ac);z-index:40}\n.rec .top{position:sticky;top:0;z-index:30;background:#f2f4f8e8;backdrop-filter:blur(12px);border-bottom:1px solid var(--ln)}\n.rec .top .wr{display:flex;align-items:center;gap:22px;height:62px}\n.rec .brand{font:700 1.05rem Georgia,\"Iowan Old Style\",serif;margin-right:auto}\n.rec .top nav{display:flex;gap:22px;font-size:.88rem;font-weight:600;color:var(--mut)}\n.rec .top nav a:hover{color:var(--acd)}\n.rec .cta,.rec .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:9px;font-weight:700;font-size:.9rem;border:1px solid var(--ln);background:#fff;transition:transform .2s,box-shadow .2s}\n.rec .cta,.rec .btn.p{background:var(--ac);color:#fff;border-color:var(--ac)}\n.rec .cta{min-height:38px;padding:0 16px}\n.rec .btn:hover,.rec .cta:hover{transform:translateY(-2px);box-shadow:0 8px 20px #2f6fed33}\n.rec .page{display:grid;grid-template-columns:300px 1fr;gap:34px;padding:42px 0 64px;align-items:start}\n.rec .side{position:sticky;top:86px;background:#fff;border:1px solid var(--ln);border-radius:16px;padding:22px;display:grid;gap:14px}\n.rec .ph{aspect-ratio:1/1.05;max-width:300px;border-radius:12px;overflow:hidden;background:#e1eafa;display:grid;place-items:center;font:700 3rem Georgia,serif;color:var(--acd)}\n.rec .ph img{width:100%;height:100%;object-fit:cover}\n.rec .side h1{font:700 1.55rem/1.15 Georgia,\"Iowan Old Style\",serif}\n.rec .role{color:var(--mut);font-size:.95rem;margin-top:-8px}\n.rec .av{display:inline-flex;align-items:center;gap:8px;font-size:.8rem;font-weight:700;color:#1f7a48;background:#e6f6ec;border-radius:99px;padding:5px 12px;justify-self:start}\n.rec .av:before{content:\"\";width:8px;height:8px;border-radius:50%;background:#269a58;animation:pls 1.8s infinite}\n@keyframes pls{50%{box-shadow:0 0 0 6px #269a5826}}\n.rec .ct{display:grid;border-top:1px solid var(--ln);padding-top:6px}\n.rec .ct a{display:flex;justify-content:space-between;gap:10px;padding:9px 0;font-size:.86rem;border-bottom:1px solid #eef1f6}\n.rec .ct a:hover{color:var(--acd)}\n.rec .ct small{color:var(--mut);font-size:.8rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n.rec .edu{font-size:.85rem;color:var(--mut)}\n.rec section{background:#fff;border:1px solid var(--ln);border-radius:16px;padding:28px 30px;margin-bottom:18px}\n.rec h2{display:flex;align-items:center;gap:14px;font:700 1.45rem Georgia,\"Iowan Old Style\",serif;margin-bottom:18px}\n.rec h2:after{content:\"\";flex:1;height:1px;background:var(--ln)}\n.rec p.sm{color:#33445c;max-width:68ch}\n.rec .kp{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}\n.rec .kp div{border-left:3px solid var(--ac);padding:2px 0 2px 14px}\n.rec .kp b{display:block;font:700 1.9rem/1.1 Georgia,serif}\n.rec .kp span{font-size:.8rem;color:var(--mut)}\n.rec .tl{border-left:2px solid var(--ln);margin-left:6px;display:grid;gap:24px}\n.rec .tl>div{position:relative;padding-left:24px}\n.rec .tl>div:before{content:\"\";position:absolute;left:-8px;top:7px;width:14px;height:14px;border-radius:50%;background:var(--ac);box-shadow:0 0 0 4px #fff}\n.rec .tl h3{font-size:1.08rem}\n.rec .tl small{display:inline-block;font-size:.76rem;font-weight:700;color:var(--acd);background:#e1eafa;border-radius:6px;padding:2px 9px;margin:6px 0}\n.rec .tl p{color:#33445c;font-size:.93rem;margin-bottom:6px}\n.rec .tl a{font-weight:700;font-size:.86rem;color:var(--acd);border-bottom:1px solid currentColor}\n.rec .sk{display:grid;grid-template-columns:150px 1fr;gap:12px;padding:13px 0;border-top:1px solid var(--ln);align-items:center}\n.rec .sk:first-of-type{border-top:0}\n.rec .sk b{font-size:.92rem}\n.rec .tg{display:flex;flex-wrap:wrap;gap:7px}\n.rec .tg span{font-size:.8rem;font-weight:600;padding:4px 11px;border-radius:7px;background:#eef3fc;border:1px solid #dbe5f6}\n.rec .row{display:grid;grid-template-columns:1.1fr 2fr auto;gap:16px;align-items:center;padding:14px 12px;border-top:1px solid var(--ln);border-radius:8px;transition:background .2s,padding-left .2s}\n.rec .row:hover{background:#f0f5ff;padding-left:18px}\n.rec .row b{display:block;font-size:.95rem}\n.rec .row small{color:var(--mut);font-size:.76rem}\n.rec .row p{color:#33445c;font-size:.88rem}\n.rec .row a{font-weight:700;font-size:.84rem;color:var(--acd);white-space:nowrap}\n.rec .hire{background:var(--ink);color:#dbe7fb;border:0}\n.rec .hire h2{color:#fff}\n.rec .hire h2:after{background:#ffffff26}\n.rec .hire p{color:#b5c4dc;max-width:56ch;margin-bottom:20px}\n.rec .hire .btn{background:transparent;color:#fff;border-color:#ffffff40}\n.rec .hire .btn.p{background:var(--ac);border-color:var(--ac)}\n.rec footer{border-top:1px solid var(--ln);padding:22px 0;font-size:.84rem;color:var(--mut)}\n.rec footer .wr{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}\n@media(max-width:900px){.rec .page{grid-template-columns:1fr}.rec .side{position:static}.rec .top nav{display:none}.rec .kp{grid-template-columns:1fr}.rec .row,.rec .sk{grid-template-columns:1fr;gap:6px}.rec section{padding:22px 20px}}\n@media(prefers-reduced-motion:reduce){.rv{opacity:1}.rv.in{animation:none}.rec .av:before{animation:none}}\n"+`
.ic{width:1.15em;height:1.15em;flex:none;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:-.2em}
.rec .top nav a{padding:7px 12px;border-radius:9px}
.rec .top nav a:hover{background:#e1eafa}
.rec .brand{display:inline-flex;align-items:center;gap:10px}
.rec .lg{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--ac);color:#fff;font:800 .82rem Inter,system-ui,sans-serif;letter-spacing:.02em}
.rec .page>*{min-width:0}
.rec .side{min-width:0}
.rec .side>*{min-width:0;max-width:100%}
.rec .ct a{display:flex;justify-content:flex-start;align-items:center;gap:12px;min-width:0}
.rec .tx{display:grid;min-width:0;line-height:1.35}
.rec .tx b{font-size:.88rem}
.rec .tx small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rec .ct a>i{display:grid;place-items:center;width:32px;height:32px;border-radius:9px;background:#e8eefb;color:var(--acd);flex:none}
.rec .ct a>i .ic{width:16px;height:16px}
.rec .side .acts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.rec .side .acts .btn{padding:0 10px;min-width:0;white-space:nowrap}
.rec h2 .ib{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;background:#e8eefb;color:var(--acd);flex:none}
.rec h2 .ib .ic{width:19px;height:19px}
.rec .kp .ic{display:block;width:22px;height:22px;color:var(--ac);margin-bottom:6px}
.rec .tl a{display:inline-flex;align-items:center;gap:7px}
.rec .tl a .ic{width:15px;height:15px}
.rec .sk b{display:inline-flex;align-items:center;gap:9px}
.rec .sk b .ic{width:18px;height:18px;color:var(--ac)}
.rec .row a{display:inline-flex;align-items:center;gap:7px;justify-self:end}
.rec .row a .ic{width:15px;height:15px}
.rec .edu{display:flex;align-items:flex-start;gap:9px}
.rec .edu .ic{margin-top:3px}
.rec .hire h2 .ib{background:#ffffff1c;color:#fff}

.ic.f{fill:currentColor;stroke:none}
.rec{--surf:#fff}
.rec .mb,.dv .mb{display:none;place-items:center;width:42px;height:42px;border-radius:10px;border:1px solid var(--ln);background:transparent;color:var(--ink);cursor:pointer;flex:none;padding:0}
.rec .mb .ic,.dv .mb .ic{width:20px;height:20px}
.rec .scrim,.dv .scrim{position:fixed;inset:0;background:#0009;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;z-index:90}
.rec .drawer,.dv .drawer{position:fixed;top:0;right:0;bottom:0;width:70vw;min-width:260px;max-width:360px;background:var(--surf);color:var(--ink);border-left:1px solid var(--ln);transform:translateX(100%);visibility:hidden;transition:transform .35s cubic-bezier(.16,1,.3,1),visibility .35s;z-index:100;display:flex;flex-direction:column;padding:16px 16px 22px;overflow-y:auto;overscroll-behavior:contain}
.nav-open .scrim{opacity:1;visibility:visible}
.nav-open .drawer{transform:none;visibility:visible}
.rec .dh,.dv .dh{display:flex;align-items:center;justify-content:space-between;gap:10px}
.rec .dbr,.dv .dbr{display:flex;align-items:center;gap:11px;min-width:0;margin-right:auto}
.rec .dmk,.dv .dmk{display:grid;place-items:center;width:36px;height:36px;border-radius:10px;flex:none;font:800 .82rem ui-monospace,Menlo,monospace}
.rec .dmk{background:var(--ac);color:#fff}
.dv .dmk{background:var(--g);color:#04130c}
.rec .dnm,.dv .dnm{display:grid;line-height:1.2;min-width:0}
.rec .dnm b,.dv .dnm b{font-size:.92rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rec .dnm small,.dv .dnm small{color:var(--mut);font-size:.74rem}
.rec .dx,.dv .dx{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;border:1px solid var(--ln);background:transparent;color:var(--ink);cursor:pointer;flex:none;padding:0}
.rec .dl,.dv .dl{display:grid;gap:4px;margin:20px 0}
.rec .dl a,.dv .dl a{display:flex;align-items:center;gap:14px;padding:13px 12px;border-radius:10px;font-weight:600;color:var(--ink)}
.rec .dl small,.dv .dl small{font:600 .72rem ui-monospace,Menlo,monospace;color:var(--mut)}
.rec .dl a.on{background:#e8eefb;color:var(--acd)}
.dv .dl a.on{background:#3ddc970f;color:var(--g)}
.rec .dc,.dv .dc{display:grid;gap:10px;margin-top:auto;padding-top:16px;border-top:1px solid var(--ln)}
.rec .dc .btn,.dv .dc .btn{width:100%;justify-content:flex-start;gap:12px}
.rec .top nav a.on{background:#e1eafa;color:var(--acd)}
.rec .cta{white-space:nowrap}
/* Icon + label spacing for all recruiter buttons and links */
.rec .btn,.rec .cta{gap:10px;line-height:1.2}
.rec .btn .ic,.rec .cta .ic{width:18px;height:18px;flex:none}
.rec .side .acts .btn{gap:9px}
.rec .dc .btn{gap:12px}
.rec .tl a,.rec .row a{gap:8px}
.rec .ct a{gap:12px}
.rec section.rv.in{animation-name:rvfade}
@keyframes rvfade{from{opacity:0}to{opacity:1}}
.rec .acts{display:flex;gap:10px;flex-wrap:wrap}
.rec footer .wr span{display:inline-flex;align-items:center;gap:8px}
@media(max-width:900px){
 .rec .top nav,.dv .dn,.dv .top .btn.sm{display:none}
 .rec .mb,.dv .mb{display:grid}
 .rec .row a{justify-self:start}
}
@media(min-width:901px){.rec .scrim,.rec .drawer,.dv .scrim,.dv .drawer{display:none}}
@media(max-width:560px){
 .rec .cta{display:none}
 .rec .acts .btn{flex:1 1 calc(50% - 10px);min-width:0;padding:0 12px}
 .rec .hire .acts .btn:first-child{flex-basis:100%}
 .rec .kp{grid-template-columns:1fr}
}

/* ================= developer page ================= */
.dv{--bg:#090d12;--surf:#0f151d;--surf2:#141c27;--ink:#e8eef5;--mut:#8b99ab;--ln:#1e2a38;--g:#3ddc97;--c:#7fdbff;--y:#ffd479;background:var(--bg);color:var(--ink);font:16px/1.65 Inter,system-ui,-apple-system,"Segoe UI",sans-serif;min-height:100vh;position:relative;overflow-x:clip}
.dv:before{content:"";position:absolute;left:0;right:0;top:0;height:880px;pointer-events:none;background:linear-gradient(var(--ln) 1px,transparent 1px) 0 0/64px 64px,linear-gradient(90deg,var(--ln) 1px,transparent 1px) 0 0/64px 64px;opacity:.4;-webkit-mask-image:linear-gradient(#000 20%,transparent);mask-image:linear-gradient(#000 20%,transparent)}
.dv .glow{position:fixed;left:0;top:0;width:620px;height:620px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,#3ddc9717,transparent 65%);transform:translate(var(--gx,60vw),var(--gy,20vh)) translate(-50%,-50%);z-index:0}
.dv .wr{width:min(1160px,calc(100% - 40px));margin:auto;position:relative;z-index:1}
.dv h1,.dv h2,.dv h3,.dv p,.dv ul,.dv ol{margin:0}
.dv ul,.dv ol{padding:0;list-style:none}
.dv .top{position:sticky;top:0;z-index:30;background:#090d12e8;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--ln)}
.dv .top .wr{display:flex;align-items:center;gap:18px;height:64px}
.dv .dn{display:flex;gap:2px}
.dv .dn a{padding:8px 14px;border-radius:8px;color:var(--mut);font-size:.9rem;font-weight:600;transition:color .2s,background .2s}
.dv .dn a:hover{color:var(--ink);background:#ffffff0a}
.dv .dn a.on{color:var(--g);background:#3ddc970f}
.dv .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:46px;padding:0 20px;border-radius:10px;border:1px solid var(--ln);background:var(--surf2);color:var(--ink);font:700 .92rem Inter,system-ui,sans-serif;cursor:pointer;transition:transform .2s,border-color .2s,background .2s,color .2s}
.dv .btn:hover{transform:translateY(-2px);border-color:#3ddc9770}
.dv .btn.p{background:var(--g);border-color:var(--g);color:#04130c}
.dv .btn.p:hover{box-shadow:0 10px 30px #3ddc9733}
.dv .btn.sm{min-height:38px;padding:0 16px;font-size:.86rem}
.dv .btn .ic{width:18px;height:18px}
.dv .btn.wa{background:#25d366;border-color:#25d366;color:#04130c}
.dv .wai{display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:#25d366;color:#04130c}
.dv .wai .ic{width:15px;height:15px}
.dv .hero{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;padding:76px 0 72px;align-items:center}
.dv .hc{min-width:0;animation:rvin .9s cubic-bezier(.16,1,.3,1) both}
.dv .hc+.hc{animation-delay:.15s}
.dv .pill{display:inline-flex;align-items:center;gap:9px;padding:6px 14px;border:1px solid #3ddc9744;background:#3ddc9712;color:var(--g);border-radius:99px;font:600 .78rem ui-monospace,Menlo,monospace}
.dv .pill i,.dv .lv i{width:8px;height:8px;border-radius:50%;background:var(--g);animation:dvp 1.8s infinite}
@keyframes dvp{50%{box-shadow:0 0 0 6px #3ddc9726}}
.dv h1{font-size:clamp(2.1rem,5vw,3.6rem);line-height:1.08;letter-spacing:-.035em;margin:22px 0 18px;font-weight:800}
.dv h1 em{font-style:normal;background:linear-gradient(90deg,var(--g),var(--c));-webkit-background-clip:text;background-clip:text;color:transparent}
.dv .lead{color:#aebacb;font-size:1.06rem;max-width:56ch}
.dv .acts{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.dv .stats{display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:34px;margin-top:38px;padding-top:24px;border-top:1px solid var(--ln)}
.dv .stats b{display:block;font-size:1.45rem;letter-spacing:-.02em;line-height:1.2}
.dv .stats span{color:var(--mut);font-size:.8rem;display:block;max-width:15ch;line-height:1.4;margin-top:4px}
.dv .arch{background:var(--surf);border:1px solid var(--ln);border-radius:18px;box-shadow:0 30px 80px #000a}
.dv .ah{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border-bottom:1px solid var(--ln);font:600 .76rem ui-monospace,Menlo,monospace;color:var(--mut)}
.dv .lv{display:inline-flex;align-items:center;gap:8px;color:var(--g)}
.dv .ab{padding:22px}
.dv .fn{background:var(--surf2);border:1px solid var(--ln);border-radius:12px;padding:14px 16px;display:grid;gap:2px}
.dv .fn.g{border-color:#3ddc9755;box-shadow:0 0 36px #3ddc9714}
.dv .fk{font:700 .66rem ui-monospace,Menlo,monospace;letter-spacing:.09em;color:var(--g)}
.dv .fn b{font-size:1rem}
.dv .fn small{color:var(--mut);font-size:.82rem}
.dv .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.dv .chips span,.dv .af span{font-size:.76rem;font-weight:600;padding:3px 10px;border-radius:99px;background:#ffffff0a;border:1px solid var(--ln);color:#c5d0de}
.dv .fc{height:46px;display:flex;justify-content:center;position:relative}
.dv .fc i{display:block;width:2px;height:100%;background:repeating-linear-gradient(180deg,var(--g) 0 6px,transparent 6px 12px);animation:flw 1s linear infinite;opacity:.85}
.dv .fc:after{content:"";position:absolute;bottom:1px;left:50%;width:8px;height:8px;border-right:2px solid var(--g);border-bottom:2px solid var(--g);transform:translateX(-50%) rotate(45deg)}
.dv .fc em{position:absolute;top:50%;left:calc(50% + 16px);transform:translateY(-50%);font:600 .7rem ui-monospace,Menlo,monospace;color:var(--mut);font-style:normal}
@keyframes flw{to{background-position:0 12px}}
@keyframes flwx{to{background-position:12px 0}}
.dv .af{display:flex;flex-wrap:wrap;gap:8px;padding:14px 22px 20px;border-top:1px solid var(--ln)}
.dv .sec{padding:84px 0 24px;border-top:1px solid var(--ln)}
.dv .sec.last{min-height:calc(100vh - 66px)}
.dv .sh{margin-bottom:36px;max-width:60ch}
.dv .eb{font:700 .76rem ui-monospace,Menlo,monospace;color:var(--g);letter-spacing:.09em;text-transform:uppercase}
.dv h2{font-size:clamp(1.7rem,3.6vw,2.5rem);line-height:1.15;letter-spacing:-.03em;margin:10px 0 12px;font-weight:800}
.dv .sh p{color:#a8b5c6}
.dv .sp{background:var(--surf);border:1px solid var(--ln);border-radius:16px;position:relative;overflow:hidden;transition:border-color .25s,transform .25s}
.dv .sp:hover{border-color:#3ddc9760}
.dv .sp:after{content:"";position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(240px circle at var(--mx,50%) var(--my,0%),#3ddc9718,transparent)}
.dv .sp:hover:after{opacity:1}
.dv .hl{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.dv .case{padding:24px;display:flex;flex-direction:column;gap:14px}
.dv .ct{display:flex;justify-content:space-between;align-items:center;gap:10px}
.dv .mk2{font:600 .72rem ui-monospace,Menlo,monospace;color:var(--c)}
.dv .case h3{font-size:1.25rem}
.dv .case p{color:#a8b5c6;font-size:.92rem}
.dv .bd{font:700 .7rem ui-monospace,Menlo,monospace;padding:3px 10px;border-radius:99px;border:1px solid}
.dv .bd.wip{color:var(--y);border-color:#ffd47955;background:#ffd4790f}
.dv .bd.done{color:var(--g);border-color:#3ddc9755;background:#3ddc970f}
.dv .mini{display:flex;align-items:stretch;gap:10px;margin-top:auto;padding-top:6px}
.dv .mn{flex:1;min-width:0;background:var(--surf2);border:1px solid var(--ln);border-radius:10px;padding:10px 12px;display:grid;gap:1px;align-content:center}
.dv .mn b{font-size:.84rem}
.dv .mn small{color:var(--mut);font-size:.72rem}
.dv .mn.g{border-color:#3ddc9755}
.dv .ar{flex:none;align-self:center;width:24px;height:2px;position:relative;background:repeating-linear-gradient(90deg,var(--g) 0 5px,transparent 5px 9px);animation:flwx .8s linear infinite}
.dv .ar:after{content:"";position:absolute;right:-1px;top:-3px;width:7px;height:7px;border-right:2px solid var(--g);border-top:2px solid var(--g);transform:rotate(45deg)}
.dv .lk{display:inline-flex;align-items:center;gap:8px;color:var(--g);font-weight:700;font-size:.88rem}
.dv .lk .ic{width:15px;height:15px}
.dv .sub{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin:48px 0 18px}
.dv .sub h3{font-size:1.2rem}
.dv .sub h3 span{color:var(--mut);font-weight:600;font-size:.9rem;margin-left:8px}
.dv .flt{display:flex;gap:8px;flex-wrap:wrap}
.dv .fb{font:600 .82rem Inter,system-ui,sans-serif;padding:7px 14px;border-radius:99px;border:1px solid var(--ln);background:transparent;color:var(--mut);cursor:pointer;transition:all .2s}
.dv .fb:hover{color:var(--ink);border-color:#3ddc9760}
.dv .fb.on{background:var(--g);color:#04130c;border-color:var(--g)}
.dv .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.dv .pj{padding:20px;display:flex;flex-direction:column;gap:10px}
.dv .pj[hidden]{display:none}
.dv .pj h3{font-size:1.05rem}
.dv .pj p{color:#9fb0c3;font-size:.88rem}
.dv .pt{display:flex;justify-content:space-between;align-items:center}
.dv .tg{font:600 .72rem ui-monospace,Menlo,monospace;color:var(--c)}
.dv .pa{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;border:1px solid var(--ln);color:var(--mut)}
.dv .pa:hover{color:var(--g);border-color:#3ddc9760}
.dv .pa .ic{width:15px;height:15px}
.dv .pj .lk{margin-top:auto;padding-top:6px}
.dv .steps{display:grid;grid-template-columns:repeat(5,1fr);gap:18px}
.dv .step{position:relative}
.dv .sn{flex:none;display:grid;place-items:center;width:44px;height:44px;border-radius:50%;background:var(--surf2);border:1px solid #3ddc9766;color:var(--g);font:700 .85rem ui-monospace,Menlo,monospace;position:relative;z-index:1}
.dv .step:not(:last-child):after{content:"";position:absolute;top:21px;left:54px;right:-12px;height:2px;background:repeating-linear-gradient(90deg,var(--g) 0 6px,transparent 6px 12px);opacity:.55;animation:flwx 1s linear infinite}
.dv .step h3{margin:16px 0 6px;font-size:1.05rem}
.dv .step p{color:var(--mut);font-size:.88rem}
.dv .layers{max-width:900px}
.dv .ly{display:grid;grid-template-columns:230px 1fr;gap:20px;align-items:center;background:var(--surf);border:1px solid var(--ln);border-radius:14px;padding:18px 22px}
.dv .ly h3{font-size:1.02rem}
.dv .ly small{color:var(--mut);font-size:.82rem}
.dv .ly .chips{margin-top:0}
.dv .cn{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.dv .ints{display:grid;gap:16px;margin-top:26px}
.dv .ints li{display:grid;gap:2px;padding-left:18px;border-left:2px solid #3ddc9755}
.dv .ints span{color:var(--mut);font-size:.9rem}
.dv .cc{padding:22px;display:grid;gap:12px}
.dv .who{display:flex;align-items:center;gap:14px;padding-bottom:14px;border-bottom:1px solid var(--ln)}
.dv .who small{display:block;color:var(--mut)}
.dv .av2{width:52px;height:52px;border-radius:50%;overflow:hidden;border:2px solid var(--g);display:grid;place-items:center;font-weight:800;color:var(--g);flex:none}
.dv .av2 img{width:100%;height:100%;object-fit:cover}
.dv .cr{display:flex;align-items:center;gap:14px;padding:12px 14px;border:1px solid var(--ln);border-radius:12px;background:var(--surf2);transition:transform .2s,border-color .2s}
.dv .cr:hover{border-color:#3ddc9760;transform:translateX(3px)}
.dv .cr>i{display:grid;place-items:center;width:40px;height:40px;border-radius:10px;background:#ffffff0d;flex:none}
.dv .cr>i .ic{width:20px;height:20px}
.dv .cr.wa>i{background:#25d366;color:#04130c}
.dv .cr span{display:grid;line-height:1.3;min-width:0;flex:1}
.dv .cr small{color:var(--mut);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dv .cr>.ic:last-child{width:18px;height:18px;color:var(--mut);flex:none}
.dv footer{border-top:1px solid var(--ln);padding:22px 0;color:var(--mut);font-size:.84rem}
.dv footer .wr{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
@media(max-width:980px){
 .dv .hero{grid-template-columns:1fr;gap:40px;padding:48px 0 56px}
 .dv .cn{grid-template-columns:1fr;gap:36px}
 .dv .hl{grid-template-columns:1fr}
 .dv .steps{grid-template-columns:1fr;gap:0}
 .dv .step{display:flex;gap:16px;padding-bottom:26px}
 .dv .step h3{margin-top:10px}
 .dv .step:not(:last-child):after{top:48px;bottom:4px;left:21px;right:auto;width:2px;height:auto;background:repeating-linear-gradient(180deg,var(--g) 0 6px,transparent 6px 12px);animation-name:flw}
}
@media(max-width:640px){
 .dv .sec{padding:60px 0 16px}
 .dv .stats{grid-template-columns:1fr 1fr;gap:20px}
 .dv .acts{gap:10px}
 .dv .acts .btn{flex:1 1 calc(50% - 5px);min-width:0;padding:0 12px;white-space:nowrap}
 .dv .acts .btn.p{flex-basis:100%}
 .dv .grid{grid-template-columns:1fr}
 .dv .ly{grid-template-columns:1fr;gap:12px}
 .dv .mini{flex-direction:column}
 .dv .ar{width:2px;height:22px;align-self:center;background:repeating-linear-gradient(180deg,var(--g) 0 5px,transparent 5px 9px);animation-name:flw}
 .dv .ar:after{right:auto;top:auto;left:-3px;bottom:-1px;transform:rotate(135deg)}
 .dv .sub{margin-top:36px}
}
@media(max-width:900px){.dv .dn,.dv .top .btn.sm{display:none}.dv .mb{display:grid}}
@media(prefers-reduced-motion:reduce){.dv *{animation:none!important}.dv .hc{opacity:1}}
`+'</style><main id="app"></main>';
const app=sr.getElementById('app');

/* EDIT HERE. Empty values are simply hidden. */
const C={email:'subhammallick454@gmail.com',wa:'918114963709',gh:'https://github.com/sk-mallick',li:'https://in.linkedin.com/in/subham-kumar-mallick',
 resume:'',     // e.g. 'resume.pdf' or a Drive link
 education:'B.Tech Computer Science & Engineering, Trident Academy of Technology, 2027',
 reUrl:''};     // optional link to your WordPress-to-React repo
const REPO='https://github.com/sk-mallick/STUDENT-PANNEL-PRO-v3';
const PR=[
 {n:'Spark Fitness',d:'Fitness website promoting memberships, services and training.',u:'https://sparkfitness.in/',c:'Business'},
 {n:'RN Design & Construction',d:'Construction company website showcasing services and recent projects.',u:'https://rndconstructions.in/',c:'Business'},
 {n:'Purvaansh Preschool',d:'Preschool website presenting programs, facilities and admissions for parents.',u:'https://skcoder001.github.io/Purvaansh-Preschool',c:'Education'},
 {n:'Trident ACM Chapter',d:'Student chapter website for upcoming events and member activities.',u:'https://skcoder001.github.io/acm-draft',c:'Community'},
 {n:'Sunita Makeover Academy',d:'Beauty academy and salon website promoting services and courses.',u:'https://sk-mallick.github.io/sunitamakeover/',c:'Business'},
 {n:'EnglishJibi Classes',d:'Coaching website presenting English courses and study resources.',u:'https://sk-mallick.github.io/englishjibi-classes/',c:'Education'},
 {n:'EnglishJibi Student Portal',d:'Student portal for daily learning and progress tracking.',u:'https://sk-mallick-englishjibi.page.gd/',c:'Education'},
 {n:'TAT Sangam',d:'Community website with information and digital resources for members.',u:'https://tatsangam.gamer.gd/',c:'Community'},
 {n:'Anwesha Construction',d:'Construction website highlighting key services and completed projects.',u:'https://sk-mallick.github.io/anweshaconstruction/',c:'Business'},
 {n:'SK.CODER Portfolio',d:'Personal portfolio showcasing development skills and live work.',u:'https://sk-coder-001.netlify.app/',c:'Portfolio'}
];
const SK=[['Frontend',['HTML & CSS','JavaScript','React','Next.js','TypeScript','Tailwind CSS']],['Backend and data',['Node.js','PHP','PostgreSQL','MySQL','REST APIs']],['Workflow',['Git & GitHub','Figma','Google Apps Script','AI automation','Reverse engineering']]];
const ext=' target="_blank" rel="noopener noreferrer"';
const WA=t=>'https://wa.me/'+C.wa+'?text='+encodeURIComponent(t);
const IMG='<img src="Profile.png" alt="Portrait of Subham Kumar Mallick" width="800" height="940" onerror="this.onerror=null;this.src=\'https://sk-mallick.github.io/codemaster-sk/Profile.png\';">';
const yr=new Date().getFullYear();


const P={
mail:'<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
li:'<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
gh:'<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
wa:'<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>',
user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
folder:'<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
ext:'<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
brief:'<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
file:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
dl:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
code:'<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
term:'<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
git:'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
arr:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
db:'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
sync:'<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
globe:'<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
cap:'<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
braces:'<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>',
plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
x:'<path d="M18 6 6 18M6 6l12 12"/>',
up:'<path d="M7 17 17 7M7 7h10v10"/>',
copy:'<circle cx="12" cy="12" r="10"/><path d="M15 9.5a4 4 0 1 0 0 5"/>'
};
const FI={wa:1,gh:1,li:1};
const ic=(n,c)=>`<svg class="ic${FI[n]?' f':''}${c?' '+c:''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[n]}</svg>`;
const NV=(h,i,t)=>`<a href="${h}" data-s="${h.slice(1)}" title="${t}">${ic(i)}<span class="lbl">${t}</span></a>`;
const H2=(i,t)=>`<h2><span class="ib">${ic(i)}</span>${t}</h2>`;
const SKI={'Frontend':'code','Backend and data':'db','Workflow':'git'};


const DRW=(items,cls)=>`<div class="scrim"></div><aside class="drawer" id="drw" aria-hidden="true" aria-label="Menu"><div class="dh"><a class="dbr" href="#top"><span class="dmk">SK</span><span class="dnm"><b>Subham Kumar Mallick</b><small>Full-stack developer</small></span></a><button class="dx" type="button" aria-label="Close menu">${ic("x")}</button></div><nav class="dl" aria-label="Sections">${items.map(([h,t],i)=>`<a href="#${h}" data-s="${h}"><small>0${i+1}</small>${t}</a>`).join('')}</nav><div class="dc"><a class="btn ${cls}" href="${WA('Hello Subham, I would like to talk to you.')}"${ext}>${ic("wa")}WhatsApp</a><a class="btn" href="mailto:${C.email}">${ic("mail")}Email</a><a class="btn" href="${C.gh}"${ext}>${ic("gh")}GitHub</a><a class="btn" href="${C.li}"${ext}>${ic("li")}LinkedIn</a></div></aside>`;
const MB=`<button class="mb" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="drw">${ic("menu")}</button>`;

const R=()=>`<div class="rec"><div class="bar"></div>
<header class="top"><div class="wr"><a class="brand" href="#top"><span class="lg">SK</span><span class="bn">Subham Kumar Mallick</span></a><nav>${NV("#summary","user","Summary")}${NV("#highlights","star","Highlights")}${NV("#skills","layers","Skills")}${NV("#projects","folder","Projects")}</nav><a class="cta" href="#contact" title="Hire me">${ic("brief")}<span class="lbl">Hire me</span></a>${MB}</div></header>${DRW([["summary","Summary"],["highlights","Highlights"],["skills","Skills"],["projects","Projects"],["contact","Hire me"]],"p")}
<div class="wr page" id="top">
 <aside class="side"><div class="ph">${IMG}</div><h1>Subham Kumar Mallick</h1><p class="role">Full-stack web developer</p><span class="av">Available for hire</span>
  <div class="acts"><a class="btn p" href="mailto:${C.email}?subject=${encodeURIComponent('Opportunity for Subham')}">${ic("mail")}Email</a><a class="btn" href="${WA('Hello Subham, I would like to talk to you about a role.')}"${ext}>${ic("wa")}WhatsApp</a></div>
  <div class="ct"><a href="mailto:${C.email}"><i>${ic("mail")}</i><span class="tx"><b>Email</b><small>${C.email}</small></span></a><a href="${C.li}"${ext}><i>${ic("li")}</i><span class="tx"><b>LinkedIn</b><small>subham-kumar-mallick</small></span></a><a href="${C.gh}"${ext}><i>${ic("gh")}</i><span class="tx"><b>GitHub</b><small>sk-mallick</small></span></a><a href="${WA('Hello Subham, I would like to talk to you about a role.')}"${ext}><i>${ic("wa")}</i><span class="tx"><b>WhatsApp</b><small>+91 81149 63709</small></span></a></div>
  ${C.education?`<p class="edu">${ic('cap')}<span>${C.education}</span></p>`:''}${C.resume?`<a class="btn p" href="${C.resume}"${ext}>${ic('dl')}Download resume</a>`:''}</aside>
 <div>
  <section id="summary">${H2("file","Summary")}<p class="sm">Computer Science undergraduate and full-stack web developer with 10 live projects across business, education and community. Frontend-first with HTML, CSS, JavaScript, React and Next.js, plus working backend experience with Node.js, PHP and SQL databases. Currently building Student Panel Pro, a full-stack learning platform.</p>
   <div class="kp"><div>${ic("globe")}<b>10</b><span>Live web projects</span></div><div>${ic("layers")}<b>Full-stack</b><span>Learning platform in development</span></div><div>${ic("sync")}<b>WP to React</b><span>Complete site reverse-engineered</span></div></div></section>
  <section id="highlights">${H2("star","Highlights")}<div class="tl">
   <div><h3>Student Panel Pro v3</h3><small>In progress</small><p>Full-stack student and admin panel for EnglishJibi Classes. The backend is moving from Google Apps Script and Google Sheets to Java Servlet and MySQL, with the existing frontend kept intact.</p><a href="${REPO}"${ext}>${ic("gh")}View repository</a></div>
   <div><h3>WordPress to React reverse engineering</h3><small>Completed</small><p>Reverse-engineered a complete WordPress website and rebuilt it as a React project.</p>${C.reUrl?`<a href="${C.reUrl}"${ext}>${ic("gh")}View repository</a>`:''}</div>
   <div><h3>Client websites</h3><small>10 live projects</small><p>Responsive websites and portals delivered for businesses, schools and communities.</p><a href="#projects">See all projects${ic("arr")}</a></div></div></section>
  <section id="skills">${H2("layers","Skills")}${SK.map(([t,a])=>`<div class="sk"><b>${ic(SKI[t])}${t}</b><div class="tg">${a.map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('')}</section>
  <section id="projects">${H2("folder","Selected projects")}${PR.map(p=>`<div class="row"><div><b>${p.n}</b><small>${p.c}</small></div><p>${p.d}</p><a href="${p.u}"${ext}>View live${ic("ext")}</a></div>`).join('')}</section>
  <section class="hire" id="contact">${H2("brief","Let&rsquo;s discuss the role")}<p>I am available to hire and happy to share more about my work. Email is the quickest way to reach me.</p>
   <div class="acts"><a class="btn p" href="mailto:${C.email}?subject=${encodeURIComponent('Opportunity for Subham')}">${ic("mail")}Email me</a><a class="btn" href="${C.li}"${ext}>${ic("li")}LinkedIn</a><a class="btn" href="${WA('Hello Subham, I would like to talk to you about a role.')}"${ext}>${ic("wa")}WhatsApp</a>${C.resume?`<a class="btn" href="${C.resume}"${ext}>${ic("dl")}Resume</a>`:''}</div></section>
 </div></div>
<footer><div class="wr"><span>&copy; ${yr} Subham Kumar Mallick</span><span>Full-stack web developer</span></div></footer></div>`;

const DNAV=[['projects','Projects'],['process','Process'],['stack','Stack'],['connect','Connect']];
const FN=(k,t,sub,chips,cls)=>`<div class="fn${cls?' '+cls:''}"><span class="fk">${k}</span><b>${t}</b><small>${sub}</small><div class="chips">${chips.map(c=>`<span>${c}</span>`).join('')}</div></div>`;
const FC=l=>`<div class="fc" aria-hidden="true"><i></i>${l?`<em>${l}</em>`:''}</div>`;
const MN=(t,s,g)=>`<div class="mn${g?' g':''}"><b>${t}</b><small>${s}</small></div>`;
const AR='<span class="ar" aria-hidden="true"></span>';
const STEPS=[['01','Scope','Goals, pages and content agreed before any code is written.'],['02','Design','Mobile-first layouts and a clear visual system in Figma.'],['03','Build','Clean HTML, CSS and JavaScript, or React components.'],['04','Connect','Forms, APIs and databases wired in and tested.'],['05','Ship','Deployed on your domain, with support after launch.']];
const LAY=[['Frontend','What visitors see and touch',SK[0][1]],['Backend and data','Logic, APIs and storage',SK[1][1]],['Workflow','How the work is built and shipped',SK[2][1]]];
const CATS=['All',...new Set(PR.map(p=>p.c))];
const D=()=>`<div class="dv"><div class="glow"></div>
<header class="top"><div class="wr"><a class="dbr" href="#top"><span class="dmk">SK</span><span class="dnm"><b>Subham Kumar Mallick</b><small>Full-stack developer</small></span></a>
 <nav class="dn" aria-label="Sections">${DNAV.map(([h,t])=>`<a href="#${h}" data-s="${h}">${t}</a>`).join('')}</nav>
 <a class="btn p sm" href="#connect">Let&rsquo;s talk</a>${MB}</div></header>
${DRW(DNAV,'wa')}
<section class="hero wr" id="top" data-sec="1">
 <div class="hc"><span class="pill"><i></i>Open to collaboration</span>
  <h1>Full-stack developer building <em>web platforms</em>, tools and automation.</h1>
  <p class="lead">I design and ship responsive websites, learning platforms and admin tools, from the interface to the database. 10 live projects across business, education and community.</p>
  <div class="acts"><a class="btn p" href="#projects">View projects</a><a class="btn" href="${WA('Hi Subham, I am a developer and would like to connect.')}"${ext}><span class="wai">${ic("wa")}</span>WhatsApp</a><a class="btn" href="${C.gh}"${ext}>${ic("gh")}GitHub</a></div>
  <div class="stats"><div><b>10</b><span>Live projects</span></div><div><b>3 layers</b><span>Frontend, backend, data</span></div><div><b>v3</b><span>Student Panel Pro, in progress</span></div></div></div>
 <div class="hc"><div class="arch sp"><div class="ah"><span>system-overview</span><span class="lv"><i></i>how I build</span></div>
  <div class="ab">${FN('01 &middot; CLIENT','Responsive interface','HTML, CSS and JavaScript',['React','Next.js','Tailwind CSS'])}${FC('REST / JSON')}${FN('02 &middot; SERVER','APIs and business logic','Auth, forms and admin tools',['Node.js','PHP','Java Servlet'])}${FC('SQL')}${FN('03 &middot; DATA','Storage and reporting','Relational databases',['MySQL','PostgreSQL','Sheets'],'g')}</div>
  <div class="af"><span>Git &amp; GitHub</span><span>Figma</span><span>AI automation</span></div></div></div>
</section>
<section class="sec" id="projects" data-sec="1"><div class="wr">
 <header class="sh"><span class="eb">01 &middot; Work</span><h2>Selected work</h2><p>Two engineering builds, followed by the websites and portals I have delivered.</p></header>
 <div class="hl">
  <article class="sp case"><div class="ct"><span class="bd wip">In progress</span><span class="mk2">Full-stack</span></div><h3>Student Panel Pro v3</h3><p>Full-stack student and admin panel for EnglishJibi Classes. The backend is moving from Google Apps Script and Google Sheets to Java Servlet and MySQL, with the existing frontend kept intact.</p>
   <div class="mini">${MN('Apps Script + Sheets','current backend')}${AR}${MN('Java Servlet + MySQL','new backend',1)}</div>
   <a class="lk" href="${REPO}"${ext}>View repository ${ic("up")}</a></article>
  <article class="sp case"><div class="ct"><span class="bd done">Completed</span><span class="mk2">Reverse engineering</span></div><h3>WordPress to React rebuild</h3><p>Reverse-engineered a complete WordPress website and rebuilt it as a React project, from theme internals to components and routes.</p>
   <div class="mini">${MN('WordPress site','themes, plugins')}${AR}${MN('Analyse','structure, assets')}${AR}${MN('React project','components, routes',1)}</div>
   ${C.reUrl?`<a class="lk" href="${C.reUrl}"${ext}>View repository ${ic("up")}</a>`:`<a class="lk" href="#connect">Compare notes ${ic("arr")}</a>`}</article>
 </div>
 <div class="sub"><h3>Live websites<span>${PR.length}</span></h3><div class="flt" role="group" aria-label="Filter projects">${CATS.map((c,i)=>`<button class="fb${i?'':' on'}" type="button" data-f="${c}">${c}</button>`).join('')}</div></div>
 <div class="grid">${PR.map(p=>`<article class="sp pj" data-c="${p.c}"><div class="pt"><span class="tg">${p.c}</span><a class="pa" href="${p.u}"${ext} aria-label="Open ${p.n}">${ic("up")}</a></div><h3>${p.n}</h3><p>${p.d}</p><a class="lk" href="${p.u}"${ext}>Visit site ${ic("arr")}</a></article>`).join('')}</div>
</div></section>
<section class="sec" id="process" data-sec="1"><div class="wr">
 <header class="sh"><span class="eb">02 &middot; Process</span><h2>From idea to live site</h2><p>A simple, repeatable flow that keeps projects predictable.</p></header>
 <ol class="steps">${STEPS.map(([n,t,d])=>`<li class="step"><span class="sn">${n}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol>
</div></section>
<section class="sec" id="stack" data-sec="1"><div class="wr">
 <header class="sh"><span class="eb">03 &middot; Stack</span><h2>Tools across the stack</h2><p>What I use at each layer, from the browser to deployment.</p></header>
 <div class="layers">${LAY.map(([t,d,a],i)=>`${i?FC(i===1?'REST / SQL':'Git, deploy'):''}<div class="ly"><div><h3>${t}</h3><small>${d}</small></div><div class="chips">${a.map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('')}</div>
</div></section>
<section class="sec last" id="connect" data-sec="1"><div class="wr cn">
 <div><span class="eb">04 &middot; Connect</span><h2>Let&rsquo;s build something together.</h2><p class="lead">Open to team-ups, client work and developer conversations. WhatsApp is the quickest way to reach me.</p>
  <ul class="ints"><li><b>Team up</b><span>Build something together: side projects, client work or a hackathon entry.</span></li><li><b>Talk shop</b><span>Share ideas, swap code reviews and compare notes on reverse engineering.</span></li><li><b>Build a community</b><span>Start a small developer group to learn, share and ship together.</span></li></ul></div>
 <div class="sp cc"><div class="who"><span class="av2">${IMG}</span><div><b>Subham Kumar Mallick</b><small>@sk-mallick</small></div></div>
  <a class="cr wa" href="${WA('Hi Subham, I am a developer and would like to team up.')}"${ext}><i>${ic("wa")}</i><span><b>WhatsApp</b><small>+91 81149 63709</small></span>${ic("arr")}</a>
  <a class="cr" href="mailto:${C.email}"><i>${ic("mail")}</i><span><b>Email</b><small>${C.email}</small></span>${ic("arr")}</a>
  <a class="cr" href="${C.gh}"${ext}><i>${ic("gh")}</i><span><b>GitHub</b><small>sk-mallick</small></span>${ic("arr")}</a>
  <a class="cr" href="${C.li}"${ext}><i>${ic("li")}</i><span><b>LinkedIn</b><small>subham-kumar-mallick</small></span>${ic("arr")}</a></div>
</div></section>
<footer><div class="wr"><span>&copy; ${yr} Subham Kumar Mallick</span><span>Full-stack web developer</span></div></footer></div>`;

const root=document.documentElement,gate=document.getElementById('gate'),fab=document.getElementById('swFab'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const TITLE={recruiter:'Subham Kumar Mallick | Full-Stack Developer & Founder',client:'Code Master SK by Subham | Digital Studio & Web Solutions',developer:'Subham Kumar Mallick | Developer Portfolio & Code Master SK'};
let io;
function motion(p){
 sr.querySelectorAll('section[id]').forEach(e=>e.dataset.sec='1');
 const sel=p==='recruiter'?'.rec section,.rec .tl>div':'.dv .sh,.dv .case,.dv .pj,.dv .step,.dv .ly,.dv .fc,.dv .sub,.dv .cn>div';
 sr.querySelectorAll(sel).forEach((e,i)=>{e.classList.add('rv');e.style.setProperty('--d',(i%3)*.08+'s')});
 io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
 sr.querySelectorAll('.rv').forEach(e=>io.observe(e));
 if(p==='recruiter'&&!reduce)sr.querySelectorAll('.kp b').forEach(b=>{const n=+b.textContent;if(!n)return;const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)});
 onScroll();
}
function onScroll(){
 const b=sr.querySelector('.bar');if(b){const h=root.scrollHeight-innerHeight;b.style.width=(h>0?scrollY/h*100:0)+'%'}
 fab.classList.toggle('visible',scrollY>400&&!document.body.classList.contains('gating'));
 const hd=sr.querySelector('.top');if(hd){const off=hd.getBoundingClientRect().height+30;let cur='';sr.querySelectorAll('[data-sec]').forEach(x=>{if(x.getBoundingClientRect().top<=off)cur=x.id});sr.querySelectorAll('[data-s]').forEach(a=>a.classList.toggle('on',a.dataset.s===cur))}
}
addEventListener('scroll',onScroll,{passive:true});
function show(p,keep){
 root.dataset.p=p;root.style.overflow='';
 if(p==='client'){
  delete root.dataset.alt;host.hidden=true;dispatchEvent(new Event('resize'));
  document.querySelectorAll('#home .reveal').forEach((e,i)=>{e.classList.remove('in-view');setTimeout(()=>e.classList.add('in-view'),150+i*180)});
 }else{
  root.dataset.alt=p;host.dataset.p=p;host.hidden=false;
  app.innerHTML=p==='recruiter'?R():D();motion(p);
 }
 document.title=TITLE[p];gate.classList.add('out');document.body.classList.remove('gating');
 try{sessionStorage.setItem('p',p);history.replaceState(null,'','?for='+p)}catch(e){}
 if(!keep)scrollTo(0,0);onScroll();
}
function pick(){document.body.classList.add('gating');gate.classList.remove('out');gate.classList.add('ready');onScroll()}
function drawer(f){
 const r=sr.querySelector('.rec,.dv');if(!r)return;
 const open=typeof f==='boolean'?f:!r.classList.contains('nav-open');
 r.classList.toggle('nav-open',open);
 const b=sr.querySelector('.mb'),d=sr.querySelector('.drawer');
 b&&b.setAttribute('aria-expanded',open);d&&d.setAttribute('aria-hidden',!open);
 root.style.overflow=open?'hidden':'';
}
function goTo(id){
 const h=sr.querySelector('.top'),gap=host.dataset.p==='recruiter'?10:0,off=(h?h.getBoundingClientRect().height:0)+gap;
 const el=id==='top'?null:sr.getElementById(id);
 const y=el?Math.max(0,el.getBoundingClientRect().top+scrollY-off):0;
 scrollTo({top:y,behavior:reduce?'auto':'smooth'});
}
sr.addEventListener('click',e=>{
 if(e.target.closest('.mb')){drawer();return}
 if(e.target.closest('.scrim,.dx')){drawer(false);return}
 const fb=e.target.closest('.fb');
 if(fb){
  sr.querySelectorAll('.fb').forEach(x=>x.classList.toggle('on',x===fb));
  sr.querySelectorAll('.pj').forEach(c=>{const ok=fb.dataset.f==='All'||c.dataset.c===fb.dataset.f;c.hidden=!ok;if(ok)c.classList.add('in')});
  return;
 }
 const a=e.target.closest('a[href^="#"]');if(!a)return;e.preventDefault();
 drawer(false);goTo(a.getAttribute('href').slice(1));
});
addEventListener('keydown',e=>{if(e.key==='Escape')drawer(false)});
addEventListener('resize',()=>{if(innerWidth>900)drawer(false)});
sr.addEventListener('pointermove',e=>{
 const g=sr.querySelector('.glow');if(g){g.style.setProperty('--gx',e.clientX+'px');g.style.setProperty('--gy',e.clientY+'px')}
 const c=e.target.closest&&e.target.closest('.sp');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}
});
gate.querySelectorAll('.pc').forEach(b=>{
 b.addEventListener('click',()=>{
  const r=b.getBoundingClientRect(),w=document.createElement('div');w.className='wipe';
  w.style.cssText=`left:${r.left+r.width/2}px;top:${r.top+r.height/2}px;background:${b.dataset.bg}`;
  gate.appendChild(w);w.offsetWidth;gate.classList.add('go');
  const done=()=>{show(b.dataset.p);setTimeout(()=>{w.remove();gate.classList.remove('go')},800)};
  reduce?done():setTimeout(done,680);
 });
 b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--rx',-((e.clientY-r.top)/r.height-.5)*12+'deg');b.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*14+'deg')});
 b.addEventListener('pointerleave',()=>{b.style.removeProperty('--rx');b.style.removeProperty('--ry')});
});

/* gate: smoothed pointer + touch flow, gentle idle drift so it is never static */
(function(){
 const gl=gate.querySelector('.gl');if(!gl)return;
 let tx=innerWidth*.5,ty=innerHeight*.45,cx=tx,cy=ty,last=-1e9,r=240,run=false;
 const set=(x,y)=>{tx=x;ty=y;last=performance.now()};
 const pm=e=>set(e.clientX,e.clientY);
 gate.addEventListener('pointermove',pm,{passive:true});
 gate.addEventListener('pointerdown',pm,{passive:true});
 gate.addEventListener('touchstart',e=>{const t=e.touches[0];t&&set(t.clientX,t.clientY)},{passive:true});
 gate.addEventListener('touchmove',e=>{const t=e.touches[0];t&&set(t.clientX,t.clientY)},{passive:true});
 function paint(){gate.style.setProperty('--gx',cx+'px');gate.style.setProperty('--gy',cy+'px');gate.style.setProperty('--gr',r+'px')}
 function loop(t){
  if(gate.classList.contains('out')){run=false;return}
  if(t-last>2200){const w=innerWidth,h=innerHeight;tx=w*(.5+.34*Math.sin(t/2800));ty=h*(.5+.3*Math.sin(t/3600+1.2))}
  const dx=tx-cx,dy=ty-cy;cx+=dx*.085;cy+=dy*.085;
  const base=Math.max(190,Math.min(innerWidth,innerHeight)*.34),sp=Math.min(Math.hypot(dx,dy),260);
  r+=((base+sp*.45)-r)*.08;paint();requestAnimationFrame(loop)}
 function start(){if(run)return;run=true;requestAnimationFrame(loop)}
 if(reduce){paint();return}
 start();
 new MutationObserver(()=>{if(!gate.classList.contains('out'))start()}).observe(gate,{attributes:true,attributeFilter:['class']});
})();

fab.addEventListener('click',pick);
document.getElementById('backTop').addEventListener('click',e=>{if(root.dataset.alt){e.preventDefault();scrollTo({top:0,behavior:reduce?'auto':'smooth'})}});
addEventListener('keydown',e=>{if(e.key==='Escape'&&root.dataset.p){gate.classList.add('out');document.body.classList.remove('gating')}});
const qf=new URLSearchParams(location.search).get('for');let ss='';try{ss=sessionStorage.getItem('p')}catch(e){}
const ok=x=>['recruiter','client','developer'].includes(x),start=ok(qf)?qf:ok(ss)?ss:null;
if(start){gate.classList.add('out');show(start,1)}
else{document.body.classList.add('gating');setTimeout(()=>gate.classList.add('ready'),reduce?100:1750)}
})();