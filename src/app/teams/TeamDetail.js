import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';
import { selectAllTeam1, selectAllTeam2, selectAllTeam3 } from './TeamSlice'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TeamDetail = ( {team} ) => {
    // const { id: linkId } = useParams();
    const { image, name, stats, id } = team;
    const team1 = useSelector(selectAllTeam1);
    const team2 = useSelector(selectAllTeam2);
    const team3 = useSelector(selectAllTeam3);
    const listTeam1 = team1.map(player => <li>{player.name}</li>)
    const listTeam2 = team2.map(player => <li>{player.name}</li>)
    const listTeam3 = team3.map(player => <li>{player.name}</li>)
    let teamPlayers

    if (id === 1) {
        teamPlayers = listTeam1
    } else if (id ===2 ) {
        teamPlayers = listTeam2;
    } else if (id ===3 ) {
        teamPlayers = listTeam3;
    }

    return (
        <Col md='5' className='m-1'>
            <Card>
                <CardImg top src={image} alt={name} />
                <CardBody>
                    <CardText>{stats.description}</CardText>
                    <CardText>Team: {id}</CardText>
                    <CardText>Team Members:</CardText>
                    <Link to={`${id}`}>{teamPlayers}</Link>
                </CardBody>
            </Card>
        </Col>
    );
};

export default TeamDetail;