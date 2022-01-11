import { useState, useEffect, useRef } from 'react';

export function useCountDown(cb) {
    const [count, setCount] = useState(10);
    useEffect(() => {
        const timer = setTimeout(() => {

        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [])
}