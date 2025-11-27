import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../ecommerce-store';
// import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  template: `
    <div appViewPanel>
      <h2 class="text-2xl font-bold mb-4">Resumen de Pedido</h2>
      
      <div class="space-y-3 text-lg pt-4">
        <div class="flex justify-between">
          <span>\$ {{total()}} </span>
        </div>
      </div>
      
    </div>
  `,
  styles: ``,
})
export class SummarizeOrder {
  store = inject(EcommerceStore);

  total = computed(() => this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));
}
