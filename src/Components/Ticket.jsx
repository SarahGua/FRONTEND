import { Button, Card, Container, Modal } from "react-bootstrap"
import NavBarComp from "./NavBarComponent"
import { useEffect, useState } from "react"

function Ticket(){

    const [numTickets, setNumTickets] = useState(1)

    const [user, setUser] = useState([])

    const [availableTickets, setAvailableTickets] = useState(0)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleIncrement = () => {
        setNumTickets(prevNumTickets => prevNumTickets + 1);
    };

    const handleDecrement = () => {
        if (numTickets > 1) {
            setNumTickets(prevNumTickets => prevNumTickets - 1);
        }
    };

    const getUserProfile = () => {
        const token = localStorage.getItem('token')
        console.log(token)

        fetch(process.env.REACT_APP_BE_URL + `/user/token/${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json()
            } else {
                throw new Error('Errore nel recupero dati')
            }
        })
        .then((data) => {
            console.log(data)
            setUser(data)
            
        })
        .catch((err) => console.log(err, "errore"))
    }

    const getAvailableTickets = () => {
        const token = localStorage.getItem('token');

        fetch(process.env.REACT_APP_BE_URL + '/ticket/availableTickets', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok){
                return res.json();
            } else {
                throw new Error('Errore nel recupero dati');
            }
        })
        .then((data) => {
            console.log(data)
            setAvailableTickets(data);
        })
        .catch((err) => console.log(err, "errore"));
    }

    const bookTickets = () => {
        const token = localStorage.getItem('token');
        console.log('ecco il token:', token)
        const ticketData = {
            clientId: user.id,
            quantity: numTickets
        };
        console.log('ecco i ticketData:', ticketData)

        fetch(process.env.REACT_APP_BE_URL + '/ticket/book', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })
        .then((res) => {
            if (res.ok) {
                console.log(res)
                return res.json();
            } else {
                throw new Error("Errore nella fetch");
            }
        })
        .then((data) => {
            console.log('Biglietti prenotati con successo');
            getAvailableTickets()
            handleShow()
        })
        .catch((error) => {
            console.error('Errore durante la prenotazione dei biglietti:', error);
            console.log(error)
        });
    }

    useEffect(() => {
        getUserProfile()
        getAvailableTickets()
    }, [])


    return (
        <Container>
            <NavBarComp />
                <Card>
                    <Card.Body className="d-flex flex-column align-items-center bg-darkBlue text-white rounded">
                        <Card.Title className="fs-1">Book your tickets!!</Card.Title>
                        <Card.Text className="d-flex flex-colummn align-items-center flex-column">
                            
                                <span>Your tickets will be available at the user desk inside the exhibition.</span>
                                {availableTickets > 1 ? (
                                    <span>Hurry up! Only {availableTickets} tickets are available!</span>
                                ) : (
                                    <span>Oh no! No tickets available... Hope to see you next time!</span>
                                )}
                            
                        </Card.Text>
                        <div>
                            <Button variant="primary" onClick={handleDecrement} className="border border-lightn bg-transparent border-3">-</Button>
                            <span className="mx-2">{numTickets}</span>
                            <Button variant="primary" onClick={handleIncrement} className="border border-lightn bg-transparent border-3">+</Button>
                        </div>
                        <Button variant="primary" className="mt-3 border border-lightn bg-transparent border-3" onClick={bookTickets} disabled={availableTickets === 0}>Book tickets</Button>
                    </Card.Body>
                </Card>

                <Modal show={show} onHide={handleClose} className='bg-darkBlue text-white'>
                    <Modal.Header closeButton className='border border-0 buttonLogIn'>
                    <Modal.Title>Tickets booked</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='border border-0 buttonLogIn'>At your arrival go to the help desks to get your tickets and show this code: {user.id}</Modal.Body>
                    <Modal.Footer className='border border-0 buttonLogIn'>         
                    <Button variant="primary" className='bg-darkBlue border border-0' onClick={handleClose}>
                        Got it
                    </Button>
                </Modal.Footer>
                </Modal>
        </Container>
    )
}

export default Ticket