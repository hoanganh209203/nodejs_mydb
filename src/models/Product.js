import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minLeght: 3
        },
        price: {
            type: Number,
            require: true,
            minLeght: 1
        },
        description: {
            type: String,
            require: true,

        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        images:[
            {
                path:{
                    type: String,
                    
                }
            }
        ]

    }, {
    timestamps: true,
    versionKey: false,
});

productSchema.plugin(mongoosePaginate)
export default mongoose.model("Product", productSchema);