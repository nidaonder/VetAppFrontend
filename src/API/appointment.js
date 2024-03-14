import axios from 'axios';

export const getAppointments = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments");
    return data;
};

export const deleteAppointment = async (id) => {
    const { data } = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`
    );
    return data;
};

export const createAppointment = async (appointment) => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments`,
        appointment
    );
    return data;
};

export const updateAppointmentFunc = async (id, appointment) => {
    const { data } = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`,
        appointment
    );
    return data;
};