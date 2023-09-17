import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Import utilities
import { useCookies } from "react-cookie";
import { tailwindConfig } from "../../utils/Utils";
import useSkills from "../../hooks/dashboard/useSkills";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Skills() {
  const [cookies] = useCookies(["studentId"]);
  const { studentId } = cookies;
  const [skillsData, setSkillsData] = useState(null); // State to store skills data

  // Fetch skills data when the component mounts
  useEffect(() => {
    async function fetchSkillsData() {
      try {
        const data = await useSkills(studentId);
        setSkillsData(data);
      } catch (error) {
        // Handle errors here, e.g., log the error or show an error message
        console.error("Error fetching skills:", error);
      }
    }

    fetchSkillsData();
  }, [studentId]);

  const chartData = {
    labels: skillsData ? Object.keys(skillsData) : [],
    datasets: [
      {
        label: "能力值",
        data: skillsData ? Object.values(skillsData) : [],
        backgroundColor: tailwindConfig().theme.colors.orange[500],
        borderColor: tailwindConfig().theme.colors.orange[500],
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="flex flex-col col-span-12 sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Skills
        </h2>
      </header>
      {studentId ? (
        <div className="flex justify-center flex-col px-14 bg-white  dark:bg-slate-800">
          <div className="text-center my-4">學號：{studentId}</div>
          {skillsData ? (
            <Radar data={chartData} width={300} height={300} />
          ) : (
            <div>Loading skills data...</div>
          )}
        </div>
      ) : (
        <div className="pt-20 text-center">Please input your student ID</div>
      )}
    </div>
  );
}

export default Skills;
