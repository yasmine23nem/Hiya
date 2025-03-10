import logo from '../assets/logo.jpg'
import search from '../assets/search.png'
import cart from '../assets/icart.png'
import accournt from '../assets/account.png'
import menu from '../assets/menu.png'
import dropdown from '../assets/dropdown.png'
import echange from '../assets/echange.png'
import cross from '../assets/cross.png'
import lll from '../assets/lll.jpg'
import mounia from '../assets/mounia.jpg'
import photo1 from '../assets/photo1.jpg'
import photo5 from '../assets/photo5.jpg'

import c from '../assets/c.jpg'

export const assets = { logo, search, cart, accournt, menu, dropdown, echange, cross, c, lll, mounia, photo1, photo5 }
export const products = [
    {
        _id: '1bbb',
        name: 'Bagues', // Fixed typo
        price: 25,
        image: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: true
    },
    {
        _id: "2bbh",
        name: 'Pantalon',
        price: 35,
        image: ['https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: false
    },
    {
        _id: "3hgh",
        name: 'Chaussures',
        price: 45,
        image: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: true
    },
    {
        _id: "4kjk",
        name: 'Casquette',
        price: 15,
        image: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: false
    },
    {
        _id: "5kjk",
        name: 'Veste',
        price: 55,
        image: ['https://images.unsplash.com/photo-1551028719-00167b16eac5'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: true
    },
    {
        _id: "6kj",
        name: 'Short',
        price: 20,
        image: ['https://images.unsplash.com/photo-1591195853828-11db59a44f6b'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: false
    },
    {
        _id: "7kjk",
        name: 'Robe',
        price: 40,
        image: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8'],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.',
        bestSeller: true
    }
]