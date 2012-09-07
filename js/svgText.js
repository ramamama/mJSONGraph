/************************************ Model *******************************/
var svgText_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		text:"",
		x: 0,
		y: 0,
		dx: 0,
		dy: 0,
		transform: "",
		style:"svgTextDefault"
      };
    },
    initialize: function() {
      if (!this.get("style")) {this.set({"style": this.defaults.style});}
	  if (!this.get("id")) {this.set({"id": "txt_"+Math.round(Math.random()*10000000)});}
    },
    clear: function() {
		this.destroy();
    }
  });

/************************************ Collection *******************************/


/************************************ View *******************************/
var svgText_ModelView = Backbone.View.extend({
		model: svgText_Model,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var selection=d3.select(this.el)
			selection.append("text").attr("id",this.model.get("id"))
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
				.attr("dx",this.model.get('dx'))
				.attr("dy", this.model.get('dy'))
				.attr("class", this.model.get('style'))
				.attr("transform", this.model.get('transform'))
				.text( this.model.get('text'))
		//~ },
		//~ mouseover: function(){

		//~ },
		//~ mouseout: function(){

		//~ },
		//~ mousedown: function(){

		}

	});
/************************************ CollectionView *******************************/