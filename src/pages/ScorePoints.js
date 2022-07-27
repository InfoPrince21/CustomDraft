import { Container, Col, Row } from 'reactstrap';
import SubHeader from '../components/SubHeader';
import ContactForm from '../components/ContactForm';
import { useEffect } from 'react';


const ScorePoints = () => {

    
    return (
        <Container>
            <SubHeader current={"Score Points"}/>
            <Row className='row-content align-items-center'>

                <Col sm='6'>
                <iframe src="https://airtable.com/embed/shrBKhKMVK7fIMXJV?backgroundColor=red" width="100%" height="1900" frameborder="0"></iframe>
                </Col>
                <Col>
    
                </Col>
            </Row>
            <Row className='row-content'>

            </Row>
        </Container>
    );
};

export default ScorePoints;

