/************************************ Model *******************************/
var svgHisto_Model = Backbone.Model.extend({
	defaults: function() {
      return {
		id : null,
		type: "",
		x: 20,
		y: 20,
		w: 100,
		h: 100,
		interBar: 5,
		data: "",
		labelKey: "",
		valueKey: "",
		svgBar_Style:""
      };
    },
    initialize: function() {
		
    },
    clear: function() {
		this.destroy();
    }
	
  });


/************************************ Collection *******************************/

/************************************ View *******************************/
var svgHisto_ModelView = Backbone.View.extend({
		model: svgHisto_Model,
		initialize: function() {
		    _.bindAll(this, 'render','update');
			this.model.bind('change', this.update, this);
			this.render();
		},

		render: function(){
			var labelKey=this.model.get("labelKey");
			var valueKey=this.model.get("valueKey");
			var svgBar_Style=this.model.get("svgBar_Style");
			var id=this.model.get("id");
			var x=this.model.get("x");
			var y=this.model.get("y");
			var w=this.model.get("w");
			var h=this.model.get("h");
			var mData=this.model.get("data");
			var interBar=this.model.get("interBar");
			var typeOfGraph=this.model.get("type");	
			
			var nbData=mData.length;		
			var datamax=_.max(mData, function(item){ return item[valueKey]; })[valueKey];		

			var th=(typeOfGraph.toUpperCase().indexOf("RIGHT")>-1)?barThickness(h,nbData,interBar):barThickness(w,nbData,interBar);
			var scale=(typeOfGraph.toUpperCase().indexOf("RIGHT")>-1)?(w/datamax):(h/datamax);
			
			var myD=this.model.get("data");
			for (i=0;i<myD.length;i++){
					var sz=myD[i][valueKey];
					var svgBar_label=myD[i][labelKey];
					var svgBar_value=myD[i][valueKey];
	
					var size=Math.round(scale*parseFloat(svgBar_value));
					var maBar=new svgBar_Model(svgBar_Style);
						maBar.svgBar_label.set("text", svgBar_label);
						maBar.svgBar_value.set("text", svgBar_value);					
						maBar.set("id",id+"_"+i);
						maBar.set("x",xBarPosition(typeOfGraph,x,y,w,h,datamax,interBar,i,nbData,svgBar_value));
						maBar.set("y",yBarPosition(typeOfGraph,x,y,w,h,datamax,interBar,i,nbData,svgBar_value));
						maBar.set("size",size);
						maBar.set("thickness",th);							
					maBar.update();
			
					var vuemaBar=new svgBar_ModelView ({el:this.el, model: maBar});
					//var vuemaBar=new svgBar_ModelView ({el:$("#drawZone"), model: maBar});	
			}//end for
			
		},
		update: function(){
			

		}

	});


/************************************ CollectionView *******************************/
