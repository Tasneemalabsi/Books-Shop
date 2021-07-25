'use strict';
let formEl=document.getElementById('newForm');
let books = [];
let tableEl = document.getElementById('bookTable');
let heads = ['Book Name', 'Book Pages', 'Price'];
let divEl=document.getElementById('tableDiv');

function Books (bookName,bookPages,bookPrice) {
  this.bookName=bookName;
  this.bookPages=0;
  this.bookPrice=bookPrice;
  books.push(this);
}
function tableHeader() {
  let trHead= document.createElement('tr');

  for (let index = 0; index < heads.length; index++) {
    let theadEl = document.createElement('th');
    theadEl.textContent=heads[index];
    trHead.appendChild(theadEl);

  }
  tableEl.appendChild(trHead);
}
tableHeader();
function randPage (){
  return Math.floor(Math.random() * (500 - 1) + 1);
}
Books.prototype.render= function() {
  let trEl =document.createElement('tr');
  
  // for (let i= 0; i < books.length; i++) {
  let nameTd= document.createElement('td');
  nameTd.textContent=this.bookName;
  trEl.appendChild(nameTd);
  let pagesTd= document.createElement('td');
  pagesTd.textContent= randPage();
  trEl.appendChild(pagesTd);
  let priceTd= document.createElement('td');
  priceTd.textContent=Number(this.bookPrice);
  trEl.appendChild(priceTd);
  

  //   }
  tableEl.appendChild(trEl);
  
};
function calculateTotal () {
    let total=0;
    for (let index = 0; index < books.length; index++) {
        total=total+Number(books[index].bookPrice);
        console.log(total);
        
    }
    let totalEl= document.createElement('p');
  totalEl.textContent='total: ' + total;
  divEl.appendChild(totalEl);
}


formEl.addEventListener('submit', handleSubmit);
function handleSubmit (event) {
  event.preventDefault();
  let bookName= event.target.bookName.value;
  let bookPrice = event.target.bookPrice.value;
  let bookPages='';
  let newBook = new Books (bookName,bookPages,bookPrice);
  newBook.render();
  calculateTotal();
  localStorage.setItem('bookData',JSON.stringify(books));
//   JSON.parse(localStorage.getItem('bokData'));
}
function localStorageRender () {
  for (let index = 0; index < books.length; index++) {
    let trEl =document.createElement('tr');
    let total= 0;
    window.total2=total;
    // for (let i= 0; i < books.length; i++) {
    let nameTd= document.createElement('td');
    nameTd.textContent=books[index].bookName;
    trEl.appendChild(nameTd);
    let pagesTd= document.createElement('td');
    pagesTd.textContent= randPage();
    trEl.appendChild(pagesTd);
    let priceTd= document.createElement('td');
    priceTd.textContent=Number(books[index].bookPrice);
    trEl.appendChild(priceTd);
    total= total+ Number(books[index].bookPrice);
    console.log(total);

    //   }
    tableEl.appendChild(trEl);
    let totalEl= document.createElement('p');
    totalEl.textContent='total: ' + total;
    divEl.appendChild(totalEl);


  }
}

function readFromLocalStorage () {
  let object = JSON.parse(localStorage.getItem('bookData'));
  if (object !== null) {
    books=object;

    localStorageRender();
    calculateTotal();
  }
//   else {
//     books;
//   }
}
readFromLocalStorage();


