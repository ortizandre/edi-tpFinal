import { Component, computed } from '@angular/core';
import { signal } from '@angular/core';
import { input } from '@angular/core';
import { Product } from '../../models/products';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav} from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

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
        <h1 class="text-2xl font-bold text-gray-900">{{ category() }}</h1>
        
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product" />
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');

  // TODO: Añadir mas productos (4-5 opciones por categoría, trabajar categorías)
  products = signal<Product[]>([

    {
      id: '1',
      name: 'paquete para amantes de la ensalada',
      description: 'Una mezcla perfecta de Hortalizas, Vegetales y aderezos para disfrutes tu ensalada fresca e ideal.',
      category: 'ensaladas',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIkhr8lJuN85axYQn3M1L-POKXVI5p-s1EIx9orX4IldxpTb5e4CDouJj2f5TTulnCl93kWrg2b2oSv_9pxAsej5V43wR_BLzS0ucnwZLbq3HaR7uABdXjdK4rkv9boNg8ECs6jwB7CU-yO7xwWdU8Lw9nR5lahZqJdDXvHkKFkfHw4yj0aHg-wg8CpDdPfHooxPdvzjtkhozlASTxUEj_yKi1v_YBGQoYyAOU3opmE7wgDUsFYMmLAOWqWzFnWMsxIQMNqVNQu1rd',
      inStock: 30,
      price: 4000,
    },

    {
      id: '2',
      name: 'paquete de cosecha familiar',
      description: 'Una generosa selección de nuestras verduras más frescas y de temporada para toda la familia.',
      category: 'varios',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5KKCGbaCkQJSrFIwMkQQB633GLOTD5PEmyewRnj58Wwy53XE1jVACLumS9BimZU_8hKNiEIBUoRZWQq5B8P3K_FZvIneNhRNhWhLGin3P3kGRVTk-WIPQE4Qkxzm2zg5Sv9aHSptz18shO_6z7YW3gT94QVLo0p-Bo48ZOhdO7_zegqqEhjmXW2sAMFXr5333sWyc73rshSySGjOpRdNeXuUaqBMJaEeictn-Dm9Uu7zEBBJAeZ0QJXuiKi7Ilke-9kB63zUKkerg',
      inStock: 30,
      price: 3000
    },

    {
      id: '3',
      name: 'paquete de trucha fresca',
      description: 'Criadas de forma sostenible en nuestro sistema acuapónico y preparada a su gusto. De sabor suave y textura delicada.',
      category: 'pescado',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGn_XV7EcBLuaLLMOj9P1RVzHXR1W9zA8eYS5xuNMP5ufS5FE-0QAilUXzNzFge5GJ5-0lhTwXYQw2eQwRwNF9MTKO-FTsyVDLAGYubdUu-OkhnyuXjyGfb_iL175b1-KEh0tFaTEUz69b0bD1DtAS3dNhobfOWOs6HlcbQGHvSjFttrKtOmPTGeibTRoPlt_esZ9sz3NSoog_ywES0TqXUJGE-lo-pyIdJzO3IsKN7ngUWwOmTYdyXKRyB2-fA5uqGB2cmTVBYid6',
      inStock: 10,
      price: 9000
    }
  ]);

  filteredProducts = computed(() => {
    if (this.category() === 'all') return this.products();
    
    return this.products().filter((p) => p.category === this.category().toLowerCase())
  });

  categories = signal<string[]>(['all','ensaladas','varios','pescado']);
}