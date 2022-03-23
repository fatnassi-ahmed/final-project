import React, { useEffect, useState, dispatch } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import { parseClassName } from "react-toastify/dist/utils";
import { toast } from "react-toastify";

// import { useState } from "react";

const EditContact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const { id } = useParams();
    const contacts = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const currentContact = contacts.find(
        (contact) => contact.id === parseInt(id)
    );

    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkEmail = contacts.find(
            (contact) => contact.id !== parseInt(id) && contact.email === email
        );

        const checkNumber = contacts.find(
            (contact) =>
                contact.id !== parseInt(id) &&
                contact.number === parseInt(number)
        );
        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields");
        }

        if (checkEmail) {
            return toast.error("This email already exists!");
        }
        if (checkNumber) {
            return toast.error("This number already exists!");
        }
        const data = {
            id: parseInt(id),
            name,
            email,
            number,
        };

        dispatch({ type: "UPDATE_CONTACT", payload: data });

        toast.success("Contact updated successflully");
        history.push("/");
    };

    return (
        <div className="container">
            {currentContact ? (
                <>
                    <h1 className="display-3 text-center">Edit Student {id}</h1>
                    <div className="row">
                        <div className="col-md-6 shadow mx-auto p-5">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        placeholder="Phone Number"
                                        className="form-control"
                                        value={number}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="submit"
                                        value="Update Contact"
                                        className="btn  btn-dark"
                                    />
                                    <Link
                                        to="/"
                                        className="btn btn-danger ml-3"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="display-3 text-center">
                    Contact with id {id} not exists
                </h1>
            )}
        </div>
    );
};

export default EditContact;
