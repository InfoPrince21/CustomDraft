import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';

const StaffDetail = ( {staff} ) => {
    const { fields } = staff;

    return (
        <Col md='5' className='m-1'>
            <Card>
                <CardImg top src={fields.image[0].url} alt={fields.name} />
                <CardBody>
                    <CardText>
                    <ul>
                        <li>{fields.quote}</li>
                    </ul>
                    </CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default StaffDetail;