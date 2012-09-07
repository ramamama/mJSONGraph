/************************************ Model *******************************/
var svgMGraph_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		type: "",
		x: 20,
		y: 20,
		w: 100,
		h: 100,
		data: "",
		labelKey: "",
		valueKey: "",
		graphStyle: ""
      };
    },
    initialize: function() {
	
	
    },
    clear: function() {
		this.destroy();
    }
	
  });
  
  /************************************ Collection *******************************/
var svgMGraph_Collection = Backbone.Collection.extend({
	initialize: function(props) {
		/* permet de passer model et url en parametre de la collection*/
		props=(props==undefined)?{model: svgMGraph_Model} : props;
		this.url=(props.url==undefined)? "svgMGraph.json" : props.url;
		this.model=(props.model==undefined)? svgRect_Model : props.model;
		//on remplit avec les valeurs du fichier JSON de l'url
		this.fetch();
	}
});// end collection