import { createAction, props } from "@ngrx/store";
import { Product } from "../../product";

export const loadProductsSuccess = createAction(
  '[Product API] Load Success',
  props<{products: Product[]}>()
  );
  export const loadProductsFail = createAction(
    '[Product API] Load Fail',
    props<{error: string}>()
    );

    export const updateProductSuccess = createAction(
      '[Product API] Update Product Success',
      props<{product: Product}>()
    );

    export const updateProductFail = createAction(
      '[Product API] Update Product Fail',
      props<{error: string}>()
    );

    export const createProductSuccess = createAction(
      '[Product API] Create Product Success',
      props<{product: Product}>()
    );

    export const createProductFail = createAction(
      '[Product API] Create Product Fail',
      props<{error: string}>()
    );

    export const deleteProductSuccess = createAction(
      '[Product API] Delete Product Success',
      props<{productId: number}>()
    );

    export const deleteProductFail = createAction(
      '[Product API] Delete Product Fail',
      props<{error: string}>()
    );
