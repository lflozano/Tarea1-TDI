import { Card, Col, Row, Badge, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TrayListPagination from "./TrayListPagination";
import ListGroup from 'react-bootstrap/ListGroup';

function TraysPage() {
  const [isLoadedTray, setIsLoadedTray] = useState(true);
  const [trays, setTrays] = useState([]);
  const [tray, setTray] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [avgReviews, setAvgReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTray = trays.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/trays?_size=${postsPerPage}&_page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setTrays(data.items);
        setIsLoadedTray(false);
      });
  }, [currentPage, postsPerPage]);

  useEffect(() => {
    if (currentTray.length > 0) {
      Promise.all(currentTray.map(tray => (
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/trays/${tray.id}`)
          .then((response) => response.json())
      ))).then((data) => {
        setTray(data);
      });
    }
  }, [currentTray]);
  
  useEffect(() => {
    if (currentTray.length > 0) {
      Promise.all(currentTray.map(tray => (
        fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews/${tray.id}`)
          .then((response) => response.json())
      ))).then((data) => {
        setReviews(data);
      });
    }
  }, [tray]);  

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
  

  const Tray = isLoadedTray ? (
    <div>Loading...</div>
  ) : (
    tray.map((tray, index) => (
      <Col key={tray.id} xs={6} sm={6} md={3} lg={4}>
        <Card className="tray-card" style={{ width: "18rem", margin: "1rem" }}>
          <Card.Body>
            <Card.Title>{tray.name}</Card.Title>
            <Card.Text>{tray.description}</Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Platos:</ListGroup.Item>
              {
                tray.courses.map((course, index) => (
                  <ul>
                    <li key={index}>{course.name}</li>
                    <Link to={`/courses/${course.id}`} state={{ some: course.id }}>Más info...</Link>
                  </ul>
                ))
              }
            </ListGroup>
            <Badge pill variant="success">
              Precio: ${tray.price}
            </Badge>
            <h5>Review del Menú: {avgReviews[index]}</h5>
            <li><Link to={`/trays/${tray.id}`} state={{ some: tray.id }}>Más info del menú...</Link></li>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))
  );

  return (
    <div>
      <h1>Menús</h1>
      <Row>
        {Tray}
      </Row>
      <Pagination className="justify-content-center">
        <TrayListPagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={trays.length}
          paginate={paginate}
        />
      </Pagination>
    </div>
  );
}

export default TraysPage;