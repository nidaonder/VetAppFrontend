import axios from 'axios';

export const getReports = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/reports");
    return data;
};

export const deleteReport = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`
    );
    return data;
};

export const createReport = async (report) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports`,
        report
    );
    return data;
};

export const updateAnimalFunc = async (id, report) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`,
        report
    );
    return data;
};