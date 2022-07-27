import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';
import { selectTeamById, selectAllTeam1, selectAllTeam2, selectAllTeam3 } from './TeamSlice'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { selectStats, selectStatsByName } from '../../features/stats/statsSlice';

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
    let teamName

    const getStats = useSelector(selectStats);
    const teamStats = getStats.filter(stat => stat.fields.teamId === teamId)

    const attendanceStats = teamStats.map(stat => stat.fields.attendance)
    const attendanceTotals = attendanceStats.reduce((partialSum, a) => partialSum + a, 0)

    const knowledgeStats= teamStats.map(stat => stat.fields.knowledge)
    const knowledgeTotals = knowledgeStats.reduce((partialSum, a) => partialSum + a, 0)

    const teamworkStats= teamStats.map(stat => stat.fields.teamwork)
    const teamworkTotals = teamworkStats.reduce((partialSum, a) => partialSum + a, 0)

    const toolsStats= teamStats.map(stat => stat.fields.tools)
    const toolsTotals = toolsStats.reduce((partialSum, a) => partialSum + a, 0)

    const salesStats= teamStats.map(stat => stat.fields.sales)
    const salesTotals = salesStats.reduce((partialSum, a) => partialSum + a, 0)

    const totalScore = () => {
        const totals = parseInt(attendanceTotals) + parseInt(knowledgeTotals) + parseInt(teamworkTotals)+ parseInt(toolsTotals) + parseInt(salesTotals)
        return totals
    }


    if (team.fields.id === 111) {
        teamPlayers = listTeam1
    } else if (team.fields.id === 222 ) {
        teamPlayers = listTeam2;
    } else if (team.fields.id === 333 ) {
        teamPlayers = listTeam3;
    }
    return (
        <>
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
        <Col>
        <h3>Total Score: {totalScore()}</h3>
        <p>Attendance Score: {attendanceTotals} </p>
        <p>Knowledge Score: {knowledgeTotals} </p>
        <p>Teamwork Score: {teamworkTotals} </p>
        <p>Tools Score: {toolsTotals} </p>
        <p>Sales Score: {salesTotals} </p>
        </Col>
        </>
    );
};

export default TeamDetail;