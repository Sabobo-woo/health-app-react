export default function Select({
    label,
    name,
    onChange,
    value,
    options,
    emptyOption
}) {

    return (

        <>

            <label class="activity-form__label">{label}:</label>
            <select
                name={name}
                onChange={onChange}
                value={value}
            >
                {
                    emptyOption
                        ? <option value="">{emptyOption}</option>
                        : ''
                }
                {
                    options.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))
                }
            </select>

        </>

    )
}