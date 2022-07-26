import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Button, Col, Container, Card, CardHeader, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const StaffDirectory = ({staff}) => {
    
    const isLoading = useSelector((state) => state.staff.isLoading);
    const isDraftLoading = useSelector((state) => state.teams.loadingDraft);
    const errMsg = useSelector((state) => state.staff.errMsg);
    // const { id, image, name, stats, featured, quote } = staff;
    const dispatch = useDispatch();

    if (isLoading) {
        return (
            <Row>
                <Loading />
            </Row>
        );
    }

    if (errMsg) {
        return (
            <Row>
                <Error errMsg={errMsg} />
            </Row>
        );
    }
    
    const deletePerson = () => {
        // dispatch(deleteStaff(staff.fields.id))
    }

    return (
        <Link to={`${staff.fields.id}`}>
        <Col md='2' className='m-5' key={staff.fields.id}>
            <ImageList sx={{ width: 400, height: 250 }}>
                    <ImageListItem key={staff.fields.id}>
                        <img
                            src={`${staff.fields.image[0].url}?w=248&fit=crop&auto=format`}
                            srcSet={`${staff.fields.image[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={staff.fields.name}
                            loading="lazy"
                    />
                    <ImageListItemBar
                            title={staff.fields.name}
                            subtitle={<span>"{staff.fields.quote}"</span>}
                            position="below"
                    />
                    </ImageListItem>
            </ImageList>
        </Col>
        </Link>
  )
}

export default StaffDirectory