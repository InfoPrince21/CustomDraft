import { Col, Row, Container, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import SubHeader from '../components/SubHeader';
import PartnersList from '../features/partners/PartnersList';
import { selectStats } from '../features/stats/statsSlice';
import StatsCard from '../features/stats/StatsCard';

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
        console.log(miniRecord)
        return testValue = miniRecord
    }
    
    const statsArray = useSelector(selectStats);
    // const showName = stats.map(record => record.fields.Name)
    // const showKnowledge = stats.map(record => record.fields.Knowledge)



    
    return (
        <>
            <Container>
                <SubHeader current='Stats' />
                <Row className='row-content'>
                    <Button onClick={handleClick}>Click</Button>
                    <Col sm='6'>
                        <h3>Stats</h3>
                        {statsArray.map((stats, idx) =>
                          <StatsCard key={idx} stats={stats} />)
                        }
                    </Col>
                    <Col sm='6'>
                        <Card>
                            <CardHeader className='bg-primary text-white'>
                            <h3>#1 Ranked Staff</h3>
                            </CardHeader>
                            <CardBody>
                            <dl className='row'>
                                <dt className='col-6'>Name</dt>
                                <dd className='col-6'>Bobby</dd>
                                <dt className='col-6'>Attendance</dt>
                                <dd className='col-6'>10</dd>
                                <dt className='col-6'>Knowledge</dt>
                                <dd className='col-6'>9</dd>
                                <dt className='col-6'>Teamwork</dt>
                                <dd className='col-6'>10</dd>
                            </dl>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card className='bg-light mt-3'>
                            <CardBody>
                                <blockquote className='blockquote'>
                                <footer className='blockquote-footer'>
                                    <cite title='Source Title'>
                                    “If everyone is moving forward together, then success takes care of itself.”                                1903
                                    </cite>
                                </footer>
                                </blockquote>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </>
    );
};

export default StatsPage;