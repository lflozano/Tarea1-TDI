import { useEffect, useState } from "react";
import { Badge, Button, Card, CardGroup, ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function CoursePage() {
    let { state } = useLocation();
    const [course, setCourse] = useState([]);
    const [isLoadedCourse, setIsLoadedCourse] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newAvgReviews, setAvgReviews] = useState([]);

    useEffect(() => {
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/courses/${state.some}`)
          .then((response) => response.json())
          .then((data) => {
            setCourse(data);
            setIsLoadedCourse(false);
          });
    }, []);

    useEffect(() => {
        if (course) {
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
    
    const Course = isLoadedCourse ? (
        <div>Loading...</div>
    ) : (
        <>
            <CardGroup>
                <Card style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <div>
                        <Card.Img variant="top" src={course.img_url} />
                    </div>
                    <div>
                        <h3>Plato: {course.name}</h3>
                        <ul>
                            <li>
                                <b>Categoría: </b> {course.category}
                            </li>
                            <li>
                                <b>Descripción: </b> {course.description}
                            </li>
                            <ListGroup>
                                <ListGroup.Item style={{margin: "1rem"}}>Ingredientes:</ListGroup.Item>
                                {course.ingredients.map((ingredient, index) => (
                                    <>
                                        <ListGroup.Item style={{margin: "1rem"}} key={index}>{ingredient.name}</ListGroup.Item>
                                        <Card.Img style={{padding:"1rem"}} variant="top" src={ingredient.img_url} />
                                        <Link to={`/ingredients/${ingredient.id}`} state={{ some: ingredient.id }}>Más info...</Link>
                                    </>
                                ))}
                            </ListGroup>
                            <Badge pill variant="success">
                                Precio: ${course.price}
                            </Badge>
                            <li>Reviews: {newAvgReviews} </li>
                        </ul>
                    </div>
                </Card>
                <Card class="mb-2 bg-light text-dark" style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <h3>Reviews</h3>
                    <Link to="/reviews" state={{ some: course.id }} style={{textAlign: "center"}}>
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
            {Course}
        </div>
    );
}

export default CoursePage;

