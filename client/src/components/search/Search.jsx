import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import styles from "./search.module.scss";
import { searchServices } from "../../services/searchServices";
import WrapperItem from "../popper/wrapperitems/WrapperItem";
import Messitem from "../messlist/messitem/Messitem";
import useDebounce from "../../hooks/useDebounce";

const cx = classNames.bind(styles);

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResults, setShowResults] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounced = useDebounce(searchValue, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const results = await searchServices(searchValue);
      setSearchResult(results);

      setLoading(false);
    };

    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
    setSearchResult([]);
  };

  const handleHideResult = () => {
    setShowResults(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <HeadlessTippy
      interactive={true}
      appendTo={() => document.body}
      placement="bottom"
      visible={searchResult.length > 0 && showResults}
      render={(attrs) => (
        <div className={cx("search-results")} tabIndex="-1" {...attrs}>
          <WrapperItem>
            <h4 className={cx("search-title")}>Accounts</h4>
            {searchResult.map((result, index) => (
              <Messitem key={result._id} data={result} />
            ))}
          </WrapperItem>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx("wrapper")}>
        <div className={cx("search")}>
          <input
            placeholder="Search"
            ref={inputRef}
            value={searchValue}
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
          />
        </div>
      </div>
    </HeadlessTippy>
  );
};

export default Search;
