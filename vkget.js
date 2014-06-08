window.onload = function () {


	//Берем переписку
	document.getElementById( 'users' ).addEventListener( "change" , userChecked );
	document.getElementById('social' ).addEventListener('change', socialChecked);
	$('#myModal2' ).modal('show');
	start();
};

var socialChecked = function() {
	var s  = this.selectedOptions[0].value;

	switch (s)
	{
		case '0' : {
			console.log('vk');
			document.getElementById('vk' ).style.display = 'block';
			document.getElementById('whatsapp' ).style.display = 'none';
			break;
		}
		case '1' : {
			console.log('whatsapp');
			document.getElementById('vk' ).style.display = 'none';
			document.getElementById('whatsapp' ).style.display = 'block';
			break;
		}
		default : {
			document.getElementById('vk' ).style.display = 'none';
			document.getElementById('whatsapp' ).style.display = 'none';
			break;
		}

	}
};
var to = "",
	messagesList = [];

var start = function () {
	sendResponse( 'getDialogs' , [] , function ( e ) {
		e[0].forEach( function ( d ) {
			if ( d.uid ) {
				var o = new Option( d.uid , d.uid );
				sendResponse( 'getUser' , [
					{ k : 'user_ids' , v : d.uid}
				] , function ( user ) {
					if ( user[0][0] ) {
						$( o ).html( user[0][0].first_name + " " + user[0][0].last_name );
						$( '#users' ).append( o );
					}
				} );
				//TODO вставить сюда забиратель имен


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
	var counter = 0;
	for ( var i = 0 ; i < messagesList.length ; i++ ) {

		if ( counter == 10 ) {
			slides.push( slide );
			slide = document.createElement( 'div' );
			slide.className = 'bb-custom-side';
			counter = 0;
		}

		slide.appendChild( messagesList[i] );
		counter++;
	}

	var page = document.createElement( 'div' );
	page.className = 'bb-item';
	//TODO create pages
	counter = 0;
	for ( var i = 0 ; i < slides.length ; i++ ) {
		if ( counter == 2 ) {
			book.appendChild( page );
			page = document.createElement( 'div' );
			page.className = 'bb-item';
			counter = 0;
		}
		page.appendChild( slides[i] );
		counter++;
	}


	book.innerHTML+= '<div class="bb-item">' + '<div class="bb-custom-side"><p>Ваша история подошла к концу! Сохраните ее на многие года на бумажном носителе! Мы позволяем создать Вам уникальную книгу, доступ к которой будете иметь только Вы и ваша вторая половинка! Бумажные носители никогда не устареют и останутся с Вами на долгую память. Спасибо что использовали наш сервис! Мы ждем ваших пожеланий на наш почтовый ящик: CoupleBook@hakta.pro Перейти к созданию книги Вы можете на правой стороне экрана!</p></div>' + '<div class="bb-custom-side" style="margin-top: 210px;"><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Заказть книгу с доставкой на Дом за несколько секунд! </button></div></div>';
	Page.init();


};
var changeBg = function ( e ) {
	var fP = document.getElementById( 'firstPage' ),
		img = e.getAttribute( 'img' );
	fP.style.backgroundImage = "url('" + img + "')";
	fP.style.backgroundSize = 'contain';
	fP.style.backgroundRepeat = 'no-repeat';
	fP.style.backgroundPosition = 'center';

	document.getElementsByClassName( 'bb-custom-wrapper' )[0].style.backgroundImage = "url('" + e.getAttribute( 'imgPage' ) + "')";
	var items = document.getElementsByClassName( 'bb-item' );
	for ( var i = 1 ; i < items.length ; i++ ) {
		items[i].style.backgroundImage = "url('" + e.getAttribute( 'imgPage' ) + "')";
	}


};
var sendForm = function ( form ) {
	var formData = new FormData( form );

	var xhr = new XMLHttpRequest();
	xhr.open( 'POST' , form.action , true );

	xhr.onreadystatechange = function ( e ) {
		if (this.readyState==4 && this.status==200)
		{
			console.log("съел");
			var book = document.getElementById( 'bb-bookblock' );

			var slides = [];
			var slide = document.createElement( 'div' );
			slide.className = 'bb-custom-side';
			var counter = 0;
			var messages = JSON.parse( this.response );

			for (var i = 0; i<messages.length; i++)
			{

				var fromto = "from";


				var re = new RegExp(/([\s\S]{8}),\s([\s\S]{8}):\s([\s\S]*):\s([\s\S]*)/);

				var arr = re.exec(messages[i]);
				if ( arr[3] == 'Марат' ) {
					fromto = 'to';
				}
						var messBlock = document.createElement( 'div' );
				messBlock.className = "message " + fromto;
				messBlock.innerHTML = arr[4];
				messagesList.push( messBlock );


			}
			console.log("собираю форму");
			combineBook();
		}
	};

	xhr.send( formData );

	return false; // Prevent page from submitting.
};

var combineBookWhatsApp = function () {
	var book = document.getElementById( 'bb-bookblock' );

	var slides = [];
	var slide = document.createElement( 'div' );
	slide.className = 'bb-custom-side';
	var counter = 0;
	for ( var i = 0 ; i < messagesList.length ; i++ ) {

		if ( counter == 10 ) {
			slides.push( slide );
			slide = document.createElement( 'div' );
			slide.className = 'bb-custom-side';
			counter = 0;
		}

		slide.appendChild( messagesList[i] );
		counter++;
	}

	var page = document.createElement( 'div' );
	page.className = 'bb-item';
	//TODO create pages
	counter = 0;
	for ( var i = 0 ; i < slides.length ; i++ ) {
		if ( counter == 2 ) {
			book.appendChild( page );
			page = document.createElement( 'div' );
			page.className = 'bb-item';
			counter = 0;
		}
		page.appendChild( slides[i] );
		counter++;
	}


	book.innerHTML+= '<div class="bb-item">' + '<div class="bb-custom-side"><p>Ваша история подошла к концу! Сохраните ее на многие года на бумажном носителе! Мы позволяем создать Вам уникальную книгу, доступ к которой будете иметь только Вы и ваша вторая половинка! Бумажные носители никогда не устареют и останутся с Вами на долгую память. Спасибо что использовали наш сервис! Мы ждем ваших пожеланий на наш почтовый ящик: CoupleBook@hakta.pro Перейти к созданию книги Вы можете на правой стороне экрана!</p></div>' + '<div class="bb-custom-side" style="margin-top: 210px; margin-left:auto; margin-right:auto;"><button class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Заказть книгу с доставкой на Дом за несколько секунд! </button></div></div>';
	Page.init();


};



