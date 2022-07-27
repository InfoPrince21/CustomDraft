import { Col, Row, Container, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import SubHeader from '../components/SubHeader';
import PartnersList from '../features/partners/PartnersList';
import { selectStats, selectStatsByName } from '../features/stats/statsSlice';
import StatsCard from '../features/stats/StatsCard';
import Board from '../components/Board';
import TeamBoard from '../components/TeamBoard';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('StaffScoreCard');
let testValue

const StatsPage = () => {

    const handleClick = async () => {
        
        // const records = await table.select().firstPage()
        const record = await table.select({view: 'Grid view'}).firstPage()
        const miniRecord = record.map(record => ({id: record.id, fields: record.fields}));
        // console.log(records);

        // const recordFields= records.find(record => record.fields.name === 'Prince' )
        // const recordFields= records.map(record => record.fields.image[0].url)
        // const recordFields= records.find(record => record.fields.featured === "true")
        // console.log(recordFields)
        // console.log(miniRecord)
        return testValue = miniRecord
    }
    
    const statsArray = useSelector(selectStats);
    // const showName = stats.map(record => record.fields.Name)
    // const showKnowledge = stats.map(record => record.fields.Knowledge)
    const mistyStats = useSelector(selectStatsByName("Misty"));
    // console.log(mistyStats)
    const attendanceStats = mistyStats.map(stat => stat.fields.attendance)
    // console.log(attendanceStats)
    const attendanceTotals = attendanceStats.reduce((partialSum, a) => partialSum + a, 0)
    // console.log(attendanceTotals)

    return (
        <Container>
            <SubHeader current='Stats' />
            <Row>
                <Col>
                    <TeamBoard></TeamBoard>
                </Col>
                <Col>
                    <Board></Board>
                </Col>
            </Row>
            <Row className='row-content'>
                {/* <Button onClick={handleClick}>Click</Button> */}
            </Row>
        </Container>
    );
};

export default StatsPage;