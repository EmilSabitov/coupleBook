//window.onload = function() {
//	var options = {
//		url : 'fileParserWA.php',
//		method : 'POST',
//
//		success:       parseResult,  // post-submit callback
////		uploadProgress: OnProgress, //upload progress callback
//		resetForm: true        // reset the form after successful submit
//	};
//
//	$('#whatsapp').submit(function() {
//		$(this).ajaxSubmit(options);
//		return false;
//	});
//
//};
//
//
//
//var parseResult = function(data) {
//	console.log(data);
//};


function sendForm( form ) {
	var formData = new FormData( form );

	var xhr = new XMLHttpRequest();
	xhr.open( 'POST' , form.action , true );

	xhr.onreadystatechange = function ( e ) {
		if (this.readyState==4 && this.status==200)
		{


			var messages = JSON.parse( this.response );







			for (var i = 0; i<messages.length; i++)
			{

				var re = new RegExp(/([\s\S]{8}),\s([\s\S]{8}):\s([\s\S]*):\s([\s\S]*)/);

//				var m;
//
//				while ((m = re.exec(messages[i])) != null) {
//					if (m.index === re.lastIndex) {
//						re.lastIndex++;
//					}
//					// View your result using the m-va riable.
//					// eg m[0] etc.
//				}
				var arr = re.exec(messages[i]);
				console.log( 'date: ' + arr[0] + "  message: " + arr[3] );
			}
		}
	};

	xhr.send( formData );

	return false; // Prevent page from submitting.
}

