import { Component } from '@angular/core';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'products/todo'
    },
    {
        path: 'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid')
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/view-cart/view-cart')
    },
];
