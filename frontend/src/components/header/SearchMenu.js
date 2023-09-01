import { Return, Search } from "../../svg";
import { useEffect, useRef, useState } from "react";
import useClickOutSide from "../../helpers/clickOutside";

export default function SearchMenu({ color, setShowSearchMenu }) {
  const menu = useRef(null);
  const input = useRef(null);
  const [iconVisible, setIconVisible] = useState(true);
  useClickOutSide(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
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
          className="search"
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
            placeholder="Search Donotrix"
            ref={input}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>

      <div className="search_history_header">
        <span>Recent searches</span>
        <a> Edit </a>
      </div>
      <div className="search_history"></div>
      <div className="search_result scrollbar"></div>
    </div>
  );
}
