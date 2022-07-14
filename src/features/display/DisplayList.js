import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
// import DisplayCard from './DisplayCard';
import AnimatedDisplayCard from './AnimatedDisplayCard';
import { selectFeaturedStaff } from '../staff/staffSlice';
import { selectFeaturedTeam } from '../../app/teams/TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const DisplayList = () => {
    const items = useSelector((state) => [
        selectFeaturedStaff(state), 
        selectFeaturedTeam(state), 
    ]);

    return (
        <Row>
            <Row>
                <Col
                sm={{
                    offset: 2,
                    size: 'auto'
                }}
                xl={{
                    offset: 3,
                    size: 'auto'
                }}
                >
                    <h4>Featured Staff Member & 1st Place Team</h4>
                </Col>
            </Row>
            {items.map((item, idx) => {
                const { featuredItem, isLoading, errMsg } = item;
                if (isLoading) {
                    return <Loading key={idx} />;
                }
                if (errMsg) {
                    return <Error errMsg={errMsg} key={idx} />;
                }
                return (
                    featuredItem && (
                        <Col md className='m-1' key={idx}>
                            <AnimatedDisplayCard item={featuredItem} />
                        </Col>
                    )
                );
            })}
        </Row>
    );
};

export default DisplayList;