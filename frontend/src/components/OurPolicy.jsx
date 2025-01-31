import React from 'react'
import { assets } from '../assets/assets'

export const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.echange} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Echange gratuit</p>
            <p>Vous avez 30 jours pour retourner votre commande</p>
        </div>
    </div>
  )
}
