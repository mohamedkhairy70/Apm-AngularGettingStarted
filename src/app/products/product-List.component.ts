import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { productService } from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.componont.css']
})

export class ProductListComponent implements OnInit , OnDestroy{

  constructor(private productService: productService) { }
 

  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

  private _listFilter: string = '';
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  get listFilter() : string {
    return this._listFilter;
  }
  
  set listFilter(value : string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
  
  ngOnInit(): void {
    this.sub = this.productService.getProduct().subscribe({
      next: produts => {
        this.products = produts;
        this.filteredProducts = this.products;
    },
      error: err => this.errorMessage = err.message
    });
    
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  performFilter(filterBy: string): IProduct[]
  {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy)
    );

  }

  toggleImage() : void
  {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message:string): void
  {
    this.pageTitle = "Product List "+ message;
  }
}