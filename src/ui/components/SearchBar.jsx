import React, { useState } from "react";
import "./Searchbar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

function SearchBar({ placeholder }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const promises = [
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/search/trays?name=${searchWord}`),
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/search/courses?name=${searchWord}`),
      fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/search/ingredients?name=${searchWord}`)
    ];

    const responses = await Promise.all(promises);
    const data = await Promise.all(responses.map((response) => response.json()));

    const newFilter = data.flat().filter((value) => {
      return value.name && value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            console.log(value);
            if (value.name.substring(0, 4) === "Menú") {
              return (
                <Link className="dataItem" to={`/trays/${value.id}`} state={{ some: value.id }}>
                  <p>{value.name}</p>
                </Link>
              );
            } else if (value.price < 1000) {
              return (
                <Link className="dataItem" to={`/ingredients/${value.id}`} state={{ some: value.id }}>
                  <p>{value.name}</p>
                </Link>
              );
            }
            else {
              return (
                <Link className="dataItem" to={`/courses/${value.id}`} state={{ some: value.id }}>
                  <p>{value.name}</p>
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

