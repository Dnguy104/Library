var myLibrary = JSON.parse(localStorage.getItem("library")) || [];

function Book(title, author, page, read) {
	this.title = title;
	this.author = author;
	this.page = page;
	this.read = read;
}

Book.prototype.deleteButton = function(event) {
	this.splice(event.target.parentNode.id, 1);
	render();
	localStorage.setItem('library', JSON.stringify(myLibrary));
}

function addBookToLibrary() {
	var title = document.getElementById('inputTitle').value;
	var author = document.getElementById('inputAuthor').value;
	var page = document.getElementById('inputPage').value;
	var read = document.getElementById('inputRead').checked;
	
	myLibrary.push(new Book(title, author, page, read));
	
	document.getElementById('inputTitle').value = '';
	document.getElementById('inputAuthor').value = '';
	document.getElementById('inputPage').value = '';
	document.getElementById('inputRead').checked = '';

	
	document.getElementById('myModal').style.display = 'none';
	localStorage.setItem('library', JSON.stringify(myLibrary));
	render();
}

function render() {
	if(myLibrary.length === 0) {
		document.querySelector('.noBook').style.display = 'block';
		document.querySelector('table').style.display = 'none';
	}
	else {
		document.querySelector('table').style.display = 'block';
		document.querySelector('.noBook').style.display = 'none';
	}
	
	document.querySelector('tbody').innerHTML = myLibrary.map((book, i) => {
		return `<tr >
					<td><cite>${book.title}</cite></td>
					<td>${book.author}</td>
					<td>${book.page}</td>
					<td>
						<input id='${i}' type="checkbox" class="readBox" ${book.read ? 'checked' : ''}/>
					</td>
					<td>
						<button type="button" class="removeButton">
							<span class="fas fa-times fa-lg"></span>
						</button>
					</td>
				</tr>`;
	}).sort().join('');
	
		
	document.querySelectorAll('.removeButton > span').forEach((book) => {
		book.addEventListener('click', event => {
			deleteButton(event);
		});
	});
	
	document.querySelectorAll('.readBox').forEach((book) => {
		book.addEventListener('click', event => {
			toggleRead(event);
		});
	});
	
	function toggleRead(event) {
		console.log(event.target.checked);
		myLibrary[event.target.id].read = !myLibrary[event.target.id].read;
		render();
		localStorage.setItem('library', JSON.stringify(myLibrary));
	}
}

document.getElementById('addBook').onclick = function() {
	document.getElementById('myModal').style.display = 'block';
}

window.onclick = function(event) {
	if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}

document.getElementById('cancelButton').addEventListener('click', function() {
	document.getElementById('myModal').style.display = 'none';
});


render();




