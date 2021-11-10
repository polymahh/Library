let container = document.querySelector('.container') ;

let myLibrary = [];

show();
const addButton = document.querySelector('#add');
addButton.addEventListener('click' ,addBookToLibrary);



  let Book = function (title, author, pages, status ){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status ;
      
  }


  function addBookToLibrary() {

    let title = document.querySelector('#title').value;
    console.log(title);
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let status = document.querySelector('#status').value;
    let bk = new Book(title, author, pages, status);
    myLibrary.push(bk);
    show();

  }

  function show () {
    while(container.childNodes[0]){container.removeChild(container.childNodes[0])}
    myLibrary.forEach(showBook);
    deleteFun ();
  
  }


  function showBook (num) {
     
      let sub = document.createElement('div')
      sub.classList.add('book')
      container.appendChild(sub);

      let divTitle = document.createElement('div');
      divTitle.textContent = num.title;
      let divAuthor = document.createElement('div');
      divAuthor.textContent = num.author;
      let divPages = document.createElement('div');
      divPages.textContent = num.pages;
      console.log(num)
      let del = document.createElement('button');
      del.classList.add('delete')
      del.setAttribute('id',num.title)
      del.textContent = 'Delete';

      sub.appendChild(divTitle);
      sub.appendChild(divAuthor);
      sub.appendChild(divPages);
      sub.appendChild(del);
    
  }


function deleteFun () {
  let delButtons = document.querySelectorAll('.delete')
  delButtons.forEach((delButton) => {
    delButton.addEventListener('click', () => {
          let res = myLibrary.find(item => item.title == delButton.id);
          console.log(res);
          let resNum = myLibrary.indexOf(res);
          console.log(resNum);
          myLibrary.splice(resNum,1) ;
          console.log(myLibrary)
          
          show();
    });
  });
}
