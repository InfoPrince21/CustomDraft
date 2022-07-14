import { Button, Card, CardImg, CardImgOverlay, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteTeams } from './TeamSlice';
import { useDispatch } from 'react-redux';

const TeamCard = ({team}, {teamPlayers}) => {   
    const { id, image, name } = team;
    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(deleteTeams(id));
    };

    return (
        <>
        <Link to={`${id}`}>    
            <Card>
                <CardImg 
                    width='100%'
                    src={image}
                    alt={name}
                />
                <CardImgOverlay>
                    <CardTitle>{name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </Link>
        <Row>
            <Col style={{
                display: "flex",
                gap:"4px"
            }}>
                {/* <Button onClick={handleSubmit} color="primary" size ="sm">Delete</Button>
                <Button color="primary" size ="sm">Button1</Button>
                <Button color="primary" size ="sm">Button2</Button>
                <Button color="primary" size ="sm">Button3</Button> */}
            </Col>
        </Row>
        </>
    );
}

export default TeamCard;