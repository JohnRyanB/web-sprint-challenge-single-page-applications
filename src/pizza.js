import React from "react"

export default function Form(props) {

    const { values, disabled, change, submit, errors} = props
    const onChange = (evt) => {
        const {name, value, type, checked} = evt.target;
        const valueToUse = type === 'checkbox' ? checked: value;
        change(name, valueToUse);
    }

    const onSubmit = (evt) => {
        evt.preventDefault()
        submit()
    }

    return (
        <div>

            <form onSubmit={onSubmit}>
                <h2> Lambda Eats Build your PIE</h2>
                <div>{errors.name}</div>
                <label> Name:
                    <input id= 'name-input'
                    name='name'
                    type='text'
                    value={values.name}
                    onChange={onChange} />
                </label>

                <div>{errors.size}</div>
                <label>Pick your Hunger
                <select id='size-dropdown' name='size'
                value={values.size}
                onChange={onChange}>
                    <option value=''>Choose a Size</option>
                    <option value='small'>Small</option>
                    <option value='medium'>Medium</option>
                    <option value='large'>Large</option>
                    <option value='lamLg'>Lambda Large</option>
                </select>
                </label>

                <div>
                    <h3>Pick your Toppings!</h3>
                    <label>
                        <input name='cheese'
                        type='checkbox'
                        checked={values.cheese}
                        onChange={onChange}
                        />cheese
                    </label>
                    <label>
                    <input name='pepperoni'
                    type='checkbox'
                    checked={values.pepperoni}
                    onChange={onChange}
                    />Pepperoni
                    </label>
                    <label>
                    <input name='tomato'
                    type='checkbox'
                    checked={values.tomato}
                    onChange={onChange}
                    />Tomato
                    </label>
                    <label>
                    <input name='pineapple'
                    type='checkbox'
                    checked={values.pineapple}
                    onChange={onChange}
                    />Pineapple
                    </label>
                </div>

                <label>Special Instructions!
                    <input
                    id='special-text'
                    name='special'
                    type='text'
                    values={values.special}
                    onChange={onChange}
                    />
                </label>
                <button id='order-pizza' name='submit' disabled={disabled}>Place Order</button>
            </form>
        </div>
    )
}