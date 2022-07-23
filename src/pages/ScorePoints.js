import { Container, Col, Row } from 'reactstrap';
import SubHeader from '../components/SubHeader';
import ContactForm from '../components/ContactForm';
import { useEffect } from 'react';


const ScorePoints = () => {

    
    return (
        <Container>
            
            <SubHeader current={"Score Points"}/>
            <Row className='row-content align-items-center'>
                <Col sm='4'>
                    <h5>Enter Scores Here</h5>
                </Col>
                <Col>
    
                </Col>
            </Row>
            <Row className='row-content'>
                <Col xs='12'>
                    {/* <h2>Send Us Your Feedback</h2> */}
                    <hr />
                </Col>
                <Col md='10'>
                    {/* <ContactForm /> */}
                </Col>
            </Row>
        </Container>
    );
};

export default ScorePoints;

