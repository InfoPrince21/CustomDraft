import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';

const StaffDetail = ( {staff} ) => {
    const { image, name, stats } = staff;

    return (
        <Col md='5' className='m-1'>
            <Card>
                <CardImg top src={image} alt={name} />
                <CardBody>
                    <CardText>
                    <ul>
                        <li>Attendance: {stats.attendance}</li>
                        <li>Knowledge: {stats.knowledge}</li>
                        <li>Teamwork: {stats.teamwork}</li>
                    </ul>
                    </CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default StaffDetail;