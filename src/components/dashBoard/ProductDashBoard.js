import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDashBoard.css';
import { useNavigate } from 'react-router-dom';
import {
    Button, Popover, TextField, InputLabel,
    MenuItem, FormControl, Select, Checkbox,
    ListItemText, FormControlLabel, Input,
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

    // Fetch all products
    const fetchAllData = async () => {
        try {
            const response = await axios.get('  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/Detailed?Limit=100');
            console.log('Fetched products:', response.data.videoGamesInfos);
            setProductList(response.data.videoGamesInfos);
        } catch (error) {
            setError(error);
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories, consoles, studios, and publishers
    const fetchCategories = async () => {
        try {
            const response = await axios.get('  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/categories');
            setCategoryList(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchConsoles = async () => {
        try {
            const response = await axios.get('  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Console');
            setConsoleList(response.data);
        } catch (error) {
            console.error("Error fetching consoles:", error);
        }
    };

    const fetchStudios = async () => {
        try {
            const response = await axios.get('  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/GameStudio');
            setStudioList(response.data);
            console.log('Fetched studios:', response.data);
        } catch (error) {
            console.error("Error fetching studios:", error);
        }
    };

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/Publisher');
            setPublisherList(response.data);
        } catch (error) {
            console.error("Error fetching publishers:", error);
        }
    };

    useEffect(() => {
        fetchAllData();
        fetchCategories();
        fetchConsoles();
        fetchStudios();
        fetchPublishers();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const url = `  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}`;
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Product deleted:', response.data);
            fetchAllData();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const onChangeHandler = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {

            setProductInfo((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((id) => id !== value),
            }));
        } else if (type === 'select-multiple') {

            setProductInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setProductInfo((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
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
    console.log('Console List:', consoleList);
    const createProduct = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

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
            const token = localStorage.getItem('token');
            const url = '  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo';
            const response = await axios.post(url, videoGameInfoCreate, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Product created:', response.data);

            fetchAllData();
            setFormErrors({});
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const updateGameName = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const newGameName = editFields[id]?.gameName;
            if (newGameName) {
                await axios.put(
                    `  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}`,
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
                    `  https://sda-3-online-backend-teamwork-ec29.onrender.com/api/v1/VideoGamesInfo/${id}/year`,
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

    const handleEditChange = (id, field, value) => {
        setEditFields((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
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

                <TextField
                    name="gameName"
                    label="Game Name"
                    variant="standard"
                    value={productInfo.gameName}
                    onChange={onChangeHandler}
                    required
                    className="text-field"
                />
                <br />
                <TextField
                    name="description"
                    label="Description"
                    variant="standard"
                    value={productInfo.description}
                    onChange={onChangeHandler}
                    required
                    className="text-field"
                />
                <br />
                <TextField
                    name="yearOfRelease"
                    label="Year of Release"
                    variant="standard"
                    value={productInfo.yearOfRelease}
                    onChange={onChangeHandler}
                    required
                    className="text-field"
                />
                <br />
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
                <br />
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
                <br />


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
                                <Checkbox checked={productInfo.categoryIds.indexOf(category.categoryId) > -1} />
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


                <TextField
                    name="price"
                    label="Price"
                    variant="standard"
                    value={productInfo.videoGameVersions[0].price}
                    onChange={(e) => {
                        const { value } = e.target;
                        setProductInfo((prev) => ({
                            ...prev,
                            videoGameVersions: [{
                                ...prev.videoGameVersions[0],
                                price: value,
                            }],
                        }));
                    }}
                    required
                    className="text-field"
                />
                <br />


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
                <br />

                <Button variant="contained" onClick={createProduct}>
                    Create Product
                </Button>
            </Popover>


            {loading && <p className="loading-message">Loading...</p>}
            {error && <p className="error-message">Error: {error.message}</p>}


            {!loading && !error && (
                <ul className="product-list">
                    {productList.map((product) => (
                        <li key={product.videoGameInfoId} className="product-item">
                            <h3>{product.gameName}</h3>
                            <p>Year of Release: {product.yearOfRelease}</p>


                            <TextField
                                label="Update Game Name"
                                variant="standard"
                                value={editFields[product.videoGameInfoId]?.gameName || ''}
                                onChange={(e) => handleEditChange(product.videoGameInfoId, 'gameName', e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="update-button"
                                onClick={() => updateGameName(product.videoGameInfoId)}
                            >
                                Update Name
                            </Button>

                            <TextField
                                label="Update Year of Release"
                                variant="standard"
                                value={editFields[product.videoGameInfoId]?.yearOfRelease || ''}
                                onChange={(e) => handleEditChange(product.videoGameInfoId, 'yearOfRelease', e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className="update-button"
                                onClick={() => updateYearOfRelease(product.videoGameInfoId)}
                            >
                                Update Year
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                className="delete-button"
                                onClick={() => deleteProduct(product.videoGameInfoId)}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}

                </ul>
            )}

        </div>
    );
}
