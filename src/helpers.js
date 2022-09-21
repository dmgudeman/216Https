const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

 const  LoadMeals = () => DUMMY_MEALS.map(async (meal)=>{

   let  FBmeal =  {
        
            id: meal.id,
            name: meal.name,
            description: meal.description,
            price: meal.price


        }
    
    const response = await fetch('https://http-cc79c-default-rtdb.firebaseio.com/meals.json',{
    method: 'POST',
    body: JSON.stringify(FBmeal),
    headers: {
        'Content-Type': 'application/json'
    }});
    const data = await response.json();
    console.log(FBmeal.name, data);
} )

export default LoadMeals;