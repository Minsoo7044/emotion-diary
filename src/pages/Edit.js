import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originData, setOriginData] = useState();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const title = document.getElementsByTagName("title")[0];
    title.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length < 1) return;
    const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

    if (!targetDiary) navigate("/", { replace: true });
    if (targetDiary) setOriginData(targetDiary);
  }, [navigate, id, diaryList]);

  return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
};

export default Edit;
