import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Popover,
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Checkbox,
    ListItemText,
    FormControlLabel,
    Input,
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
        videoGameVersions: [],
    });

    const [formErrors, setFormErrors] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

    // Fetch all products
    const fetchAllData = async () => {
        try {
            const response = await axios.get('http://localhost:5125/api/v1/VideoGamesInfo/Detailed?Limit=100');
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
            const response = await axios.get('http://localhost:5125/api/v1/categories');
            setCategoryList(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchConsoles = async () => {
        try {
            const response = await axios.get('http://localhost:5125/api/v1/Console');
            setConsoleList(response.data);
        } catch (error) {
            console.error("Error fetching consoles:", error);
        }
    };

    const fetchStudios = async () => {
        try {
            const response = await axios.get('http://localhost:5125/api/v1/GameStudio');
            setStudioList(response.data); 
            console.log('Fetched studios:', response.data); 
        } catch (error) {
            console.error("Error fetching studios:", error);
        }
    };

    const fetchPublishers = async () => {
        try {
            const response = await axios.get('http://localhost:5125/api/v1/Publisher');
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
            videoGameVersions: productInfo.videoGameVersions,
        };

        try {
            const token = localStorage.getItem('token');
            const url = 'http://localhost:5125/api/v1/VideoGamesInfo';
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

    return (
        <div>
            <h1>Product Dashboard</h1>

            <Button variant="contained" onClick={(event) => setAnchorEl(event.currentTarget)}>
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
            >
                {/* Product Form */}
                <TextField
                    name="gameName"
                    label="Game Name"
                    variant="standard"
                    value={productInfo.gameName}
                    onChange={onChangeHandler}
                    required
                />
                <br />
                <TextField
                    name="description"
                    label="Description"
                    variant="standard"
                    value={productInfo.description}
                    onChange={onChangeHandler}
                    required
                />
                <br />
                <TextField
                    name="yearOfRelease"
                    label="Year of Release"
                    variant="standard"
                    value={productInfo.yearOfRelease}
                    onChange={onChangeHandler}
                    required
                />
                <br />
                {formErrors.yearOfRelease && <p style={{ color: 'red' }}>{formErrors.yearOfRelease}</p>}

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
                />
                <br />
                {formErrors.totalRating && <p style={{ color: 'red' }}>{formErrors.totalRating}</p>}

                <FormControl fullWidth>
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

               <FormControl fullWidth>
    <InputLabel id="categoryIds">Categories</InputLabel>
    <Select
        name="categoryIds"
        value={productInfo.categoryIds}
        onChange={onChangeHandler}
        multiple
        required
        label="Categories"
        renderValue={(selected) => {
            // Find the names of the selected categories
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

                <br />

                <FormControl fullWidth>
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

            {/* Conditional Rendering */}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && (
                <>
                    <h2>List of Products</h2>
                    <ul>
                        {productList.map((product) => (
                            <li key={product.videoGameInfoId}>{product.gameName}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
