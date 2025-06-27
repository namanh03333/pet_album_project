import React,{useEffect, useState} from "react";
import { Form,Button,Container,Card,Alert,Row,Col } from "react-bootstrap";
import { getToken,getCurrentUser } from "./Auth";
import API from "./api";

function Addpet(){
    const [formData,setFormData] = useState({
      pet_name: "",
      pet_age:"",
      pet_image:"",
      comment:"",
      user_id:"",
      pet_type_id:""
    })
    const [petTypes, setPetTypes] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange =(e) =>{
      const{name,value} = e.target
      setFormData((prev)=>({...prev,[name]:value}))
    }
   useEffect(() => {
    API.get("pet/pet-types")
        .then((res) => {
        console.log("Pet types response:", res.data);
        const petTypes = res.data?.pettypes;

        if (Array.isArray(petTypes)) {
            setPetTypes(petTypes);
        } else {
            console.error("pettypes is not an array:", petTypes);
            setPetTypes([]); 
        }
        })
        .catch((err) => {
        console.error("Failed to load pet types:", err);
        });
    }, []);

   
   

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const user = getCurrentUser()
        if(!user){
          setErrorMsg("You must be logged in to add a pet.")
          return
        }
      
        try{
          const data = {
            ...formData,
            user_id:user.id,
            pet_age:parseInt(formData.pet_age)
          }
          const response = await API.post("/pet/add-pet",data,{
            headers:{
              Authorization:`Bearer ${getToken()}`
            }
          })
         
          if (response.status === 201) {
                    setSuccessMsg("Pet added successfully!");
                    setFormData({
                        pet_name: "",
                        pet_age: "",
                        pet_image: "",
                        comment: "",
                        pet_type_id: "",
                      });
                    }

    }catch(err){
      setErrorMsg("Failed to add pet.")
    }

    console.log("Token:", localStorage.getItem("token"));
  }
  
  return(
     <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className="mb-4 text-center">Add New Pet 🐾</h3>
                            {successMsg && <Alert variant="success">{successMsg}</Alert>}
                            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pet Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="pet_name"
                                        value={formData.pet_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Pet Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="pet_age"
                                        value={formData.pet_age}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Pet Image URL</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="pet_image"
                                        value={formData.pet_image}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="comment"
                                        value={formData.comment}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Pet Type</Form.Label>
                                    <Form.Select
                                        name="pet_type_id"
                                        value={formData.pet_type_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Select --</option>
                                        {Array.isArray(petTypes)&&petTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {type.type_name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Button type="submit" variant="primary" size="lg" className="w-100">
                                    Add Pet
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
    
  

export default Addpet;