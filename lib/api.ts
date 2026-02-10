
export interface RegistrationFormData {
    full_name: string;
    email: string;
    mobile_number: string;
    country_code: string;
    password: string;
    gender: string;
    program_code?: string;
    school_level?: string;
    school_stream?: string;
}

export const registerStudent = async (formData: RegistrationFormData) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) {
        throw new Error('API_URL is not defined');
    }
    try {
        const payload = {
            full_name: formData.full_name,
            email: formData.email,
            mobile_number: formData.mobile_number,
            country_code: formData.country_code || '+91',
            password: formData.password,
            gender: formData.gender,
            program_code: 'SCHOOL_STUDENT',
            school_level: formData.school_level,
            school_stream: formData.school_stream,
        };

        const response = await fetch(`${API_URL}/student/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle array of messages or single message
            const errorMessage = Array.isArray(data.message)
                ? data.message.join(', ')
                : data.message || 'Registration failed';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        console.error('Registration Error:', error);
        throw error;
    }
};

export const validateStudent = async (data: { email: string; mobile_number: string; country_code: string }) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error('API_URL is not defined');

    try {
        const response = await fetch(`${API_URL}/student/validate-registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            const errorMessage = Array.isArray(result.message)
                ? result.message.join(', ')
                : result.message || 'Validation failed';
            throw new Error(errorMessage);
        }

        return result;
    } catch (error) {
        console.error('Validation Error:', error);
        throw error;
    }
};
