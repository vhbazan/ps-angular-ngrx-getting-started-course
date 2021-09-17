import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';

import * as ProductActions from './product.actions';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

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
          })),
          catchError(error =>
            of(ProductActions.loadProductsFail({error})))
        ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductActions.updateProduct),
        concatMap(action =>
          this.productService.updateProduct(action.product).pipe(
            map(product => ProductActions.updateProductSuccess( { product })),
            catchError(error => of(ProductActions.updateProductFail({ error })))
          ))
      )
  })

  createProduct$ = createEffect(() => {
    return this.actions$
    .pipe(
      ofType(ProductActions.createProduct),
      concatMap(action =>
        this.productService.createProduct(action.product).pipe(
          map(product => ProductActions.createProductSuccess({product})),
          catchError(error => of(ProductActions.createProductFail({ error })))
        )
        )
    )
  })
}
