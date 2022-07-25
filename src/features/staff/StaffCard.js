import Avatar from '@mui/material/Avatar';
import { Card, CardHeader, CardImg, CardImgOverlay, CardTitle, Row, Button, Col } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import {fetchTeam1Air, fetchTeam2Air, fetchTeam3Air, draftRecapList, draftTeam1AirTable, draftTeam2AirTable, draftTeam3AirTable, draftedPlayersList, selectAllDrafted, selectAllTeam1, selectAllTeams, undoTeam1, draftTeam1, draftTeam2, draftTeam3, fetchTeam1, fetchTeam2, fetchTeam3} from '../../app/teams/TeamSlice';
import { useEffect, useState, } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { findByLabelText } from '@testing-library/react';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const team1draft = base('DraftTeam1');
const team2draft = base('DraftTeam2');
const team3draft = base('DraftTeam3');



const StaffCard = ({staff, teamName, setTeamName,}, stop) => {  
    
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const dispatch = useDispatch();
    // const { id, image, name, stats, quote, featured } = staff;
    const isLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.teams.errMsg);
    // const [buttonDisplay, setButtonDisplay] = useState({display: "flex", gap: "4px"});
    const playerOnTeam = useSelector((state) => state.teams.playerDrafted)
    const playersGone = useSelector(selectAllDrafted)
    let buttonDisplay
    let showButton1
    let showButton2
    let showButton3
    let checkDisable = false

    const draftedPlayersArray = []
    const panelId = 'panel' + staff.fields.id
    // playersGone.map(player => draftedPlayersArray.push(player.id))
    
    // if (playersGone.includes(id)) {
    //     buttonDisplay = {display: "none"}
    //     console.log("has id")
    // } else {
    //     buttonDisplay = {display: "flex", gap: "4px"}
    // }

    if (playersGone.includes(staff.fields.id)) {
        buttonDisplay = {display: "none"}
        checkDisable = true
        // console.log("has id")
    } else {
        buttonDisplay = {display: "flex", gap: "4px"}
        checkDisable = false
    }

    if (teamName === "Team 1") {
        showButton1 = {display: "flex"}
        showButton2 = {display: "none"}
        showButton3 = {display: "none"}
    } else if (teamName === "Team 2") {
        showButton1 = {display: "none"}
        showButton2 = {display: "flex"}
        showButton3 = {display: "none"}
    } else if (teamName === "Team 3") {
        showButton1 = {display: "none"}
        showButton2 = {display: "none"}
        showButton3 = {display: "flex"}
    }



    // console.log(playersGone)

    // const testData = dispatch(selectAllTeams);
    // const isLoading = useSelector((state) => state.team.loadingDraft);
    // const errMsg = useSelector((state) => state.team.errMsg);
    // console.log(isLoading)
    // console.log(errMsg)
    // const [buttonStyle, setButtonStyle] = useState({})   

    const handleSubmit = () => {
        // dispatch(deleteStaff(staff.fields.id));
    };

    const handleTeam1 = () => {
        // setButtonStyle({display: "none"})
        const staffData = staff 
        
        // setDrafted({display: "none"})

        setTeamName("Team 2")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam1AirTable(staffData));
        dispatch(fetchTeam1Air());
        // return stop
        
    }

    const handleTeam2 = () => {
        const staffData = staff 
        setTeamName("Team 3")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam2AirTable(staffData));
        dispatch(fetchTeam2Air());
    }

    const handleTeam3 = () => {
        const staffData = staff 
        setTeamName("Team 1")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam3AirTable(staffData));
        dispatch(fetchTeam3Air());
    }
    return (
        <>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                disabled={checkDisable}
                
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {staff.fields.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Avatar style={buttonDisplay} sx={{ width: 75, height: 75 }} alt={staff.fields.name} src={staff.fields.image[0].url} />
            <Typography style={buttonDisplay}>
                {staff.fields.quote}
            </Typography>
            <Row>
            <Col 
                id={staff.fields.id}
                style={buttonDisplay}
            >
                <Button
                    style={showButton1}
                    onClick={handleTeam1} color="primary" size ="sm"
                >
                    Draft to Team 1
                </Button>
                <Button
                    style={showButton2}
                    onClick={handleTeam2} color="primary" size ="sm"
                >
                    Draft to Team 2
                </Button>
                <Button
                    style={showButton3}
                    onClick={handleTeam3} color="primary" size ="sm"
                >   
                    Draft to Team 3
                </Button>
            </Col>
        </Row>
        </AccordionDetails>
            </Accordion>
        {/* <Row>
            <Col 
                id={id}
                style={buttonDisplay}
            >
                <Button
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
        </Row> */}
        
        </>
    );
}


export default StaffCard;