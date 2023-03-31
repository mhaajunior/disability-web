import { useSelector } from "react-redux";

const Step2 = () => {
  const step1 = useSelector((state) => {
    return state.memberForm.data.step1;
  });
  console.log(step1);
  return <div>Step2</div>;
};

export default Step2;
