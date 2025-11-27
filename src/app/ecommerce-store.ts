import { computed } from "@angular/core";
import { Product } from "./models/products"
import { signalStore, withComputed, withState, withMethods, patchState, signalMethod } from "@ngrx/signals"
import { produce } from "immer";
import { CartItem } from "./models/cart";

export type EcommerceState = {
    products: Product[];
    category: string;
    cartItems: CartItem[];
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },

    withState({
        products: [
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
                description: 'Una generosa selección de nuestros vegetales más frescos de temporada, para toda la familia.',
                category: 'mix vegetales',
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
                inStock: 12,
                price: 9000
            },
            {
                id: '4',
                name: 'variedad de morrón',
                description: 'hasta 4kg de puro morrón!',
                category: 'mix vegetales',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrpiaAVFdQeiAQ43Ghq8Pa__T76p4G8-RlY4a0JsxkQq2qjrJEdEphErJmX3U5p-9T5480HexUuOEt2J48Fna-ytpVSYSJwvjKMVIXgCZIrRUP-ygf8BfEF2Tg5l8IDyKXEUjtM1KTZsA0mm7iClcrW8cGwJx9JxRSH3UCgZ9w62xRPZd3m5CD_NHsIpFIv01BTV4dT2Sh5FuQZZRfSDwkkIFor5SfC4MCxRGU-H3JgDs3p_hvvhSjWm8oQCmbZQLOCbkiKD0Ve7b',
                inStock: 15,
                price: 8000
            },
            {
                id: '5',
                name: 'preparado de trucha',
                description: 'fileteado o medallón ya preparado para usted, hasta 2kg de la mejor carne de pescado para usted!',
                category: 'pescado',
                imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZSgkJ6Qs2z-IvnqhC3itrLmQ5aHj2mkcez8LaGEwybd-s_QbU-Km7ySRvVnor3nCvAYuVxDUAV04U3KaPhRLRUkU-k36KHP0D7YAZSb90ffajSeLpzviTZoFgFCXTnAPy0JxXPqukrXzVjqoejJmYlcgwSQCZCLc49K8DpBNDQtnYcBVvUjRlODd6vJZsue4GT9V5GGL38Utpj6xUsnxRZyddR3Fb_owvUsW6SuPfE5xhY19I498m1vzvbJXotdnqCixtHCqVDwuZ',
                inStock: 10,
                price: 12000
            }
        ],
        category: 'todo',
        cartItems: []
    } as EcommerceState),

    withComputed(({ category, products, cartItems }) => ({
        filteredProducts: computed(() => {
            if (category() === 'todo') return products();

            return products().filter((p) => p.category === category().toLowerCase());
        }),
        cartCount: computed(() => cartItems().length),
    })),

    withMethods((store) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });
        }),

        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);

            const updatedCartItems = produce(store.cartItems(), (draft) => {
                if (existingItemIndex !== -1) {
                    draft[existingItemIndex].quantity += quantity;
                    return;
                }

                draft.push({
                    product, quantity
                });
            });

            patchState(store, { cartItems: updatedCartItems})
        },

        setItemQuantity(params: { productId: string, quantity: number}){
            const index = store.cartItems().findIndex(c => c.product.id === params.productId);
            const updated = produce(store.cartItems(), (draft) => {
                draft[index].quantity = params.quantity
            });
            patchState(store, {cartItems: updated});
        },

        removeFromCart: (product: Product) => {
            patchState(store, {cartItems: store.cartItems().filter(c => c.product.id !== product.id)})
        }
    }))
);