import { render } from 'react-dom';
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateCommentForm }  from '../utils/validateCommentForm';
import { postComment } from '../features/comments/commentsSlice';
import { addStaff } from '../features/staff/staffSlice'
import yup from "yup";
import { baseUrl } from '../app/shared/baseUrl';
import { addAirTableStaff } from '../features/staff/staffSlice';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('StaffScoreCards');


const AddStatsForm = ({staff}) => {
    const [avatarPreview, setAvatarPreview] = useState('/avatars/default.png');
        
    const [modalOpen, setModalOpen] = useState(false)
    
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(addAirTableStaff(values));
        console.log(values);
        setModalOpen(false)
        
    };

    return (
        <>
            <Button outline={true} onClick={() => setModalOpen(true)}>
            <i className='fa fa-pencil fa-lg' /> Add Stats
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader>
                    Add Stats for {staff.fields.name}
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            photo1: ""
                        }}
                        onSubmit={handleSubmit}
                        // validate={validateCommentForm}
                    >
                    {(formProps) => (
                        <Form>
                            
                            <FormGroup>
                                <Label htmlFor='name'>
                                    Date
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <Label htmlFor='name'>
                                    Day
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage> 
                                <Label htmlFor='name'>
                                    Attendance
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage> 
                                <Label htmlFor='name'>
                                    Knowledge
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage> 
                                <Label htmlFor='name'>
                                    Teamwork
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage> 
                                <Label htmlFor='name'>
                                    Tools
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />    
                            </FormGroup>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>
                        </Form>
                    )}       
                    </Formik>
                    
                </ModalBody>    
            </Modal>



            
        </>        
    );
};

export default AddStatsForm;