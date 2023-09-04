
import React from 'react'
import { Container, Row, Col } from "react-bootstrap"


const Footer = () => {
  return (
    
    <footer>
        <Container>
           
            <Row>
                <Col className='text-center py-3'>KONTAKTI</Col>
                <Col className='text-center py-3'>DRUŠTVENE MREŽE</Col>
                <Col className='text-center py-3'>DOSTAVA</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>E-MAIL: flora94@gmail.com</Col>
                <Col className='text-center py-3'> <a href="https://www.facebook.com/"> <img src="images/fb.png" alt="facebook" width="50" height="50"/></a></Col>
                <Col className='text-center py-3'><a href="https://www.dpd.com/hr/hr/primanje-paketa/parcel-tracking/"><img src="images/dpd.png" alt="DPD" width="50" height="50"/></a>DPD</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>MOB: 385995157345</Col>
                <Col className='text-center py-3'><a href="https://www.instagram.com"> <img src="images/ig.png" alt="instagram" width="50" height="50"/></a></Col>
                <Col className='text-center py-3'><img src="images/od.png" alt="Osobna dostava na podrucju Splita i okolice" width="50" height="50"/>OSOBNA DOSTAVA</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>TEL: 021347374</Col>
                <Col className='text-center py-3'><a href="https://web.whatsapp.com/"> <img src="images/wp.png" alt="whatsapp" width="50" height="50"/></a></Col>
                <Col className='text-center py-3'><a href="https://wolt.com/hr/hrv"> <img src="images/wolt.png" alt="WOLT" width="50" height="50"/></a>WOLT</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>Flora94 već 30 godina s vama. Obratite nam se s povjerenjem!</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>Copyright &copy; Flora94</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
