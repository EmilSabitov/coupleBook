window.onload = function () {


	//Берем переписку
	document.getElementById('users' ).addEventListener("change",  userChecked);

};

var start = function () {
	sendResponse( 'getDialogs' , [] , function ( e ) {
		e[0].forEach( function ( d ) {

			if ( d.uid ) {
				var o = new Option( d.uid , d.uid );
				//TODO вставить сюда забиратель имен
				$( o ).html( d.uid );
				$( '#users' ).append( o );
			}
		} );

	} );
};
var sendResponse = function ( action , params , cb ) {
	var xhr = new XMLHttpRequest();
	var p = "";
	params.forEach( function ( e ) {
		p += '&' + e.k + '=' + e.v;
	} );
	xhr.open( 'GET' , 'vk.php?action=' + action + p , false );
	var formData = new FormData();

// Hack to pass bytes through unprocessed.
	xhr.overrideMimeType( 'text/plain; charset=x-user-defined' );

	xhr.onreadystatechange = function ( e ) {
		if ( this.readyState == 4 && this.status == 200 ) {
			//console.log( JSON.parse( this.responseText ) );
			cb( JSON.parse( this.responseText ) );
		}
	};

	xhr.send();

};

var userChecked = function ( e ) {
	var userId = this.selectedOptions[0].value;
	sendResponse('getHistory', [{ k: 'user_id', v : userId}] , function(e) {
		e[0].forEach(function(m){
			if ( m.mid) {
				$('#messages' ).append( m.body);
			}
		});
	});
};
