async function getCallbackRequests(){
	return await fetch('http://localhost:3000/callback-requests')
						.then((response) => response.json())
						.then((data) => data);
}

let requestsBlock = document.querySelector('#v-pills-callback');

requestsBlock. addEventListener('click', function(event){
	if(event.target.classList.contains('btn-remove')){
		let id = event.target.parentNode.parentNode.querySelector('.id').value;
		fetch('http://localhost:3000/callback-requests/' + id, {
			method: 'DELETE'
		}).then((resp) => resp.text())
		.then(() => window.history.go());
	}
});