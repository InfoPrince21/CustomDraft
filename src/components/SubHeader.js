import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SubHeader = ({ current, staffDetail, teamDetail }) => {
    return (
        <Row>
            <Col>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    {staffDetail && (
                        <BreadcrumbItem>
                            <Link to='/staff'>Staff</Link>
                        </BreadcrumbItem>
                    )}
                    {teamDetail && (
                        <BreadcrumbItem>
                            <Link to='/teams'>Teams</Link>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem active>{current}</BreadcrumbItem>
                </Breadcrumb>
                <h2>{current}</h2>
                <hr />
            </Col>
        </Row>
    );
};

export default SubHeader;