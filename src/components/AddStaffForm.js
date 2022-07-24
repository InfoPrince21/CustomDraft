
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

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'key7CvA4nWviUYLcP'}).base('appmqv083cLppisF5');
const table = base('Staff');


const AddStaffForm = ( ) => {
    const [avatarPreview, setAvatarPreview] = useState('/avatars/default.png');
    const nanoid = customAlphabet('1234567890', 3);
        
    const [modalOpen, setModalOpen] = useState(false)
    
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        const createdRecord = await table.create([
            {
              "fields": {
                "name": values.name,
                "id": parseInt(nanoid()),
                "image": values.photo1,
                "featured": "false",
                "quote": "Draft Me!",
                "featureInfo": "#1 Ranked Staff"
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });

        // const data = values.photo1

        // fetch(baseUrl, {
        //     method: "post",
        //     headers: new Headers({ Accept: "application/json" }),
        //     body: data,
        // })
        //     .them((response) => response.json())
        //     .them((data) => console.log(data))
        //     .catch((error) => console.log(error));
        

        console.log(values);
        setModalOpen(false)
        // dispatch(addStaff(newStaff));
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