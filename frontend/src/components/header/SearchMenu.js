import { Return, Search } from "../../svg";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutside";
import {
  addToSearchHistory,
  getSearchHistoryFrontEnd,
  removeSearchHistory,
  searchAction,
  searchClickFrontEnd,
} from "../../functions/user";
import { Link } from "react-router-dom";
export default function SearchMenu({ color, setShowSearchMenu, token }) {
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [editSearchHistory, setEditSearchHistory] = useState(false);
  const searchHandle = async () => {
    if (searchTerm == "") {
      setSearchResult("");
    } else {
      const res = await searchAction(searchTerm, token);
      setSearchResult(res);
    }
  };

  const addToSearchHistoryHandler = async (id) => {
    const res = await addToSearchHistory(id, token);
    getSearchHistoryHandler();
  };

  const getSearchHistoryHandler = async () => {
    const historyData = await getSearchHistoryFrontEnd(token);
    setSearchHistory(historyData);
  };

  const removeSearchHistoryHandler = async (deletedUser, index) => {
    removeSearchHistory(deletedUser, token);
    const newSearchArray = [...searchHistory];
    newSearchArray.splice(index, 1);
    setSearchHistory(newSearchArray);
  };

  useClickOutSide(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  useEffect(() => {
    getSearchHistoryHandler();
  }, []);

  return (
    <div ref={menu} className="header_left search_area scrollbar">
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>

        <div
          className="search_when_open"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              {" "}
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={searchHandle}
          />
        </div>
      </div>

      {searchResult == "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a
            onClick={() => {
              setEditSearchHistory(true);
            }}
          >
            {" "}
            Edit{" "}
          </a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          searchResult == "" &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user, i) => (
              <Link
                to={`/profile/${user?.user.username}`}
                className="user_search_result hover1"
                onClick={(e) => {
                  if (!editSearchHistory) {
                    setShowSearchMenu(false);
                    addToSearchHistoryHandler(user?.user._id);
                  } else {
                    e.preventDefault();
                    removeSearchHistoryHandler(user?.user._id, i);
                  }
                }}
                key={user?.user._id}
              >
                <img src={user?.user.picture} />
                <span>
                  {user?.user.first_name} {user?.user.last_name}
                </span>
                {editSearchHistory && (
                  <i
                    className="exit_icon"
                    onClick={() => {
                      removeSearchHistoryHandler(user?.user._id, i);
                    }}
                  />
                )}
              </Link>
            ))}
      </div>
      <div className="search_result scrollbar">
        {searchResult &&
          searchResult.map((user) => (
            <Link
              to={`/profile/${user?.username}`}
              className="user_search_result hover1"
              onClick={() => {
                setShowSearchMenu(false);
                addToSearchHistoryHandler(user?._id);
              }}
              key={user?._id}
            >
              <img src={user?.picture} />
              <span>
                {user?.first_name} {user?.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
