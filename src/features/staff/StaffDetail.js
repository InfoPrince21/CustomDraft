import { Card, CardImg, CardText, CardBody, Col, Row } from 'reactstrap';
import StatsCard from '../stats/StatsCard';
import { selectStats, selectStatsByName } from '../stats/statsSlice';
import { useSelector} from 'react-redux';
import AddStatsForm from '../../components/AddStatsForm';


const StaffDetail = ( {staff} ) => {

    const { fields } = staff;
    const getStats = useSelector(selectStats);
    const staffStats = getStats.filter(stat => stat.fields.name === fields.name)
    const playerStats = useSelector(selectStatsByName(fields.name));

    const attendanceStats = playerStats.map(stat => stat.fields.attendance)
    const attendanceTotals = attendanceStats.reduce((partialSum, a) => partialSum + a, 0)

    const knowledgeStats= playerStats.map(stat => stat.fields.knowledge)
    const knowledgeTotals = knowledgeStats.reduce((partialSum, a) => partialSum + a, 0)

    const teamworkStats= playerStats.map(stat => stat.fields.teamwork)
    const teamworkTotals = teamworkStats.reduce((partialSum, a) => partialSum + a, 0)

    const toolsStats= playerStats.map(stat => stat.fields.tools)
    const toolsTotals = toolsStats.reduce((partialSum, a) => partialSum + a, 0)

    const salesStats= playerStats.map(stat => stat.fields.sales)
    const salesTotals = salesStats.reduce((partialSum, a) => partialSum + a, 0)

    const totalScore = () => {
        const totals = parseInt(attendanceTotals) + parseInt(knowledgeTotals) + parseInt(toolsTotals)+ parseInt(teamworkTotals) + parseInt(salesTotals)
        return totals
    }

    // const staffScoreRecord = {
    //     name: fields.name,
    //     team: 
    //     score:
    // }

    return (
        <>
        {/* <AddStatsForm staff={staff} /> */}
        <Row>
        <Col>
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
        <Col md='5' className='m-1 ms-auto'>
        <h3>Total Score: {totalScore()}</h3>
        <p>Attendance Score: {attendanceTotals} </p>
        <p>Knowledge Score: {knowledgeTotals} </p>
        <p>Teamwork Score: {teamworkTotals} </p>
        <p>Tools Score: {toolsTotals} </p>
        <p>Sales Score: {salesTotals} </p>
        <p></p>
        </Col>
        <Col>
        <h5>Stats Recap</h5>
        {staffStats.map(stat => 
            <StatsCard stats={stat} />
        )}
        </Col>
        </Row>
        </>
    );
};

export default StaffDetail;