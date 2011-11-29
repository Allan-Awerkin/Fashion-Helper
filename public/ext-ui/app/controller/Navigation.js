Ext.define('FashionHelper.controller.Navigation', {
	extend: 'Ext.app.Controller',

	refs: [{
		ref: 'navigationView',
		selector: 'navigationcomp'
	}, {
		ref: 'portalView',
		selector: 'portalcomp'
	}, {
		ref: 'brandView',
		selector: 'brandcomp'
	}, {
		ref: 'homeView',
		selector: 'homecomp'
	}, {
		ref: 'table',
		selector: '#globalTable'
	}, {
		ref: 'grid',
		selector: '#globalTable localeList'
	}],

	init: function(application){
		console.log('controller init');
		//var me = this;
		this.control({
			'navigationcomp': {
				'gohome':this.goHome,
				'golocale': this.goLocale,
				'gobrand': this.goBrand,
				'gosize': this.goSize,
				'goarticle': this.goArticle,
				'gogender': this.goGender,
				'goprofile': this.goProfile,
				scope: this
			}
		});
	},

	goHome: function(link){
		console.log('home clicked');
		// var homeview = this.getHomeView();
		var homeview = Ext.widget('homecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(homeview);
	},

	goLocale: function(link){
		//console.log(link);
		var me = this;
		console.log(me);
		me.application.getController('Navigation').cleanUpTable();
		
		me.application.getController('Locale').LocaleStart();
	},

	goBrand: function(link){
		console.log('brand clicked');
		var brandView = Ext.widget('brandcomp');
		var portalview = this.getPortalView();
		// window.location.hash = '!/brands'
		portalview.removeAll();
		portalview.add(brandView);
		// portal.doLayout();
	},

	goSize: function(link){
		console.log('size clicked');
		var sizeView = Ext.widget('sizecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(sizeView);
	},

	goArticle: function(link){
		console.log('article clicked');
		var articleView = Ext.widget('articlecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(articleView);
	},

	goGender: function(link){
		console.log('gender clicked');
		var genderView = Ext.widget('gendercomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(genderView);
	},
	
	goProfile: function(link){
		console.log('profile clicked');
		var profileView = Ext.widget('profilecomp');
		var portalview = this.getPortalView();
		portalview.removeAll();
		portalview.add(profileView);
	},
	cleanUpTable: function(){
		var panels = this.getTable().down('panel');
		if(panels){
			panels.hide();
		}
	}
});