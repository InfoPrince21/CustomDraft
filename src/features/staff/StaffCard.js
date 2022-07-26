import Avatar from '@mui/material/Avatar';
import { Card, CardHeader, CardImg, CardImgOverlay, CardTitle, Row, Button, Col } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import {fetchTeam1Air, fetchTeam2Air, fetchTeam3Air, draftRecapList, draftTeam1AirTable, draftTeam2AirTable, draftTeam3AirTable, selectAllDraftedIds, } from '../../app/teams/TeamSlice';
import { useEffect, useState, } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');

const StaffCard = ({staff, teamName, setTeamName,}, stop) => {  
    
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const dispatch = useDispatch();
    // const { id, image, name, stats, quote, featured } = staff;
    const isLoading = useSelector((state) => state.teams.loadingDraft)
    const errMsg = useSelector((state) => state.teams.errMsg);
    const playerOnTeam = useSelector((state) => state.teams.playerDrafted)
    const playersGone = useSelector(selectAllDraftedIds)
    let buttonDisplay
    let showButton1
    let showButton2
    let showButton3
    let checkDisable = false

    if (playersGone.includes(staff.fields.id)) {
        buttonDisplay = {display: "none"}
        checkDisable = true
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
        const staffData = staff 
        setTeamName("Team 2")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam1AirTable(staffData));
        dispatch(fetchTeam1Air());
        dispatch(fetchTeam1Air());
    }

    const handleTeam2 = () => {
        const staffData = staff 
        setTeamName("Team 3")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam2AirTable(staffData));
        dispatch(fetchTeam2Air());
        dispatch(fetchTeam2Air());
    }

    const handleTeam3 = () => {
        const staffData = staff 
        setTeamName("Team 1")
        dispatch(draftRecapList(staffData));
        dispatch(draftTeam3AirTable(staffData));
        dispatch(fetchTeam3Air());
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
                        onClick={handleTeam1} 
                        color="primary" size ="sm"
                    >
                        Team 1 Pick
                    </Button>
                    <Button
                        style={showButton2}
                        onClick={handleTeam2} 
                        color="primary" size ="sm"
                    >
                        Team 2 Pick
                    </Button>
                    <Button
                        style={showButton3}
                        onClick={handleTeam3} 
                        color="primary" size ="sm"
                    >   
                        Team 3 Pick
                    </Button>
                </Col>
                </Row>
            </AccordionDetails>
        </Accordion>
        </>
    );
}


export default StaffCard;