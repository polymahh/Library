

(function (){

  class Book {
    constructor (title,author,pages,state){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.state = state
    }
    
  }
  const DEFAULT_DATA = [
    { title: "The Lord of the Rings", author: "Tolkien",pages:"343", state: "read" },
    {
      title: "Alice in Wonderland",
      author: "Lewis Caroll",
      pages:"343",
      state: "not read",
    },
    { title: "Naruto", author: "Masashi Kishimoto",pages:"343", state: "read" },
  ];
  
let library = {
  myLibrary : [],

  init () {
    
    this.cacheDom();
    // this.emptyStorage();
    this.checkLocalStorage();
    this.render();
    this.bindEvents();

  },
  cacheDom () {
    this.container = document.querySelector('.books-container') ;
    this.title = document.querySelector('#title');
    this.author = document.querySelector('#author');
    this.pages = document.querySelector('#pages');
    this.status = document.querySelector('#status');
    this.addButton = document.querySelector('#add');
  
  },
  render () {
    this.container.innerHTML  = '';
    this.myLibrary.forEach(this.showBook);
    
  } ,

  bindEvents(){
    this.addButton.addEventListener('click' , this.addBookToLibrary.bind(this));
    this.container.addEventListener('click',(e) => {
      if (e.target.classList == 'delete'){
        this.delete(e);
      }else if (e.target.classList == 'state'){
        this.switchState(e);
      }else return ;
    })
  },

  addBookToLibrary(){
    if (this.title.value == '' || this.author.value == '' || this.pages.value == ''){
      alert("Book Fields Can't be empty");
      return;
    }
    let book = new Book (this.title.value,this.author.value,this.pages.value, this.status.value);
    console.log(book)
    this.myLibrary.push(book);
    this.updateLocalStorage();
    this.render();
    this.clearInput();
    
  },

  clearInput(){
    this.title.value = '';
    this.author.value = '';
    this.pages.value = ''; 
  },

  delete(event) {
     let res = this.myLibrary.find(item => item.title == event.target.id);
    let resNum = this.myLibrary.indexOf(res);
    this.myLibrary.splice(resNum,1) ;
    this.updateLocalStorage();
    this.render();
  },

  showBook (num) {
     
    let sub = document.createElement('div')
    sub.classList.add('book','six','columns','u-full-width')
    library.container.appendChild(sub);

    let divTitle = document.createElement('div');
    divTitle.textContent = "Name: " + num.title;
    let divAuthor = document.createElement('div');
    divAuthor.textContent = "Author: " + num.author;
    let divPages = document.createElement('div');
    divPages.textContent = "Pages: " + num.pages;

    let  stateButton = document.createElement('button');
    stateButton.classList.add('state')
    stateButton.setAttribute('id',num.title)
    stateButton.innerText = num.state;
    let del = document.createElement('button');
    del.classList.add('delete')
    del.setAttribute('id',num.title)
    del.textContent = 'Delete';

    sub.appendChild(divTitle);
    sub.appendChild(divAuthor);
    sub.appendChild(divPages);
    sub.appendChild(stateButton)
    sub.appendChild(del);

  
  },
  switchState (event){
    let book = this.myLibrary.find(item => item.title == event.target.id);
    let bookIndex = this.myLibrary.indexOf(book);
      
    if (event.target.innerText == 'READ'){
      console.log(this.myLibrary)
      this.myLibrary[bookIndex].state = 'not read' ;
      this.updateLocalStorage();
      this.render();
    }else {

      this.myLibrary[bookIndex].state = 'read' ;
      this.updateLocalStorage();
      this.render();
    }
  },
  
  updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(library.myLibrary));
  },
  
  checkLocalStorage (){
    if (localStorage.getItem('myLibrary')){
      this.myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    } else {
      this.myLibrary = DEFAULT_DATA
    }
    
  },
  emptyStorage(){
    localStorage.removeItem("myLibrary");
  }
}


library.init();

})();

