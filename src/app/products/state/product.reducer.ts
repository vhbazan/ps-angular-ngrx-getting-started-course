import { Product } from "../product";
import { ProductApiActions, ProductPageActions } from './actions';
import { createReducer, on } from '@ngrx/store';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

export const productReducer = createReducer(
  initialState,
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    console.log('original state: ', JSON.stringify(state));
    return {
      ...state,
      showProductCode: !state.showProductCode
    }
  }),
  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId
    }
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductPageActions.initCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductApiActions.loadProductsSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductApiActions.loadProductsFail, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  }),
  on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductApiActions.createProductFail, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: 0,
      error: action.error
    }
  }),
  on(ProductApiActions.deleteProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: 0,
      products: state.products.filter(p => p.id !== action.productId)
    }
  }),
  on(ProductApiActions.deleteProductFail, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: 0,
      error: action.error
    }
  }),
  );
