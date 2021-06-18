import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { getCurrentProduct, getShowProductCode, State, getProducts, getError } from '../state/product.reducer';
import * as ProductActions from "../state/product.actions";

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(
    private store: Store<State>
      ) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);

    this.errorMessage$ = this.store.select(getError)
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
