'use client'
export const postFormData = async () => {
    const form = new FormData();
    form.append('data', 'e');
    const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: form
        ,
    });

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Attempt to parse the response as JSON
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to parse JSON:', error);
        // Handle the error appropriately, e.g., return a default value or rethrow the error

    }
};
