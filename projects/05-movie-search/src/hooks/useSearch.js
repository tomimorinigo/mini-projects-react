import { useState, useEffect, useRef } from "react";

export function useSearch(){
    const [search, updateSearch] = useState('')
    const [error, setError] = useState('')
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if(isFirstInput.current) {
        isFirstInput.current = search === ''
        return
      }
  
      if(search === '') {
        setError('Cant search for an empty movie')
        return
      }
  
      if(search.length < 3) {
        setError('Movie name must be at least 3 characters long')
        return
      }
  
      setError('')
    }, [search])
  
    return { search, updateSearch, error }
}