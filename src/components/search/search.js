import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import {GEO_API_URL,geoApiOptions} from '../../api.js'

const Search = ({onSearchChange}) =>{

    const [search,setSearch] = useState(null);

    const loadOptions = (inputValue) =>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then(res => res.json())
        .then(res => {
            return {
                options: res.data.map((city) =>{
                    return{
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name},  ${city.countryCode}`,
                    }
                })
            }
        })
        .catch(err => console.error('error:' + err));
    }

    const handleOnChange = (searchData) =>{
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate 
        placeholder="Search for city"
        debounceTimeout={500}
        value = {search}
        onChange={handleOnChange}
        loadOptions = {loadOptions}
        />
    );
}

export default Search;