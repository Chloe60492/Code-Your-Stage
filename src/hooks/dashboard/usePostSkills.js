import axios from "axios";
import { useCookies } from "react-cookie";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["studentId"]);
  return async (studentId, skills) => {
    try {
      await axios.post(`https://api.projectszero.tech/skills/${studentId}`, skills, {
        headers: {
          'Content-Type': 'application/json',  // Corrected header key and value
          'Access-Control-Allow-Origin': 'https://api.projectszero.tech', // Corrected header key and value
        }
      });
      setCookie("studentId", studentId);
      alert("送出成功");
    } catch (error) {
      alert(error);
    }
  };
};

export default usePostSkills;
