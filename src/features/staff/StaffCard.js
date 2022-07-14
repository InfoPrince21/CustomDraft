import { Card, CardHeader, CardImg, CardImgOverlay, CardTitle, Row, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { deleteStaff } from './staffSlice';
import { useDispatch, useSelector, } from 'react-redux';
import { draftedPlayersList, selectAllDrafted, selectAllTeam1, selectAllTeams, undoTeam1, draftTeam1, draftTeam2, draftTeam3, fetchTeam1, fetchTeam2, fetchTeam3} from '../../app/teams/TeamSlice';
import { useEffect, useState, } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { findByLabelText } from '@testing-library/react';

const StaffCard = ({staff}) => {  
    const dispatch = useDispatch();
    const { id, image, name, stats, featured } = staff;
    const isLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.teams.errMsg);
    // const [buttonDisplay, setButtonDisplay] = useState({display: "flex", gap: "4px"});
    const playerOnTeam = useSelector((state) => state.teams.playerDrafted)
    const playersGone = useSelector(selectAllDrafted)
    let buttonDisplay
    const draftedPlayersArray = []
    // playersGone.map(player => draftedPlayersArray.push(player.id))
    
    // if (playersGone.includes(id)) {
    //     buttonDisplay = {display: "none"}
    //     console.log("has id")
    // } else {
    //     buttonDisplay = {display: "flex", gap: "4px"}
    // }

    if (playersGone.includes(id)) {
        buttonDisplay = {display: "none"}
        console.log("has id")
    } else {
        buttonDisplay = {display: "flex", gap: "4px"}
    }


    console.log(playersGone)

    // const testData = dispatch(selectAllTeams);
    // const isLoading = useSelector((state) => state.team.loadingDraft);
    // const errMsg = useSelector((state) => state.team.errMsg);
    // console.log(isLoading)
    // console.log(errMsg)
    // const [buttonStyle, setButtonStyle] = useState({})   

    const handleSubmit = () => {
        dispatch(deleteStaff(id));
    };

    const handleTeam1 = () => {
        // setButtonStyle({display: "none"})
        const staffData = {
            "id": id,
            "name": name,
            "stats": stats
        };
        
        // setDrafted({display: "none"})

        dispatch(draftTeam1(staffData));
        dispatch(draftedPlayersList(staffData));
    }

    const handleTeam2 = () => {
        const staffData = {
            "id": id,
            "name": name,
            "stats": stats         
        };
        dispatch(draftTeam2(staffData));
        dispatch(draftedPlayersList(staffData));
    }

    const handleTeam3 = () => {
        const staffData = {
            "id": id,
            "name": name,
            "stats": stats
        };
        dispatch(draftTeam3(staffData));
        dispatch(draftedPlayersList(staffData));
    }
    return (
        <>
        {/* {isLoading ? <Loading /> : ""}
        {errMsg ? <Error errMsg={errMsg} />: ""} */}
        <Link to={`${id}`}>    
            <Card>
                <CardHeader>{name}</CardHeader>
                {/* <CardImg 
                    width='100%'
                    src={image}
                    alt={name}
                /> */}
                {/* <CardImgOverlay>
                    <CardTitle>{name}</CardTitle>
                </CardImgOverlay> */}
            </Card>
        </Link>
        <Row>
            <Col 
                id={id}
                // style={{
                //     display: "flex",
                //     gap:"4px"
                // }}
                style={buttonDisplay}
            >
                {/* <Button onClick={handleSubmit} color="primary" size ="sm">Delete</Button> */}
                <Button
                    // style={playerOnTeam ? {display: "none"} : {display: "flex"}}
                    onClick={handleTeam1} color="primary" size ="sm"
                >
                    Team 1 Draft
                </Button>
                <Button
                onClick={handleTeam2} color="primary" size ="sm"
                >
                    Team 2 Draft
                </Button>
                <Button
                onClick={handleTeam3} color="primary" size ="sm"
                >   
                    Team 3 Draft
                </Button>
            </Col>
        </Row>
        
        </>
    );
}


export default StaffCard;