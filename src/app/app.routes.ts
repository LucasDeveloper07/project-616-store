import { Routes } from '@angular/router';
import { Feed } from './feed/feed';
import { EsqueciSenha } from './esqueci-senha/esqueci-senha';
import { Login } from './login/login';
import { CriarConta } from './criar-conta/criar-conta';
import { ProductDetails } from './product-details/product-details';
import { ShoppingCart } from './shopping-cart/shopping-cart';

export const routes: Routes = [
    {path:"", component:Feed},
    {path:"feed", component: Feed},
    {path:"esqueci-senha", component: EsqueciSenha},
    {path:"login", component: Login},
    {path:"criar-conta", component: CriarConta},
    {path:"product-details", component: ProductDetails},
    {path:"shopping-cart", component: ShoppingCart}
];
