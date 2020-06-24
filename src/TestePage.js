import React, { useState } from 'react';

function TestePage() {

    const [ numero, setNumero ] = useState(1);

        function incrementar(){
        setNumero(numero + 1);        
    }

    return <div>
        <h1>{numero}</h1>
        <button onClick={incrementar}>Incrementar</button>
        </div>
}
export default TestePage;