import { Card, CardImg, CardText, CardBody, Col } from 'reactstrap';
import StatsCard from '../stats/StatsCard';
import { fetchStatsByName } from '../stats/statsSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const StaffDetail = ( {staff} ) => {
    
    

    const dispatch = useDispatch();
    const { fields } = staff;
    // const staffStats = dispatch(fetchStatsByName(fields.name))
    // const playerStats = staffStats
    // const miniStats = playerStats.map(record => record)
    // const mappedStats = playerStats.map(record => record.tools)

    // const [theStats, setTheStats] = useEffect(staffStats)
    // const attendanceStats = staffStats.map(stats => stats.fields.attendace)

    return (
        <Col md='5' className='m-1'>
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
    );
};

export default StaffDetail;