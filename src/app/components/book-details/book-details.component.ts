import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import {Book} from '../../common/book';
import  {CartItem} from '../../common/cart-item';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
	book:Book = new Book();
  cart:CartItem;

  constructor(private _activatedRoute: ActivatedRoute,
              private _bookService: BookService,
              private _cartService:CartService) { 
  }

  ngOnInit(): void {
  	this._activatedRoute.paramMap.subscribe(

  		   ()=>{
  		   	this.getBookInfo();
  		   }

  		)

  }

  getBookInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
   
    
     if(this._cartService.getCartItem(id) != undefined){
      this.cart = this._cartService.getCartItem(id);
      console.log(this.cart);
      console.log(this.book)

      this.book.id = this.cart.id
      this.book.name = this.cart.name
      this.book.imageUrl = this.cart.imageUrl
      this.book.unitPrice = this.cart.unitPrice
      this.book.unitsInStock = this.cart.unitsInStock
    } else {

      this._bookService.get(id).subscribe(
      data => {
        this.book = data;
      }
    );


    } 

}
  
addToCart(){
  const id: number = +this._activatedRoute.snapshot.paramMap.get('id');
	const cartItem = new CartItem(this.book);
	this._cartService.addToCart(cartItem);
  this.cart = this._cartService.getCartItem(id);
  
  this.getBookInfo();
  
	 

}
}
