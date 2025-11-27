import { Component, computed, inject } from '@angular/core';
import { signal } from '@angular/core';
import { input } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-products-grid',
  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    RouterLink,
    TitleCasePipe
  ],
  template: `

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categorias</h2>
          <mat-nav-list>
            @for (category of categories(); track category){
              <mat-list-item class="my-2" [routerLink]="['/products', category]">
                <span matListItemTitle class="font-medium"> 
                  {{ category | titlecase }}
                </span>
              </mat-list-item>
            }
          </mat-nav-list>
        </div>
      </mat-sidenav>
      
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ category()  | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6"> {{ store.filteredProducts().length }} encontrados </p>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('todo');

  store = inject(EcommerceStore);

  categories = signal<string[]>(['todo', 'ensaladas', 'mix vegetales', 'pescado']);

  constructor(){
    this.store.setCategory(this.category);
  }
}