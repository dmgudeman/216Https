import { useState, useCallback, useEffect } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';



function App() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchMealsHandler = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://movies-9c5b1-default-rtdb.firebaseio.com/meals.json');
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const data = await response.json();
        const loadedMeals = [];
        for(const key in data) {
          loadedMeals.push({
              id: key,
              name: data[key].title,
              description: data[key].desciptionText,
              price: data[key].price
  
  
          })
        }
  
       
        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }, []);
  
    useEffect(() => {
      fetchMealsHandler();
    }, [fetchMealsHandler]);
  
    async function addMealHandler(meal) {
      const response = await fetch('https://movies-9c5b1-default-rtdb.firebaseio.com/meals.json',{
      method: 'POST',
      body: JSON.stringify(meal),
      headers: {
          'Content-Type': 'application/json'
      }});
      const data = await response.json();
      console.log(data);
    }
  
    let content = <p>Found no movies.</p>;
  
    if (meals.length > 0) {
      content = <MealsList meals={meals} />;
    }
  
    if (error) {
      content = <p>{error}</p>;
    }
  
    if (isLoading) {
      content = <p>Loading...</p>;
    }



  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
