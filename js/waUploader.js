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

//			var reg = new RegExp( '(.{8}),\s(.{8}):\s([А-яA-z]*):\s(.*)' );
			var messages = JSON.parse( this.response );
			for (var i = 0; i<messages.length; i++)
			{
				console.log(messages[i]);
				//var arr = reg.exec( messages[i] );
//				console.log( 'date: ' + arr[0] + "  message: " + arr[3] );
			}
		}
	};

	xhr.send( formData );

	return false; // Prevent page from submitting.
}

