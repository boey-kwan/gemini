import express from 'express';
import { isAuthenticated } from '../../middleware/auth';
import { prisma } from '../../db/prismaClient';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post('/photos', isAuthenticated, upload.single('photo'), async (req, res) => {
  const { description } = req.body;
  const file = req.file;

  if (!file) return res.status(400).send('No file uploaded.');

  try {
    const { data, error } = await supabase
      .storage
      .from('photos')
      .upload(`images/${Date.now()}-${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new Error(error.message);

    const photo = await prisma.photo.create({
      data: {
        description,
        url: data.Key,
      },
    });

    res.status(201).json(photo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.get('/photos', async (req, res) => {
  try {
    const photos = await prisma.photo.findMany();
    res.json(photos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/photos/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const photo = await prisma.photo.update({
      where: { id: parseInt(id) },
      data: { description },
    });

    res.json(photo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/photos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.photo.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;