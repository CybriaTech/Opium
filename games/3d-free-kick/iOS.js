/*
 * iOS.js v1.9
 * http://www.iOSjs.com/
 *
 * Developed by Empty Galaxy
 * http://www.emptygalaxy.com/
 *
 * Copyright (c) 2014
 * Dual-licensed under the BSD or MIT licenses.
 * http://www.iOSjs.com/license/
 */
 


var iOSjs	= new function()
{
	this.init	= function()
	{
		//	enable binding functions
		this.enableBinding();
		
		//	listen for events
		this.addEventListener(window, "load", this.handleWindowLoad.bind(this));
		this.addEventListener(window, "orientationchange", this.handleOrientationChange.bind(this));
		this.addEventListener(window, "resize", this.handleReize.bind(this));
		
	}
	
	var resFunction = null;
	this.setResFunction = function(resFunc) {
		resFunction = resFunc;
	}
	
	var curOrientation = 0;
	
	//	=====================================
	//	Read Device Properties
	//	=====================================
	
	this.isiOSDevice	= function()	{	var u	= navigator.userAgent;	return u.indexOf("iPhone") > -1 || u.indexOf("iPod") > -1 || u.indexOf("iPad") > -1;	}
	this.isiPhone		= function()	{	return navigator.userAgent.indexOf("iPhone") > -1;	}
	this.isiPod			= function()	{	return navigator.userAgent.indexOf("iPod") > -1;	}
	this.isiPad			= function()	{	return navigator.userAgent.indexOf("iPad") > -1;	}
	
	this.hasRetinaDisplay	= function()
	{
		if(!window.devicePixelRatio)	return false;
		return window.devicePixelRatio > 1;
	}
	
	//	=====================================
	//	Read Browser Properties
	//	=====================================
	
	this.isFullscreen	= function()	{	return navigator.standalone;	}
	
	this.getViewportSize	= function()
	{
		var windowSize	= this.getWindowSize();
		var bodySize	= this.getElementSize(document.body);
		
		var scale		= bodySize.width / windowSize.width;
		
		return {width:(windowSize.width * scale), height:(windowSize.height * scale)};
	}
	
	this.getNormalWindowSize	= function()
	{
		var width	= 0;
		var heigth	= 0;
		
		if(typeof(fenster.innerWidth) == "number")
		{
			//	non-IE
			width	= fenster.innerWidth;
			height	= fenster.innerHeight;
		}
		else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight))
		{
			//	IE 6+ in 'standards compliant mode'
			width	= document.documentElement.clientWidth;
			height	= document.documentElement.clientHeight;
		}
		else if(document.body && (document.body.clientWidth || document.body.clientHeight))
		{
			//	IE 4 compatible
			width	= document.body.clientWidth;
			height	= document.body.clientHeight;
		}
		
		return {width:width, height:height};
	}
	
	this.getWindowSize	= function()
	{
		var width	= 0;
		var height	= 0;
		
		if(this.isiOSDevice())
		{
			//	start with screen resolution
			width	= screen.width;
			height	= screen.height;
			
			//	swap width & height
			if(window.orientation != 0)
			{
				var temp	= width;
				width		= height;
				height		= temp;
			}
			
			var ua		= navigator.userAgent;
			
			//	subtract height of the status bar
			if(!(this.isFullscreen() && iOS_getMetaContent("apple-mobile-web-app-status-bar-style").toLowerCase() == "black-translucent"))	height	-= 20;
			
			if(ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)
			{
				if(!this.isFullscreen())
				{
					//	subtract height of the button bar
					if(window.orientation == 0)	height	-= 44;
					else						height	-= 32;
				}
			}
			
			if(ua.indexOf("iPad") > -1)
			{
				//	subtract height of the navigation bar
				if(!this.isFullscreen())	height	-= 58;
			}
		}
		else
		{
			var size	= this.getNormalWindowSize();
			width		= size.width;
			height		= size.height;
		}
		
		return {width:width, height:height};
	}
	//	=====================================
	//	Read HTML Properties
	//	=====================================
	
	this.getCurSize	= function()
	{
		//if(!window.orientation == 0) 
		return this.getNormalWindowSize();
	}
	
	this.getSizeWithoutPanels = function()
	{
		var width	= 0;
		var height	= 0;
		
		width	= screen.width;
		height	= screen.height;
		
		var nw = this.getNormalWindowSize();
		var or = nw.width > nw.height ? 1 : 0;
		
		if(or != 0)
		{
			var temp	= width;
			width		= height;
			height		= temp;
		}
		return {width:width, height:height};
	}
	
	this.getMaxSize	= function()
	{
		var width	= 0;
		var height	= 0;
		
		var nw = this.getNormalWindowSize();
		var or = nw.width > nw.height ? 1 : 0;
		
		if(this.isiOSDevice())
		{
			//	start with screen resolution
			width	= screen.width;
			height	= screen.height;
			
			//	swap width & height
			if(or != 0)
			{
				var temp	= width;
				width		= height;
				height		= temp;
			}
			
			var ua		= navigator.userAgent;
			
			if(ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)
			{
				if(or == 0) 
					height = this.getNormalWindowSize().height;
			}
			
			if(ua.indexOf("iPad") > -1)
			{
				width = fenster.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				height = fenster.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			}
		}
		else
		{
			width = fenster.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			height = fenster.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		}
		
		return {width:width, height:height};
	}
	
	this.getPageSize	= function()
	{
		var bodySize	= this.getElementSize(document.body);
		return bodySize;
	}
	
	//	=====================================
	//	HTML Element Functions
	//	=====================================
	
	this.getElementSize	= function(element)
	{
		if(!element)	return {width:0, height:0};
		
		var ns4;
		if(ns4)
		{
			var elem	= getObjNN4(document, element);
			return {width:elem.clip.width, height:elem.clip.height};
		}
		else
		{
			if(document.all)	return {width:element.style.pixelWidth, height:element.style.pixelHeight};
			else				return {width:element.offsetWidth, height:element.offsetHeight};
		}
	}
	
	this.getElementOffset	= function(element)
	{
		var x = 0;
    	var y = 0;
		
		while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop))
		{
			x	+= element.offsetLeft - element.scrollLeft;
			y	+= element.offsetTop - element.scrollTop;
			element	= element.offsetParent;
		}
		
		return {x: x, y: y};
	}
	
	this.getElementPadding	= function(element)
	{
		var style	= element.currentStyle || window.getComputedStyle(element);
		
		return {top: parseFloat(style.paddingTop), right: parseFloat(style.paddingRight), bottom: parseFloat(style.paddingBottom), left: parseFloat(style.paddingLeft)};
	}
	
	this.getElementMargin	= function(element)
	{
		var style	= element.currentStyle || window.getComputedStyle(element);
		
		return {top: parseFloat(style.marginTop), right: parseFloat(style.marginRight), bottom: parseFloat(style.marginBottom), left: parseFloat(style.marginLeft)};
	}
	
	this.getMetaContent	= function(name)
	{
		name	= name.toLowerCase();
		var metaList	= document.getElementsByTagName("meta");
		for(var i=0; i<metaList.length; i++)
		{
			var meta	= metaList[i];
			if(meta.name.toLowerCase() == name)
			{
				return meta.content;
			}
		}
		
		return null;
	}
	
	//	=====================================
	//	Event Listening
	//	=====================================
	
	this.enableBinding	= function()
	{
		if(!Function.prototype.bind)
		{
			Function.prototype.bind	= function(target)
			{
				var method	= this;
				var temp	= function()
				{
					return method.apply(target, arguments);
				}
				return temp;
			}
		}
	}
	
	this.addEventListener	= function(obj, evType, fn)
	{
		if(obj.addEventListener)
		{
			obj.addEventListener(evType, fn, false);
			return true;
		}
		else if(obj.attachEvent)
		{
			var r	= obj.attachEvent("on" + evType, fn);
			return r;
		}
		else
		{
			return false;
		}
	}
	
	this.removeEventListener	= function(obj, evType, fn)
	{
		if(obj.removeEventListener)
		{
			obj.removeEventListener(evType, fn, false);
			return true;
		}
		else if(obj.detachEvent)
		{
			var r	= obj.detachEvent("on" + evType, fn);
			return r;
		}
		else
		{
			return false;
		}
	}
	
	//	=====================================
	//	Event Handling
	//	=====================================
	
	this.handleWindowLoad	= function(e)
	{
		this.initPage();
		this.updateOrientation();
		this.updateHeight();
		
		//	slightly delay hiding the address bar
		//setTimeout(this.hideAddressBar.bind(this), 100);
	}
	
	this.handleOrientationChange	= function(e)
	{
		this.updateOrientation();
		this.resize();
		
		//	slightly delay hiding the address bar
		//setTimeout(this.hideAddressBar.bind(this), 100);
	}
	
	this.handleReize	= function(e)
	{
		this.resize();
	}
	
	//	=====================================
	//	Page Setup
	//	=====================================
	
	this.initPage	= function()
	{
		if(this.isFullscreen())	this.createWebappLinks();
		
		//	set the iOS class on <html>
		var html	= document.documentElement;
		var classes	= html.className.split(" ");
		
		//	Retina display
		if(this.hasRetinaDisplay() && classes.indexOf("retina") == -1)	classes.push("retina");
		
		if(this.isiOSDevice())
		{
			//	iOS class
			if(classes.indexOf("iOS") == -1)	classes.push("iOS");
			
			//	fullscreen class
			if(this.isFullscreen() && classes.indexOf("fullscreen") == -1)	classes.push("fullscreen");
			
			//	Device
			var ua	= navigator.userAgent;
			if(ua.indexOf("iPhone") > -1)		html.setAttribute("device", "iPhone");
			else if(ua.indexOf("iPod") > -1)	html.setAttribute("device", "iPod");
			else if(ua.indexOf("iPad") > -1)	html.setAttribute("device", "iPad");
			
			//	Device Family
			if(ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)	html.setAttribute("deviceFamily", "iPhone_iPod");
			else if(ua.indexOf("iPad") > -1)							html.setAttribute("deviceFamily", "iPad");
		}
		
		html.className	= classes.join(" ");
	}
	
	this.updateOrientation	= function()
	{
		var orientation	= "portrait";
		if(window.orientation == 90 || window.orientation == -90) {
			orientation	= "landscape";
			curOrientation = 1;
		}
		else {
			curOrientation = 0;
		}
		
		document.documentElement.setAttribute("orientation", orientation);
	}
	
	this.resize	= function()
	{
		this.updateHeight();
	}
	
	//	=====================================
	//	UI Functionality
	//	=====================================
	
	this.hideAddressBar	= function()
	{
		//if(window.pageYOffset <= 1)	window.scrollTo(window.pageXOffset, 1);
	}
	
	this.updateHeight	= function()
	{
		var b				= document.body;
		if (!b) return;
		var viewportSize	= this.getViewportSize();
		var bodyPadding		= this.getElementPadding(b);
		var bodyMargin		= this.getElementMargin(b);
		
		//	Add all
		var height	= viewportSize.height;
		height		-= (bodyPadding.top + bodyPadding.bottom) + (bodyMargin.top + bodyMargin.bottom);
		
		if(b.children.length > 0)
		{
			var l			= b.children.length;
			var fc			= b.children[0];
			var fcPadding	= this.getElementPadding(fc);
			var fcMargin	= this.getElementMargin(fc);
			
			for(var i=l-1; i>=0; i--)
			{
				var lc	= b.children[i];
				if(lc.style.position == "absolute" || lc.style.position == "fixed")	continue;
				if(lc.tagName == "SCRIPT")	continue;
				break;
			}
			var lcPadding	= this.getElementPadding(lc);
			var lcMargin	= this.getElementMargin(lc);
			height		-= (fcPadding.top + lcPadding.bottom) + (fcMargin.top + lcMargin.bottom) + 1;
		}
		
		//b.style.minHeight	= Math.floor(height) + "px";
		
		if (resFunction != null) {
			resFunction();
		}
	}
	
	//	========	Scrolling	========
	
	this.disableScrolling	= function()
	{
		this.addEventListener(document.body, "touchmove", this.preventScrolling);
	}
	
	this.enableScrolling	= function()
	{
		this.removeEventListener(document.body, "touchmove", this.preventScrolling);
	}
	
	this.preventScrolling	= function(e)
	{
		//if(e.touches.length==1)
		{
			e.preventDefault();
			//this.hideAddressBar();
		}
	}
	
	//	========	Zooming	========
	
	this.disableZooming	= function()
	{
		this.addEventListener(document.body, "touchmove", this.preventZooming);
	}
	
	this.enableZooming	= function()
	{
		this.removeEventListener(document.body, "touchmove", this.preventZooming);
	}
	
	this.preventZooming	= function(e)
	{
		if(e.touches.length==2)	e.preventDefault();
	}
	
	//	=====================================
	//	Content Setup
	//	=====================================
	
	this.createWebappLinks	= function()
	{
		var aList	= document.getElementsByTagName("a");
		for(var i=0; i<aList.length; i++)
		{
			var a	= aList[i];
			if(a.href != "" && a.target == "")
			{
				a.onclick	= this.handleWebAppLink;
			}
		}
	}
	
	this.handleWebAppLink	= function()
	{
		//	divert the user to the page in the same window
		window.location	= this.getAttribute("href");
		return false;
	}
	
	//	=====================================
	//	Configurations
	//	=====================================
	
	this.autoWebapp	= function()
	{
		this.addEventListener(window, "load", this.setupAutoWebapp);
	}
	
	this.setupAutoWebapp	= function()
	{
		this.disableScrolling();
		this.disableZooming();
	}


	//	=====================================
	//	Page Setup
	//	=====================================
	
	//	initialize
	this.init();
}();