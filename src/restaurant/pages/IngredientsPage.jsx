import { Card, Col, Row, Badge, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import TrayListPagination from "./TrayListPagination";
import { Link } from "react-router-dom";

function IngredientsPage() {
  const [isLoadedIngredients, setIsLoadedIngredients] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [avgReviews, setAvgReviews] = useState([]);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentIngredients = ingredients.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/ingredients?_size=${postsPerPage}&_page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setIngredients(data.items);
        setIsLoadedIngredients(false);
      });
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    if (currentIngredients.length > 0) {
      Promise.all(ingredients.map(ingredient => (
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${ingredient.id}`)
          .then((response) => response.json())
      ))).then((data) => {
        setReviews(data);
      });
    }
  }, [ingredients]);

  useEffect(() => {
    if (reviews.length > 0 && avgReviews.length !== reviews.length) {
      const newAvgReviews = reviews.map((reviewsForTray) => {
        let sum = 0;
        reviewsForTray.forEach((review) => {
          sum += review.rating;
        });
        return sum / reviewsForTray.length;
      });
      setAvgReviews(newAvgReviews);
    }
  }, [reviews]);

  const Ingredient = isLoadedIngredients ? (
    <div>Loading...</div>
  ) : (
    ingredients.map((ingredient, index) => (
      <Col key={ingredient.id} xs={6} sm={6} md={3} lg={4}>
        <Card className="Ingredient-card" style={{ width: "18rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>{ingredient.name}</Card.Title>
            <Card.Img variant="top" src={ingredient.img_url} />
            <Badge pill variant="success">
              Precio: ${ingredient.price}
            </Badge>
            <h5>Review del Ingrediente: {avgReviews[index]}</h5>
            <Link to={`/ingredients/${ingredient.id}`} state={{ some: ingredient.id }}>Más info...</Link>
          </Card.Body>
        </Card>
      </Col>
    ))
  );

  return (
    <div>
      <h1>Ingredients</h1>
      <Row>
        {Ingredient}
      </Row>
      <Pagination className="justify-content-center">
        <TrayListPagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={ingredients.length}
          paginate={paginate}
        />
      </Pagination>
    </div>
  );
}

export default IngredientsPage;