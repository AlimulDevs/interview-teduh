const express = require('express');
const connect = require("./config/connect")
const app = express();
const port = 3000;


app.get('/psikolog-review', async (req, res) => {
    try {
        const psikologCollection = connect.database.collection("Psikolog");
        const psikologsWithReviews = await psikologCollection.aggregate([
            {
                $lookup: {
                    from: "Review",
                    localField: "_id",
                    foreignField: "psikolog_id",
                    as: "reviews",
                },
            },
            {
                $addFields: {
                    average_rating: {
                        $avg: "$reviews.rating",
                    },
                },
            },
        ]).toArray();

        // Mengkonversi ObjectId menjadi string setelah mendapatkan hasil dari MongoDB
        const data = psikologsWithReviews.map((psikolog) => ({
            _id: psikolog._id.toString(),
            name: psikolog.name,
            reviews: psikolog.reviews,
            average_rating: psikolog.average_rating,
        }));
        res.status(200).json({ data: data })
    } catch (error) {
        res.status(500).json({ error: 'Gagal mendapatkan data dari MongoDB' });
    }
});

async function startServer() {
    await connect.connectToMongo();
    app.listen(port, () => {
        console.log(`Server berjalan di http://localhost:${port}`);
    });
}

startServer();
