import React, { useState, useEffect, useRef } from 'react'
import './select.css'
// import { DebounceInput } from 'react-debounce-input'



const SeaarchComponent = ({data, dispalyKey, addPrivilege, addItemsToList, defaultValue="Select", selectHandler, maxList}) => {
    const [value, setValue] = useState(defaultValue)
    const [searchValue, setSearchValue] = useState("")
    const [showList, setShowList] = useState(false)
    const [showListCount, setShowListCount] = useState(maxList)
    const [itemsList, setItemsList] = useState();
    const [filteredList, setFilteredList] = useState(0);

    useEffect(()=>{
        getList();
    }, [data, searchValue, showListCount])
    const getList = () => {
        const filteredList = data.filter(list => searchValue.length>0?list[dispalyKey].startsWith(searchValue):data);
        setFilteredList(filteredList);
        const list = filteredList.length > 0 ? filteredList.slice(0, showListCount)
            .map(list => <li onClick={() => handleClick(list)} key={list[dispalyKey]}>{list[dispalyKey]}</li>): searchValue.length > 0 ? <li>{`'${searchValue}' not found`}</li>: null;
        setItemsList(list);

    }
    function handleToggleSearch() {
        setShowList(!showList);
        // setSearchValue('');
        setShowListCount(maxList);  // Reset Max items 
    }
    function handleClick(value) {
        setValue(value.name);
        setSearchValue(value.name);
        selectHandler(value);
        setShowList(false);
    }
    function handleChange(e) {
        setValue(defaultValue);
        setSearchValue(e.target.value);
    }
    function getRemainingCount() {
        return filteredList.length - showListCount;
    }
    function moreClickHandler() {
        setShowListCount(data.length);
    }
    function addItemInToList(value) {
        addItemsToList(value);
        setValue(value);
        // setSearchValue("");
        setShowList(!showList);
    }
    const wrapperRef = useRef(null);
        useEffect(() => {
          function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowList(false);
            }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [wrapperRef]);
    return(
        <>
            <div className="select-box" ref={wrapperRef}>
                <div className="search-box" onClick={handleToggleSearch}>
                    <span>{value}</span> <span className="toggle-icon"><i className="fa fa-chevron-down" aria-hidden="true"></i></span>
                </div>
                {showList && <div className="menu-list">
                    <div className="search-field-box">
                        <span className="search-icon"><i className="fa fa-search" aria-hidden="true"></i></span>
                    <input className="search-field" placeholder="Search..." onChange={handleChange}/>
                    {/* <DebounceInput
                        // minLength={4}
                        debounceTimeout={300}
                        onChange={handleChange} /> */}
                    </div>
                    <ul className="list-container">
                        {itemsList}
                    </ul>
                    {filteredList && filteredList.length > showListCount ? <span className="more-link" onClick={moreClickHandler}>{getRemainingCount()} more...</span>: null}
                    {addPrivilege && itemsList && filteredList.length == 0 ? <span className="add-btn" onClick={() => addItemInToList(searchValue)}>Add & Select</span>: null}
                </div>}
            </div>
        </>
    )
}

export default SeaarchComponent;