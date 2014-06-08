window.onload = function () {


	//Берем переписку
	document.getElementById( 'users' ).addEventListener( "change" , userChecked );

};

var to = "",
	messagesList = [];

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

// Hack to pass bytes through unprocessed.
	xhr.overrideMimeType( 'text/plain; charset=x-user-defined' );

	xhr.onreadystatechange = function ( e ) {
		if ( this.readyState == 4 && this.status == 200 ) {
			console.log( JSON.parse( this.responseText ) );
			cb( JSON.parse( this.responseText ) );
		}
	};

	xhr.send();
};


var userChecked = function ( e ) {
	to = this.selectedOptions[0].value;
	sendResponse( 'getHistory' , [
		{ k : 'user_id' , v : to}
	] , function ( e ) {
		e[0].forEach( function ( m ) {

			if ( $( 'input[name="view"]:checked' ).val() == 'vk' ) {
				if ( m.mid ) {
					var fromto = "from";

					if ( m.from_id == to ) {
						fromto = 'to';
					}
					var messBlock = document.createElement( 'div' );
					messBlock.className = "message " + fromto;
					messBlock.innerHTML = m.body;
					messagesList.push( messBlock );

				}
			}
			else {
				if ( m.mid ) {
					var fromto = "balloonleft";

					if ( m.from_id == to ) {
						fromto = 'balloonright';
					}
					var messBlock = document.createElement( 'div' );
					messBlock.className = fromto;
					messBlock.innerHTML = m.body;
					messagesList.push( messBlock );

				}
			}
		} );
		combineBook();
	} );
};

var combineBook = function () {
	var book = document.getElementById( 'bb-bookblock' );

	var slides = [];
	var slide = document.createElement( 'div' );
	slide.className = 'bb-custom-side';
	var counter  = 0;
	for ( var i = 0 ; i < messagesList.length ; i++ ) {

		if (counter == 10) {
			slides.push(slide);
			slide = document.createElement( 'div' );
			slide.className = 'bb-custom-side';
			counter = 0;
		}

		slide.appendChild( messagesList[i] );
		counter++;
	}

	var page = document.createElement( 'div' );
	page.className ='bb-item';
	//TODO create pages
	counter = 0;
	for (var i = 0; i< slides.length; i++)
	{
		if (counter ==2)
		{
			book.appendChild(page);
			page = document.createElement( 'div' );
			page.className ='bb-item';
			counter = 0;
		}
		page.appendChild(slides[i]);
		counter++;
	}
	Page.init();


};
var changeBg = function(e) {
var fP = document.getElementById('firstPage' ),
	 img = e.getAttribute('img');
	fP.style.backgroundImage = "url('"+img+"')";
	fP.style.backgroundSize = 'cover';
	fP.style.backgroundRepeat = 'no-repeat';

document.getElementsByClassName('bb-custom-wrapper' )[0].style.backgroundImage = "url('"+ e.getAttribute('imgPage')+"')";
	var items = document.getElementsByClassName('bb-item' );
	for(var i = 1; i<items.length ; i++ ){
			items[i].style.backgroundImage = "url('"+ e.getAttribute('imgPage')+"')";
	}




};
