import { Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EcommerceStore } from '../../ecommerce-store';
import { MatBadge } from '@angular/material/badge';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header-actions',
  imports: [MatButton, MatIconButton, MatIcon, RouterLink, MatBadge],
  template: `
    <div class="flex items-center gap-2">
      <button matIconButton [matBadge]="store.cartCount()" [matBadgeHidden]="store.cartCount() === 0" routerLink="cart">

        <mat-icon>shopping_cart</mat-icon></button>      

        <button matButton="">Tienda</button>
        <button matButton="">Inicio</button>
      <button matButton="">Nosotros</button>
    </div>
  `,
  styles: ``,
})
export class HeaderActions {
  store = inject(EcommerceStore);
}
