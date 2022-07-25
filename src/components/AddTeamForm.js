
import { nanoid } from '@reduxjs/toolkit';
import { customAlphabet } from 'nanoid';

import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { validateCommentForm }  from '../utils/validateCommentForm';
import { postComment } from '../features/comments/commentsSlice';
// import { addNewTeam } from '../app/teams/TeamSlice'

const AddTeamForm = ( ) => {
    
    const nanoid = customAlphabet('1234567890', 6);
        
    const [modalOpen, setModalOpen] = useState(false)
    
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const newTeam = {    
            id: parseInt(nanoid()),
            name: values.teamName,
            stats: {
                attendance: parseInt(10),
                knowledge: parseInt(10),
                teamwork: parseInt(10)
            }
        };
        // console.log(newStaff);
        setModalOpen(false)
        // dispatch(addNewTeam(newTeam));
    };

    return (
        <>
            <Button outline={true} onClick={() => setModalOpen(true)}>
            <i className='fa fa-pencil fa-lg' /> Add Team
            </Button>
            <Modal isOpen={modalOpen}>
                <ModalHeader>
                    Add Team
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            
                        }}
                        onSubmit={handleSubmit}
                        // validate={validateCommentForm}
                    >
                        <Form>
                            <FormGroup>
                                <Label htmlFor='teamName'>
                                    Team Name
                                </Label>
                                <Field
                                    name='teamName'
                                    placeholder='Type Team Name'
                                    className='form-control'
                                />
                                <ErrorMessage name='name'>
                                    {(msg) => <p className='text-danger'>{msg}</p>}
                                </ErrorMessage>            
                            </FormGroup>
                            <Button type='submit' color='primary'>
                                Submit
                            </Button>
                        </Form>
                    </Formik>
                </ModalBody>    
            </Modal>
        </>        
    );
};

export default AddTeamForm;