import { useState, useEffect } from 'react';
import { getNewFact } from '../services/facts.js'

export function useCatFact(){
    const [fact, setFact] = useState()

    const refreshFact = () =>{
        getNewFact().then(newFact => setFact(newFact))
    }
    // Efecto para la obtencion del hecho
    useEffect(refreshFact, [])

    return {fact, refreshFact}
}