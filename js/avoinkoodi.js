$(document).ready(function() {

	$('.menuicon').click(function() {
	   $( '.menu-container' ).toggleClass('opened'); 
	});
	
	$('li a').click(function(){
	  $('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top - 50
	  }, 500); 
  
	  return false;
	});
	
	/* Get FB shares */

	$.get('http://graph.facebook.com/?id=http://www.avoinkoodi.fi',
		function(data) {
			if (data.shares) {
				$('#fb-share-count').text(data.shares);			
			}
		}
	);

	/* Get G+ shares */

	$.ajax({
		type: 'POST',
		url: 'https://clients6.google.com/rpc',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify([{
	    'method': 'pos.plusones.get',
	    'id': 'p',
	    'params':{
        'nolog': true,
        'id': 'http://www.avoinkoodi.fi/',
        'source': 'widget',
        'userId': '@viewer',
        'groupId': '@self'
        },
	    'jsonrpc': '2.0',
	    'key': 'p',
	    'apiVersion': 'v1'
		}]),
		success: function(data) {
			var plusOnes = data[0].result.metadata.globalCounts.count;
			if (plusOnes) {
				$('#gplus-share-count').text(plusOnes);
			}
		}
	});

	$('.share-link').click(function(ev) {
		window.open(this.href, 'share', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
		ev.preventDefault();
		return false;
	});
});