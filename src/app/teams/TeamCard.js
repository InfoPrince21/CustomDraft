import { CardImg, CardImgOverlay, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const TeamCard = ({team}, {teamPlayers}) => {   
    const { fields } = team;
    const dispatch = useDispatch();

    const handleSubmit = () => {
        // dispatch(deleteTeams(team.fields.id));
    };

    return (
        <>
           
            <Card sx={{ maxWidth: 345 }}>
             
                <CardActionArea>
                <Link to={`${fields.id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={fields.image[0].url}
                        alt="team-image"
                        />
                       </Link>         
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        <Link to={`${fields.id}`}>{fields.name}</Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {fields.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                
            </Card>

            <CardActions>
                {/* <Button onClick={handleSubmit} size="small" color="primary">
                    Delete
                </Button> */}
            </CardActions>
        <Row>
            {/* <Col style={{
                display: "flex",
                gap:"4px"
            }}>
                <Button onClick={handleSubmit} color="primary" size ="sm">Delete Team</Button>
            </Col> */}
        </Row>
        </>
    );
}

export default TeamCard;