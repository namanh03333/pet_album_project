import React from "react";
import { Container, Card } from "react-bootstrap";

function Dashboard() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className="p-5 shadow-sm text-center" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="mb-4">🐾 Welcome to Pet Album 🐾</h2>
                <p className="lead">
                    Where you can store <strong>good memories</strong> about your lovely pets.<br />
                    Upload photos, share moments, and cherish every tail-wagging memory!
                </p>
            </Card>
        </Container>
    )
}

export default Dashboard