
import { nanoid } from '@reduxjs/toolkit';
import { render } from 'react-dom';
import { customAlphabet } from 'nanoid';
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
const table = base('Staff');


const AddStaffForm = ( ) => {
    const [avatarPreview, setAvatarPreview] = useState('/avatars/default.png');
    const nanoid = customAlphabet('1234567890', 3);
        
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
            <i className='fa fa-pencil fa-lg' /> Add Staff
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader>
                    Add Staff
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
                                    Name
                                </Label>
                                <Field
                                    name='name'
                                    placeholder='Type Staff Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>
                                <Label style={{padding: 1}} htmlFor='name'>
                                    Upload a Photo
                                </Label>
                                <Input 
                                    type="file" 
                                    name="photo1"
                                    onChange={(event) => formProps.setFieldValue('photo1', event.target.files[0])}
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

export default AddStaffForm;