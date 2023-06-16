import { useEffect, useState } from "react";
import { Badge, Button, Card, CardGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function IngredientPage() {
    let { state } = useLocation();
    const [ingredient, setIngredient] = useState([]);
    const [isLoadedIngredient, setIsLoadedIngredient] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newAvgReviews, setAvgReviews] = useState([]);

    useEffect(() => {
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients/${state.some}`)
          .then((response) => response.json())
          .then((data) => {
            setIngredient(data);
            setIsLoadedIngredient(false);
          });
    }, []);

    useEffect(() => {
        if (ingredient) {
            fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${state.some}`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data);
            });
        }
      }, []);

    useEffect(() => {
        if (reviews.length > 0) {
          const newAvgReviews = () => {
            let sum = 0;
            reviews.forEach((review) => {
              sum += review.rating;
            });
            return sum / reviews.length;
            };
          setAvgReviews(newAvgReviews);
        }
      }, [reviews]);
    
    const Ingredient = isLoadedIngredient ? (
        <div>Loading...</div>
    ) : (
        <>
            <CardGroup>
                <Card style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <div>
                        <Card.Img variant="top" src={ingredient.img_url} />
                    </div>
                    <div>
                        <h3>Nombre: {ingredient.name}</h3>
                        <ul>
                            <li>
                                <b>Descripción: </b> {ingredient.description}
                            </li>
                            <Badge pill variant="success">
                                Precio: ${ingredient.price}
                            </Badge>
                            <li>Reviews: {newAvgReviews} </li>
                        </ul>
                    </div>
                </Card>
                <Card class="mb-2 bg-light text-dark" style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <h3>Reviews</h3>
                    <Link to="/reviews" state={{ some: ingredient.id }} style={{textAlign: "center"}}>
                        <Button variant="light">Publicar Review</Button>{' '}
                    </Link>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <ul style={{ marginBottom:"1rem" }}>
                                    Usuario: {review.username}
                                    <li>
                                        <b>Rating: </b> {review.rating}
                                    </li>
                                    <li>
                                        <b>Comentario: </b> {review.content}
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </Card>
            </CardGroup>
        </>
    );
    return (
        <div className="tray-card">
            {Ingredient}
        </div>
    );
}

export default IngredientPage;

