import { useEffect, useState } from "react"
import './App.css'
const CAT_ENDPOINT_FACT_URL = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function App(){

    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(CAT_ENDPOINT_FACT_URL)
        .then(response => response.json())
        .then(data => {
            const { fact } = data
            setFact(fact)
        })
    }, [])

    useEffect(()=>{

        if(!fact) return

        const firstWord = fact.split(' ', 3).join(' ')

        fetch(`https://cataas.com/cat/says/${firstWord}?json=true`)
        .then(res => res.json())
        .then(data => {
            const { _id } = data;
            setImageUrl(`${_id}/says/${firstWord}?fontSize=40&fontColor=white`);
        })

    },[fact])

    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first word for ${fact}`} />}
        </main>
    )
}