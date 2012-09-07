/************************************ Model *******************************/
var svgCanvas_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		x: 0,
		y: 0,
		w: 10,
		h: 10,
		style:"svgCanvasDefault"
      };
    },
    initialize: function() {
      if (!this.get("style")) {this.set({"style": this.defaults.style});}
	  if (!this.get("id")) {this.set({"id": "canvas_"+Math.round(Math.random()*10000000)});}
    },
    clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/
var svgCanvas_Collection = Backbone.Collection.extend({
	initialize: function(props) {
		/* permet de passer model et url en parametre de la collection*/
		props=(props==undefined)?{model: svgCanvas} : props;
		this.url=(props.url==undefined)? "svgCanvas.json" : props.url;
		this.model=(props.model==undefined)? svgRect_Model : props.model;
		//on remplit avec les valeurs du fichier JSON de l'url
		this.fetch();
	}
});// end collection

/************************************ View *******************************/
var svgCanvas_ModelView = Backbone.View.extend({
		model: svgCanvas_Model,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},
		render: function(){
			var selection=d3.select(this.el)
			selection.append("svg").attr("id",this.model.get("id"))
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
				.attr("width",this.model.get('w'))
				.attr("height", this.model.get('h'))
				.attr("class", this.model.get('style'));
		//~ },
		//~ mouseover: function(){

		//~ },
		//~ mouseout: function(){

		//~ },
		//~ mousedown: function(){
		}
	});