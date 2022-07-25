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
        // selectFeaturedStaff(state), 
        // selectFeaturedTeam(state), 
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
                
                </Col>
            </Row>
            {items.map((item, idx) => {
                const { featuredItem, isLoading, errMsg } = item;
                // if (isLoading) {
                //     return <Loading key={idx} />;
                // }
                // if (errMsg) {
                //     return <Error errMsg={errMsg} key={idx} />;
                // }
                return (
                    
                    
                    (
                        // <Col md className='m-1' key={idx}>
                        //     <h1>{featuredItem.fields.featureInfo}</h1>
                        //     <h1>{featuredItem.fields.name}</h1>
                        //     {/* <AnimatedDisplayCard item={item} /> */}
                        // </Col>

                        <ImageList sx={{ width: 400, height: 250 }}>
                        <ImageListItem key={featuredItem.fields.id}>
                        <img
                            src={`${featuredItem.fields.image[0].url}?w=248&fit=crop&auto=format`}
                            srcSet={`${featuredItem.fields.image[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={featuredItem.fields.name}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={featuredItem.fields.name}
                            subtitle={<span>"{featuredItem.fields.featureInfo}"</span>}
                            position="below"
                        />
                        </ImageListItem>
                        </ImageList>



                    )
                );
            })}
        </Row>
    );
};

export default DisplayList;