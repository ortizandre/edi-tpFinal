import { Component } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ListCartItems } from "./list-cart-items/list-cart-items";
import { SummarizeOrder } from "../../components/summarize-order/summarize-order";

@Component({
  selector: 'app-view-cart',
  imports: [BackButton, ListCartItems, SummarizeOrder],
  template: `
    <div class="mx-auto max-w-[1200px] py-6">
      <app-back-button label="Volver atrás" class="mb-6" navigateTo="/products/todo" />
      <h1 class="text-3xl font-extrabold mb-4">Carrito</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <app-list-cart-items />
        </div>

        <div>
          <app-summarize-order />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export default class ViewCart {

}
