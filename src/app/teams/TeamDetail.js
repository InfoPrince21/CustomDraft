import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';
import { selectTeamById, selectAllTeam1, selectAllTeam2, selectAllTeam3 } from './TeamSlice'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const TeamDetail = () => {
    const { teamId } = useParams();
    // const { teamId} = useParams();
    // const { fields } = team;
    const team = useSelector(selectTeamById(teamId));
    const team1 = useSelector(selectAllTeam1);
    const team2 = useSelector(selectAllTeam2);
    const team3 = useSelector(selectAllTeam3);
    const listTeam1 = team1.map(player => <Link to={`${player.fields.id}}`}><li>{player.fields.name}</li></Link>)
    const listTeam2 = team2.map(player => <Link to={`${player.fields.id}}`}><li>{player.fields.name}</li></Link>)
    const listTeam3 = team3.map(player => <Link to={`${player.fields.id}}`}><li>{player.fields.name}</li></Link>)
    let teamPlayers

    if (team.fields.id === 111) {
        teamPlayers = listTeam1
    } else if (team.fields.id === 222 ) {
        teamPlayers = listTeam2;
    } else if (team.fields.id === 333 ) {
        teamPlayers = listTeam3;
    }
    return (
        <Col md='5' className='m-1'>
            <Card>
                <CardImg top src={team.fields.image[0].url} alt={team.fields.name} />
                <CardBody>
                    <CardText>Name: {team.fields.name} </CardText>
                    <CardText>Team: {team.fields.name} </CardText>
                    <CardText>Team Members:</CardText>
                    {teamPlayers}
                </CardBody>
            </Card>
        </Col>
    );
};

export default TeamDetail;