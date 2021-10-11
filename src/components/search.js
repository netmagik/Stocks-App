import React from "react";

const Search = (props) => {

    const handleChange = (e) => {
        props.handleSearch(e.target.value);
    }

    return (
        <div className="search-area">
            <label htmlFor="search">Enter Stock Symbol</label>
            <input 
                type="text" 
                onChange={handleChange}
                onKeyPress={props.search}
                value={props.query}
                name="search" 
                id="search-box" />
        </div>
    )
}

export default Search;