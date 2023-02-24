import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    constructor(private productService: ProductService) {
    }  

    pageTitle: string = 'Product List!';
    errorMessage: string = '';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    sub!: Subscription; // we have typescript strict typing on which means we need to initialise, bang tells compiler we'll do that later.

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value:string) {
        console.log('In setter ', this._listFilter)
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string) : IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(x => x.productName.toLocaleLowerCase().includes(filterBy))
    }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
                this.listFilter = "Cart";
            }, // http calls return list all at once, hence the whole product list is updated here
            error: err => this.errorMessage = err
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}