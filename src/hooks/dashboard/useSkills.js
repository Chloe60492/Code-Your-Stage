import axios from "axios";

const useSkills = async (studentId) => {
  try {
    const response = await axios.get(`https://api.projectszero.tech/skills/${studentId}`);
    
    if (response.status === 200) {
      return response.data; // Return the skills data
    } else {
      throw new Error("Failed to retrieve skills");
    }
  } catch (error) {
    // Handle errors here, e.g., log the error or show an error message
    console.error("Error fetching skills:", error);
    return null; // Return null to indicate an error
  }
};

export default useSkills;
