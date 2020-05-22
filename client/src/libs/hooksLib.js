import { useState } from 'react'

export const useFormFields = initialState => {
    const [values, setValues] = useState(initialState);
    return [
        values,
        function (e) {
            setValues({ ...values, [e.target.name]: e.target.value })
        }
    ]
}
