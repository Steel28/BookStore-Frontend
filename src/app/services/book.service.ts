import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Book} from '../common/book';
import {BookCategory} from '../common/book-category';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BookService {
	private baseUrl= "http://localhost:8081/api/v1/books"
	private categoryUrl = "http://localhost:8081/api/v1/book-category"

  constructor(private httpClient: HttpClient) { }

  getBooks(theCategoryId: number, currentPage:number, pageSize:number): Observable<GetResposeBooks> {

  	const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;

  	return this.httpClient.get<GetResposeBooks>(searchUrl);
  
  }

  getBookCategories(): Observable<BookCategory[]>{
  	return this.httpClient.get<GetResposeBookCategory>(this.categoryUrl)
  	.pipe(
  		map(response=>response._embedded.bookCategory)
  		)

  }

  searchBooks(keyword: string, currentPage:number, pageSize:number): Observable<GetResposeBooks> {

  	const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;

  	return this.httpClient.get<GetResposeBooks>(searchUrl)
  	
  }


  get(bookId:number): Observable<Book>{

  	const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
  	return this.httpClient.get<Book>(bookDetailsUrl);
  }


}



interface GetResposeBooks{
	_embedded:{
		books:Book[];
	},
	page:{
		size:number,
		totalElements:number,
		totalPage:number,
		number:number,

	}
}

interface GetResposeBookCategory{
	_embedded:{
		bookCategory:BookCategory[];
	}
}
