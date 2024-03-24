import axios from 'axios';

export const getVaccines = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccines");
    return data;
};

export const deleteVaccine = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/${id}`
    );
    return data;
};

export const createVaccine = async (vaccine) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines`,
        vaccine
    );
    return data;
};

export const updateVaccineFunc = async (id, vaccine) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/${id}`,
        vaccine
    );
    return data;
};

export const getVaccinesInDateRange = async (startDate, endDate) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/date-range`, {
            params: {
                startDate,
                endDate
            }
        }
    );
    return data;
};

export const getVaccinesByAnimal = async (animalId) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccines/animal/${animalId}`
    );
    return data;
};