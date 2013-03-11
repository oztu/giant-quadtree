Quadtree=function(){var e=function(e,t){function n(e,t,n,r,i){this.objects=[],this.left=e,this.top=t,this.width=n,this.height=r,this.parent=i}return e.exports=t,e.exports=n,n.prototype.tl=void 0,n.prototype.tr=void 0,n.prototype.br=void 0,n.prototype.bl=void 0,n.prototype.OBJECT_LIMIT=200,n.prototype.clear=function(){this.objects=[],this.tl&&(this.tl.clear(),this.tr.clear(),this.br.clear(),this.bl.clear())},n.prototype.getObjects=function(){return this.tl?this.objects.concat(this.tl.getObjects(),this.tr.getObjects(),this.br.getObjects(),this.bl.getObjects()):this.objects.slice()},n.prototype.split=function(){var e=this.width/2,t=this.height/2,r=this.left,i=this.top;this.tl=new n(r,i,e,t,this),this.tr=new n(r+e,i,e,t,this),this.br=new n(r+e,i+t,e,t,this),this.bl=new n(r,i+t,e,t,this)},n.prototype.parentNode=function(e){var t=this,n;return e.left<t.left?e.top<t.top?n=t.grow(t.width,t.height):n=t.grow(t.width,0):e.left+e.width>t.left+t.width?e.top<t.top?n=t.grow(0,t.height):n=t.grow(0,0):e.top<t.top?n=t.grow(0,t.height):e.top+e.height>t.top+t.height&&(n=t.grow(0,0)),n?n.parentNode(e):t},n.prototype.getQuadrantAt=function(e,t){if(!this.tl)return this;var n=this.left+this.width/2,r=this.top+this.height/2;return e<n?t<r?this.tl.tl&&this.tl.getQuadrantAt(e,t)||this.tl:this.bl.tl&&this.bl.getQuadrantAt(e,t)||this.bl:t<r?this.tr.tl&&this.tr.getQuadrantAt(e,t)||this.tr:this.br.tl&&this.br.getQuadrantAt(e,t)||this.br},n.prototype.getInteractableObjects=function(e,t,n,r){if(!this.tl)return this.objects.slice();var i=this.getQuadrant(e,t,n,r),s=[i.objects],o=[i],u=i.parent;while(u)s.push(u.objects),o.push(u),u=u.parent;if(i.tl){var a=i.getQuadrantAt(e,t);~o.indexOf(a)||(o.push(a),s.push(a.objects),a.parent&&!~o.indexOf(a.parent)&&(o.push(a.parent),s.push(a.parent.objects))),a=i.getQuadrantAt(e+n,t),~o.indexOf(a)||(o.push(a),s.push(a.objects),a.parent&&!~o.indexOf(a.parent)&&(o.push(a.parent),s.push(a.parent.objects))),a=i.getQuadrantAt(e+n,t+r),~o.indexOf(a)||(o.push(a),s.push(a.objects),a.parent&&!~o.indexOf(a.parent)&&(o.push(a.parent),s.push(a.parent.objects))),a=i.getQuadrantAt(e,t+r),~o.indexOf(a)||(o.push(a),s.push(a.objects),a.parent&&!~o.indexOf(a.parent)&&s.push(a.parent.objects))}return Array.prototype.concat.apply([],s)},n.prototype.getQuadrant=function(e,t,n,r){if(!this.tl)return this;var i=this.left+this.width/2,s=this.top+this.height/2,o=t<s&&t+r<s,u=t>s;if(e<i&&e+n<i){if(o)return this.tl.tl&&this.tl.getQuadrant(e,t,n,r)||this.tl;if(u)return this.bl.tl&&this.bl.getQuadrant(e,t,n,r)||this.bl}else if(e>i){if(o)return this.tr.tl&&this.tr.getQuadrant(e,t,n,r)||this.tr;if(u)return this.br.tl&&this.br.getQuadrant(e,t,n,r)||this.br}return this},n.prototype.insert=function(e){var t,n,r,i,s,o;o=this.parentNode(e),t=o.getQuadrant(e.left,e.top,e.width,e.height);if(t!==o)t.insert(e);else{s=o.objects,s.push(e),n=0,r=s.length;if(r>o.OBJECT_LIMIT){o.tl||o.split(),i=[];for(;n<r;n++)e=o.objects[n],t=o.getQuadrant(e.left,e.top,e.width,e.height),t!==o?t.insert(e):i.push(e);o.objects=i}}return o},n.prototype.grow=function(e,t){var r=this.left-e,i=this.top-t,s=new n(r,i,this.width*2,this.height*2);return this.parent=s,e?t?s.br=this:s.tr=this:t?s.bl=this:s.tl=this,s.tl=s.tl||new n(r,i,this.width,this.height,this),s.tr=s.tr||new n(r+this.width,i,this.width,this.height,this),s.br=s.br||new n(r+this.width,i+this.height,this.width,this.height,this),s.bl=s.bl||new n(r,i+this.height,this.width,this.height,this),s},e.exports}({},{}),t=function(t,n){t.exports=n;var r=e,i=t.exports=function(e,t){e&&(this.width=e,this.height=t?t:e),this.reset()};return i.create=function(e,t){var n=new i(e,t);return i.getApi(n)},i.getApi=function(e){var t={};return t.insert=e.insert.bind(e),t.reset=e.reset.bind(e),t.getObjects=e.getObjects.bind(e),t.hasObject=e.hasObject.bind(e),t.prune=e.prune.bind(e),t},i.prototype.width=1e4,i.prototype.height=1e4,i.prototype.reset=function(e,t){e=e||0,t=t||0;var n=-(this.width/2),i=-(this.height/2);this.top=new r(e+n,t+i,this.width,this.height)},i.prototype.insert=function(e){this.top=this.top.insert(e)},i.prototype.getObjects=function(e,t,n,r){if(e!==void 0){var i=this.top.getInteractableObjects(e,t,n,r),s=i.index,o,u=[];while(--s)o=i[o],(t<o.top?bottom>o.top:o.top+o.height>t)&&(e<o.left?right>o.left:o.left+o.width>e)&&u.push(o);return u}return this.top.getObjects()},i.prototype.prune=function(e,t,n,r){var i=e+n,s=t+r,o,u=[];keptObjects=[];var a=this.top.getObjects(),f=0,l=a.length;for(;f<l;f++)o=a[f],o.left<e||o.top<t||o.left+o.width>i||o.top+o.height>s?u.push(o):keptObjects.push(o);if(keptObjects.length){this.reset(keptObjects[0].left,keptObjects[0].top),f=0,l=keptObjects.length;for(;f<l;f++)this.insert(keptObjects[f])}else this.reset();return u},i.prototype.hasObject=function(e,t,n,r){var i=this.top.getInteractableObjects(e,t,n,r),s=i.length,o=0,u=t+r,a=e+n,f;for(;o<s;o++){f=i[o];if((t<f.top?u>f.top:f.top+f.height>t)&&(e<f.left?a>f.left:f.left+f.width>e))return f}return!1},t.exports}({},{});return t}();