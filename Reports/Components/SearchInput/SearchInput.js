import React, { useState } from 'react'
import style from "./SearchInput.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from 'antd';
import { get } from "loadsh"

const SearchInput = (props) => {
    const [showLiveSearch, setShowLiveSearch] = useState(false);
    const [filteredList, setfilteredList] = useState([]);
    const { reports } = props;

    const onFocusHandler = () => {
        setShowLiveSearch(true);
    };
    const onBlurHandler = () => {
        setShowLiveSearch(false);
    };

    const onSearchChange = (e) => {
        const reg = new RegExp(e.target.value.toLowerCase());
        const filters = get(reports, "reports", [].filter((report) => {
            return reg.test(report.reportCode.toLowerCase());
        }));
        setfilteredList(filters);
    }

    return (
        <div>
            <Input
                className={style.searchInput}
                placeholder="Gold (14k)"
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                onChange={onSearchChange}
                prefix={<SearchOutlined className={style.Icon} />}
            />
            {showLiveSearch && (
                <ul className={style.SearchList}>
                    {filteredList.map((report) => {
                        return (
                            <li className={style.SearchItems}>
                                <a
                                    href={
                                        "http://localhost:3000/reports/" + report.reportCode
                                    }
                                >
                                    {report.reportCode}
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