import React , {useState} from 'react'
import {Button, Container, Col, Row} from 'react-bootstrap'
import AddContactsForm from './AddContactsForm'
import ContatsList from './ContactsList'


function Contacts() {

    const [show, setShow] = useState("none")
    const [render,Rerender] = useState(false)
    return (
        <div>
            
        <Container fluid> 
            <Row> 
                <Col>
                    <h2 className="float-left">Contacts</h2>
                    <Button variant="success" className="float-right" onClick={() => {if(show === "none") setShow("flex"); else setShow("none");}} > {show === "none" ? "New Contact" : "Close"  }</Button> 
                </Col>
            </Row>
            <Row style={{display : show }}> 
                <Col>
                <AddContactsForm Rerender={Rerender} />
                </Col>
            </Row>
            <Row> 
                <Col>
                <ContatsList render={render} Rerender={Rerender}/>
                </Col>
            </Row>
            
            </Container>
        </div>
    )
}

export default Contacts
