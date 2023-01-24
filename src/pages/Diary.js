import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

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

  if (!data) return <></>;

  const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

  return (
    <div className="Diary">
      <MyHeader
        headText={`${data && getStringDate(new Date(data.date))} 기록`}
        leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${data.id}`)} />}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <img src={curEmotionData.emotion_img} alt="" />
          <div className="emotion_descript">{curEmotionData.emotion_descript}</div>
        </section>
      </article>
    </div>
  );
};

export default Diary;
