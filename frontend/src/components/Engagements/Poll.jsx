import React, { useState } from 'react';
import { createPoll } from '../../Api'; 
import { useParams } from 'react-router-dom'; 
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../../css/Poll.css'; 

const Poll = () => {
    const { eventId } = useParams(); 
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); 
    const [errorMessage, setErrorMessage] = useState('');

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        if (!question || options.some((opt) => !opt)) {
            setErrorMessage('Please provide a question and all options.');
            toast.error('Please provide a question and all options.');
            return;
        }

        try {
            const pollData = { question, options: options.map((option) => ({ option })) };
            await createPoll(eventId, pollData);

            setQuestion(''); 
            setOptions(['', '']); 
            setErrorMessage(''); 
            toast.success('Poll created successfully!');
        } catch (error) {
            setErrorMessage('Error creating poll: ' + error.message);
            toast.error('Error creating poll: ' + error.message);
        }
    };

    return (
        <div className="create-poll-container">
            <h2>Create Poll</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Enter poll question"
                    />
                </div>
                <div>
                    <label>Options</label>
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                        />
                    ))}
                    <button type="button" onClick={addOption}>Add Option</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Create Poll</button>
            </form>
        </div>
    );
};

export default Poll;











// // import React, { useState } from 'react';
// // import { createPoll } from '../../Api'; // Import the API function
// // import { Link, useParams } from 'react-router-dom'; // For getting the eventId from the URL
// // import '../../css/Poll.css'; // Assuming you have a CSS file for styling

// // const Poll = () => {
// //     const { eventId } = useParams(); // Extract eventId from the URL
// //     const [question, setQuestion] = useState('');
// //     const [options, setOptions] = useState(['', '']); // Start with 2 empty options
// //     const [errorMessage, setErrorMessage] = useState('');

// //     const handleOptionChange = (index, value) => {
// //         const newOptions = [...options];
// //         newOptions[index] = value;
// //         setOptions(newOptions);
// //     };

// //     const addOption = () => {
// //         setOptions([...options, '']);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!question || options.some((opt) => !opt)) {
// //             setErrorMessage('Please provide a question and all options.');
// //             return;
// //         }

// //         try {
// //             const pollData = { question, options: options.map((option) => ({ option })) };
// //             await createPoll(eventId, pollData);
// //             setErrorMessage('Poll created successfully!');
// //         } catch (error) {
// //             setErrorMessage('Error creating poll: ' + error.message);
// //         }
// //     };

// //     return (
// //         <div className="create-poll-container">
// //             <h2>Create Poll</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div>
// //                     <label>Question</label>
// //                     <input
// //                         type="text"
// //                         value={question}
// //                         onChange={(e) => setQuestion(e.target.value)}
// //                         placeholder="Enter poll question"
// //                     />
// //                 </div>
// //                 <div>
// //                     <label>Options</label>
// //                     {options.map((option, index) => (
// //                         <input
// //                             key={index}
// //                             type="text"
// //                             value={option}
// //                             onChange={(e) => handleOptionChange(index, e.target.value)}
// //                             placeholder={`Option ${index + 1}`}
// //                         />
// //                     ))}
// //                     <button type="button" onClick={addOption}>Add Option</button>
// //                 </div>
// //                 {errorMessage && <p className="error-message">{errorMessage}</p>}
// //                 <button type="submit">Create Poll</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default Poll;




// import React, { useState } from 'react';
// import { createPoll } from '../../Api'; // Import the API function
// import { useParams } from 'react-router-dom'; // For getting the eventId from the URL
// import { toast } from 'react-toastify'; // Import toast for notifications
// // import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
// import '../../css/Poll.css'; // Assuming you have a CSS file for styling

// // Initialize toast
// // toast.configure();

// const Poll = () => {
//     const { eventId } = useParams(); // Extract eventId from the URL
//     const [question, setQuestion] = useState('');
//     const [options, setOptions] = useState(['', '']); // Start with 2 empty options
//     const [errorMessage, setErrorMessage] = useState('');

//     const handleOptionChange = (index, value) => {
//         const newOptions = [...options];
//         newOptions[index] = value;
//         setOptions(newOptions);
//     };

//     const addOption = () => {
//         setOptions([...options, '']);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!question || options.some((opt) => !opt)) {
//             setErrorMessage('Please provide a question and all options.');
//             toast.error('Please provide a question and all options.');
//             return;
//         }

//         try {
//             const pollData = { question, options: options.map((option) => ({ option })) };
//             console.log('error1')
//             await createPoll(eventId, pollData);
//             console.log('error2')
//             setErrorMessage('');
//             console.log('error3')
//             toast.success('Poll created successfully!');
//         } catch (error) {
//             setErrorMessage('Error creating poll: ' + error.message);
//             toast.error('Error creating poll: ' + error.message);
//         }
//     };

//     return (
//         <div className="create-poll-container">
//             <h2>Create Poll</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Question</label>
//                     <input
//                         type="text"
//                         value={question}
//                         onChange={(e) => setQuestion(e.target.value)}
//                         placeholder="Enter poll question"
//                     />
//                 </div>
//                 <div>
//                     <label>Options</label>
//                     {options.map((option, index) => (
//                         <input
//                             key={index}
//                             type="text"
//                             value={option}
//                             onChange={(e) => handleOptionChange(index, e.target.value)}
//                             placeholder={`Option ${index + 1}`}
//                         />
//                     ))}
//                     <button type="button" onClick={addOption}>Add Option</button>
//                 </div>
//                 {errorMessage && <p className="error-message">{errorMessage}</p>}
//                 <button type="submit">Create Poll</button>
//             </form>
//         </div>
//     );
// };

// export default Poll;
















