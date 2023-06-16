import { useEffect, useState } from "react";
import { Badge, Button, Card, CardGroup, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

function TrayPage() {
    let { state } = useLocation();
    const [tray, setTray] = useState([]);
    const [isLoadedTray, setIsLoadedTray] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [newAvgReviews, setAvgReviews] = useState([]);

    useEffect(() => {
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/trays/${state.some}`)
          .then((response) => response.json())
          .then((data) => {
            setTray(data);
            setIsLoadedTray(false);
          });
    }, []);

    useEffect(() => {
        if (tray) {
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
    
    const Tray = isLoadedTray ? (
        <div>Loading...</div>
    ) : (
        <>
            <CardGroup>
                <Card style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <div>
                        <Card.Img variant="top" src={tray.img_url} />
                    </div>
                    <div>
                        <h3>Nombre: {tray.name}</h3>
                        <ul>
                            <li>
                                <b>Descripción: </b> {tray.description}
                            </li>

                            <li>
                                <ul>
                                    <h4>Platos:</h4>
                                    {
                                        tray.courses.map((course) => {
                                            return (
                                            <>
                                            <ListGroup style={{padding:"1rem"}}>
                                                <Card.Img variant="top" src={course.img_url} />
                                                <ListGroupItem>Nombre: {course.name}</ListGroupItem>
                                                <ListGroupItem>Categoría: {course.category}</ListGroupItem>
                                                <ListGroupItem><Link to={`/courses/${course.id}`} state={{ some: course.id }}>Más info...</Link></ListGroupItem>
                                            </ListGroup>
                                            </>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                            <Badge pill variant="success">
                                Precio: ${tray.price}
                            </Badge>
                            <li>Review del menú: {newAvgReviews} </li>
                        </ul>
                    </div>
                </Card>
                <Card class="mb-2 bg-light text-dark" style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
                    <h3>Reviews</h3>
                    <Link to="/reviews" state={{ some: tray.id }} style={{textAlign: "center"}}>
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
            {Tray}
        </div>
    );
}

export default TrayPage;

