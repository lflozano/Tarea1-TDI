import { Card, Col, Row, Badge, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TrayListPagination from "./TrayListPagination";
import ListGroup from 'react-bootstrap/ListGroup';

function CoursesPage() {
  const [isLoadedCourse, setIsLoadedCourse] = useState(true);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [reviews, setReviews] = useState([]);
  const [avgReviews, setAvgReviews] = useState([]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentCourse = courses.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/courses?_size=${postsPerPage}&_page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.items);
        setIsLoadedCourse(false);
      });
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    if (currentCourse.length > 0) {
      Promise.all(currentCourse.map(course => (
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/courses/${course.id}`)
          .then((response) => response.json())
      ))).then((data) => {
        setCourse(data);
      });
    }
  }, [currentCourse]);

  useEffect(() => {
    if (currentCourse.length > 0) {
      Promise.all(currentCourse.map(course => (
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${course.id}`)
          .then((response) => response.json())
      ))).then((data) => {
        setReviews(data);
      });
    }
  }, [course]);

  useEffect(() => {
    if (reviews.length > 0 && avgReviews.length !== reviews.length) {
      const newAvgReviews = reviews.map((reviewsForCourse) => {
        let sum = 0;
        reviewsForCourse.forEach((review) => {
          sum += review.rating;
        });
        return sum / reviewsForCourse.length;
      });
      setAvgReviews(newAvgReviews);
    }
  }, [reviews]);

  const Course = isLoadedCourse ? (
    <div>Loading...</div>
  ) : (
    course.map((course, index) => (
      <Col key={course.id} xs={6} sm={6} md={3} lg={4}>
        <Card className="course-card" style={{ width: "18rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Img variant="top" src={course.img_url} />
            <h4>Categoría: {course.category}</h4>
            <Card.Text>{course.description}</Card.Text>
            <h2>Ingredientes:</h2>
            <ul>
              {
                course.ingredients.map((ingredient, index) => (
                  <>
                    <li key={index}>{ingredient.name}</li>
                    <Link to={`/ingredients/${ingredient.id}`} state={{ some: ingredient.id }}>Más info...</Link>
                  </>
                ))
              }
            </ul>
            <Badge pill variant="success">
              Precio: ${course.price}
            </Badge>
            <h5>Review del Plato: {avgReviews[index]}</h5>
            <li><Link to={`/courses/${course.id}`} state={{ some: course.id }}>Más info del plato...</Link></li>
          </Card.Body>
        </Card>
      </Col>
    ))
  );

  return (
    <div>
      <h1>Platos</h1>
      <Row>
        {Course}
      </Row>
      <Pagination className="justify-content-center">
        <TrayListPagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={courses.length}
          paginate={paginate}
        />
      </Pagination>
    </div>
  );
}

export default CoursesPage;