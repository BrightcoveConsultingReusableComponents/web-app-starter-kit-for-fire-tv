function  getDateDifference(date) {
	var today = convertToDate(getCurrentDate());
	var video_date = convertToDate(date);
	var dif = getDiff(today, video_date);
	var result = divisionOfTime(dif);
	var dateDifference = convertToTimeString(result);
	return dateDifference;
}

function convertToDate(date) {
	var convert = new Date(Date.parse(String(date)));
	return convert;
}

function getDiff(date1, date2) {
	var dif = abs(date1 - date2);
}

function convertToTimeString(result) {
	var code = String(result[0]);

	if(code === 'years'){
		if(result[1]>1){
			return 'more than'+result[1]+'years ago';
		} else{
			return 'more than a year ago';
		}
	} else if(code === 'months'){
		if(result[1]>1){
			return result[1]+' months ago';
		} else{
			return 'a month ago';
		}
	} else if(code === 'weeks'){
		if(result[1]>1){
			return result[1]+' weeks ago';
		} else{
			return 'a week ago';
		}
	} else if(code === 'days'){
		if(result[1]>1){
			return result[1]+' days ago';
		} else{
			return '1 day ago';
		}
	} else if(code === 'hours'){
		if(result[1]>1){
			return 'x hours ago';
		} else{
			return 'an hour ago';
		}
	} else if(code === 'minutes'){
		if(result[1]>1){
			return 'x minutes ago';
		} else{
			return '1 minute ago';
		}
	} else if(code === 'now'){
		return 'just now (<1 minute)';
	} else{
		return null;
	}
}

function divisionOfTime(temp) {
	var result;
	var temp = Math.floor(milliseconds/1000);

	var years = Math.floor(temp/31536000);
	if (years) {
		result = ['year', years];
	    return result;
	} 

	var months = Math.floor(temp/2592000);
	if (months){
		result = ['months', months];
	    return result;
	} 

	var weeks = Math.floor(temp/604800);
	if(weeks) {
		result = ['weeks', weeks];
	    return result;
	} 

	var days = Math.floor(temp/86400);
	if(days) {
		result = ['days', days];
	    return result;
	} 

	var hours = Math.floor(temp/3600);
	if(hours) {
		result = ['hours', hours];
	    return result;
	} 

	var minutes = Math.floor(temp/60);
	if(minutes){
		result = ['minutes', minutes];
	    return result;
	}

	result = ['now'];
	return result;
}

function getCurrentDate() {
	var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + ", "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}

//Saturday, Jan 17, 1970







