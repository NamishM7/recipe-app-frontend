import React, { useState, useEffect } from 'react';
import axios from '../axios';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filters, setFilters] = useState({
        ingredients: '',
        dietaryRestrictions: '',
        maxCookingTime: '',
    });
    const fetchRecipes = async () => {
        try {
            const query = Object.entries(filters)
                .filter(([_, value]) => value)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            const response = await axios.get(`/recipes/search?${query}`);
            setRecipes(response.data);

        } catch (err) {
            console.error(err);

        }
    }
    useEffect(() => {
        fetchRecipes();
    }, [filters]);

    const handleInputChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div>
            <h2>Discover Recipes</h2>
            <div>
                <input type='text' name='ingredients' placeholder='Ingredients' onChange={handleInputChange} />
                <input type='text' name='dietaryRestrictions' placeholder='Dietary Restrictions' onChange={handleInputChange} />
                <input type='number' name='maxCookingTime' placeholder='Max Cooking Time' onChange={handleInputChange} />
                <button onClick={fetchRecipes}>Search</button>
            </div>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe._id}>
                        <h3>{recipe.title}</h3>
                        <p>{recipe.ingredients.join(', ')}</p>
                        <p>Cooking </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default RecipeList;


