function GenerateForm(data){
	var self = this;
	
	self.Generate = function(){
		//TODO: call generate function on Server passing settings to get result
		var result = new PersonResult({
			Sex: 'Male'
		});	
		ko.applyBindings(result, document.getElementsByClassName('results-display'));
	};
}