import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: String,
    password: String,
    favoriteIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        }
    ],
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        }
    ],
    reservations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reservation",
        }
    ],
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();

    }
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


UserSchema.methods.isPasswordMatched = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password)

}
export default mongoose.model("User", UserSchema);
