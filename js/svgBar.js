
/************************************ Model *******************************/
var svgBar_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		type: "",
		x: 20,
		y: 20,
		size: 0,
		thickness: 0,
		svgBar_rect:  { 	
					"id" : "",
					"style":"svgRectDefault"
				},		
		svgBar_label: {	"id" : "",
					"text":"",
					"dx": 0,
					"dy": 0
					},
		svgBar_label_position: "topLeft",
		svgBar_value:  {	"id" : "",
					"text":"",
					"dx": 0,
					"dy": 0
					},	
		svgBar_value_position: "topLeft"	
      };
    },
    initialize: function() {
		if (!this.get("id")) {this.set({"id": "bar_"+Math.round(Math.random()*10000000)});}
		if (!this.get("svgBar_label")) {this.set({"svgBar_label": this.defaults.svgBar_label});}
		if (!this.get("svgBar_value")) {this.set({"svgBar_value": this.defaults.svgBar_value});}
		this.svgBar_rect=new svgRect_Model(this.get("svgBar_rect"));		
		this.svgBar_label=new svgText_Model(this.get("svgBar_label"));
		this.svgBar_value=new svgText_Model(this.get("svgBar_value"));		
		this.update();
    },
	update: function (){
		var id=this.get("id");
		var x=this.get("x");
		var y=this.get("y");
		var th=this.get("thickness");
		var sz=this.get("size");
		var w=(this.get("type").indexOf("jsBarLeftRight")>-1)?sz:th;
		var h=(this.get("type").indexOf("jsBarLeftRight")>-1)?th:sz;	
		
		// create rect shape
			this.svgBar_rect.set("id",id+"_rect");	
			this.svgBar_rect.set("x",x);
			this.svgBar_rect.set("y",y);		
			this.svgBar_rect.set("w",w);
			this.svgBar_rect.set("h",h);	
								
		// create label shape		
		this.svgBar_label.set("id",id+"_label");	
		var pos=this.get("svgBar_label_position");
			xL=getXPos(pos, x, w);
				this.svgBar_label.set("x", xL);
			yL=getYPos(pos, y, h);	
				this.svgBar_label.set("y", yL);
		
		// create value shape		
		this.svgBar_value.set("id",id+"_value");	
		var pos=this.get("svgBar_value_position");
			xL=getXPos(pos, x, w);
				this.svgBar_value.set("x", xL);
			yL=getYPos(pos, y, h);	
				this.svgBar_value.set("y", yL);

	},
    clear: function() {
		this.destroy();
    }
	
  });



/************************************ Collection *******************************/
var svgBar_Collection= Backbone.Collection.extend({
	initialize: function(props) {
		props=(props==undefined)?{model: svgBar_Model} : props;
		this.url=(props.url==undefined)? "/getcontentList" : props.url;
		this.model=(props.model==undefined)? svgBar_Model : props.model;
	}
});

/************************************ View *******************************/
var svgBar_ModelView = Backbone.View.extend({
		model: svgBar_Model,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var id=this.model.get("id");
			var selection=d3.select(this.el)
			selection.append("g").attr("id",id)
			var rectView=new svgRect_ModelView({el: $("#"+id), model: this.model.svgBar_rect});
			var labelView=new svgText_ModelView({el: $("#"+id), model: this.model.svgBar_label});			
			var valueView=new svgText_ModelView({el: $("#"+id), model: this.model.svgBar_value});	
		},
		update: function(){
			

		}

	});

/************************************ CollectionView *******************************/