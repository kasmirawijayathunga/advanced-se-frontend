async function CreateForm(data: Record<string, any>): Promise<FormData> {
    let formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof FileList) {
            // Handle FileList separately, as it's not directly iterable
            for (let i = 0; i < value.length; i++) {
                formData.append(key, value[i]);
            }
        } else if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
            // Handle arrays and nested objects by converting them to JSON strings
            formData.append(key, JSON.stringify(value));
        } else {
            // Handle other types as simple key-value pairs
            formData.append(key, value);
        }
    });
    return formData;
}

export default CreateForm;
