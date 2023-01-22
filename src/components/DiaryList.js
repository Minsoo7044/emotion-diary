import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오랜된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState("latest");

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") return parseInt(b.date) - parseInt(a.date);
      if (sortType === "oldest") return parseInt(a.date) - parseInt(b.date);
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    return copyList.sort(compare);
  };

  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

export default DiaryList;
