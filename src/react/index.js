import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom'


const App = () => {
    const [c ,sC] = useState(0)
    useEffect(() => {
        navigator.bluetooth.requestDevice({
            filters: [{
                services: ['battery_service']
            }]
        }).then(device => {
            console.log('Got device:', device.name);
            console.log('id:', device.id);
        });
    }, [])
    const click = () => {
        debugger
        sC(2)
    }
    return (
        <div onClick={click}>{c}</div>
    )
}

ReactDom.render(<App />, document.getElementById('root'))