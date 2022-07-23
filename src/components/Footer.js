import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='site-footer'>
            <Container>
                <Row>
                    <Col sm='12' className='text-center'>
                        <i className='fa fa-copyright' /> Copyright 2022
                    </Col>
                </Row>
                <Row>
                    <Col sm='12' className='text-center'>
                        Prince B. Coding
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;