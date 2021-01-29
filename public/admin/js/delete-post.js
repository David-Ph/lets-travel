let articlesBlock = document.querySelector('.articles');

articlesBlock. addEventListener('click', function(event){
	if(event.target.classList.contains('btn-remove')){
		let id = event.target.parentNode.parentNode.querySelector('.id').value;
		fetch('http://localhost:3000/posts/' + id, {
			method: 'DELETE'
		}).then((resp) => resp.text())
		.then(() => window.history.go());
	}
});