/*
 Highcharts JS v10.3.3 (2023-01-20)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/draggable-points",["highcharts"],function(r){f(r);f.Highcharts=r;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function r(f,m,r,x){f.hasOwnProperty(m)||(f[m]=x.apply(null,r),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:m,module:f[m]}})))}f=f?f._modules:
{};r(f,"Extensions/DraggablePoints.js",[f["Core/Animation/AnimationUtilities.js"],f["Core/Chart/Chart.js"],f["Core/Globals.js"],f["Core/Series/Point.js"],f["Core/Series/Series.js"],f["Core/Series/SeriesRegistry.js"],f["Core/Utilities.js"]],function(f,m,r,x,D,y,u){function E(a){return{left:"right",right:"left",top:"bottom",bottom:"top"}[a]}function M(a){var b=["draggableX","draggableY"],c;v(a.dragDropProps,function(a){a.optionName&&b.push(a.optionName)});for(c=b.length;c--;)if(a.options.dragDrop[b[c]])return!0}
function N(a){var b=a.series?a.series.length:0;if(a.hasCartesianSeries&&!a.polar)for(;b--;)if(a.series[b].options.dragDrop&&M(a.series[b]))return!0}function O(a){var b=a.series,c=b.options.dragDrop||{};a=a.options&&a.options.dragDrop;var d,e;v(b.dragDropProps,function(a){"x"===a.axis&&a.move?d=!0:"y"===a.axis&&a.move&&(e=!0)});return(c.draggableX&&d||c.draggableY&&e)&&!(a&&!1===a.draggableX&&!1===a.draggableY)&&b.yAxis&&b.xAxis}function A(a,b){return"undefined"===typeof a.chartX||"undefined"===typeof a.chartY?
b.pointer.normalize(a):a}function B(a,b,c,d){var e=b.map(function(b){return w(a,b,c,d)});return function(){e.forEach(function(a){a()})}}function P(a,b,c){var d=b.dragDropData.origin;b=d.chartX;d=d.chartY;var e=a.chartX;a=a.chartY;return Math.sqrt((e-b)*(e-b)+(a-d)*(a-d))>c}function Q(a,b,c){var d={chartX:a.chartX,chartY:a.chartY,guideBox:c&&{x:c.attr("x"),y:c.attr("y"),width:c.attr("width"),height:c.attr("height")},points:{}};b.forEach(function(b){var c={};v(b.series.dragDropProps,function(d,e){d=
b.series[d.axis+"Axis"];c[e]=b[e];c[e+"Offset"]=d.toPixels(b[e])-(d.horiz?a.chartX:a.chartY)});c.point=b;d.points[b.id]=c});return d}function R(a){var b=a.series,c=[],d=b.options.dragDrop.groupBy;b.boosted?b.options.data.forEach(function(a,d){c.push((new b.pointClass).init(b,a));c[c.length-1].index=d}):c=b.points;return a.options[d]?c.filter(function(b){return b.options[d]===a.options[d]}):[a]}function F(a,b){var c=R(b),d=b.series,e=d.chart,q;z(d.options.dragDrop&&d.options.dragDrop.liveRedraw,!0)||
(e.dragGuideBox=q=d.getGuideBox(c),e.setGuideBoxState("default",d.options.dragDrop.guideBox).add(d.group));e.dragDropData={origin:Q(a,c,q),point:b,groupedPoints:c,isDragging:!0}}function S(a,b){var c=a.point,d=t(c.series.options.dragDrop,c.options.dragDrop),e={},q=a.updateProp,n={};v(c.series.dragDropProps,function(a,b){if(!q||q===b&&a.resize&&(!a.optionName||!1!==d[a.optionName]))if(q||a.move&&("x"===a.axis&&d.draggableX||"y"===a.axis&&d.draggableY))e[b]=a});(q?[c]:a.groupedPoints).forEach(function(c){n[c.id]=
{point:c,newValues:c.getDropValues(a.origin,b,e)}});return n}function G(a,b){var c=a.dragDropData.newPoints;b=T(b);a.isDragDropAnimating=!0;v(c,function(a){a.point.update(a.newValues,!1)});a.redraw(b);setTimeout(function(){delete a.isDragDropAnimating;a.hoverPoint&&!a.dragHandles&&a.hoverPoint.showDragHandles()},b.duration)}function H(a){var b=a.series&&a.series.chart,c=b&&b.dragDropData;!b||!b.dragHandles||c&&(c.isDragging&&c.draggedPastSensitivity||c.isHoveringHandle===a.id)||b.hideDragHandles()}
function I(a){var b=0,c;for(c in a)Object.hasOwnProperty.call(a,c)&&b++;return b}function J(a){for(var b in a)if(Object.hasOwnProperty.call(a,b))return a[b]}function U(a,b){if(!b.zoomOrPanKeyPressed(a)){var c=b.dragDropData;var d=0;if(c&&c.isDragging&&c.point.series){var e=c.point;d=e.series.options.dragDrop;a.preventDefault();c.draggedPastSensitivity||(c.draggedPastSensitivity=P(a,b,z(e.options.dragDrop&&e.options.dragDrop.dragSensitivity,d&&d.dragSensitivity,2)));c.draggedPastSensitivity&&(c.newPoints=
S(c,a),b=c.newPoints,d=I(b),b=1===d?J(b):null,e.firePointEvent("drag",{origin:c.origin,newPoints:c.newPoints,newPoint:b&&b.newValues,newPointId:b&&b.point.id,numNewPoints:d,chartX:a.chartX,chartY:a.chartY},function(){var b=e.series,c=b.chart,d=c.dragDropData,l=t(b.options.dragDrop,e.options.dragDrop),f=l.draggableX,h=l.draggableY;b=d.origin;var g=a.chartX-b.chartX,k=a.chartY-b.chartY,p=g;d=d.updateProp;c.inverted&&(g=-k,k=-p);if(z(l.liveRedraw,!0))G(c,!1),e.showDragHandles();else if(d){f=g;c=k;p=
e.series;h=p.chart;d=h.dragDropData;l=p.dragDropProps[d.updateProp];var K=d.newPoints[e.id].newValues;var r="function"===typeof l.resizeSide?l.resizeSide(K,e):l.resizeSide;l.beforeResize&&l.beforeResize(h.dragGuideBox,K,e);h=h.dragGuideBox;p="x"===l.axis&&p.xAxis.reversed||"y"===l.axis&&p.yAxis.reversed?E(r):r;f="x"===l.axis?f-(d.origin.prevdX||0):0;c="y"===l.axis?c-(d.origin.prevdY||0):0;switch(p){case "left":var m={x:h.attr("x")+f,width:Math.max(1,h.attr("width")-f)};break;case "right":m={width:Math.max(1,
h.attr("width")+f)};break;case "top":m={y:h.attr("y")+c,height:Math.max(1,h.attr("height")-c)};break;case "bottom":m={height:Math.max(1,h.attr("height")+c)}}h.attr(m)}else c.dragGuideBox.translate(f?g:0,h?k:0);b.prevdX=g;b.prevdY=k}))}}}function C(a,b){var c=b.dragDropData;if(c&&c.isDragging&&c.draggedPastSensitivity&&c.point.series){var d=c.point,e=c.newPoints,f=I(e),n=1===f?J(e):null;b.dragHandles&&b.hideDragHandles();a.preventDefault();b.cancelClick=!0;d.firePointEvent("drop",{origin:c.origin,
chartX:a.chartX,chartY:a.chartY,newPoints:e,numNewPoints:f,newPoint:n&&n.newValues,newPointId:n&&n.point.id},function(){G(b)})}delete b.dragDropData;b.dragGuideBox&&(b.dragGuideBox.destroy(),delete b.dragGuideBox)}function V(a){var b=a.container,c=r.doc;N(a)&&(B(b,["mousedown","touchstart"],function(b){b=A(b,a);var c=a.hoverPoint,d=t(c&&c.series.options.dragDrop,c&&c.options.dragDrop),f=d.draggableX||!1;d=d.draggableY||!1;a.cancelClick=!1;!f&&!d||a.zoomOrPanKeyPressed(b)||a.hasDraggedAnnotation||
(a.dragDropData&&a.dragDropData.isDragging?C(b,a):c&&O(c)&&(a.mouseIsDown=!1,F(b,c),c.firePointEvent("dragStart",b)))}),B(b,["mousemove","touchmove"],function(b){U(A(b,a),a)},{passive:!1}),w(b,"mouseleave",function(b){C(A(b,a),a)}),a.unbindDragDropMouseUp=B(c,["mouseup","touchend"],function(b){C(A(b,a),a)},{passive:!1}),a.hasAddedDragDropEvents=!0,w(a,"destroy",function(){a.unbindDragDropMouseUp&&a.unbindDragDropMouseUp()}))}var T=f.animObject,g=y.seriesTypes,w=u.addEvent,W=u.clamp,X=u.isNumber,t=
u.merge,v=u.objectEach,z=u.pick;f=function(a){a=a.shapeArgs||a.graphic.getBBox();var b=a.r||0,c=a.height/2;return[["M",0,b],["L",0,c-5],["A",1,1,0,0,0,0,c+5],["A",1,1,0,0,0,0,c-5],["M",0,c+5],["L",0,a.height-b]]};y=D.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",move:!0}};g.flags&&(g.flags.prototype.dragDropProps=y);var k=g.column.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",move:!1,resize:!0,beforeResize:function(a,b,c){var d=c.series.translatedThreshold,e=a.attr("y");b.y>=
c.series.options.threshold?(b=a.attr("height"),a.attr({height:Math.max(0,Math.round(b+(d?d-(e+b):0)))})):a.attr({y:Math.round(e+(d?d-e:0))})},resizeSide:function(a,b){var c=b.series.chart.dragHandles;a=a.y>=(b.series.options.threshold||0)?"top":"bottom";b=E(a);c[b]&&(c[b].destroy(),delete c[b]);return a},handlePositioner:function(a){var b=a.shapeArgs||a.graphic&&a.graphic.getBBox()||{},c=a.series.yAxis.reversed,d=a.series.options.threshold||0;a=a.y||0;return{x:b.x||0,y:!c&&a>=d||c&&a<d?b.y||0:(b.y||
0)+(b.height||0)}},handleFormatter:function(a){var b=a.shapeArgs||{};a=b.r||0;b=b.width||0;var c=b/2;return[["M",a,0],["L",c-5,0],["A",1,1,0,0,0,c+5,0],["A",1,1,0,0,0,c-5,0],["M",c+5,0],["L",b-a,0]]}}};g.bullet&&(g.bullet.prototype.dragDropProps={x:k.x,y:k.y,target:{optionName:"draggableTarget",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){var b=a.targetGraphic.getBBox();return{x:a.barX,y:b.y+b.height/2}},handleFormatter:k.y.handleFormatter}});g.columnrange&&(g.columnrange.prototype.dragDropProps=
{x:{axis:"x",move:!0},low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x||0,y:(a.y||0)+(a.height||0)}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x||0,y:a.y||0}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a>=b.low}}});g.boxplot&&(g.boxplot.prototype.dragDropProps={x:k.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x||0,y:a.lowPlot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.q1}},q1:{optionName:"draggableQ1",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x||0,y:a.q1Plot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a<=b.median&&a>=b.low}},median:{axis:"y",move:!0},q3:{optionName:"draggableQ3",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x||0,y:a.q3Plot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.median}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x||0,y:a.highPlot}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a>=b.q3}}});g.ohlc&&(g.ohlc.prototype.dragDropProps={x:k.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotLow}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.open&&a<=b.close}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotHigh}},handleFormatter:k.y.handleFormatter,propValidate:function(a,
b){return a>=b.open&&a>=b.close}},open:{optionName:"draggableOpen",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"top":"bottom"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotOpen}},handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}},close:{optionName:"draggableClose",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"bottom":"top"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotClose}},
handleFormatter:k.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}}});g.arearange&&(y=g.columnrange.prototype.dragDropProps,u=function(a){a=a.graphic?a.graphic.getBBox().width/2+1:4;return[["M",0-a,0],["a",a,a,0,1,0,2*a,0],["a",a,a,0,1,0,-2*a,0]]},g.arearange.prototype.dragDropProps={x:y.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return(a=a.graphics&&a.graphics[0]&&a.graphics[0].getBBox())?{x:a.x+a.width/2,y:a.y+
a.height/2}:{x:-999,y:-999}},handleFormatter:u,propValidate:y.low.propValidate},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return(a=a.graphics&&a.graphics[1]&&a.graphics[1].getBBox())?{x:a.x+a.width/2,y:a.y+a.height/2}:{x:-999,y:-999}},handleFormatter:u,propValidate:y.high.propValidate}});g.waterfall&&(g.waterfall.prototype.dragDropProps={x:k.x,y:t(k.y,{handleFormatter:function(a){return a.isSum||a.isIntermediateSum?null:k.y.handleFormatter(a)}})});
if(g.xrange){var L=function(a,b){var c=a.series,d=c.xAxis,e=c.yAxis,f=c.chart.inverted;b=d.toPixels(a[b],!0);var n=e.toPixels(a.y,!0);a=c.columnMetrics?c.columnMetrics.offset:-a.shapeArgs.height/2;f&&(b=d.len-b,n=e.len-n);return{x:Math.round(b),y:Math.round(n+a)}};f=g.xrange.prototype.dragDropProps={y:{axis:"y",move:!0},x:{optionName:"draggableX1",axis:"x",move:!0,resize:!0,resizeSide:"left",handlePositioner:function(a){return L(a,"x")},handleFormatter:f,propValidate:function(a,b){return a<=b.x2}},
x2:{optionName:"draggableX2",axis:"x",move:!0,resize:!0,resizeSide:"right",handlePositioner:function(a){return L(a,"x2")},handleFormatter:f,propValidate:function(a,b){return a>=b.x}}};g.gantt&&(g.gantt.prototype.dragDropProps={y:f.y,start:t(f.x,{optionName:"draggableStart",validateIndividualDrag:function(a){return!a.milestone}}),end:t(f.x2,{optionName:"draggableEnd",validateIndividualDrag:function(a){return!a.milestone}})})}"gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline".split(" ").forEach(function(a){g[a]&&
(g[a].prototype.dragDropProps=null)});var Y={"default":{className:"highcharts-drag-box-default",lineWidth:1,lineColor:"#888",color:"rgba(0, 0, 0, 0.1)",cursor:"move",zIndex:900}},Z={className:"highcharts-drag-handle",color:"#fff",lineColor:"rgba(0, 0, 0, 0.6)",lineWidth:1,zIndex:901};m.prototype.setGuideBoxState=function(a,b){var c=this.dragGuideBox;b=t(Y,b);a=t(b["default"],b[a]);return c.attr({className:a.className,stroke:a.lineColor,strokeWidth:a.lineWidth,fill:a.color,cursor:a.cursor,zIndex:a.zIndex}).css({pointerEvents:"none"})};
x.prototype.getDropValues=function(a,b,c){var d=this,e=d.series,f=t(e.options.dragDrop,d.options.dragDrop),n={},g=a.points[d.id],l;for(l in c)if(Object.hasOwnProperty.call(c,l)){if("undefined"!==typeof k){var k=!1;break}k=!0}v(c,function(a,c){var l=g[c],p=e[a.axis+"Axis"];p=p.toValue((p.horiz?b.chartX:b.chartY)+g[c+"Offset"]);var h=a.axis.toUpperCase(),q=e[h.toLowerCase()+"Axis"].categories?1:0;q=z(f["dragPrecision"+h],q);var m=z(f["dragMin"+h],-Infinity);h=z(f["dragMax"+h],Infinity);q&&(p=Math.round(p/
q)*q);p=W(p,m,h);k&&a.propValidate&&!a.propValidate(p,d)||"undefined"===typeof l||(n[c]=p)});return n};D.prototype.getGuideBox=function(a){var b=this.chart,c=Infinity,d=-Infinity,e=Infinity,f=-Infinity,g;a.forEach(function(a){var b=a.graphic&&a.graphic.getBBox()||a.shapeArgs;if(b){var n=void 0,h=a.x2;X(h)&&(n=a.series.xAxis.translate(h,!1,!1,!1,!0));h=!(b.width||b.height||b.x||b.y);g=!0;c=Math.min(a.plotX||0,n||0,h?Infinity:b.x||0,c);d=Math.max(a.plotX||0,n||0,(b.x||0)+(b.width||0),d);e=Math.min(a.plotY||
0,h?Infinity:b.y||0,e);f=Math.max((b.y||0)+(b.height||0),f)}});return g?b.renderer.rect(c,e,d-c,f-e):b.renderer.g()};x.prototype.showDragHandles=function(){var a=this,b=a.series,c=b.chart,d=c.inverted,f=c.renderer,g=t(b.options.dragDrop,a.options.dragDrop);v(b.dragDropProps,function(e,k){var l=t(Z,e.handleOptions,g.dragHandle),n={"class":l.className,"stroke-width":l.lineWidth,fill:l.color,stroke:l.lineColor},h=l.pathFormatter||e.handleFormatter,m=e.handlePositioner,q=e.validateIndividualDrag?e.validateIndividualDrag(a):
!0;e.resize&&q&&e.resizeSide&&h&&(g["draggable"+e.axis.toUpperCase()]||g[e.optionName])&&!1!==g[e.optionName]&&(c.dragHandles||(c.dragHandles={group:f.g("drag-drop-handles").add(b.markerGroup||b.group)}),c.dragHandles.point=a.id,m=m(a),n.d=h=h(a),q=a.series.xAxis.categories?-.5:0,!h||m.x<q||0>m.y||(n.cursor=l.cursor||("x"===e.axis!==!!d?"ew-resize":"ns-resize"),(l=c.dragHandles[e.optionName])||(l=c.dragHandles[e.optionName]=f.path().add(c.dragHandles.group)),n.translateX=d?b.yAxis.len-m.y:m.x,n.translateY=
d?b.xAxis.len-m.x:m.y,d&&(n.rotation=-90),l.attr(n),B(l.element,["touchstart","mousedown"],function(b){b=A(b,c);var d=a.series.chart;d.zoomOrPanKeyPressed(b)||(d.mouseIsDown=!1,F(b,a),d.dragDropData.updateProp=b.updateProp=k,a.firePointEvent("dragStart",b),b.stopPropagation(),b.preventDefault())},{passive:!1}),w(c.dragHandles.group.element,"mouseover",function(){c.dragDropData=c.dragDropData||{};c.dragDropData.isHoveringHandle=a.id}),B(c.dragHandles.group.element,["touchend","mouseout"],function(){var b=
a.series.chart;b.dragDropData&&a.id===b.dragDropData.isHoveringHandle&&delete b.dragDropData.isHoveringHandle;b.hoverPoint||H(a)})))})};m.prototype.hideDragHandles=function(){this.dragHandles&&(v(this.dragHandles,function(a,b){"group"!==b&&a.destroy&&a.destroy()}),this.dragHandles.group&&this.dragHandles.group.destroy&&this.dragHandles.group.destroy(),delete this.dragHandles)};w(x,"mouseOver",function(){var a=this;setTimeout(function(){var b=a.series,c=b&&b.chart,d=c&&c.dragDropData,e=c&&c.is3d&&
c.is3d();!c||d&&d.isDragging&&d.draggedPastSensitivity||c.isDragDropAnimating||!b.options.dragDrop||e||(c.dragHandles&&c.hideDragHandles(),a.showDragHandles())},12)});w(x,"mouseOut",function(){var a=this;setTimeout(function(){a.series&&H(a)},10)});w(x,"remove",function(){var a=this.series.chart,b=a.dragHandles;b&&b.point===this.id&&a.hideDragHandles()});m.prototype.zoomOrPanKeyPressed=function(a){var b=this.options.chart||{},c=b.panKey&&b.panKey+"Key";return a[b.zooming.key&&b.zooming.key+"Key"]||
a[c]};w(m,"render",function(){this.hasAddedDragDropEvents||V(this)});""});r(f,"masters/modules/draggable-points.src.js",[],function(){})});
//# sourceMappingURL=draggable-points.js.map