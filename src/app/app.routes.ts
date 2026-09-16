import { Routes } from '@angular/router';
import { Feed } from './feed/feed';
import { ForgotPassword } from './forgot-password/forgot-password';
import { Login } from './login/login';
import { ProductDetails } from './product-details/product-details';
import { Register } from './register/register';
import { ShoppingCart } from './shopping-cart/shopping-cart';

export const routes: Routes = [
    {path:"", component:Feed},
    {path:"feed", component: Feed},
    {path:"forgot-password", component: ForgotPassword},
    {path:"login", component: Login},
    {path:"product-details", component: ProductDetails},
    {path:"register", component: Register},
    {path:"shopping-cart", component: ShoppingCart}
];
