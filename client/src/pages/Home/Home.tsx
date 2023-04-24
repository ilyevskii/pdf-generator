import React, { useState } from 'react';
import './Home.css';
import {useAuth} from "../../contexts/Auth/AuthContext";
import {UserRepository} from "../../repositories/userRepository";
import {NavigateFunction, useNavigate} from "react-router-dom";

export function Home(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    const {user, logout, refresh} = useAuth();

    const [name, setName] = useState(user!.firstName! ? user!.firstName! : "");
    const [lastName, setLastName] = useState(user!.lastName! ? user!.lastName! : "");
    const [image, setImage] = useState<File | null>(null);

    const [pdf_link, setLink] = useState('');
    const [error, setError] = useState('');
    const [notification, setNotification] = useState('');


    const userRepo = new UserRepository();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setLastName(event.target.value);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImage(event.target.files[0]);
        }
    };

    const handleLogoutClick = (): void => {
        logout();
        navigate('/login');
    }

    const handleDeleteClick = (): void => {

        userRepo.delete_account(user!)
            .then(res => {
                if (res) logout();
                navigate('/register');
            })
            .catch(err => console.log(err.toString()));
    }

    const handleChangeClick = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        function hasNoRussianCharacters(str: string): boolean {
            const russianRegex: RegExp = /[а-яА-Я]/g;
            return !russianRegex.test(str);
        }

        if (lastName && name) {
            if (user!.lastName !== lastName || user!.firstName !== name || image) {

                if (hasNoRussianCharacters(lastName) && hasNoRussianCharacters(name)) {

                    userRepo.change_account_info({
                        id: user!.id,
                        firstName: name,
                        lastName: lastName
                    }).then(res => {if (res) {
                        userRepo.upload_image(user!, image!).then(res => {
                            setError('');
                            setNotification('Profile data changed successfully!');
                            refresh();
                        })
                            .catch(err => console.log(err.toString()))
                    }})
                        .catch(err => console.log(err.toString()))
                }
                else {
                    setError('Unfortunately, you can`t use Russian letters to fill in the data.');
                    setNotification('');
                }

            }
            else {
                setError('Change the data in the inputs to change the profile details!');
                setNotification('');
            }
        }
        else {
            setError('Fill in all the fields to change your profile!');
            setNotification('');
        }

    };

    const handleGenerateClick = () => {
        if (lastName && name) {
            if (user!.lastName && user!.firstName) {
                userRepo.generate_new_pdf(user!).then(res => {
                    setLink(res);
                    setError('');
                    setNotification('The document has been generated! Use the button to download it!');
                })
                    .catch(err => console.log(err.toString()))
            }
            else {
                setError('Set profile details to generate a document!');
                setNotification('');
            }

        }
        else {
            setError('Set profile details to generate a document!');
            setNotification('');
        }
    }

    return (
        <>
            <header className="homepage-header">
                <button className="button" title="Logout" onClick={handleLogoutClick}>Change account</button>
                {pdf_link ?
                    <a className="button" href={pdf_link} download="result.pdf" >Download PDF</a>
                    :
                    <></>
                }
                <button className="button" title="Delete your account" onClick={handleDeleteClick}>Delete account</button>
            </header>
            <div className="container">
                <div>
                    {error ?
                        <div className="homepage-error">{error}</div>
                        :
                        <></>
                    }
                    {notification ?
                        <div className="homepage-notification">{notification}</div>
                        :
                        <></>
                    }
                </div>
                <div className="homepage-content">

                    <form onSubmit={handleChangeClick} className="homepage-form">
                        <div className="homepage-label-group">
                            <label className="homepage-label">
                                First Name
                                <input
                                    className="homepage-input"
                                    placeholder="Name"
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange} />
                            </label>
                            <label className="homepage-label">
                                Last Name
                                <input
                                    className="homepage-input"
                                    placeholder="Last Name"
                                    type="text"
                                    value={lastName}
                                    onChange={handleLastNameChange} />
                            </label>
                            <label className="homepage-label">
                                Image
                                <input
                                    className="homepage-input photo-input"
                                    type="file"
                                    id="photo"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </div>
                        <button className="button" type="submit">Change profile info</button>
                    </form>
                    <button
                        className="homepage-generate-button"
                        onClick={handleGenerateClick}
                    >
                        Generate PDF
                    </button>
                </div>

            </div>
        </>
        );
}
