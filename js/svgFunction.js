/************************************ Function *******************************/
//return x position in function text position
// Left Middle Left
function getXPos(posType, x,w){
	if (posType.toUpperCase().indexOf("MIDDLE")>-1) {
				var xLabel=x+(w/2);
			} else if (posType.toUpperCase().indexOf("RIGHT")>-1){
				var xLabel=x+w;
			} else {
				var xLabel=x;
			}
	return xLabel; 
}

//return y position in function text position
// top center bottom
// so a text position can be for instance centerLeft topRight bottomLeft ....
function getYPos(posType,y,h){
	if (posType.toUpperCase().indexOf("CENTER")>-1) {
		var yLabel=y+(h/2);
	} else if (posType.toUpperCase().indexOf("BOTTOM")>-1){
		var yLabel=y+h;
	} else {
		var yLabel=y;
	}
	return yLabel; 
}


/************************************ Function *******************************/
function barThickness(hORw,nbData,interBar){
	//retourne l'epaisse en fonction soit de h ou w
	return ((hORw-((nbData-1)*interBar))/nbData);
}


function yBarPosition(typeOfGraph,x,y,w,h,datamax,interBar,index,nbData,value){

	var th=barThickness(h,nbData,interBar);
	switch (typeOfGraph.toUpperCase()){ 
		case "BOTTOMUP": 
			var scale=(h/datamax);
			var size=scale*parseFloat(value);
			return (y+h-size);
		break; 
		case "LEFTRIGHT": 
			return (y+((th+interBar)*index))
		break; 
		case "RIGHTLEFT": 
			return (y+((th+interBar)*index))
		break; 		
		default: 
			//topDown
			return y
		break; 
	}
}//end function


function xBarPosition(typeOfGraph,x,y,w,h,datamax,interBar,index,nbData,value){
	var th=barThickness(w,nbData,interBar);
	switch (typeOfGraph.toUpperCase()){ 
		case "BOTTOMUP": 
			return (x+((th+interBar)*index));
		break; 
		case "LEFTRIGHT": 
			return x
		break; 
		case "RIGHTLEFT": 
			var scale=(w/datamax);
			var size=Math.round(scale*parseFloat(value));
			return ((x+w)-size);
		break; 		
		default: 
			//topDown
			return (x+((th+interBar)*index));
		break; 
	}

}



