import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

import { sortOptionList, filterOptionList } from "../util/option";

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      if (sortType === "oldest") return parseInt(a.date) - parseInt(b.date);
    };

    const filterCallBack = (item) => {
      if (filter === "good") return parseInt(item.emotion) <= 3;
      if (filter === "bad") return parseInt(item.emotion) > 3;
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    return filteredList.sort(compare);
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton type="positive" text="새 일기 쓰기" onClick={() => navigate("/new")} />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
