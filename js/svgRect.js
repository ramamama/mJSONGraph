/************************************ Model *******************************/
var svgRect_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		x: 0,
		y: 0,
		w: 10,
		h: 10,
		rx:00,
		ry:00,		
		style:"svgRectDefault"
      };
    },
    initialize: function() {
      if (!this.get("style")) {this.set({"style": this.defaults.style});}
	  if (!this.get("id")) {this.set({"id": "rect_"+Math.round(Math.random()*10000000)});}
    },
    clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/
var svgRect_Collection = Backbone.Collection.extend({
	initialize: function(props) {
		/* permet de passer model et url en parametre de la collection*/
		props=(props==undefined)?{model: svgRect} : props;
		this.url=(props.url==undefined)? "mesrect.json" : props.url;
		this.model=(props.model==undefined)? svgRect_Model : props.model;
		//on remplit avec les valeurs du fichier JSON de l'url
		this.fetch();
	}
});// end collection


/************************************ View *******************************/
var svgRect_ModelView = Backbone.View.extend({
		model: svgRect_Model,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var selection=d3.select(this.el)
			selection.append("rect").attr("id",this.model.get("id"))
					//~ .on("mouseover", this.mouseover())
					//~ .on("mouseout",  this.mouseout())
					//~ .on("mousedown",  this.mousedown());
				this.update();


		},
		update: function(){
			var selection=d3.select("#"+this.model.get("id"))
			selection
				.transition()
				.duration(750)
				.delay(10)
					.attr("x",this.model.get('x'))
					.attr("y",this.model.get('y'))
					.attr("rx", this.model.get('rx'))
					.attr("ry", this.model.get('ry'))
					.attr("width",this.model.get('w'))
					.attr("height", this.model.get('h'))
					.attr("class", this.model.get('style'))

		//~ },
		//~ mouseover: function(){

		//~ },
		//~ mouseout: function(){

		//~ },
		//~ mousedown: function(){

		}

	});
/************************************ CollectionView *******************************/
var svgRect_CollectionView = Backbone.View.extend({
	initialize: function() {
		    _.bindAll(this, 'render');
			this.collection.on('reset', this.render, this);

		},
	render: function(){
			var tmpString="";
			this.collection.each(function(model){
				var view = new svgRect_ModelView({el: this.el, model: model});
				 tmpString=tmpString+view.render();
				},this);
			$(this.el).html(tmpString);
		}
});
/************************************ Application *******************************/
//~ var maZone=d3.select("#graphZone").append("svg")
				//~ .attr("id","drawZone");

//~ var  maShape=new Rect({ 	id : "monrect",
							//~ name: "monrect",
							//~ x: 20,
							//~ y: 20,
							//~ w: 100,
							//~ h: 100,
							//~ style:"cssShape1"});

//~ var maVue=new RectView({el: "#drawZone", model: maShape});