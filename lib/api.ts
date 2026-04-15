
export interface RegistrationFormData {
    full_name: string;
    email: string;
    mobile_number: string;
    country_code: string;
    password: string;
    gender: string;
    program_code?: string;
    department_degree_id?: string;
    current_year?: string;
    referral_code?: string;
    payment_amount?: string;
    payment_reference?: string;
    payment_provider?: string;
    turnstile_token?: string;
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
            program_code: 'COLLEGE_STUDENT',
            department_degree_id: formData.department_degree_id,
            current_year: formData.current_year,
            referral_code: formData.referral_code,
            payment_amount: formData.payment_amount,
            payment_reference: formData.payment_reference,
            payment_provider: formData.payment_provider || 'RAZORPAY',
            turnstile_token: formData.turnstile_token,
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

export const validateReferralCode = async (code: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error('API_URL is not defined');

    try {
        const response = await fetch(`${API_URL}/student/affiliate/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        const contentType = response.headers.get("content-type");
        let result;
        if (contentType && contentType.includes("application/json")) {
            result = await response.json();
        } else {
            // Handle non-JSON responses (like 404/500 text)
            const text = await response.text();
            throw new Error(text || 'Invalid URL');
        }

        if (!response.ok) {
            throw new Error(result?.message || 'Invalid URL');
        }

        return result;
    } catch (error) {
        console.error('Referral Validation Error:', error);
        throw error;
    }
};

export const getSchoolStreams = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error('API_URL is not defined');

    try {
        const response = await fetch(`${API_URL}/student/streams`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch school streams');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch School Streams Error:', error);
        return [];
    }
};

export const getDepartments = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) throw new Error('API_URL is not defined');

    try {
        const response = await fetch(`${API_URL}/student/departments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }

        return await response.json();
    } catch (error) {
        console.error('Fetch Departments Error:', error);
        return [];
    }
};
