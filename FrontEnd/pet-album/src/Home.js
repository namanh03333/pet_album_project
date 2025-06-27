import {useEffect,useState} from "react";
import {Container, Row, Col, Button, Card } from "react-bootstrap";
import {useNavigate} from "react-router-dom"
import API from "./api"
function HomePage(){
    const navigate = useNavigate()

    const handleAddPet = () =>{
        navigate("/add-pet")
    }
    const [pets,setPets] = useState([])
    const [loading,setLoading] = useState(true)
    const fetchPet = async() =>{
      try{
          const token = localStorage.getItem("token")
          const response = await API.get("/pet/pet-details",{
            headers:{
                Authorization:`Bearer ${token}`
            }
          })
          const petList = Array.isArray(response.data) ? response.data : response.data.pets || []
          setPets(petList)
      }catch(err){
          console.error("Failed to fetch pets:", err);
      }finally{
          setLoading(false);
      }
    }

    const handleDelete = async (id) =>{
    
      if (!window.confirm("Are you sure you want to delete this pet?")) return;
      try{
          const token = localStorage.getItem("token")
          await API.delete(`/pet/delete/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
          })
          setPets(pets.filter((pet)=>pet.id !== id))
      } catch(err){
          console.error("Delete failed:", err);
      }
    }

    useEffect(()=>{
      fetchPet()
    },[])    
    
    
    return(
      <Container fluid className="bg-light min-vh-100 py-5">
      <Row className="justify-content-center mb-4">
        <Col xs={10} md={8} lg={6}>
          <Card className="shadow text-center border-0">
            <Card.Body>
              <h2 className="mb-3">🐾 Welcome to Pet Album</h2>
              <p className="text-muted">
                Manage and share information about your lovely pets.
              </p>
              <Button variant="primary" size="lg" onClick={handleAddPet}>
                + Add a New Pet
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Future section: show list of pets */}
      <Row className="justify-content-center">
        <Col xs={10} md={8}>
          <Card className="border-0 shadow-sm mt-4 p-3">
            <h4 className="mb-3">Your Pets</h4>
            {loading ? (
              <p className="text-muted">Loading...</p>
            ) : pets.length === 0 ? (
              <p className="text-muted">No pets yet. Click above to add one!</p>
            ) : (
              pets.map((pet) => (
                <Card className="mb-3 shadow-sm" key={pet.id}>
                  <Row className="g-0">
                    <Col md={4}>
                      <img
                        src={pet.pet_image}
                        className="img-fluid rounded-start"
                        alt={pet.pet_name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </Col>
                    
                    <Col md={8}>
                      <Card.Body>
                        <h5 className="card-title">{pet.pet_name}</h5>
                        <p className="card-text">Age: {pet.pet_age}</p>
                        <p className="card-text">Comment: {pet.comment}</p>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>{
                              console.log("Pet to delete:", pet)
                              console.log("Deleting pet with ID:", pet.id)
                              handleDelete(pet.id)
                          }}
                        >
                          🗑 Delete
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </Card>
        </Col>
      </Row>
    </Container>
      
    )
}
export default HomePage