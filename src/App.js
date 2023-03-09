import React, {useEffect,useState} from 'react';
import Recipe from './Recipe';
import "./App.css";

const App = () => {

  const AP_ID="c6d1874a";
  const AP_KEY="71ba8f92a55221c79006096661551c44";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(  () => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      "https://api.edamam.com/search?q="+query+"&app_id="+AP_ID+"&app_key="+AP_KEY
      );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type="text" value={search} onChange={updateSearch} />
        <button  className='search-button' type='submit'>
          Search
        </button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App