import apiClient from "../../../shared/lib/apiClient";

export const projectService = {
  getAllProjects: async () => {
    const res = await apiClient.get("/project/list-admin");
    return res.data;
  },
  createProjects:async(data:any)=>{
    const res = await apiClient.post("/project/create", data);
    return res.data;
  }
};