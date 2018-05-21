var myLibrary = JSON.parse(localStorage.getItem("library")) || [];

function Book(title, author, page, read) {
	this.title = title;
	this.author = author;
	this.page = page;
	this.read = read;
}

function addBookToLibrary() {
	myLibrary.push(new Book("sdfds", "dfgdf", "45", true));
	
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
		return `<tr>
					<td><cite>${book.title}</cite></td>
					<td>${book.author}</td>
					<td>${book.page}</td>
					<td>
						<input type="checkbox" ${book.read ? 'checked' : ''}">
					</td>
					<td>
						<button type="button" class="removeButton">
							<span class="fas fa-times fa-lg"></span>
						</button>
					</td>
				</tr>`;
	}).sort().join('');
	
	function deleteButton(event) {
		console.log(event);
		
		myLibrary = myLibrary.splice(position, 1);
		render();
		localStorage.setItem('library', JSON.stringify(myLibrary));
	}
		
	document.querySelectorAll('.removeButton').forEach((book) => {
		book.addEventListener('click', event => {
			deleteButton(event);
		});
	});
}

