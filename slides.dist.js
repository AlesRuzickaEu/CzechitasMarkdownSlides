
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
!function(e){"use strict";var k={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:g,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,nptable:g,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:"^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=\\h*\\n)[\\s\\S]*?(?:\\n{2,}|$))",def:/^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,table:g,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading| {0,3}>|<\/?(?:tag)(?: +|\n|\/?>)|<(?:script|pre|style|!--))[^\n]+)*)/,text:/^[^\n]+/};function a(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||d.defaults,this.rules=k.normal,this.options.pedantic?this.rules=k.pedantic:this.options.gfm&&(this.options.tables?this.rules=k.tables:this.rules=k.gfm)}k._label=/(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,k._title=/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,k.def=t(k.def).replace("label",k._label).replace("title",k._title).getRegex(),k.bullet=/(?:[*+-]|\d+\.)/,k.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,k.item=t(k.item,"gm").replace(/bull/g,k.bullet).getRegex(),k.list=t(k.list).replace(/bull/g,k.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+k.def.source+")").getRegex(),k._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",k._comment=/<!--(?!-?>)[\s\S]*?-->/,k.html=t(k.html,"i").replace("comment",k._comment).replace("tag",k._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),k.paragraph=t(k.paragraph).replace("hr",k.hr).replace("heading",k.heading).replace("lheading",k.lheading).replace("tag",k._tag).getRegex(),k.blockquote=t(k.blockquote).replace("paragraph",k.paragraph).getRegex(),k.normal=f({},k),k.gfm=f({},k.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),k.gfm.paragraph=t(k.paragraph).replace("(?!","(?!"+k.gfm.fences.source.replace("\\1","\\2")+"|"+k.list.source.replace("\\1","\\3")+"|").getRegex(),k.tables=f({},k.gfm,{nptable:/^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,table:/^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/}),k.pedantic=f({},k.normal,{html:t("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",k._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/}),a.rules=k,a.lex=function(e,t){return new a(t).lex(e)},a.prototype.lex=function(e){return e=e.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(e,!0)},a.prototype.token=function(e,t){var n,r,s,i,l,o,a,h,p,u,c,g,f,d,b,m;for(e=e.replace(/^ +$/gm,"");e;)if((s=this.rules.newline.exec(e))&&(e=e.substring(s[0].length),1<s[0].length&&this.tokens.push({type:"space"})),s=this.rules.code.exec(e))e=e.substring(s[0].length),s=s[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?s:y(s,"\n")});else if(s=this.rules.fences.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"code",lang:s[2],text:s[3]||""});else if(s=this.rules.heading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:s[1].length,text:s[2]});else if(t&&(s=this.rules.nptable.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=x(o.cells[c],o.header.length);this.tokens.push(o)}else if(s=this.rules.hr.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"hr"});else if(s=this.rules.blockquote.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"blockquote_start"}),s=s[0].replace(/^ *> ?/gm,""),this.token(s,t),this.tokens.push({type:"blockquote_end"});else if(s=this.rules.list.exec(e)){for(e=e.substring(s[0].length),a={type:"list_start",ordered:d=1<(i=s[2]).length,start:d?+i:"",loose:!1},this.tokens.push(a),n=!(h=[]),f=(s=s[0].match(this.rules.item)).length,c=0;c<f;c++)u=(o=s[c]).length,~(o=o.replace(/^ *([*+-]|\d+\.) +/,"")).indexOf("\n ")&&(u-=o.length,o=this.options.pedantic?o.replace(/^ {1,4}/gm,""):o.replace(new RegExp("^ {1,"+u+"}","gm"),"")),this.options.smartLists&&c!==f-1&&(i===(l=k.bullet.exec(s[c+1])[0])||1<i.length&&1<l.length||(e=s.slice(c+1).join("\n")+e,c=f-1)),r=n||/\n\n(?!\s*$)/.test(o),c!==f-1&&(n="\n"===o.charAt(o.length-1),r||(r=n)),r&&(a.loose=!0),m=void 0,(b=/^\[[ xX]\] /.test(o))&&(m=" "!==o[1],o=o.replace(/^\[[ xX]\] +/,"")),p={type:"list_item_start",task:b,checked:m,loose:r},h.push(p),this.tokens.push(p),this.token(o,!1),this.tokens.push({type:"list_item_end"});if(a.loose)for(f=h.length,c=0;c<f;c++)h[c].loose=!0;this.tokens.push({type:"list_end"})}else if(s=this.rules.html.exec(e))e=e.substring(s[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===s[1]||"script"===s[1]||"style"===s[1]),text:s[0]});else if(t&&(s=this.rules.def.exec(e)))e=e.substring(s[0].length),s[3]&&(s[3]=s[3].substring(1,s[3].length-1)),g=s[1].toLowerCase().replace(/\s+/g," "),this.tokens.links[g]||(this.tokens.links[g]={href:s[2],title:s[3]});else if(t&&(s=this.rules.table.exec(e))&&(o={type:"table",header:x(s[1].replace(/^ *| *\| *$/g,"")),align:s[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:s[3]?s[3].replace(/(?: *\| *)?\n$/,"").split("\n"):[]}).header.length===o.align.length){for(e=e.substring(s[0].length),c=0;c<o.align.length;c++)/^ *-+: *$/.test(o.align[c])?o.align[c]="right":/^ *:-+: *$/.test(o.align[c])?o.align[c]="center":/^ *:-+ *$/.test(o.align[c])?o.align[c]="left":o.align[c]=null;for(c=0;c<o.cells.length;c++)o.cells[c]=x(o.cells[c].replace(/^ *\| *| *\| *$/g,""),o.header.length);this.tokens.push(o)}else if(s=this.rules.lheading.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"heading",depth:"="===s[2]?1:2,text:s[1]});else if(t&&(s=this.rules.paragraph.exec(e)))e=e.substring(s[0].length),this.tokens.push({type:"paragraph",text:"\n"===s[1].charAt(s[1].length-1)?s[1].slice(0,-1):s[1]});else if(s=this.rules.text.exec(e))e=e.substring(s[0].length),this.tokens.push({type:"text",text:s[0]});else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0));return this.tokens};var n={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:g,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(href(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,nolink:/^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,strong:/^__([^\s])__(?!_)|^\*\*([^\s])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,em:/^_([^\s_])_(?!_)|^\*([^\s*"<\[])\*(?!\*)|^_([^\s][\s\S]*?[^\s_])_(?!_)|^_([^\s_][\s\S]*?[^\s])_(?!_)|^\*([^\s"<\[][\s\S]*?[^\s*])\*(?!\*)|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:g,text:/^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/};function h(e,t){if(this.options=t||d.defaults,this.links=e,this.rules=n.normal,this.renderer=this.options.renderer||new r,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.pedantic?this.rules=n.pedantic:this.options.gfm&&(this.options.breaks?this.rules=n.breaks:this.rules=n.gfm)}function r(e){this.options=e||d.defaults}function s(){}function p(e){this.tokens=[],this.token=null,this.options=e||d.defaults,this.options.renderer=this.options.renderer||new r,this.renderer=this.options.renderer,this.renderer.options=this.options}function u(e,t){return e.replace(t?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function c(e){return e.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}function t(n,e){return n=n.source||n,e=e||"",{replace:function(e,t){return t=(t=t.source||t).replace(/(^|[^\[])\^/g,"$1"),n=n.replace(e,t),this},getRegex:function(){return new RegExp(n,e)}}}function i(e,t){return l[" "+e]||(/^[^:]+:\/*[^/]*$/.test(e)?l[" "+e]=e+"/":l[" "+e]=y(e,"/",!0)),e=l[" "+e],"//"===t.slice(0,2)?e.replace(/:[\s\S]*/,":")+t:"/"===t.charAt(0)?e.replace(/(:\/*[^/]*)[\s\S]*/,"$1")+t:e+t}n._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,n._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,n._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,n.autolink=t(n.autolink).replace("scheme",n._scheme).replace("email",n._email).getRegex(),n._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,n.tag=t(n.tag).replace("comment",k._comment).replace("attribute",n._attribute).getRegex(),n._label=/(?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?/,n._href=/\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f\\]*\)|[^\s\x00-\x1f()\\])*?)/,n._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,n.link=t(n.link).replace("label",n._label).replace("href",n._href).replace("title",n._title).getRegex(),n.reflink=t(n.reflink).replace("label",n._label).getRegex(),n.normal=f({},n),n.pedantic=f({},n.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,link:t(/^!?\[(label)\]\((.*?)\)/).replace("label",n._label).getRegex(),reflink:t(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",n._label).getRegex()}),n.gfm=f({},n.normal,{escape:t(n.escape).replace("])","~|])").getRegex(),url:t(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("email",n._email).getRegex(),_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^~+(?=\S)([\s\S]*?\S)~+/,text:t(n.text).replace("]|","~]|").replace("|","|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&'*+/=?^_`{\\|}~-]+@|").getRegex()}),n.breaks=f({},n.gfm,{br:t(n.br).replace("{2,}","*").getRegex(),text:t(n.gfm.text).replace("{2,}","*").getRegex()}),h.rules=n,h.output=function(e,t,n){return new h(t,n).output(e)},h.prototype.output=function(e){for(var t,n,r,s,i,l,o="";e;)if(i=this.rules.escape.exec(e))e=e.substring(i[0].length),o+=i[1];else if(i=this.rules.autolink.exec(e))e=e.substring(i[0].length),r="@"===i[2]?"mailto:"+(n=u(this.mangle(i[1]))):n=u(i[1]),o+=this.renderer.link(r,null,n);else if(this.inLink||!(i=this.rules.url.exec(e))){if(i=this.rules.tag.exec(e))!this.inLink&&/^<a /i.test(i[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(i[0])&&(this.inLink=!1),e=e.substring(i[0].length),o+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):u(i[0]):i[0];else if(i=this.rules.link.exec(e))e=e.substring(i[0].length),this.inLink=!0,r=i[2],this.options.pedantic?(t=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r))?(r=t[1],s=t[3]):s="":s=i[3]?i[3].slice(1,-1):"",r=r.trim().replace(/^<([\s\S]*)>$/,"$1"),o+=this.outputLink(i,{href:h.escapes(r),title:h.escapes(s)}),this.inLink=!1;else if((i=this.rules.reflink.exec(e))||(i=this.rules.nolink.exec(e))){if(e=e.substring(i[0].length),t=(i[2]||i[1]).replace(/\s+/g," "),!(t=this.links[t.toLowerCase()])||!t.href){o+=i[0].charAt(0),e=i[0].substring(1)+e;continue}this.inLink=!0,o+=this.outputLink(i,t),this.inLink=!1}else if(i=this.rules.strong.exec(e))e=e.substring(i[0].length),o+=this.renderer.strong(this.output(i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.em.exec(e))e=e.substring(i[0].length),o+=this.renderer.em(this.output(i[6]||i[5]||i[4]||i[3]||i[2]||i[1]));else if(i=this.rules.code.exec(e))e=e.substring(i[0].length),o+=this.renderer.codespan(u(i[2].trim(),!0));else if(i=this.rules.br.exec(e))e=e.substring(i[0].length),o+=this.renderer.br();else if(i=this.rules.del.exec(e))e=e.substring(i[0].length),o+=this.renderer.del(this.output(i[1]));else if(i=this.rules.text.exec(e))e=e.substring(i[0].length),o+=this.renderer.text(u(this.smartypants(i[0])));else if(e)throw new Error("Infinite loop on byte: "+e.charCodeAt(0))}else{for(;l=i[0],i[0]=this.rules._backpedal.exec(i[0])[0],l!==i[0];);e=e.substring(i[0].length),"@"===i[2]?r="mailto:"+(n=u(i[0])):(n=u(i[0]),r="www."===i[1]?"http://"+n:n),o+=this.renderer.link(r,null,n)}return o},h.escapes=function(e){return e?e.replace(h.rules._escapes,"$1"):e},h.prototype.outputLink=function(e,t){var n=t.href,r=t.title?u(t.title):null;return"!"!==e[0].charAt(0)?this.renderer.link(n,r,this.output(e[1])):this.renderer.image(n,r,u(e[1]))},h.prototype.smartypants=function(e){return this.options.smartypants?e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):e},h.prototype.mangle=function(e){if(!this.options.mangle)return e;for(var t,n="",r=e.length,s=0;s<r;s++)t=e.charCodeAt(s),.5<Math.random()&&(t="x"+t.toString(16)),n+="&#"+t+";";return n},r.prototype.code=function(e,t,n){if(this.options.highlight){var r=this.options.highlight(e,t);null!=r&&r!==e&&(n=!0,e=r)}return t?'<pre><code class="'+this.options.langPrefix+u(t,!0)+'">'+(n?e:u(e,!0))+"</code></pre>\n":"<pre><code>"+(n?e:u(e,!0))+"</code></pre>"},r.prototype.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.prototype.html=function(e){return e},r.prototype.heading=function(e,t,n){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+n.toLowerCase().replace(/[^\w]+/g,"-")+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},r.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.prototype.list=function(e,t,n){var r=t?"ol":"ul";return"<"+r+(t&&1!==n?' start="'+n+'"':"")+">\n"+e+"</"+r+">\n"},r.prototype.listitem=function(e){return"<li>"+e+"</li>\n"},r.prototype.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},r.prototype.paragraph=function(e){return"<p>"+e+"</p>\n"},r.prototype.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},r.prototype.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.prototype.tablecell=function(e,t){var n=t.header?"th":"td";return(t.align?"<"+n+' align="'+t.align+'">':"<"+n+">")+e+"</"+n+">\n"},r.prototype.strong=function(e){return"<strong>"+e+"</strong>"},r.prototype.em=function(e){return"<em>"+e+"</em>"},r.prototype.codespan=function(e){return"<code>"+e+"</code>"},r.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.prototype.del=function(e){return"<del>"+e+"</del>"},r.prototype.link=function(e,t,n){if(this.options.sanitize){try{var r=decodeURIComponent(c(e)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return n}if(0===r.indexOf("javascript:")||0===r.indexOf("vbscript:")||0===r.indexOf("data:"))return n}this.options.baseUrl&&!o.test(e)&&(e=i(this.options.baseUrl,e));try{e=encodeURI(e).replace(/%25/g,"%")}catch(e){return n}var s='<a href="'+u(e)+'"';return t&&(s+=' title="'+t+'"'),s+=">"+n+"</a>"},r.prototype.image=function(e,t,n){this.options.baseUrl&&!o.test(e)&&(e=i(this.options.baseUrl,e));var r='<img src="'+e+'" alt="'+n+'"';return t&&(r+=' title="'+t+'"'),r+=this.options.xhtml?"/>":">"},r.prototype.text=function(e){return e},s.prototype.strong=s.prototype.em=s.prototype.codespan=s.prototype.del=s.prototype.text=function(e){return e},s.prototype.link=s.prototype.image=function(e,t,n){return""+n},s.prototype.br=function(){return""},p.parse=function(e,t){return new p(t).parse(e)},p.prototype.parse=function(e){this.inline=new h(e.links,this.options),this.inlineText=new h(e.links,f({},this.options,{renderer:new s})),this.tokens=e.reverse();for(var t="";this.next();)t+=this.tok();return t},p.prototype.next=function(){return this.token=this.tokens.pop()},p.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},p.prototype.parseText=function(){for(var e=this.token.text;"text"===this.peek().type;)e+="\n"+this.next().text;return this.inline.output(e)},p.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,c(this.inlineText.output(this.token.text)));case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var e,t,n,r,s="",i="";for(n="",e=0;e<this.token.header.length;e++)n+=this.renderer.tablecell(this.inline.output(this.token.header[e]),{header:!0,align:this.token.align[e]});for(s+=this.renderer.tablerow(n),e=0;e<this.token.cells.length;e++){for(t=this.token.cells[e],n="",r=0;r<t.length;r++)n+=this.renderer.tablecell(this.inline.output(t[r]),{header:!1,align:this.token.align[r]});i+=this.renderer.tablerow(n)}return this.renderer.table(s,i);case"blockquote_start":for(i="";"blockquote_end"!==this.next().type;)i+=this.tok();return this.renderer.blockquote(i);case"list_start":i="";for(var l=this.token.ordered,o=this.token.start;"list_end"!==this.next().type;)i+=this.tok();return this.renderer.list(i,l,o);case"list_item_start":i="";var a=this.token.loose;for(this.token.task&&(i+=this.renderer.checkbox(this.token.checked));"list_item_end"!==this.next().type;)i+=a||"text"!==this.token.type?this.tok():this.parseText();return this.renderer.listitem(i);case"html":return this.renderer.html(this.token.text);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}};var l={},o=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function g(){}function f(e){for(var t,n,r=1;r<arguments.length;r++)for(n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function x(e,t){var n=e.replace(/\|/g,function(e,t,n){for(var r=!1,s=t;0<=--s&&"\\"===n[s];)r=!r;return r?"|":" |"}).split(/ \|/),r=0;if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(/\\\|/g,"|");return n}function y(e,t,n){if(0===e.length)return"";for(var r=0;r<e.length;){var s=e.charAt(e.length-r-1);if(s!==t||n){if(s===t||!n)break;r++}else r++}return e.substr(0,e.length-r)}function d(e,n,r){if(null==e)throw new Error("marked(): input parameter is undefined or null");if("string"!=typeof e)throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected");if(r||"function"==typeof n){r||(r=n,n=null);var s,i,l=(n=f({},d.defaults,n||{})).highlight,t=0;try{s=a.lex(e,n)}catch(e){return r(e)}i=s.length;var o=function(t){if(t)return n.highlight=l,r(t);var e;try{e=p.parse(s,n)}catch(e){t=e}return n.highlight=l,t?r(t):r(null,e)};if(!l||l.length<3)return o();if(delete n.highlight,!i)return o();for(;t<s.length;t++)!function(n){"code"!==n.type?--i||o():l(n.text,n.lang,function(e,t){return e?o(e):null==t||t===n.text?--i||o():(n.text=t,n.escaped=!0,void(--i||o()))})}(s[t])}else try{return n&&(n=f({},d.defaults,n)),p.parse(a.lex(e,n),n)}catch(e){if(e.message+="\nPlease report this to https://github.com/markedjs/marked.",(n||d.defaults).silent)return"<p>An error occurred:</p><pre>"+u(e.message+"",!0)+"</pre>";throw e}}g.exec=g,d.options=d.setOptions=function(e){return f(d.defaults,e),d},d.getDefaults=function(){return{baseUrl:null,breaks:!1,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:new r,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tables:!0,xhtml:!1}},d.defaults=d.getDefaults(),d.Parser=p,d.parser=p.parse,d.Renderer=r,d.TextRenderer=s,d.Lexer=a,d.lexer=a.lex,d.InlineLexer=h,d.inlineLexer=h.output,d.parse=d,"undefined"!=typeof module&&"object"==typeof exports?module.exports=d:"function"==typeof define&&define.amd?define(function(){return d}):e.marked=d}(this||("undefined"!=typeof window?window:global));

/**
 * Czechitas Markdown Slides
 * https://github.com/AlesRuzickaEu/CzechitasMarkdownSlides
 */
(function () {

    function move(moveBy) {
        const sectionNumber = parseInt((location.hash).substr(2))
        const newId = `s${sectionNumber + moveBy}`
        if (document.getElementById(newId)) {
            location.hash = `#${newId}`
        }
    }

    document.addEventListener('keydown', e => {
        if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) { //space or right or down
            move(1)
            e.preventDefault()
        }

        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 8) { //backspace or left or up
            move(-1)
            e.preventDefault()
        }
    })

    // document.addEventListener('mousedown', e => {
    //     if (e.ctrlKey || e.altKey) {
    //         return
    //     }
    //     if (e.which === 1) {
    //         move(1)
    //     } else if (e.which === 3) {
    //         move(-1)
    //     }

    //     e.preventDefault()
    // })

    // document.addEventListener('wheel', e => {
    //     if (e.ctrlKey || e.altKey) {
    //         return
    //     }
    //     if (e.deltaY > 0) {
    //         move(1)
    //     } else if (e.deltaY < 0) {
    //         move(-1)
    //     }

    //     e.preventDefault()
    // })

    // document.addEventListener('contextmenu', e => {
    //     e.preventDefault()
    // })

    const slides = document.querySelectorAll('body > code')

    Array.prototype.forEach.call(slides, (e, index) => {
        e.id = `s${index + 1}`
        e.innerHTML = marked(e.innerHTML)
        e.dataset.page = index + 1
        e.dataset.total = slides.length
    })

    if (!location.hash) {
        location.hash = '#s1'
    }
})()
	
var styleEl = document.createElement('style');
styleEl.innerHTML = `/* Common */
body {
    margin: 0;
    padding: 0;
}

body > code {
    width: 99vw;
    min-height: 100vh;
    padding: 5vh 0 0 5vw;
    margin: 0;
    box-sizing: border-box;
    background-position: right 5vw top 5vh;
    background-repeat: no-repeat;
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 196.109 58.678" xmlns="http://www.w3.org/2000/svg"><path fill="%23e5007d" d="M4.01,24.23c0.49,0.68,1.37,1.2,1.62,1.92c0.25,0.71,0.3,1.38,0.28,2.08c-0.06,1.59-0.72,3.1-1.85,4.28 c-1.04-1.26-1.59-2.81-1.54-4.4C2.57,26.68,3.09,25.34,4.01,24.23 M4.21,22.38c-1.69,1.4-2.78,3.41-2.86,5.68 c-0.08,2.36,0.94,4.53,2.65,6.06h0c1.81-1.41,2.99-3.49,3.07-5.86c0.03-0.96,0-2.1-0.42-2.76C6.23,24.85,4.88,23.55,4.21,22.38 L4.21,22.38z"></path><path fill="%23e5007d" d="M36.75,14.93c-1.51-1.64-3.65-2.6-5.75-2.47l-0.12,0c0.26,1.33,0.1,3.1,0.19,3.98 c0.08,0.88,0.82,1.65,1.46,2.35c1.51,1.65,3.6,2.47,5.75,2.47c0.13,0,0.26,0,0.39-0.01C38.97,18.98,38.35,16.67,36.75,14.93z M33.39,18.01c-0.47-0.51-0.99-1.05-1.13-1.75c-0.15-0.7,0.06-1.69-0.02-2.53c1.42,0.25,2.69,0.93,3.65,1.98 c1.07,1.17,1.66,2.72,1.69,4.35C35.94,19.9,34.48,19.19,33.39,18.01z"></path><g><path fill="%23273582" d="M43.66,43.54L24.3,25.94l-0.71-0.65l-0.17-0.15l-0.66-0.6l-2.72-2.47v3.66v1.02v0.11v1.1v27.1l8.23-6.91 l4.78,9.76l5.98-3.24l-4.7-9.17L43.66,43.54z M37.53,54.21l-4.02,2.19l-4.89-9.99l-7.51,6.31V27.61v-1.09v-0.15v-1.02v-0.83 l0.62,0.56l0.71,0.65l0.14,0.13l0.76,0.69l18.01,16.37l-8.7,1.81L37.53,54.21z"></path></g><path fill="%23273582" d="M62.63,27.09h-0.17c-0.32-0.58-0.93-1.05-1.82-1.4c-0.89-0.36-1.97-0.54-3.23-0.54c-1.36,0-2.55,0.49-3.56,1.45 c-1.02,0.97-1.52,2.13-1.52,3.49c0,1.71,0.47,3.08,1.4,4.13c0.93,1.05,2.18,1.58,3.75,1.58c2.4,0,4.03-0.58,4.91-1.73h0.17v2.15 c0,1.13-0.51,2.06-1.52,2.78c-1.01,0.73-2.35,1.09-4.01,1.09c-2.61,0-4.85-0.89-6.73-2.68c-1.88-1.79-2.82-3.99-2.82-6.62 c0-2.77,0.91-5.11,2.73-7.02c1.82-1.91,4.26-2.87,7.33-2.87c1.48,0,2.69,0.39,3.65,1.16c0.96,0.77,1.43,1.72,1.43,2.85V27.09z"></path><path fill="%23273582" d="M79.52,37.57c0,0.55-0.25,1.05-0.74,1.5c-0.5,0.45-1.04,0.68-1.64,0.68h-9.09c-1.04,0-1.83-0.22-2.37-0.66 c-0.54-0.44-0.81-1.04-0.81-1.8c0-1.38,0.94-3.09,2.84-5.12l4.7-5.12c0.81-0.92,1.34-1.62,1.59-2.1h-9.16v-1.42 c0-0.71,0.26-1.3,0.79-1.76c0.53-0.46,1.29-0.69,2.28-0.69h8.47c0.99,0,1.72,0.24,2.2,0.73c0.47,0.49,0.71,1.04,0.71,1.66 c0,1.57-0.79,3.22-2.39,4.95l-4.67,5.05c-0.83,0.92-1.42,1.69-1.76,2.32h9.06V37.57z"></path><path fill="%23273582" d="M97.88,27.89c0,1.68-0.67,2.86-2.02,3.53c-1.35,0.67-3.59,1-6.73,1h-3.04c0.16,1.15,0.73,2.08,1.69,2.78 c0.97,0.7,2.14,1.05,3.53,1.05c2.54,0,4.44-0.59,5.71-1.76h0.17v1.45c0,2.81-2.25,4.22-6.74,4.22c-2.42,0-4.55-0.88-6.4-2.63 c-1.84-1.75-2.77-4-2.77-6.74c0-3.07,0.85-5.52,2.54-7.37c1.69-1.84,3.89-2.77,6.59-2.77c2.03,0,3.78,0.67,5.26,2.01 C97.14,24,97.88,25.74,97.88,27.89z M93.52,27.33c0-0.92-0.31-1.62-0.93-2.09c-0.62-0.47-1.49-0.71-2.59-0.71 c-1.11,0-2.02,0.39-2.75,1.16c-0.73,0.77-1.11,1.71-1.16,2.82l-0.03,0.62h2.08c2.14,0,3.58-0.13,4.3-0.4 C93.16,28.47,93.52,28,93.52,27.33z"></path><path fill="%23273582" d="M115.07,27.09h-0.17c-0.32-0.58-0.93-1.05-1.81-1.4c-0.89-0.36-1.97-0.54-3.23-0.54 c-1.36,0-2.55,0.49-3.56,1.45c-1.01,0.97-1.52,2.13-1.52,3.49c0,1.71,0.47,3.08,1.4,4.13c0.93,1.05,2.18,1.58,3.75,1.58 c2.4,0,4.03-0.58,4.91-1.73H115v2.15c0,1.13-0.51,2.06-1.52,2.78c-1.01,0.73-2.35,1.09-4.01,1.09c-2.6,0-4.85-0.89-6.72-2.68 c-1.88-1.79-2.82-3.99-2.82-6.62c0-2.77,0.91-5.11,2.73-7.02c1.82-1.91,4.27-2.87,7.33-2.87c1.47,0,2.69,0.39,3.65,1.16 c0.95,0.77,1.43,1.72,1.43,2.85V27.09z"></path><path fill="%23273582" d="M134.75,39.75h-1.52c-0.97,0-1.74-0.27-2.3-0.81c-0.57-0.54-0.85-1.31-0.85-2.3v-7.61 c0-1.45-0.34-2.52-1.02-3.22c-0.68-0.69-1.57-1.04-2.68-1.04c-0.88,0-1.66,0.36-2.34,1.07c-0.68,0.71-1.02,1.82-1.02,3.32v10.58 h-1.52c-2.12,0-3.18-1.04-3.18-3.11V14.85h1.45c1.06,0,1.87,0.27,2.44,0.81c0.56,0.54,0.85,1.26,0.85,2.16v5.33 c0.39-0.64,0.96-1.22,1.71-1.73c0.75-0.51,1.53-0.76,2.33-0.76c2.42,0,4.3,0.71,5.64,2.11c1.34,1.4,2.01,3.42,2.01,6.05V39.75z"></path><g><path fill="%23e5007d" d="M142.97,15.13c0.54,0.53,0.81,1.16,0.81,1.9c0,0.74-0.27,1.38-0.81,1.92c-0.54,0.54-1.18,0.81-1.92,0.81 c-0.74,0-1.37-0.27-1.9-0.81c-0.53-0.54-0.8-1.18-0.8-1.92c0-0.74,0.27-1.37,0.8-1.9c0.53-0.53,1.16-0.8,1.9-0.8 C141.79,14.33,142.43,14.6,142.97,15.13z M147.1,37.12c0,0.99-0.21,1.71-0.64,2.15c-0.43,0.44-1.14,0.66-2.13,0.66 c-1.8,0-3.18-0.5-4.13-1.49c-0.96-0.99-1.43-2.43-1.43-4.32V21.49h1.31c2.21,0,3.32,1.15,3.32,3.46v8.71 c0,0.92,0.21,1.56,0.64,1.92c0.43,0.36,1.16,0.53,2.2,0.53h0.86V37.12z"></path></g><g><path fill="%23e5007d" d="M149.07,21.84c0-0.88,0.09-1.56,0.28-2.04c0.19-0.49,0.54-1.04,1.07-1.66c0.74-0.85,1.46-1.28,2.18-1.28h1.07 v4.22h6.47v1.9c0,0.55-0.24,1.06-0.73,1.52c-0.49,0.46-1.16,0.69-2.04,0.69h-3.7v7.3c0,2.24,0.98,3.36,2.94,3.36 c1.52,0,2.64-0.22,3.35-0.66h0.18v1.66c0,0.97-0.35,1.73-1.06,2.28c-0.7,0.55-1.71,0.83-3.03,0.83c-2.31,0-4.05-0.6-5.22-1.8 c-1.18-1.2-1.76-2.91-1.76-5.12V21.84z"></path></g><path fill="%23273582" d="M177.38,33.39c0,1.96-0.66,3.56-1.97,4.81c-1.31,1.25-3.01,1.87-5.08,1.87h-0.93c-2.19,0-3.98-0.55-5.38-1.66 c-1.4-1.11-2.09-2.53-2.09-4.25c0-1.8,0.73-3.22,2.2-4.27c1.46-1.05,3.82-1.57,7.07-1.57h1.63v-0.24c0-1.29-0.31-2.19-0.93-2.68 c-0.62-0.5-1.65-0.74-3.08-0.74c-1.5,0-2.75,0.22-3.75,0.66c-1,0.44-1.72,0.93-2.16,1.49h-0.17v-1.49c0-1.2,0.56-2.26,1.69-3.18 c1.13-0.92,2.82-1.38,5.09-1.38c1.11,0,2.11,0.14,3.01,0.41c0.9,0.28,1.72,0.72,2.47,1.33c0.75,0.61,1.34,1.48,1.76,2.61 c0.42,1.13,0.64,2.46,0.64,4.01V33.39z M172.85,33.42v-1.8h-1.66c-1.68,0-2.86,0.19-3.53,0.57c-0.67,0.38-1,0.97-1,1.78 c0,0.74,0.28,1.31,0.85,1.71c0.57,0.4,1.36,0.61,2.37,0.61C171.86,36.29,172.85,35.34,172.85,33.42z"></path><path fill="%23273582" d="M194.11,33.87c0,1.98-0.68,3.53-2.03,4.63c-1.35,1.11-3.27,1.66-5.75,1.66c-1.68,0-3.1-0.37-4.26-1.11 c-1.15-0.74-1.73-1.59-1.73-2.56v-2.11h0.17c0.51,0.48,1.3,0.9,2.37,1.25c1.07,0.35,2.15,0.52,3.23,0.52c2.26,0,3.39-0.68,3.39-2.04 c0-0.55-0.26-0.98-0.78-1.28c-0.52-0.3-1.55-0.55-3.1-0.76c-1.98-0.28-3.45-0.82-4.41-1.62c-0.96-0.81-1.43-1.91-1.43-3.32 c0-1.8,0.74-3.33,2.21-4.58c1.48-1.26,3.38-1.89,5.7-1.89c1.94,0,3.41,0.4,4.43,1.21c1.01,0.81,1.52,1.73,1.52,2.77v1.76h-0.17 c-0.48-0.51-1.22-0.92-2.21-1.25c-0.99-0.32-2.03-0.48-3.11-0.48c-2.49,0-3.73,0.69-3.73,2.07c0,0.49,0.23,0.85,0.71,1.09 c0.47,0.24,1.48,0.49,3.03,0.74C192.13,29.22,194.11,30.99,194.11,33.87z"></path><path fill="%23e5007d" d="M29.75,13.15l-0.21-1.12C28.15,6.15,22.89,1.78,16.59,1.78C9.24,1.78,3.28,7.74,3.28,15.1 c0,2.24,0.56,4.34,1.53,6.19l-0.01,0l0.06,0.11c0.03,0.06,0.07,0.11,0.1,0.17l0.45,0.73c2.37,3.67,6.49,6.11,11.18,6.11 c1.19,0,2.34-0.17,3.44-0.46v-1.1v-0.11c-1.09,0.32-2.24,0.5-3.44,0.5c-4.2,0-7.91-2.14-10.09-5.39c2.42-1.04,4.82-2.62,6.95-4.58 c2.82-2.59,4.95-5.56,6.16-8.6l0.35-0.87l0.63,0.7c1.09,1.2,2.4,2.26,3.78,3.04c1.38,0.79,2.81,1.28,4.18,1.48 c0.12,0.68,0.19,1.37,0.19,2.08c0,4.17-2.11,7.85-5.32,10.04l0.17,0.15l0.71,0.65c3.39-2.41,5.61-6.37,5.61-10.84 C29.91,14.43,29.84,13.78,29.75,13.15z M12.68,16.42c-2.09,1.92-4.42,3.44-6.78,4.43c-0.93-1.71-1.45-3.67-1.45-5.75 c0-6.7,5.45-12.15,12.15-12.15c1,0,1.96,0.13,2.89,0.36C19.68,7.34,17.09,12.38,12.68,16.42z M24.94,10.54 c-1.72-0.98-3.45-2.6-4.59-4.2c0.17-0.84,0.3-1.9,0.3-2.68c3.69,1.31,6.56,4.35,7.63,8.15C27.18,11.59,26.06,11.17,24.94,10.54z"></path></svg>');
    background-size: 15vw;

    font-family: Tahoma;
    display: none;
    font-size: 5vh;
    line-height: 200%;
}

body > code:target {
    display: block;
}

body > code::after {
    display: block;
    position: absolute;
    content: attr(data-page)'/'attr(data-total);
    bottom: 1vh;
    left: 1vh;
    font-size: 2vh;
    font-family: Tahoma;
    line-height: normal;
    text-align: right;
}

h1, h2, h3 {
    color: #2B3990;
    font-weight: normal;
    font-size: 8vh;
}
h2 {
    font-size: 7vh;
}
h3 {
    font-size: 6vh;
}

a, em {
    color: #e5007d;
    font-style: normal;
}

img {
    max-width: 90vw;
    max-height: 70vh;
}

ul {
    list-style: disc;
}

/* Compact */
.compact {
    line-height: 150%;
}

/* Fullscreen */
.fullscreen {
    padding: 0;
}
.fullscreen  img {
    max-width: 99vw;
    max-height: 100vh;
}

/* Standout */
.standout {
    font-family: 'Amatic SC', cursive;
    text-align: center;
    font-size: 10vh;
    line-height: 85vh;
}
.standout p {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
}

/* Centered */
.centered p {
    text-align: center;
}

/* Inverted */
.inverted {
    background-color: #2D2E82;
    color: #fff;
    background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 196.109 58.678" xmlns="http://www.w3.org/2000/svg"><path fill="%23ffffff" d="M4.01,24.23c0.49,0.68,1.37,1.2,1.62,1.92c0.25,0.71,0.3,1.38,0.28,2.08c-0.06,1.59-0.72,3.1-1.85,4.28 c-1.04-1.26-1.59-2.81-1.54-4.4C2.57,26.68,3.09,25.34,4.01,24.23 M4.21,22.38c-1.69,1.4-2.78,3.41-2.86,5.68 c-0.08,2.36,0.94,4.53,2.65,6.06h0c1.81-1.41,2.99-3.49,3.07-5.86c0.03-0.96,0-2.1-0.42-2.76C6.23,24.85,4.88,23.55,4.21,22.38 L4.21,22.38z"></path><path fill="%23ffffff" d="M36.75,14.93c-1.51-1.64-3.65-2.6-5.75-2.47l-0.12,0c0.26,1.33,0.1,3.1,0.19,3.98 c0.08,0.88,0.82,1.65,1.46,2.35c1.51,1.65,3.6,2.47,5.75,2.47c0.13,0,0.26,0,0.39-0.01C38.97,18.98,38.35,16.67,36.75,14.93z M33.39,18.01c-0.47-0.51-0.99-1.05-1.13-1.75c-0.15-0.7,0.06-1.69-0.02-2.53c1.42,0.25,2.69,0.93,3.65,1.98 c1.07,1.17,1.66,2.72,1.69,4.35C35.94,19.9,34.48,19.19,33.39,18.01z"></path><g><path fill="%23ffffff" d="M43.66,43.54L24.3,25.94l-0.71-0.65l-0.17-0.15l-0.66-0.6l-2.72-2.47v3.66v1.02v0.11v1.1v27.1l8.23-6.91 l4.78,9.76l5.98-3.24l-4.7-9.17L43.66,43.54z M37.53,54.21l-4.02,2.19l-4.89-9.99l-7.51,6.31V27.61v-1.09v-0.15v-1.02v-0.83 l0.62,0.56l0.71,0.65l0.14,0.13l0.76,0.69l18.01,16.37l-8.7,1.81L37.53,54.21z"></path></g><path fill="%23ffffff" d="M62.63,27.09h-0.17c-0.32-0.58-0.93-1.05-1.82-1.4c-0.89-0.36-1.97-0.54-3.23-0.54c-1.36,0-2.55,0.49-3.56,1.45 c-1.02,0.97-1.52,2.13-1.52,3.49c0,1.71,0.47,3.08,1.4,4.13c0.93,1.05,2.18,1.58,3.75,1.58c2.4,0,4.03-0.58,4.91-1.73h0.17v2.15 c0,1.13-0.51,2.06-1.52,2.78c-1.01,0.73-2.35,1.09-4.01,1.09c-2.61,0-4.85-0.89-6.73-2.68c-1.88-1.79-2.82-3.99-2.82-6.62 c0-2.77,0.91-5.11,2.73-7.02c1.82-1.91,4.26-2.87,7.33-2.87c1.48,0,2.69,0.39,3.65,1.16c0.96,0.77,1.43,1.72,1.43,2.85V27.09z"></path><path fill="%23ffffff" d="M79.52,37.57c0,0.55-0.25,1.05-0.74,1.5c-0.5,0.45-1.04,0.68-1.64,0.68h-9.09c-1.04,0-1.83-0.22-2.37-0.66 c-0.54-0.44-0.81-1.04-0.81-1.8c0-1.38,0.94-3.09,2.84-5.12l4.7-5.12c0.81-0.92,1.34-1.62,1.59-2.1h-9.16v-1.42 c0-0.71,0.26-1.3,0.79-1.76c0.53-0.46,1.29-0.69,2.28-0.69h8.47c0.99,0,1.72,0.24,2.2,0.73c0.47,0.49,0.71,1.04,0.71,1.66 c0,1.57-0.79,3.22-2.39,4.95l-4.67,5.05c-0.83,0.92-1.42,1.69-1.76,2.32h9.06V37.57z"></path><path fill="%23ffffff" d="M97.88,27.89c0,1.68-0.67,2.86-2.02,3.53c-1.35,0.67-3.59,1-6.73,1h-3.04c0.16,1.15,0.73,2.08,1.69,2.78 c0.97,0.7,2.14,1.05,3.53,1.05c2.54,0,4.44-0.59,5.71-1.76h0.17v1.45c0,2.81-2.25,4.22-6.74,4.22c-2.42,0-4.55-0.88-6.4-2.63 c-1.84-1.75-2.77-4-2.77-6.74c0-3.07,0.85-5.52,2.54-7.37c1.69-1.84,3.89-2.77,6.59-2.77c2.03,0,3.78,0.67,5.26,2.01 C97.14,24,97.88,25.74,97.88,27.89z M93.52,27.33c0-0.92-0.31-1.62-0.93-2.09c-0.62-0.47-1.49-0.71-2.59-0.71 c-1.11,0-2.02,0.39-2.75,1.16c-0.73,0.77-1.11,1.71-1.16,2.82l-0.03,0.62h2.08c2.14,0,3.58-0.13,4.3-0.4 C93.16,28.47,93.52,28,93.52,27.33z"></path><path fill="%23ffffff" d="M115.07,27.09h-0.17c-0.32-0.58-0.93-1.05-1.81-1.4c-0.89-0.36-1.97-0.54-3.23-0.54 c-1.36,0-2.55,0.49-3.56,1.45c-1.01,0.97-1.52,2.13-1.52,3.49c0,1.71,0.47,3.08,1.4,4.13c0.93,1.05,2.18,1.58,3.75,1.58 c2.4,0,4.03-0.58,4.91-1.73H115v2.15c0,1.13-0.51,2.06-1.52,2.78c-1.01,0.73-2.35,1.09-4.01,1.09c-2.6,0-4.85-0.89-6.72-2.68 c-1.88-1.79-2.82-3.99-2.82-6.62c0-2.77,0.91-5.11,2.73-7.02c1.82-1.91,4.27-2.87,7.33-2.87c1.47,0,2.69,0.39,3.65,1.16 c0.95,0.77,1.43,1.72,1.43,2.85V27.09z"></path><path fill="%23ffffff" d="M134.75,39.75h-1.52c-0.97,0-1.74-0.27-2.3-0.81c-0.57-0.54-0.85-1.31-0.85-2.3v-7.61 c0-1.45-0.34-2.52-1.02-3.22c-0.68-0.69-1.57-1.04-2.68-1.04c-0.88,0-1.66,0.36-2.34,1.07c-0.68,0.71-1.02,1.82-1.02,3.32v10.58 h-1.52c-2.12,0-3.18-1.04-3.18-3.11V14.85h1.45c1.06,0,1.87,0.27,2.44,0.81c0.56,0.54,0.85,1.26,0.85,2.16v5.33 c0.39-0.64,0.96-1.22,1.71-1.73c0.75-0.51,1.53-0.76,2.33-0.76c2.42,0,4.3,0.71,5.64,2.11c1.34,1.4,2.01,3.42,2.01,6.05V39.75z"></path><g><path fill="%23ffffff" d="M142.97,15.13c0.54,0.53,0.81,1.16,0.81,1.9c0,0.74-0.27,1.38-0.81,1.92c-0.54,0.54-1.18,0.81-1.92,0.81 c-0.74,0-1.37-0.27-1.9-0.81c-0.53-0.54-0.8-1.18-0.8-1.92c0-0.74,0.27-1.37,0.8-1.9c0.53-0.53,1.16-0.8,1.9-0.8 C141.79,14.33,142.43,14.6,142.97,15.13z M147.1,37.12c0,0.99-0.21,1.71-0.64,2.15c-0.43,0.44-1.14,0.66-2.13,0.66 c-1.8,0-3.18-0.5-4.13-1.49c-0.96-0.99-1.43-2.43-1.43-4.32V21.49h1.31c2.21,0,3.32,1.15,3.32,3.46v8.71 c0,0.92,0.21,1.56,0.64,1.92c0.43,0.36,1.16,0.53,2.2,0.53h0.86V37.12z"></path></g><g><path fill="%23ffffff" d="M149.07,21.84c0-0.88,0.09-1.56,0.28-2.04c0.19-0.49,0.54-1.04,1.07-1.66c0.74-0.85,1.46-1.28,2.18-1.28h1.07 v4.22h6.47v1.9c0,0.55-0.24,1.06-0.73,1.52c-0.49,0.46-1.16,0.69-2.04,0.69h-3.7v7.3c0,2.24,0.98,3.36,2.94,3.36 c1.52,0,2.64-0.22,3.35-0.66h0.18v1.66c0,0.97-0.35,1.73-1.06,2.28c-0.7,0.55-1.71,0.83-3.03,0.83c-2.31,0-4.05-0.6-5.22-1.8 c-1.18-1.2-1.76-2.91-1.76-5.12V21.84z"></path></g><path fill="%23ffffff" d="M177.38,33.39c0,1.96-0.66,3.56-1.97,4.81c-1.31,1.25-3.01,1.87-5.08,1.87h-0.93c-2.19,0-3.98-0.55-5.38-1.66 c-1.4-1.11-2.09-2.53-2.09-4.25c0-1.8,0.73-3.22,2.2-4.27c1.46-1.05,3.82-1.57,7.07-1.57h1.63v-0.24c0-1.29-0.31-2.19-0.93-2.68 c-0.62-0.5-1.65-0.74-3.08-0.74c-1.5,0-2.75,0.22-3.75,0.66c-1,0.44-1.72,0.93-2.16,1.49h-0.17v-1.49c0-1.2,0.56-2.26,1.69-3.18 c1.13-0.92,2.82-1.38,5.09-1.38c1.11,0,2.11,0.14,3.01,0.41c0.9,0.28,1.72,0.72,2.47,1.33c0.75,0.61,1.34,1.48,1.76,2.61 c0.42,1.13,0.64,2.46,0.64,4.01V33.39z M172.85,33.42v-1.8h-1.66c-1.68,0-2.86,0.19-3.53,0.57c-0.67,0.38-1,0.97-1,1.78 c0,0.74,0.28,1.31,0.85,1.71c0.57,0.4,1.36,0.61,2.37,0.61C171.86,36.29,172.85,35.34,172.85,33.42z"></path><path fill="%23ffffff" d="M194.11,33.87c0,1.98-0.68,3.53-2.03,4.63c-1.35,1.11-3.27,1.66-5.75,1.66c-1.68,0-3.1-0.37-4.26-1.11 c-1.15-0.74-1.73-1.59-1.73-2.56v-2.11h0.17c0.51,0.48,1.3,0.9,2.37,1.25c1.07,0.35,2.15,0.52,3.23,0.52c2.26,0,3.39-0.68,3.39-2.04 c0-0.55-0.26-0.98-0.78-1.28c-0.52-0.3-1.55-0.55-3.1-0.76c-1.98-0.28-3.45-0.82-4.41-1.62c-0.96-0.81-1.43-1.91-1.43-3.32 c0-1.8,0.74-3.33,2.21-4.58c1.48-1.26,3.38-1.89,5.7-1.89c1.94,0,3.41,0.4,4.43,1.21c1.01,0.81,1.52,1.73,1.52,2.77v1.76h-0.17 c-0.48-0.51-1.22-0.92-2.21-1.25c-0.99-0.32-2.03-0.48-3.11-0.48c-2.49,0-3.73,0.69-3.73,2.07c0,0.49,0.23,0.85,0.71,1.09 c0.47,0.24,1.48,0.49,3.03,0.74C192.13,29.22,194.11,30.99,194.11,33.87z"></path><path fill="%23ffffff" d="M29.75,13.15l-0.21-1.12C28.15,6.15,22.89,1.78,16.59,1.78C9.24,1.78,3.28,7.74,3.28,15.1 c0,2.24,0.56,4.34,1.53,6.19l-0.01,0l0.06,0.11c0.03,0.06,0.07,0.11,0.1,0.17l0.45,0.73c2.37,3.67,6.49,6.11,11.18,6.11 c1.19,0,2.34-0.17,3.44-0.46v-1.1v-0.11c-1.09,0.32-2.24,0.5-3.44,0.5c-4.2,0-7.91-2.14-10.09-5.39c2.42-1.04,4.82-2.62,6.95-4.58 c2.82-2.59,4.95-5.56,6.16-8.6l0.35-0.87l0.63,0.7c1.09,1.2,2.4,2.26,3.78,3.04c1.38,0.79,2.81,1.28,4.18,1.48 c0.12,0.68,0.19,1.37,0.19,2.08c0,4.17-2.11,7.85-5.32,10.04l0.17,0.15l0.71,0.65c3.39-2.41,5.61-6.37,5.61-10.84 C29.91,14.43,29.84,13.78,29.75,13.15z M12.68,16.42c-2.09,1.92-4.42,3.44-6.78,4.43c-0.93-1.71-1.45-3.67-1.45-5.75 c0-6.7,5.45-12.15,12.15-12.15c1,0,1.96,0.13,2.89,0.36C19.68,7.34,17.09,12.38,12.68,16.42z M24.94,10.54 c-1.72-0.98-3.45-2.6-4.59-4.2c0.17-0.84,0.3-1.9,0.3-2.68c3.69,1.31,6.56,4.35,7.63,8.15C27.18,11.59,26.06,11.17,24.94,10.54z"></path></svg>')
}
.inverted h1, .inverted h2, .inverted h3 {
    color: #fff;
}

/* Print */
@media print {
    body > code, .inverted {
        display: block;
        background-color: #fff;
        color: #000;
        background-image: none;
        padding: 2vh 2vw;
        line-height: 150%;
    }
    h1, h2, h3, 
    .inverted h1, .inverted h2, .inverted h3 {
        color: #000;
    }
    
    .compact {
        line-height: 120%;
    }
    body > code::after {
        display: none;
    }
    em {
        color: #000;
        font-style: italic;
    }
    a {
        color: #000;
    }
}

/* Fonts */
/* latin-ext */
@font-face {
    font-family: 'Amatic SC';
    font-style: normal;
    font-weight: 400;
    src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(https://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOEBOSfQZQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
    font-family: 'Amatic SC';
    font-style: normal;
    font-weight: 400;
    src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(https://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOECuSf.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
  `;
document.head.appendChild(styleEl);
	
