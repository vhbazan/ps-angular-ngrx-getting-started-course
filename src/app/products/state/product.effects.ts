import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as ProductActions from './product.actions';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
              private productService: ProductService) {
  }

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        mergeMap(()=> this.productService.getProducts().pipe(
          map(products => ProductActions.loadProductsSuccess({
            products
          }))
        ))
    );
  });

}
