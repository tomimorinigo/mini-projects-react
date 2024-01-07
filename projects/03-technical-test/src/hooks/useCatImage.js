import {useState, useEffect} from 'react'
import { getNewImage } from '../services/image.js'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function useCatImage({fact}){
    const [imageUrl, setImageUrl] = useState()

    // Efecto para la obtencion de la imagen
    useEffect(()=>{
        if(!fact) return
        getNewImage({fact}).then(url => setImageUrl(url))
    },[fact])

    return {imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}`}
}