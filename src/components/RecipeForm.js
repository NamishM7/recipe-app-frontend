import React, {useState} from 'react';
import axios from '../axios';
const RecipeForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        ingredients: '',
        steps: '',
        cookingTime: '',
        images: null,
        dietaryRestrictions: ''
    });
    const handleInputChange = (e)=>{
        setFormData({
            ...formData,
            images: e.target.files
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formDataToSend = new FormData();
        for(const key in formData){
            if(key === 'images'){
                Array.from(formData[key]).forEach(file => formDataToSend.append(key, file));
            } else{
                formDataToSend.append(key, formData[key]);
            }
        }
        try{
            const response = await axios.post('/recipes', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Recipe added successfully!');
        }catch(err){
            console.error(err);
            alert('Error adding recipe.');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type='text' name='title' onChange={handleInputChange} required />
            </div>
            <div>
                <label>Ingredients (comma-separated)</label>
                <input type='text' name='ingredients' onChange={handleInputChange} required />
            </div>
            <div>
                <label>Steps</label>
                <textarea  name='steps' onChange={handleInputChange} required></textarea>
            </div>
            <div>
                <label>Cooking Time (in minutes)</label>
                <input type='number' name='cookingTime' onChange={handleInputChange} required />
            </div>
            <div>
                <label>dietary Restrictions</label>
                <input type='text' name='dietaryRestrictions' onChange={handleInputChange}  />
            </div>
            <div>
                <label>Images</label>
                <input type='file' name='images' onChange={handleFileChange} multiple />
            </div>
            <button type='submit'>Submit Recipe</button>
        </form>
    );
};

export default RecipeForm;