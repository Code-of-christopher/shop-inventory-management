import { useState, useEffect } from 'react';
import api from '../../api';
import { Box, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const ItemContainer = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get('/items');
        setItems(response.data);
      } catch (err) {
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <Box sx={{ mt: 8, px: 3 }}>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" component={Link} to="/add">
          Add Item
        </Button>
      </Box>
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <ItemContainer>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2">Price: ${item.price}</Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to={`/edit/${item._id}`} 
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </CardActions>
            </ItemContainer>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ItemList;
