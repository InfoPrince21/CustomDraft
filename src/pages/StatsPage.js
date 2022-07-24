import { Col, Row, Container, Card, CardBody, CardHeader, Button } from 'reactstrap';
import SubHeader from '../components/SubHeader';
import PartnersList from '../features/partners/PartnersList';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Staff');

const StatsPage = () => {
    const handleClick = async () => {
        
        // const records = await table.select().firstPage()
        const createdRecord = await table.create([
            {
              "fields": {
                "name": "Rod",
                "id": 111,
                "image": [
                  {
                    "url": "https://dl.airtable.com/.attachments/ba9bb2a1803b30e10baa937874c2e4e2/62cd5643/pic01.jpg?ts=1658635904&userId=usrGX8D87u4bZmQFg&cs=60dde6320a23133b"
                  }
                ],
                "featured": "Boss",
                "quote": "Draft Me!",
                "featureInfo": "#1 Ranked Staff"
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });
        // console.log(records);

        // const recordFields= records.find(record => record.fields.name === 'Prince' )
        // const recordFields= records.map(record => record.fields.image[0].url)
        // const recordFields= records.find(record => record.fields.featured === "true")
        // console.log(recordFields)
        console.log(createdRecord)
    }
    


    
    return (
        <>
            <Container>
                <SubHeader current='Stats' />
                <Row className='row-content'>
                    <Button onClick={handleClick}>Click</Button>
                    <Col sm='6'>
                        <h3>Stats</h3>
                        <p>
                        Stats go here
                        </p>
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