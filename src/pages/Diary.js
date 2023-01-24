import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) setData(targetDiary);
      if (!targetDiary) navigate("/", { replace: true });
    }
  }, [id, diaryList, navigate]);

  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${data && getStringDate(new Date(data.date))} 기록`}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
      />
    </div>
  );
};

export default Diary;
