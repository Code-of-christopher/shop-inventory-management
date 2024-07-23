import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import { TextField, Button, Box, Typography } from '@mui/material';

const EditItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/items/get/${id}`);
        setItem(response.data);
      } catch (err) {
        setError('Failed to fetch item');
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/items/${id}`, item);
      navigate('/');
    } catch (err) {
      setError('Failed to update item');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 8,
      }}
    >
      <Typography variant="h4" mb={2}>Edit Item</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Name"
        value={item.name || ''}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={item.quantity || ''}
        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        label="Price"
        type="number"
        value={item.price || ''}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Update Item
      </Button>
    </Box>
  );
};

export default EditItem;
