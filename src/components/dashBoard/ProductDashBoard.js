import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDashBoard.css';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import {
    Button, Popover, TextField, InputLabel,
    MenuItem, FormControl, Select, Checkbox,
    ListItemText, Paper, CircularProgress
} from '@mui/material';

export default function ProductDashBoard() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [categoryList, setCategoryList] = useState([]);
    const [consoleList, setConsoleList] = useState([]);
    const [studioList, setStudioList] = useState([]);
    const [publisherList, setPublisherList] = useState([]);

    const [productInfo, setProductInfo] = useState({
        gameName: '',
        price: 0,
        description: '',
        categoryIds: [],
        gameStudioIds: [],
        publisherId: '',
        totalRating: 0,
        yearOfRelease: '',
        gamePicturePath: '',
        videoGameVersions: [{
            price: 0,
            gameConsoleId: '',
        }],
    });

    const [formErrors, setFormErrors] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [editFields, setEditFields] = useState({});
    const navigate = useNavigate();

    // Fetch all data
    const fetchAllData = async () => {
        try {
            const response = await axios.get('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/Detailed?Limit=100');
            setProductList(response.data.videoGamesInfos);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    
    const fetchData = async (url, setter) => {
        try {
            const response = await axios.get(url);
            setter(response.data);
        } catch (err) {
            console.error(`Error fetching data from ${url}:`, err);
        }
    };

    useEffect(() => {
        fetchAllData();
        fetchData('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/categories', setCategoryList);
        fetchData('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Console', setConsoleList);
        fetchData('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/GameStudio', setStudioList);
        fetchData('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Publisher', setPublisherList);
    }, []);

    const handleBack = () => navigate(-1);

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAllData(); 
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete product. Please try again.");
        }
    };



    const handleEditChange = (id, field, value) => {
        setEditFields((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const validateForm = () => {
        let errors = {};
        if (productInfo.totalRating < 1 || productInfo.totalRating > 5) {
            errors.totalRating = 'Total rating must be between 1 and 5.';
        }
        if (!productInfo.yearOfRelease) {
            errors.yearOfRelease = 'Year of release is required.';
        }
        return errors;
    };

    const createProduct = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const token = localStorage.getItem('token');
        const videoGameInfoCreate = {
            gameName: productInfo.gameName,
            description: productInfo.description,
            yearOfRelease: productInfo.yearOfRelease,
            totalRating: productInfo.totalRating,
            publisherId: productInfo.publisherId,
            gamePicturePath: productInfo.gamePicturePath,
            categoryIds: productInfo.categoryIds,
            gameStudioIds: productInfo.gameStudioIds,
            videoGameVersions: productInfo.videoGameVersions.map(version => ({
                price: version.price,
                GameConsoleId: version.gameConsoleId,
            })),
        };

        try {
            await axios.post('https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo', videoGameInfoCreate, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchAllData();
            setFormErrors({});
        } catch (err) {
            console.error("Error creating product:", err);
        }
    };
    const updateGameName = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const newGameName = editFields[id]?.gameName;
            if (newGameName) {
                await axios.put(
                    `https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { newGameName },
                    }
                );
                fetchAllData(); 
            }
        } catch (error) {
            console.error("Error updating game name:", error);
        }
    };
    const updateYearOfRelease = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const newYearOfRelease = editFields[id]?.yearOfRelease;
            if (newYearOfRelease) {
                await axios.put(
                    `https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}/year`,
                    null,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        params: { newYearOfRelease },
                    }
                );
                fetchAllData(); 
            }
        } catch (error) {
            console.error("Error updating year of release:", error);
        }
    };

    
    const rows = productList.map((product) => ({
        id: product.videoGameInfoId,
        name: product.gameName,
        price: product.videoGameVersions[0]?.price || 0,
        yearOfRelease: product.yearOfRelease,
    }));
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Product Name', width: 200, editable: true },
        { field: 'price', headerName: 'Price', type: 'number', width: 100 },
        {
            field: 'yearOfRelease',
            headerName: 'Year of Release',
            width: 150,
            editable: true,
            onEditCellChange: (params) => {
                handleEditChange(params.id, 'yearOfRelease', params.value);
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => {
                const { id } = params.row;
                return (
                    <div>
                        <Button onClick={() => deleteProduct(id)} variant="outlined" color="error">
                            Delete
                        </Button>
                        <Button
                            onClick={() => updateGameName(id)}
                            variant="outlined"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Update Name
                        </Button>
                        <Button
                            onClick={() => updateYearOfRelease(id)}
                            variant="outlined"
                            color="secondary"
                            style={{ marginLeft: '10px' }}
                        >
                            Update Year
                        </Button>
                    </div>
                );
            },
        },
    ];


    <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        loading={loading}
        components={{
            LoadingOverlay: () => <CircularProgress />,
        }}
    />
    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === 'categoryIds' || name === 'gameStudioIds') {
            setProductInfo((prevState) => ({
                ...prevState,
                [name]: typeof value === 'string' ? value.split(',') : value,
            }));
        } else {
            setProductInfo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };


    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Product Dashboard</h1>
            <Button
                onClick={handleBack}
                variant="contained"
                style={{
                    backgroundColor: '#a6cf92',
                    color: '#FFFFFF',
                    marginleft: '400px',
                }}
            >
                &#8592; Back
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={(event) => setAnchorEl(event.currentTarget)}
                className="create-product-button"
            >
                Create New Product
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                className="popover-content"
            >
                <div className="popover-form">
                    <TextField
                        name="gameName"
                        label="Game Name"
                        variant="standard"
                        value={productInfo.gameName}
                        onChange={onChangeHandler}
                        required
                        className="text-field"
                    />
                    <TextField
                        name="description"
                        label="Description"
                        variant="standard"
                        value={productInfo.description}
                        onChange={onChangeHandler}
                        required
                        className="text-field"
                    />
                    <TextField
                        name="yearOfRelease"
                        label="Year of Release"
                        variant="standard"
                        value={productInfo.yearOfRelease}
                        onChange={onChangeHandler}
                        required
                        className="text-field"
                    />
                    {formErrors.yearOfRelease && <p className="error-message">{formErrors.yearOfRelease}</p>}

                    <TextField
                        name="totalRating"
                        label="Total Rating (1-5)"
                        variant="standard"
                        value={productInfo.totalRating}
                        onChange={onChangeHandler}
                        required
                        type="number"
                        inputProps={{
                            min: 1,
                            max: 5,
                        }}
                        className="text-field"
                    />

                    {formErrors.totalRating && <p className="error-message">{formErrors.totalRating}</p>}

                    <FormControl fullWidth className="form-control">
                        <InputLabel id="publisherId">Publisher</InputLabel>
                        <Select
                            name="publisherId"
                            value={productInfo.publisherId}
                            onChange={onChangeHandler}
                            required
                        >
                            {publisherList.map((publisher) => (
                                <MenuItem key={publisher.publisherId} value={publisher.publisherId}>
                                    {publisher.publisherName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className="form-control">
                        <InputLabel id="categoryIds">Categories</InputLabel>
                        <Select
                            name="categoryIds"
                            value={productInfo.categoryIds}
                            onChange={onChangeHandler}
                            multiple
                            required
                            label="Categories"
                            renderValue={(selected) => {
                                const selectedCategories = categoryList.filter((category) =>
                                    selected.includes(category.categoryId)
                                );
                                return selectedCategories.map((category) => category.categoryName).join(', ');
                            }}
                        >
                            {categoryList.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    <Checkbox checked={productInfo.categoryIds.includes(category.categoryId)} />
                                    <ListItemText primary={category.categoryName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className="form-control">
                        <InputLabel id="consoleId">Console</InputLabel>
                        <Select
                            name="consoleId"
                            value={productInfo.videoGameVersions[0].gameConsoleId || ''}
                            onChange={(e) => {
                                const { value } = e.target;
                                setProductInfo((prev) => ({
                                    ...prev,
                                    videoGameVersions: [{
                                        ...prev.videoGameVersions[0],
                                        gameConsoleId: value,
                                    }],
                                }));
                            }}
                            required
                        >
                            {consoleList.map((console) => (
                                <MenuItem key={console.gameConsoleId} value={console.gameConsoleId}>
                                    {console.consoleName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className="form-control">
                        <InputLabel id="gameStudioIds">Game Studios</InputLabel>
                        <Select
                            name="gameStudioIds"
                            value={productInfo.gameStudioIds}
                            onChange={onChangeHandler}
                            multiple
                            required
                            label="Game Studios"
                            renderValue={(selected) => {
                                const selectedStudios = studioList.filter((studio) =>
                                    selected.includes(studio.gameStudioId)
                                );
                                return selectedStudios.map((studio) => studio.studioName).join(', ');
                            }}
                        >
                            {studioList.map((studio) => (
                                <MenuItem key={studio.gameStudioId} value={studio.gameStudioId}>
                                    <Checkbox checked={productInfo.gameStudioIds.indexOf(studio.gameStudioId) > -1} />
                                    <ListItemText primary={studio.studioName} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" onClick={createProduct} className="create-button">
                        Create Product
                    </Button>
                </div>
            </Popover>


            <Paper className="data-grid-container">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    loading={loading}
                />
            </Paper>
        </div>
    );
}
