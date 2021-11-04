import React from "react";
import AsyncSelect from 'react-select/async';

const Select = (props) => {

    return (
        <>
            <h1 className="title">Stock: <span className="symbol">{props.query}</span></h1>
            <div className="search">
            <AsyncSelect 
            cacheOptions
            maxMenuHeight={200}
            onChange={props.onChange}
            value={props.query}
            placeholder={'Stock Symbol (e.g. TSLA)'}
            theme={theme => ({
            ...theme,
            borderRadius: 5,
            border: 'rgb(204, 219, 232) 1px solid',
            boxShadow: '0 1px 3px rgb(0 0 0 / 12%)',
            margin: '20px 10px',
            colors: {
                ...theme.colors,
                primary25: 'lightblue',
                primary: 'black',
            },
            })}
            loadOptions={props.loadOptions}
            />
            </div>
        </>
    )
}

export default Select;