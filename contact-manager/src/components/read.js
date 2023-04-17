import React, { useEffect, useState } from 'react'; // Import React, useState and useEffect hooks
import { Table, Button, TableHeader } from 'semantic-ui-react'; // Import Table, Button and TableHeader components from the semantic-ui-react library
import axios from 'axios'; // Import axios library for making API requests
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom library
import "../App.css"; // Import App.css file for styling purposes

export default function Read() { // Export a functional component named Read
    const [APIData, setAPIData] = useState([]); // Declare a state variable named APIData and initialize it with an empty array using useState hook

    useEffect(() => { // Use useEffect hook to fetch data from the API when the component mounts
        getData(); // Call the getData function
    }, []);

    const setData = (data) => { // Declare a function named setData that takes a parameter named data
        let { id, firstName, lastName, contactNumber } = data; // Destructure the data object and assign values to variables
        localStorage.setItem('ID', id); // Store the value of the id variable in localStorage with the key 'ID'
        localStorage.setItem('First Name', firstName); // Store the value of the firstName variable in localStorage with the key 'First Name'
        localStorage.setItem('Last Name', lastName); // Store the value of the lastName variable in localStorage with the key 'Last Name'
        localStorage.setItem('Number', contactNumber); // Store the value of the contactNumber variable in localStorage with the key 'Number'
    };

    const getData = () => { // Declare a function named getData that fetches data from the mock API
        axios.get(`https://643599e1537112453fdac6b5.mockapi.io/mockData`).then((getData) => { // Use axios to make a GET request to the mock API endpoint
            setAPIData(getData.data); // Update the APIData state variable with the response data using setAPIData method
        });
    };

    const onDelete = (id) => { // Declare a function named onDelete that takes an id parameter
        axios.delete(`https://643599e1537112453fdac6b5.mockapi.io/mockData/${id}`).then(() => { // Use axios to make a DELETE request to the mock API endpoint with the specified id
            getData(); // Call the getData function to refresh the data on the page
        });
    };

    const sortData = (field) => { // Declare a function named sortData that takes a field parameter
        const sortedData = [...APIData].sort((a, b) => { // Use the spread operator to create a copy of the APIData array and sort it based on the specified field
            if (a[field] < b[field]) {
                return -1;
            }
            if (a[field] > b[field]) {
                return 1;
            }
            return 0;
        });
        setAPIData(sortedData); // Update the APIData state variable with the sorted data using setAPIData method
    };

    return (
        // The entire table is wrapped in a div with a class of "table-container".
        <div className='table-container'>
            {/* The Table component is used to create the structure of the table. */}
            <Table structured>
                {/* The Table.Header component is used to create the table header. */}
                <Table.Header>
                    {/* The Table.Row component is used to create a row within the table header. */}
                    <Table.Row>
                        {/* The Table.HeaderCell component is used to create a cell within the table header. */}
                        {/* It contains the "First Name" column header and a "Sort" button that will sort data by the first name column when clicked. */}
                        <Table.HeaderCell className="border-bottom">
                            <TableHeader>First Name</TableHeader>
                            <Button className='sort-button' size="mini"
                                onClick={() => sortData("firstName")}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    textAlign: "center"
                                }}
                            >
                                Sort
                            </Button>
                        </Table.HeaderCell>
                        {/* The same is repeated for the "Last Name" and "Contact Numbers" columns. */}
                        <Table.HeaderCell className="border-bottom">
                            <TableHeader>Last Name</TableHeader>
                            <Button className='sort-button'
                                size="mini"
                                onClick={() => sortData("lastName")}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    textAlign: "center"
                                }}
                            >
                                Sort
                            </Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell className="border-bottom">
                            <TableHeader>Contact Numbers</TableHeader>
                            <Button className='sort-button'
                                size="mini"
                                onClick={() => sortData("contactNumber")}
                                style={{
                                    display: "block",
                                    margin: "auto",
                                    textAlign: "center"
                                }}
                            >
                                Sort
                            </Button>
                        </Table.HeaderCell>
                        {/* Two empty header cells are added to keep the layout consistent. */}
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                {/* The Table.Body component is used to create the body of the table. */}
                <Table.Body>
                    {/* The map function is used to iterate over each item in the APIData array and create a new row in the table for each item. */}
                    {APIData.map((data) => {
                        return (
                            <Table.Row className="contact-table">
                                {/* The Table.Cell component is used to create a cell within the table body. */}
                                {/* It contains the first name, last name, and contact number data for each item in the APIData array. */}
                                <Table.Cell className="border-bottom">{data.firstName}</Table.Cell>
                                <Table.Cell className="border-bottom">{data.lastName}</Table.Cell>
                                <Table.Cell className="border-bottom">{data.contactNumber}</Table.Cell>
                                {/* The Link component is used to create a link to the update page for each item. */}
                                {/* It contains a button that, when clicked, will pass the data for that item to the setData function. */}
                                <Link to="/update">
                                    <Table.Cell>
                                        <Button basic color="linkedin" onClick={() => setData(data)}>
                                            Update
                                        </Button>
                                    </Table.Cell>
                                </Link>
                                {/* The Delete button is used to delete an item from the APIData array when clicked. */}
                                <Table.Cell>
                                    <Button basic color="red" onClick={() => onDelete(data.id)}>
                                        Delete
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {/*A link that routes back to the create form so user can add a new contact*/
            }
            <Link to="/create">
                <Button className='add-contact-button' primary>Add New Contact</Button>
            </Link>
        </div>


    );
}
