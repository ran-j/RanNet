$(function() {
	var socket = io.connect({reconnection: true});
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];

	span.onclick = function() {
		modal.style.display = "none";
		location.reload();
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	socket.on('jsonpost', function(JsonRe){
		console.log(JsonRe);		 
		$('#statusSend').text("Json Recebido, veja na aba console (aperte 'F12')");
		modal.style.display = "block";

		window.setTimeout(function () {
			modal.style.display = "none";
		}, 4000);

	});
});
