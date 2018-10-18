import React from 'react';

export default ({list})=>(
    <section>
        <ul>
            {list.map(item=>makeItem(item))}
        </ul>
        
    </section>
)

const makeItem = (item)=>(
    <li>
        <div className={"flex-row"} onClick={()=>window.location.href = item.url}>
            <div >
                <h1>{item.title}</h1>
                <h2>{item.author}</h2>
                <h2>{item.sub}</h2>
            </div >
            <img src={item.thumbnail}/>
        </div>
    </li>
)