import { useState } from "react";
import { Card, CardGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function PostReviewsPage () {
  let { state } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const handleSubmit = (event) => {
    console.log("A name was submitted: " + " " + email + " " + " " + password + " " + " " + rating + " "  + " " + content + " " + state.some + " ");
    event.preventDefault();
    fetch(`https://tarea-1.2023-1.tallerdeintegracion.cl/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        entity_id: state.some,
        email: email,
        password: password,
        content: content,
        rating: rating,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            alert("Error: " + data.detail);
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Review publicada!");
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsLoaded(false);
      })
      .catch((error) => {
        console.log(error);
      });      
  }

  return (
    <CardGroup>
      <Card.Title>Publica tu review!</Card.Title>
      <Card style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
        <form onSubmit={handleSubmit}>
          <label style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
            Email:
            <input type="text" value={email} placeholder="email"  onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
            Password:
            <input type="text" value={password} placeholder="password"  onChange={(e) => setPassword(e.target.value)} />
          </label>
          <label style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
            Rating:
            <input type="number" pattern="[0-5]*" value={rating} placeholder="rating"  onChange={(e) => setRating((v) => (e.target.validity.valid ? e.target.value : v))} />
          </label>
          <label style={{ width: "40rem", margin: "2rem", padding:"2rem" }}>
            Content:
            <input type="text" value={content}  onChange={(e) => setContent(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </Card>
    </CardGroup>
  );
}

export default PostReviewsPage;
