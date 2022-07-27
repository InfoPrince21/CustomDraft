import { useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
// import DisplayCard from './DisplayCard';
import AnimatedDisplayCard from './AnimatedDisplayCard';
import { selectFeaturedStaff } from '../staff/staffSlice';
import { selectFeaturedTeam } from '../../app/teams/TeamSlice';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const DisplayList = () => {
    const items = useSelector((state) => [
        selectFeaturedStaff(state), 
        // selectFeaturedTeam(state), 
    ]);

    return (
        <>
        <Row>            
            {items.map((item, idx) => {
                const { isLoading, errMsg } = item;
                if (isLoading) {
                    return <Loading />;
                }
                if (errMsg) {
                    return <Error errMsg={errMsg} />;
                }
                const img = item.featuredItem.fields.image[0].url
                return (
                        // <Col md className='m-1' key={idx}>
                        //     <h1>{featuredItem.fields.featureInfo}</h1>
                        //     <h1>{featuredItem.fields.name}</h1>
                        //     {/* <AnimatedDisplayCard item={item} /> */}
                        // </Col>
                        <Col key={idx}>
                        <ImageList sx={{ width: 800, height: 500 }}>
                        <ImageListItem>
                        <img
                            src={img}
                            srcSet={img}
                            // alt={item.featuredItem.fields.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.featuredItem.fields.name}
                            subtitle={<span>"{item.featuredItem.fields.featureInfo}"</span>}
                            position="below"
                        />
                        </ImageListItem>
                        </ImageList>
                        </Col>
                );
            })}
        </Row>
        </>
    );
};

export default DisplayList;