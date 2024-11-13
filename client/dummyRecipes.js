
const recipeData = [
    {
        "id": 1,
        "name": "Classic Pancakes",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 5,
        "longDescription": "Fluffy, delicious pancakes perfect for breakfast with syrup or fruit toppings.",
        "mealType": "breakfast",
        "mealCountry": "United States",
        "ingredients": [
            { "quantity": "1 cup", "ingredient": "flour" },
            { "quantity": "1 cup", "ingredient": "milk" },
            { "quantity": "1", "ingredient": "egg" },
            { "quantity": "1 tbsp", "ingredient": "sugar" },
            { "quantity": "1 tsp", "ingredient": "baking powder" },
            { "quantity": "1 pinch", "ingredient": "salt" }
        ],
        "diets": ["vegetarian"],
        "preparationSteps": [
            "In a bowl, mix flour, sugar, baking powder, and salt.",
            "Add milk and egg, whisk until smooth.",
            "Pour batter onto a hot griddle and cook until golden brown on both sides."
        ]
    },
    {
        "id": 2,
        "name": "Spaghetti Carbonara",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 4,
        "longDescription": "Classic Italian pasta with a creamy egg and cheese sauce, with crispy pancetta.",
        "mealType": "dinner",
        "mealCountry": "Italy",
        "ingredients": [
            { "quantity": "200g", "ingredient": "spaghetti" },
            { "quantity": "100g", "ingredient": "pancetta" },
            { "quantity": "2", "ingredient": "eggs" },
            { "quantity": "1/2 cup", "ingredient": "grated Parmesan cheese" },
            { "quantity": "1 clove", "ingredient": "garlic" },
            { "quantity": "1 pinch", "ingredient": "black pepper" }
        ],
        "diets": ["Gluten-Free"],
        "preparationSteps": [
            "Cook spaghetti according to package instructions.",
            "In a pan, sauté pancetta and garlic until crispy.",
            "Whisk eggs and Parmesan in a bowl.",
            "Combine pasta with pancetta and pour egg mixture, stirring quickly to avoid scrambling."
        ]
    },
    {
        "id": 3,
        "name": "Avocado Toast",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 4,
        "longDescription": "A simple and healthy toast topped with fresh avocado, perfect for a quick breakfast or snack.",
        "mealType": "snack",
        "mealCountry": "Mexico",
        "ingredients": [
            { "quantity": "1", "ingredient": "ripe avocado" },
            { "quantity": "2 slices", "ingredient": "whole-grain bread" },
            { "quantity": "1 pinch", "ingredient": "salt" },
            { "quantity": "1 pinch", "ingredient": "black pepper" },
            { "quantity": "1 tsp", "ingredient": "lemon juice" }
        ],
        "diets": ["vegan", "vegetarian", "gluten-free"],
        "preparationSteps": [
            "Toast the bread slices.",
            "Mash the avocado with lemon juice, salt, and pepper.",
            "Spread the mashed avocado on toasted bread and serve."
        ]
    },
    {
        "id": 4,
        "name": "Chicken Caesar Salad",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 5,
        "longDescription": "A light and tasty Caesar salad with grilled chicken, romaine lettuce, and a creamy dressing.",
        "mealType": "lunch",
        "mealCountry": "Italy",
        "ingredients": [
            { "quantity": "1", "ingredient": "chicken breast" },
            { "quantity": "1 head", "ingredient": "romaine lettuce" },
            { "quantity": "1/4 cup", "ingredient": "Parmesan cheese" },
            { "quantity": "1/4 cup", "ingredient": "Caesar dressing" },
            { "quantity": "1/2 cup", "ingredient": "croutons" }
        ],
        "diets": ["gluten-free", "Dairy-Free Option"],
        "preparationSteps": [
            "Grill the chicken breast and slice.",
            "Chop romaine lettuce and place in a bowl.",
            "Add Parmesan, croutons, and dressing, then top with sliced chicken."
        ]
    },
    {
        "id": 5,
        "name": "Churros with Chocolate Sauce",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 4,
        "longDescription": "Traditional Mexican churros dusted with cinnamon sugar, served with a warm chocolate sauce.",
        "mealType": "dessert",
        "mealCountry": "Mexico",
        "ingredients": [
            { "quantity": "1 cup", "ingredient": "flour" },
            { "quantity": "1 cup", "ingredient": "water" },
            { "quantity": "2 tbsp", "ingredient": "sugar" },
            { "quantity": "1/4 tsp", "ingredient": "salt" },
            { "quantity": "1/2 cup", "ingredient": "sugar (for coating)" },
            { "quantity": "1 tsp", "ingredient": "cinnamon" },
            { "quantity": "1/2 cup", "ingredient": "chocolate sauce" }
        ],
        "diets": ["vegetarian"],
        "preparationSteps": [
            "Mix flour, water, sugar, and salt into a dough.",
            "Pipe dough into hot oil and fry until golden.",
            "Roll churros in cinnamon sugar and serve with chocolate sauce."
        ]
    },
    {
        "id": 6,
        "name": "Matcha Latte",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 5,
        "longDescription": "A creamy, energizing matcha latte made with Japanese green tea powder.",
        "mealType": "coffee",
        "mealCountry": "Japan",
        "ingredients": [
            { "quantity": "1 tsp", "ingredient": "matcha powder" },
            { "quantity": "1 cup", "ingredient": "milk (dairy or plant-based)" },
            { "quantity": "1 tbsp", "ingredient": "hot water" }
        ],
        "diets": ["vegetarian", "vegan Option"],
        "preparationSteps": [
            "Whisk matcha powder with hot water until smooth.",
            "Heat milk and froth it, then pour over matcha.",
            "Sweeten to taste and enjoy."
        ]
    },
    {
        "id": 7,
        "name": "Greek Salad",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 3,
        "longDescription": "A light and fresh salad with cucumbers, tomatoes, feta cheese, olives, and a tangy dressing.",
        "mealType": "lunch",
        "mealCountry": "Greece",
        "ingredients": [
            { "quantity": "1 cup", "ingredient": "cucumber (diced)" },
            { "quantity": "1 cup", "ingredient": "tomato (chopped)" },
            { "quantity": "1/4 cup", "ingredient": "feta cheese" },
            { "quantity": "1/4 cup", "ingredient": "olives" },
            { "quantity": "2 tbsp", "ingredient": "olive oil" },
            { "quantity": "1 tbsp", "ingredient": "red wine vinegar" }
        ],
        "diets": ["vegetarian", "Gluten-Free"],
        "preparationSteps": [
            "Combine cucumber, tomatoes, feta, and olives in a bowl.",
            "Whisk olive oil and vinegar, and pour over the salad.",
            "Toss gently to mix and serve fresh."
        ]
    },
    {
        "id": 8,
        "name": "Miso Soup",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 4,
        "longDescription": "A simple, comforting Japanese soup made with miso paste, tofu, and seaweed.",
        "mealType": "dinner",
        "mealCountry": "Japan",
        "ingredients": [
            { "quantity": "1 tbsp", "ingredient": "miso paste" },
            { "quantity": "2 cups", "ingredient": "water" },
            { "quantity": "1/2 cup", "ingredient": "tofu (cubed)" },
            { "quantity": "1 tsp", "ingredient": "seaweed" },
            { "quantity": "1 tbsp", "ingredient": "green onions (sliced)" }
        ],
        "diets": ["vegan", "vegetarian", "Gluten-Free"],
        "preparationSteps": [
            "Heat water and dissolve miso paste in it.",
            "Add tofu and seaweed, simmering for a few minutes.",
            "Top with green onions and serve hot."
        ]
    },
    {
        "id": 9,
        "name": "Tacos al Pastor",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 5,
        "longDescription": "Marinated pork tacos with a hint of pineapple, served on soft corn tortillas.",
        "mealType": "dinner",
        "mealCountry": "Mexico",
        "ingredients": [
            { "quantity": "500g", "ingredient": "pork shoulder (sliced)" },
            { "quantity": "1 cup", "ingredient": "pineapple (diced)" },
            { "quantity": "1/2 cup", "ingredient": "onion (chopped)" },
            { "quantity": "1 tsp", "ingredient": "cumin" },
            { "quantity": "1 tsp", "ingredient": "paprika" },
            { "quantity": "1 tbsp", "ingredient": "vinegar" }
        ],
        "diets": ["Gluten-Free", "Dairy-Free"],
        "preparationSteps": [
            "Marinate pork with pineapple, onion, cumin, paprika, and vinegar.",
            "Cook on a hot grill until caramelized.",
            "Serve on corn tortillas with cilantro and lime."
        ]
    },
    {
        "id": 10,
        "name": "Margarita Cocktail",
        "picUrl": "https://worthybornedit.com/wp-content/uploads/2022/11/IMG_5652-821x1024.jpg",
        "rating": 4,
        "longDescription": "A refreshing cocktail with tequila, lime juice, and a salted rim.",
        "mealType": "cocktail",
        "mealCountry": "Mexico",
        "ingredients": [
            { "quantity": "1.5 oz", "ingredient": "tequila" },
            { "quantity": "1 oz", "ingredient": "lime juice" },
            { "quantity": "1 oz", "ingredient": "triple sec" },
            { "quantity": "Salt", "ingredient": "for rimming" }
        ],
        "diets": ["Gluten-Free", "Dairy-Free"],
        "preparationSteps": [
            "Rim the glass with salt.",
            "Shake tequila, lime juice, and triple sec with ice.",
            "Strain into the glass and serve."
        ]
    }
]

export default recipeData;