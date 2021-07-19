import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Form from './pizza'
import PizzaCart from './pizza-form'
import * as yup from 'yup'
import Axios from "axios";

let schema = yup.object().shape({
  name: yup.string().required().min(2, 'name must be at least 2 characters'),
  size: yup.string().oneOf(['small','medium','large','lamLg'], 'a size is required'),
  cheese: yup.boolean(),
  pepperoni: yup.boolean(),
  tomato: yup.boolean(),
  pineapple: yup.boolean(),
  
  specInstruct: yup
      .string(),
  
});


const initialFormValues = {
  name: '',
  size: '',
  cheese: false,
  pepperoni: false,
  tomato: false,
  pineapple: false,
  special: '',
}

const initialFormErrors = {
  name: '',
  size: '',
  special: ''
}

const initialPizza = []
const initialDisabled = true;
const fakeAPI = 'https://reques.in/api/users'

const App = () => {

  const [pizzas, setPizzas] = useState(initialPizza);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

const postNewPizza = (newPizza) => {
  Axios.post(fakeAPI, newPizza)
  .then(res => {
    setPizzas([res.data, ...pizzas])
  })
  .catch(err => {
    console.log('Error during POST', err )
  })
  .finally(() => {setFormValues(initialFormValues)})
}

const formSubmit = () => {
  const newPizza = {
    name: formValues.name.trim(),
    size: formValues.size,
    special: formValues.special.trim(),
    toppings: ['cheese', 'pepperoni', 'tomato', 'pineapple'].filter((topping) => formValues[topping]),
  }
  postNewPizza(newPizza)
}

const inputChange = (name, value) => {

  yup
  .reach(schema, name)
  .validate(value)
  .then(() => {
    setFormErrors({
      ...formErrors,
      [name]: '',
    })
  })
  .catch(err => {
    setFormErrors({
      ...formErrors,
      [name]: err.errors[0]
    })
  })
  setFormValues({
    ...formValues,
    [name]: value,
  })
}

useEffect(() => {
  schema.isValid(formValues).then((valid) => {
    setDisabled(!valid);
  })
}, [formValues]);
  return (
    <>
      <>
    <div>
      <div className='nav'>
        <h1>Lambda Eats</h1>
        <Router>
          <ul>
            <li><a href='/'>Home</a></li>
          </ul>
        </Router>
      </div>


      

      <Router path='/pizza/'>
        <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
        />
      
        {pizzas.map((pizzaCart) => (
        <PizzaCart ingredients={pizzaCart} key={pizzaCart.name} />
        ))}
        </Router>

       </div>
    </>
    </>
  );
};
export default App;
