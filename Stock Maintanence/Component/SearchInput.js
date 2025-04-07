import React, { useState } from 'react'
import style from "./SearchInput.module.css"
import { SearchOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { get } from "loadsh"

const SearchInput = (props) => {
    const [showLiveSearch, setShowLiveSearch] = useState(false);
    const [filteredList, setfilteredList] = useState([]);
    const { stocks } = props;

    const onFocusHandler = () => {
        setShowLiveSearch(true);
    };
    const onBlurHandler = () => {
        setShowLiveSearch(false);
    };

    const onSearchChange = (e) => {
        const reg = new RegExp(e.target.value.toLowerCase());
        const filters = get(stocks, "stocks", [].filter((stock) => {
            return reg.test(stock.stockCode.toLowerCase());
        }));
        setfilteredList(filters);
    }

    return (
        <div>
            <Input
                className={style.searchInput}
                placeholder="Search"
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={onSearchChange}
                prefix={<SearchOutlined className={style.Icon} />}
            />
            {showLiveSearch && (
                <ul className={style.SearchList}>
                    {filteredList.map((stock) => {
                        return (
                            <li className={style.SearchItems}>
                                <a
                                    href={
                                        "http://localhost:3000/stockmaintanence/" + stock.stockCode
                                    }
                                >
                                    {stock.stockCode}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    )
}

export default SearchInput;