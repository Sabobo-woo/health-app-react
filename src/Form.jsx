import { useEffect, useState } from "react"
import Select from "./Select";

export default function Form({ loadLastActivities }) {

    // states of the form
    // 1. empty, nothing filled in or selected
    //    we will display a selection of categories <select>
    // 2. category was selected
    //    we will display a selection of activity types
    //    for the current category!
    // 3. type is selected
    //    we will display a form fit for the current type
    //    - date
    //    - description
    //    - name
    //    - distance, calories
    // 4. form has been submitted
    //    - we display "Loading..." while it is being processed
    //    - we display errors if validation fails
    //    - we reset the form to stage 1 after success

    const [formData, setFormData] = useState(
        {
            category_id: '',
            type_id: '',
            date: ''
        }
    )

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);

    const loadCategories = async () => {
        const response = await fetch('https://test-api.codingbootcamp.cz/api/ac8b8a05/health/categories');
        const data = await response.json();

        setCategories(data);
    }

    const categorySelected = (event) => {
        setFormData({
            ...formData,
            category_id: event.target.value
        })
    }

    const typeSelected = (event) => {
        setFormData({
            ...formData,
            type_id: event.target.value
        })
    }

    const dateSelected = (event) => {
        setFormData({
            ...formData,
            date: event.target.value
        })
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const response = await fetch('https://test-api.codingbootcamp.cz/api/ac8b8a05/health/activities', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        })

        const data = await response.json();

        // tell the App component to (re)load last activities list
        loadLastActivities();

        // clear this form
        setFormData({
            category_id: '',
            type_id: '',
            date: ''
        })
    }

    // load categories when the form is mounted
    useEffect(() => {
        loadCategories();
    }, []);

    // reload the types when the data changes
    useEffect(() => {
        if (formData.category_id) {
            // find the category in categories
            const category = categories.find(category => category.id == formData.category_id);

            // use its types
            setTypes(category.types);

            // select the first type
            setFormData({
                ...formData,
                type_id: category.types[0].id
            })
        } else {
            // if no category is selected, reset types to empty array
            setTypes([]);

            // reset the selected type
            setFormData({
                ...formData,
                type_id: undefined
            })
        }
    }, [formData.category_id])

    return (
        <form className="activity-form" onSubmit={submitForm}>

            <Select
                label="Category"
                name="category_id"
                onChange={categorySelected}
                value={formData.category_id}
                options={categories}
                emptyOption="-- no category chosen --"
            />

            {
                formData.category_id
                    ? (
                        <>
                            <br />
                            <Select
                                label="Activity type"
                                name="type_id"
                                onChange={typeSelected}
                                value={formData.type_id}
                                options={types}
                            />
                        </>
                    )
                    : ''
            }

            {
                formData.category_id && formData.type_id
                    ? (
                        <>
                            <br />
                            <label class="activity-form__label">Date:</label>
                            <input
                                type="date"
                                name="date"
                                onChange={dateSelected}
                                value={formData.date}
                            />
                        </>
                    )
                    : ''
            }

            {
                formData.category_id && formData.type_id && formData.date
                    ? (
                        <>
                            <br />
                            <br />
                            <button className="activity-form__submit">Log activity</button>
                        </>
                    )
                    : ''
            }

        </form>
    )

}