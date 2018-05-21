let myLibrary = JSON.parse(localStorage.getItem("library")) || [];

function Book(title, author, page, read) {
	this.title = title;
	this.author = author;
	this.page = page;
	this.read = read;
}

function addBookToLibrary() {
	myLibrary.push(new Book("sdfds", "dfgdf", "45", true));
	
	render();
}

function render() {
	debugger;
	if(myLibrary.length) {
		document.querySelector('table').style.display = 'block';
		console.log(document.querySelector('.noBook'));
		document.querySelector('.noBook').syle.display = 'none';
	}
	else {
		document.querySelector('.noBook').syle.display = 'block';
		document.querySelector('table').style.display = 'none';
	}
	
	document.querySelector('.tableData').innerHTML = myLibrary.map((book, i) => {
		return `<tr>
					<td><cite>$(book.title)</cite></td>
					<td>$(book.author)</td>
					<td>$(book.page)</td>
					<td>
						<input type="checkbox" id="$(i)">
					</td>
					<td>
						<span class="fas fas-time"></span>
					</td>
				</tr>
				`
	}).sort().join('');
}