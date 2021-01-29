async function getEmails(){
	return await fetch('http://localhost:3000/emails')
						.then((response) => response.json())
						.then((data) => data);
}

let emailsBlock = document.querySelector('#v-pills-mails');

emailsBlock. addEventListener('click', function(event){
	if(event.target.classList.contains('btn-remove')){
		let id = event.target.parentNode.parentNode.querySelector('.id').value;
		fetch('http://localhost:3000/emails/' + id, {
			method: 'DELETE'
		}).then((resp) => resp.text())
		.then(() => window.history.go());
	}
});