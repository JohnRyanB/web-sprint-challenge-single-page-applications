import React from 'react'

export default function Order (props) {
    const {ingredients} = props
    return(
        <div>
            <h3>Name: {ingredients.name}</h3>
            <p>Size: {ingredients.size}</p>
            <div>
                <h3>Toppings:</h3>
                <p>Cheese: {ingredients.cheese ? 'yes':'no'}</p>
                <p>Pepperoni: {ingredients.pepp ? 'yes': 'no'}</p>
                <p>Tomatoes: {ingredients.tomatoes ? 'yes': 'no'}</p>
                <p>Pineapple: {ingredients.pineapple ? 'yes': 'no'}</p>
                <h3>Special Instructions</h3>
                {ingredients.special === '' ? '': ingredients.special}
            </div>
        </div>
    )
}
