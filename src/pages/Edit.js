import { useSearchParams } from "react-router-dom";

const Edit = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);

  const mode = searchParams.get("mode");
  console.log(mode);

  return (
    <div>
      <h1>Edit</h1>
      <button onClick={() => setSearchParams({ who: "minsoo" })}>쿼리스트링 바꾸기</button>
    </div>
  );
};

export default Edit;
