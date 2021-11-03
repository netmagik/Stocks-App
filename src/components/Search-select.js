import React from "react";
import AsyncSelect from 'react-select/async';

const Select = (props) => {

    return (
        <AsyncSelect 
        cacheOptions
        maxMenuHeight={200}
        onChange={props.onChange}
        value={props.query}
        placeholder={'Stock Symbol (e.g. TSLA)'}
        theme={theme => ({
          ...theme,
          borderRadius: 2,
          colors: {
            ...theme.colors,
            primary25: 'lightblue',
            primary: 'black',
          },
        })}
        loadOptions={props.loadOptions}
        />
    )
}

export default Select;