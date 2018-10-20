import React from 'react';

export default ({value,onChange})=>(
    <div>
        <input value={value} onChange={(e)=>onChange(e.target.value)}/>
    </div>
)
