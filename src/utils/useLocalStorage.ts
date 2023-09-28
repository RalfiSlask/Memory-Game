import { useState, useEffect } from "react";

const getSavedValue = <T>(key: string, initialValue: T): T => {
    const savedValue = localStorage.getItem(key)
    if(savedValue) return JSON.parse(savedValue);

    if(initialValue instanceof Function) return initialValue()
    return initialValue;
};

const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

   return [value, setValue]
};

export default useLocalStorage;