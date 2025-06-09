// projectHandler.js
import { getProjects } from "@/actions/projects/getProjects";
import { getBalance } from "@/actions/payments/getBalance";

export const getProjectsHandler = async (token, setProjects, setCurrentProject, setLoading) => {
    setLoading(true);

    const response = await getProjects(token);
    const projects = Object.entries(response.response.projectsResponse.projects);

    setProjects(projects);

    // Setting current project logic should ideally be handled elsewhere in your application
    if (projects.length > 0) {
        setCurrentProject(projects[0]);
    }

    setLoading(false);
};

export const getBalanceHandler = async (token, projectId, setBalance) => {
    const response = await getBalance(token, projectId);
    setBalance(response.response.balanceResponse.data);
};
